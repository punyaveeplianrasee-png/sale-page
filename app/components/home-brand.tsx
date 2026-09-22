"use client";

import Link from "next/link";
import { Mark } from "./art";

export function HomeBrand() {
  return (
    <Link
      href="/#page-top"
      className="brand"
      aria-label="Trade The Future กลับด้านบนสุดของหน้าแรก"
      onClick={(event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (window.location.pathname !== "/") return;
        event.preventDefault();
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
        });
      }}
    >
      <Mark /><span>TRADE<br /><b>THE FUTURE</b></span>
    </Link>
  );
}
