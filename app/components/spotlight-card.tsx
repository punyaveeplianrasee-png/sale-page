"use client";

import { useEffect, type ComponentPropsWithoutRef } from "react";

export function SpotlightEffects() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    function moveLight(event: PointerEvent) {
      if (event.pointerType === "touch" || reduced.matches) return;
      const card = event.target instanceof Element
        ? event.target.closest<HTMLElement>(".spotlight-card") : null;
      if (!card) return;
      const bounds = card.getBoundingClientRect();
      card.style.setProperty("--spot-x", `${event.clientX - bounds.left}px`);
      card.style.setProperty("--spot-y", `${event.clientY - bounds.top}px`);
    }
    document.addEventListener("pointermove", moveLight, { passive: true });
    return () => document.removeEventListener("pointermove", moveLight);
  }, []);
  return null;
}

export function SpotlightCard({ className = "", children, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div {...props} className={`spotlight-card ${className}`}>{children}</div>;
}
