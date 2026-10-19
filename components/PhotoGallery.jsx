"use client";
/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useState } from "react";
<<<<<<< HEAD
import Image from "next/image";
=======
>>>>>>> 628a69eb273ca9052674eb3fa842ee740de8610f
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const MAX_PHOTOS = 20;

/**
 * Two-column photo grid (same on phones and computers).
 * Every photo fades in slowly and softly as it scrolls into view, row by row
 * (the right photo follows the left a moment later).
 * Frames are rectangles with slightly rounded corners. Tap a photo to enlarge it.
 */
export default function PhotoGallery({ images }) {
  const reduce = useReducedMotion();
  const photos = images.slice(0, MAX_PHOTOS);
  const [open, setOpen] = useState(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const lonely = photos.length % 2 === 1 ? photos.length - 1 : -1; // an unpaired last photo is centered

  return (
    <>
      <ul className="mx-auto grid max-w-3xl grid-cols-2 gap-x-4 gap-y-7 sm:gap-x-8 sm:gap-y-10">
        {photos.map((img, i) => {
          const column = i % 2;
          return (
            <motion.li
              key={img.src}
              className={`relative ${i === lonely ? "col-span-2 mx-auto w-[calc(50%-0.5rem)] sm:w-[calc(50%-1rem)]" : ""}`}
<<<<<<< HEAD
              initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
=======
              initial={reduce ? false : { opacity: 0, y: 30, scale: 0.97, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
>>>>>>> 628a69eb273ca9052674eb3fa842ee740de8610f
              viewport={{ once: true, amount: 0.2, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 1.7, ease: [0.22, 1, 0.36, 1], delay: column * 0.4 }}
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`Enlarge photo ${i + 1}: ${img.alt}`}
                className="group block w-full rounded-[10px] bg-gold p-1.5 shadow-petal sm:p-2"
              >
                <span className="relative block aspect-[4/5] overflow-hidden rounded-[6px] bg-black/30">
<<<<<<< HEAD
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 44vw, 360px"
                    quality={72}
                    draggable={false}
                    unoptimized={img.src.endsWith(".svg")}
                    className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
=======
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    draggable={false}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
>>>>>>> 628a69eb273ca9052674eb3fa842ee740de8610f
                  />
                </span>
              </button>
            </motion.li>
          );
        })}
      </ul>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open !== null && (
              <Lightbox items={photos} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

function Lightbox({ items, index, onClose, onIndex }) {
  const count = items.length;
  const prev = useCallback(() => onIndex((index - 1 + count) % count), [index, count, onIndex]);
  const next = useCallback(() => onIndex((index + 1) % count), [index, count, onIndex]);

  useEffect(() => {
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.dataset.modal = "open"; // tells the keyboard navigator to stand down
    root.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      delete root.dataset.modal;
      root.style.overflow = previousOverflow;
    };
  }, [onClose, prev, next]);

  const stop = (e) => e.stopPropagation();
  const ctl =
    "absolute grid size-11 place-items-center rounded-full bg-gold text-wine transition-colors hover:bg-gold-light";

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
<<<<<<< HEAD
      className="fixed inset-0 z-[100] grid place-items-center bg-wine/90 p-4"
=======
      className="fixed inset-0 z-[100] grid place-items-center bg-wine/90 p-4 backdrop-blur-sm"
>>>>>>> 628a69eb273ca9052674eb3fa842ee740de8610f
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
<<<<<<< HEAD
      <Image
        src={items[index].src}
        alt={items[index].alt}
        width={1200}
        height={1500}
        sizes="92vw"
        quality={80}
        priority
        unoptimized={items[index].src.endsWith(".svg")}
        onClick={stop}
        className="h-auto max-h-[82svh] w-auto max-w-[92vw] rounded-[10px] object-contain shadow-petal"
=======
      <img
        src={items[index].src}
        alt={items[index].alt}
        onClick={stop}
        className="max-h-[82svh] max-w-[92vw] rounded-[10px] object-contain shadow-petal"
>>>>>>> 628a69eb273ca9052674eb3fa842ee740de8610f
      />
      <button type="button" onClick={(e) => { stop(e); onClose(); }} aria-label="Close photo viewer" className={`${ctl} right-4 top-4`}>
        <X className="size-5" aria-hidden="true" />
      </button>
      {count > 1 && (
        <>
          <button type="button" onClick={(e) => { stop(e); prev(); }} aria-label="Previous photo" className={`${ctl} left-3 top-1/2 -translate-y-1/2`}>
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button type="button" onClick={(e) => { stop(e); next(); }} aria-label="Next photo" className={`${ctl} right-3 top-1/2 -translate-y-1/2`}>
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </>
      )}
    </motion.div>
  );
}
