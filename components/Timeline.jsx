import { Camera, Church, DoorOpen, Flame, Flower2, Gift, Hand, Heart, Music, Scissors, Sparkles, Users, Utensils, Wine } from "lucide-react";

const ICONS = {
  door: DoorOpen,
  sparkles: Sparkles,
  flower: Flower2,
  hand: Hand,
  gift: Gift,
  utensils: Utensils,
  users: Users,
  scissors: Scissors,
  flame: Flame,
  wine: Wine,
  heart: Heart,
  church: Church,
  music: Music,
  camera: Camera,
};

/**
 * One day's timeline, in the style of the printed program: icon on the left,
 * a gold vertical line with a crossbar and dot at every time, text on the right.
 * Items: { time, timeKm, title, titleKm, icon }. Khmer parts are optional.
 */
export default function Timeline({ items }) {
  return (
    <ol>
      {items.map((item, i) => {
        const Icon = ICONS[item.icon] || Sparkles;
        const last = i === items.length - 1;
        return (
          <li key={`${item.time}-${item.title}`} className="grid grid-cols-[2.6rem_2.4rem_1fr] sm:grid-cols-[3.2rem_3rem_1fr]">
            <Icon className="mt-0.5 size-6 justify-self-center text-gold sm:size-7" aria-hidden="true" />
            <div className="relative">
              <span className={`absolute left-1/2 w-px -translate-x-1/2 bg-gold ${last ? "top-0 h-[1.1rem]" : "inset-y-0"}`} />
              <span className="absolute inset-x-0 top-[0.9rem] h-px bg-gold" />
              <span className="absolute left-1/2 top-[0.9rem] size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold" />
            </div>
            <div className="pb-7 pl-2">
              <p className="text-lg leading-[1.8rem] text-gold-light">
                {item.timeKm && (
                  <span lang="km" className="font-khmer-desc">
                    {item.timeKm}
                  </span>
                )}
                <span className={`${item.timeKm ? "ml-2 text-sm text-ink/70" : "font-semibold"}`}>{item.time}</span>
              </p>
              {item.titleKm && (
                <p lang="km" className="font-khmer-desc text-[1.05rem] leading-relaxed text-ink">
                  {item.titleKm}
                </p>
              )}
              <p className={`font-display leading-snug ${item.titleKm ? "text-[0.95rem] text-ink/75" : "text-xl text-ink"}`}>{item.title}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
