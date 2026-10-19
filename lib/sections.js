import { weddingData } from "@/config/weddingData";

/** Which parts of the invitation are switched on (see `sections` in config/weddingData.js). */
const s = { info: true, schedule: true, map: true, video: true, rsvp: true, gallery: true, closing: true, ...weddingData.sections };
export const show = { ...s, video: s.video && !!weddingData.video?.src }; // no video link → no video

/** Pages in order. A page disappears when everything on it is switched off. */
export const SECTIONS = [
  { id: "welcome", label: "Cover", on: true },
<<<<<<< HEAD
  { id: "wedding", label: "The wedding of", on: true },
=======
>>>>>>> 628a69eb273ca9052674eb3fa842ee740de8610f
  { id: "info", label: "The invitation", on: show.info },
  { id: "program", label: "Program and map", on: show.schedule || show.map },
  { id: "rsvp", label: "RSVP", on: show.rsvp },
  { id: "gallery", label: "Video and photos", on: show.video || show.gallery || show.closing },
].filter((x) => x.on);
