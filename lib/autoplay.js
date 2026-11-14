/**
 * Auto-play: the invitation turns its own pages until the guest takes over.
 *
 *  - starts `startDelayMs` after the page loads (3 s by default)
 *  - a page that fits the screen stays `pageSeconds`, then fades to the next page
 *  - a page taller than the screen is first scrolled slowly (`speed` pixels per second)
 *    to its end, rests a moment, then fades to the next page
 *  - any click, tap, scroll, swipe or key press stops it for good (so does the last page)
 *
 * `api` = { getPanel, getPage, count, next, isBusy, transitionMs }. `env` is injectable for tests.
 */

// import { MUSIC_EVENT } from "@/lib/music";

// const STOP_EVENTS = ["pointerdown", "wheel", "touchstart", "keydown"];

// export function startAutoplay(opts, api, env = {}) {
//   const { startDelayMs = 3000, speed = 120, pageSeconds = 6, endDwellMs = 2500 } = opts || {};
//   const win = env.win ?? window;
//   const raf = env.raf ?? ((fn) => requestAnimationFrame(fn));
//   const caf = env.caf ?? ((id) => cancelAnimationFrame(id));

//   let id = 0;
//   let done = false;
//   let waitUntil = null;
//   let scrolling = false;
//   let pos = 0;
//   let last = 0;

//   const stop = () => {
//     if (done) return;
//     done = true;
//     caf(id);
//     STOP_EVENTS.forEach((name) => win.removeEventListener(name, stop, true));
//   };

//   const frame = (t) => {
//     if (done) return;
//     id = raf(frame);
//     if (waitUntil === null) waitUntil = t + startDelayMs; // the clock starts on the first frame
//     if (t < waitUntil || api.isBusy()) {
//       last = t;
//       return;
//     }
//     const panel = api.getPanel();
//     if (!panel) return;

//     const max = panel.scrollHeight - panel.clientHeight;
//     if (max > 4 && panel.scrollTop < max - 1) {
//       if (!scrolling) {
//         scrolling = true;
//         pos = panel.scrollTop;
//         last = t;
//       }
//       if (Math.abs(panel.scrollTop - pos) > 4) return stop(); // the guest moved it themselves
//       const dt = Math.max(0, Math.min(64, t - last));
//       last = t;
//       pos = Math.min(max, pos + (speed * dt) / 1000);
//       panel.scrollTop = pos;
//       if (pos >= max - 0.5) {
//         scrolling = false;
//         waitUntil = t + endDwellMs;
//       }
//       return;
//     }

//     scrolling = false;
//     if (api.getPage() >= api.count - 1) return stop(); // reached the last page
//     api.next();
//     waitUntil = t + (api.transitionMs || 0) + pageSeconds * 1000;
//   };

//   STOP_EVENTS.forEach((name) => win.addEventListener(name, stop, { capture: true, passive: true }));
//   id = raf(frame);
//   return stop;
// }


import { MUSIC_EVENT } from "@/lib/music";

/**
 * Auto-play: the invitation turns its own pages until the guest takes over.
 *
 *  - waits for "Open invitation" (the MUSIC_EVENT fired by startMusic()), then
 *    starts `startDelayMs` later (3 s by default)
 *  - a page that fits the screen stays `pageSeconds`, then fades to the next page
 *  - a page taller than the screen is first scrolled slowly (`speed` pixels per second)
 *    to its end, rests a moment, then fades to the next page
 *  - any click, tap, scroll, swipe or key press AFTER opening stops it for good
 *    (so does the last page)
 *
 * `api` = { getPanel, getPage, count, next, isBusy, transitionMs }. `env` is injectable for tests.
 * Set `waitForOpen: false` to start right away (no cover page).
 */
const STOP_EVENTS = ["pointerdown", "wheel", "touchstart", "keydown"];

export function startAutoplay(opts, api, env = {}) {
  const {
    startDelayMs = 3000,
    speed = 120,
    pageSeconds = 6,
    endDwellMs = 2500,
    waitForOpen = true,
    armDelayMs = 400, // ignores the tap that opened the invitation
  } = opts || {};
  const win = env.win ?? window;
  const raf = env.raf ?? ((fn) => requestAnimationFrame(fn));
  const caf = env.caf ?? ((id) => cancelAnimationFrame(id));

  let id = 0;
  let arm = 0;
  let done = false;
  let waitUntil = null;
  let scrolling = false;
  let pos = 0;
  let last = 0;

  const stop = () => {
    if (done) return;
    done = true;
    caf(id);
    clearTimeout(arm);
    win.removeEventListener(MUSIC_EVENT, begin);
    STOP_EVENTS.forEach((name) => win.removeEventListener(name, stop, true));
  };

  const frame = (t) => {
    if (done) return;
    id = raf(frame);
    if (waitUntil === null) waitUntil = t + startDelayMs; // the clock starts on the first frame
    if (t < waitUntil || api.isBusy()) {
      last = t;
      return;
    }
    const panel = api.getPanel();
    if (!panel) return;

    const max = panel.scrollHeight - panel.clientHeight;
    if (max > 4 && panel.scrollTop < max - 1) {
      if (!scrolling) {
        scrolling = true;
        pos = panel.scrollTop;
        last = t;
      }
      if (Math.abs(panel.scrollTop - pos) > 4) return stop(); // the guest moved it themselves
      const dt = Math.max(0, Math.min(64, t - last));
      last = t;
      pos = Math.min(max, pos + (speed * dt) / 1000);
      panel.scrollTop = pos;
      if (pos >= max - 0.5) {
        scrolling = false;
        waitUntil = t + endDwellMs;
      }
      return;
    }

    scrolling = false;
    if (api.getPage() >= api.count - 1) return stop(); // reached the last page
    api.next();
    waitUntil = t + (api.transitionMs || 0) + pageSeconds * 1000;
  };

  // Runs once, after "Open invitation": arm the stop listeners and start the timer.
  function begin() {
    win.removeEventListener(MUSIC_EVENT, begin);
    arm = setTimeout(() => {
      if (done) return;
      STOP_EVENTS.forEach((name) => win.addEventListener(name, stop, { capture: true, passive: true }));
      id = raf(frame);
    }, waitForOpen ? armDelayMs : 0);
  }

  if (waitForOpen) win.addEventListener(MUSIC_EVENT, begin);
  else begin();

  return stop;
}