/**
 * Content types for MJ False Ceiling Interior.
 *
 * These shapes intentionally mirror the Supabase/Payload collections planned for
 * phase 2. Every field here becomes a column; every exported array in /content
 * becomes a seed row. When the CMS lands, the components keep their props and
 * only the data source changes.
 */

export type Media = {
  /** Absolute URL. Placeholder stock today, Supabase Storage URL later. */
  src: string;
  /** Required, not optional — this site is image-led and alt text must never be skipped. */
  alt: string;
  /** Optional focal hint for tall crops. */
  focus?: "top" | "center" | "bottom";
};

export type Faq = {
  question: string;
  answer: string;
};

export type ProcessStep = {
  numeral: string;
  title: string;
  body: string;
  meta: string;
};

export type Highlight = {
  title: string;
  body: string;
};

export type MaterialNote = {
  name: string;
  note: string;
};

export type Service = {
  slug: string;
  /** Full display name, e.g. "False Ceiling". */
  name: string;
  /** Short label used in nav and chips. */
  navLabel: string;
  /** One line under the hero title. */
  tagline: string;
  /** 1–2 sentences used on cards and meta description. */
  summary: string;
  /** Kicker above the hero title, e.g. "Service 01". */
  kicker: string;
  hero: Media;
  intro: {
    heading: string;
    body: string[];
  };
  /** 3–4 "what you actually get" blocks. */
  highlights: Highlight[];
  /** Variants offered, rendered as a checklist. */
  offerings: string[];
  materials: MaterialNote[];
  gallery: Media[];
  faqs: Faq[];
  /** Left deliberately soft — confirm real numbers with the client before quoting. */
  priceNote: string;
  order: number;
  published: boolean;
};

export type Project = {
  slug: string;
  title: string;
  /** e.g. "3 BHK · Whitefield" */
  locationLabel: string;
  year: string;
  /** Slugs of services used on this project. */
  serviceSlugs: string[];
  caption: string;
  cover: Media;
  layout: "wide" | "standard";
  order: number;
  published: boolean;
};

export type Testimonial = {
  quote: string;
  author: string;
  /** e.g. "3 BHK, Kalyan Nagar" */
  context: string;
  rating: number;
  /** Single letter fallback when there is no avatar image. */
  initial: string;
  source: string;
  /**
   * TRUE until the real Google review text is pasted in.
   * Nothing with this flag should go live on a production domain.
   */
  isPlaceholder: boolean;
  order: number;
};

export type StudioLocation = {
  label: string;
  addressLines: string[];
  city: string;
  pincode: string;
  mapsUrl: string;
  lat: number | null;
  lng: number | null;
  isPrimary: boolean;
};
