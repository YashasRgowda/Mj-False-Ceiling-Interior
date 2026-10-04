import Image from "next/image";
import Link from "next/link";
import { getSiteSettings, toMedia } from "@/lib/data";
import { Emphasis } from "@/components/site/Emphasis";

export async function Hero() {
  const settings = await getSiteSettings();
  const image = toMedia(settings.heroImage, "Interior by MJ False Ceiling Interior");

  return (
    <section className="hero">
      <div className="hero-media">
        {image.src && (
          <Image src={image.src} alt={image.alt} fill priority sizes="100vw" />
        )}
      </div>
      <div className="hero-glow" aria-hidden="true" />

      <div className="hero-inner container">
        <div className="eyebrow row hero-eyebrow">
          <span className="rule" />
          False ceiling &amp; interiors &middot; {settings.city}
        </div>

        <h1 className="h-display">
          <span className="row">
            <span>{settings.heroLine1}</span>
          </span>
          <span className="row">
            <span>
              <Emphasis text={settings.heroLine2} />
            </span>
          </span>
        </h1>

        <p className="lede hero-sub">{settings.heroSub}</p>

        <div className="hero-actions">
          <Link href="/contact" className="btn btn-primary">
            Book a free site visit
          </Link>
          <Link href="/services" className="btn btn-ghost">
            Explore services
          </Link>
        </div>
      </div>
    </section>
  );
}
