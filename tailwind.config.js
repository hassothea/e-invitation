/**
 * Colors point at CSS variables defined in app/globals.css (:root).
 * To re-theme the whole invitation, edit the variables there. Nothing else.
 */
const withAlpha = (variable) => `rgb(var(${variable}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./config/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: withAlpha("--c-primary"), // terracotta / warm coral
        blush: withAlpha("--c-blush"), // mid coral
        soft: withAlpha("--c-soft"), // soft tint
        deep: withAlpha("--c-deep"), // deep tone (buttons, small text)
        wine: withAlpha("--c-wine"), // darkest tone (headings)
        cream: withAlpha("--c-cream"), // page background
        paper: withAlpha("--c-paper"), // neutral light
        ink: withAlpha("--c-ink"), // body text
        leaf: withAlpha("--c-leaf"), // foliage
        "gold-dark": withAlpha("--c-gold-dark"),
        gold: withAlpha("--c-gold"),
        "gold-light": withAlpha("--c-gold-light"),
      },
      // Latin letters use Cormorant / Plus Jakarta Sans; any Khmer letters fall
      // through to the Khmer fonts chosen in config/weddingData.js (fonts).
      fontFamily: {
        display: ["var(--font-display)", "var(--khmer-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "var(--khmer-body)", "system-ui", "sans-serif"],
        // Use these two classes for text that is entirely Khmer.
        khmer: ["var(--khmer-body)", "var(--font-body)", "system-ui", "sans-serif"],
        "khmer-desc": ["var(--khmer-desc)", "var(--khmer-body)", "var(--font-body)", "serif"],
        "khmer-display": ["var(--khmer-display)", "var(--font-display)", "Georgia", "serif"],
      },
      boxShadow: {
        petal: "0 30px 60px -28px rgb(var(--c-wine) / 0.45)",
      },
    },
  },
  plugins: [],
};
