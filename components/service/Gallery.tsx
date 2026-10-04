"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Media } from "@/lib/types";

export function Gallery({ images, label }: { images: Media[]; label: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const isOpen = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (delta: number) =>
      setIndex((current) =>
        current === null ? null : (current + delta + images.length) % images.length
      ),
    [images.length]
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close, step]);

  const active = index === null ? null : images[index];

  return (
    <>
      <div className="gallery">
        {images.map((image, i) => (
          <button
            key={image.src + i}
            type="button"
            className="gitem"
            data-reveal
            data-reveal-delay={(i % 3) * 70}
            onClick={() => setIndex(i)}
            aria-label={`View larger: ${image.alt}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 900px) 100vw, (max-width: 1400px) 50vw, 700px"
            />
          </button>
        ))}
      </div>

      {active && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${label} gallery`}
          onClick={close}
        >
          <button type="button" className="lb-close" onClick={close} aria-label="Close gallery">
            <svg viewBox="0 0 24 24">
              <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
            </svg>
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                className="lb-arrow prev"
                aria-label="Previous image"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
              >
                <svg viewBox="0 0 24 24">
                  <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                className="lb-arrow next"
                aria-label="Next image"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
              >
                <svg viewBox="0 0 24 24">
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          )}

          <figure onClick={(e) => e.stopPropagation()}>
            {/* Unoptimised here on purpose: the lightbox wants the full-resolution
                frame, not a layout-sized crop. */}
            <img src={active.src} alt={active.alt} />
            <figcaption>
              {active.alt} &middot; {(index ?? 0) + 1} / {images.length}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
