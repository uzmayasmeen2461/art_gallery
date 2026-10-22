import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Prototype privacy notice",
  "How this local prototype uses browser storage, demo form fields, and external enquiry links.",
  "/privacy",
);
export default function Privacy() {
  return (
    <article className="container policy-page">
      <div className="page-intro">
        <p className="eyebrow">YOUR INFORMATION</p>
        <h1>
          Privacy <em>notice.</em>
        </h1>
        <p>
          Prototype notice · To be reviewed and completed before public launch.
        </p>
      </div>
      <h2>Browser storage</h2>
      <p>
        The bag and wishlist store artwork IDs in this browser’s localStorage
        for saved bag and wishlist selections. This prototype has no customer
        account system or customer database. Clear your browser’s site data to
        remove these saved selections.
      </p>
      <h2>Demo enquiry forms</h2>
      <p>
        Form text stays in the current page’s memory. It is not saved to
        localStorage or submitted to a server. Selecting a reference image does
        not upload or transmit it. Leaving or refreshing the page clears the
        form. Avoid entering sensitive information in this demo.
      </p>
      <h2>External conversations</h2>
      <p>
        When a valid business number is configured, WhatsApp links contain
        artwork titles, reference IDs, prices and an enquiry message. For
        portrait enquiries, only the selected portrait type and budget
        preference are included. Links never contain names, contact fields,
        free-text instructions or reference images. Opening WhatsApp takes you
        to a third-party service, whose own privacy terms apply. Instagram and
        email links similarly use their respective services.
      </p>
      <h2>Analytics & newsletters</h2>
      <p>
        No advertising pixels, marketing analytics, newsletter submissions or
        nonessential tracking cookies are implemented. Hosting providers may
        process ordinary request logs when a website is deployed; the chosen
        provider and applicable practices must be documented before launch.
      </p>
      <h2>Before public launch</h2>
      <p>
        The artist’s business identity and privacy contact, hosting practices,
        applicable retention periods, and any future data processing must be
        documented in a reviewed privacy policy. Contact details are currently
        awaiting confirmation.
      </p>
    </article>
  );
}
