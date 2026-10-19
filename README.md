# E-Wedding Invitation: complete guide

A digital wedding invitation built with **Next.js (App Router)**, **Tailwind CSS** and **Framer Motion**. No database, no backend, no environment variables, so it hosts free on Vercel.

<<<<<<< HEAD
**One dark-brown, gold-text invitation. Six pages, shown one at a time.**
**One scroll, swipe or key press: the old page fades out slowly, then the new page fades in.**

1. **Cover** (full screen): Khmer title, crest, the guest's name, and an **Open invitation** button (it also starts the music).
2. **"The wedding of"** (full screen): the couple, Khmer names large with the English name below each, every name on one line.
3. **The invitation**: parents, the invitation text, groom on the left and bride on the right with a **round photo slot** under each name, then date and place.
4. **Program and location**: the two-day program with a gold timeline, beside the map or your QR code.
5. **RSVP**: "Will you join us?" form.
6. **Video, 14 photos in two columns, and the thank-you.**

A page taller than the screen scrolls inside itself first; one more scroll at its end moves to the next page. The invitation can also turn its own pages (auto-play), starting 3 seconds after it loads, until a guest clicks, taps or scrolls.
=======
**One dark-brown, gold-text invitation, five pages that fade into each other**

1. **Cover** (full screen): Khmer title, crest, the guest's name, and an **Open invitation** button. It fades out.
2. **"The wedding of"** (full screen): the couple, Khmer names large with the English name smaller below each. It fades in, then fades out.
3. **The invitation**: parents, the invitation text, groom on the left and bride on the right with a **round photo slot** under each name, then date and place.
4. **Program and location**: the two-day program with a gold timeline, beside the map or your QR code.
5. **RSVP**, then **video, 14 photos in two columns, and the thank-you** at the very end.
>>>>>>> 628a69eb273ca9052674eb3fa842ee740de8610f

---

## Contents

