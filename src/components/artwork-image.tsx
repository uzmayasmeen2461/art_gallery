"use client";
import Image from "next/image";
import { Frame } from "lucide-react";
import { useState } from "react";
import type { Artwork } from "@/types/artwork";
export function ArtworkImage({
  artwork,
  priority = false,
  index = 0,
  framed = false,
}: {
  artwork: Artwork;
  priority?: boolean;
  index?: number;
  framed?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const src = artwork.images[index];
  return (
    <div
      className={`art-image tone-${artwork.placeholderTone} ${framed ? "is-framed" : ""}`}
    >
      {src && !failed ? (
        <Image
          src={src}
          alt={`${artwork.title}, original handmade acrylic painting`}
          fill
          sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 33vw"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          className="actual-art"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="art-placeholder">
          <Frame strokeWidth={1} size={26} />
          <span className="placeholder-title">{artwork.title}</span>
          <span className="placeholder-caption">
            Original photograph to follow
          </span>
          <span className="placeholder-label">IMAGE PLACEHOLDER</span>
        </div>
      )}
    </div>
  );
}
