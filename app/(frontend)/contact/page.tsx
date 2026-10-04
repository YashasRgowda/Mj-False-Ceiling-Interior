import type { Metadata } from "next";
import { getContact, getSiteSettings } from "@/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  const contact = await getContact();
  return {
    title: "Contact",
    description: `Call MJ False Ceiling Interior on ${contact.phoneDisplay} for a free site visit anywhere in Bengaluru.`,
  };
}

export default async function ContactPage() {
  const [contact, settings] = await Promise.all([getContact(), getSiteSettings()]);

  return (
    <section className="section" style={{ paddingTop: "calc(var(--nav-h) + 70px)" }}>
      <div className="container">
        <div className="eyebrow row">
          <span className="rule" />
          Contact
        </div>
        <h1 className="h-display" style={{ fontSize: "clamp(38px,6.4vw,92px)", marginTop: 22 }}>
          Book a <em>free site visit.</em>
        </h1>
        <p className="lede" style={{ marginTop: 26, maxWidth: "54ch", fontSize: 17 }}>
          The quickest way to get a real answer is a phone call. Tell us the rooms and the area,
          and we will arrange a visit — usually within two or three days.
        </p>

        <div className="contact-grid" style={{ marginTop: "clamp(44px,6vw,76px)" }}>
          <div>
            <div className="cbox">
              <div className="h">Call the studio</div>
              <a className="big" href={contact.phoneHref}>
                {contact.phoneDisplay}
              </a>
              <p>{contact.hours}</p>
            </div>

            <div className="cbox">
              <div className="h">WhatsApp</div>
              <a className="big" href={contact.whatsappHref} target="_blank" rel="noopener noreferrer">
                Message us
              </a>
              <p>Send photographs of the room and we can give you a rough idea before we visit.</p>
            </div>

            <div className="cbox">
              <div className="h">Email</div>
              <a className="big" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
              <p>Best for drawings, floor plans and detailed requirements.</p>
            </div>
          </div>

          <div>
            <div className="cbox">
              <div className="h">Studio</div>
              <p style={{ marginTop: 0 }}>
                {contact.addressLines.join(", ")}
                <br />
                {settings.city}, {settings.state}
              </p>
              <a
                className="btn btn-ghost"
                style={{ marginTop: 18 }}
                href={contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Google Maps
              </a>
            </div>

            {contact.areas.length > 0 && (
              <div className="cbox">
                <div className="h">Areas we cover</div>
                <p style={{ marginTop: 0 }}>{contact.areas.join(" · ")}</p>
                <p>
                  Outside these areas? Call anyway — we will tell you honestly whether we can
                  service the site properly.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
