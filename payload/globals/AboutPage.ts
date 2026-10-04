import type { GlobalConfig } from "payload";
import { revalidateGlobal } from "../hooks/revalidate";

export const AboutPage: GlobalConfig = {
  hooks: { afterChange: [revalidateGlobal] },
  slug: "about-page",
  label: "About Page",
  admin: {
    hideAPIURL: true,
    group: "Your Website",
    description: "The page that tells customers who you are.",
  },
  access: { read: () => true },
  fields: [
    { name: "heading", type: "text", label: "Page heading", required: true,
      admin: { description: "Put *stars* around a word to make it gold." } },
    { name: "image", type: "upload", relationTo: "media", label: "Photo", required: true },
    {
      name: "paragraphs",
      type: "array",
      label: "About your business",
      labels: { singular: "Paragraph", plural: "Paragraphs" },
      required: true,
      fields: [{ name: "text", type: "textarea", label: "Paragraph", required: true }],
    },
  ],
};
