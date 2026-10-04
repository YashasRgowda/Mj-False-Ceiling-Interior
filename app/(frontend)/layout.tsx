import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Hanken_Grotesk } from "next/font/google";
import { getContact, getServices, getSiteSettings } from "@/lib/data";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Atmosphere } from "@/components/site/Atmosphere";
import { FloatingCta } from "@/components/site/FloatingCta";
import { Reveal } from "@/components/site/Reveal";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    // TODO: set to the real domain once registered, so OG images resolve.
    metadataBase: new URL("https://mjfalseceilinginterior.com"),
    title: {
      default: `${settings.businessName} — False Ceiling & Interior Designers in ${settings.city}`,
      template: `%s — ${settings.shortName}`,
    },
    description: settings.metaDescription,
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: settings.businessName,
      title: `${settings.businessName} — False Ceiling & Interior Designers in ${settings.city}`,
      description: settings.metaDescription,
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#0B0A08",
  width: "device-width",
  initialScale: 1,
};

/** LocalBusiness structured data, built from the live settings. */
async function StructuredData() {
  const [settings, services, contact] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getContact(),
  ]);

  const data = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: settings.businessName,
    description: settings.metaDescription,
    telephone: contact.phoneE164,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: settings.city,
      addressRegion: settings.state,
      addressCountry: "IN",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: settings.rating,
      reviewCount: settings.reviewCount,
      bestRating: 5,
    },
    areaServed: { "@type": "City", name: settings.city },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Interior services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: service.name, description: service.summary },
      })),
    },
    sameAs: [contact.googleMapsUrl].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <StructuredData />
        <Atmosphere />
        <Nav />
        <main>{children}</main>
        <Footer />
        <FloatingCta />
        <Reveal />
      </body>
    </html>
  );
}
