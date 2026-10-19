"use client";
/* eslint-disable @next/next/no-img-element */

import { CalendarPlus, Download, MapPin, Navigation } from "lucide-react";
import Page from "./Page";
import { CornerOrnaments } from "./Ornaments";
import { FloralDivider } from "./FloralDecorations";
import Timeline from "./Timeline";
import { weddingData } from "@/config/weddingData";
import { show } from "@/lib/sections";
import { downloadIcs, googleCalendarUrl } from "@/lib/calendar";

const btn = "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold transition-colors";
const solid = `${btn} bg-gold text-wine hover:bg-gold-light`;
const outline = `${btn} border border-gold/60 text-gold-light hover:bg-gold/10`;

/** Two-day program + location. Side by side on computers; program first, then map, on phones. */
export default function ProgramSection() {
  const { program, event, venue } = weddingData;
  const where = [venue.name, ...venue.addressLines].join(", ");
  const calendarEvent = {
    title: event.calendarTitle,
    description: event.calendarDescription,
    location: where,
    start: event.start,
    end: event.end,
    timezone: event.timezone,
  };
  const mapSrc = venue.mapEmbedUrl || `https://www.google.com/maps?q=${encodeURIComponent(venue.mapQuery)}&output=embed`;
  const twoCol = (program.columns ?? 1) === 2;
  const side = show.schedule && show.map && !twoCol; // program and map side by side
  const directions =
    venue.directionsUrl || `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(venue.mapQuery)}`;

  return (
    <Page id="program" className="px-6 py-28 sm:px-14 lg:px-24">
      <CornerOrnaments />
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-14 text-center">
          {program.headingKm && (
            <p lang="km" className="font-khmer-display text-3xl leading-relaxed sm:text-4xl"><span className="gold-text">{program.headingKm}</span></p>
          )}
          <h2 className="font-display text-4xl font-light sm:text-5xl"><span className="gold-text">{program.heading}</span></h2>
          <FloralDivider className="mx-auto mt-3 w-60" />
        </header>

        <div className={`grid items-start gap-14 ${side ? "lg:grid-cols-2 lg:gap-16" : `mx-auto ${twoCol ? "max-w-5xl" : "max-w-xl"}`}`}>
          {show.schedule && (
            <div>
              <div className={twoCol ? "grid gap-14 lg:grid-cols-2 lg:gap-16" : ""}>
                {program.days.map((day, i) => (
                  <div key={day.title} className={!twoCol && i ? "mt-14" : ""}>
                    {day.titleKm && (
                      <p lang="km" className="text-center font-khmer-display text-2xl leading-relaxed sm:text-3xl"><span className="gold-text">{day.titleKm}</span></p>
                    )}
                    <h3 className="mb-8 text-center font-display text-2xl sm:text-3xl"><span className="gold-text">{day.title}</span></h3>
                    <Timeline items={day.items} />
                  </div>
                ))}
              </div>
              {(program.scheduleNote || program.scheduleNoteKm) && (
                <p className="mt-10 border-t border-gold/30 pt-5 text-center text-sm leading-relaxed text-ink/75">
                  {program.scheduleNote}
                  {program.scheduleNoteKm && <span lang="km" className="block font-khmer-desc">{program.scheduleNoteKm}</span>}
                </p>
              )}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <a href={googleCalendarUrl(calendarEvent)} target="_blank" rel="noopener noreferrer" className={solid}>
                  <CalendarPlus className="size-5" aria-hidden="true" /> Add reception to Google Calendar
                </a>
                <button type="button" onClick={() => downloadIcs(calendarEvent)} className={outline}>
                  <Download className="size-5" aria-hidden="true" /> Apple / Outlook (.ics)
                </button>
              </div>
            </div>
          )}

          {show.map && (
            <div className={side ? "lg:sticky lg:top-24" : twoCol ? "mx-auto w-full max-w-2xl" : ""}>
              <h3 className="font-display text-4xl"><span className="gold-text">{venue.name}</span></h3>
              {venue.nameKm && <p lang="km" className="mt-1 font-khmer-display text-lg leading-relaxed"><span className="gold-text">{venue.nameKm}</span></p>}
              <p className="mt-3 flex gap-2 text-ink/85">
                <MapPin className="mt-1 size-5 shrink-0 text-gold" aria-hidden="true" />
                <span>
                  {venue.addressLines.map((line) => (
                    <span key={line} className="block">{line}</span>
                  ))}
                  {venue.addressKm && <span lang="km" className="block font-khmer-desc">{venue.addressKm}</span>}
                </span>
              </p>
              {venue.display === "qr" ? (
                <div className="mt-6">
                  <div className="mx-auto max-w-[16rem] rounded-[10px] bg-white p-3 shadow-petal ring-2 ring-gold">
                    <img src={venue.qrImage} alt={`QR code for the location of ${venue.name}`} className="aspect-square w-full object-contain" />
                  </div>
                  {(venue.qrCaption || venue.qrCaptionKm) && (
                    <p className="mt-3 text-center text-sm text-ink/75">
                      {venue.qrCaption}
                      {venue.qrCaptionKm && <span lang="km" className="block font-khmer-desc">{venue.qrCaptionKm}</span>}
                    </p>
                  )}
                </div>
              ) : (
                <div className="mt-6 aspect-[4/3] overflow-hidden rounded-[10px] bg-black/20 shadow-petal ring-2 ring-gold/70">
                  <iframe title={`Map showing ${venue.name}`} src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen className="h-full w-full border-0" />
                </div>
              )}
              <a href={directions} target="_blank" rel="noopener noreferrer" className={`${solid} mt-5`}>
                <Navigation className="size-5" aria-hidden="true" /> Get directions
              </a>
              {venue.notes?.length > 0 && (
                <ul className="mt-6 space-y-2 text-sm leading-relaxed text-ink/80">
                  {venue.notes.map((note, i) => (
                    <li key={note} className="flex gap-2">
                      <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                      <span>
                        {note}
                        {venue.notesKm?.[i] && <span lang="km" className="block font-khmer-desc">{venue.notesKm[i]}</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </Page>
  );
}
