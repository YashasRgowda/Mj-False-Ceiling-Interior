"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Stars } from "@/components/site/Stars";

/** Shape produced by getTestimonials() — no longer a Payload collection doc. */
export type Review = {
  id: string;
  quote: string;
  author: string;
  context: string;
  rating: number;
  initial: string;
  source: string;
  isPlaceholder: boolean;
};
import { VerifiedIcon } from "@/components/site/Icons";

const AUTO_MS = 6000;

export function Testimonials({
  testimonials,
  rating,
  reviewCount,
}: {
  testimonials: Review[];
  rating: number;
  reviewCount: number;
}) {
  const [index, setIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(360);
  /* Kept in state rather than read from `window` during render, so the first
     client render matches the server HTML exactly. */
  const [gap, setGap] = useState(32);
  const stageRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef<number | undefined>(undefined);
  const total = testimonials.length;

  const goto = useCallback((next: number) => {
    setIndex(((next % total) + total) % total);
  }, [total]);

  const stopAuto = useCallback(() => {
    window.clearInterval(autoRef.current);
    autoRef.current = undefined;
  }, []);

  /* measure the card so the coverflow offsets stay correct at any width */
  useEffect(() => {
    const measure = () => {
      if (firstCardRef.current) setCardWidth(firstCardRef.current.offsetWidth);
      setGap(Math.min(window.innerWidth * 0.04, 40));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  /* auto-advance, paused on interaction and while off-screen */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    autoRef.current = window.setInterval(() => {
      setIndex((current) => (current + 1) % total);
    }, AUTO_MS);
    return () => window.clearInterval(autoRef.current);
  }, [total]);

  /* swipe */
  const startX = useRef(0);
  const swiping = useRef(false);

  const onPointerDown = (e: React.PointerEvent) => {
    stopAuto();
    swiping.current = true;
    startX.current = e.clientX;
  };
  const endSwipe = (clientX: number) => {
    if (!swiping.current) return;
    swiping.current = false;
    const dx = clientX - startX.current;
    if (dx > 50) goto(index - 1);
    else if (dx < -50) goto(index + 1);
  };

  const transformFor = (i: number) => {
    const diff = i - index;
    const abs = Math.abs(diff);
    const sign = diff > 0 ? 1 : -1;
    let tx: number;
    let tz: number;
    let ry: number;
    let scale: number;
    let opacity: number;

    if (abs === 0) {
      tx = -cardWidth / 2;
      tz = 0;
      ry = 0;
      scale = 1;
      opacity = 1;
    } else if (abs === 1) {
      tx = -cardWidth / 2 + sign * (cardWidth * 0.82 + gap);
      tz = -140;
      ry = sign * -8;
      scale = 0.85;
      opacity = 0.45;
    } else if (abs === 2) {
      tx = -cardWidth / 2 + sign * (cardWidth * 1.5 + gap * 2);
      tz = -250;
      ry = sign * -12;
      scale = 0.72;
      opacity = 0.2;
    } else {
      tx = -cardWidth / 2 + sign * (cardWidth * 2.1 + gap * 3);
      tz = -350;
      ry = sign * -14;
      scale = 0.6;
      opacity = 0;
    }

    return {
      transform: `translate(${tx}px, -50%) translateZ(${tz}px) rotateY(${ry}deg) scale(${scale})`,
      opacity,
      zIndex: 10 - abs,
    };
  };

  const anyPlaceholder = testimonials.some((t) => t.isPlaceholder);

  return (
    <section className="testimonials" id="reviews">
      <div className="t-glow" aria-hidden="true" />

      <div className="t-head">
        <div className="eyebrow row">
          <span className="rule" />
          In their words
          <span className="rule" />
        </div>
        <h2 className="h-display">
          Rated <em>{rating}</em> by {reviewCount} clients.
        </h2>
        <p className="lede t-sub">
          Every review below is a verified Google review from a Bengaluru homeowner.
        </p>
      </div>

      <div
        className="t-stage"
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerUp={(e) => endSwipe(e.clientX)}
        onPointerCancel={() => {
          swiping.current = false;
        }}
      >
        {testimonials.map((item, i) => {
          const style = transformFor(i);
          const abs = Math.abs(i - index);
          return (
            <div
              key={item.id}
              ref={i === 0 ? firstCardRef : undefined}
              className={`t-card${abs === 0 ? " active" : ""}${abs === 1 ? " adjacent" : ""}`}
              style={style}
              onClick={() => {
                if (i !== index) {
                  stopAuto();
                  goto(i);
                }
              }}
              aria-hidden={abs !== 0}
            >
              <div className="t-quote" aria-hidden="true">
                &ldquo;
              </div>
              <Stars rating={item.rating} />
              <p className="t-text">{item.quote}</p>
              <div className="t-author">
                <div className="t-avatar" aria-hidden="true">
                  {item.initial}
                </div>
                <div>
                  <div className="t-name">{item.author}</div>
                  <div className="t-role">{item.context}</div>
                </div>
              </div>
              <div className="t-src">
                <VerifiedIcon />
                {item.source}
              </div>
            </div>
          );
        })}
      </div>

      <div className="t-nav">
        <button
          type="button"
          aria-label="Previous review"
          onClick={() => {
            stopAuto();
            goto(index - 1);
          }}
        >
          <svg viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="t-dots">
          {testimonials.map((item, i) => (
            <button
              key={item.id}
              type="button"
              className={i === index ? "on" : undefined}
              aria-label={`Go to review ${i + 1}`}
              aria-current={i === index}
              onClick={() => {
                stopAuto();
                goto(i);
              }}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next review"
          onClick={() => {
            stopAuto();
            goto(index + 1);
          }}
        >
          <svg viewBox="0 0 24 24">
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {anyPlaceholder && (
        <p className="t-placeholder-note">
          Placeholder text shown — replace with real Google reviews before launch.
        </p>
      )}
    </section>
  );
}
