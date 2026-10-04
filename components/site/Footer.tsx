import Link from "next/link";
import { getContact, getServices, getSiteSettings } from "@/lib/data";

export async function Footer() {
  const [settings, services, contact] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getContact(),
  ]);
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <div className="foot">
          <div>
            <div className="wm">{settings.wordmarkLead}</div>
            <p className="blurb">
              False ceilings, modular kitchens and complete home interiors across {settings.city}.
              One team from drawing to handover.
            </p>
          </div>

          <div className="foot-col">
            <span className="h">Services</span>
            {services.slice(0, 5).map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`}>
                {service.name}
              </Link>
            ))}
            <Link href="/services">All services</Link>
          </div>

          <div className="foot-col">
            <span className="h">Studio</span>
            {contact.addressLines.map((line: string) => (
              <span key={line}>{line}</span>
            ))}
            <span>{contact.hours}</span>
            <a href={contact.googleMapsUrl} target="_blank" rel="noopener noreferrer">
              View on Google Maps
            </a>
          </div>

          <div className="foot-col">
            <span className="h">Enquiries</span>
            <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
            <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <Link href="/contact">Book a site visit</Link>
          </div>
        </div>

        {contact.areas.length > 0 && (
          <div className="foot-areas">
            <div className="h">Serving across {settings.city}</div>
            <div className="list">
              {contact.areas.map((area: string) => (
                <span key={area}>{area}</span>
              ))}
            </div>
          </div>
        )}

        <div className="foot-bottom">
          <span>
            &copy; {year} {settings.businessName}. All rights reserved.
          </span>
          <span>
            Rated {settings.rating} by {settings.reviewCount} clients on Google.
          </span>
        </div>
      </div>
    </footer>
  );
}
