"use client";

import { useCallback, useEffect, useState } from "react";
import { startAutoScroll } from "@/lib/autoScroll";

const absTop = (el) => el.getBoundingClientRect().top + window.scrollY;

/**
 * Tracks which section is on screen, adds smart keyboard paging, and
 * (optionally) glides down the invitation by itself.
 *
 * Native wheel / touch / trackpad scrolling is NEVER intercepted; the page
 * is a normal scrolling document with soft snap points.
 *
 * Keys: ArrowDown / PageDown and ArrowUp / PageUp.
 *   - If the current section is taller than the screen, the key scrolls
 *     within it first. Otherwise it glides to the next / previous section.
 *   - Ignored while typing in a form field or while a modal is open.
 *
 * Auto-scroll (config: motion.autoScroll):
 *   - Starts `startDelayMs` after the page loads and drifts down at `speed`
 *     pixels per second. Because the sections cross-fade as they pass
 *     (see SectionFade), the current page fades out while the next fades in.
 *   - Any click, tap, wheel, swipe or key press stops it for good; so does
 *     reaching the end. Off for guests who prefer reduced motion.
 */
export function useSectionNav(ids, autoScroll) {
  const [active, setActive] = useState(0);

  const goTo = useCallback(
    (index) => {
      const i = Math.max(0, Math.min(ids.length - 1, index));
      document.getElementById(ids[i])?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [ids]
  );

  // Which section is currently "active"?
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setActive(currentIndex(ids));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ids]);

  // Keyboard paging.
  useEffect(() => {
    const onKey = (e) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      if (document.documentElement.dataset.modal === "open") return;

      const t = e.target;
      if (
        t instanceof HTMLElement &&
        (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT|IFRAME|VIDEO)$/.test(t.tagName))
      ) {
        return;
      }

      const down = e.key === "ArrowDown" || e.key === "PageDown";
      const up = e.key === "ArrowUp" || e.key === "PageUp";
      if (!down && !up) return;

      if (step(ids, down ? 1 : -1)) e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ids]);

  // Continuous, slow auto-scroll (config: motion.autoScroll). See lib/autoScroll.js.
  const speed = autoScroll?.speed ?? 40;
  const enabled = !!autoScroll?.enabled && speed > 0;
  const startDelayMs = autoScroll?.startDelayMs ?? 3000;
  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    return startAutoScroll({ speed, startDelayMs });
  }, [enabled, speed, startDelayMs]);

  return { active, goTo };
}

/** Index of the section whose top has passed the middle of the screen. */
function currentIndex(ids) {
  const mid = window.innerHeight * 0.5;
  let index = 0;
  ids.forEach((id, i) => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= mid) index = i;
  });
  return index;
}

/**
 * Moves one "step" down (dir = 1) or up (dir = -1).
 * Returns true if it scrolled, false if there was nowhere to go.
 */
function step(ids, dir) {
  const vh = window.innerHeight;
  const index = currentIndex(ids);
  const rect = document.getElementById(ids[index]).getBoundingClientRect();
  const stride = vh * 0.7;

  if (dir > 0) {
    const remaining = rect.bottom - vh;
    if (remaining > 24) {
      window.scrollBy({ top: Math.min(remaining, stride), behavior: "smooth" });
      return true;
    }
    if (index < ids.length - 1) {
      document.getElementById(ids[index + 1])?.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    }
    return false;
  }

  if (rect.top < -24) {
    window.scrollBy({ top: -Math.min(-rect.top, stride), behavior: "smooth" });
    return true;
  }
  if (index > 0) {
    // Land at the bottom of a tall previous section, at the top of a short one.
    const prev = document.getElementById(ids[index - 1]);
    window.scrollTo({ top: absTop(prev) + Math.max(0, prev.offsetHeight - vh), behavior: "smooth" });
    return true;
  }
  return false;
}
