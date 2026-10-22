import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Shipping & artwork care",
  "Shipping details are confirmed personally by the artist before purchase. Read general acrylic artwork care guidance.",
  "/shipping",
);
export default function Shipping() {
  return (
    <article className="container policy-page">
      <div className="page-intro">
        <p className="eyebrow">TAKING ART HOME</p>
        <h1>
          Shipping <em>& care.</em>
        </h1>
        <p>
          Prototype information · Final shipping and sale policies require the
          artist’s approval.
        </p>
      </div>
      <h2>Delivery within India</h2>
      <p>
        Shipping enquiries are welcome from across India. The artist will
        confirm serviceability, packaging, charges and the estimated delivery
        timeframe for your location before payment. Shipping is not included in
        the provisional catalogue prices. No delivery date or free shipping
        offer is promised by this prototype.
      </p>
      <h2>Before you purchase</h2>
      <p>
        Confirm availability, dimensions, framing, final price, shipping,
        payment arrangements and cancellation or return terms directly with the
        artist. A wishlist, bag or WhatsApp enquiry does not reserve an artwork
        or create an order.
      </p>
      <h2>Looking after acrylic artwork</h2>
      <ul>
        <li>Display away from prolonged direct sunlight, humidity and heat.</li>
        <li>Dust gently using a clean, soft, dry cloth.</li>
        <li>
          Avoid water, solvents and household cleaning products on the painted
          surface.
        </li>
        <li>
          Ask the artist about framing and care instructions for the specific
          painting.
        </li>
      </ul>
      <h2>Damage, returns & cancellations</h2>
      <p>
        These policies have not yet been supplied. Request the agreed terms
        before making a purchase. If an issue arises, contact the artist and
        retain packaging and relevant photographs for discussion.
      </p>
      <Link href="/contact" className="text-link" style={{ marginTop: 25 }}>
        Ask the artist →
      </Link>
    </article>
  );
}
