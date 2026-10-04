/**
 * Plain-English guide on the dashboard.
 * Four coloured cards, matching the four items in the sidebar.
 */
const CARDS = [
  {
    href: "/admin/globals/site-settings",
    color: "#E0B252",
    title: "Home Page",
    body: "The big photo, the headline, your star rating and your customer reviews.",
  },
  {
    href: "/admin/collections/services",
    color: "#6FB3A0",
    title: "Services",
    body: "One page for each thing you do. Change the photos for False Ceiling, Kitchen, Bedroom and the rest.",
  },
  {
    href: "/admin/globals/about-page",
    color: "#C88FB0",
    title: "About Page",
    body: "Your photo and a few lines about your business.",
  },
  {
    href: "/admin/globals/contact-settings",
    color: "#7FA7D9",
    title: "Contact Page",
    body: "Phone number, WhatsApp, address and the areas you cover.",
  },
];

export default function Welcome() {
  return (
    <div style={{ marginBottom: 30 }}>
      <h2 style={{ margin: "0 0 4px", fontSize: 24 }}>Welcome 👋</h2>
      <p style={{ margin: "0 0 22px", opacity: 0.75, fontSize: 15, lineHeight: 1.6 }}>
        There are four pages you can change. Click one to open it.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 14,
        }}
      >
        {CARDS.map((card) => (
          <a
            key={card.href}
            href={card.href}
            style={{
              display: "block",
              padding: "18px 20px",
              borderRadius: 8,
              textDecoration: "none",
              color: "inherit",
              background: "var(--theme-elevation-50)",
              border: "1px solid var(--theme-elevation-150)",
              borderLeft: `4px solid ${card.color}`,
            }}
          >
            <strong style={{ fontSize: 17, display: "block", marginBottom: 6 }}>
              {card.title}
            </strong>
            <span style={{ fontSize: 13.5, lineHeight: 1.55, opacity: 0.75 }}>{card.body}</span>
          </a>
        ))}
      </div>

      <div
        style={{
          marginTop: 22,
          padding: "16px 20px",
          borderRadius: 8,
          background: "var(--theme-elevation-50)",
          border: "1px solid var(--theme-elevation-150)",
          fontSize: 14,
          lineHeight: 1.7,
        }}
      >
        <strong>To change any photo:</strong> open the page it is on, click the photo, press{" "}
        <b>Upload</b>, choose a photo from your phone or computer, then press <b>Save</b>.
        <br />
        <strong>Your Work page</strong> fills itself from the photos you add to each service — there
        is nothing to update there.
        <br />
        <strong>To change your password:</strong> click your name in the top-right corner, then{" "}
        <b>Account</b>.
        <br />
        <span style={{ opacity: 0.65 }}>
          Nothing here can break the website. Every change can be undone by saving the old text again.
        </span>
      </div>
    </div>
  );
}
