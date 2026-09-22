"use client";

import { useEffect } from "react";

export function LegacyAnchors() {
  useEffect(() => {
    const redirect = () => {
      if (["#quiz", "#calculator", "#tools"].includes(window.location.hash)) {
        window.location.replace(`/explore${window.location.hash}`);
      }
    };
    redirect();
    window.addEventListener("hashchange", redirect);
    return () => window.removeEventListener("hashchange", redirect);
  }, []);
  return null;
}
