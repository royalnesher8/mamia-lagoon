"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import { ExternalLink, Play } from "lucide-react";

type Props = { id: string; author: string; title: string; poster: StaticImageData };

/**
 * Vidéo TikTok officielle, chargée uniquement au clic (lecteur d'intégration TikTok) :
 * aucun script ni cookie tiers tant que le visiteur ne lance pas la lecture.
 */
export function TikTokEmbed({ id, author, title, poster }: Props) {
  const [play, setPlay] = useState(false);
  const videoUrl = `https://www.tiktok.com/${author}/video/${id}`;

  return (
    <figure className="w-full max-w-[340px]">
      <div className="relative aspect-[9/16] overflow-hidden bg-lagoon-deep">
        {play ? (
          <iframe
            src={`https://www.tiktok.com/player/v1/${id}?autoplay=1&rel=0&description=1&music_info=1`}
            title={title}
            className="absolute inset-0 size-full border-0"
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button type="button" onClick={() => setPlay(true)} className="group absolute inset-0 size-full" aria-label={`Lire la vidéo : ${title}`}>
            <Image src={poster} alt="" fill placeholder="blur" sizes="340px" className="object-cover transition-transform duration-[1600ms] ease-luxe group-hover:scale-105" />
            <span className="absolute inset-0 bg-gradient-to-t from-lagoon-deep/85 via-lagoon-deep/30 to-lagoon-deep/40" aria-hidden="true" />
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-ivory">
              <span className="inline-flex size-16 items-center justify-center rounded-full bg-champagne text-lagoon-deep transition-transform duration-300 group-hover:scale-110">
                <Play className="ml-1 size-6" fill="currentColor" aria-hidden="true" />
              </span>
              <span className="font-sans text-xs font-semibold tracking-[0.2em] uppercase">Lire la vidéo</span>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-3 flex items-center justify-between gap-3 text-xs text-charcoal/60">
        <span>{play ? "Lecteur fourni par TikTok" : "La lecture charge le lecteur TikTok (cookies tiers possibles)."}</span>
        <a href={videoUrl} target="_blank" rel="noopener" className="inline-flex shrink-0 items-center gap-1 font-semibold text-lagoon hover:underline">
          {author} <ExternalLink className="size-3" aria-hidden="true" />
          <span className="sr-only">(nouvel onglet)</span>
        </a>
      </figcaption>
    </figure>
  );
}
