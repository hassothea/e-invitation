"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Wraps one page of the invitation.
 *
 * Scroll is completely native (wheel, touch, keys, auto-scroll). On top of it,
 * a page FADES OUT as it leaves the top of the screen, and only then does the
 * next page FADE IN. No sliding: the pages dissolve, one after the other.
 *
 * Enter and exit are measured separately, so a page taller than the screen
 * stays fully visible while you read it.
 */
export default function SectionFade({ id, className = "", children }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  // fades in while the page's top moves from 40% down the screen to 10%
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start 40%", "start 10%"] });
  // fades out while the page's bottom moves from 90% down the screen to 60%
  const { scrollYProgress: exit } = useScroll({ target: ref, offset: ["end 90%", "end 60%"] });

  const opacity = useTransform([enter, exit], ([e, x]) => Math.min(e, 1 - x));

  return (
    <section ref={ref} id={id} className="relative snap-start">
      <motion.div
        style={reduce ? undefined : { opacity }}
        className={`relative flex min-h-svh w-full flex-col justify-center ${className}`}
      >
        {children}
      </motion.div>
    </section>
  );
}
