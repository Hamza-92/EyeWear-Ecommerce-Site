"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
  type RefObject,
} from "react";
import {
  AccountIcon,
  ArrowRightIcon,
  BagIcon,
  ChevronDownIcon,
  CloseIcon,
  HeartIcon,
  MenuIcon,
  SearchIcon,
} from "@/components/icons/header-icons";
import type { NavigationItem, NavigationLink } from "@/config/navigation";

type HeaderNavigationProps = Readonly<{
  storeName: string;
  items: readonly NavigationItem[];
  utilityLinks: readonly NavigationLink[];
}>;

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function LogoPlaceholder({ storeName }: Readonly<{ storeName: string }>) {
  return (
    <Link
      href="/"
      className="inline-flex h-11 w-[7.75rem] shrink-0 items-center justify-center border border-dashed border-subtle/70 bg-canvas px-2 text-center sm:h-12 sm:w-[11.25rem]"
      aria-label={`${storeName} home`}
    >
      <span aria-hidden="true" className="leading-none">
        <span className="block text-[0.625rem] font-bold tracking-[0.18em] uppercase">
          Logo placeholder
        </span>
        <span className="mt-1 block text-[0.5625rem] tracking-[0.08em] text-subtle uppercase">
          180 × 48 px · SVG
        </span>
      </span>
    </Link>
  );
}

function IconLink({
  href,
  label,
  children,
}: Readonly<{ href: string; label: string; children: ReactNode }>) {
  return (
    <a
      href={href}
      className="relative inline-flex size-11 items-center justify-center text-ink transition-colors duration-150 hover:text-copy"
      aria-label={label}
    >
      {children}
    </a>
  );
}

function PromotionCard({
  promotion,
  onNavigate,
}: Readonly<{
  promotion: NavigationItem["promotions"][number];
  onNavigate: () => void;
}>) {
  return (
    <a href={promotion.href} className="group block" onClick={onNavigate}>
      <div className="relative aspect-[4/5] overflow-hidden bg-surface">
        <Image
          src={promotion.imageSrc}
          alt={promotion.imageAlt}
          fill
          sizes="(min-width: 1280px) 16vw, 42vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
          style={{ objectPosition: promotion.imagePosition }}
        />
      </div>
      <p className="mt-4 text-[0.625rem] font-bold tracking-[0.18em] text-subtle uppercase">
        {promotion.eyebrow}
      </p>
      <p className="mt-1.5 max-w-[18rem] font-[family-name:var(--font-display)] text-[1.375rem] leading-[1.05] text-ink">
        {promotion.title}
      </p>
    </a>
  );
}

