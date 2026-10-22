import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getArtwork, getArtworks, dimensions } from "@/lib/catalogue";
import { formatINR } from "@/lib/commerce";
import { pageMetadata } from "@/lib/seo";
import { brand } from "@/config/brand";
import { ArtworkGallery } from "@/components/artwork-gallery";
import { ArtworkCard } from "@/components/artwork-card";
import { ArtworkActions } from "@/components/commerce-actions";
// Local catalogue routes are known at build time; unknown slugs must return HTTP 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getArtworks().map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getArtwork(slug);
  if (!a)
    return {
      title: "Artwork not found",
      robots: { index: false, follow: false },
    };
  return {
    ...pageMetadata(
      a.title,
      `${a.title}, an original handmade acrylic painting. ${formatINR(a.priceINR)} (provisional). Enquire directly with the artist in Hyderabad.`,
      `/artwork/${a.slug}`,
    ),
    ...(a.images.length
      ? {
          openGraph: {
            title: a.title,
            description: a.description,
            url: `/artwork/${a.slug}`,
            images: [{ url: a.images[0], alt: a.title }],
          },
        }
      : {}),
  };
}
export default async function ArtworkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const art = getArtwork(slug);
  if (!art) notFound();
  const others = getArtworks()
    .filter((a) => a.id !== art.id)
    .sort(
      (a, b) =>
        Number(b.category === art.category) -
        Number(a.category === art.category),
    )
    .slice(0, 3);
  // Product schema contains only supplied facts; offers await final prices/status and real imagery.
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: art.title,
    description: art.description,
    sku: art.id,
    category: art.category,
    url: `${brand.siteUrl}/artwork/${art.slug}`,
    ...(art.images.length
      ? { image: art.images.map((src) => new URL(src, brand.siteUrl).href) }
      : {}),
  };
  return (
    <div className="container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <ChevronRight size={11} />
        <Link href="/shop">The collection</Link>
        <ChevronRight size={11} />
        <span aria-current="page">{art.title}</span>
      </nav>
      <div className="detail-grid">
        <ArtworkGallery artwork={art} />
        <div className="detail-info">
          <p className="eyebrow">
            {art.category.toUpperCase()} / ORIGINAL ACRYLIC
          </p>
          <h1>{art.title}</h1>
          <p className="detail-price">{formatINR(art.priceINR)}</p>
          <p className="demo-note">
            Provisional price · Shipping quoted separately
          </p>
          <p className={`status-label ${art.status}`}>
            <span className="status-dot" />
            {art.status === "available"
              ? "Available to enquire · Please confirm with the artist"
              : art.status}
          </p>
          <p className="detail-description">{art.description}</p>
          <dl className="specs">
            <div>
              <dt>Medium</dt>
              <dd>{art.medium}, handmade</dd>
            </div>
            <div>
              <dt>Dimensions</dt>
              <dd>{dimensions(art)}</dd>
            </div>
            <div>
              <dt>Artwork reference</dt>
              <dd>{art.id}</dd>
            </div>
            <div>
              <dt>Framing</dt>
              <dd>To be confirmed with the artist</dd>
            </div>
          </dl>
          <ArtworkActions artwork={art} />
          <div className="share-actions" aria-label="Share this artwork">
            <a
              className="text-link"
              href={`https://wa.me/?text=${encodeURIComponent(`${art.title} — ${brand.name}: ${brand.siteUrl}/artwork/${art.slug}`)}`}
              target="_blank"
              rel="noreferrer"
            >
              Share on WhatsApp ↗
            </a>
            <a
              className="text-link"
              href={`mailto:?subject=${encodeURIComponent(`${art.title} | ${brand.name}`)}&body=${encodeURIComponent(`${brand.siteUrl}/artwork/${art.slug}`)}`}
            >
              Share by email ↗
            </a>
          </div>
          <div className="detail-disclosures">
            <details>
              <summary>Shipping & delivery</summary>
              <p>
                Enquiries are welcome from across India. The artist will confirm
                packaging, shipping charges and estimated delivery before you
                arrange payment. No dispatch time or delivery price is confirmed
                in this prototype.
              </p>
            </details>
            <details>
              <summary>Caring for your original</summary>
              <p>
                Keep acrylic artwork away from direct sunlight, moisture and
                extreme temperatures. Dust gently with a soft, dry cloth. Avoid
                cleaning products or water on the painted surface; ask the
                artist for specific care advice.
              </p>
            </details>
            <details>
              <summary>How purchasing works</summary>
              <p>
                Add a painting to your bag and enquire on WhatsApp. This starts
                a conversation; it does not reserve the painting or place an
                order. The artist confirms availability, dimensions, framing,
                payment and delivery with you.
              </p>
            </details>
          </div>
        </div>
      </div>
      <section className="related-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">CONTINUE YOUR DISCOVERY</p>
            <h2>
              A few more <em>connections.</em>
            </h2>
          </div>
          <Link href="/shop" className="text-link">
            Back to the collection →
          </Link>
        </div>
        <div className="featured-grid">
          {others.map((a) => (
            <ArtworkCard key={a.id} artwork={a} />
          ))}
        </div>
      </section>
    </div>
  );
}
