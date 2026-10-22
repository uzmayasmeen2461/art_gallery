"use client";
import Link from "next/link";
import { Heart, ShoppingBag, Check } from "lucide-react";
import { useGallery } from "@/store/gallery-store";
import { formatINR, subtotal } from "@/lib/commerce";
import { ArtworkImage } from "./artwork-image";
import { ArtworkCard } from "./artwork-card";
import { WhatsAppEnquiry } from "./commerce-actions";
export function CartContents() {
  const { cart, ready, storageUnavailable, removeFromCart } = useGallery();
  if (!ready)
    return (
      <p className="loading-state" role="status">
        Opening your bag…
      </p>
    );
  return (
    <>
      {storageUnavailable && (
        <p className="storage-note" role="status">
          Browser storage is unavailable. Your bag will last for this visit
          only.
        </p>
      )}
      {!cart.length ? (
        <div className="empty-state" style={{ marginBottom: 80 }}>
          <ShoppingBag size={36} strokeWidth={1} />
          <h2>A little room for art.</h2>
          <p>
            Your bag is waiting for a piece that feels like you. Explore the
            collection to find your original.
          </p>
          <Link href="/shop" className="button">
            Explore the collection →
          </Link>
        </div>
      ) : (
        <div className="bag-layout">
          <div className="bag-list">
            {cart.map((a) => (
              <article className="bag-item" key={a.id}>
                <Link
                  href={`/artwork/${a.slug}`}
                  className="bag-image"
                  aria-label={`View ${a.title}`}
                >
                  <ArtworkImage artwork={a} />
                </Link>
                <div className="bag-item-info">
                  <p className="eyebrow">
                    {a.category} / {a.id}
                  </p>
                  <h2>
                    <Link href={`/artwork/${a.slug}`}>{a.title}</Link>
                  </h2>
                  <p className="small muted">Original acrylic · Quantity: 1</p>
                  <p className="small muted">
                    Dimensions available on request.
                  </p>
                </div>
                <div className="bag-item-controls">
                  <p className="price">{formatINR(a.priceINR)}</p>
                  <button
                    className="remove-button"
                    aria-label={`Remove ${a.title} from bag`}
                    onClick={() => removeFromCart(a.id)}
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
            <p className="small muted" style={{ marginTop: 20 }}>
              Every original is unique. Adding to your bag does not reserve an
              artwork.
            </p>
          </div>
          <aside className="order-summary">
            <p className="eyebrow">A CONVERSATION STARTS HERE</p>
            <h2 style={{ marginTop: 12 }}>Your selection</h2>
            <div className="summary-row">
              <span>
                {cart.length}{" "}
                {cart.length === 1 ? "original painting" : "original paintings"}
              </span>
              <span>{formatINR(subtotal(cart))}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Quoted by the artist</span>
            </div>
            <div className="summary-row summary-total">
              <span>Subtotal</span>
              <span>{formatINR(subtotal(cart))}</span>
            </div>
            <p className="summary-note">
              Prices are provisional. Availability, final pricing, shipping and
              payment will be confirmed personally by the artist.
            </p>
            <WhatsAppEnquiry items={cart} />
            <p className="summary-kicker">
              No payment is collected on this website.
            </p>
          </aside>
        </div>
      )}
    </>
  );
}
export function WishlistContents() {
  const { wishlist, cart, ready, storageUnavailable, addToCart } = useGallery();
  if (!ready)
    return (
      <p className="loading-state" role="status">
        Opening your favourites…
      </p>
    );
  return (
    <>
      {storageUnavailable && (
        <p className="storage-note">
          Browser storage is unavailable. Favourites will last for this visit
          only.
        </p>
      )}
      {wishlist.length ? (
        <>
          <p
            className="small muted"
            style={{ marginBottom: 25 }}
            aria-live="polite"
          >
            {wishlist.length} saved{" "}
            {wishlist.length === 1 ? "artwork" : "artworks"}
          </p>
          <div className="wishlist-grid">
            {wishlist.map((a) => {
              const added = cart.some((item) => item.id === a.id);
              return (
                <div key={a.id} className="wishlist-item">
                  <ArtworkCard artwork={a} />
                  <button
                    className="button button-outline"
                    disabled={a.status !== "available" || added}
                    onClick={() => addToCart(a)}
                  >
                    {added ? <Check size={16} /> : <ShoppingBag size={16} />}{" "}
                    {added
                      ? "In your bag"
                      : a.status !== "available"
                        ? `Artwork ${a.status}`
                        : "Add to bag"}
                  </button>
                  {added && (
                    <Link href="/cart" className="text-link">
                      View your bag →
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="empty-state" style={{ marginBottom: 80 }}>
          <Heart size={36} strokeWidth={1} />
          <h2>Keep a little inspiration.</h2>
          <p>
            Tap the heart on a painting to save it here. Your favourites stay in
            this browser, ready for another look.
          </p>
          <Link href="/shop" className="button">
            Find your favourites →
          </Link>
        </div>
      )}
    </>
  );
}
