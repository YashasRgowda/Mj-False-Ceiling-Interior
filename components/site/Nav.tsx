import { getContact, getServices, getSiteSettings } from "@/lib/data";
import { NavClient } from "./NavClient";

/** Server wrapper: pulls the menu and phone number from the database. */
export async function Nav() {
  const [settings, services, contact] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getContact(),
  ]);

  return (
    <NavClient
      brand={{
        lead: settings.wordmarkLead,
        rest: settings.wordmarkRest,
        businessName: settings.businessName,
      }}
      services={services.map((s) => ({
        slug: s.slug,
        name: s.name,
        summary: s.summary,
      }))}
      contact={{ phoneDisplay: contact.phoneDisplay, phoneHref: contact.phoneHref }}
    />
  );
}
