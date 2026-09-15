import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ShopByIntent } from "@/components/home/shop-by-intent";
import { shopByIntentContent } from "@/config/homepage";

describe("ShopByIntent", () => {
  it("offers three distinct ways to begin browsing", () => {
    render(<ShopByIntent content={shopByIntentContent} />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Begin with what matters.",
      }),
    ).toBeVisible();
    expect(screen.getAllByRole("article")).toHaveLength(3);
    expect(screen.getByRole("link", { name: "A silhouette that feels like you." })).toHaveAttribute(
      "href",
      "/eyeglasses/round",
    );
    expect(screen.getByRole("link", { name: "Acetate or titanium." })).toHaveAttribute(
      "href",
      "/eyeglasses/acetate",
    );
    expect(screen.getByRole("link", { name: "Made to sit right." })).toHaveAttribute(
      "href",
      "/guides/frame-fit",
    );
  });

  it("gives every editorial visual useful alternative text", () => {
    render(<ShopByIntent content={shopByIntentContent} />);

    for (const item of shopByIntentContent.items) {
      expect(screen.getByAltText(item.image.alt)).toBeVisible();
    }
  });
});
