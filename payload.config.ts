import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import sharp from "sharp";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import nodemailer from "nodemailer";

import { Media } from "./payload/collections/Media";
import { Users } from "./payload/collections/Users";
import { Services } from "./payload/collections/Services";
import { Projects } from "./payload/collections/Projects";
import { Testimonials } from "./payload/collections/Testimonials";
import { ProcessSteps } from "./payload/collections/ProcessSteps";
import { Faqs } from "./payload/collections/Faqs";
import { SiteSettings } from "./payload/globals/SiteSettings";
import { ContactSettings } from "./payload/globals/ContactSettings";
import { AboutPage } from "./payload/globals/AboutPage";

const dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Uploads go to Supabase Storage over its S3-compatible endpoint.
 * If the S3 keys are not set yet, we fall back to local disk so the admin
 * panel still runs in development — but note that Vercel's filesystem is
 * ephemeral, so the S3 keys are required before deploying.
 */
const hasS3 = Boolean(
  process.env.S3_ACCESS_KEY_ID && process.env.S3_SECRET_ACCESS_KEY
);

const storagePlugins = hasS3
  ? [
      s3Storage({
        collections: {
          media: {
            /**
             * Serve straight from Supabase Storage's public CDN instead of
             * proxying every image through this server. On an image-heavy
             * site that is the difference between fast and sluggish.
             */
            disablePayloadAccessControl: true,
            generateFileURL: ({ filename, prefix }) =>
              [
                process.env.NEXT_PUBLIC_SUPABASE_URL,
                "storage/v1/object/public",
                process.env.S3_BUCKET ?? "media",
                prefix,
                filename,
              ]
                .filter(Boolean)
                .join("/"),
          },
        },
        bucket: process.env.S3_BUCKET ?? "media",
        config: {
          endpoint: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/s3`,
          region: process.env.S3_REGION ?? "ap-south-1",
          credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
          },
          forcePathStyle: true,
        },
      }),
    ]
  : [];

/**
 * Password-reset and other admin emails.
 *
 * Sent through the owner's own Gmail using an App Password, so messages arrive
 * from his real address rather than some no-reply domain. Without these vars
 * Payload logs emails to the console instead — which silently breaks the
 * "Forgot password" flow, so they must be set before handover.
 */
const email =
  process.env.SMTP_USER && process.env.SMTP_PASS
    ? nodemailerAdapter({
        defaultFromAddress: process.env.SMTP_USER,
        defaultFromName: "MJ False Ceiling Interior",
        transport: nodemailer.createTransport({
          host: process.env.SMTP_HOST ?? "smtp.gmail.com",
          port: Number(process.env.SMTP_PORT ?? 465),
          secure: true,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        }),
      })
    : undefined;

export default buildConfig({
  /** Needed for correct reset links and to silence the CORS/CSRF warning. */
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3100",
  email,
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " · MJ Interior",
    },
    components: {
      // Plain-English guide at the top of the dashboard. The person using this
      // panel is a business owner, not a developer.
      beforeDashboard: ["/payload/components/Welcome#default"],
      // Payload only offers the logo as a way back to the dashboard; give the
      // owner an obvious "Home" link in the sidebar instead.
      beforeNavLinks: ["/payload/components/NavHome#default"],
      graphics: {
        Logo: "/payload/components/Brand#Logo",
        Icon: "/payload/components/Brand#Icon",
      },
    },
  },
  /** Hide the developer-only GraphQL tooling from the panel. */
  graphQL: { disablePlaygroundInProduction: true },
  collections: [Services, Projects, Testimonials, ProcessSteps, Faqs, Media, Users],
  // Sidebar order: Home Page, Services, About Page, Contact Page.
  globals: [SiteSettings, AboutPage, ContactSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET as string,
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  db: postgresAdapter({
    pool: {
      /**
       * Session-mode pooler (5432). The transaction pooler on 6543 does not
       * support prepared statements, which Drizzle relies on. Revisit at
       * deploy time if connection counts become a problem.
       */
      connectionString: process.env.DIRECT_URL,
      /**
       * Supabase's free tier allows 15 session-mode clients in total. The
       * production build fans out across several workers, each opening its
       * own pool, so keep each pool small or the build exhausts the limit.
       */
      max: 3,
      idleTimeoutMillis: 10_000,
    },
  }),
  sharp,
  plugins: [...storagePlugins],
  upload: {
    limits: { fileSize: 12_000_000 }, // 12 MB — plenty for a resized photo
  },
})
