# MJ False Ceiling Interior

Marketing site for **MJ False Ceiling Interior**, Bengaluru.
Next.js (App Router) + TypeScript. No CSS framework — the design system is
plain CSS custom properties in `app/globals.css`.

```bash
npm install
npm run dev        # http://localhost:3100
npm run build
npm run typecheck
```

---

## Design concept

The business sells **false ceilings with cove lighting** — the product is
literally warm light emerging from a dark plane. So the site is deep charcoal
with brass light blooming out of it. Every competitor in this market runs a
white-and-orange template; this deliberately does not.

Tokens live at the top of `app/globals.css`:
`--void / --charcoal / --plaster / --stone / --brass / --lumen`.
Type is Cormorant Garamond (display) + Hanken Grotesk (UI), self-hosted via
`next/font`.

---

## Routes

| Route | Notes |
|---|---|
| `/` | Hero, trust bar, services, signature band, work, process, reviews, stats, FAQ, CTA |
| `/services` | All eight services |
| `/services/[slug]` | **Dedicated page per service** — 8 statically generated |
| `/work` | Projects + combined gallery reel |
| `/about` | Studio story |
| `/contact` | Phone, WhatsApp, email, studio, areas covered |

Each service page carries: cinematic hero, intro, three "what you get"
highlights, an offerings checklist, a materials table, how-it's-priced note,
an editorial gallery with lightbox, the process, service-specific FAQs with
`FAQPage` structured data, cross-links, and a CTA.

---

## Admin panel

Payload CMS runs inside this same Next.js app at **`/admin`**, backed by
Supabase Postgres, with uploads in Supabase Storage.

**Login:** the owner's email address. Create or reset it with:

```bash
OWNER_EMAIL="..." OWNER_PASSWORD="..." npm run set-owner
```

Afterwards change the password in the panel under your name → Account.

### Built for a non-technical owner

The panel is deliberately plain-English, because the person using it runs an
interior business, not a server:

- Collections are named for what they are — "Service Pages", "Completed Jobs",
  "Customer Reviews", "How We Work", "Photos", "Phone & Address".
- Every field has a plain description and a real example.
- URL slugs are generated from the title and hidden. They are kept on rename so
  links already shared with customers never break.
- `order` / `published` read as "Display order" / "Show on website".
- The developer-facing API buttons and GraphQL playground are hidden.
- A welcome panel on the dashboard explains the four common tasks in plain
  words, including how to change the password.

When adding fields, keep this standard: a plain `label`, a one-line
`admin.description` with an example, and nothing technical on screen.

| Collection | What it controls |
|---|---|
| Services | The 8 service pages, end to end |
| Projects | Work shown on the home and Work pages |
| Testimonials | Client reviews |
| Process steps | The "How we work" list |
| FAQs | Home-page questions |
| Images | Every photo on the site |
| Site settings | Brand, hero headline, the numbers |
| Contact details | Phone, WhatsApp, email, address, areas |

Nothing on the website is hardcoded — every photo, price note and phone number
is editable from `/admin`.

**Replacing a photo:** open it under Images, upload a new file, save. Every page
using it updates automatically, because pages reference the image record rather
than a URL.

**Caching.** Pages are statically generated for speed. `payload/hooks/revalidate.ts`
clears the cache for affected pages on every save, so edits appear within
seconds rather than waiting for a rebuild.

**Images** are served directly from Supabase Storage's public CDN
(`disablePayloadAccessControl` + `generateFileURL`), not proxied through the
Node server. Four sizes are generated on upload.

### Seeding

`/content/*.ts` is now **only** the seed source — the running site never reads
it. `npm run seed` wipes the tables, uploads every stock photo into Supabase
Storage as a real Media record, and recreates all rows. It is re-runnable.

### Gotchas already handled

- **Connection limits.** Supabase's free tier allows 15 session-mode clients.
  The pool is capped at 3 and the build at 3 workers, or prerendering exhausts
  the limit.
- **Session vs transaction pooler.** Payload/Drizzle uses prepared statements,
  which the transaction pooler (6543) does not support, so `DIRECT_URL` (5432)
  is used.
- **ESM.** `"type": "module"` is required by Payload 3; without it the config
  fails to load.
