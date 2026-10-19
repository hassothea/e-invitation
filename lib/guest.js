/**
 * Turns whatever is in the URL into a clean, safe display name.
 *
 *   ?to=John+%26+Mary        → "John & Mary"
 *   /John-%26-Mary  (slug)   → "John & Mary"
 *   (nothing)                → ""  (the UI shows the fallback greeting)
 *
 * React escapes text automatically, so the name can never inject HTML.
 * We still strip control characters and cap the length so a very long or
 * odd link can't break the layout.
 */
export function getGuestName(raw, { fromSlug = false } = {}) {
  let value = Array.isArray(raw) ? raw[0] : raw;
  if (typeof value !== "string" || !value) return "";

  if (fromSlug) {
    // Dynamic route segments can arrive percent-encoded.
    try {
      value = decodeURIComponent(value);
    } catch {
      /* keep raw value */
    }
    value = value
      .replace(/[-_]+/g, " ")
      .replace(/(^|\s)(\p{L})/gu, (_, space, c) => space + c.toUpperCase());
  }

  return value
    .replace(/\+/g, " ")
    .replace(/[\u0000-\u001F\u007F<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 60);
}

/** Looks through ?to= / ?guest= (configurable) and returns the first match. */
export function guestFromSearchParams(searchParams, keys = ["to", "guest"]) {
  for (const key of keys) {
    const name = getGuestName(searchParams?.[key]);
    if (name) return name;
  }
  return "";
}
