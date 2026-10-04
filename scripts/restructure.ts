/**
 * Moves reviews and questions out of their own collections and into the
 * Home Page, and fills in the new About Page. Run once: npm run restructure
 */
import { getPayload } from "payload";
import config from "../payload.config.js";

const run = async () => {
  const payload = await getPayload({ config });

  const [reviews, faqs, settings] = await Promise.all([
    payload.find({ collection: "testimonials", sort: "order", limit: 100 }),
    payload.find({ collection: "faqs", sort: "order", limit: 100 }),
    payload.findGlobal({ slug: "site-settings" }),
  ]);

  await payload.updateGlobal({
    slug: "site-settings",
    data: {
      reviews: reviews.docs.map((t: any) => ({
        quote: t.quote,
        author: t.author,
        context: t.context ?? "",
        rating: t.rating ?? 5,
        isPlaceholder: t.isPlaceholder ?? true,
      })),
      questions: faqs.docs.map((f: any) => ({ question: f.question, answer: f.answer })),
    },
  });
  console.log(`Moved ${reviews.docs.length} reviews and ${faqs.docs.length} questions into Home Page.`);

  await payload.updateGlobal({
    slug: "about-page",
    data: {
      heading: "We finish what we *draw.*",
      image: (settings as any).signatureImage,
      paragraphs: [
        {
          text: `${(settings as any).businessName} is a ${(settings as any).city} studio. We started with ceilings — gypsum, POP and the cove lighting that makes them worth doing — and the rest of the home followed, because clients kept asking.`,
        },
        {
          text: "We keep our own team rather than passing work down a chain of subcontractors. The person who measures your room is on site while it is being built, which is the only reliable way we know to keep a finish consistent from drawing to handover.",
        },
        {
          text: "It also means we say no sometimes. If a ceiling height will not carry the design you have seen online, or a material will not survive your bathroom, we will tell you at the first visit rather than after the advance is paid.",
        },
        {
          text: `${(settings as any).reviewCount} homeowners have rated the result ${(settings as any).rating} out of 5 on Google. That number matters more to us than any brochure.`,
        },
      ],
    },
  });
  console.log("About Page filled in.");
  process.exit(0);
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
