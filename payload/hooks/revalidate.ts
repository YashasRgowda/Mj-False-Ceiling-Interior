import { revalidatePath } from "next/cache";
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from "payload";

/**
 * The website is statically generated for speed, which means an edit in the
 * admin panel would not appear until the next build. These hooks clear the
 * cache for the affected pages the moment something is saved, so the client
 * sees their change within seconds.
 */
function purge(paths: string[]) {
  for (const p of paths) {
    try {
      revalidatePath(p);
    } catch {
      // revalidatePath needs a request context; ignore when seeding from CLI.
    }
  }
}

/** Anything that appears on more than one page. */
const SHARED = ["/", "/services", "/work", "/about", "/contact"];

export const revalidateShared: CollectionAfterChangeHook = ({ doc }) => {
  purge(SHARED);
  return doc;
};

export const revalidateSharedOnDelete: CollectionAfterDeleteHook = ({ doc }) => {
  purge(SHARED);
  return doc;
};

export const revalidateGlobal: GlobalAfterChangeHook = ({ doc }) => {
  purge(SHARED);
  return doc;
};

/** Services additionally own their own detail page. */
export const revalidateService: CollectionAfterChangeHook = ({ doc, previousDoc }) => {
  const paths = [...SHARED, `/services/${doc.slug}`];
  // If the slug changed, clear the old address too.
  if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
    paths.push(`/services/${previousDoc.slug}`);
  }
  purge(paths);
  return doc;
};

export const revalidateServiceOnDelete: CollectionAfterDeleteHook = ({ doc }) => {
  purge([...SHARED, `/services/${doc?.slug}`]);
  return doc;
};
