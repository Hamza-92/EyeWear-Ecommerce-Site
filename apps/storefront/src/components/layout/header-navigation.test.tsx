import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { HeaderNavigation } from "@/components/layout/header-navigation";
import { primaryNavigation, utilityNavigation } from "@/config/navigation";

function renderHeader() {
  return render(
    <HeaderNavigation
      storeName="Test Eyewear"
      items={primaryNavigation}
      utilityLinks={utilityNavigation}
    />,
  );
}

describe("HeaderNavigation", () => {
  it("opens an editorial mega panel and exposes its links", async () => {
    const user = userEvent.setup();
    renderHeader();

    const trigger = screen.getByRole("button", { name: "Eyeglasses" });
    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    const panel = screen.getByRole("region", { name: "Eyeglasses" });
    expect(within(panel).getByRole("link", { name: "View all" })).toHaveAttribute(
      "href",
      "/eyeglasses",
    );
    expect(within(panel).getByRole("link", { name: "Low bridge" })).toBeVisible();
    expect(
      within(panel).getByAltText(
        "Model wearing translucent optical frames in warm architectural light",
      ),
    ).toBeVisible();
  });

  it("closes the desktop menu with Escape and returns focus to its trigger", async () => {
    const user = userEvent.setup();
    renderHeader();

    const trigger = screen.getByRole("button", { name: "Sunglasses" });
    await user.click(trigger);
    await user.keyboard("{Escape}");

    await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "false"));
    expect(trigger).toHaveFocus();
  });

  it("closes when the pointer moves above or below the mega menu", () => {
    renderHeader();

    const trigger = screen.getByRole("button", { name: "Designers" });

    fireEvent.pointerEnter(trigger, { pointerType: "mouse" });
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    fireEvent.pointerEnter(screen.getByTestId("announcement-bar"), { pointerType: "mouse" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.pointerEnter(trigger, { pointerType: "mouse" });
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    fireEvent.pointerEnter(screen.getByRole("button", { name: "Close navigation panel" }), {
      pointerType: "mouse",
    });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("opens search and moves focus into the search field", async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByRole("button", { name: "Open search" }));

    const input = screen.getByRole("searchbox", {
      name: "Search frames, designers and collections",
    });
    await waitFor(() => expect(input).toHaveFocus());
    expect(
      within(screen.getByRole("region", { name: "Search the catalogue" })).getByRole("button", {
        name: "Close search",
      }),
    ).toBeVisible();
  });

  it("provides an expandable, focus-managed mobile menu", async () => {
    const user = userEvent.setup();
    renderHeader();

    const openButton = screen.getByRole("button", { name: "Open menu" });
    await user.click(openButton);

    const dialog = screen.getByRole("dialog", { name: "Main menu" });
    await waitFor(() =>
      expect(within(dialog).getByRole("button", { name: "Close menu" })).toHaveFocus(),
    );

    await user.click(within(dialog).getByRole("button", { name: "Eyeglasses" }));
    expect(within(dialog).getByRole("link", { name: "View all eyeglasses" })).toBeVisible();

    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("dialog", { name: "Main menu" })).not.toBeInTheDocument(),
    );
    expect(openButton).toHaveFocus();
  });
});
