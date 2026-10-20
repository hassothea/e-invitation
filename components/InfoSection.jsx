"use client";

import Page from "./Page";
import Image from "next/image";
import { CornerOrnaments, Crest } from "./Ornaments";
import { weddingData } from "@/config/weddingData";
import { formatLongDate } from "@/lib/format";

function Parents({ title, person, align }) {
  return (
    <div className={align === "right" ? "text-right" : "text-left"}>
      <p className="text-xs text-ink/65">{title}</p>
      <p className="mt-1 font-display text-xl text-gold-light">{person.father}</p>
      {person.fatherKm && <p lang="km" className="font-khmer-desc text-ink/85">{person.fatherKm}</p>}
      <p className="mt-1 font-display text-xl text-gold-light">{person.mother}</p>
      {person.motherKm && <p lang="km" className="font-khmer-desc text-ink/85">{person.motherKm}</p>}
    </div>
  );
}

function Name({ person }) {
  return (
    <div className="text-center">
      {person.nameKm && (
        <p lang="km" className="whitespace-nowrap font-khmer-display leading-relaxed" style={{ fontSize: "clamp(1.05rem, 5vw, 2.25rem)" }}>
          <span className="gold-text">{person.nameKm}</span>
        </p>
      )}
      <p className={`whitespace-nowrap font-display italic ${person.nameKm ? "mt-2" : ""}`} style={{ fontSize: "clamp(1.2rem, 5.4vw, 2rem)" }}>
        <span className="gold-text">{person.name}</span>
      </p>
    </div>
  );
}

/** A round slot for the person's photo. With no photo it shows their initial in a gold ring. */
function Portrait({ person }) {
  const initial = (person.cover ?? person.name).trim().charAt(0).toUpperCase();
  return (
    <div className="mx-auto mt-5 aspect-square w-[min(36vw,12rem)] rounded-full border-2 border-gold p-1.5 shadow-petal">
      <div className="relative h-full w-full overflow-hidden rounded-full bg-black/20">
        {person.photo ? (
          <Image src={person.photo} alt={person.name} fill sizes="192px" quality={75} unoptimized={person.photo.endsWith(".svg")} className="object-cover" />
        ) : (
          <span className="absolute inset-0 grid place-items-center font-display text-5xl italic sm:text-6xl">
            <span className="gold-text">{initial}</span>
          </span>
        )}
      </div>
    </div>
  );
}

/** Page 3: the invitation itself: parents, the invitation text, the couple with round photos, date and place. */
export default function InfoSection() {
  const { couple, hero, event, venue } = weddingData;
  return (
    <Page id="info" className="px-6 py-28 sm:px-14">
      <CornerOrnaments />
      <div className="mx-auto w-full max-w-3xl text-center">
          {/* <span className="font-display text-2xl sm:text-2xl">
            <span className="gold-text">{hero.monogram}</span>
          </span> */}
        <p lang="km" className="mt-6 font-khmer-display text-2xl leading-relaxed sm:text-4xl">
          <span className="gold-text">{hero.titleKm}</span>
        </p>

        <div className="mt-11 grid grid-cols-2 gap-6">
          <Parents title="Parents of the groom" person={couple.groom} align="left" />
          <Parents title="Parents of the bride" person={couple.bride} align="right" />
        </div>

        <p lang="km" className="mt-12 font-khmer-display text-xl leading-relaxed sm:text-2xl">
          <span className="gold-text">{hero.inviteKm}</span>
        </p>
        <p className="font-display italic text-ink/80">{hero.invite}</p>

        {hero.invitationTextKm && (
          <p lang="km" className="mx-auto mt-5 max-w-2xl font-khmer-desc text-base leading-[2.1] text-ink sm:text-lg">
            {hero.invitationTextKm}
          </p>
        )}
        <p className="mx-auto mt-3 max-w-xl font-display text-lg italic text-ink/80">{hero.invitationText}</p>

        {/* groom on the left, bride on the right */}
        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-3">
          <p className="text-sm text-ink/70">
            <span lang="km" className="font-khmer-desc">កូនប្រុសនាម</span> · Groom
          </p>
          <p className="text-sm text-ink/70">
            <span lang="km" className="font-khmer-desc">កូនស្រីនាម</span> · Bride
          </p>
          <p className="col-span-2 text-ink/80">
            <span lang="km" className="font-khmer-desc">ជាគូនឹង</span> · and
          </p>
          <Name person={couple.groom} />
          <Name person={couple.bride} />
          <Portrait person={couple.groom} />
          <Portrait person={couple.bride} />
        </div>

        <div className="mt-14">
          <p lang="km" className="font-khmer-desc text-ink/85">{hero.heldAtKm}</p>
          <p className="font-display italic text-ink/70">{hero.heldAt}</p>
          <p lang="km" className="mt-3 font-khmer-desc text-lg leading-loose text-gold-light">{event.whenKm}</p>
          <p className="font-display text-xl text-gold-light">{`${formatLongDate(event.start)} · ${event.timeLabel}`}</p>
          <p lang="km" className="mx-auto mt-4 max-w-xl font-khmer-desc leading-loose text-ink/90">{venue.coverKm}</p>
          <p className="font-display text-lg text-ink/85">{`${venue.name}, ${venue.short}`}</p>
        </div>
      </div>
    </Page>
  );
}
