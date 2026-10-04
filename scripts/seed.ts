/**
 * One-off seed.
 *
 * Downloads every stock placeholder, uploads it into Supabase Storage as a real
 * Media record, then creates all services, projects, reviews, steps, FAQs and
 * settings from the files in /content.
 *
 * Because the photos become genuine uploads (not external links), replacing one
 * later is just: open it in the admin panel, upload a new file, save.
 *
 * Run:  npm run seed
 */
import { getPayload } from "payload";
import config from "../payload.config.js";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { services as seedServices } from "../content/services.js";
import { projects as seedProjects } from "../content/projects.js";
import { testimonials as seedTestimonials } from "../content/testimonials.js";
import { processSteps as seedSteps } from "../content/process.js";
import { generalFaqs as seedFaqs } from "../content/faqs.js";
import { site, locations, serviceAreas } from "../content/site.js";

const tmp = await fs.mkdtemp(path.join(os.tmpdir(), "mj-seed-"));
const mediaCache = new Map<string, number>();

function fileNameFor(url: string) {
  const id = url.split("/").pop()?.split("?")[0] ?? "image";
  return `${id}.jpg`;
}

async function upload(payload: any, src: string, alt: string): Promise<number> {
  const cached = mediaCache.get(src);
  if (cached !== undefined) return cached;

  // Ask the source for a large, good-quality original — this is what the
  // client will later replace with their own photo.
  const url = src.includes("?") ? src.replace(/w=\d+/, "w=2400") : src;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download failed ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());

  const filePath = path.join(tmp, fileNameFor(src));
  await fs.writeFile(filePath, buf);

  const doc = await payload.create({
    collection: "media",
    data: { alt, credit: "Stock placeholder — replace with your own photo", isPlaceholder: true },
    filePath,
  });

  mediaCache.set(src, doc.id as number);
  process.stdout.write(".");
  return doc.id as number;
}

