import { Camera as Instagram, Mail, MapPin, MessageCircle } from "lucide-react";
import { brand } from "@/config/brand";
import { whatsappUrl, enquiryMessage } from "@/lib/commerce";
import { EnquiryForm } from "@/components/enquiry-form";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Contact the studio",
  "Questions about original paintings or custom portraits? Contact the artist in Hyderabad. Business contact details are awaiting confirmation.",
  "/contact",
);
export default function ContactPage() {
  const wa = whatsappUrl(brand.whatsappNumber, enquiryMessage([]));
  return (
    <div className="container">
      <div className="page-intro">
        <p className="eyebrow">A DIRECT CONNECTION</p>
        <h1>
          Let’s talk <em>art.</em>
        </h1>
        <p>
          Ask about a painting, discuss a portrait, or simply say hello. Every
          conversation starts somewhere.
        </p>
      </div>
      <div className="contact-layout">
        <div>
          <div className="contact-links">
            <div className="contact-link">
              <MessageCircle size={21} strokeWidth={1.4} />
              <div>
                <h2>A conversation on WhatsApp</h2>
                {wa ? (
                  <a href={wa} target="_blank" rel="noreferrer">
                    Enquire on WhatsApp ↗
                  </a>
                ) : (
                  <p>
                    The artist’s WhatsApp Business number will be added here.
                  </p>
                )}
              </div>
            </div>
            <div className="contact-link">
              <Instagram size={21} strokeWidth={1.4} />
              <div>
                <h2>From the studio</h2>
                {brand.instagramUrl ? (
                  <a href={brand.instagramUrl} target="_blank" rel="noreferrer">
                    Visit Instagram ↗
                  </a>
                ) : (
                  <p>The artist’s Instagram profile will be linked here.</p>
                )}
              </div>
            </div>
            <div className="contact-link">
              <Mail size={21} strokeWidth={1.4} />
              <div>
                <h2>A personal note</h2>
                {brand.email ? (
                  <a href={`mailto:${brand.email}`}>{brand.email}</a>
                ) : (
                  <p>Contact email to be supplied.</p>
                )}
              </div>
            </div>
            <div className="contact-link">
              <MapPin size={21} strokeWidth={1.4} />
              <div>
                <h2>Based in Hyderabad</h2>
                <p>
                  Hyderabad, India
                  <br />
                  Shipping enquiries welcome from across India.
                </p>
              </div>
            </div>
          </div>
          <div className="placeholder-note">
            Private prototype: business contacts are awaiting confirmation. The
            demo form lets you explore the enquiry experience without sending or
            storing personal information.
          </div>
        </div>
        <EnquiryForm />
      </div>
    </div>
  );
}
