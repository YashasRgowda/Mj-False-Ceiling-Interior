import type { Metadata } from "next";
import { getServices, getSiteSettings } from "@/lib/data";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { CtaBand } from "@/components/site/CtaBand";

export async function generateMetadata(): Promise<Metadata> {
  const services = await getServices();
  return {
    title: "Services",
    description: `${services.map((s) => s.name).join(", ")} — designed and built by MJ False Ceiling Interior in Bengaluru.`,
  };
}

export default async function ServicesIndexPage() {
  const [services, settings] = await Promise.all([getServices(), getSiteSettings()]);

  return (
    <>
      <section className="section" style={{ paddingTop: "calc(var(--nav-h) + 70px)" }}>
        <div className="container">
          <div className="eyebrow row">
            <span className="rule" />
            Services
          </div>
          <h1 className="h-display" style={{ fontSize: "clamp(38px,6.4vw,92px)", marginTop: 22 }}>
            Every room, its own <em>discipline.</em>
          </h1>
          <p className="lede" style={{ marginTop: 26, maxWidth: "58ch", fontSize: 17 }}>
            A kitchen and a false ceiling are not the same craft, and they should not be quoted
            off the same sheet. Each service below is priced, planned and built on its own terms.
          </p>

          <div style={{ marginTop: "clamp(44px,6vw,80px)" }}>
            <ServicesGrid services={services} />
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Not sure where to start?"
        heading={
          <>
            Tell us the room.
            <br />
            We&rsquo;ll tell you <em>what it takes.</em>
          </>
        }
      />
    </>
  );
}
