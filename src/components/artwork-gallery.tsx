"use client";
import { useRef, useState } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import type { Artwork } from "@/types/artwork";
import { ArtworkImage } from "./artwork-image";
export function ArtworkGallery({ artwork }: { artwork: Artwork }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState(0);
  function open(index: number) {
    setSelected(index);
    dialog.current?.showModal();
  }
  return (
    <>
      <div className="detail-gallery">
        {artwork.images.length ? (
          <button
            className="gallery-zoom"
            onClick={() => open(0)}
            aria-label={`Enlarge ${artwork.title}`}
          >
            <ArtworkImage artwork={artwork} priority />
            <span>
              <ZoomIn size={15} /> View full artwork
            </span>
          </button>
        ) : (
          <ArtworkImage artwork={artwork} priority />
        )}
        <p className="small muted">
          {artwork.images.length
            ? "Full composition shown without cropping. Colours may vary slightly between screens."
            : "Image placeholder. The original painting photograph has not been supplied."}
        </p>
        {artwork.images.length > 1 && (
          <div className="detail-thumbnails">
            {artwork.images.map((src, i) => (
              <button
                key={src}
                onClick={() => open(i)}
                aria-label={`Enlarge photograph ${i + 1} of ${artwork.title}`}
              >
                <ArtworkImage artwork={artwork} index={i} />
              </button>
            ))}
          </div>
        )}
      </div>
      <dialog
        ref={dialog}
        className="art-lightbox"
        aria-label={`${artwork.title} image gallery`}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="lightbox-heading">
          <h2>{artwork.title}</h2>
          <button
            className="icon-button"
            aria-label="Close image gallery"
            onClick={() => dialog.current?.close()}
          >
            <X size={22} />
          </button>
        </div>
        <div className="lightbox-art">
          <ArtworkImage
            key={selected}
            artwork={artwork}
            index={selected}
            priority
          />
        </div>
        {artwork.images.length > 1 && (
          <div className="lightbox-controls">
            <button
              className="icon-button"
              aria-label="Previous photograph"
              onClick={() =>
                setSelected(
                  (i) =>
                    (i - 1 + artwork.images.length) % artwork.images.length,
                )
              }
            >
              <ChevronLeft />
            </button>
            <p className="small" aria-live="polite">
              {selected + 1} / {artwork.images.length}
            </p>
            <button
              className="icon-button"
              aria-label="Next photograph"
              onClick={() =>
                setSelected((i) => (i + 1) % artwork.images.length)
              }
            >
              <ChevronRight />
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
