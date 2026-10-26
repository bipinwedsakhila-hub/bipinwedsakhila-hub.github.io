// =========================================================
//  Settings you may want to change.
//  The text of the invitation is in index.html, the photos are in images/.
// =========================================================
window.WEDDING_CONFIG = {

  // The countdown counts down to this moment (Indian Standard Time, +05:30)
  countdownTo: "2026-11-15T10:30:00+05:30",

  // "See Location" buttons. For exact pins, open each place in Google Maps,
  // tap Share > Copy link, and paste the link here.
  maps: {
    thalikettu: "https://www.google.com/maps?cid=9598201382540079824",
    reception:  "https://www.google.com/maps?cid=14071516308285174327"
  },

  // "Add to Calendar" entries (times in UTC: 05:00 UTC = 10:30 am India)
  calendar: {
    wedding: {
      title: "Wedding of Bipin & Akhila (Muhurtham 10:30 am)",
      start: "20261115T050000Z", end: "20261115T070000Z",
      location: "Geetham Convention Centre, Adoor, Pathanamthitta",
      details: "Thalikettu of Bipin Chandran and Akhila G.R. Muhurtham at 10:30 am. Departure 7:30 am."
    },
    reception: {
      title: "Reception of Bipin & Akhila",
      start: "20261115T120000Z", end: "20261115T160000Z",
      location: "T.S.L Lake Venue, Near Thanni Bridge, Mayyanad, Kollam",
      details: "Wedding reception of Bipin Chandran and Akhila G.R, from 5:30 pm."
    }
  },

  // Message used by the WhatsApp / share buttons (the page link is added at the end)
  shareText: "You are invited to the wedding of Bipin & Akhila on Sunday, 15 November 2026. Muhurtham 10:30 AM at Geetham Convention Centre, Adoor. Reception from 5:30 PM at T.S.L Lake Venue, Mayyanad.",

  // Background music. Put the song in the music folder as bgm.mp3.
  // If the file is not there, the page simply stays silent.
  music: true,
  musicFile: "music/bgm.mp3",
  musicStartAt: 0,      // start the song this many seconds in (e.g. 25)
  musicVolume: 0.6,     // 0 to 1 (phones use their own volume buttons)

  // Rose petals falling gently over the page after the invitation opens
  petals: true
};
