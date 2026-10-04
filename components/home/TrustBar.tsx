import { getContact, getSiteSettings } from "@/lib/data";
import { Stars } from "@/components/site/Stars";

export async function TrustBar() {
  const [settings, contact] = await Promise.all([getSiteSettings(), getContact()]);

  return (
    <section className="trust" aria-label="Why homeowners choose us">
      <div className="trust-inner container">
        <div className="trust-item">
          <div>
            <Stars rating={settings.rating} />
            <div className="lbl">
              {settings.rating} / 5 &middot; {settings.reviewCount} Google reviews
            </div>
          </div>
        </div>

        <div className="trust-sep" aria-hidden="true" />

        <div className="trust-item">
          <div className="big">{settings.yearsActive}+</div>
          <div className="lbl">
            Years in
            <br />
            {settings.city}
          </div>
        </div>

        <div className="trust-sep" aria-hidden="true" />

        <div className="trust-item">
          <div className="big">{settings.projectsDelivered}+</div>
          <div className="lbl">
            Ceilings &amp; interiors
            <br />
            delivered
          </div>
        </div>

        <div className="trust-sep" aria-hidden="true" />

        <div className="trust-item">
          <div>
            <div className="lbl" style={{ marginBottom: 4 }}>
              Free site visit &amp; measure
            </div>
            <a href={contact.phoneHref} className="big" style={{ display: "block" }}>
              {contact.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
