import Link from "next/link";

export default function NotFound() {
  return (
    <section
      className="section"
      style={{ paddingTop: "calc(var(--nav-h) + 90px)", textAlign: "center" }}
    >
      <div className="container">
        <div className="eyebrow" style={{ marginBottom: 20 }}>
          404
        </div>
        <h1 className="h-display" style={{ fontSize: "clamp(38px,6vw,86px)" }}>
          That page isn&rsquo;t <em>here.</em>
        </h1>
        <p className="lede" style={{ margin: "24px auto 0", maxWidth: "44ch" }}>
          It may have moved, or the link may be wrong.
        </p>
        <div style={{ marginTop: 36, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="btn btn-primary">
            Back to home
          </Link>
          <Link href="/services" className="btn btn-ghost">
            Browse services
          </Link>
        </div>
      </div>
    </section>
  );
}
