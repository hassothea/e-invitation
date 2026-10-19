"use client";

import { Crest } from "./Ornaments";
import { weddingData } from "@/config/weddingData";
import { formatLongDate } from "@/lib/format";

const rise = (d) => ({ "--d": `${d}s` }); // CSS-only fade-up delay (works before any JavaScript loads)

/* Page 1: the full-screen cover. Sizes use clamp() with vw/svh so it fills any phone or computer. */
export function CoverPage({ guestName, onOpen }) {
  const { couple, guest, hero } = weddingData;
  const a = couple.groom.cover ?? couple.groom.name;
  const b = couple.bride.cover ?? couple.bride.name;
  const glow = weddingData.motion?.romance?.glow !== false;

  return (
    <section id="welcome" className="relative flex min-h-full flex-col items-center justify-between px-6 py-[6svh] text-center">
      <p lang="km" className="rise font-khmer-display" style={{ ...rise(0.2), fontSize: "clamp(1.5rem, min(6.6vw, 6svh), 3.4rem)", lineHeight: 1.6 }}>
        <span className="gold-text">{hero.titleKm}</span>
      </p>

      <div className="rise relative flex flex-col items-center" style={rise(0.5)}>
        {glow && (
          <div
            aria-hidden="true"
            className="breathe pointer-events-none absolute left-1/2 top-1/2 -ml-[min(46vw,32svh)] -mt-[min(46vw,32svh)] rounded-full"
            style={{
              width: "min(92vw, 64svh)",
              height: "min(92vw, 64svh)",
              background: "radial-gradient(closest-side, rgb(var(--c-gold) / 0.01), rgb(var(--c-blush) / 0.11) 60%, transparent 58%)",
            }}
          />
        )}

          <span className="font-display" style={{ fontSize: "clamp(1.4rem, min(7vw, 5.6svh), 3rem)" }}>
            <span className="gold-text">{hero.monogram}</span>
          </span>
        <p className="relative font-display" style={{ fontSize: "clamp(1.2rem, min(5vw, 4svh), 2.8rem)", marginTop: "2.5svh" }}>
          <span className="gold-text">{`${a} & ${b}`}</span>
        </p>
      </div>

      <div className="rise flex flex-col items-center" style={rise(0.8)}>
        <p lang="km" className="font-khmer-display" style={{ fontSize: "clamp(1rem, 3svh, 1.5rem)", lineHeight: 4 }}>
          <span className="gold-text">{hero.inviteKm}</span>
        </p>
        <p className="font-display italic text-ink/80" style={{ fontSize: "clamp(.9rem, 2.2svh, 2.1rem)", lineHeight: 2 }}>
          {hero.invite}
        </p>
        <p className="font-display" style={{ fontSize: "clamp(1.4rem, min(6vw, 5svh), 2.1rem)", lineHeight: 1.8, marginTop: "2svh" }}>
          <span className="gold-text">{guestName || guest.fallback}</span>
        </p>
        <button
          type="button"
          onClick={onOpen}
          className="rounded-xl bg-gold px-10 py-2.5 text-wine shadow-lg transition-colors hover:bg-gold-light"
          style={{ marginTop: "2.8svh" }}
        >
          <span lang="km" className="block font-khmer-display text-lg leading-snug">{hero.openKm}</span>
          <span className="block text-xs">{hero.open}</span>
        </button>
        <p lang="km" className="font-khmer text-ink/85" style={{ fontSize: "clamp(.75rem, 2svh, 1.2rem)", marginTop: "2svh" }}>
          {hero.openHintKm}
        </p>
        <p className="text-xs text-ink/85">{hero.openHint}</p>
      </div>
    </section>
  );
}

/* Page 2: "The wedding of": Khmer names large, English names smaller below, each name on ONE line. */
export function WeddingOfPage() {
  const { couple, hero, event } = weddingData;
  const one = { whiteSpace: "nowrap" };
  return (
    <section id="wedding" className="relative flex min-h-full flex-col items-center justify-center px-4 text-center">
      <p className="font-display italic" style={{ fontSize: "clamp(1.3rem, 4.6svh, 2.8rem)" }}>
        <span className="gold-text">{hero.weddingOf}</span>
      </p>
      {hero.weddingOfKm && (
        <p lang="km" className="font-khmer-display" style={{ fontSize: "clamp(1.1rem, 3.6svh, 1.8rem)", lineHeight: 1.6 }}>
          <span className="gold-text">{hero.weddingOfKm}</span>
        </p>
      )}

      {[couple.groom, couple.bride].map((person, i) => (
        <div key={person.name} style={{ marginTop: i === 0 ? "5svh" : 0 }}>
          {i === 1 && (
            <p className="font-display italic" style={{ fontSize: "clamp(1.6rem, 6svh, 5rem)", margin: "2.8svh 0" }}>
              <span className="gold-text">&amp;</span>
            </p>
          )}
          <p
            lang={person.nameKm ? "km" : undefined}
            className={person.nameKm ? "font-khmer-display" : "font-display font-light"}
            style={{ ...one, fontSize: "clamp(1.8rem, min(9.5vw, 10svh), 4.6rem)", lineHeight: 1.5 }}
          >
            <span className="gold-text">{person.nameKm || person.name}</span>
          </p>
          {person.nameKm && (
            <p className="font-display italic" style={{ ...one, fontSize: "clamp(1.3rem, min(5.6vw, 4.6svh), 2.4rem)", lineHeight: 1.3 }}>
              <span className="gold-text">{person.name}</span>
            </p>
          )}
        </div>
      ))}

      <p className="font-display text-ink/80" style={{ fontSize: "clamp(.95rem, 2.4svh, 2.1rem)", marginTop: "6svh" }}>
        {`${formatLongDate(event.start)} · ${event.timeLabel}`}
      </p>
    </section>
  );
}
