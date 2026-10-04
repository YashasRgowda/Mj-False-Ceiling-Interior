import type { CollectionConfig } from "payload";
import { revalidateService, revalidateServiceOnDelete } from "../hooks/revalidate";
import { autoSlug, displayOrder, showOnWebsite } from "../lib/slug";

/**
 * Photos come first on purpose. The owner's day-to-day job here is swapping
 * stock images for his own work; the written copy rarely changes, so it is
 * tucked into a clearly optional tab.
 */
export const Services: CollectionConfig = {
  hooks: { afterChange: [revalidateService], afterDelete: [revalidateServiceOnDelete] },
  slug: "services",
  labels: { singular: "Service", plural: "Services" },
  admin: {
    hideAPIURL: true,
    useAsTitle: "name",
    defaultColumns: ["name", "order", "published"],
    group: "Your Website",
    description: "One page for each thing you do. Click a service to change its photos.",
    pagination: { defaultLimit: 20 },
  },
  access: { read: () => true },
  defaultSort: "order",
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Photos",
          description: "This is the part you will use most.",
          fields: [
            {
              name: "hero",
              type: "upload",
              relationTo: "media",
              label: "Main photo",
              required: true,
              admin: { description: "The big photo at the top of the page, and on the home page card." },
            },
            {
              name: "gallery",
              type: "upload",
              relationTo: "media",
              label: "Gallery photos",
              hasMany: true,
              admin: {
                description:
                  "Your work for this service. Drag to reorder — the first one shows largest. These also fill the Work page automatically.",
              },
            },
          ],
        },
        {
          label: "Name & short text",
          fields: [
            { name: "name", type: "text", label: "Service name", required: true,
              admin: { description: "Example: Modular Kitchen" } },
            { name: "navLabel", type: "text", label: "Short name for the menu", required: true },
            { name: "tagline", type: "textarea", label: "One line under the title", required: true },
            { name: "summary", type: "textarea", label: "Two lines for the home page card", required: true },
            { name: "kicker", type: "text", label: "Small label above the title",
              admin: { description: "Optional. Example: Service 02" } },
            {
              name: "slug", type: "text", required: true, unique: true, index: true,
              hooks: { beforeValidate: [autoSlug("name")] },
              admin: { hidden: true },
            },
          ],
        },
        {
          label: "Page writing (optional)",
          description: "Already written for you. Only change this if you want to.",
          fields: [
            { name: "introHeading", type: "textarea", label: "Opening headline", required: true },
            {
              name: "introBody", type: "array", label: "Opening paragraphs",
              labels: { singular: "Paragraph", plural: "Paragraphs" }, required: true,
              fields: [{ name: "text", type: "textarea", label: "Paragraph", required: true }],
            },
            {
              name: "highlights", type: "array", label: "Three selling points", maxRows: 4,
              labels: { singular: "Point", plural: "Points" },
              fields: [
                { name: "title", type: "text", label: "Heading", required: true },
                { name: "body", type: "textarea", label: "Explanation", required: true },
              ],
            },
            {
              name: "offerings", type: "array", label: "What you take on",
              labels: { singular: "Item", plural: "Items" },
              fields: [{ name: "label", type: "text", label: "Item", required: true }],
            },
            {
              name: "materials", type: "array", label: "Materials you use",
              labels: { singular: "Material", plural: "Materials" },
              fields: [
                { name: "name", type: "text", label: "Material", required: true },
                { name: "note", type: "text", label: "Detail or brand", required: true },
              ],
            },
            { name: "priceNote", type: "textarea", label: "How you charge for this" },
            {
              name: "faqs", type: "array", label: "Questions about this service",
              labels: { singular: "Question", plural: "Questions" },
              fields: [
                { name: "question", type: "text", label: "Question", required: true },
                { name: "answer", type: "textarea", label: "Answer", required: true },
              ],
            },
          ],
        },
      ],
    },
    displayOrder,
    showOnWebsite,
  ],
};
