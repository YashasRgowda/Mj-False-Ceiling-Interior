import type { CollectionConfig } from "payload";
import { revalidateShared, revalidateSharedOnDelete } from "../hooks/revalidate";
import { displayOrder } from "../lib/slug";

export const Testimonials: CollectionConfig = {
  hooks: { afterChange: [revalidateShared], afterDelete: [revalidateSharedOnDelete] },
  slug: "testimonials",
  labels: { singular: "Customer Review", plural: "Customer Reviews" },
  admin: {
    hidden: true,
    hideAPIURL: true,
    useAsTitle: "author",
    defaultColumns: ["author", "context", "rating", "isPlaceholder"],
    group: "Your Website",
    description:
      "Copy the exact words from your Google reviews here. Please do not write reviews yourself — it is against the law to show made-up reviews.",
  },
  access: { read: () => true },
  defaultSort: "order",
  fields: [
    { name: "quote", type: "textarea", label: "What the customer wrote", required: true,
      admin: { description: "Paste their exact words from Google." } },
    { name: "author", type: "text", label: "Customer name", required: true },
    { name: "context", type: "text", label: "Job and area",
      admin: { description: 'For example: 3 BHK · Whitefield' } },
    { name: "rating", type: "number", label: "Stars given", required: true, min: 1, max: 5,
      defaultValue: 5, admin: { description: "A number from 1 to 5." } },
    { name: "initial", type: "text", label: "Letter for the circle", maxLength: 1,
      admin: { description: "Usually the first letter of their name. Leave blank to do it automatically." } },
    { name: "source", type: "text", label: "Where it came from", defaultValue: "Google review" },
    {
      name: "isPlaceholder", type: "checkbox",
      label: "This is example text, not a real review",
      defaultValue: true,
      admin: {
        position: "sidebar",
        description:
          "A warning shows on your website while this is ticked. Untick once you have pasted a genuine review.",
      },
    },
    displayOrder,
  ],
};
