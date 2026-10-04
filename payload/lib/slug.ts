import type { FieldHook } from "payload";

/**
 * Web addresses are generated automatically from the title, so the owner never
 * has to think about them. Once set, the address is kept even if the title is
 * edited later — changing it would break links already shared with customers.
 */
export const autoSlug =
  (sourceField: string): FieldHook =>
  ({ data, value, operation }) => {
    if (value) return value;
    if (operation !== "create") return value;

    const source = data?.[sourceField];
    if (typeof source !== "string") return value;

    return source
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

/** Standard "Show on website" toggle. */
export const showOnWebsite = {
  name: "published",
  type: "checkbox" as const,
  label: "Show on website",
  defaultValue: true,
  admin: {
    position: "sidebar" as const,
    description: "Untick to hide this from the website without deleting it.",
  },
};

/** Standard ordering field. */
export const displayOrder = {
  name: "order",
  type: "number" as const,
  label: "Display order",
  required: true,
  defaultValue: 99,
  admin: {
    position: "sidebar" as const,
    description: "Lower numbers appear first. 1 shows at the top.",
  },
};
