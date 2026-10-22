import { brand } from "@/config/brand";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Prototype terms",
  "Read the prototype limitations, provisional catalogue pricing and personal enquiry process for original artwork.",
  "/terms",
);
export default function Terms() {
  return (
    <article className="container policy-page">
      <div className="page-intro">
        <p className="eyebrow">A CLEAR UNDERSTANDING</p>
        <h1>
          Prototype <em>terms.</em>
        </h1>
        <p>
          Draft information for demonstration. Final business terms must be
          supplied and reviewed before launch.
        </p>
      </div>
      <h2>A gallery demonstration</h2>
      <p>
        This is the Phase 1 prototype for {brand.name}. Original artwork
        photographs and the official logo have been supplied. The artist’s
        biography and contact details are awaiting confirmation.
        Image-to-listing matches are based on the supplied visual subjects and
        await the artist’s review.
      </p>
      <h2>Catalogue & prices</h2>
      <p>
        The five artwork titles and provisional INR prices were supplied for
        this prototype. Availability is demonstration data and must be confirmed
        directly. Dimensions and framing are not specified. Photographs show the
        original compositions; colours may vary slightly between screens.
      </p>
      <h2>Enquiries & purchasing</h2>
      <p>
        This website does not take payment, reserve stock or confirm orders.
        Adding a painting to the bag or opening WhatsApp starts no sales
        contract. Agree on availability, the final price, payment, delivery and
        applicable sale terms with the artist before purchasing.
      </p>
      <h2>Portrait requests</h2>
      <p>
        The form previews a draft locally. A separate WhatsApp action opens an
        enquiry when the business number is configured; photographs must be
        shared separately. A quote, timeline and commission agreement must be
        arranged directly with the artist.
      </p>
      <h2>Policies still to be confirmed</h2>
      <p>
        Shipping, cancellations, refunds, returns, custom commission terms and
        business contact information are pending. These draft notes are not a
        substitute for the final business policies.
      </p>
      <Link href="/contact" className="text-link" style={{ marginTop: 25 }}>
        Contact information →
      </Link>
    </article>
  );
}
