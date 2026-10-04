/** Wordmark shown on the login screen, in place of the Payload logo. */
export function Logo() {
  return (
    <div style={{ textAlign: "center", lineHeight: 1.2 }}>
      <div
        style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: 44,
          letterSpacing: "0.12em",
          color: "#DCBA7D",
        }}
      >
        MJ
      </div>
      <div
        style={{
          fontSize: 11,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          marginTop: 6,
          opacity: 0.7,
        }}
      >
        False Ceiling &amp; Interior
      </div>
      <div style={{ fontSize: 13, marginTop: 18, opacity: 0.6 }}>
        Sign in to edit your website
      </div>
    </div>
  );
}

/** Small mark shown in the top-left of the panel. */
export function Icon() {
  return (
    <span
      style={{
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: 19,
        letterSpacing: "0.08em",
        color: "#DCBA7D",
      }}
    >
      MJ
    </span>
  );
}