function DesktopMegaPanel({
  item,
  onNavigate,
  reducedMotion,
}: Readonly<{
  item: NavigationItem;
  onNavigate: () => void;
  reducedMotion: boolean | null;
}>) {
  return (
    <motion.section
      id={`mega-panel-${item.id}`}
      aria-labelledby={`mega-trigger-${item.id}`}
      initial={reducedMotion ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
      transition={{ duration: reducedMotion ? 0 : 0.2 }}
      className="absolute top-full right-0 left-0 z-10 hidden border-t border-line-soft bg-white xl:block"
    >
      <div className="ui-container grid grid-cols-[minmax(0,1.08fr)_minmax(25rem,0.92fr)] gap-12 py-9 2xl:gap-20 2xl:py-11">
        <div className="flex flex-col">
          <div className="flex items-end justify-between border-b border-line-soft pb-5">
            <div>
              <p className="ui-eyebrow">Explore</p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-4xl leading-none">
                {item.label}
              </h2>
            </div>
            <a
              href={item.href}
              className="group inline-flex min-h-11 items-center gap-2 text-[0.6875rem] font-bold tracking-[0.12em] uppercase"
              onClick={onNavigate}
              data-mega-link
            >
              View all
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="grid flex-1 grid-cols-3 gap-8 pt-7">
            {item.sections.map((section) => (
              <section key={section.title} aria-labelledby={`${item.id}-${section.title}`}>
                <h3
                  id={`${item.id}-${section.title}`}
                  className="text-[0.625rem] font-bold tracking-[0.18em] text-subtle uppercase"
                >
                  {section.title}
                </h3>
                <ul className="mt-3 space-y-0.5">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="inline-flex min-h-11 items-center text-sm leading-6 text-ink underline-offset-4 transition-colors hover:text-copy hover:underline"
                        onClick={onNavigate}
                        data-mega-link
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {item.promotions.map((promotion) => (
            <PromotionCard
              key={`${item.id}-${promotion.href}`}
              promotion={promotion}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function MobileNavigation({
  items,
  expandedItemId,
  setExpandedItemId,
  onNavigate,
  reducedMotion,
}: Readonly<{
  items: readonly NavigationItem[];
  expandedItemId: string | null;
  setExpandedItemId: (id: string | null) => void;
  onNavigate: () => void;
  reducedMotion: boolean | null;
}>) {
  return (
    <nav aria-label="Mobile primary navigation" className="border-t border-line-soft">
      {items.map((item) => {
        const isExpanded = expandedItemId === item.id;
        const featuredPromotion = item.promotions.at(0);

        return (
          <div key={item.id} className="border-b border-line-soft">
            <button
              type="button"
              className="flex min-h-16 w-full items-center justify-between gap-5 py-3 text-left text-[0.75rem] font-bold tracking-[0.12em] uppercase"
              aria-expanded={isExpanded}
              aria-controls={`mobile-panel-${item.id}`}
              onClick={() => setExpandedItemId(isExpanded ? null : item.id)}
            >
              {item.label}
              <ChevronDownIcon
                className={`size-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isExpanded ? (
                <motion.div
                  id={`mobile-panel-${item.id}`}
                  initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.22 }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-8 pb-8 pt-2 sm:grid-cols-2">
                    <div>
                      <a
                        href={item.href}
                        className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline underline-offset-4"
                        onClick={onNavigate}
                      >
                        View all {item.label.toLowerCase()}
                        <ArrowRightIcon className="size-4" />
                      </a>
                      <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-1">
                        {item.sections.map((section) => (
                          <section key={section.title}>
                            <h3 className="text-[0.625rem] font-bold tracking-[0.18em] text-subtle uppercase">
                              {section.title}
                            </h3>
                            <ul className="mt-2 space-y-0.5">
                              {section.links.map((link) => (
                                <li key={link.href}>
                                  <a
                                    href={link.href}
                                    className="inline-flex min-h-11 items-center text-sm leading-6"
                                    onClick={onNavigate}
                                  >
                                    {link.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </section>
                        ))}
                      </div>
                    </div>

                    {featuredPromotion ? (
                      <PromotionCard promotion={featuredPromotion} onNavigate={onNavigate} />
                    ) : null}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </nav>
  );
}

function SearchPanel({
  inputRef,
  onClose,
  reducedMotion,
}: Readonly<{
  inputRef: RefObject<HTMLInputElement | null>;
  onClose: () => void;
  reducedMotion: boolean | null;
}>) {
  return (
    <motion.section
      id="header-search-panel"
      aria-label="Search the catalogue"
      initial={reducedMotion ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
      transition={{ duration: reducedMotion ? 0 : 0.2 }}
      className="absolute top-full right-0 left-0 z-20 border-t border-line-soft bg-white"
    >
      <div className="ui-container py-8 sm:py-10">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-between gap-5">
            <div>
              <p className="ui-eyebrow">Search</p>
              <h2 className="mt-1 font-[family-name:var(--font-display)] text-3xl leading-none sm:text-4xl">
                What are you looking for?
              </h2>
            </div>
            <button
              type="button"
              className="inline-flex size-11 shrink-0 items-center justify-center"
              aria-label="Close search"
              onClick={onClose}
            >
              <CloseIcon className="size-5" />
            </button>
          </div>
          <form
            action="/search"
            method="get"
            role="search"
            className="mt-7 flex border-b border-ink"
          >
            <label htmlFor="header-search" className="ui-visually-hidden">
              Search frames, designers and collections
            </label>
            <input
              ref={inputRef}
              id="header-search"
              name="q"
              type="search"
              autoComplete="off"
              placeholder="Search frames, designers and collections"
              className="min-h-14 min-w-0 flex-1 border-0 bg-transparent px-0 text-base outline-none placeholder:text-subtle"
            />
            <button
              type="submit"
              className="inline-flex min-h-14 items-center gap-2 pl-5 text-[0.6875rem] font-bold tracking-[0.12em] uppercase"
            >
              Search
              <ArrowRightIcon className="size-4" />
            </button>
          </form>
          <p className="mt-3 text-xs leading-5 text-subtle">
            Try “titanium”, “round” or a designer name.
          </p>
        </div>
      </div>
    </motion.section>
  );
}

export function HeaderNavigation({ storeName, items, utilityLinks }: HeaderNavigationProps) {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileItemId, setExpandedMobileItemId] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileCloseRef = useRef<HTMLButtonElement>(null);
  const searchTriggerRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const desktopTriggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeItem = items.find((item) => item.id === activeMenuId) ?? null;

  const closeTransientNavigation = () => {
    setActiveMenuId(null);
    setSearchOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setExpandedMobileItemId(null);
  };

  const openMobileMenu = () => {
    setActiveMenuId(null);
    setSearchOpen(false);
    setMobileMenuOpen(true);
  };

  const toggleSearch = () => {
    setActiveMenuId(null);
    setMobileMenuOpen(false);
    setSearchOpen((isOpen) => !isOpen);
  };

  useEffect(() => {
    if (!searchOpen) {
      return;
    }

    const frame = window.requestAnimationFrame(() => searchInputRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [searchOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = window.requestAnimationFrame(() => mobileCloseRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMobileMenuOpen(false);
        setExpandedMobileItemId(null);
        return;
      }

      if (event.key !== "Tab" || !mobileMenuRef.current) {
        return;
      }

      const focusableElements = Array.from(
        mobileMenuRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => element.getClientRects().length > 0);

      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements.at(0);
      const lastElement = focusableElements.at(-1);

      if (!firstElement || !lastElement) {
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || mobileMenuOpen) {
        return;
      }

      if (searchOpen) {
        event.preventDefault();
        setSearchOpen(false);
        searchTriggerRef.current?.focus();
        return;
      }

      if (activeMenuId) {
        event.preventDefault();
        const triggerIndex = items.findIndex((item) => item.id === activeMenuId);
        setActiveMenuId(null);
        desktopTriggerRefs.current[triggerIndex]?.focus();
      }
    };

    const handleFocusIn = (event: FocusEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveMenuId(null);
        setSearchOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", handleFocusIn);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", handleFocusIn);
    };
  }, [activeMenuId, items, mobileMenuOpen, searchOpen]);

  const handleDesktopKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
    item: NavigationItem,
    index: number,
  ) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const nextIndex = (index + direction + items.length) % items.length;
      desktopTriggerRefs.current[nextIndex]?.focus();
      return;
    }

    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const targetIndex = event.key === "Home" ? 0 : items.length - 1;
      desktopTriggerRefs.current[targetIndex]?.focus();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSearchOpen(false);
      setActiveMenuId(item.id);
      window.requestAnimationFrame(() => {
        document
          .getElementById(`mega-panel-${item.id}`)
          ?.querySelector<HTMLElement>("[data-mega-link]")
          ?.focus();
      });
    }
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 bg-canvas"
      onPointerLeave={(event) => {
        if (event.pointerType !== "touch" && !searchOpen) {
          setActiveMenuId(null);
        }
      }}
    >
      <div
        className="border-b border-line-soft bg-ink text-white"
        data-testid="announcement-bar"
        onPointerEnter={() => setActiveMenuId(null)}
      >
        <div className="ui-container flex min-h-11 items-center justify-center text-[0.625rem] font-semibold tracking-[0.1em] uppercase sm:justify-between">
          <p>Complimentary delivery on qualifying orders</p>
          <nav aria-label="Utility navigation" className="hidden items-center gap-6 md:flex">
            {utilityLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="inline-flex min-h-11 items-center hover:underline"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="border-b border-line-soft bg-canvas">
        <div className="ui-container grid min-h-[4.875rem] grid-cols-[auto_1fr] items-center gap-2 sm:gap-6 xl:grid-cols-[11.25rem_1fr_11.25rem]">
          <LogoPlaceholder storeName={storeName} />

          <nav
            aria-label="Primary navigation"
            className="hidden h-full items-stretch justify-center xl:flex"
          >
            {items.map((item, index) => {
              const isActive = activeMenuId === item.id;

              return (
                <button
                  key={item.id}
                  ref={(element) => {
                    desktopTriggerRefs.current[index] = element;
                  }}
                  id={`mega-trigger-${item.id}`}
                  type="button"
                  className="group relative flex min-h-11 items-center gap-1.5 px-4 text-[0.6875rem] font-bold tracking-[0.12em] uppercase 2xl:px-5"
                  aria-expanded={isActive}
                  aria-controls={`mega-panel-${item.id}`}
                  onClick={() => {
                    setSearchOpen(false);
                    setActiveMenuId(item.id);
                  }}
                  onPointerEnter={(event) => {
                    if (event.pointerType !== "touch") {
                      setSearchOpen(false);
                      setActiveMenuId(item.id);
                    }
                  }}
                  onKeyDown={(event) => handleDesktopKeyDown(event, item, index)}
                >
                  {item.label}
                  <ChevronDownIcon
                    className={`size-3.5 transition-transform duration-200 ${isActive ? "rotate-180" : ""}`}
                  />
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-4 bottom-0 h-px origin-left bg-ink transition-transform duration-200 2xl:inset-x-5 ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                  />
                </button>
              );
            })}
          </nav>

          <div className="flex items-center justify-end">
            <button
              ref={searchTriggerRef}
              type="button"
              className="inline-flex size-11 items-center justify-center text-ink transition-colors duration-150 hover:text-copy"
              aria-label={searchOpen ? "Close search" : "Open search"}
              aria-expanded={searchOpen}
              aria-controls="header-search-panel"
              onClick={toggleSearch}
            >
              <SearchIcon className="size-5" />
            </button>
            <span className="hidden xl:contents">
              <IconLink href="/account" label="Account">
                <AccountIcon className="size-5" />
              </IconLink>
              <IconLink href="/wishlist" label="Wishlist">
                <HeartIcon className="size-5" />
              </IconLink>
            </span>
            <IconLink href="/bag" label="Shopping bag, 0 items">
              <BagIcon className="size-5" />
              <span className="absolute top-1.5 right-1.5 flex size-4 items-center justify-center bg-ink text-[0.5625rem] font-bold text-white">
                0
              </span>
            </IconLink>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center xl:hidden"
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              onClick={openMobileMenu}
            >
              <MenuIcon className="size-6" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {activeItem || searchOpen ? (
          <motion.button
            type="button"
            className="absolute top-full right-0 left-0 z-0 hidden h-[calc(100vh-7.625rem)] w-full cursor-default bg-black/25 xl:block"
            aria-label="Close navigation panel"
            tabIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.18 }}
            onClick={closeTransientNavigation}
            onPointerEnter={() => setActiveMenuId(null)}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence initial={false} mode="wait">
        {activeItem ? (
          <DesktopMegaPanel
            key={activeItem.id}
            item={activeItem}
            onNavigate={closeTransientNavigation}
            reducedMotion={reducedMotion}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {searchOpen ? (
          <SearchPanel
            inputRef={searchInputRef}
            onClose={() => {
              setSearchOpen(false);
              searchTriggerRef.current?.focus();
            }}
            reducedMotion={reducedMotion}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {mobileMenuOpen ? (
          <motion.div
            ref={mobileMenuRef}
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
            initial={reducedMotion ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 24 }}
            transition={{ duration: reducedMotion ? 0 : 0.24 }}
            className="fixed inset-0 z-[70] overflow-y-auto overscroll-contain bg-canvas xl:hidden"
          >
            <div className="ui-container flex min-h-[100svh] flex-col">
              <div className="flex min-h-[4.875rem] items-center justify-between border-b border-line-soft">
                <LogoPlaceholder storeName={storeName} />
                <button
                  ref={mobileCloseRef}
                  type="button"
                  className="inline-flex size-11 items-center justify-center"
                  aria-label="Close menu"
                  onClick={closeMobileMenu}
                >
                  <CloseIcon className="size-6" />
                </button>
              </div>

              <MobileNavigation
                items={items}
                expandedItemId={expandedMobileItemId}
                setExpandedItemId={setExpandedMobileItemId}
                onNavigate={closeMobileMenu}
                reducedMotion={reducedMotion}
              />

              <div className="mt-auto grid grid-cols-2 gap-px border-t border-line-soft bg-line-soft py-px sm:grid-cols-4">
                <a
                  href="/search"
                  className="flex min-h-14 items-center gap-3 bg-canvas px-4 text-xs font-semibold uppercase"
                >
                  <SearchIcon className="size-4" /> Search
                </a>
                <a
                  href="/account"
                  className="flex min-h-14 items-center gap-3 bg-canvas px-4 text-xs font-semibold uppercase"
                >
                  <AccountIcon className="size-4" /> Account
                </a>
                <a
                  href="/wishlist"
                  className="flex min-h-14 items-center gap-3 bg-canvas px-4 text-xs font-semibold uppercase"
                >
                  <HeartIcon className="size-4" /> Wishlist
                </a>
                <a
                  href="/help"
                  className="flex min-h-14 items-center bg-canvas px-4 text-xs font-semibold uppercase"
                >
                  Help
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
