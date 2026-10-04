import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : undefined;

const nextConfig: NextConfig = {
  // Each build worker opens its own database pool; too many exhausts
  // Supabase's free-tier client limit during prerendering.
  experimental: { cpus: 3 },
  images: {
    remotePatterns: [
      // Supabase Storage — where all uploaded photos live.
      ...(supabaseHost
        ? [{ protocol: "https" as const, hostname: supabaseHost }]
        : []),
      // Stock placeholders, only used by the one-off seed script.
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
