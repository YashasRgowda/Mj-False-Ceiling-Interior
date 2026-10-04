import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getServiceBySlug,
  getServices,
  getSiteSettings,
  toMedia,
  toMediaList,
} from "@/lib/data";
import { Gallery } from "@/components/service/Gallery";
import { FaqList } from "@/components/site/FaqList";
import { CtaBand } from "@/components/site/CtaBand";
import { Process } from "@/components/home/Process";
import { CheckIcon } from "@/components/site/Icons";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const [service, settings] = await Promise.all([getServiceBySlug(slug), getSiteSettings()]);
  if (!service) return { title: "Service not found" };

  const hero = toMedia(service.hero, service.name);
  return {
    title: `${service.name} in ${settings.city}`,
    description: service.summary,
    openGraph: {
      title: `${service.name} — ${settings.shortName}`,
      description: service.summary,
      images: hero.src ? [{ url: hero.src, alt: hero.alt }] : undefined,
    },
  };
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const [service, allServices] = await Promise.all([getServiceBySlug(slug), getServices()]);
  if (!service) notFound();

  const hero = toMedia(service.hero, service.name);
  const gallery = toMediaList(service.gallery);
  const faqs = (service.faqs ?? []).map((f) => ({ question: f.question, answer: f.answer }));
  const others = allServices.filter((s) => s.slug !== service.slug).slice(0, 4);

  /* Per-service FAQ markup helps this page rank for long-tail questions. */
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* ---------- hero ---------- */}
      <section className="svc-hero">
        <div className="svc-hero-media">
          {hero.src && <Image src={hero.src} alt={hero.alt} fill priority sizes="100vw" />}
        </div>

        <div className="svc-hero-inner container">
          <nav className="crumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep" aria-hidden="true">/</span>
            <Link href="/services">Services</Link>
            <span className="sep" aria-hidden="true">/</span>
            <span className="now">{service.name}</span>
          </nav>

          <h1 className="h-display">{service.name}</h1>
          <p className="lede tagline">{service.tagline}</p>
        </div>
      </section>

      {/* ---------- intro + highlights ---------- */}
      <section className="section">
        <div className="container">
          <div className="svc-intro">
            <h2 className="h-display">{service.introHeading}</h2>
            <div className="body">
              {(service.introBody ?? []).map((p) => (
                <p key={p.id ?? p.text.slice(0, 32)}>{p.text}</p>
              ))}
            </div>
          </div>

          {(service.highlights ?? []).length > 0 && (
            <div className="highlights">
              {(service.highlights ?? []).map((highlight, i) => (
                <div
                  className="hl"
                  key={highlight.id ?? highlight.title}
                  data-reveal
                  data-reveal-delay={i * 80}
                >
                  <h3>{highlight.title}</h3>
                  <p>{highlight.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ---------- what's included + materials ---------- */}
      <section className="section-tight" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className="svc-detail">
            <div>
              <div className="eyebrow">What we take on</div>
              <ul className="offer-list" style={{ marginTop: 22 }}>
                {(service.offerings ?? []).map((offering) => (
                  <li key={offering.id ?? offering.label}>
                    <CheckIcon />
                    {offering.label}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="eyebrow">Materials we build in</div>
              <div className="mat-list" style={{ marginTop: 22 }}>
                {(service.materials ?? []).map((material) => (
                  <div className="mat" key={material.id ?? material.name}>
                    <span className="n">{material.name}</span>
                    <span className="d">{material.note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {service.priceNote && (
            <div className="price-note">
              <div className="h">How this is priced</div>
              <p>{service.priceNote}</p>
            </div>
          )}
        </div>
      </section>

      {/* ---------- gallery ---------- */}
      {gallery.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="sec-head">
              <div>
                <div className="eyebrow">The work</div>
                <h2 className="h-display" style={{ marginTop: 20 }}>
                  {service.name} we have <em>built.</em>
                </h2>
              </div>
              <p className="lede side">Tap any image to view it larger.</p>
            </div>

            <Gallery images={gallery} label={service.name} />
          </div>
        </section>
      )}

      <Process />

      {/* ---------- service FAQ ---------- */}
      {faqs.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="sec-head">
              <h2 className="h-display">
                {service.name} <em>questions.</em>
              </h2>
              <p className="lede side">Straight answers. If yours is not here, call us and ask.</p>
            </div>
            <FaqList items={faqs} dark />
          </div>
        </section>
      )}

      {/* ---------- other services ---------- */}
      <section className="section-tight">
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 26 }}>
            Also from the studio
          </div>
          <div className="crosslinks">
            {others.map((other) => {
              const img = toMedia(other.hero, other.name);
              return (
                <Link key={other.slug} href={`/services/${other.slug}`} className="xlink">
                  {img.src && (
                    <Image src={img.src} alt={img.alt} fill sizes="(max-width: 900px) 50vw, 25vw" />
                  )}
                  <span className="t">{other.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow={service.name}
        heading={
          <>
            Get a quote for your
            <br />
            <em>{service.name.toLowerCase()}.</em>
          </>
        }
        body="Free site visit anywhere in Bengaluru. We measure, discuss options and send a written quotation — no obligation to proceed."
      />
    </>
  );
}
