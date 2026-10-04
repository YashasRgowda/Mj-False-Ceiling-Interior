import type { CollectionConfig } from "payload";
import { revalidateShared, revalidateSharedOnDelete } from "../hooks/revalidate";
import { displayOrder, showOnWebsite } from "../lib/slug";

export const Faqs: CollectionConfig = {
  hooks: { afterChange: [revalidateShared], afterDelete: [revalidateSharedOnDelete] },
  slug: "faqs",
  labels: { singular: "Question", plural: "Common Questions" },
  admin: {
    hidden: true,
    hideAPIURL: true,
    useAsTitle: "question",
    defaultColumns: ["question", "order", "published"],
    group: "Your Website",
    description: "Questions customers ask, shown on your home page.",
  },
  access: { read: () => true },
  defaultSort: "order",
  fields: [
    { name: "question", type: "text", label: "Question", required: true },
    { name: "answer", type: "textarea", label: "Your answer", required: true },
    displayOrder,
    showOnWebsite,
  ],
};
