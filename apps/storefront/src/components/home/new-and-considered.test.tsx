import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { NewAndConsidered } from "@/components/home/new-and-considered";
import { newAndConsideredContent } from "@/config/homepage";

describe("NewAndConsidered", () => {
  it("renders a useful four-product edit with clear shopping routes", () => {
    render(<NewAndConsidered content={newAndConsideredContent} />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Frames worth a closer look.",
      }),
    ).toBeVisible();
    expect(screen.getByRole("link", { name: "View new arrivals" })).toHaveAttribute(
      "href",
      "/new-in",
    );
    expect(screen.getAllByRole("article")).toHaveLength(4);
    expect(screen.getByRole("link", { name: "View Aster & Row Atelier 01" })).toHaveAttribute(
      "href",
      "/eyeglasses/aster-row-atelier-01",
    );
    expect(
      screen.getByAltText("Crystal acetate Atelier 01 eyeglasses resting on pale travertine"),
    ).toBeVisible();
  });

  it("lets a shopper toggle the preview wishlist control", async () => {
    const user = userEvent.setup();
    render(<NewAndConsidered content={newAndConsideredContent} />);

    const addButton = screen.getByRole("button", {
      name: "Add Aster & Row Atelier 01 to wishlist",
    });

    expect(addButton).toHaveAttribute("aria-pressed", "false");
    await user.click(addButton);

    expect(
      screen.getByRole("button", {
        name: "Remove Aster & Row Atelier 01 from wishlist",
      }),
    ).toHaveAttribute("aria-pressed", "true");
  });
});
