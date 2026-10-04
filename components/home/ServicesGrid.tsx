import Image from "next/image";
import Link from "next/link";
import { toMedia } from "@/lib/data";
import type { Service } from "@/payload-types";

export function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <div className="svc-grid">
      {services.map((service, i) => {
        const hero = toMedia(service.hero, service.name);
        return (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="svc-card"
            data-reveal
            data-reveal-delay={(i % 3) * 90}
          >
            <div className="svc-media">
              {hero.src && (
                <Image
                  src={hero.src}
                  alt={hero.alt}
                  fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              )}
            </div>
            <span className="svc-num">{String(service.order).padStart(2, "0")}</span>
            <div className="svc-body">
              <h3>{service.name}</h3>
              <p>{service.summary}</p>
              <span className="svc-more">
                View work <span aria-hidden="true">&#8594;</span>
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
