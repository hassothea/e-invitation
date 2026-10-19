"use client";

<<<<<<< HEAD
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion } from "framer-motion";
import { Backdrop } from "./FloralDecorations";
import TopFade from "./TopFade";
import MusicPlayer from "./MusicPlayer";
import { CoverPage, WeddingOfPage } from "./IntroPages";
=======
import { Backdrop } from "./FloralDecorations";
import TopFade from "./TopFade";
import IntroStage from "./IntroStage";
>>>>>>> 628a69eb273ca9052674eb3fa842ee740de8610f
import InfoSection from "./InfoSection";
import ProgramSection from "./ProgramSection";
import RsvpSection from "./RsvpSection";
import GallerySection from "./GallerySection";
<<<<<<< HEAD
import { weddingData } from "@/config/weddingData";
import { SECTIONS } from "@/lib/sections";
import { attachPagerInput } from "@/lib/pager";
import { startAutoplay } from "@/lib/autoplay";
import { startMusic } from "@/lib/music";

const PAGES = { welcome: CoverPage, wedding: WeddingOfPage, info: InfoSection, program: ProgramSection, rsvp: RsvpSection, gallery: GallerySection };
const IDS = SECTIONS.map((s) => s.id);

/**
 * The invitation is a stack of pages shown ONE AT A TIME.
 * One scroll, swipe or key press: the old page fades out slowly, then the new page fades in.
 * A page taller than the screen scrolls inside itself first; one more scroll at its end moves on.
 */
export default function InvitationShell({ guestName }) {
  const reduce = useReducedMotion();
  const cfg = weddingData.motion ?? {};
  const outS = reduce ? 0.01 : cfg.pageFade?.outSeconds ?? 1.6;
  const inS = reduce ? 0.01 : cfg.pageFade?.inSeconds ?? 1.8;
  const lockMs = (outS + inS * 0.6) * 1000; // input is ignored while a page change is running

  const [page, setPage] = useState(0);
  const pageRef = useRef(0);
  const busy = useRef(false);
  const panel = useRef(null);
  const unlock = useRef(0);
  const progress = useMotionValue(0); // how far the current page is scrolled (drives the top fade)

  const goTo = useCallback(
    (i) => {
      const n = Math.max(0, Math.min(IDS.length - 1, i));
      if (busy.current || n === pageRef.current) return false;
      busy.current = true;
      pageRef.current = n;
      setPage(n);
      window.clearTimeout(unlock.current);
      unlock.current = window.setTimeout(() => {
        busy.current = false;
      }, lockMs);
      return true;
    },
    [lockMs]
  );

  const setPanel = useCallback(
    (el) => {
      panel.current = el;
      if (el) progress.set(0);
    },
    [progress]
  );

  // One scroll / swipe / key = one page.
  useEffect(
    () => attachPagerInput({ getPanel: () => panel.current, getPage: () => pageRef.current, count: IDS.length, goTo, isBusy: () => busy.current }),
    [goTo]
  );
  useEffect(() => () => window.clearTimeout(unlock.current), []);

  // Auto-play (config: motion.autoScroll). Off for guests who prefer reduced motion.
  const ap = cfg.autoScroll ?? {};
  useEffect(() => {
    if (!ap.enabled || reduce) return;
    return startAutoplay(
      { startDelayMs: ap.startDelayMs ?? 3000, speed: ap.speed ?? 120, pageSeconds: ap.pageSeconds ?? 6 },
      { getPanel: () => panel.current, getPage: () => pageRef.current, count: IDS.length, next: () => goTo(pageRef.current + 1), isBusy: () => busy.current, transitionMs: lockMs }
    );
  }, [ap.enabled, ap.startDelayMs, ap.speed, ap.pageSeconds, reduce, goTo, lockMs]);

  const Current = PAGES[IDS[page]];
=======
import { useSectionNav } from "@/hooks/useSectionNav";
import { weddingData } from "@/config/weddingData";
import { SECTIONS } from "@/lib/sections";

const IDS = SECTIONS.map((s) => s.id);

/**
 * Client-side frame: floral background, section dots, keyboard paging.
 * The three "pages" are ordinary stacked sections of one scrolling document.
 */
export default function InvitationShell({ guestName }) {
  const { active, goTo } = useSectionNav(IDS, weddingData.motion?.autoScroll);
>>>>>>> 628a69eb273ca9052674eb3fa842ee740de8610f

  return (
    <>
      <Backdrop />
<<<<<<< HEAD
      <TopFade progress={progress} />
      <MusicPlayer />
=======
>>>>>>> 628a69eb273ca9052674eb3fa842ee740de8610f

      <nav aria-label="Invitation pages" className="fixed right-2.5 top-1/2 z-40 -translate-y-1/2 sm:right-4">
        <ul className="flex flex-col gap-3">
          {SECTIONS.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to ${s.label}`}
<<<<<<< HEAD
                aria-current={page === i ? "true" : undefined}
                className={`block w-2 rounded-full border border-gold/80 transition-all duration-300 ${
                  page === i ? "h-7 bg-gold" : "h-2.5 bg-transparent hover:bg-gold/40"
=======
                aria-current={active === i ? "true" : undefined}
                className={`block w-2.5 rounded-full border border-gold/80 transition-all duration-300 ${
                  active === i ? "h-7 bg-gold" : "h-2.5 bg-transparent hover:bg-gold/40"
>>>>>>> 628a69eb273ca9052674eb3fa842ee740de8610f
                }`}
              />
            </li>
          ))}
        </ul>
      </nav>

<<<<<<< HEAD
      <main className="fixed inset-x-0 top-0 z-10 h-dvh">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={IDS[page]}
            ref={setPanel}
            className="scrollbar-none absolute inset-0 overflow-y-auto overscroll-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: inS, ease: "easeInOut" } }}
            exit={{ opacity: 0, transition: { duration: outS, ease: "easeInOut" } }}
            onScroll={(e) => progress.set(Math.min(1, e.currentTarget.scrollTop / 140))}
          >
            <Current guestName={guestName} onOpen={() => { startMusic(); goTo(1); }} />
          </motion.div>
        </AnimatePresence>
      </main>
=======
      <main className="relative z-10">
        <IntroStage guestName={guestName} />
        {IDS.includes("info") && <InfoSection />}
        {IDS.includes("program") && <ProgramSection />}
        {IDS.includes("rsvp") && <RsvpSection guestName={guestName} />}
        {IDS.includes("gallery") && <GallerySection />}
      </main>

      <TopFade />
>>>>>>> 628a69eb273ca9052674eb3fa842ee740de8610f
    </>
  );
}
