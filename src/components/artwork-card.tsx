"use client";
import Link from "next/link";
import { ArrowUpRight, Heart } from "lucide-react";
import type { Artwork } from "@/types/artwork";
import { formatINR } from "@/lib/commerce";
import { useGallery } from "@/store/gallery-store";
import { ArtworkImage } from "./artwork-image";
export function ArtworkCard({
  artwork,
  priority = false,
}: {
  artwork: Artwork;
  priority?: boolean;
}) {
  const { wishlist, toggleWishlist } = useGallery();
  const liked = wishlist.some((a) => a.id === artwork.id);
  return (
    <article className="art-card">
      <div className="card-visual">
        <Link
          href={`/artwork/${artwork.slug}`}
          aria-label={`View ${artwork.title}`}
        >
          <ArtworkImage artwork={artwork} priority={priority} />
          <span className="view-art">
            View artwork <ArrowUpRight size={17} />
          </span>
        </Link>
        <button
          className={`favourite ${liked ? "liked" : ""}`}
          aria-label={`${liked ? "Remove" : "Save"} ${artwork.title} ${liked ? "from" : "to"} wishlist`}
          aria-pressed={liked}
          onClick={() => toggleWishlist(artwork.id)}
        >
          <Heart size={17} fill={liked ? "currentColor" : "none"} />
        </button>
        <span className={`art-badge ${artwork.status}`}>
          {artwork.status === "available" ? "Original acrylic" : artwork.status}
        </span>
      </div>
      <div className="art-card-meta">
        <div>
          <p className="art-category">
            {artwork.category} <span> / </span> {artwork.medium}
          </p>
          <h3>
            <Link href={`/artwork/${artwork.slug}`}>{artwork.title}</Link>
          </h3>
        </div>
        <p className="price">{formatINR(artwork.priceINR)}</p>
      </div>
      <div className="card-bottom">
        <span>
          <i className={artwork.status} />{" "}
          {artwork.status === "available"
            ? "Available to enquire"
            : artwork.status}
        </span>
        <Link
          href={`/artwork/${artwork.slug}`}
          aria-label={`View details for ${artwork.title}`}
        >
          <ArrowUpRight size={17} />
        </Link>
      </div>
    </article>
  );
}
