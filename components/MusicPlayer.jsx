"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { weddingData } from "@/config/weddingData";
import { MUSIC_EVENT, musicKind, youtubeId } from "@/lib/music";

let ytApi;
function loadYouTubeApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (!ytApi) {
    ytApi = new Promise((resolve) => {
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previous?.();
        resolve(window.YT);
      };
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(s);
    });
  }
  return ytApi;
}

/**
 * Background music (config: `music`). An .mp3 from public/audio, or a YouTube link.
 * It starts when the guest presses "Open invitation" (browsers need a tap before sound),
 * and the round button (bottom right) pauses or plays it at any time.
 */
export default function MusicPlayer() {
  const cfg = weddingData.music ?? {};
  const kind = musicKind(cfg.src);
  const volume = Math.min(1, Math.max(0, cfg.volume ?? 0.6));
  const [playing, setPlaying] = useState(false);
  const audio = useRef(null);
  const yt = useRef(null);
  const host = useRef(null);
  const started = useRef(false);

  const play = useCallback(async () => {
    started.current = true;
    if (kind === "file") {
      const a = audio.current;
      if (!a) return;
      a.volume = volume;
      try {
        await a.play();
      } catch {
        setPlaying(false); // the browser refused; the sound button can start it
      }
    } else if (kind === "youtube") {
      if (yt.current) {
        yt.current.playVideo();
        return;
      }
      const YT = await loadYouTubeApi();
      yt.current = new YT.Player(host.current, {
        width: "200",
        height: "200",
        videoId: youtubeId(cfg.src),
        playerVars: { autoplay: 1, controls: 0, playsinline: 1, rel: 0, modestbranding: 1, disablekb: 1 },
        events: {
          onReady: (e) => {
            e.target.setVolume(Math.round(volume * 100));
            e.target.playVideo();
          },
          onStateChange: (e) => {
            const S = YT.PlayerState;
            if (e.data === S.PLAYING) setPlaying(true);
            else if (e.data === S.PAUSED) setPlaying(false);
            else if (e.data === S.ENDED) {
              if (cfg.loop !== false) e.target.playVideo();
              else setPlaying(false);
            }
          },
        },
      });
    }
  }, [kind, volume, cfg.src, cfg.loop]);

  const pause = useCallback(() => {
    if (kind === "file") audio.current?.pause();
    else yt.current?.pauseVideo?.();
  }, [kind]);

  // "Open invitation" announces itself with an event; start the music then.
  useEffect(() => {
    if (kind === "none" || cfg.startOn === "button") return;
    const onOpen = () => {
      if (!started.current) play();
    };
    window.addEventListener(MUSIC_EVENT, onOpen);
    return () => window.removeEventListener(MUSIC_EVENT, onOpen);
  }, [kind, cfg.startOn, play]);

  if (kind === "none") return null;
  return (
    <>
      {kind === "file" && (
        <audio ref={audio} src={cfg.src} loop={cfg.loop !== false} preload="none" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
      )}
      {kind === "youtube" && (
        <div aria-hidden="true" className="pointer-events-none fixed -left-[9999px] top-0 h-[200px] w-[200px] opacity-0">
          <div ref={host} />
        </div>
      )}
      {cfg.showButton !== false && (
        <button
          type="button"
          onClick={() => (playing ? pause() : play())}
          aria-label={playing ? "Pause the music" : "Play the music"}
          aria-pressed={playing}
          className="fixed bottom-4 right-4 z-40 grid size-11 place-items-center rounded-full bg-gold text-wine shadow-lg transition-colors hover:bg-gold-light"
        >
          {playing ? <Volume2 className="size-5" aria-hidden="true" /> : <VolumeX className="size-5" aria-hidden="true" />}
        </button>
      )}
    </>
  );
}
