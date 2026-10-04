"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Explicit "Home" link at the top of the sidebar.
 *
 * Payload only lets you return to the dashboard by clicking the small logo,
 * which is not discoverable for a non-technical user. This gives them an
 * obvious way back to the welcome instructions.
 */
export default function NavHome() {
  const pathname = usePathname();
  const isActive = pathname === "/admin" || pathname === "/admin/";

  return (
    <div style={{ marginBottom: 14, paddingBottom: 14, borderBottom: "1px solid var(--theme-elevation-100)" }}>
      <Link
        href="/admin"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "8px 0",
          textDecoration: "none",
          color: isActive ? "var(--theme-text)" : "var(--theme-elevation-700)",
          fontWeight: isActive ? 600 : 400,
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9.5V21h14V9.5" />
        </svg>
        Home &amp; help
      </Link>
    </div>
  );
}
