import { parseIso } from "./format";

const pad = (n) => String(n).padStart(2, "0");

/** "2027-02-20T15:00:00" → "20270220T150000" */
function stamp(iso) {
  const { y, m, d, hh, mm } = parseIso(iso);
  return `${y}${pad(m)}${pad(d)}T${pad(hh)}${pad(mm)}00`;
}

/** Link that opens Google Calendar with the event pre-filled. */
export function googleCalendarUrl(ev) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: ev.title,
    dates: `${stamp(ev.start)}/${stamp(ev.end)}`,
    details: ev.description || "",
    location: ev.location || "",
  });
  if (ev.timezone) params.set("ctz", ev.timezone);
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

const escapeIcs = (s = "") =>
  s
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");

/**
 * .ics text for Apple Calendar / Outlook. Times are "floating" (no zone), so
 * they land at the same wall-clock time wherever the guest's device is,
 * which is what you want for an in-person event.
 */
export function buildIcs(ev) {
  const now = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//E-Wedding Invitation//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${stamp(ev.start)}@e-wedding-invitation`,
    `DTSTAMP:${now}`,
    `DTSTART:${stamp(ev.start)}`,
    `DTEND:${stamp(ev.end)}`,
    `SUMMARY:${escapeIcs(ev.title)}`,
    `DESCRIPTION:${escapeIcs(ev.description)}`,
    `LOCATION:${escapeIcs(ev.location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadIcs(ev, filename = "wedding-invitation.ics") {
  const blob = new Blob([buildIcs(ev)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
