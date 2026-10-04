import type { CollectionConfig } from "payload";
import { revalidateShared, revalidateSharedOnDelete } from "../hooks/revalidate";
import { autoSlug, displayOrder, showOnWebsite } from "../lib/slug";

export const Projects: CollectionConfig = {
  hooks: { afterChange: [revalidateShared], afterDelete: [revalidateSharedOnDelete] },
  slug: "projects",
  labels: { singular: "Completed Job", plural: "Completed Jobs" },
  admin: {
    // Superseded: the Work page now builds itself from the service galleries,
    // so there is nothing here for the owner to maintain.
    hidden: true,
    hideAPIURL: true,
    useAsTitle: "title",
    defaultColumns: ["title", "locationLabel", "year", "published"],
    group: "Your Website",
    description: "Jobs you have finished. These appear on the home page and the Work page.",
  },
  access: { read: () => true },
  defaultSort: "order",
  fields: [
    { name: "title", type: "text", label: "Job name", required: true,
      admin: { description: 'For example: Stepped Ceiling, Whitefield' } },
    { name: "cover", type: "upload", relationTo: "media", label: "Photo", required: true },
    { name: "locationLabel", type: "text", label: "Where and what", required: true,
      admin: { description: 'For example: 3 BHK · Whitefield' } },
    { name: "year", type: "text", label: "Year finished", required: true },
    { name: "caption", type: "textarea", label: "Short description", required: true,
      admin: { description: "One or two lines about what you did." } },
    { name: "services", type: "relationship", relationTo: "services", hasMany: true,
      label: "Services used",
      admin: { description: "Optional. Which of your services this job involved." } },
    {
      name: "layout", type: "select", label: "Size on the page", required: true,
      defaultValue: "standard",
      options: [
        { label: "Large (full width)", value: "wide" },
        { label: "Small (half width)", value: "standard" },
      ],
      admin: { position: "sidebar" },
    },
    { name: "slug", type: "text", required: true, unique: true, index: true,
      hooks: { beforeValidate: [autoSlug("title")] }, admin: { hidden: true } },
    displayOrder,
    showOnWebsite,
  ],
};
