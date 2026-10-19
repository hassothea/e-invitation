"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Crest } from "./Ornaments";
import { weddingData } from "@/config/weddingData";
import { formatLongDate } from "@/lib/format";

/*
 * Pages 1 and 2: two full-screen scenes on one sticky stage.
 *   Scene 1  the cover: title, crest, guest name, "Open invitation"
 *   Scene 2  "The wedding of" + the couple (Khmer large, English smaller below)
 * Scroll drives the fades: the cover FADES OUT, then "The wedding of" FADES IN,
 * holds, and FADES OUT before the invitation page appears. Nothing slides.
 * The stage is 300svh tall; the screen stays put for the first 200svh of scrolling.
 */
const FADE = {
  cover: [0, 0.08, 0.3], // opacity 1 → 1 → 0
  second: [0.3, 0.52, 0.72, 0.94], // opacity 0 → 1 → 1 → 0
};

export default function IntroStage({ guestName }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { couple, guest, hero, event } = weddingData;

  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const o1 = useTransform(p, FADE.cover, [1, 1, 0]);
  const o2 = useTransform(p, FADE.second, [0, 1, 1, 0]);
  const pe1 = useTransform(o1, (v) => (v > 0.4 ? "auto" : "none"));

  // "Open invitation": scroll to where "The wedding of" is fully shown.
  const open = () => {
    const top = ref.current.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + 1.2 * window.innerHeight, behavior: "smooth" });
  };

  const list = { hidden: {}, show: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } } };
  const item = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
  };

  const a = couple.groom.cover ?? couple.groom.name;
  const b = couple.bride.cover ?? couple.bride.name;
  const glow = weddingData.motion?.romance?.glow !== false;

  return (
    <div ref={ref} id="welcome" className="relative h-[300svh] snap-start">
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* ---------- scene 1: the cover ---------- */}
        <motion.div style={{ opacity: o1, pointerEvents: pe1 }} className="absolute inset-0 px-6 py-[6svh]">
          <motion.div
            variants={list}
            initial={reduce ? false : "hidden"}
            animate="show"
            className="flex h-full flex-col items-center justify-between text-center"
          >
            <motion.p variants={item} lang="km" className="font-khmer-display" style={{ fontSize: "clamp(1.5rem, min(6.6vw, 6svh), 3.4rem)", lineHeight: 1.75 }}>
              <span className="gold-text">{hero.titleKm}</span>
            </motion.p>

            <motion.div variants={item} className="relative flex flex-col items-center">
              {glow && (
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
                  style={{
                    width: "min(92vw, 64svh)",
                    height: "min(92vw, 64svh)",
                    background: "radial-gradient(closest-side, rgb(var(--c-gold) / 0.35), rgb(var(--c-blush) / 0.12) 60%, transparent 78%)",
                  }}
                  animate={reduce ? undefined : { scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              <Crest className="relative w-[min(120vw,32svh,320px)]">
                <span className="font-display" style={{ fontSize: "clamp(1.6rem, min(6vw, 5svh), 2.5rem)"}}>
                  <span className="gold-text">{hero.monogram}</span>
                </span>
              </Crest>
              <p className="relative font-display" style={{ fontSize: "clamp(1.2rem, min(5vw, 4.5svh), 2.2rem)", marginTop: "1.7svh" }}>
                <span className="gold-text">{`${a} & ${b}`}</span>
              </p>
            </motion.div>

            <motion.div variants={item} className="flex flex-col items-center">
              <p lang="km" className="font-khmer-display" style={{ fontSize: "clamp(1rem, 2svh, 1.75rem)", lineHeight: 3.5}}>
                <span className="gold-text">{hero.inviteKm}</span>
              </p>
              <p className="font-display italic text-ink/80" style={{ fontSize: "clamp(.85rem, 2.5svh, 2rem)", lineHeight: 2, marginTop: "1.2svh"}}>
                {hero.invite}
              </p>
              <p className="font-display" style={{fontSize: "clamp(1rem, min(6vw, 3svh), 1.5rem)", lineHeight: 2.5, marginTop: "2svh"}}>
                <span className="gold-text" style={{color: "#ead48a"}}>{guestName || guest.fallback}</span>
              </p>
              <button
                type="button"
                onClick={open}
                className="rounded-xl bg-gold px-10 py-2.5 text-wine shadow-lg transition-colors hover:bg-gold-light"
                style={{ marginTop: "3.5svh" }}
              >
                <span lang="km" className="block font-khmer-display text-lg leading-snug">{hero.openKm}</span>
                <span className="block text-xs">{hero.open}</span>
              </button>
              <p lang="km" className="font-khmer text-ink/85" style={{ fontSize: "clamp(.90rem, 3svh, 1rem)", marginTop: "2.8svh" }}>
                {hero.openHintKm}
              </p>
              <p className="text-xs text-ink/80">{hero.openHint}</p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ---------- scene 2: "The wedding of" ---------- */}
        <motion.div style={{ opacity: o2 }} className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="font-display italic" style={{ fontSize: "clamp(1.3rem, 4.6svh, 2.2rem)" }}>
            <span className="gold-text">{hero.weddingOf}</span>
          </p>
          {hero.weddingOfKm && (
            <p lang="km" className="font-khmer-display" style={{ fontSize: "clamp(1.1rem, 3.6svh, 1.8rem)", lineHeight: 1.7 }}>
              <span className="gold-text">{hero.weddingOfKm}</span>
            </p>
          )}

          {[couple.groom, couple.bride].map((person, i) => (
            <div key={person.name} style={{ marginTop: i === 0 ? "5svh" : "0" }}>
              {i === 1 && (
                <p className="font-display italic" style={{ fontSize: "clamp(1.6rem, 6svh, 3rem)", margin: "2.4svh 0" }}>
                  <span className="gold-text">&amp;</span>
                </p>
              )}
              <p
                lang={person.nameKm ? "km" : undefined}
                className={person.nameKm ? "font-khmer-display" : "font-display font-light"}
                style={{ fontSize: "clamp(2rem, min(10.5vw, 11svh), 5rem)", lineHeight: 1.5 }}
              >
                <span className="gold-text">{person.nameKm || person.name}</span>
              </p>
              {person.nameKm && (
                <p className="font-display italic" style={{ fontSize: "clamp(1.1rem, min(4vw, 3.8svh), 1.9rem)", lineHeight: 1.3 }}>
                  <span className="gold-text">{person.name}</span>
                </p>
              )}
            </div>
          ))}

          <p className="font-display text-ink/85" style={{ fontSize: "clamp(.95rem, 2.4svh, 1.2rem)", marginTop: "6svh" }}>
            {`${formatLongDate(event.start)} · ${event.timeLabel}`}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
