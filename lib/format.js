/**
 * Tiny date helpers. We format by hand (instead of Intl) so the server and
 * the browser always render the exact same text: no hydration mismatches.
 */
const DAYS = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function parseIso(iso) {
  const [date, time = "00:00:00"] = iso.split("T");
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  return { y, m, d, hh, mm };
}

/** "2027-02-20T15:00:00" → "Saturday, 20 February 2027" */
export function formatLongDate(iso) {
  const { y, m, d } = parseIso(iso);
  const weekday = DAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
  return `${weekday}, ${d} ${MONTHS[m - 1]} ${y}`;
}
