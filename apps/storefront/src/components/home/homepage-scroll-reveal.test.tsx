import { render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { HomepageScrollReveal } from "@/components/home/homepage-scroll-reveal";

describe("HomepageScrollReveal", () => {
  it("leaves content visible for people who prefer reduced motion", async () => {
    render(
      <>
        <HomepageScrollReveal />
        <section data-scroll-reveal>Content</section>
      </>,
    );

    await waitFor(() => {
      expect(document.querySelector("[data-scroll-reveal]")).toHaveAttribute(
        "data-scroll-reveal-state",
        "visible",
      );
    });
  });

  it("reveals observed content once it enters the viewport", async () => {
    const observed: Element[] = [];
    const unobserved: Element[] = [];
    let callback: IntersectionObserverCallback | undefined;

    class IntersectionObserverMock {
      constructor(nextCallback: IntersectionObserverCallback) {
        callback = nextCallback;
      }

      disconnect = vi.fn();
      observe = vi.fn((element: Element) => observed.push(element));
      unobserve = vi.fn((element: Element) => unobserved.push(element));
    }

    vi.spyOn(window, "matchMedia").mockImplementation(
      (query) =>
        ({
          matches: false,
          media: query,
          onchange: null,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          addListener: vi.fn(),
          removeListener: vi.fn(),
          dispatchEvent: vi.fn(),
        }) as MediaQueryList,
    );
    vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);

    render(
      <>
        <HomepageScrollReveal />
        <section data-scroll-reveal>Content</section>
      </>,
    );

    const section = document.querySelector("[data-scroll-reveal]");

    await waitFor(() => expect(section).toHaveAttribute("data-scroll-reveal-state", "waiting"));
    expect(observed).toEqual([section]);

    callback?.(
      [{ isIntersecting: true, target: section } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );

    await waitFor(() => expect(section).toHaveAttribute("data-scroll-reveal-state", "visible"));
    expect(unobserved).toEqual([section]);
  });
});
