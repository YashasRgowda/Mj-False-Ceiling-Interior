import type { GlobalConfig } from "payload";
import { revalidateGlobal } from "../hooks/revalidate";

export const ContactSettings: GlobalConfig = {
  hooks: { afterChange: [revalidateGlobal] },
  slug: "contact-settings",
  label: "Contact Page",
  admin: {
    hideAPIURL: true,
    group: "Your Website",
    description: "Your phone number, WhatsApp, address and the areas you cover.",
  },
  access: { read: () => true },
  fields: [
    { name: "phoneDisplay", type: "text", label: "Phone number", required: true,
      admin: { description: "How it looks on the website. Example: 099864 36139" } },
    { name: "phoneE164", type: "text", label: "Phone number for the Call button", required: true,
      admin: { description: "Must start with +91. Example: +919986436139" } },
    { name: "email", type: "email", label: "Email address", required: true },
    { name: "hours", type: "text", label: "Working hours", required: true },
    { name: "googleMapsUrl", type: "text", label: "Google Maps link", required: true,
      admin: { description: "Open your business on Google Maps, press Share, paste the link." } },
    {
      name: "addressLines", type: "array", label: "Your address",
      labels: { singular: "Line", plural: "Lines" },
      fields: [{ name: "line", type: "text", label: "Line", required: true }],
    },
    {
      name: "serviceAreas", type: "array", label: "Areas you cover",
      labels: { singular: "Area", plural: "Areas" },
      admin: { description: "Helps people in those areas find you on Google." },
      fields: [{ name: "area", type: "text", label: "Area", required: true }],
    },
    {
      name: "social", type: "group", label: "Social media (optional)",
      fields: [
        { name: "instagram", type: "text", label: "Instagram link" },
        { name: "facebook", type: "text", label: "Facebook link" },
        { name: "youtube", type: "text", label: "YouTube link" },
      ],
    },
  ],
};
