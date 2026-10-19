/** Helpers for the background music (config: `music`). */
export const MUSIC_EVENT = "wedding:music-start";

/** Called by the "Open invitation" button: starts the music (browsers only allow sound after a tap). */
export function startMusic() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(MUSIC_EVENT));
}

/** The 11-character YouTube id from a link (or a bare id), or "" when the text is not a YouTube link. */
export function youtubeId(src = "") {
  const url = String(src).trim();
  const m = url.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/);
  if (m) return m[1];
  return /^[\w-]{11}$/.test(url) ? url : "";
}

/** "none" | "youtube" | "file" */
export function musicKind(src) {
  if (!src || !String(src).trim()) return "none";
  return youtubeId(src) ? "youtube" : "file";
}
