import Link from "next/link";
import { ArtistPortrait } from "@/components/artist-portrait";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Brush,
  HeartHandshake,
  Fingerprint,
  Leaf,
  Camera as Instagram,
  Sparkles,
} from "lucide-react";
import { brand, categories, categoryLabel } from "@/config/brand";
import { getArtworks } from "@/lib/catalogue";
import { pageMetadata } from "@/lib/seo";
import { ArtworkCard } from "@/components/artwork-card";
import { ArtworkImage } from "@/components/artwork-image";
export const metadata = pageMetadata(
  "Original acrylic paintings, thoughtfully chosen",
  "Explore handmade original acrylic art, from landscapes and seascapes to florals. A boutique gallery based in Hyderabad, India.",
  "/",
);
export default function Home() {
  const artworks = getArtworks();
  const hero = artworks.find((a) => a.slug === "sunlit-ocean");
  return (
    <>
      <section className="hero">
        <div className="hero-inner container">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="tiny-line" /> INDEPENDENT ART. PERSONAL
              CONNECTION.
            </p>
            <h1>
              Every Canvas
              <br />
              Tells a <em>Story</em>
            </h1>
            <p className="hero-description">
              Discover original handmade paintings inspired by nature, colour,
              and the beauty of everyday moments.
            </p>
            <div className="hero-links">
              <Link href="/shop" className="button">
                Shop Collection <ArrowUpRight size={17} />
              </Link>
              <Link href="/about" className="text-link">
                Meet the artist <ArrowRight size={16} />
              </Link>
            </div>
            <div className="hero-footnote">
              <span className="handmade-mark">
                <Brush size={20} strokeWidth={1.3} />
              </span>
              <p>
                Made by hand. Chosen by heart.
                <span>Original acrylic paintings · Hyderabad, India</span>
              </p>
            </div>
          </div>
          <div className="hero-gallery">
            <span className="vertical-label">THE STUDIO EDIT — NO. 001</span>
            <div className="gallery-frame">
              {hero && <ArtworkImage artwork={hero} priority framed />}
            </div>
            <div className="hero-art-caption">
              <div>
                <span className="eyebrow">IN THE SPOTLIGHT</span>
                <Link href="/artwork/sunlit-ocean">
                  Sunlit Ocean <ArrowUpRight size={15} />
                </Link>
              </div>
              <span className="small">Acrylic · Original painting</span>
            </div>
            <div className="gallery-pedestal" />
          </div>
        </div>
        <div className="container hero-bottom">
          <span>YOUR SPACE, A LITTLE MORE YOU.</span>
          <Link href="#collection">
            A closer look <ArrowDown size={14} />
          </Link>
          <span>01 — 05</span>
        </div>
      </section>
      <div className="values-strip">
        <div className="container">
          <span>
            <Brush size={17} /> Original, handmade paintings
          </span>
          <span>
            <Fingerprint size={17} /> One of a kind, just like you
          </span>
          <span>
            <HeartHandshake size={17} /> A direct connection with the artist
          </span>
        </div>
      </div>
      <section id="collection" className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE CURATED COLLECTION</p>
            <h2>
              Find the one that <em>speaks to you.</em>
            </h2>
          </div>
          <Link href="/shop" className="text-link">
            View all artwork <ArrowUpRight size={17} />
          </Link>
        </div>
        <p className="collection-note">
          An intimate first edit of five original acrylic paintings, shown in
          the supplied photographs. Discover the colour, texture and details of
          each piece.
        </p>
        <div className="featured-grid home-featured">
          {artworks.slice(0, 4).map((a) => (
            <ArtworkCard key={a.id} artwork={a} />
          ))}
        </div>
        <div className="collection-footer">
          <p>A quiet corner. A favourite wall. A new perspective.</p>
          <Link href="/shop" className="text-link">
            Discover your next original <ArrowRight size={16} />
          </Link>
        </div>
      </section>
      <section className="category-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">FOLLOW YOUR CURIOSITY</p>
              <h2>
                A world of <em>inspiration.</em>
              </h2>
            </div>
            <span className="muted small">Explore art by subject</span>
          </div>
          <div className="category-list">
            {categories.map((category, i) => (
              <Link
                href={`/shop?category=${category}`}
                key={category}
                className="category-item"
              >
                <span className="category-number">0{i + 1}</span>
                <h3>{categoryLabel(category)}</h3>
                <span className="category-count">
                  {artworks.filter((a) => a.category === category).length
                    ? `${artworks.filter((a) => a.category === category).length} ${artworks.filter((a) => a.category === category).length === 1 ? "artwork" : "artworks"}`
                    : "Explore commissions"}
                </span>
                <ArrowUpRight size={21} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section container artist-preview">
        <ArtistPortrait />
        <div className="artist-copy">
          <p className="eyebrow">A NOTE FROM THE STUDIO</p>
          <h2>
            Every painting begins
            <br />
            with a <em>human touch.</em>
          </h2>
          <p>
            This is a space for original acrylic paintings by an independent
            female artist based in Hyderabad — from landscapes and seascapes to
            florals, nature and portraits.
          </p>
          <p className="small muted">
            We’re getting to know the artist. Her personal story and studio
            photographs will be added here in her own words.
          </p>
          <Link href="/about" className="text-link">
            Read my story <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <section className="why-section container">
        <div>
          <p className="eyebrow">MORE THAN SOMETHING BEAUTIFUL</p>
          <h2>
            Why choose <em>an original?</em>
          </h2>
        </div>
        <div className="why-grid">
          {[
            [
              Brush,
              "Made by hand",
              "Original acrylic paintings, created by the artist.",
            ],
            [
              Fingerprint,
              "Only one original",
              "A unique piece with its own place in your home.",
            ],
            [
              Leaf,
              "Care in every detail",
              "Take a closer look at the work, and ask about the process.",
            ],
            [
              HeartHandshake,
              "A personal connection",
              "Enquire directly with the person behind the painting.",
            ],
          ].map(([Icon, title, text]) => {
            const I = Icon as typeof Brush;
            return (
              <div className="why-item" key={String(title)}>
                <I size={25} strokeWidth={1.2} />
                <h3>{String(title)}</h3>
                <p>{String(text)}</p>
              </div>
            );
          })}
        </div>
      </section>
      <section className="commission-banner container">
        <div className="commission-symbol">
          <Sparkles size={68} strokeWidth={0.7} />
          <span>A PORTRAIT, A PERSONAL STORY</span>
        </div>
        <div>
          <p className="eyebrow">SOMETHING UNIQUELY YOURS</p>
          <h2>
            Your memories.
            <br />
            <em>A new medium.</em>
          </h2>
          <p>
            Explore a personalised portrait, starting with a conversation about
            the people and moments that matter to you.
          </p>
          <Link href="/custom-portraits" className="button">
            Request a custom portrait <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <section className="section container instagram-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">LITTLE MOMENTS FROM THE STUDIO</p>
            <h2>
              Art, beyond <em>the frame.</em>
            </h2>
          </div>
          {brand.instagramUrl ? (
            <a
              className="text-link"
              href={brand.instagramUrl}
              target="_blank"
              rel="noreferrer"
            >
              <Instagram size={17} /> Find us on Instagram{" "}
              <ArrowUpRight size={16} />
            </a>
          ) : (
            <span className="small muted">
              <Instagram size={16} /> Instagram profile coming soon
            </span>
          )}
        </div>
        <div className="instagram-grid">
          {artworks.map((a) => (
            <Link
              key={a.id}
              href={`/artwork/${a.slug}`}
              aria-label={`Explore ${a.title}`}
            >
              <ArtworkImage artwork={a} />
            </Link>
          ))}
        </div>
        <p className="small muted instagram-note">
          Original paintings from the studio collection. Explore each artwork
          for a closer look; these are catalogue photographs, not social posts.
        </p>
      </section>
    </>
  );
}