- After changing `payload.config.ts`, run `npm run payload generate:importmap`
  and `generate:types`.

---

## ⚠️ Before this goes to a live domain

**Verified from the client's Google Business Profile** — safe to publish:
name, phone `099864 36139`, rating `4.8`, review count `27`, Bengaluru,
opens 9 AM.

**Must be replaced or confirmed:**

1. **All photography is licensed stock**, flagged "Stock placeholder" in the
   Images library so it is easy to filter and replace. The client replaces
   these through `/admin` as their own project photos become available.
2. **Reviews are placeholder text.** Star ratings are real; the quotes are not.
   Every row is ticked "Placeholder text" and the website shows a visible
   warning while any row is ticked. Paste the actual Google review wording and
   untick. Publishing invented reviews beside a "verified" badge is false
   advertising.
3. **Contact details** — email, working hours, years active and projects
   delivered are plausible defaults, not facts. Confirm each in
   `/admin` → Settings.
4. **Street address** — the Google listing does not expose one; it is a
   placeholder in Contact details.
5. **`metadataBase`** in `app/(frontend)/layout.tsx` points at a guessed
   domain. Set it to the real one so OG images resolve.
6. **Database password** was shared in plain text during setup; reset it in
   Supabase before going live.

---

## Environment

`.env.local` (gitignored) needs:

```
DATABASE_URL              Supabase transaction pooler, 6543
DIRECT_URL                Supabase session pooler, 5432  (what Payload uses)
PAYLOAD_SECRET            long random string
NEXT_PUBLIC_SUPABASE_URL  https://<ref>.supabase.co
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
S3_ACCESS_KEY_ID          Storage -> S3 Access Keys
S3_SECRET_ACCESS_KEY
SMTP_USER                 owner's Gmail address
SMTP_PASS                 Gmail App Password (16 chars, no spaces)
NEXT_PUBLIC_SERVER_URL    public site address
```

**Email.** Password-reset mail goes out through the owner's own Gmail via an
App Password, so it arrives from his real address. Without `SMTP_USER` /
`SMTP_PASS`, Payload silently logs emails to the console instead and "Forgot
password" appears to work but sends nothing — so these must be set in every
environment, including production.

`NEXT_PUBLIC_SERVER_URL` must match the live domain once deployed, or the reset
links inside those emails will point at localhost.

Passwords containing `@ # / ? : %` must be percent-encoded in the URLs.

## Responsive

Audited at every width in Chrome's device list. No horizontal scroll, no broken
images and no console errors at any of them.

| Width | Devices | Layout |
|---|---|---|
| 344 | Galaxy Z Fold 5 (folded) | 1 column, reduced type |
| 360–440 | Galaxy S8+, iPhone SE/XR/12/14/15/16 Pro Max, Pixel 7–10 | 1 column, sticky call bar |
| 540 | Surface Duo | 1 column |
| 768–853 | iPad Mini, iPad Air, Surface Pro, Zenbook Fold | 2 columns, mobile nav |
| 1024–1280 | iPad Pro, Nest Hub, Nest Hub Max | 3 columns, desktop nav |
| 1920+ | Desktop | 4 columns |

Three things the audit caught and fixed:

- **Landscape phones (844x390).** A `100svh` hero pushed the call-to-action
  buttons below the fold. Short screens now collapse the hero to its natural
  height and tighten the type, so the buttons clear the sticky bar.
- **Carousel dots were 6x6px** — impossible to hit with a thumb. The visible dot
  is unchanged but the button is now a 32x44 tap target.
- **Burger menu was 41x31.** Now 44x44, the minimum reliable touch size.

When adding UI, check it at 344px and at 844x390 — those two catch nearly
everything.

## Still to do

- Deploy to Vercel (set the same env vars there).
- Supabase free projects pause after 7 days idle — the static pages keep
  serving but `/admin` and rebuilds fail. Pro is needed for a live client site.
- Replace stock photos and placeholder reviews with real ones.

---

## Repo note

`git remote origin` still points at `YashasRgowda/interior-design_1`, the
template this was cloned from. Repoint it before pushing.

The original template is preserved at `reference/serai-original.html`.
