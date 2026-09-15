"use client";

import { useEffect } from "react";

const revealSelector = "[data-scroll-reveal]";

function show(elements: readonly HTMLElement[]) {
  for (const element of elements) {
    element.dataset.scrollRevealState = "visible";
  }
}

export function HomepageScrollReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(revealSelector));

    if (elements.length === 0) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      show(elements);
      return;
    }

    for (const element of elements) {
      element.dataset.scrollRevealState = "waiting";
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          (entry.target as HTMLElement).dataset.scrollRevealState = "visible";
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.12,
      },
    );

    for (const element of elements) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
