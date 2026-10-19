"use client";

<<<<<<< HEAD
import { motion } from "framer-motion";
=======
import { motion, useScroll, useTransform } from "framer-motion";
>>>>>>> 628a69eb273ca9052674eb3fa842ee740de8610f
import { PAGE_BG } from "@/lib/background";
import { weddingData } from "@/config/weddingData";

/**
<<<<<<< HEAD
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
=======
 * Soft fade along the top edge of the screen.
 *
 * Content that scrolls up past the top dissolves into the page background,
 * and returns as the guest scrolls back down. The overlay paints the exact
 * same background as the page (brown + pattern), masked so only the top band
 * is covered, so there is no visible seam. It eases in over the first 140 px
 * of scrolling, so the cover looks normal until the guest starts to move.
 */
export default function TopFade() {
  const cfg = weddingData.motion?.topFade ?? {};
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 140], [0, 1]);

  if (cfg.enabled === false) return null;

  const h = cfg.heightVh ?? 16;
  const mask = `linear-gradient(to bottom, #000 0%, #000 ${Math.round(h * 0.25 * 10) / 10}%, transparent ${h}%)`;

>>>>>>> 628a69eb273ca9052674eb3fa842ee740de8610f
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20"
<<<<<<< HEAD
      style={{ opacity: progress, background: PAGE_BG, WebkitMaskImage: mask, maskImage: mask }}
=======
      style={{ opacity, background: PAGE_BG, WebkitMaskImage: mask, maskImage: mask }}
>>>>>>> 628a69eb273ca9052674eb3fa842ee740de8610f
    />
  );
}
