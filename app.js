// =========================================================
//  What makes the invitation work: opening screen, countdown,
//  scroll animations, petals, music, menu, sharing, calendar,
//  invitation card and photo viewer.
//  You should not need to edit this file — see config.js instead.
// =========================================================
(function () {
  "use strict";

  var cfg = window.WEDDING_CONFIG || {};
  var body = document.body;
  var $ = function (id) { return document.getElementById(id); };
  var each = function (sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn); };
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Photos: fade in when the file exists, keep the placeholder when it doesn't ---------- */
  each(".photo img", function (img) {
    var frame = img.closest(".photo");
    function ok() { if (img.naturalWidth > 0) frame.classList.add("loaded"); }
    if (img.complete) ok(); else img.addEventListener("load", ok);
  });

  /* ---------- Gallery: show only the photos that exist; hide the section if there are none ---------- */
  var galleryWrap = $("galleryWrap");
  var galleryItems = document.querySelectorAll(".g-item");
  var galleryShown = 0, galleryPending = galleryItems.length;
  function galleryDone() {
    galleryPending--;
    if (galleryPending === 0 && galleryShown > 0) {
      galleryWrap.hidden = false;
      observeReveal(galleryWrap.querySelectorAll("[data-aos]"));
    }
    if (galleryPending === 0 && galleryShown === 0) {
      each("[data-gallery-link]", function (a) { a.hidden = true; });
    }
  }
  Array.prototype.forEach.call(galleryItems, function (btn) {
    var img = btn.querySelector("img");
    img.loading = "eager";
    function good() { galleryShown++; galleryDone(); }
    function bad() { btn.hidden = true; galleryDone(); }
    if (img.complete) { img.naturalWidth > 0 ? good() : bad(); }
    else { img.addEventListener("load", good); img.addEventListener("error", bad); }
    btn.addEventListener("click", function () { openViewer(img.src, img.alt, false); });
  });

  /* ---------- Map links from config ---------- */
  each("[data-map]", function (a) {
    var url = cfg.maps && cfg.maps[a.getAttribute("data-map")];
    if (url) a.href = url;
  });

  /* ---------- Opening screen ---------- */
  var cover = $("cover");
  $("openBtn").addEventListener("click", function () {
    if (body.classList.contains("opened")) return;
    window.scrollTo(0, 0);
    startMusic();                        // must start inside the tap, or phones block it
    cover.classList.add("leaving");
    body.classList.add("opened");
    body.classList.remove("locked");
    document.querySelector(".wa-float").hidden = false;
    startPetals();
    setTimeout(function () { cover.hidden = true; }, 650);
  });

  /* ---------- Countdown ---------- */
  var target = new Date(cfg.countdownTo || "2026-11-15T10:30:00+05:30").getTime();
  var t = { d: $("tD"), h: $("tH"), m: $("tM"), s: $("tS") };
  var timer;
  function pad(n) { return n < 10 ? "0" + n : String(n); }
  function set(el, v) {
    var txt = pad(v);
    if (el.textContent === txt) return;
    el.textContent = txt;
    el.classList.remove("tick"); void el.offsetWidth; el.classList.add("tick");
  }
  function tick() {
    var diff = target - Date.now();
    if (diff <= 0) { $("timer").classList.add("done"); $("timerDone").hidden = false; clearInterval(timer); return; }
    var sec = Math.floor(diff / 1000);
    set(t.d, Math.floor(sec / 86400));
    set(t.h, Math.floor((sec % 86400) / 3600));
    set(t.m, Math.floor((sec % 3600) / 60));
    set(t.s, sec % 60);
  }
  tick(); timer = setInterval(tick, 1000);

  /* ---------- Reveal on scroll ---------- */
  var io = ("IntersectionObserver" in window) ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }) : null;
  function observeReveal(list) {
    Array.prototype.forEach.call(list, function (el) { io ? io.observe(el) : el.classList.add("in"); });
  }
  observeReveal(document.querySelectorAll("[data-aos]"));

  /* ---------- Falling petals ---------- */
  function startPetals() {
    if (cfg.petals === false || reduceMotion) return;
    var box = $("petals");
    var colours = [["#ffd0dc", "#c2324f"], ["#ffe4ec", "#e2639a"], ["#ffc2cf", "#a1213d"], ["#fff0f3", "#f29bb6"]];
    var count = window.innerWidth < 600 ? 12 : 18;
    for (var i = 0; i < count; i++) {
      var p = document.createElement("span");
      var c = colours[i % colours.length];
      p.className = "petal";
      p.style.left = (Math.random() * 100) + "vw";
      p.style.setProperty("--s", (9 + Math.random() * 9).toFixed(1) + "px");
      p.style.setProperty("--t", (9 + Math.random() * 8).toFixed(1) + "s");
      p.style.setProperty("--delay", (Math.random() * 9).toFixed(1) + "s");
      p.style.setProperty("--c1", c[0]);
      p.style.setProperty("--c2", c[1]);
      box.appendChild(p);
    }
  }

  /* ---------- Music ---------- */
  var audio = null, soundBtn = $("soundBtn"), userMuted = false;
  function startMusic() {
    if (cfg.music === false || !cfg.musicFile) return;
    audio = new Audio(cfg.musicFile + (cfg.musicStartAt ? "#t=" + cfg.musicStartAt : ""));
    audio.loop = true;
    audio.volume = 0;
    audio.addEventListener("error", function () { soundBtn.hidden = true; });
    var pr = audio.play();
    if (pr && pr.then) {
      pr.then(function () { soundBtn.hidden = false; fade(cfg.musicVolume == null ? 0.6 : cfg.musicVolume); })
        .catch(function () { soundBtn.hidden = true; });
    }
  }
  function fade(to) {
    var step = 0, f = setInterval(function () {
      step++;
      try { audio.volume = Math.min(to, to * step / 25); } catch (e) { /* iPhone ignores volume */ }
      if (step >= 25) clearInterval(f);
    }, 80);
  }
  soundBtn.addEventListener("click", function () {
    if (!audio) return;
    if (audio.paused) { audio.play(); userMuted = false; soundBtn.classList.remove("muted"); soundBtn.setAttribute("aria-label", "Mute music"); }
    else { audio.pause(); userMuted = true; soundBtn.classList.add("muted"); soundBtn.setAttribute("aria-label", "Play music"); }
  });
  document.addEventListener("visibilitychange", function () {
    if (!audio || userMuted) return;
    if (document.hidden) audio.pause(); else audio.play().catch(function () {});
  });

  /* ---------- Menu ---------- */
  var menu = $("menu"), shade = $("menuShade"), menuBtn = $("menuBtn");
  function setMenu(open) {
    menu.classList.toggle("open", open);
    shade.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  }
  menuBtn.addEventListener("click", function () { setMenu(!menu.classList.contains("open")); });
  $("menuClose").addEventListener("click", function () { setMenu(false); });
  shade.addEventListener("click", function () { setMenu(false); });
  each(".menu a", function (a) { a.addEventListener("click", function () { setMenu(false); }); });

  /* ---------- Toast ---------- */
  var toastTimer;
  function toast(msg) {
    var el = $("toast");
    el.textContent = msg; el.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { el.classList.remove("show"); }, 2400);
  }

  /* ---------- Open a link in a new tab (works inside app previews too) ---------- */
  function openLink(url) {
    var a = document.createElement("a");
    a.href = url; a.target = "_blank"; a.rel = "noopener";
    document.body.appendChild(a); a.click(); a.remove();
  }

  /* ---------- Sharing ---------- */
  var pageUrl = location.href.split("#")[0];
  var shareText = cfg.shareText || document.title;
  function shareWhatsApp() {
    openLink("https://wa.me/?text=" + encodeURIComponent(shareText + "\n\n" + pageUrl));
  }
  each("[data-share]", function (b) { b.addEventListener("click", shareWhatsApp); });
  $("shareBtn").addEventListener("click", function () {
    if (navigator.share) {
      navigator.share({ title: document.title, text: shareText, url: pageUrl }).catch(function () {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(pageUrl).then(function () { toast("Link copied"); }, shareWhatsApp);
    } else {
      shareWhatsApp();
    }
  });

  /* ---------- Add to calendar ---------- */
  var isApple = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  function esc(s) { return String(s).replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n"); }
  each("[data-cal]", function (btn) {
    btn.addEventListener("click", function () {
      var ev = cfg.calendar && cfg.calendar[btn.getAttribute("data-cal")];
      if (!ev) return;
      var details = ev.details + "\n\n" + pageUrl;
      if (isApple) {
        var ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Bipin and Akhila//Wedding//EN", "BEGIN:VEVENT",
          "UID:" + ev.start + "-bipin-akhila@wedding", "DTSTAMP:" + ev.start, "DTSTART:" + ev.start, "DTEND:" + ev.end,
          "SUMMARY:" + esc(ev.title), "LOCATION:" + esc(ev.location), "DESCRIPTION:" + esc(details),
          "END:VEVENT", "END:VCALENDAR"].join("\r\n");
        window.location.href = "data:text/calendar;charset=utf8," + encodeURIComponent(ics);
      } else {
        openLink("https://calendar.google.com/calendar/render?action=TEMPLATE" +
          "&text=" + encodeURIComponent(ev.title) + "&dates=" + ev.start + "/" + ev.end +
          "&location=" + encodeURIComponent(ev.location) + "&details=" + encodeURIComponent(details));
      }
    });
  });

  /* ---------- Invitation card & photo viewer ---------- */
  var viewer = $("viewer"), viewerImg = $("viewerImg"), dl = $("viewerDownload");
  function openViewer(src, alt, isCard) {
    viewerImg.src = src; viewerImg.alt = alt || "";
    dl.hidden = !isCard;
    viewer.hidden = false;
    body.style.overflow = "hidden";
  }
  function closeViewer() { viewer.hidden = true; body.style.overflow = ""; }
  each("[data-open-card]", function (b) {
    b.addEventListener("click", function (e) {
      e.preventDefault();
      setMenu(false);
      openViewer("images/card/invitation-card.jpg", "Printed invitation card of Bipin and Akhila", true);
    });
  });
  $("viewerClose").addEventListener("click", closeViewer);
  viewer.addEventListener("click", function (e) { if (e.target === viewer) closeViewer(); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeViewer(); setMenu(false); }
  });
})();
