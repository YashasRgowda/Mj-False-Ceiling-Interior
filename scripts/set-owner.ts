/**
 * Creates the owner's login and removes every other account.
 *
 * Credentials come from the environment so nothing sensitive lives in the repo:
 *   OWNER_EMAIL="..." OWNER_PASSWORD="..." npm run set-owner
 */
import { getPayload } from "payload";
import config from "../payload.config.js";

const EMAIL = process.env.OWNER_EMAIL;
const PASSWORD = process.env.OWNER_PASSWORD;

if (!EMAIL || !PASSWORD) {
  console.error(
    "Set OWNER_EMAIL and OWNER_PASSWORD, e.g.\n" +
      '  OWNER_EMAIL="you@example.com" OWNER_PASSWORD="..." npm run set-owner'
  );
  process.exit(1);
}

const run = async () => {
  const payload = await getPayload({ config });

  const existing = await payload.find({
    collection: "users",
    where: { email: { equals: EMAIL } },
    limit: 1,
  });

  if (existing.totalDocs === 0) {
    await payload.create({
      collection: "users",
      data: { email: EMAIL, password: PASSWORD, name: "Javed" },
    });
    console.log(`Created owner login: ${EMAIL}`);
  } else {
    await payload.update({
      collection: "users",
      id: existing.docs[0].id,
      data: { password: PASSWORD, name: "Javed" },
    });
    console.log(`Updated owner login: ${EMAIL}`);
  }

  const others = await payload.find({
    collection: "users",
    where: { email: { not_equals: EMAIL } },
    limit: 100,
  });
  for (const u of others.docs) {
    await payload.delete({ collection: "users", id: u.id });
    console.log(`Removed old login: ${u.email}`);
  }

  const all = await payload.find({ collection: "users", limit: 100 });
  console.log(`\nLogins now: ${all.docs.map((u) => u.email).join(", ")}`);
  process.exit(0);
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
