/**
 * ====================================================================
 *  weddingData.js: the ONLY file you need to edit to personalize
 *  the invitation. No code knowledge required.
 *
 *  - Text in "quotes" is shown to guests exactly as written.
 *  - Dates use the format "YYYY-MM-DDTHH:MM:SS" (24-hour clock).
 *  - Images live in /public/images. Replace the files (keeping the
 *    names) or point "src" at any https:// image URL.
 *  - Colors are NOT here; they live in app/globals.css (:root).
 * ====================================================================
 */

export const weddingData = {
  /* ---------- Browser tab + link previews ---------- */
  meta: {
    title: "HAS Sothea & PHAI Phanich | Wedding Invitation",
    description:
      "You are invited to the wedding of HAS Sothea and PHAI Phanich on 19 December 2026.",
    hashtag: "#SotheaAndPhanich",
  },

  /* ---------- Show or hide parts (true / false) ---------- */
  sections: {
    info: true, // the invitation page: parents, names, photo circles, date and place
    schedule: true, // wedding program + add to calendar
    map: true, // venue, map, directions (beside the schedule; below it on phones)
    video: true, // highlight video, above the photos (also hidden when video.src is empty)
    rsvp: false, // the "Will you join us?" form
    gallery: true, // the photos
    closing: true, // thank-you message at the very end
  },

  /* ---------- Khmer fonts ----------
     Anything you type in Khmer anywhere in this file is shown in these
     fonts automatically (Latin letters keep their own elegant fonts).
       khmerDisplay → headings / names   (try Moul, Moulpali, Koulen, Bokor)
       khmerBody    → paragraphs         (try Battambang, Siemreap, Noto Serif Khmer,
                                          Kantumruy Pro, Hanuman)
     "google: true" loads the font from Google Fonts by its exact name.
     For "Khmer OS Muol Light" (a Windows font, not on Google Fonts):
     see the README, then use  { family: "Khmer OS Muol Light", google: false }.  */
  fonts: {
    khmerDisplay: { family: "Moul", google: true },
    khmerBody: { family: "Battambang", google: true },
    // The long Khmer descriptions (invitation paragraph, program lines). "Khmer Borann" is not on
    // Google Fonts: see the README to add it. Moulpali is the closest free match.
    khmerDescription: { family: "Moulpali", google: true },
  },

  /* ---------- The couple ---------- */
  couple: {
    groom: {
      name: "HAS Sothea",
      cover: "Sothea", // shown on the cover page
      nameKm: "ហាស់ សុធា", // the name in Khmer script (optional)
      fullName: "HAS Sothea",
      parents: "Son of Mr. HAS Sothy and Mrs. YUON Chanty",
      father: "Mr. HAS Sothy", // shown on the invitation page
      fatherKm: "", // optional: in Khmer
      mother: "Mrs. YUON Chanty",
      motherKm: "",
      photo: "/images/groom.jpg", // round photo, e.g. "/images/groom.jpg" (leave empty to show the initial)
    },
    bride: {
      name: "PHAI Phanich",
      cover: "Phanich", // shown on the cover page
      nameKm: "ផៃ ផានិច", // the name in Khmer script (optional)
      fullName: "PHAI Phanich",
      parents: "Daughter of Mr. MAO Phai and Mrs. PHORN Sophea",
      father: "Mr. MAO Phai",
      fatherKm: "",
      mother: "Mrs. PHORN Sophea",
      motherKm: "",
      photo: "/images/bride.jpg", // round photo, e.g. "/images/bride.jpg" (leave empty to show the initial)
    },
  },

  /* ---------- Personalized greeting ----------
     Link:  https://your-site.vercel.app/?to=John+%26+Mary
     Shows: "Dear John & Mary"
     No name in the link → "Dear Valued Guest"                   */
  guest: {
    fallback: "Valued Guest",
    queryKeys: ["to", "guest"], // ?to=… or ?guest=…
  },

  /* ---------- Automatic movement ----------
     Both are switched off for guests who use "reduce motion".      */
  motion: {
    // How the pages change. ONE scroll, swipe or key press moves to the next page:
    // the old page fades out slowly, then the new page fades in.
    pageFade: {
      outSeconds: 1.6, // the old page fading out
      inSeconds: 1.8, // the new page fading in
    },

    // Auto-play: the invitation turns its own pages, starting a few seconds after it loads.
    // A page that fits the screen stays for `pageSeconds`; a long page is first scrolled slowly
    // (`speed`) to its end. Any click, tap, scroll or key press stops it for good.
    autoScroll: {
      enabled: true,
      startDelayMs: 3000, // wait this long after the page loads
      pageSeconds: 6, // how long each page stays before fading to the next
      speed: 120, // pixels per second for long pages: 60 = slow, 120 = brisk, 200 = fast
    },

    // Random twinkling sparkles in the background.
    sparkles: {
      count: 12, // how many at once. 0 = off
      size: { min: 8, max: 18 }, // size range, in pixels
    },

    // Two soft, romantic touches (set either to false to turn it off).
    romance: {
      glow: true, // a warm glow that slowly breathes behind the crest on the cover
      shimmer: true, // a gentle shimmer that sweeps across the gold text
    },

    // Content fades away softly as it scrolls off the top of the screen,
    // and comes back as you scroll up. Nothing fades at the very top of the page.
    topFade: {
      enabled: true,
      heightVh: 16, // height of the fade band, in % of screen height
    },
  },

  /* ---------- Background music ----------
     src: a file you put in public/audio (for example "/audio/wedding.mp3"),
          or a YouTube link (https://www.youtube.com/watch?v=XXXXXXXXXXX).
     Leave src empty for no music. Browsers only allow sound after a tap, so the
     music starts when the guest presses "Open invitation"; the round sound
     button (bottom right) lets them pause or play at any time.            */
  music: {
    src: "https://www.youtube.com/watch?v=Mn_qLC7_ueA",
    startOn: "open", // "open" = starts at "Open invitation"; "button" = only from the sound button
    volume: 0.6, // 0 (silent) to 1 (full)
    loop: true,
    showButton: true,
  },

  /* ---------- Cambodian touches ---------- */
  khmer: {
    angkorSilhouette: true, // very faint Angkor Wat shadow along the bottom
  },

  /* ---------- Pages 1 and 2: the full-screen cover, then "The wedding of" ----------
     The cover fades out, "The wedding of" fades in, then fades out into the invitation page. */
  hero: {
    titleKm: "សិរីមង្គលអាពាហ៍ពិពាហ៍", // heading on the cover and the invitation page
    monogram: "សុធា & ផានិច", // inside the crest on the cover
    weddingOf: "The wedding of", // the line above the names on page 2
    weddingOfKm: "", // optional: the same in Khmer
    inviteKm: "សូមគោរពអញ្ជើញ", // line above the guest's name
    invite: "Respectfully invites",
    openKm: "បើកធៀប", // the gold button on the cover
    open: "Open invitation",
    openHintKm: "សូមមេត្តាចុចដើម្បីបើកធៀបអេឡិចត្រូនិច",
    openHint: "Tap to open the invitation",
    // The invitation paragraph (invitation page). Shown in the "description" Khmer font.
    invitationTextKm:
      "ឯកឧត្តម លោកជំទាវ លោកអ្នកឧកញ៉ា អ្នកឧកញ៉ា ឧកញ៉ា លោក លោកស្រី អ្នកនាង កញ្ញា អញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យ សិរីសួស្តី ជ័យមង្គល ក្នុងពិធីសិរីមង្គលអាពាហ៍ពិពាហ៍ កូនប្រុស-កូនស្រី របស់យើងខ្ញុំ។",
    invitationText:
      "Together with our families, invite you to celebrate our wedding...",
    heldAtKm: "ដែលនឹងប្រព្រឹត្តទៅនៅ",
    heldAt: "to be held at",
  },

  /* ---------- Date & time ----------
     Used for the cover, "Add to calendar" and the map page.
     This is the evening reception (the time on the printed card).
     Times are local to the venue.                                  */
  event: {
    start: "2026-12-19T17:00:00",
    end: "2026-12-19T21:00:00",
    timeLabel: "5:00 PM",
    whenKm: "ថ្ងៃសៅរ៍ ទី១៩ ខែធ្នូ ឆ្នាំ២០២៦ វេលាម៉ោង ៥:០០ ល្ងាច",
    timezone: "Asia/Phnom_Penh", // IANA name; used by Google Calendar
    calendarTitle: "Wedding of HAS Sothea & PHAI Phanich",
    calendarDescription:
      "Wedding reception of HAS Sothea and PHAI Phanich, Saturday 19 December 2026 at 5:00 PM. The Day 1 ceremonies are on Friday 18 December.",
  },

  /* ---------- Page 2: the program (two days) ----------
     time / title are English; timeKm / titleKm are Khmer (both optional).
     icon: door | sparkles | flower | hand | gift | utensils | users |
           scissors | flame | wine | heart | church | music | camera        */
  program: {
    heading: "Wedding Program",
    headingKm: "កម្មវិធីសិរីមង្គលអាពាហ៍ពិពាហ៍",
    columns: 1, // 1 = Day 1 and Day 2 stacked in one column; 2 = side by side (on phones they always stack)
    scheduleNote: "With kind regards. Thank you!",
    scheduleNoteKm: "ដោយមេត្រីភាព សូមអរគុណ!",
    days: [
      {
        title: "Day 1: Friday, 18 December 2026",
        titleKm: "កម្មវិធីថ្ងៃទី១: ថ្ងៃសុក្រ ទី១៨ ខែធ្នូ ឆ្នាំ២០២៦",
        items: [
          { time: "1:30 PM", timeKm: "ម៉ោង ០១:៣០ រសៀល", title: "Gathering of honored guests", titleKm: "ជួបជុំភ្ញៀវកិត្តិយស", icon: "door" },
          { time: "2:00 PM", timeKm: "ម៉ោង ០២:០០ រសៀល", title: "Sen Krong Peali ceremony", titleKm: "ពិធីសែនក្រុងពាលី", icon: "sparkles" },
          { time: "3:30 PM", timeKm: "ម៉ោង ០៣:៣០ រសៀល", title: "Monks' blessing chant", titleKm: "ពិធីសូត្រមន្តចំរើនព្រះបរិត្ត", icon: "flower" },
          { time: "5:00 PM", timeKm: "ម៉ោង ០៥:០០ ល្ងាច", title: "Khan Sla offering and ring ceremony", titleKm: "ពិធីជាវខាន់ស្លា និងបំពាក់ចិញ្ចៀន", icon: "gift" },
          { time: "5:30 PM", timeKm: "ម៉ោង ០៥:៣០ ល្ងាច", title: "Dinner for honored guests", titleKm: "អញ្ជើញភ្ញៀវកិត្តិយសពិសាអាហារ ពេលល្ងាច", icon: "utensils" },
        ],
      },
      {
        title: "Day 2: Saturday, 19 December 2026",
        titleKm: "កម្មវិធីថ្ងៃទី២: ថ្ងៃសៅរ៍ ទី១៩ ខែធ្នូ ឆ្នាំ២០២៦",
        items: [
          { time: "5:30 AM", timeKm: "ម៉ោង ០៥:៣០ ព្រឹក", title: "Morning homage ceremony", titleKm: "ពិធីសំពះពេលា", icon: "hand" },
          { time: "7:00 AM", timeKm: "ម៉ោង ០៧:០០ ព្រឹក", title: "Gathering of honored guests; preparing the gift procession", titleKm: "ជួបជុំភ្ញៀវកិត្តិយស រៀបចំហែជំនូន", icon: "door" },
          { time: "7:10 AM", timeKm: "ម៉ោង ០៧:១០ ព្រឹក", title: "Gift procession into the wedding pavilion", titleKm: "ពិធីហែជំនូន (កំណត់) ចូលរោងជ័យ", icon: "gift" },
          { time: "7:30 AM", timeKm: "ម៉ោង ០៧:៣០ ព្រឹក", title: "Breakfast for honored guests", titleKm: "អញ្ជើញភ្ញៀវកិត្តិយសពិសាអាហារ ពេលព្រឹក", icon: "utensils" },
          { time: "8:00 AM", timeKm: "ម៉ោង ០៨:០០ ព្រឹក", title: "Marriage proposal ceremony and betel ritual (arranging the fruit)", titleKm: "ពិធីជំនុំជើងការ និងពិសាស្លាកំណត់ (រៀបរាប់ផ្លែឈើ)", icon: "users" },
          { time: "9:30 AM", timeKm: "ម៉ោង ០៩:៣០ ព្រឹក", title: "Hair-cutting ceremony and family photos (15 to 20 minutes)", titleKm: "ពិធីកាត់សក់បង្កក់សិរី កម្មវិធីថតរូបជុំគ្រួសារ (១៥-២០នាទី)", icon: "scissors" },
          { time: "11:00 AM", timeKm: "ម៉ោង ១១:០០ ព្រឹក", title: "Candle-circling, nuptial bowing and wrist-tying ceremony", titleKm: "ពិធីបង្វិលពពិល និងសំពះផ្ទឹមសែនចងដៃ", icon: "flame" },
          { time: "11:30 AM", timeKm: "ម៉ោង ១១:៣០ ថ្ងៃត្រង់", title: "Lunch for honored guests", titleKm: "អញ្ជើញភ្ញៀវកិត្តិយសពិសាភោជនាហារ ថ្ងៃត្រង់", icon: "utensils" },
          { time: "5:00 PM", timeKm: "ម៉ោង ០៥:០០ ល្ងាច", title: "Evening dinner reception", titleKm: "អញ្ជើញភ្ញៀវកិត្តិយសពិសាភោជនាហារ ពេលល្ងាច", icon: "wine" },
        ],
      },
    ],
  },

  /* ---------- Photo gallery (the last page) ----------
     Two columns on phones and computers. Use 10 to 20 photos (5 to 10 rows),
     an even number looks best. Each row fades in slowly as guests scroll down.
     Photos display in a 4:5 portrait frame with slightly rounded corners.  */
  gallery: {
    heading: "Our moments",
    intro: "A few frames from the road to this day.",
    images: [
      { src: "/images/gallery-1.jpg", alt: "Photo 1 of the couple" },
      { src: "/images/gallery-02.JPG", alt: "Photo 2 of the couple" },
      { src: "/images/gallery-03.JPG", alt: "Photo 3 of the couple" },
      { src: "/images/gallery-04.JPG", alt: "Photo 4 of the couple" },
      { src: "/images/gallery-05.JPG", alt: "Photo 5 of the couple" },
      { src: "/images/gallery-06.JPG", alt: "Photo 6 of the couple" },
      { src: "/images/gallery-07.JPG", alt: "Photo 7 of the couple" },
      { src: "/images/gallery-08.JPG", alt: "Photo 8 of the couple" },
      { src: "/images/gallery-09.JPG", alt: "Photo 9 of the couple" },
      { src: "/images/gallery-010.JPG", alt: "Photo 10 of the couple" },
      { src: "/images/gallery-011.JPG", alt: "Photo 11 of the couple" },
      { src: "/images/gallery-012.JPG", alt: "Photo 12 of the couple" },
      { src: "/images/gallery-013.JPG", alt: "Photo 13 of the couple" },
      { src: "/images/gallery-014.JPG", alt: "Photo 14 of the couple" },
      { src: "/images/gallery-015.JPG", alt: "Photo 15 of the couple" },
      { src: "/images/gallery-016.JPG", alt: "Photo 16 of the couple" },
      { src: "/images/gallery-017.JPG", alt: "Photo 17 of the couple" },
      { src: "/images/gallery-018.JPG", alt: "Photo 18 of the couple" }
    ],
  },

  /* ---------- Highlight video ----------
     src can be:
       a YouTube link   https://www.youtube.com/watch?v=XXXXXXXXXXX
       a Vimeo link     https://vimeo.com/123456789
       a local MP4      /videos/highlight.mp4  (put the file in /public/videos)
     Leave src empty ("") to hide the video. It appears above the photos.   */
  video: {
    title: "Our story in a few minutes",
    src: "",
    type: "auto", // "auto" | "youtube" | "vimeo" | "file"
    poster: "", // optional cover image for the video (leave empty for none)
  },

  /* ---------- Venue and map (beside the program) ---------- */
  venue: {
    name: "Sereimongkol Restaurant",
    nameKm: "ភោជនីយដ្ឋាន សិរីមង្គល",
    short: "Bavel, Battambang", // shown under the date on the cover
    addressLines: ["Bavel Village 1, Bavel Commune", "Bavel District, Battambang Province"],
    addressKm: "ភូមិបវេល១ ឃុំបវេល ស្រុកបវេល ខេត្តបាត់ដំបង",
    coverKm:
      "ស្ថិតនៅ ភោជនីយដ្ឋាន សិរីមង្គល ភូមិបវេល១ ឃុំបវេល ស្រុកបវេល ខេត្តបាត់ដំបង (ខាងកើតធនាគារABA ចម្ងាយ50m)",
    notes: ["East of ABA Bank, about 50 m."],
    notesKm: ["ខាងកើតធនាគារ ABA ចម្ងាយ ៥០ម៉ែត្រ"],
    // What to show in the location area: "map" (the Google map) or "qr" (your own QR code image).
    // The "Get directions" button is shown either way.
    display: "qr",
    qrImage: "/images/wedding_resto.jpg", // save your QR image as public/images/location-qr.png
    qrCaption: "Scan to open the location in your maps app",
    qrCaptionKm: "ស្កេនដើម្បីមើលទីតាំង",
    // What Google Maps should search for. Check that it lands on the right pin.
    mapQuery: "Sereimongkol Restaurant, Bavel, Battambang, Cambodia",
    // Optional: paste a full Google Maps "Embed a map" URL to override the above.
    mapEmbedUrl: "",
    // Optional: override the "Get directions" link.
    directionsUrl: "",
  },

  /* ---------- RSVP ----------
     mode:
       "demo"       → nothing is sent (good for previewing)
       "formspree"  → posts to your Formspree form (free tier available)
       "googleForm" → posts into a Google Form (responses land in Google Sheets)
       "whatsapp"   → opens WhatsApp with a ready-to-send message
       "email"      → opens the guest's email app                           */
  rsvp: {
    mode: "demo",
    deadline: "1 December 2026",
    maxGuests: 4,
    labels: { yes: "Joyfully accepts", no: "Regretfully declines" },
    successYes: "Thank you! We can't wait to celebrate with you.",
    successNo: "Thank you for letting us know. We'll miss you.",

    formspreeEndpoint: "https://formspree.io/f/your-form-id",

    googleForm: {
      action: "https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse",
      // Map each field to its Google Form entry id (see README).
      fields: {
        name: "entry.1111111111",
        attending: "entry.2222222222",
        guests: "entry.3333333333",
        message: "entry.4444444444",
      },
    },

    whatsappNumber: "15551234567", // country code + number, digits only
    email: "rsvp@example.com",
  },

  /* ---------- Farewell (bottom of the last page) ---------- */
  closing: {
    heading: "Thank you for being part of our story",
    headingKm: "", // optional Khmer version
    message:
      "Your love and company mean more to us than any gift. Whether you celebrate in person or from afar, we are grateful to have you in our lives.",
    messageKm: "", // optional Khmer version
    signoff: "With love,",
    showParents: true,
  },
};

export default weddingData;
