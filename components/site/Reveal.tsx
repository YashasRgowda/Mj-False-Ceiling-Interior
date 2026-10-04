"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * One IntersectionObserver for the whole page.
 * Any element carrying `data-reveal` gets `.in` when it scrolls into view.
 *
 * This lives in the root layout, which does NOT remount between routes, so the
 * effect MUST re-run on every pathname change. Without that, a client-side
 * navigation renders a page whose `[data-reveal]` elements are never observed
 * and therefore stay at opacity:0 — a blank page.
 */
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reveal = (el: HTMLElement) => el.classList.add("in");

    const collect = () =>
      Array.from(
        document.querySelectorAll<HTMLElement>("[data-reveal]:not(.in)")
      );

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      collect().forEach(reveal);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const delay = Number(el.dataset.revealDelay ?? 0);
          window.setTimeout(() => reveal(el), delay);
          io.unobserve(el);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );

    // Observe after paint so the new route's DOM is laid out and measurable.
    const raf = requestAnimationFrame(() => collect().forEach((el) => io.observe(el)));

    /* Safety net: a blank page is far worse than an early fade-in. If anything
       is still hidden while sitting inside the viewport, just show it. */
    const sweep = window.setTimeout(() => {
      collect().forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) reveal(el);
      });
    }, 1600);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(sweep);
      io.disconnect();
    };
  }, [pathname]);

  return null;
}
