"use client";

import { motion } from "framer-motion";
import { PAGE_BG } from "@/lib/background";
import { weddingData } from "@/config/weddingData";

/**
 * Soft fade along the top edge of the screen. As the page you are reading scrolls up,
 * its top dissolves into the background (same brown + pattern, so there is no seam).
 * `progress` is 0 at the top of a page and rises to 1 after 140 px of scrolling,
 * so a page looks normal until the guest starts to read down it.
 */
export default function TopFade({ progress }) {
  const cfg = weddingData.motion?.topFade ?? {};
  if (cfg.enabled === false) return null;

  const h = cfg.heightVh ?? 16;
  const mask = `linear-gradient(to bottom, #000 0%, #000 ${Math.round(h * 0.2 * 10) / 10}%, transparent ${h}%)`;
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20"
      style={{ opacity: progress, background: PAGE_BG, WebkitMaskImage: mask, maskImage: mask }}
    />
  );
}
