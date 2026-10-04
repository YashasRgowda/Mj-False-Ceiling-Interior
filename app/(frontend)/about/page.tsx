import type { Metadata } from "next";
import Image from "next/image";
import { getAboutPage, getSiteSettings, toMedia } from "@/lib/data";
import { Process } from "@/components/home/Process";
import { CtaBand } from "@/components/site/CtaBand";
import { Stars } from "@/components/site/Stars";
import { Emphasis } from "@/components/site/Emphasis";

export const metadata: Metadata = {
  title: "About the Studio",
  description:
    "MJ False Ceiling Interior is a Bengaluru studio building false ceilings, kitchens and complete home interiors with its own in-house team.",
};

export default async function AboutPage() {
  const [about, settings] = await Promise.all([getAboutPage(), getSiteSettings()]);
  const image = toMedia(about.image, "Completed interior detail");

  return (
    <>
      <section className="section" style={{ paddingTop: "calc(var(--nav-h) + 70px)" }}>
        <div className="container">
          <div className="eyebrow row">
            <span className="rule" />
            The studio
          </div>
          <h1 className="h-display" style={{ fontSize: "clamp(38px,6.4vw,92px)", marginTop: 22 }}>
            <Emphasis text={about.heading} />
          </h1>

          <div className="svc-intro" style={{ marginTop: "clamp(44px,6vw,76px)" }}>
            <div>
              <div
                style={{ position: "relative", aspectRatio: "4/5", borderRadius: 3, overflow: "hidden" }}
              >
                {image.src && (
                  <Image src={image.src} alt={image.alt} fill sizes="(max-width: 1080px) 100vw, 50vw" />
                )}
              </div>
            </div>

            <div className="body">
              {(about.paragraphs ?? []).map((p) => (
                <p key={p.id ?? p.text.slice(0, 32)}>{p.text}</p>
              ))}
              <div style={{ marginTop: 28 }}>
                <Stars rating={settings.rating} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Process />
      <CtaBand />
    </>
  );
}
