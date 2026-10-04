import type { StudioLocation } from "@/lib/types";

/**
 * VERIFIED — taken from the client's live Google Business Profile.
 */
export const site = {
  name: "MJ False Ceiling Interior",
  shortName: "MJ Interior",
  /** Wordmark is split so "MJ" can carry the accent colour. */
  wordmark: { lead: "MJ", rest: "False Ceiling & Interior" },
  category: "Interior Designer",
  city: "Bengaluru",
  state: "Karnataka",
  phoneDisplay: "099864 36139",
  phoneHref: "tel:+919986436139",
  whatsappHref: "https://wa.me/919986436139",
  rating: 4.8,
  reviewCount: 27,
  googleMapsUrl:
    "https://www.google.com/maps/place/MJ+False+Ceiling+Interior",
  opensAt: "9:00 AM",

  /**
   * ⚠️ TO CONFIRM WITH CLIENT — these are reasonable defaults, not verified facts.
   * Do not publish to a live domain until each one is checked.
   */
  unverified: {
    email: "mjfalseceiling@gmail.com",
    hours: "Mon – Sat · 9:00 AM – 8:00 PM",
    sunday: "Sunday · By appointment",
    instagram: "",
    yearsActive: "10",
    projectsDelivered: "450",
  },

  tagline: "We build with light.",
  metaDescription:
    "MJ False Ceiling Interior designs and installs false ceilings, modular kitchens, bedroom interiors and complete home interiors across Bengaluru. Rated 4.8 by 27 clients.",
} as const;

export const locations: StudioLocation[] = [
  {
    label: "Workshop & Studio",
    // ⚠️ PLACEHOLDER — the Google listing does not expose a full street address.
    // Ask the client for the exact door number, street and landmark.
    addressLines: ["Address to be confirmed", "Bengaluru"],
    city: "Bengaluru",
    pincode: "",
    mapsUrl: site.googleMapsUrl,
    lat: null,
    lng: null,
    isPrimary: true,
  },
];

/** Areas served — drives the local-SEO footer block. */
export const serviceAreas = [
  "Whitefield",
  "Indiranagar",
  "Koramangala",
  "HSR Layout",
  "Hebbal",
  "Banaswadi",
  "Kalyan Nagar",
  "Jayanagar",
  "Electronic City",
  "Yelahanka",
  "Marathahalli",
  "Sarjapur Road",
];
