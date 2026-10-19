/**
 * Slow, continuous auto-scroll.
 *
 * Starts `startDelayMs` after it is called, then drifts the page down at
 * `speed` pixels per second until the guest clicks / taps / scrolls / presses
 * a key, drags the scrollbar, or the page reaches its end.
 *
 * Why it keeps its own position: browsers round `scrollY` to whole pixels, so
 * a slow speed (under ~60 px/s is less than 1 px per frame) would never move if
 * we added to `scrollY` each frame. We add to our own fractional `pos` instead.
 *
 * `env` exists so this can be tested without a browser.
 */
const STOP_EVENTS = ["pointerdown", "wheel", "touchstart", "keydown"];

export function startAutoScroll({ speed = 40, startDelayMs = 3000 } = {}, env = {}) {
  const win = env.win ?? window;
  const root = env.root ?? document.documentElement;
  const raf = env.raf ?? ((fn) => requestAnimationFrame(fn));
  const caf = env.caf ?? ((id) => cancelAnimationFrame(id));
  const now = env.now ?? (() => performance.now());
  const later = env.setTimeout ?? ((fn, ms) => setTimeout(fn, ms));
  const unlater = env.clearTimeout ?? ((id) => clearTimeout(id));

  let rafId = 0;
  let timer = 0;
  let running = false;
  let done = false;
  let pos = 0;
  let last = 0;

  const stop = () => {
    if (done) return;
    done = true;
    unlater(timer);
    caf(rafId);
    if (running) {
      root.style.scrollSnapType = "";
      root.style.scrollBehavior = "";
    }
    STOP_EVENTS.forEach((name) => win.removeEventListener(name, stop, true));
  };

  const frame = (t) => {
    if (done) return;
    const dt = Math.max(0, Math.min(64, t - last)); // clamp so a background tab can't cause a jump
    last = t;

    // The guest moved the page themselves (e.g. dragged the scrollbar): hand control back.
    if (Math.abs(win.scrollY - pos) > 4) return stop();

    const max = root.scrollHeight - win.innerHeight;
    pos = Math.min(max, pos + (speed * dt) / 1000);
    win.scrollTo(0, pos); // numeric form works in every browser; smooth-scroll CSS is disabled below

    if (pos >= max - 0.5) return stop(); // reached the end
    rafId = raf(frame);
  };

  // Any click, tap, wheel, swipe or key press ends the auto-scroll for good.
  STOP_EVENTS.forEach((name) => win.addEventListener(name, stop, { capture: true, passive: true }));

  timer = later(() => {
    if (done) return;
    running = true;
    pos = win.scrollY;
    last = now();
    // CSS smooth-scroll and snap points would fight a per-frame scroll.
    root.style.scrollBehavior = "auto";
    root.style.scrollSnapType = "none";
    rafId = raf(frame);
  }, startDelayMs);

  return stop;
}