const run = async () => {
  const payload = await getPayload({ config });
  console.log("\nConnected. Seeding…\n");

  // ---- wipe anything from a previous run so this is re-runnable ----
  for (const c of ["services", "projects", "testimonials", "process-steps", "faqs", "media"] as const) {
    await payload.delete({ collection: c, where: { id: { exists: true } } });
  }
  console.log("Cleared existing rows.");

  // ---- media ----
  process.stdout.write("Uploading images ");
  for (const s of seedServices) {
    await upload(payload, s.hero.src, s.hero.alt);
    for (const g of s.gallery) await upload(payload, g.src, g.alt);
  }
  for (const p of seedProjects) await upload(payload, p.cover.src, p.cover.alt);
  const heroImg = await upload(
    payload,
    "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2400&auto=format&fit=crop",
    "Living room with a stepped false ceiling and concealed cove lighting"
  );
  const sigImg = await upload(
    payload,
    "https://images.unsplash.com/photo-1621293954908-907159247fc8?q=80&w=2400&auto=format&fit=crop",
    "Curved timber slat wall and ceiling detail in a warm interior"
  );
  console.log(`\n${mediaCache.size} images uploaded to Supabase Storage.`);

  // ---- services ----
  const serviceIds = new Map<string, number>();
  for (const s of seedServices) {
    const doc = await payload.create({
      collection: "services",
      data: {
        name: s.name,
        slug: s.slug,
        navLabel: s.navLabel,
        kicker: s.kicker,
        tagline: s.tagline,
        summary: s.summary,
        hero: mediaCache.get(s.hero.src)!,
        introHeading: s.intro.heading,
        introBody: s.intro.body.map((text) => ({ text })),
        highlights: s.highlights.map((h) => ({ title: h.title, body: h.body })),
        offerings: s.offerings.map((label) => ({ label })),
        materials: s.materials.map((m) => ({ name: m.name, note: m.note })),
        gallery: s.gallery.map((g) => mediaCache.get(g.src)!).filter(Boolean),
        faqs: s.faqs.map((f) => ({ question: f.question, answer: f.answer })),
        priceNote: s.priceNote,
        order: s.order,
        published: s.published,
      },
    });
    serviceIds.set(s.slug, doc.id as number);
  }
  console.log(`${seedServices.length} services created.`);

  // ---- projects ----
  for (const p of seedProjects) {
    await payload.create({
      collection: "projects",
      data: {
        title: p.title,
        slug: p.slug,
        locationLabel: p.locationLabel,
        year: p.year,
        caption: p.caption,
        cover: mediaCache.get(p.cover.src)!,
        services: p.serviceSlugs.map((sl) => serviceIds.get(sl)).filter((v): v is number => typeof v === "number"),
        layout: p.layout,
        order: p.order,
        published: p.published,
      },
    });
  }
  console.log(`${seedProjects.length} projects created.`);

  // ---- testimonials / steps / faqs ----
  for (const t of seedTestimonials) {
    await payload.create({
      collection: "testimonials",
      data: {
        quote: t.quote, author: t.author, context: t.context, rating: t.rating,
        initial: t.initial, source: t.source, isPlaceholder: t.isPlaceholder, order: t.order,
      },
    });
  }
  for (const s of seedSteps) {
    await payload.create({
      collection: "process-steps",
      data: { numeral: s.numeral, title: s.title, body: s.body, meta: s.meta, order: Number(s.numeral) },
    });
  }
  for (const [i, f] of seedFaqs.entries()) {
    await payload.create({
      collection: "faqs",
      data: { question: f.question, answer: f.answer, order: i + 1, published: true },
    });
  }
  console.log("Reviews, process steps and FAQs created.");

  // ---- globals ----
  await payload.updateGlobal({
    slug: "site-settings",
    data: {
      businessName: site.name,
      shortName: site.shortName,
      wordmarkLead: site.wordmark.lead,
      wordmarkRest: site.wordmark.rest,
      city: site.city,
      state: site.state,
      metaDescription: site.metaDescription,
      heroLine1: "We build",
      heroLine2: "with *light.*",
      heroSub: `False ceilings, modular kitchens and complete home interiors — designed, built and finished by one team. ${site.rating} stars from ${site.reviewCount} Bengaluru homeowners.`,
      heroImage: heroImg,
      signatureQuote: "A ceiling is finished when the *light* is right — not before.",
      signatureImage: sigImg,
      studioLead:
        "One team, start to finish. The people who draw your ceiling are the people who *build* it.",
      rating: site.rating,
      reviewCount: site.reviewCount,
      yearsActive: site.unverified.yearsActive,
      projectsDelivered: site.unverified.projectsDelivered,
    },
  });

  await payload.updateGlobal({
    slug: "contact-settings",
    data: {
      phoneDisplay: site.phoneDisplay,
      phoneE164: "+919986436139",
      email: site.unverified.email,
      hours: site.unverified.hours,
      googleMapsUrl: site.googleMapsUrl,
      addressLines: locations[0].addressLines.map((line) => ({ line })),
      serviceAreas: serviceAreas.map((area) => ({ area })),
      social: { instagram: "", facebook: "", youtube: "" },
    },
  });
  console.log("Settings saved.");

  // ---- first admin user ----
  const email = process.env.ADMIN_EMAIL ?? "admin@mjinterior.local";
  const existing = await payload.find({ collection: "users", where: { email: { equals: email } }, limit: 1 });
  if (existing.totalDocs === 0) {
    await payload.create({
      collection: "users",
      data: { email, password: process.env.ADMIN_PASSWORD ?? "ChangeMe123!", name: "MJ Interior" },
    });
    console.log(`\nAdmin user created: ${email}`);
  } else {
    console.log(`\nAdmin user already exists: ${email}`);
  }

  await fs.rm(tmp, { recursive: true, force: true });
  console.log("\nSeed complete.\n");
  process.exit(0);
};

run().catch((err) => {
  console.error("\nSeed failed:", err);
  process.exit(1);
});
