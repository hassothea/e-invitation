/**
 * The page background: dark brown with a faint damask pattern and a soft vignette.
 * Shared by the fixed backdrop and by the fade at the top of the screen, so the
 * two always match exactly. Change the brown with --c-cream in app/globals.css.
 */
const leaf = (r) => `<path transform='rotate(${r})' d='M0 0C11 -15 11 -37 0 -52C-11 -37 -11 -15 0 0Z'/>`;
const small = (r) => `<path transform='rotate(${r})' d='M0 0C6 -9 6 -21 0 -30C-6 -21 -6 -9 0 0Z'/>`;
const CURL = "M0 -4C-20 -8 -34 -2 -38 10C-41 20 -32 27 -24 23C-17 19 -19 10 -26 10";
const fills = leaf(0) + leaf(180) + [45, 135, 225, 315].map(small).join("") + "<circle r='5'/>";
const strokes = `<path d='${CURL}'/><path transform='scale(-1 1)' d='${CURL}'/>`;
const at = ([x, y]) => `translate(${x} ${y})`;
const spots = [[80, 80], [0, 0], [160, 0], [0, 160], [160, 160]]; // corners repeat, so the tile joins seamlessly

const TILE =
  `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>` +
  `<g fill='rgb(255,226,170)' fill-opacity='0.07'>${spots.map((s) => `<g transform='${at(s)}'>${fills}</g>`).join("")}</g>` +
  `<g fill='none' stroke='rgb(255,226,170)' stroke-opacity='0.07' stroke-width='3' stroke-linecap='round'>${spots.map((s) => `<g transform='${at(s)}'>${strokes}</g>`).join("")}</g>` +
  `</svg>`;

export const PATTERN_URL = `url("data:image/svg+xml,${encodeURIComponent(TILE)}")`;

export const PAGE_BG = `radial-gradient(120% 95% at 50% 42%, transparent 55%, rgb(0 0 0 / 0.3) 100%), ${PATTERN_URL} 0 0 / 160px 160px repeat, rgb(var(--c-cream))`;
