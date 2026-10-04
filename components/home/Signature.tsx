"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Media } from "@/lib/types";

/** Splits the quote into lines that mask-reveal one after another. */
function toLines(quote: string) {
  const words = quote.split(/\s+/);
  const perLine = Math.ceil(words.length / 4);
  return Array.from({ length: 4 }, (_, i) =>
    words.slice(i * perLine, (i + 1) * perLine).join(" ")
  ).filter(Boolean);
}

function renderEmphasis(line: string) {
  return line.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") && part.length > 2 ? (
      <em key={i}>{part.slice(1, -1)}</em>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export function Signature({ quote, image }: { quote: string; image: Media }) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const lines = toLines(quote);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className={inView ? "signature in" : "signature"} ref={ref}>
      <div className="signature-bg">
        {image.src && <Image src={image.src} alt={image.alt} fill sizes="100vw" />}
      </div>

      <div className="signature-inner container">
        <div className="eyebrow row">
          <span className="rule" />
          Our standard
        </div>
        <p className="big">
          {lines.map((line, i) => (
            <span className="line" key={i}>
              <span>{renderEmphasis(line)}</span>
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
