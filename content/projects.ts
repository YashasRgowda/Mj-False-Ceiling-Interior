import type { Project } from "@/lib/types";

const u = (id: string, w = 1900) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

/**
 * ⚠️ PLACEHOLDER PROJECTS.
 * Titles, locations and years are illustrative. Replace with the client's real
 * completed projects — this section is the single strongest sales asset on the
 * site and stock photography undercuts it badly.
 */
export const projects: Project[] = [
  {
    slug: "stepped-ceiling-whitefield",
    title: "Stepped Ceiling, Whitefield",
    locationLabel: "3 BHK · Whitefield",
    year: "2026",
    serviceSlugs: ["false-ceiling", "living-hall"],
    caption:
      "A stepped gypsum ceiling with a continuous cove, drawn so the light washes the full length of the hall without a single visible fixture.",
    cover: {
      src: u("photo-1598928506311-c55ded91a20c"),
      alt: "Living room with a stepped coffered ceiling and concealed perimeter lighting",
    },
    layout: "wide",
    order: 1,
    published: true,
  },
  {
    slug: "dark-kitchen-kalyan-nagar",
    title: "Graphite Kitchen",
    locationLabel: "Modular kitchen · Kalyan Nagar",
    year: "2026",
    serviceSlugs: ["modular-kitchen"],
    caption: "Marine ply throughout, matte graphite shutters and a marble backsplash.",
    cover: {
      src: u("photo-1588854337236-6889d631faa8"),
      alt: "Dark modular kitchen with marble backsplash and warm pendant lights",
    },
    layout: "standard",
    order: 2,
    published: true,
  },
  {
    slug: "bedroom-hebbal",
    title: "Stone & Linen Bedroom",
    locationLabel: "Bedroom · Hebbal",
    year: "2025",
    serviceSlugs: ["bedroom-interiors", "wardrobes-storage"],
    caption: "A clad headboard wall, concealed cove light and a full-height sliding wardrobe.",
    cover: {
      src: u("photo-1609766857041-ed402ea8069a"),
      alt: "Bedroom with an upholstered bed against a stone-clad feature wall",
    },
    layout: "standard",
    order: 3,
    published: true,
  },
  {
    slug: "slat-wall-indiranagar",
    title: "The Slat Wall",
    locationLabel: "Living hall · Indiranagar",
    year: "2025",
    serviceSlugs: ["tv-units-panelling", "living-hall"],
    caption:
      "A curved timber slat wall wrapping the living hall, set out from the centre so the run closes on a full panel at both ends.",
    cover: {
      src: u("photo-1621293954908-907159247fc8"),
      alt: "Curved timber slat wall treatment wrapping a warm interior space",
    },
    layout: "wide",
    order: 4,
    published: true,
  },
];

export const publishedProjects = projects
  .filter((p) => p.published)
  .sort((a, b) => a.order - b.order);
