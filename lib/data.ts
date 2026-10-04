import "server-only";
import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Media as MediaDoc } from "@/payload-types";
import type { Media } from "@/lib/types";

const client = cache(async () => getPayload({ config }));

/** Payload upload fields come back as an id or a populated doc — normalise both. */
export function toMedia(value: unknown, fallbackAlt = ""): Media {
  const doc = value as MediaDoc | null | undefined;
  if (!doc || typeof doc !== "object" || !doc.url) {
    return { src: "", alt: fallbackAlt };
  }
  return { src: doc.url, alt: doc.alt || fallbackAlt };
}

export function toMediaList(value: unknown): Media[] {
  if (!Array.isArray(value)) return [];
  return value.map((v) => toMedia(v)).filter((m) => m.src);
}

/**
 * Renders *asterisked* words as gold italic, so the client can emphasise a
 * word from the admin panel without touching HTML.
 */
export function splitEmphasis(text: string) {
  return text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") && part.length > 2
      ? { emphasis: true, text: part.slice(1, -1), key: i }
      : { emphasis: false, text: part, key: i }
  );
}

export const getServices = cache(async () => {
  const payload = await client();
  const { docs } = await payload.find({
    collection: "services",
    where: { published: { equals: true } },
    sort: "order",
    limit: 100,
    depth: 2,
  });
  return docs;
});

export const getServiceBySlug = cache(async (slug: string) => {
  const payload = await client();
  const { docs } = await payload.find({
    collection: "services",
    where: { slug: { equals: slug }, published: { equals: true } },
    limit: 1,
    depth: 2,
  });
  return docs[0] ?? null;
});

export const getProjects = cache(async () => {
  const payload = await client();
  const { docs } = await payload.find({
    collection: "projects",
    where: { published: { equals: true } },
    sort: "order",
    limit: 100,
    depth: 2,
  });
  return docs;
});

/** Reviews now live on the Home Page global, not a separate collection. */
export const getTestimonials = cache(async () => {
  const settings = await getSiteSettings();
  return (settings.reviews ?? []).map((r, i) => ({
    id: r.id ?? String(i),
    quote: r.quote,
    author: r.author,
    context: r.context ?? "",
    rating: r.rating ?? 5,
    initial: (r.author ?? "?").trim().charAt(0).toUpperCase(),
    source: "Google review",
    isPlaceholder: Boolean(r.isPlaceholder),
  }));
});

export const getProcessSteps = cache(async () => {
  const payload = await client();
  const { docs } = await payload.find({
    collection: "process-steps",
    sort: "order",
    limit: 50,
  });
  return docs;
});

/** Questions now live on the Home Page global. */
export const getFaqs = cache(async () => {
  const settings = await getSiteSettings();
  return (settings.questions ?? []).map((q) => ({
    question: q.question,
    answer: q.answer,
  }));
});

export const getAboutPage = cache(async () => {
  const payload = await client();
  return payload.findGlobal({ slug: "about-page", depth: 2 });
});

export const getSiteSettings = cache(async () => {
  const payload = await client();
  return payload.findGlobal({ slug: "site-settings", depth: 2 });
});

export const getContactSettings = cache(async () => {
  const payload = await client();
  return payload.findGlobal({ slug: "contact-settings" });
});

/** Convenience: the derived links the nav, footer and CTAs all need. */
export const getContact = cache(async () => {
  const c = await getContactSettings();
  const e164 = (c.phoneE164 ?? "").replace(/[^\d+]/g, "");
  return {
    ...c,
    phoneHref: `tel:${e164}`,
    whatsappHref: `https://wa.me/${e164.replace(/^\+/, "")}`,
    areas: (c.serviceAreas ?? []).map((a: { area: string }) => a.area),
    addressLines: (c.addressLines ?? []).map((a: { line: string }) => a.line),
  };
});

/** Every gallery photo across all services, de-duplicated. Powers the Work page. */
export const getAllWorkPhotos = cache(async () => {
  const services = await getServices();
  const seen = new Set<string>();
  return services
    .flatMap((service) => toMediaList(service.gallery))
    .filter((image) => {
      if (seen.has(image.src)) return false;
      seen.add(image.src);
      return true;
    });
});
