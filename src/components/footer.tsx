import Link from "next/link";
import { BrandWordmark } from "@/components/brand-wordmark";
import { ArrowUpRight, Camera as Instagram } from "lucide-react";
import { brand } from "@/config/brand";
import { whatsappUrl } from "@/lib/commerce";
export function Footer() {
  const whatsapp = whatsappUrl(
    brand.whatsappNumber,
    `Hello! I’d like to enquire about ${brand.name}.`,
  );
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link className="wordmark" href="/">
            <BrandWordmark />
          </Link>
          <p>
            Art for your walls.
            <br />A story for your home.
          </p>
          <span className="small">
            Hyderabad, India · Shipping enquiries across India
          </span>
        </div>
        <div>
          <h3>Explore</h3>
          <Link href="/shop">The collection</Link>
          <Link href="/about">About the artist</Link>
          <Link href="/custom-portraits">Custom portraits</Link>
          <Link href="/wishlist">Your favourites</Link>
        </div>
        <div>
          <h3>Here to help</h3>
          <Link href="/contact">Contact & enquiries</Link>
          <Link href="/shipping">Shipping & care</Link>
          <Link href="/returns">Returns & cancellations</Link>
          <Link href="/privacy">Privacy policy</Link>
          <Link href="/terms">Terms & conditions</Link>
        </div>
        <div>
          <h3>Stay connected</h3>
          {brand.instagramUrl ? (
            <a href={brand.instagramUrl} target="_blank" rel="noreferrer">
              Instagram <Instagram size={14} />
            </a>
          ) : (
            <span className="footer-pending">Instagram · coming soon</span>
          )}
          {whatsapp ? (
            <a href={whatsapp} target="_blank" rel="noreferrer">
              WhatsApp <ArrowUpRight size={14} />
            </a>
          ) : (
            <Link href="/contact">
              Contact details to follow <ArrowUpRight size={14} />
            </Link>
          )}
          <p className="small">
            Studio notes & new collections.
            <br />
            Newsletter coming soon.
          </p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} {brand.name}
        </span>
        <span>
          Private prototype · Images, prices & availability to be confirmed
        </span>
        <span>Made with intention.</span>
      </div>
    </footer>
  );
}
