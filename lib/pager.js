/**
 * One scroll = one page.
 *
 * The invitation is a stack of pages. A wheel flick, a swipe or a key press at the
 * edge of the current page moves to the next (or previous) page. Inside a page that
 * is taller than the screen, scrolling is normal until you reach its end; then ONE
 * more scroll moves on. While a page change is running, further input is ignored,
 * so a long trackpad flick can never skip several pages.
 *
 * `env` values are injected so this can be tested without a browser.
 */
export function attachPagerInput({ win, getPanel, getPage, count, goTo, isBusy, modalOpen, now }) {
  win = win ?? window;
  now = now ?? (() => performance.now());
  modalOpen = modalOpen ?? (() => document.documentElement.dataset.modal === "open");

  let lastWheel = -1e9;
  let edgeAtStart = false;
  let touchY = 0;
  let touchEdge = { top: false, bottom: false };

  const edges = () => {
    const el = getPanel();
    if (!el) return { top: true, bottom: true };
    const max = el.scrollHeight - el.clientHeight;
    return { top: el.scrollTop <= 2, bottom: el.scrollTop >= max - 2 };
  };
  const target = (dir) => {
    const t = getPage() + dir;
    return t >= 0 && t < count ? t : -1;
  };

  const onWheel = (e) => {
    if (modalOpen()) return;
    if (isBusy()) {
      e.preventDefault();
      return;
    }
    if (Math.abs(e.deltaY) < 3) return;
    const dir = e.deltaY > 0 ? 1 : -1;
    const ed = edges();
    const atEdge = dir > 0 ? ed.bottom : ed.top;
    const t = now();
    // A new gesture starts after a short pause. Only a gesture that STARTED at the edge may change page,
    // so the tail of a scroll that merely arrives at the bottom never skips ahead.
    if (t - lastWheel > 220) edgeAtStart = atEdge;
    lastWheel = t;
    if (atEdge && edgeAtStart) {
      const to = target(dir);
      if (to >= 0) {
        e.preventDefault();
        goTo(to);
      }
    }
  };

  const onTouchStart = (e) => {
    touchY = e.touches[0].clientY;
    touchEdge = edges();
  };
  const onTouchEnd = (e) => {
    if (isBusy() || modalOpen()) return;
    const dy = touchY - e.changedTouches[0].clientY;
    if (Math.abs(dy) < 60) return;
    const dir = dy > 0 ? 1 : -1;
    const ed = edges();
    const ok = dir > 0 ? touchEdge.bottom && ed.bottom : touchEdge.top && ed.top;
    const to = target(dir);
    if (ok && to >= 0) goTo(to);
  };

  const onKey = (e) => {
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    if (modalOpen()) return;
    const tag = (e.target && e.target.tagName) || "BODY";
    if (/^(INPUT|TEXTAREA|SELECT|IFRAME|VIDEO)$/.test(tag) || (e.target && e.target.isContentEditable)) return;
    if (e.key === " " && /^(BUTTON|A)$/.test(tag)) return; // let Space press a focused button
    const down = e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ";
    const up = e.key === "ArrowUp" || e.key === "PageUp";
    if (!down && !up) return;
    if (isBusy()) {
      e.preventDefault();
      return;
    }
    const el = getPanel();
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    const vh = win.innerHeight || el.clientHeight;
    if (down) {
      const remaining = max - el.scrollTop;
      if (remaining > 4) {
        e.preventDefault();
        el.scrollBy({ top: Math.min(remaining, vh * 0.7), behavior: "smooth" });
        return;
      }
      const to = target(1);
      if (to >= 0) {
        e.preventDefault();
        goTo(to);
      }
    } else {
      if (el.scrollTop > 4) {
        e.preventDefault();
        el.scrollBy({ top: -Math.min(el.scrollTop, vh * 0.7), behavior: "smooth" });
        return;
      }
      const to = target(-1);
      if (to >= 0) {
        e.preventDefault();
        goTo(to);
      }
    }
  };

  win.addEventListener("wheel", onWheel, { passive: false });
  win.addEventListener("touchstart", onTouchStart, { passive: true });
  win.addEventListener("touchend", onTouchEnd, { passive: true });
  win.addEventListener("keydown", onKey);
  return () => {
    win.removeEventListener("wheel", onWheel);
    win.removeEventListener("touchstart", onTouchStart);
    win.removeEventListener("touchend", onTouchEnd);
    win.removeEventListener("keydown", onKey);
  };
}
