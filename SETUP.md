# Bipin & Akhila — wedding invitation website

A static website (HTML, CSS and JavaScript, no build step) that can be hosted free on GitHub Pages.

## Files and folders

| File / folder | What it is |
|---|---|
| `index.html` | All the text of the invitation |
| `style.css` | Colours, fonts, layout and animations |
| `app.js` | What makes it move: opening screen, countdown, scroll animations, petals, music, menu, sharing, calendar, card viewer |
| `config.js` | Settings you may change: map links, countdown time, calendar entries, WhatsApp message, music, petals |
| `images/` | Photos, one folder per section. See `images/README.txt` |
| `music/` | Background song `bgm.mp3`. See `music/README.txt` |

Always upload the **whole folder** together, because the page finds its photos and music by their folder names.

## 1. Check it on your computer

Unzip the folder and double-click `index.html`. It opens in your browser.
(Music may not play when opened this way on some browsers; it works once hosted.)

## 2. Publish on GitHub Pages (no software needed)

1. Sign in at github.com and click **New repository**.
   - Name it exactly `bipinwedsakhila-hub.github.io`
   - Choose **Public**, then **Create repository**
2. On the new repo page click **uploading an existing file**.
3. Open the unzipped folder on your computer, select **everything inside it**
   (`index.html`, `style.css`, `app.js`, `config.js`, `SETUP.md`, `images`, `music`)
   and drag it all onto the GitHub page. Folders are kept as folders.
   Click **Commit changes**.
4. Go to **Settings → Pages**.
   Under *Build and deployment* choose **Source: Deploy from a branch**,
   **Branch: main**, folder **/ (root)**, then **Save**.
5. Wait one or two minutes and refresh. The address appears at the top, like
   `https://bipinwedsakhila-hub.github.io/`

### Using git from the command line instead

```bash
cd bipin_akhila_wedding
git init
git add .
git commit -m "Wedding invitation"
git branch -M main
git remote add origin https://github.com/bipinwedsakhila-hub/bipinwedsakhila-hub.github.io.git
git push -u origin main
```
Then do step 4 above.

## 3. Make the WhatsApp preview work

This is already set up in `index.html` for the address below. If the address ever changes,
update **og:url** and **og:image** at the top of `index.html` (on GitHub: click the file → pencil icon):

```html
<meta property="og:url" content="https://bipinwedsakhila-hub.github.io/">
<meta property="og:image" content="https://bipinwedsakhila-hub.github.io/images/social-preview/og-thumb.jpg">
```

WhatsApp remembers old previews, so test with a fresh link (you can add `?v=2` to the end).

## 4. Add the photos later

Upload each photo into its folder with the exact name listed in `images/README.txt`
(on GitHub: open the folder → **Add file → Upload files**). Using the same name replaces the old one.
The page picks them up automatically; no code changes are needed.

## 5. Map links

The *See Location* buttons open the exact Google Maps pins for both venues.
To change one, open the place in Google Maps → **Share → Copy link**,
and paste the link into `maps` in `config.js`.

## 6. Gallery (optional)

Upload up to six photos as `images/gallery/1.jpg` … `6.jpg`.
The Gallery section and its menu link appear by themselves once at least one photo is there.

## 7. Short link

Create a short link like the original at tinyurl.com, e.g. `tinyurl.com/bipin-akhila-15-11`.

## Changing text

Every sentence on the page is in `index.html`, in the order it appears, with section markers like
`<!-- ============ 5. WHEN & WHERE ============ -->`. Edit the words between the tags only.
