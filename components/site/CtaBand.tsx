import Link from "next/link";
import { getContact } from "@/lib/data";

export async function CtaBand({
  eyebrow = "Begin",
  heading,
  body,
}: {
  eyebrow?: string;
  heading?: React.ReactNode;
  body?: string;
}) {
  const contact = await getContact();

  return (
    <section className="section cta" id="contact-cta">
      <div className="cta glow" aria-hidden="true" />
      <div className="cta-inner">
        <div className="eyebrow" style={{ marginBottom: 24 }}>
          {eyebrow}
        </div>
        <h2 className="h-display">
          {heading ?? (
            <>
              Let&rsquo;s start with a<br />
              <em>free site visit.</em>
            </>
          )}
        </h2>
        <p>
          {body ??
            "Tell us the rooms, the city and roughly when you want it done. We will come, measure, and give you a written quotation — no obligation."}
        </p>

        <a className="cta-phone" href={contact.phoneHref}>
          {contact.phoneDisplay}
        </a>

        <div className="cta-actions">
          <a
            className="btn btn-primary"
            href={contact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            Message on WhatsApp
          </a>
          <Link className="btn btn-ghost" href="/contact">
            All contact details
          </Link>
        </div>
      </div>
    </section>
  );
}
