"use client";
import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, MessageCircle } from "lucide-react";
import { brand } from "@/config/brand";
import {
  portraitEnquiryMessage,
  portraitTypes,
  portraitBudgets,
  whatsappUrl,
} from "@/lib/commerce";

export function EnquiryForm({ commission = false }: { commission?: boolean }) {
  const [draft, setDraft] = useState<string | null>(null);
  const [handoff, setHandoff] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");
  function preview(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (fileError) return;
    const data = new FormData(e.currentTarget);
    const get = (key: string) => String(data.get(key) || "").trim();
    setHandoff(
      commission
        ? whatsappUrl(
            brand.whatsappNumber,
            portraitEnquiryMessage(get("type"), get("budget")),
          )
        : null,
    );
    setDraft(
      commission
        ? `Portrait enquiry draft\n\nName: ${get("name")}\nEmail: ${get("email")}\nPhone: ${get("phone")}\nPortrait type: ${get("type")}\nPreferred size: ${get("size") || "To discuss"}\nBudget: ${get("budget")}\n\n${get("instructions")}\n\nReference photograph: ${fileName ? "Selected locally; share separately with the artist." : "To be shared separately with the artist."}`
        : `General enquiry draft\n\nName: ${get("name")}\nEmail: ${get("email")}\n\n${get("instructions")}`,
    );
  }
  return (
    <div className="form-panel">
      <p className="eyebrow">DEMO ONLY · NOTHING IS SENT</p>
      <h2>
        {commission
          ? "Tell us what you have in mind."
          : "A note to the studio."}
      </h2>
      <p>
        This form creates an on-screen draft only. Information stays on this
        page and is not saved or sent by the form. After previewing a portrait
        draft, you can separately open WhatsApp when the studio’s business
        number is configured.
      </p>
      <form
        onSubmit={preview}
        onChange={() => {
          setDraft(null);
          setHandoff(null);
        }}
      >
        <div className="form-grid">
          <label className="form-field">
            Your name *
            <input
              name="name"
              autoComplete="name"
              required
              minLength={2}
              maxLength={100}
              placeholder="Full name"
              pattern=".*\S.*"
            />
          </label>
          <label className="form-field">
            Email address *
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              placeholder="you@example.com"
            />
          </label>
          {commission && (
            <>
              <label className="form-field">
                Phone number *
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  pattern="\+?[0-9 ]{8,20}"
                  title="Enter a phone number with 8–20 characters: digits, spaces and an optional leading +."
                  placeholder="+91"
                />
              </label>
              <label className="form-field">
                Portrait type *
                <select name="type" required defaultValue="">
                  <option value="" disabled>
                    Select a type
                  </option>
                  {portraitTypes.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </label>
              <label className="form-field">
                Preferred size{" "}
                <span className="small">Optional · approximate dimensions</span>
                <input
                  name="size"
                  placeholder="e.g. approx. 30 × 40 cm"
                  maxLength={80}
                />
              </label>
              <label className="form-field">
                Budget range *
                <select name="budget" required defaultValue="">
                  <option value="" disabled>
                    Select a range
                  </option>
                  {portraitBudgets.map((budget) => (
                    <option key={budget}>{budget}</option>
                  ))}
                </select>
                <span className="small">
                  Budget preferences, not price quotations.
                </span>
              </label>
            </>
          )}
          <label className="form-field full">
            {commission
              ? "Preferred style & special instructions"
              : "Your message"}{" "}
            *
            <textarea
              name="instructions"
              required
              minLength={10}
              maxLength={2000}
              placeholder={
                commission
                  ? "Who is the portrait for? Tell us about the style, occasion and any details you’d like to discuss."
                  : "Which artwork caught your eye? How can the artist help?"
              }
            />
          </label>
          {commission && (
            <label className="form-field full">
              Reference photograph (optional demo selection)
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                aria-describedby="reference-help reference-error"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setFileName("");
                  setFileError("");
                  if (!file) return;
                  if (
                    !["image/jpeg", "image/png", "image/webp"].includes(
                      file.type,
                    ) ||
                    file.size > 5 * 1024 * 1024
                  ) {
                    setFileError(
                      "Please select a JPG, PNG or WebP image smaller than 5 MB.",
                    );
                    e.target.value = "";
                    return;
                  }
                  setFileName(file.name);
                }}
              />
              <span className="small" id="reference-help">
                JPG, PNG or WebP · Up to 5 MB. No upload takes place. Share the
                reference separately with the artist when contact details are
                available.
              </span>
              <span className="small" id="reference-error" role="alert">
                {fileError}
              </span>
            </label>
          )}
        </div>
        <button type="submit" className="button" disabled={!!fileError}>
          Preview enquiry draft <ArrowUpRight size={17} />
        </button>
        <p className="form-note">
          No enquiry, image or order is submitted. No quote or delivery date is
          confirmed. Refreshing or leaving this page clears your draft.
        </p>
      </form>
      {draft && (
        <div className="form-result" role="status">
          <h3>
            <Check size={18} style={{ display: "inline", marginRight: 8 }} />
            Draft preview only
          </h3>
          <p>{draft}</p>
          <p className="small">
            Nothing has been sent or saved. You can select and copy this draft
            to share privately with the artist once her contact details are
            available.
          </p>
          {commission && (
            <div className="commission-handoff">
              {handoff ? (
                <a
                  href={handoff}
                  target="_blank"
                  rel="noreferrer"
                  className="button whatsapp"
                >
                  <MessageCircle size={18} />
                  Discuss this portrait on WhatsApp
                </a>
              ) : (
                <>
                  <button className="button whatsapp" disabled>
                    <MessageCircle size={18} />
                    Discuss this portrait on WhatsApp
                  </button>
                  <p className="small">
                    WhatsApp handoff becomes available once the studio’s real
                    business number is configured.
                  </p>
                </>
              )}
              <p className="small">
                Only the selected portrait type and budget preference are
                included in the WhatsApp link. Your name, email, phone, size,
                free-text instructions and photo stay off the URL; share them
                privately with the artist if needed. Opening WhatsApp does not
                send the message or confirm an order.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
