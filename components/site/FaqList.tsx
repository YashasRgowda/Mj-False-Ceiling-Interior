"use client";

import { useId, useState } from "react";
import type { Faq } from "@/lib/types";

export function FaqList({ items, dark = false }: { items: Faq[]; dark?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className={dark ? "faq-dark" : undefined}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;

        return (
          <div key={item.question} className={isOpen ? "faq-item open" : "faq-item"}>
            <h3>
              <button
                type="button"
                id={buttonId}
                className="faq-q"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                {item.question}
                <span className="faq-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </button>
            </h3>
            <div className="faq-a" id={panelId} role="region" aria-labelledby={buttonId}>
              <div className="faq-a-inner">
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
