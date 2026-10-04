"use client";

import { useEffect, useRef } from "react";

/**
 * Film grain, vignette and the cursor spotlight.
 * Pure decoration — every piece is pointer-events:none and skipped entirely
 * for reduced-motion users and touch devices.
 */
export function Atmosphere() {
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover: hover)").matches;
    const spot = spotRef.current;
    if (reduce || !canHover || !spot) return;

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;
    let frame = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      document.body.classList.add("lit");
    };

    const loop = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      spot.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    frame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
      document.body.classList.remove("lit");
    };
  }, []);

  return (
    <>
      <svg className="grain" aria-hidden="true">
        <filter id="grainFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grainFilter)" />
      </svg>
      <div className="vignette" aria-hidden="true" />
      <div className="spotlight" ref={spotRef} aria-hidden="true" />
    </>
  );
}
