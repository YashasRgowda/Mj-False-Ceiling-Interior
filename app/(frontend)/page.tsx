import Link from "next/link";
import {
  getFaqs,
  getServices,
  getSiteSettings,
  getTestimonials,
  toMedia,
} from "@/lib/data";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { Signature } from "@/components/home/Signature";
import { Process } from "@/components/home/Process";
import { Testimonials } from "@/components/home/Testimonials";
import { FaqList } from "@/components/site/FaqList";
import { CtaBand } from "@/components/site/CtaBand";
import { Emphasis } from "@/components/site/Emphasis";

export default async function HomePage() {
  const [settings, services, testimonials, faqs] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getTestimonials(),
    getFaqs(),
  ]);

  return (
    <>
      <Hero />
      <TrustBar />

      {/* ---- services: each one has its own page ---- */}
      <section className="section" id="services">
        <div className="container">
          <div className="sec-head">
            <div>
              <div className="eyebrow">What we do</div>
              <h2 className="h-display" style={{ marginTop: 20 }}>
                Every room, handled <em>properly.</em>
              </h2>
            </div>
            <p className="lede side">
              Take one room or the whole home. Each service below has its own page with the
              materials we use, how we work and what it costs to get right.
            </p>
          </div>

          <ServicesGrid services={services} />
        </div>
      </section>

      <Signature
        quote={settings.signatureQuote}
        image={toMedia(settings.signatureImage, "Completed interior detail")}
      />

      <Process />

      <Testimonials
        testimonials={testimonials}
        rating={settings.rating}
        reviewCount={settings.reviewCount}
      />

      {/* ---- studio / numbers ---- */}
      <section className="section stats">
        <div className="haze" aria-hidden="true" />
        <div className="container stats-inner">
          <div className="eyebrow">The studio</div>
          <p className="lead" style={{ marginTop: 26 }}>
            <Emphasis text={settings.studioLead} />
          </p>

          <div className="figs">
            <div className="fig">
              <div className="n">{settings.rating}</div>
              <div className="l">Google rating</div>
            </div>
            <div className="fig">
              <div className="n">{settings.reviewCount}</div>
              <div className="l">Client reviews</div>
            </div>
            <div className="fig">
              <div className="n">{settings.projectsDelivered}+</div>
              <div className="l">Projects delivered</div>
            </div>
            <div className="fig">
              <div className="n">{services.length}</div>
              <div className="l">Services offered</div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- faq ---- */}
      <section className="section section-light" id="faq">
        <div className="container">
          <div className="sec-head">
            <h2 className="h-display">
              Questions we get <em>every week.</em>
            </h2>
            <div className="eyebrow">Before we begin</div>
          </div>
          <FaqList items={faqs.map((f) => ({ question: f.question, answer: f.answer }))} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
