import type { Testimonial } from "@/lib/types";

/**
 * ⚠️ PLACEHOLDER REVIEW TEXT — DO NOT PUBLISH AS-IS.
 *
 * The 4.8 rating and the count of 27 reviews are REAL and come from the
 * client's Google Business Profile. The quote text below is NOT real: it is
 * filler so the layout can be reviewed.
 *
 * Before this site goes to a live domain, replace every `quote`, `author` and
 * `context` with the actual text of a real Google review and set
 * `isPlaceholder: false`. Publishing invented reviews next to a "verified"
 * badge would be false advertising.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Placeholder review text. Replace this with a real Google review before launch — keep the client's own wording rather than polishing it.",
    author: "Client name",
    context: "3 BHK · Whitefield",
    rating: 5,
    initial: "A",
    source: "Google review",
    isPlaceholder: true,
    order: 1,
  },
  {
    quote:
      "Placeholder review text. A short, specific review about the false ceiling and cove lighting work belongs here.",
    author: "Client name",
    context: "2 BHK · Banaswadi",
    rating: 5,
    initial: "R",
    source: "Google review",
    isPlaceholder: true,
    order: 2,
  },
  {
    quote:
      "Placeholder review text. A review mentioning the modular kitchen, timelines or finish quality would sit well in this slot.",
    author: "Client name",
    context: "Modular kitchen · Kalyan Nagar",
    rating: 5,
    initial: "S",
    source: "Google review",
    isPlaceholder: true,
    order: 3,
  },
  {
    quote:
      "Placeholder review text. Reviews that mention punctuality and site cleanliness convert particularly well for this trade.",
    author: "Client name",
    context: "Full home · Hebbal",
    rating: 4,
    initial: "K",
    source: "Google review",
    isPlaceholder: true,
    order: 4,
  },
  {
    quote:
      "Placeholder review text. Keep one review that mentions a bedroom or wardrobe so every main service is represented.",
    author: "Client name",
    context: "Bedroom interiors · HSR Layout",
    rating: 5,
    initial: "P",
    source: "Google review",
    isPlaceholder: true,
    order: 5,
  },
];

export const hasRealTestimonials = testimonials.some((t) => !t.isPlaceholder);
