import { brand } from "@/config/brand";
import Link from "next/link";
import { ArtistPortrait } from "@/components/artist-portrait";
import { ArrowUpRight } from "lucide-react";
import { getArtworks } from "@/lib/catalogue";
import { pageMetadata } from "@/lib/seo";
import { ArtworkCard } from "@/components/artwork-card";
export const metadata = pageMetadata(
  "About the artist",
  "Meet an independent female acrylic artist based in Hyderabad. The artist’s personal biography and studio photography will be added soon.",
  "/about",
);
export default function AboutPage() {
  return (
    <div className="container">
      <div className="page-intro">
        <p className="eyebrow">THE HAND BEHIND THE CANVAS</p>
        <h1>
          A personal <em>perspective.</em>
        </h1>
        <p>
          Original art begins with a person. This page is ready for the artist’s
          own words.
        </p>
      </div>
      <section className="story-layout">
        <ArtistPortrait />
        <div className="story-copy">
          <p className="eyebrow">FROM HYDERABAD, WITH COLOUR</p>
          <h2>
            Nature, colour
            <br />
            and <em>possibility.</em>
          </h2>
          <p>
            {brand.name} brings together original handmade acrylic paintings by
            an independent female artist based in Hyderabad, India.
          </p>
          <p>
            Her work includes landscapes, seascapes, floral paintings,
            nature-inspired pieces and portraits. This first edit introduces
            five paintings from the collection.
          </p>
          <div className="placeholder-note">
            Biography placeholder: the artist’s name, personal introduction and
            artistic journey will be added after she supplies and approves them.
          </div>
          <Link href="/contact" className="text-link" style={{ marginTop: 22 }}>
            Start a conversation <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <div className="story-sections">
        <section>
          <p className="eyebrow">01 / THE JOURNEY</p>
          <h2>In her own words.</h2>
          <p>
            Editable placeholder: this space is reserved for the artist’s
            account of how she began painting and how her practice has
            developed.
          </p>
        </section>
        <section>
          <p className="eyebrow">02 / THE SUBJECTS</p>
          <h2>A world to observe.</h2>
          <p>
            The collection spans landscapes, seascapes, florals, nature and
            portraits, brought together through original handmade acrylic
            painting.
          </p>
        </section>
        <section>
          <p className="eyebrow">03 / THE PROCESS</p>
          <h2>Inside the studio.</h2>
          <p>
            Editable placeholder: studio photographs and details about
            materials, techniques and the creative process will be provided by
            the artist.
          </p>
        </section>
      </div>
      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">GET TO KNOW THE WORK</p>
            <h2>
              A first <em>introduction.</em>
            </h2>
          </div>
          <Link href="/shop" className="text-link">
            Explore the collection →
          </Link>
        </div>
        <div className="featured-grid">
          {getArtworks()
            .slice(0, 3)
            .map((a) => (
              <ArtworkCard artwork={a} key={a.id} />
            ))}
        </div>
      </section>
      <div className="simple-cta">
        <h2>
          Let’s talk about <em>art.</em>
        </h2>
        <p>
          A question about a painting, or an idea for a portrait? Start a
          conversation with the artist.
        </p>
        <Link className="button" href="/contact">
          Get in touch <ArrowUpRight size={17} />
        </Link>
      </div>
    </div>
  );
}
