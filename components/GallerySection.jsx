"use client";

import Page from "./Page";
import { FloralDivider } from "./FloralDecorations";
import PhotoGallery from "./PhotoGallery";
import VideoPlayer from "./VideoPlayer";
import { weddingData } from "@/config/weddingData";
import { show } from "@/lib/sections";

/** The last page: all the photos, then a thank-you. */
export default function GallerySection() {
  const { gallery, video, closing, couple, meta } = weddingData;

  return (
    <Page id="gallery" className="overflow-hidden px-5 pb-16 pt-24 sm:px-14 lg:px-24">
      <div className="mx-auto w-full max-w-6xl">
        {show.video && (
          <div className="mx-auto mb-24 max-w-3xl">
            <VideoPlayer src={video.src} type={video.type} poster={video.poster} title={video.title} />
            {video.title && <p className="mt-4 text-center font-display text-2xl italic"><span className="gold-text">{video.title}</span></p>}
          </div>
        )}

        {show.gallery && (
          <>
            <header className="mb-14 text-center">
              <h2 className="font-display text-5xl font-light sm:text-6xl"><span className="gold-text">{gallery.heading}</span></h2>
              <FloralDivider className="mx-auto mt-3 w-60" />
              {gallery.intro && <p className="mx-auto mt-3 max-w-lg text-ink/75">{gallery.intro}</p>}
            </header>
            <PhotoGallery images={gallery.images} />
          </>
        )}

        {/* ---------- Farewell ---------- */}
        {show.closing && (
        <div className="relative mt-28 pb-44 text-center sm:pb-52">
          <h2 className="mx-auto max-w-xl text-balance font-display text-4xl font-light sm:text-5xl"><span className="gold-text">
            {closing.heading}
          </span></h2>
          {closing.headingKm && (
            <p lang="km" className="mx-auto mt-3 max-w-xl font-khmer-display text-xl leading-relaxed"><span className="gold-text">
              {closing.headingKm}
            </span></p>
          )}
          <p className="mx-auto mt-4 max-w-lg leading-relaxed text-ink/75">{closing.message}</p>
          {closing.messageKm && (
            <p lang="km" className="mx-auto mt-2 max-w-lg font-khmer leading-loose text-ink/75">
              {closing.messageKm}
            </p>
          )}

          <p className="mt-8 font-display text-2xl italic"><span className="gold-text">{closing.signoff}</span></p>
          <p className="whitespace-nowrap font-display" style={{ fontSize: "clamp(1.3rem, 6.6vw, 2.25rem)" }}><span className="gold-text">
            {couple.groom.name} <span className="italic">&amp;</span> {couple.bride.name}
          </span></p>
          {(couple.groom.nameKm || couple.bride.nameKm) && (
            <p lang="km" className="mt-3 whitespace-nowrap font-khmer-display" style={{ fontSize: "clamp(1rem, 4.4vw, 1.25rem)" }}><span className="gold-text">
              {[couple.groom.nameKm, couple.bride.nameKm].filter(Boolean).join("  &  ")}
            </span></p>
          )}
          {closing.showParents && (
            <p className="mx-auto mt-4 max-w-md text-sm text-ink/65">
              {couple.groom.parents}
              <br />
              {couple.bride.parents}
            </p>
          )}
          <p className="mt-5 text-sm font-medium text-gold-light">{meta.hashtag}</p>
        </div>
        )}
      </div>
    </Page>
  );
}
