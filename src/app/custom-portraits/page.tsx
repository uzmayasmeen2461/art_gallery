import { EnquiryForm } from "@/components/enquiry-form";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Custom portrait enquiries",
  "Explore a personalised portrait commission with an independent artist in Hyderabad. Prepare a reference, discuss your preferred style, and request a quote.",
  "/custom-portraits",
);
const steps = [
  [
    "Share a reference",
    "Choose a clear photograph. You’ll share the image separately with the artist; this demo does not upload it.",
  ],
  [
    "Find your direction",
    "Describe the portrait type, preferred style and any details that matter to you.",
  ],
  [
    "Think about size",
    "Share approximate dimensions if you know them. You can also discuss options with the artist.",
  ],
  [
    "Receive a personal quote",
    "The artist will confirm what is possible, the price, materials and expected timing.",
  ],
  [
    "Confirm with the artist",
    "Agree on the details and payment directly. Opening an enquiry does not place an order.",
  ],
];
export default function PortraitPage() {
  return (
    <div className="container">
      <div className="page-intro">
        <p className="eyebrow">PERSONAL MEMORIES, ORIGINAL ART</p>
        <h1>
          A portrait, <em>just for you.</em>
        </h1>
        <p>
          People, moments and connections worth keeping. Begin a conversation
          about an artwork that’s personal to you.
        </p>
      </div>
      <div className="commission-layout">
        <div className="commission-intro">
          <h2>
            From a photograph
            <br />
            to <em>a conversation.</em>
          </h2>
          <ol className="commission-steps">
            {steps.map(([title, text], i) => (
              <li key={title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="placeholder-note">
            Commission availability, styles, prices and completion times are to
            be confirmed by the artist. Please use a photograph you have
            permission to share.
          </p>
        </div>
        <EnquiryForm commission />
      </div>
    </div>
  );
}
