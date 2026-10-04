import type { GlobalConfig } from "payload";
import { revalidateGlobal } from "../hooks/revalidate";

/**
 * The home page, top to bottom.
 *
 * Reviews and questions live here as simple lists rather than separate
 * collections — the owner wanted four things in the sidebar, not nine.
 */
export const SiteSettings: GlobalConfig = {
  hooks: { afterChange: [revalidateGlobal] },
  slug: "site-settings",
  label: "Home Page",
  admin: {
    hideAPIURL: true,
    group: "Your Website",
    description: "The first page people see. Change the big photo, the headline and your numbers.",
  },
  access: { read: () => true },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Big photo & headline",
          fields: [
            {
              name: "heroImage",
              type: "upload",
              relationTo: "media",
              label: "Big photo at the top",
              required: true,
              admin: { description: "Click it, choose one of your photos, press Save." },
            },
            { name: "heroLine1", type: "text", label: "Headline, first line", required: true },
            {
              name: "heroLine2",
              type: "text",
              label: "Headline, second line",
              required: true,
              admin: { description: "Put *stars* around a word to make it gold. Example: with *light.*" },
            },
            { name: "heroSub", type: "textarea", label: "Small text under the headline", required: true },
          ],
        },
        {
          label: "Middle photo",
          fields: [
            {
              name: "signatureImage",
              type: "upload",
              relationTo: "media",
              label: "Large photo in the middle of the page",
              required: true,
            },
            {
              name: "signatureQuote",
              type: "textarea",
              label: "Words shown over that photo",
              required: true,
              admin: { description: "Put *stars* around a word to make it gold." },
            },
          ],
        },
        {
          label: "Your numbers",
          fields: [
            { name: "rating", type: "number", label: "Google star rating", required: true },
            { name: "reviewCount", type: "number", label: "How many Google reviews", required: true },
            { name: "yearsActive", type: "text", label: "Years in business", required: true,
              admin: { description: 'Just the number. Shows as "10+ years".' } },
            { name: "projectsDelivered", type: "text", label: "Jobs completed", required: true,
              admin: { description: 'Just the number. Shows as "450+".' } },
            { name: "studioLead", type: "textarea", label: "One line above the numbers", required: true },
          ],
        },
        {
          label: "Reviews",
          description: "Copy the exact words from your Google reviews. Do not write your own.",
          fields: [
            {
              name: "reviews",
              type: "array",
              label: "Customer reviews",
              labels: { singular: "Review", plural: "Reviews" },
              fields: [
                { name: "quote", type: "textarea", label: "What they wrote", required: true },
                { name: "author", type: "text", label: "Their name", required: true },
                { name: "context", type: "text", label: "Job and area",
                  admin: { description: "Example: 3 BHK, Whitefield" } },
                { name: "rating", type: "number", label: "Stars", required: true, min: 1, max: 5, defaultValue: 5 },
                {
                  name: "isPlaceholder", type: "checkbox", label: "Example text, not a real review",
                  defaultValue: true,
                  admin: { description: "A warning shows on your website while this is ticked." },
                },
              ],
            },
          ],
        },
        {
          label: "Questions",
          description: "Questions customers ask, shown near the bottom of the home page.",
          fields: [
            {
              name: "questions",
              type: "array",
              label: "Questions and answers",
              labels: { singular: "Question", plural: "Questions" },
              fields: [
                { name: "question", type: "text", label: "Question", required: true },
                { name: "answer", type: "textarea", label: "Answer", required: true },
              ],
            },
          ],
        },
        {
          label: "Business name",
          description: "Rarely needs changing.",
          fields: [
            { name: "businessName", type: "text", label: "Full business name", required: true },
            { name: "shortName", type: "text", label: "Short name", required: true },
            { name: "wordmarkLead", type: "text", label: "Logo, big letters", required: true },
            { name: "wordmarkRest", type: "text", label: "Logo, small letters", required: true },
            { name: "city", type: "text", label: "City", required: true },
            { name: "state", type: "text", label: "State", required: true },
            { name: "metaDescription", type: "textarea", label: "Description shown in Google", required: true },
          ],
        },
      ],
    },
  ],
};
