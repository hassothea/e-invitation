"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { weddingData } from "@/config/weddingData";
import { PAGE_BG } from "@/lib/background";

const KHMER = weddingData.khmer || {};
const r1 = (n) => Math.round(n * 10) / 10;

/* ====================================================================
   Background decoration: random twinkling sparkles, a very faint Angkor Wat
   along the bottom, and the little Angkor Wat under each section title.
   ==================================================================== */

// A four-point star.
const STAR = "M0 -10C1.2 -3.5 3.5 -1.2 10 0C3.5 1.2 1.2 3.5 0 10C-1.2 3.5 -3.5 1.2 -10 0C-3.5 -1.2 -1.2 -3.5 0 -10Z";
const rand = (min, max) => min + Math.random() * (max - min);

/* One sparkle: twinkles in at a random spot, fades out, then appears somewhere new.
   Positions are chosen after the page loads, so there is no hydration mismatch. */
function Sparkle({ index, min, max }) {
  const [spot, setSpot] = useState(null);
  const timer = useRef(0);

  const roll = useCallback(() => {
    setSpot({
      id: `${Date.now()}-${Math.random()}`,
      x: rand(3, 97), // % of screen width
      y: rand(4, 96), // % of screen height
      size: Math.round(rand(min, max)),
      rot: Math.round(rand(-25, 25)),
      seconds: rand(1.8, 3.6),
      peak: rand(0.65, 1),
    });
  }, [min, max]);

  const next = useCallback(() => {
    setSpot(null);
    timer.current = window.setTimeout(roll, rand(100, 1800));
  }, [roll]);

  useEffect(() => {
    timer.current = window.setTimeout(roll, index * 350 + rand(0, 1500));
    return () => window.clearTimeout(timer.current);
  }, [index, roll]);

  if (!spot) return null;
  return (
    <motion.div
      key={spot.id}
      className="absolute"
      style={{ left: `${spot.x}%`, top: `${spot.y}%`, width: spot.size, height: spot.size, marginLeft: -spot.size / 2, marginTop: -spot.size / 2 }}
      initial={{ opacity: 0, scale: 0.2 }}
      animate={{ opacity: [0, spot.peak, 0], scale: [0.2, 1, 0.3], rotate: [spot.rot - 20, spot.rot, spot.rot + 20] }}
      transition={{ duration: spot.seconds, times: [0, 0.45, 1], ease: "easeInOut" }}
      onAnimationComplete={next}
    >
      <svg viewBox="-12 -12 24 24" className="h-full w-full">
        <circle r="11" className="fill-gold/25" />
        <path d={STAR} className="fill-gold" />
        <path d={STAR} transform="scale(0.42)" className="fill-gold-light" />
      </svg>
    </motion.div>
  );
}

function Sparkles() {
  const reduce = useReducedMotion();
  const { count = 14, size = {} } = weddingData.motion?.sparkles ?? {};
  const { min = 8, max = 18 } = size;
  if (reduce || !count) return null;
  return Array.from({ length: count }, (_, i) => <Sparkle key={i} index={i} min={min} max={max} />);
}

/** Fixed background: soft glow, faint Angkor Wat, and the sparkles. */
export function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0" style={{ background: PAGE_BG }} />
      {KHMER.angkorSilhouette && (
        <AngkorSilhouette className="absolute bottom-0 left-1/2 w-[min(100vw,1100px)] -translate-x-1/2 opacity-[0.09]" />
      )}
      <Sparkles />
    </div>
  );
}

/* ====================================================================
   Angkor Wat: three-tier gallery, five lotus-bud towers, causeway.
   ==================================================================== */
const ANGKOR = (() => {
  const tower = (cx, base, w, h) => {
    const tiers = [
      { w: 1, h: 0.26 },
      { w: 0.78, h: 0.18 },
      { w: 0.58, h: 0.16 },
      { w: 0.4, h: 0.14 },
    ];
    let y = base;
    const left = [`M${r1(cx - w / 2)} ${base}`];
    const right = [];
    tiers.forEach((t) => {
      const half = (w * t.w) / 2;
      y -= h * t.h;
      left.push(`L${r1(cx - half)} ${r1(y + h * t.h)}`, `L${r1(cx - half)} ${r1(y)}`);
      right.unshift(`L${r1(cx + half)} ${r1(y)}`, `L${r1(cx + half)} ${r1(y + h * t.h)}`);
    });
    const shoulder = (w * 0.4) / 2;
    const tip = r1(base - h);
    return (
      left.join(" ") +
      ` Q${r1(cx - shoulder * 0.9)} ${r1(y - h * 0.12)} ${cx} ${tip}` +
      ` Q${r1(cx + shoulder * 0.9)} ${r1(y - h * 0.12)} ${r1(cx + shoulder)} ${r1(y)} ` +
      right.join(" ") +
      " Z"
    );
  };

  const parts = [
    "M60 238H940V222H905V208H95V222H60Z", // causeway + terraces
    "M120 208V176H880V208Z", // long gallery
    tower(300, 176, 56, 88),
    tower(700, 176, 56, 88),
    tower(398, 176, 68, 118),
    tower(602, 176, 68, 118),
    tower(500, 176, 108, 164),
  ];

  const pediments = [];
  for (let x = 150; x <= 850; x += 50) pediments.push(`M${x - 14} 176L${x} 160L${x + 14} 176Z`);

  return parts.join(" ") + " " + pediments.join(" ");
})();

/** Barely-there Angkor Wat shadow. Sits along the bottom of the screen. */
export function AngkorSilhouette({ className = "" }) {
  return (
    <svg viewBox="0 0 1000 240" preserveAspectRatio="xMidYMax meet" className={className} aria-hidden="true">
      <path d={ANGKOR} className="fill-gold" />
    </svg>
  );
}

/** Section divider: a little Angkor Wat between two fine lines. */
export function FloralDivider({ className = "" }) {
  return (
    <svg viewBox="0 0 260 50" className={className} aria-hidden="true">
      <path d="M8 44H62M198 44H252" className="fill-none stroke-primary/40" strokeWidth="1" strokeLinecap="round" />
      <g transform="translate(60 10.7) scale(0.14)">
        <path d={ANGKOR} className="fill-primary" />
      </g>
    </svg>
  );
}
