import type { CollectionConfig } from "payload";
import { revalidateShared, revalidateSharedOnDelete } from "../hooks/revalidate";

/**
 * Photo storage. Hidden from the sidebar on purpose — photos are chosen from
 * inside the page they belong to, so there is no separate "library" to learn.
 */
export const Media: CollectionConfig = {
  hooks: { afterChange: [revalidateShared], afterDelete: [revalidateSharedOnDelete] },
  slug: "media",
  labels: { singular: "Photo", plural: "Photos" },
  access: { read: () => true },
  admin: {
    hidden: true,
    hideAPIURL: true,
    useAsTitle: "alt",
  },
  upload: {
    mimeTypes: ["image/*"],
    imageSizes: [
      { name: "thumb", width: 400, height: 400, position: "centre" },
      { name: "card", width: 900 },
      { name: "hero", width: 2000 },
    ],
    focalPoint: true,
    crop: true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Describe this photo (optional)",
      // Not required: the owner uploads in batches and will not stop to type a
      // sentence per photo. Filled in automatically below when left blank.
      admin: {
        description:
          "Helps you show up on Google. Leave blank if you are in a hurry — we fill it in for you.",
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value && value.trim()) return value;
            const name = (data?.filename ?? "").toString();
            const cleaned = name
              .replace(/\.[a-z0-9]+$/i, "")
              .replace(/[-_]+/g, " ")
              .replace(/\b(photo|img|image|dsc|\d{6,})\b/gi, "")
              .replace(/\s+/g, " ")
              .trim();
            return cleaned || "Interior work by MJ False Ceiling Interior";
          },
        ],
      },
    },
    {
      name: "isPlaceholder",
      type: "checkbox",
      label: "Stock photo (not your work)",
      defaultValue: false,
      admin: { position: "sidebar" },
    },
    {
      // Kept (hidden) rather than dropped: removing it would delete a column
      // that already holds data for all 48 seeded photos.
      name: "credit",
      type: "text",
      admin: { hidden: true },
    },
  ],
};
