"use client";
/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from "react";
import { Play } from "lucide-react";

/** Works out what kind of video a link is. */
function parseVideo(src, type = "auto") {
  if (!src) return null;
  const url = src.trim();
  let m;

  if (type === "youtube" || (type === "auto" && /youtu\.?be/.test(url))) {
    m = url.match(
      /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/
    );
    if (m) return { kind: "youtube", id: m[1] };
    if (/^[\w-]{11}$/.test(url)) return { kind: "youtube", id: url };
  }

  if (type === "vimeo" || (type === "auto" && /vimeo\.com/.test(url))) {
    m = url.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/(\w+))?/);
    if (m) return { kind: "vimeo", id: m[1], hash: m[2] };
    if (/^\d+$/.test(url)) return { kind: "vimeo", id: url };
  }

  return { kind: "file", url };
}

function mimeFor(url) {
  const ext = url.split("?")[0].split(".").pop().toLowerCase();
  if (ext === "webm") return "video/webm";
  if (ext === "ogv" || ext === "ogg") return "video/ogg";
  if (ext === "mov") return "video/quicktime";
  return "video/mp4";
}

/**
 * Highlight video. Supports YouTube, Vimeo, or a local / hosted MP4.
 * YouTube and Vimeo load only after the guest taps play (faster page,
 * fewer tracking cookies).
 */
export default function VideoPlayer({
  src,
  type = "auto",
  poster,
  title = "Wedding highlight video",
  className = "",
}) {
  const [playing, setPlaying] = useState(false);
  const media = useMemo(() => parseVideo(src, type), [src, type]);

  const frame = `relative aspect-video w-full overflow-hidden rounded-[10px] bg-wine shadow-petal ${className}`;

  // No video configured yet → friendly placeholder.
  if (!media) {
    return (
      <div className={frame}>
        <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-deep to-wine px-6 text-center">
          <div>
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-gold text-wine">
              <Play className="ml-0.5 size-6" aria-hidden="true" />
            </span>
            <p className="mt-3 font-display text-2xl text-cream">Our highlight video is coming soon</p>
          </div>
        </div>
      </div>
    );
  }

  if (media.kind === "file") {
    return (
      <div className={frame}>
        <video
          className="h-full w-full bg-black object-contain"
          controls
          playsInline
          preload="metadata"
          poster={poster || undefined}
          aria-label={title}
        >
          <source src={media.url} type={mimeFor(media.url)} />
          Your browser can&apos;t play this video.
        </video>
      </div>
    );
  }

  const thumb = poster || (media.kind === "youtube" ? `https://i.ytimg.com/vi/${media.id}/hqdefault.jpg` : "");
  const embed =
    media.kind === "youtube"
      ? `https://www.youtube-nocookie.com/embed/${media.id}?autoplay=1&rel=0&playsinline=1&modestbranding=1`
      : `https://player.vimeo.com/video/${media.id}?autoplay=1&title=0&byline=0&portrait=0${
          media.hash ? `&h=${media.hash}` : ""
        }`;

  return (
    <div className={frame}>
      {playing ? (
        <iframe
          src={embed}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 grid place-items-center"
        >
          {thumb && <img src={thumb} alt="" className="absolute inset-0 h-full w-full object-cover" />}
          <span className="absolute inset-0 bg-wine/25 transition-colors group-hover:bg-wine/10" />
          <span className="relative grid size-16 place-items-center rounded-full bg-gold text-wine shadow-petal transition-transform group-hover:scale-105">
            <Play className="ml-1 size-7" aria-hidden="true" />
          </span>
        </button>
      )}
    </div>
  );
}
