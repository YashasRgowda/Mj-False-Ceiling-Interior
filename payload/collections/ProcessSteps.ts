import type { CollectionConfig } from "payload";
import { revalidateShared, revalidateSharedOnDelete } from "../hooks/revalidate";
import { displayOrder } from "../lib/slug";

export const ProcessSteps: CollectionConfig = {
  hooks: { afterChange: [revalidateShared], afterDelete: [revalidateSharedOnDelete] },
  slug: "process-steps",
  labels: { singular: "Step", plural: "How We Work" },
  admin: {
    hidden: true,
    hideAPIURL: true,
    useAsTitle: "title",
    defaultColumns: ["numeral", "title", "meta", "order"],
    group: "Your Website",
    description: 'The steps shown under "How we work" on your home and service pages.',
  },
  access: { read: () => true },
  defaultSort: "order",
  fields: [
    { name: "numeral", type: "text", label: "Step number", required: true,
      admin: { description: 'For example: 01' } },
    { name: "title", type: "text", label: "Step name", required: true },
    { name: "body", type: "textarea", label: "What happens in this step", required: true },
    { name: "meta", type: "text", label: "Small label on the right",
      admin: { description: 'For example: Free, or Warranty' } },
    displayOrder,
  ],
};
