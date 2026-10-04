import type { Metadata } from "next";
import { getAllWorkPhotos, getSiteSettings } from "@/lib/data";
import { Gallery } from "@/components/service/Gallery";
import { CtaBand } from "@/components/site/CtaBand";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "False ceilings, kitchens, bedrooms and full home interiors completed across Bengaluru by MJ False Ceiling Interior.",
};

/**
 * Every gallery photo from every service, automatically. Nothing to maintain
 * separately — adding a photo to a service page adds it here too.
 */
export default async function WorkPage() {
  const [photos, settings] = await Promise.all([getAllWorkPhotos(), getSiteSettings()]);

  return (
    <>
      <section className="section" style={{ paddingTop: "calc(var(--nav-h) + 70px)" }}>
        <div className="container">
          <div className="eyebrow row">
            <span className="rule" />
            Our work
          </div>
          <h1 className="h-display" style={{ fontSize: "clamp(38px,6.4vw,92px)", marginTop: 22 }}>
            Built, finished and <em>handed over.</em>
          </h1>
          <p className="lede" style={{ marginTop: 26, maxWidth: "56ch", fontSize: 17 }}>
            Projects across {settings.city} — from a single ceiling in a rented flat to a complete
            three-bedroom fit-out. Tap any photo to view it larger.
          </p>

          <div style={{ marginTop: "clamp(44px,6vw,80px)" }}>
            {photos.length > 0 && <Gallery images={photos} label="All work" />}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