1. [Run it and publish it](#1-run-it-and-publish-it)
2. [Personalized guest links](#2-personalized-guest-links)
3. [Where everything lives](#3-where-everything-lives)
4. [Content settings (`config/weddingData.js`)](#4-content-settings)
5. [Colors](#5-colors)
6. [Sizes](#6-sizes)
7. [Motion and timing](#7-motion-and-timing)
8. [Khmer text and fonts (including Khmer Borann)](#8-khmer-text-and-fonts)
9. [Photos and video](#9-photos-and-video)
10. [RSVP: where replies go](#10-rsvp-where-replies-go)
11. [Calendar, map and QR code](#11-calendar-map-and-qr-code)
12. [Recipes: common changes](#12-recipes-common-changes)
13. [Troubleshooting](#13-troubleshooting)

---

## 1. Run it and publish it

You need [Node.js](https://nodejs.org) 18.17 or newer.

```bash
npm install
npm run dev          # open http://localhost:3000/?to=John+%26+Mary
```

Other commands: `npm run build` (production build), `npm start` (serve it), `npm run lint`.

**Publish free on Vercel (recommended, auto-updates):**

1. Create a free account and a new repository at <https://github.com>, and upload this project to it.
2. At <https://vercel.com> sign up with GitHub, choose **Add New → Project**, import the repository, and click **Deploy** (leave every setting as is).
3. You get a link like `https://your-project.vercel.app`. From now on, every change you commit to GitHub redeploys the site by itself.

**Without GitHub:** `npm install -g vercel`, then `vercel` (preview link) and `vercel --prod` (live link).

**Rename the link:** Vercel project → **Settings → Domains**.

The page tells search engines not to index it (it is private), but anyone with the link can open it. Do not put anything sensitive in the settings.

---

## 2. Personalized guest links

The cover shows the guest's name (under "សូមគោរពអញ្ជើញ"), and the RSVP name field is pre-filled with it.

| Link | Name shown on the cover |
|---|---|
| `https://your-site.vercel.app/?to=John+%26+Mary` | John & Mary |
| `https://your-site.vercel.app/?guest=Aunt+Lisa` | Aunt Lisa |
| `https://your-site.vercel.app/` | Valued Guest (change in `guest.fallback`) |
| `https://your-site.vercel.app/john-and-mary` | John And Mary |

In links, a space is `+` or `%20`, and `&` must be written `%26`. Khmer names also work (for example `?to=លោក+ទេពសត្យា`).

**Many guests at once:** put one name per line in `guests.txt`, then run `npm run links -- https://your-site.vercel.app`. It prints every link and writes `guest-links.csv` (open in Excel or Google Sheets).
**In a spreadsheet** (names in column A): `="https://your-site.vercel.app/?to="&ENCODEURL(A2)`

---

## 3. Where everything lives

| What you want to change | File |
|---|---|
| **All text, dates, photos, program, venue, switches** | `config/weddingData.js` |
| **All colors** | `app/globals.css` (the `:root` block at the top) |
| Page title, link preview, Latin fonts, Khmer font loading | `app/layout.js` |
<<<<<<< HEAD
| Cover and "The wedding of" pages | `components/IntroPages.jsx` |
| Page-by-page navigation, fades, auto-play wiring | `components/InvitationShell.jsx` |
| Scroll / swipe / key handling (one scroll = one page) | `lib/pager.js` |
| Auto-play logic | `lib/autoplay.js` |
| Background music player and button | `components/MusicPlayer.jsx`, `lib/music.js` |
| Khmer font loading | `components/KhmerFonts.jsx`, `lib/fonts.js` |
| Image and caching settings | `next.config.js` |
| One-click photo shrinker | `scripts/optimize-images.mjs` (run `npm run optimize`) |
| Your music files | `public/audio/` |
=======
| Cover and "The wedding of" (the two full-screen scenes) | `components/IntroStage.jsx` |
>>>>>>> 628a69eb273ca9052674eb3fa842ee740de8610f
| The invitation page (parents, names, round photos, date) | `components/InfoSection.jsx` |
| Program and map or QR | `components/ProgramSection.jsx` |
| The gold timeline rows and icons | `components/Timeline.jsx` |
| RSVP form | `components/RsvpForm.jsx` |
| Video, photos, thank-you | `components/GallerySection.jsx` |
| Photo grid and fade-in | `components/PhotoGallery.jsx` |
| Crest and gold corner brackets | `components/Ornaments.jsx` |
| Sparkles, faint Angkor Wat, divider | `components/FloralDecorations.jsx` |
| The page background (brown and pattern) | `lib/background.js` |
<<<<<<< HEAD
| One page's wrapper | `components/Page.jsx` |
| Fade at the top of the screen | `components/TopFade.jsx` |
=======
| Fade between pages | `components/SectionFade.jsx` |
| Fade at the top of the screen | `components/TopFade.jsx` |
| Auto-scroll logic | `lib/autoScroll.js` |
>>>>>>> 628a69eb273ca9052674eb3fa842ee740de8610f
| Gold text and shimmer styles | `app/globals.css` |
| Font families used by Tailwind | `tailwind.config.js` |
| Your pictures | `public/images/` |

**Rule of thumb:** words, numbers, links and on/off switches are in `config/weddingData.js`. Colors are in `app/globals.css`. Sizes and animation speeds are in the component files, and sections 6 and 7 show you the exact text to look for.

---

## 4. Content settings

Open `config/weddingData.js`. Everything is plain text in quotes, `true`/`false`, or numbers. Save the file and (in `npm run dev`) the page updates instantly. Dates use `"YYYY-MM-DDTHH:MM:SS"` with a 24-hour clock.

### 4.1 `meta`: browser tab and link preview
`title`, `description` (shown when the link is shared), `hashtag` (shown on the last page).

### 4.2 `sections`: show or hide parts

```js
sections: { info: true, schedule: true, map: true, video: true, rsvp: true, gallery: true, closing: true },
```

| Switch | Controls |
|---|---|
| `info` | The whole invitation page (parents, names, round photos, date and place) |
| `schedule` | The two-day program, plus the Add to Calendar buttons |
| `map` | The venue block (name, address, map or QR code, Get directions) |
| `video` | The highlight video (also hidden whenever `video.src` is empty) |
| `rsvp` | The whole RSVP page |
| `gallery` | The photo gallery |
| `closing` | The thank-you message, parents, hashtag |

The cover and "The wedding of" scenes are always on. A page disappears (with its navigation dot) when everything on it is off.

### 4.3 `couple` and `guest`
Each of `couple.groom` and `couple.bride` has:

| Setting | Where it shows |
|---|---|
| `name` | English name: the smaller line under the Khmer name, the program, the thank-you |
| `cover` | Short name used on the cover (for example "Sothea") |
| `nameKm` | Name in Khmer: the large name on "The wedding of" and the invitation page |
| `father`, `mother` (and `fatherKm`, `motherKm`) | The parents, on the invitation page (left = groom's, right = bride's) |
| `parents` | The "Son of … / Daughter of …" line on the thank-you page |
| `photo` | The round photo, for example `"/images/groom.jpg"`. **Empty = a gold ring with the initial** |

`guest.fallback` is what the cover says when the link has no name. `guest.queryKeys` is which link parameters are read (`?to=` and `?guest=`).

### 4.4 `hero`: cover, "The wedding of", invitation text
| Setting | What it is |
|---|---|
| `titleKm` | Khmer title on the cover and the invitation page |
| `monogram` | The letters inside the crest (for example `"S & P"`) |
| `weddingOf` / `weddingOfKm` | The line above the names on page 2 ("The wedding of"; Khmer optional) |
| `inviteKm` / `invite` | The line above the guest's name |
| `openKm`, `open`, `openHintKm`, `openHint` | The gold button and the small hint under it |
| `invitationTextKm` | The Khmer invitation paragraph (shown in the *description* font) |
| `invitationText` | The English invitation sentence under it |
| `heldAtKm` / `heldAt` | "to be held at", above the date and place |

The Khmer invitation paragraph is a standard wording that I read from your sample card, so please proofread it.

### 4.5 `event`: date and time
| Setting | What it is |
|---|---|
| `start` / `end` | The reception, used by the date lines and **Add to Calendar** |
| `timeLabel` | The time as printed (for example `"5:00 PM"`) |
| `whenKm` | The date and time line in Khmer |
| `timezone` | IANA name, for Google Calendar (Cambodia: `Asia/Phnom_Penh`) |
| `calendarTitle`, `calendarDescription` | Text inside the calendar entry |

The English date is built from `start`. If you change `start`, also update `whenKm`.

### 4.6 `program`: the two-day program
```js
program: {
  heading: "Wedding Program", headingKm: "…",
  columns: 1,                        // 1 = days stacked; 2 = Day 1 | Day 2 side by side
  scheduleNote: "…", scheduleNoteKm: "…",
  days: [
    { title: "Day 1: Friday, 18 December 2026", titleKm: "…",
      items: [ { time: "1:30 PM", timeKm: "ម៉ោង ០១:៣០ រសៀល", title: "…", titleKm: "…", icon: "door" }, … ] },
    { title: "Day 2: …", items: [ … ] },
  ],
}
```
- **Add a row:** copy one `{ … }` item line and edit it. **Remove a row:** delete its line. **Add a day:** copy a whole `{ title: …, items: [ … ] }` block.
- Khmer parts (`timeKm`, `titleKm`) are optional. Leave them out and only English shows.
- **Icons:** `door`, `sparkles`, `flower`, `hand`, `gift`, `utensils`, `users`, `scissors`, `flame`, `wine`, `heart`, `church`, `music`, `camera`.
- **columns:** `1` keeps the program beside the location on computers. `2` puts Day 1 and Day 2 side by side with the location below. On phones the days always stack, and the order is always program first, then location.

### 4.7 `venue`: location
| Setting | What it is |
|---|---|
| `name`, `nameKm`, `addressLines`, `addressKm`, `notes`, `notesKm` | Text shown next to the map |
| `short` | The short place line under the date |
| `coverKm` | The full place line in Khmer (invitation page) |
| `display` | `"map"` shows the Google map, `"qr"` shows your QR code image |
| `qrImage` | Where your QR image is (default `/images/location-qr.png`) |
| `qrCaption`, `qrCaptionKm` | Text under the QR code |
| `mapQuery` | What Google Maps searches for (used by the map and **Get directions**) |
| `mapEmbedUrl` | Optional: a full Google "Embed a map" link, to pin the exact spot |
| `directionsUrl` | Optional: your own link for the **Get directions** button |

The **Get directions** button always shows, in both modes.

### 4.8 `gallery`, `video`, `closing`, `rsvp`
See sections 9 and 10. `closing` has `heading`, `message` (and `…Km` versions), `signoff`, and `showParents`.

### 4.9 `khmer`
`angkorSilhouette`: the very faint Angkor Wat along the bottom of the screen (`true`/`false`).

### 4.10 `motion`
See section 7.

<<<<<<< HEAD
### 4.11 `music`: background music
```js
music: {
  src: "",              // "/audio/wedding.mp3" or a YouTube link. Empty = no music
  startOn: "open",      // "open" = starts when the guest presses "Open invitation"; "button" = only the sound button
  volume: 0.6,          // 0 (silent) to 1 (full)
  loop: true,
  showButton: true,     // the round sound button, bottom right
},
```
- **Your own file:** put an `.mp3` in `public/audio/` (create the folder) and set `src: "/audio/wedding.mp3"`. Keep it small: 128 kbps, 3 to 4 minutes is about 3 to 4 MB. It is only downloaded when the music starts.
- **YouTube:** paste the link (`https://www.youtube.com/watch?v=XXXXXXXXXXX` or `https://youtu.be/XXXXXXXXXXX`). A hidden player plays the sound. Some videos forbid embedding and some show ads, and YouTube's rules prefer a visible player, so an **mp3 is the safer choice**.
- **Browsers only allow sound after a tap.** So the music starts when the guest presses **Open invitation**. If a phone still refuses, the guest can tap the round sound button (bottom right) to play or pause at any time.
- Auto-play (the page turning by itself) does not start music, because it is not a tap.

---

=======
>>>>>>> 628a69eb273ca9052674eb3fa842ee740de8610f
---

## 5. Colors

The whole page is the dark brown from your sample, with gold text. All colors live in one place: the `:root` block at the top of `app/globals.css`. Each value is three numbers `R G B` (not a `#` code). To convert a hex code, split it into pairs and convert each to a number: `#D4A853` is `D4`=212, `A8`=168, `53`=83, so write `212 168 83`. Any online "hex to RGB" tool does this.

```css
:root {
  --c-primary: 212 168 83;    /* gold: borders, lines, icons */
  --c-blush: 240 204 140;     /* warm light: the glow behind the crest */
  --c-soft: 232 214 172;
  --c-deep: 78 52 36;
  --c-wine: 38 23 15;         /* darkest brown: text on gold buttons */
  --c-cream: 96 70 51;        /* #604633  PAGE BACKGROUND */
  --c-paper: 250 250 250;     /* (not currently used) */
  --c-ink: 240 228 200;       /* body text */
  --c-leaf: 125 138 104;      /* (not currently used) */
  --c-gold-dark: 168 120 40;
  --c-gold: 212 168 83;
  --c-gold-ink: 190 140 50;   /* (only for gold on a light background) */
  --c-gold-light: 248 230 170;
}
```

### What each color controls
| Variable | Where you see it |
|---|---|
| `--c-cream` | **The page background** (brown), also used by the pattern and the fade at the top |
| `--c-ink` | Body text and paragraphs (warm cream) |
| `--c-gold`, `--c-gold-light` | **The gold gradient text** (titles, names, headings), gold buttons, photo frames, the timeline line, sparkles, corner brackets |
| `--c-primary` | Fine gold lines and borders, the divider under headings |
| `--c-wine` | Text on gold buttons, the photo viewer background, shadows |
| `--c-blush` | The warm glow behind the cover crest |
| `--c-deep`, `--c-soft` | Small tints (video placeholder and similar) |
| `--c-gold-dark`, `--c-gold-ink` | Only used by `.gold-text-ink` (gold text for a light background). Not visible in this design |
| `--c-paper`, `--c-leaf` | Not used now; you can ignore them |

### The background pattern
The brown comes from `--c-cream`; the faint damask pattern and the soft dark edges are in `lib/background.js`. In that file, `fill-opacity='0.07'` and `stroke-opacity='0.07'` set how visible the pattern is (try `0.04` for fainter, `0.12` for stronger), and `rgb(0 0 0 / 0.3)` sets how dark the edges are (`0` = no darkening).

### Common color changes
- **Lighter or darker brown:** change `--c-cream` (smaller numbers = darker). For example `78 56 40` is darker, `112 82 60` is lighter.
- **Different gold:** edit `--c-gold` (main), `--c-gold-light` (the shine), and `--c-primary` (lines). Keep `--c-gold-light` lighter than `--c-gold`.
- **Maroon instead of brown** (like the cover sample on your phone): set `--c-cream: 92 20 22`.
- **Body text color:** `--c-ink`.
- **Make other text gold:** in a component, wrap the text in `<span className="gold-text">…</span>`. Always use an inner `<span>`, never put the class on the heading itself, or tall Khmer marks and letter tails get cut off.
<<<<<<< HEAD
- **Plain light text instead of gold on the cover:** in `IntroPages.jsx` replace `<span className="gold-text">` with `<span className="text-gold-light">`.
=======
- **Plain light text instead of gold on the cover:** in `IntroStage.jsx` replace `<span className="gold-text">` with `<span className="text-gold-light">`.
>>>>>>> 628a69eb273ca9052674eb3fa842ee740de8610f

---

## 6. Sizes

### 6.1 The quick rule: Tailwind size classes
Most headings and text are sized with Tailwind classes. Change the class to change the size:

| Class | Size | | Class | Size |
|---|---|---|---|---|
| `text-sm` | 14 px | | `text-3xl` | 30 px |
| `text-base` | 16 px | | `text-4xl` | 36 px |
| `text-lg` | 18 px | | `text-5xl` | 48 px |
| `text-xl` | 20 px | | `text-6xl` | 60 px |
| `text-2xl` | 24 px | | `text-7xl` | 72 px |

`sm:text-5xl` means "this size from tablet width and up". Spacing works the same way: `mt-3` is 12 px of space above, `mb-14` is 56 px below, `gap-12` is 48 px between items (each step is 4 px).

**Example: make the "Wedding Program" heading bigger.** Open `components/ProgramSection.jsx`, find `<h2 className="font-display text-4xl font-light sm:text-5xl">` and change it to `text-5xl … sm:text-6xl`.

<<<<<<< HEAD
### 6.2 The cover and "The wedding of" (`components/IntroPages.jsx`)
These two pages always fill the screen, so their sizes use `clamp(smallest, preferred, largest)`: `clamp(1.5rem, min(6.6vw, 6svh), 3.4rem)` means "6.6% of the screen width or 6% of the screen height, whichever is smaller, but never smaller than 1.5rem or bigger than 3.4rem". To make a line bigger, raise the numbers (the last number is the maximum on big screens). Current values:
=======
### 6.2 The cover and "The wedding of" (`components/IntroStage.jsx`)
These two scenes always fill the screen, so their sizes use `clamp(smallest, preferred, largest)`: `clamp(1.5rem, min(6.6vw, 6svh), 3.4rem)` means "6.6% of the screen width or 6% of the screen height, whichever is smaller, but never smaller than 1.5rem or bigger than 3.4rem". To make a line bigger, raise the numbers (the last number is the maximum on big screens). Current values:
>>>>>>> 628a69eb273ca9052674eb3fa842ee740de8610f

| Line | `fontSize` |
|---|---|
| Cover: Khmer title | `clamp(1.5rem, min(6.6vw, 6svh), 3.4rem)` |
| Cover: monogram in the crest | `clamp(1.4rem, min(7vw, 5.6svh), 3rem)` |
| Cover: couple line under the crest | `clamp(1.2rem, min(5vw, 4svh), 2.2rem)` |
| Cover: "សូមគោរពអញ្ជើញ" / English | `clamp(1rem, 3svh, 1.5rem)` / `clamp(.85rem, 2.2svh, 1.1rem)` |
| Cover: guest name | `clamp(1.4rem, min(6vw, 5svh), 2.6rem)` |
| "The wedding of" | `clamp(1.3rem, 4.6svh, 2.2rem)` |
<<<<<<< HEAD
| **Names in Khmer** | `clamp(1.8rem, min(9.5vw, 10svh), 4.6rem)` |
| **Names in English (below the Khmer)** | `clamp(1.3rem, min(5.6vw, 4.6svh), 2.4rem)` |
| "&" between the names | `clamp(1.6rem, 6svh, 3rem)` |
| Date under the names | `clamp(.95rem, 2.4svh, 1.2rem)` |

- **Every name stays on one line** (`whiteSpace: "nowrap"`). If a very long name does not fit a small phone, lower the `vw` number inside that name's `clamp(…)` (for example `9.5vw` to `8vw`).
=======
| Names in Khmer (large) | `clamp(2rem, min(10.5vw, 11svh), 5rem)` |
| Names in English (smaller, below) | `clamp(1.1rem, min(4vw, 3.8svh), 1.9rem)` |
| "&" between the names | `clamp(1.6rem, 6svh, 3rem)` |
| Date under the names | `clamp(.95rem, 2.4svh, 1.2rem)` |

>>>>>>> 628a69eb273ca9052674eb3fa842ee740de8610f
- **Crest size:** `w-[min(44vw,24svh,230px)]` on the `<Crest>` (change `230px` for a bigger or smaller crest on computers).
- **Open button:** `px-10 py-2.5` (width and height of the button), `bg-gold` (its color).
- **Spacing:** the `marginTop` values (like `"2.4svh"`) are the gaps between lines.

### 6.3 The invitation page (`components/InfoSection.jsx`)
- **Width of the page:** `max-w-3xl` (use `max-w-2xl` narrower, `max-w-4xl` wider).
- Crest: `w-24 sm:w-32`. Khmer title: the `text-2xl` (phones) and `sm:text-4xl` (larger screens) classes. Parents: `text-xl`.
- Invitation paragraph: `text-base … sm:text-lg` and `leading-[2.1]` (the line spacing; Khmer needs generous spacing).
<<<<<<< HEAD
- Names (each on one line): Khmer `clamp(1.05rem, 5vw, 2.25rem)`, English `clamp(1.2rem, 5.4vw, 2rem)`.
=======
- Names: Khmer uses `text-2xl` and `sm:text-4xl`; English uses `text-lg sm:text-2xl`.
>>>>>>> 628a69eb273ca9052674eb3fa842ee740de8610f
- **Round photos:** `w-[min(36vw,12rem)]` (12rem = 192 px on computers; raise it for bigger photos), border thickness `border-2`, gap between the ring and the photo `p-1.5`.
- Page padding: `px-6 py-28 sm:px-14`.

### 6.4 Program page (`components/ProgramSection.jsx`, `components/Timeline.jsx`)
- Headings: `text-4xl sm:text-5xl` (English) and `text-3xl sm:text-4xl` (Khmer). Day titles: `text-2xl sm:text-3xl`.
- **Timeline rows** (`Timeline.jsx`): the three columns are `grid-cols-[2.6rem_2.4rem_1fr] sm:grid-cols-[3.2rem_3rem_1fr]` (icon, line, text). Icon size `size-6 sm:size-7`. Time `text-lg`, Khmer line `text-[1.05rem]`, English line `text-[0.95rem]`, space between rows `pb-7`. Line and crossbar are `bg-gold`.
- QR code size: `max-w-[16rem]` (bigger number = bigger QR). Map shape: `aspect-[4/3]`.
- Width of the page content: `max-w-6xl`. Program alone: `max-w-xl`, or `max-w-5xl` in two-column mode.

### 6.5 Photos (`components/PhotoGallery.jsx`, `components/GallerySection.jsx`)
- Photo frame shape: `aspect-[4/5]` (portrait). Try `aspect-[3/4]` or `aspect-square`.
- Corner roundness: `rounded-[10px]` outside, `rounded-[6px]` inside. Set both to `rounded-none` for sharp corners.
- Gold border thickness: the `p-1.5` (phones) and `sm:p-2` (larger screens) classes on the photo button.
- Gaps between photos: `gap-x-4 gap-y-7 sm:gap-x-8 sm:gap-y-10`. Overall gallery width: `max-w-3xl` (use `max-w-2xl` for smaller photos, `max-w-4xl` for bigger).
- Video width: `max-w-3xl` in `GallerySection.jsx`.
<<<<<<< HEAD
- Thank-you names (one line): `clamp(1.3rem, 6.6vw, 2.25rem)` English and `clamp(1rem, 4.4vw, 1.25rem)` Khmer, in `GallerySection.jsx`.
=======
>>>>>>> 628a69eb273ca9052674eb3fa842ee740de8610f

### 6.6 Small decorations
- **Corner brackets** (invitation and program pages): `w-14 sm:w-24` in `components/Ornaments.jsx` (`CornerOrnaments`). Remove `<CornerOrnaments />` from a page to remove them there.
- **Sparkle size:** `motion.sparkles.size` in the config (pixels).
- **Section divider (little Angkor Wat):** `w-60` in `FloralDivider className="mx-auto mt-3 w-60"`.
- **Faint Angkor Wat along the bottom:** in `FloralDecorations.jsx`, `w-[min(100vw,1100px)]` is its width and `opacity-[0.09]` how visible it is.

---

## 7. Motion and timing

### 7.1 Settings in the config (`motion`)
```js
motion: {
<<<<<<< HEAD
  pageFade:   { outSeconds: 1.6, inSeconds: 1.8 },
  autoScroll: { enabled: true, startDelayMs: 3000, pageSeconds: 6, speed: 120 },
  sparkles:   { count: 12, size: { min: 8, max: 18 } },
=======
  autoScroll: { enabled: true, startDelayMs: 3000, speed: 120 },
  sparkles:   { count: 14, size: { min: 8, max: 18 } },
>>>>>>> 628a69eb273ca9052674eb3fa842ee740de8610f
  romance:    { glow: true, shimmer: true },
  topFade:    { enabled: true, heightVh: 16 },
},
```
| Setting | What it does |
|---|---|
<<<<<<< HEAD
| `pageFade.outSeconds` | How long the old page takes to fade out (bigger = slower, more romantic) |
| `pageFade.inSeconds` | How long the new page takes to fade in |
| `autoScroll.enabled` | The invitation turns its own pages (`false` = guests move by hand) |
| `autoScroll.startDelayMs` | Wait this long after the page loads (3000 = 3 seconds) |
| `autoScroll.pageSeconds` | How long each page stays before fading to the next |
| `autoScroll.speed` | For a page taller than the screen: how fast it scrolls to its end, in pixels per second (`60` slow, `120` brisk, `200` fast) |
| `sparkles.count` | How many sparkles twinkle at once (`0` = none; fewer is lighter on old phones) |
| `sparkles.size` | Smallest and largest sparkle, in pixels |
| `romance.glow` | The warm glow breathing behind the crest on the cover |
| `romance.shimmer` | The gentle light sweeping across the gold text |
| `topFade.enabled` / `heightVh` | The top of a long page softly fades as you read down it; `heightVh` is the height of that fade as a percentage of the screen |

### 7.2 How pages change
- **One scroll = one page.** A mouse-wheel flick, a trackpad swipe, a finger swipe, the arrow keys, Page Down or Space moves to the next page. The old page fades out first (`outSeconds`), then the new page fades in (`inSeconds`). While that happens further scrolling is ignored, so a long flick can never skip pages.
- **Long pages** (program, gallery) scroll normally inside the page. When you reach the end, **one more scroll** moves on. The tail of a scroll that only just reaches the end does not skip ahead.
- **Open invitation** uses the same slow fade, so there is no sudden jump.
- **Auto-play** moves through the pages by itself: first 3 seconds after loading, then each page stays `pageSeconds` (a long page is scrolled slowly to its end first, then rests a moment). It **stops for good** the moment a guest clicks, taps, scrolls, swipes or presses a key, and it stops on the last page.
- **Quicker or slower, more or less romantic:** change `pageFade` (try `2.4` / `2.6` for very slow, `1` / `1` for brisk).
- All motion is switched off automatically for guests whose device is set to "reduce motion" (pages then change instantly and there is no auto-play).
=======
| `autoScroll.enabled` | The page drifts down by itself (`false` = guests scroll by hand) |
| `autoScroll.startDelayMs` | Wait this long after the page loads (3000 = 3 seconds) |
| `autoScroll.speed` | Speed in pixels per second: `20` very slow, `60` slow, `120` brisk, `200` fast |
| `sparkles.count` | How many sparkles twinkle at once (`0` = none) |
| `sparkles.size` | Smallest and largest sparkle, in pixels |
| `romance.glow` | The warm glow breathing behind the crest on the cover |
| `romance.shimmer` | The gentle light sweeping across the gold text |
| `topFade.enabled` / `heightVh` | Content softly fades as it leaves the top of the screen; `heightVh` is the height of that fade as a percentage of the screen |

Auto-scroll **stops for good** the moment a guest clicks, taps, scrolls, swipes, presses a key or drags the scrollbar, and when it reaches the end. All motion is switched off automatically for guests whose device is set to "reduce motion".

### 7.2 How the pages fade
- **Cover → "The wedding of" → invitation:** these are scroll-driven. The cover fades out, then "The wedding of" fades in, holds, and fades out. The numbers are in `components/IntroStage.jsx`:
```js
cover:  [0, 0.08, 0.3],            // 0 = start of the stage, 1 = end
second: [0.3, 0.52, 0.72, 0.94],
```
Reading `second`: it starts fading in at 30%, is fully visible from 52% to 72%, and is gone by 94%. Move the numbers closer together for quicker fades, or further apart for slower, longer holds. The stage's length is `h-[300svh]` (3 screens): make it `h-[400svh]` for slower scenes overall.
- **"Open invitation" button:** scrolls to the middle of "The wedding of". That target is `1.2 * window.innerHeight` in `IntroStage.jsx`.
- **All later pages:** each page fades out as it leaves and the next fades in afterwards. The two ranges are in `components/SectionFade.jsx`: `["start 40%", "start 10%"]` (fade in) and `["end 90%", "end 60%"]` (fade out). A wider gap between the numbers gives a slower fade.
>>>>>>> 628a69eb273ca9052674eb3fa842ee740de8610f

### 7.3 Speeds you can change in the code
| What | File and text to find | Default |
|---|---|---|
<<<<<<< HEAD
| Glow breathing behind the crest | `app/globals.css`: `animation: breathe 7s ease-in-out infinite` | 7 s per cycle |
| Glow size and warmth | `IntroPages.jsx`: `min(92vw, 64svh)`, `rgb(var(--c-gold) / 0.35)` | bigger number = bigger/stronger |
| Cover text appearing | `IntroPages.jsx`: `rise(0.2)`, `rise(0.5)`, `rise(0.8)` (seconds of delay) | each block 0.3 s after the last |
| Fade-up length | `app/globals.css`: `animation: rise 1s …` | 1 s |
=======
| Glow breathing behind the crest | `IntroStage.jsx`: `scale: [1, 1.08, 1]`, `duration: 7` | 7 s per cycle |
| Glow size and warmth | `IntroStage.jsx`: `min(92vw, 64svh)`, `rgb(var(--c-gold) / 0.35)` | bigger number = bigger/stronger |
| Cover text appearing | `IntroStage.jsx`: `staggerChildren: 0.18`, `delayChildren: 0.3` | each line 0.18 s after the last |
>>>>>>> 628a69eb273ca9052674eb3fa842ee740de8610f
| Gold shimmer speed | `app/globals.css`: `animation: gold-sweep 9s linear infinite` | 9 s per sweep (smaller = faster) |
| Sparkle twinkle length | `FloralDecorations.jsx`: `seconds: rand(1.8, 3.6)` | 1.8 to 3.6 s |
| Pause between sparkles | `FloralDecorations.jsx`: `rand(100, 1800)` | 0.1 to 1.8 s |
| Sparkle brightness | `FloralDecorations.jsx`: `peak: rand(0.65, 1)` | 65% to 100% |
| Photos fading in | `PhotoGallery.jsx`: `duration: 1.7`, `delay: column * 0.4` | 1.7 s; right photo 0.4 s after left |

---

## 8. Khmer text and fonts

**Type Khmer anywhere** in `config/weddingData.js` (fields ending in `Km`, or any other text) and it automatically displays in the Khmer fonts. Latin letters keep their own fonts (Cormorant Garamond for headings, Plus Jakarta Sans for body).

There are three Khmer font slots:

```js
fonts: {
  khmerDisplay:     { family: "Moul", google: true },       // titles and names
  khmerBody:        { family: "Battambang", google: true }, // small labels
  khmerDescription: { family: "Moulpali", google: true },   // the invitation paragraph and program lines
},
```
- **Titles (Muol style):** `Moul`, `Moulpali`, `Koulen`, `Bokor`. **Body:** `Battambang`, `Siemreap`, `Noto Serif Khmer`, `Kantumruy Pro`, `Hanuman`, `Nokora`.
- Use the exact name from [fonts.google.com](https://fonts.google.com) (filter Language: Khmer). Only the Khmer letters are downloaded.

**Khmer Borann** (for the description text, as in your sample) is not on Google Fonts. Moulpali is the closest free match, and it is the default. To use real Khmer Borann:
1. Put the font file at `public/fonts/KhmerBorann.ttf` (check that your license allows web use).
2. Set `khmerDescription: { family: "Khmer Borann", google: false }`.

`app/globals.css` already contains the matching `@font-face` rule. Guests who have the font installed see it even without the file.

**"Khmer OS Muol Light"** (a Windows font) works the same way: put the file at `public/fonts/KhmerOSMuolLight.ttf` and set `khmerDisplay: { family: "Khmer OS Muol Light", google: false }`.

**Latin fonts:** change them in `app/layout.js` (the `Cormorant_Garamond` and `Plus_Jakarta_Sans` lines). Keep the `variable:` names.

In your own edits, mark Khmer text with `lang="km"` and use the classes `font-khmer` (small text), `font-khmer-display` (titles) or `font-khmer-desc` (descriptions).

---

## 9. Photos and video

### Photos (`gallery`): 14 are set up
- Use **10 to 20 photos** (5 to 10 rows). More than 20 are ignored. An even number looks best; with an odd number the last photo is centered. The list in `weddingData.js` has 14 entries (7 rows); replace the files and `alt` text, or add or remove lines.
- Put your images in `public/images/` and list them:
```js
gallery: {
  heading: "Our moments", intro: "…",
  images: [
    { src: "/images/our-engagement.jpg", alt: "HAS Sothea and PHAI Phanich at the lake" },
    // … 10 to 20 of these
  ],
},
```
- Two columns on phones and computers, in gold frames. Each row fades in slowly as guests scroll down (left photo first). Tapping a photo enlarges it (arrows and Esc work).
- **Make them small and fast.** Resize before uploading: about **1200 px wide**, portrait **4:5** (1200 × 1500), JPG quality **75 to 80%** (about 100 to 250 KB each). WebP is about 25% smaller and works everywhere (only the file name changes). Remove location data. Free tool: squoosh.app. Batch with ImageMagick:
```bash
mkdir out
magick mogrify -path out -resize 1200x1500^ -gravity center -extent 1200x1500 -quality 78 -strip *.jpg
```

<<<<<<< HEAD
### Make it fast (images, fonts, music)
The invitation is built to load quickly, and shows only one page at a time (the map and photos load only when a guest reaches them).

- **Photos are resized automatically.** Photos use `next/image`: on Vercel each photo is resized for the guest's screen and sent as WebP (typically 70 to 90% smaller than the original JPG), then cached for a year. This is set in `next.config.js` (`images`). The placeholder `.svg` files are left as they are.
- **Shrink your photos once, before uploading (recommended).** Put your originals in a folder `photos-original/` in the project, then run:
```bash
npm install          # first time only
npm run optimize
```
It writes small versions to `public/images/` (4:5 portrait, 1200 x 1500, quality 78, no location data, about 150 to 250 KB each). Use `npm run optimize -- photos-original public/images --fit=inside` to keep each photo's own shape instead of cropping to 4:5. Then list the new files (for example `/images/photo-1.jpg`) in `gallery.images`.
- **Vercel's free plan** includes a monthly allowance of optimized source images; 14 to 20 photos is far below it. If you ever exceed it, the pre-shrunk files from `npm run optimize` still load fast.
- **Fonts:** the Khmer fonts load after the page first appears, and only the weights the design uses are downloaded.
- **Music:** use a 128 kbps mp3 (3 to 4 MB). It downloads only when the music starts.
- **Video:** use an unlisted YouTube link rather than a large mp4.
- **Older phones:** lower `motion.sparkles.count` (for example `6`), or set `romance.shimmer: false`.

=======
>>>>>>> 628a69eb273ca9052674eb3fa842ee740de8610f
### The couple's round photos (`couple.groom.photo`, `couple.bride.photo`)
Save a square-ish portrait (about 600 × 600 px) in `public/images/` and set `photo: "/images/groom.jpg"`. It is cropped to a circle with a gold ring. With no photo, the ring shows the initial letter.

### Video (`video`)
```js
video: { title: "Our story in a few minutes", src: "", type: "auto", poster: "" },
```
`src` can be a YouTube link, a Vimeo link, or a file like `/videos/highlight.mp4` (put it in `public/videos/`). It appears **above the photos**. Leave `src` empty (or set `sections.video: false`) and no video shows. YouTube and Vimeo load only after a guest taps play. For anything longer than a minute or two, use an unlisted YouTube video rather than a large MP4. `poster` is an optional cover image.

---

## 10. RSVP: where replies go

In `rsvp`, set `mode` to one of the following. The default `"demo"` **sends nothing** (it only previews the form), so choose a real mode before sending invitations and always send yourself a test reply.

| `mode` | What happens | What you set |
|---|---|---|
| `"formspree"` | Replies arrive by email | Create a free form at formspree.io, set `formspreeEndpoint` to its link |
| `"googleForm"` | Replies land in a Google Sheet | See below |
| `"whatsapp"` | Opens WhatsApp with a ready message | `whatsappNumber` (digits, with country code) |
| `"email"` | Opens the guest's email app | `email` |

Other settings: `deadline` (text shown on the form), `maxGuests` (the guest-count choices), `labels`, `successYes`, `successNo` (messages shown after sending).

**Google Form setup:** make a form with four questions: Name (short answer), Attending (multiple choice with exactly the two `labels` options), Guests (short answer), Message (paragraph). Choose **⋮ → Get pre-filled link**, fill in sample answers, click **Get link**, and open it. In its address bar you will see four `entry.123456789=` numbers. Take the form's normal address, change `viewform` to `formResponse`, and put it in `googleForm.action`. Put the four entry numbers in `googleForm.fields`.

---

## 11. Calendar, map and QR code

- **Add to Calendar** (Google and Apple/Outlook) uses `event.start`, `event.end`, `event.timezone`, `event.calendarTitle` and `event.calendarDescription`, and `venue` for the location. It is the evening reception.
- **Map:** `venue.mapQuery` is what Google Maps searches for. **After you change anything, open the page and check the pin is in the right place.** For an exact pin, open Google Maps, find the place, choose **Share → Embed a map**, copy the `src="…"` link and paste it into `venue.mapEmbedUrl`.
- **Your own QR code:** save the image as `public/images/location-qr.png` (or point `venue.qrImage` at another file), then set `venue.display: "qr"`. The QR is shown on a white panel so phones can scan it. To switch back, set `venue.display: "map"`.
- **Get directions** always appears. It opens Google Maps directions to `venue.mapQuery`, or to your `venue.directionsUrl` if you set one.

---

## 12. Recipes: common changes

| I want to… | Do this |
|---|---|
| Change the names | `couple.groom` / `couple.bride` (`name`, `cover`, `nameKm`) |
| Add the couple's round photos | `couple.groom.photo` / `couple.bride.photo` |
| Change the parents | `father`, `mother` (and `fatherKm`, `motherKm`) under each person |
| Change the date | `event.start`, `event.end`, `event.timeLabel`, `event.whenKm`, and the day titles in `program.days` |
| Change the Khmer invitation paragraph | `hero.invitationTextKm` |
| Remove the video | Leave `video.src` empty |
| Hide the RSVP page | `sections.rsvp: false` |
| Hide the invitation page | `sections.info: false` |
<<<<<<< HEAD
| How long each page stays in auto-play | `motion.autoScroll.pageSeconds` |
| Turn auto-play off | `motion.autoScroll.enabled: false` |
| Slower or faster page fades | `motion.pageFade` (`outSeconds`, `inSeconds`) |
| Add background music | `music.src` (mp3 in `public/audio/` or a YouTube link) |
| Shrink my photos | `npm run optimize` (section 9) |
=======
| Slower or faster auto-scroll | `motion.autoScroll.speed` |
| Turn auto-scroll off | `motion.autoScroll.enabled: false` |
| Longer or shorter cover and "The wedding of" | `h-[300svh]` and the `cover`/`second` numbers in `IntroStage.jsx` |
>>>>>>> 628a69eb273ca9052674eb3fa842ee740de8610f
| More or fewer sparkles | `motion.sparkles.count` |
| Remove the glow or the shimmer | `motion.romance.glow` / `shimmer` to `false` |
| Two-column program | `program.columns: 2` |
| Show my QR code | `venue.display: "qr"` and add `public/images/location-qr.png` |
| Change the brown | `--c-cream` in `app/globals.css` |
| Fainter or stronger background pattern | `fill-opacity` / `stroke-opacity` in `lib/background.js` |
<<<<<<< HEAD
| Bigger names | the `clamp(…)` on the names in `IntroPages.jsx` |
=======
| Bigger cover names | the `clamp(…)` on the names in `IntroStage.jsx` |
>>>>>>> 628a69eb273ca9052674eb3fa842ee740de8610f
| Real Khmer Borann font | section 8 |
| Add a program row | Copy an `{ time: …, title: … }` line in `program.days[].items` |
| Remove the fade at the top | `motion.topFade.enabled: false` |

---

## 13. Troubleshooting

- **The cover says "Valued Guest":** the link needs `?to=Name`. Names with `&` need `%26`.
- **Khmer shows as boxes or a plain font:** check the font's exact spelling in `fonts` and that `google` is `true`.
- **Text near the top or bottom looks cut off:** gold text must sit on an inner `<span className="gold-text">`, not on the heading box itself (this is already done everywhere; keep it when you edit).
- **A photo does not change:** the file name and capital letters in `src` must match exactly (Vercel is case-sensitive).
- **The round photo looks stretched or off-center:** use a square-ish image with the face in the middle; it is cropped to a circle.
- **Map shows the wrong place:** give a more specific `venue.mapQuery` or use `venue.mapEmbedUrl`.
- **Calendar time is off:** set `event.timezone` to your venue's zone (`Asia/Phnom_Penh` for Cambodia). Times are the venue's local time.
- **QR code does not show:** make sure the file is at `public/images/location-qr.png` and `venue.display` is `"qr"`.
<<<<<<< HEAD
- **Cover or "The wedding of" feels cramped on a short screen:** lower the `clamp(…)` maximums for the lines in `IntroPages.jsx`, or use shorter names in `cover`.
- **No music:** check `music.src` and that the file is in `public/audio/`. Browsers only allow sound after a tap, so press **Open invitation**, or the round sound button (bottom right). YouTube links can be blocked by the video's owner; an mp3 always works.
- **Pages change too fast or too slow:** `motion.pageFade`. **A scroll did nothing:** a page change was still running (about 2.5 seconds); try again.
- **Photos look slow:** run `npm run optimize` and use the shrunk files (section 9).
- **No motion at all:** the guest's device is set to "reduce motion", which turns animations (and auto-play) off on purpose.
=======
- **Cover or "The wedding of" feels cramped on a short screen:** lower the `clamp(…)` maximums for the lines in `IntroStage.jsx`, or use shorter names in `cover`.
- **No motion at all:** the guest's device is set to "reduce motion", which turns animations off on purpose.
>>>>>>> 628a69eb273ca9052674eb3fa842ee740de8610f
- **Changes do not appear on the live site:** commit and push to GitHub; Vercel redeploys in about a minute.
