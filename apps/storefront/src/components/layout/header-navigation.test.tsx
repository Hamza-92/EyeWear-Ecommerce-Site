import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { HeaderNavigation } from "@/components/layout/header-navigation";
import { primaryNavigation, utilityNavigation } from "@/config/navigation";
import { searchPreviewContent } from "@/config/search-preview";

function renderHeader(cartCount = 0) {
  return render(
    <HeaderNavigation
      storeName="Test Eyewear"
      logoUrl={null}
      items={primaryNavigation}
      utilityLinks={utilityNavigation}
      searchContent={searchPreviewContent}
      cartCount={cartCount}
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
    expect(document.body).toHaveStyle({ overflow: "hidden" });
    expect(
      within(screen.getByRole("region", { name: "Search the catalogue" })).getByRole("button", {
        name: "Close search",
      }),
    ).toBeVisible();
    expect(screen.getByRole("heading", { name: "Popular searches" })).toBeVisible();
    expect(screen.getByRole("status")).toHaveTextContent("Popular products");
    expect(screen.getByRole("link", { name: /Aster & Row Atelier 01/ })).toBeVisible();

    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(
        screen.queryByRole("region", { name: "Search the catalogue" }),
      ).not.toBeInTheDocument(),
    );
    expect(document.body).not.toHaveStyle({ overflow: "hidden" });
    expect(screen.getByRole("button", { name: "Open search" })).toHaveFocus();
  });

  it("updates predictive results after a simulated async search", async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByRole("button", { name: "Open search" }));
    const input = screen.getByRole("searchbox", {
      name: "Search frames, designers and collections",
    });

    await user.type(input, "titanium");
    expect(screen.getByRole("status")).toHaveTextContent("Searching catalogue");
    expect(screen.getByRole("button", { name: "Clear search" })).toBeVisible();

    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("3 results"));
    expect(screen.getByRole("heading", { name: "Related searches" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Titanium eyeglasses" })).toBeVisible();
    expect(screen.getByRole("link", { name: /Kanso Studio Hikari/ })).toBeVisible();
    expect(screen.getByRole("link", { name: /Lumen Works Solis/ })).toBeVisible();
    expect(screen.queryByRole("link", { name: /Aster & Row Atelier 01/ })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View all results" })).toHaveAttribute(
      "href",
      "/search?q=titanium",
    );

    await user.click(screen.getByRole("button", { name: "Clear search" }));
    expect(input).toHaveValue("");
    expect(screen.queryByRole("button", { name: "Clear search" })).not.toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("Popular products");
  });

  it("keeps genuine recent searches for the current browsing session", async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByRole("button", { name: "Open search" }));
    const searchRegion = screen.getByRole("region", { name: "Search the catalogue" });
    const input = within(searchRegion).getByRole("searchbox", {
      name: "Search frames, designers and collections",
    });

    await user.type(input, "round");
    await user.click(within(searchRegion).getByRole("button", { name: "Search" }));
    await user.click(within(searchRegion).getByRole("button", { name: "Clear search" }));

    const recentSearches = within(searchRegion).getByRole("region", {
      name: "Recent searches",
    });
    expect(within(recentSearches).getByRole("button", { name: "round" })).toBeVisible();

    await user.click(within(recentSearches).getByRole("button", { name: "Clear" }));
    expect(
      within(searchRegion).queryByRole("region", { name: "Recent searches" }),
    ).not.toBeInTheDocument();
  });

  it("shows a useful empty state for an unmatched search", async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByRole("button", { name: "Open search" }));
    await user.type(
      screen.getByRole("searchbox", {
        name: "Search frames, designers and collections",
      }),
      "rimless",
    );

    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("0 results"));
    expect(screen.getByRole("heading", { name: "No exact matches" })).toBeVisible();
    expect(screen.getByText("You may also like")).toBeVisible();
    expect(screen.getByRole("link", { name: /Aster & Row Atelier 01/ })).toBeVisible();
  });

  it("only renders a cart badge when the cart contains items", () => {
    const { rerender } = renderHeader();

    const emptyBagLink = screen.getByRole("link", { name: "Shopping bag, 0 items" });
    expect(within(emptyBagLink).queryByText("0")).not.toBeInTheDocument();

    rerender(
      <HeaderNavigation
        storeName="Test Eyewear"
        logoUrl={null}
        items={primaryNavigation}
        utilityLinks={utilityNavigation}
        searchContent={searchPreviewContent}
        cartCount={3}
      />,
    );

    const filledBagLink = screen.getByRole("link", { name: "Shopping bag, 3 items" });
    expect(within(filledBagLink).getByText("3")).toBeVisible();
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
