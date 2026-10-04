import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Login", plural: "Logins" },
  auth: true,
  admin: {
    hidden: true,
    hideAPIURL: true,
    useAsTitle: "email",
    group: "Settings",
    description:
      "People who can log in and edit this website. To change your own password, click your name in the top-right corner and choose Account.",
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [{ name: "name", type: "text", label: "Name", required: true }],
};
