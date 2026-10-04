"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, PhoneIcon } from "./Icons";

export type NavService = { slug: string; name: string; summary: string };
export type NavBrand = { lead: string; rest: string; businessName: string };
export type NavContact = { phoneDisplay: string; phoneHref: string };

const primaryLinks = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function NavClient({
  brand,
  services,
  contact,
}: {
  brand: NavBrand;
  services: NavService[];
  contact: NavContact;
}) {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<number | undefined>(undefined);

  /* solid header past the fold */
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* lock the page behind the mobile menu */
  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    document.documentElement.classList.toggle("menu-open", menuOpen);
    return () => {
      document.body.classList.remove("menu-open");
      document.documentElement.classList.remove("menu-open");
    };
  }, [menuOpen]);

  /* any navigation closes everything */
  const closeAll = useCallback(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, []);
  useEffect(() => {
    closeAll();
  }, [pathname, closeAll]);

  /* escape, outside click, and resize back to desktop */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    const onClick = (e: MouseEvent) => {
      if (itemRef.current && !itemRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    const mq = window.matchMedia("(min-width: 901px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false);
    };

    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    mq.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
      mq.removeEventListener("change", onChange);
    };
  }, [closeAll]);

  /* hover intent on desktop only */
  const canHover = () =>
    typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

  const openOnHover = () => {
    if (!canHover()) return;
    window.clearTimeout(hoverTimer.current);
    setServicesOpen(true);
  };
  const closeOnHover = () => {
    if (!canHover()) return;
    hoverTimer.current = window.setTimeout(() => setServicesOpen(false), 140);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className={solid ? "nav solid" : "nav"}>
      <Link href="/" className="wordmark" aria-label={`${brand.businessName} — home`}>
        <span className="mark">{brand.lead}</span>
        <span className="sub">{brand.rest}</span>
      </Link>

      <nav
        id="primary-navigation"
        className={menuOpen ? "nav-links open" : "nav-links"}
        aria-label="Primary"
      >
        <div
          className="nav-item"
          ref={itemRef}
          data-open={servicesOpen ? "true" : "false"}
          onMouseEnter={openOnHover}
          onMouseLeave={closeOnHover}
        >
          <button
            type="button"
            className="nav-link"
            aria-expanded={servicesOpen}
            aria-controls="services-menu"
            data-active={isActive("/services") ? "true" : "false"}
            onClick={() => setServicesOpen((v) => !v)}
          >
            Services <ChevronDown className="chev" />
          </button>

          <div className="mega" id="services-menu">
            {services.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className="mega-link">
                <span className="t">{service.name}</span>
                <span className="d">{service.summary}</span>
              </Link>
            ))}
            <div className="mega-foot">
              <span>Every service, one team, one warranty.</span>
              <Link href="/services">All services &#8594;</Link>
            </div>
          </div>
        </div>

        {primaryLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="nav-link"
            data-active={isActive(link.href) ? "true" : "false"}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <a className="nav-phone" href={contact.phoneHref}>
        <PhoneIcon />
        {contact.phoneDisplay}
      </a>

      <button
        type="button"
        className="burger"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  );
}
