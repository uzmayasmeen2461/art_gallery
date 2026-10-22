"use client";
import Link from "next/link";
import { Check, Heart, MessageCircle, ShoppingBag } from "lucide-react";
import type { Artwork } from "@/types/artwork";
import { brand } from "@/config/brand";
import { enquiryMessage, whatsappUrl } from "@/lib/commerce";
import { useGallery } from "@/store/gallery-store";
export function WhatsAppEnquiry({
  items = [],
  label = "Enquire on WhatsApp",
}: {
  items?: Artwork[];
  label?: string;
}) {
  const url = whatsappUrl(brand.whatsappNumber, enquiryMessage(items));
  return (
    <div className="enquiry-action">
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="button whatsapp"
        >
          <MessageCircle size={18} />
          {label}
        </a>
      ) : (
        <>
          <button className="button whatsapp" disabled>
            <MessageCircle size={18} />
            {label}
          </button>
          <p className="small muted">
            WhatsApp will be available once the artist’s business number is
            added.{" "}
            <Link className="underlined" href="/contact">
              Contact information
            </Link>
          </p>
        </>
      )}
      <p className="small muted">
        Your enquiry will open in WhatsApp. The artist will confirm availability
        and payment details.
      </p>
    </div>
  );
}
export function ArtworkActions({ artwork }: { artwork: Artwork }) {
  const { cart, wishlist, ready, addToCart, toggleWishlist } = useGallery();
  const added = cart.some((a) => a.id === artwork.id);
  const liked = wishlist.some((a) => a.id === artwork.id);
  const available = artwork.status === "available";
  return (
    <div className="artwork-actions">
      <div className="action-row">
        <button
          disabled={!available || !ready || added}
          className="button"
          onClick={() => addToCart(artwork)}
        >
          {added ? <Check size={18} /> : <ShoppingBag size={18} />}{" "}
          {added
            ? "Added to your bag"
            : available
              ? "Add to bag"
              : `Artwork ${artwork.status}`}
        </button>
        <button
          className={`button button-outline square ${liked ? "liked" : ""}`}
          aria-label={`${liked ? "Remove from" : "Add to"} wishlist`}
          aria-pressed={liked}
          onClick={() => toggleWishlist(artwork.id)}
        >
          <Heart size={19} fill={liked ? "currentColor" : "none"} />
        </button>
      </div>
      <p className="sr-only" role="status">
        {added ? `${artwork.title} is in your bag.` : ""}
      </p>
      {added && (
        <Link className="text-link" href="/cart">
          View your bag →
        </Link>
      )}
      <WhatsAppEnquiry items={[artwork]} />
    </div>
  );
}
