/** The Google Fonts address for the Khmer fonts chosen in config (null when none come from Google). */
export function khmerFontsHref(fonts = {}) {
  const names = [
    ...new Set(
      [fonts.khmerDisplay, fonts.khmerBody, fonts.khmerDescription]
        .filter((f) => f && f.google && f.family)
        .map((f) => f.family)
    ),
  ];
  if (!names.length) return null;
  const families = names.map((n) => `family=${encodeURIComponent(n).replace(/%20/g, "+")}`).join("&");
  return `https://fonts.googleapis.com/css2?${families}&display=swap`;
}
