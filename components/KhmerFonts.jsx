"use client";

import { useEffect } from "react";

/** Loads the Khmer fonts AFTER the page appears, so the fonts never delay the first paint. */
export default function KhmerFonts({ href }) {
  useEffect(() => {
    if (!href || document.querySelector("link[data-khmer-fonts]")) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.dataset.khmerFonts = "1";
    document.head.appendChild(link);
  }, [href]);
  return null;
}
