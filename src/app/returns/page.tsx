import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Returns & cancellations",
  "Draft returns, cancellation and damage guidance for Dilshad Art Studio. Final terms must be confirmed with the artist before purchase.",
  "/returns",
);
export default function ReturnsPage() {
  return (
    <article className="container policy-page">
      <div className="page-intro">
        <p className="eyebrow">BEFORE YOU BRING ART HOME</p>
        <h1>
          Returns <em>& cancellations.</em>
        </h1>
        <p>
          Draft policy · Awaiting the artist’s approval. No final return or
          refund terms have been supplied.
        </p>
      </div>
      <h2>Original paintings</h2>
      <p>
        Before payment, ask the artist to confirm whether a return, exchange or
        cancellation is possible and the applicable conditions. This prototype
        does not promise a return window, free returns or refund eligibility.
      </p>
      <h2>Custom portraits</h2>
      <p>
        Commission scope, reference approval, revisions, deposits, cancellation
        and refund conditions must be agreed directly with the artist before
        work begins. No commission is confirmed by previewing a draft or opening
        WhatsApp.
      </p>
      <h2>If something arrives damaged</h2>
      <p>
        Contact the artist with the artwork reference and photographs of the
        packaging and damage. Retain the packaging while the issue is discussed.
        The artist must provide the final reporting process and resolution terms
        before launch.
      </p>
      <h2>Before launch</h2>
      <p>
        The studio’s approved returns, cancellations, refund timelines and
        contact details will replace this draft. Read the agreed sale terms
        before making a payment.
      </p>
      <Link href="/contact" className="text-link" style={{ marginTop: 25 }}>
        Discuss the terms with the artist →
      </Link>
    </article>
  );
}
