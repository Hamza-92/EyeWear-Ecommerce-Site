import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HomeHero } from "@/components/home/home-hero";
import { homeHeroContent } from "@/config/homepage";

describe("HomeHero", () => {
  it("presents the campaign message and both primary shopping routes", () => {
    render(<HomeHero content={homeHeroContent} />);

    expect(
      screen.getByRole("heading", { level: 1, name: "A clearer point of view." }),
    ).toBeVisible();
    expect(screen.getByRole("link", { name: "Shop eyeglasses" })).toHaveAttribute(
      "href",
      "/eyeglasses",
    );
    expect(screen.getByRole("link", { name: "Shop sunglasses" })).toHaveAttribute(
      "href",
      "/sunglasses",
    );
    expect(
      screen.getByRole("link", { name: "Shop sunglasses" }).querySelector("svg"),
    ).toHaveAttribute("aria-hidden", "true");
  });

  it("uses useful alternative text and dedicated responsive art direction", () => {
    const { container } = render(<HomeHero content={homeHeroContent} />);

    expect(screen.getByAltText(homeHeroContent.media.alt)).toBeVisible();
    expect(container.querySelector('source[media="(max-width: 47.999rem)"]')).toHaveAttribute(
      "srcset",
      expect.stringContaining("hero-mobile.jpg"),
    );
    expect(container.querySelector('source[media="(min-width: 48rem)"]')).toHaveAttribute(
      "srcset",
      expect.stringContaining("hero-desktop.jpg"),
    );
  });
});
