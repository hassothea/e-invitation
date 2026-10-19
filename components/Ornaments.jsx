/* Gold ornaments (plain SVG, no images needed): the monogram crest and the corner brackets. */

const TEAR = "M50 4C58 20 78 34 78 62C78 84 66 98 50 98C34 98 22 84 22 62C22 34 42 20 50 4Z";

/** A teardrop crest with a double gold outline and a dotted ring. Put the monogram inside as children. */
export function Crest({ className = "", children }) {
  const ring = (s) => `translate(50 52) scale(${s}) translate(-50 -52)`;
  return (
    <div className={`relative aspect-[100/104] ${className}`}>
      <svg viewBox="0 0 100 104" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d={TEAR} transform={ring(1)} className="fill-none stroke-gold" strokeWidth="1.6" />
        <path d={TEAR} transform={ring(0.92)} className="fill-none stroke-gold/70" strokeWidth="0.8" />
        <path d={TEAR} transform={ring(0.84)} className="fill-none stroke-gold/80" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="0.1 3.4" />
        <path d="M24 74C10 72 6 84 14 90C20 94 27 89 24 84M76 74C90 72 94 84 86 90C80 94 73 89 76 84" className="fill-none stroke-gold" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M50 99L46 103L50 101L54 103Z" className="fill-gold" />
      </svg>
      <div className="absolute inset-0 grid place-items-center" style={{ paddingTop: "13%" }}>
        {children}
      </div>
    </div>
  );
}

function Corner({ place, rotate, className }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`pointer-events-none absolute ${place} ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <path d="M3 72V12Q3 3 12 3H72" className="fill-none stroke-gold" strokeWidth="2" strokeLinecap="round" />
      <path d="M11 58V20Q11 11 20 11H58" className="fill-none stroke-gold/70" strokeWidth="1" strokeLinecap="round" />
      <path d="M24 24C24 40 40 40 40 28C40 20 31 20 31 27" className="fill-none stroke-gold" strokeWidth="2" strokeLinecap="round" />
      <path d="M46 46C54 47 60 53 62 61C54 59 48 54 46 46Z" className="fill-gold" />
      <circle cx="3" cy="80" r="2.2" className="fill-gold" />
      <circle cx="80" cy="3" r="2.2" className="fill-gold" />
    </svg>
  );
}

/** Gold brackets in the four corners of the nearest positioned parent. */
export function CornerOrnaments({ className = "w-14 sm:w-24" }) {
  return (
    <>
      <Corner place="left-3 top-3" rotate={0} className={className} />
      <Corner place="right-3 top-3" rotate={90} className={className} />
      <Corner place="bottom-3 right-3" rotate={180} className={className} />
      <Corner place="bottom-3 left-3" rotate={270} className={className} />
    </>
  );
}
