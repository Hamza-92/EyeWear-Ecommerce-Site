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
import { HeaderSearchPanel } from "@/components/layout/header-search-panel";
import type { NavigationItem, NavigationLink } from "@/config/navigation";
import type { SearchPreviewContent } from "@/config/search-preview";

type HeaderNavigationProps = Readonly<{
  storeName: string;
  logoUrl: string | null;
  items: readonly NavigationItem[];
  utilityLinks: readonly NavigationLink[];
  searchContent: SearchPreviewContent;
  cartCount: number;
}>;

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function BrandLogo({
  storeName,
  logoUrl,
}: Readonly<{ storeName: string; logoUrl: string | null }>) {
  return (
    <Link
      href="/"
      className={`relative inline-flex h-11 w-[7.75rem] shrink-0 items-center justify-center bg-white text-center sm:h-12 sm:w-[11.25rem] ${
        logoUrl ? "" : "border border-dashed border-subtle/70 px-2"
      }`}
      aria-label={`${storeName} home`}
    >
      {logoUrl ? (
        <Image
          src={logoUrl}
          alt=""
          fill
          sizes="(min-width: 640px) 180px, 124px"
          className="object-contain"
          priority
        />
      ) : (
        <span aria-hidden="true" className="leading-none">
          <span className="header-type-logo block">Logo placeholder</span>
          <span className="header-type-logo-spec mt-1 block text-subtle">180 × 48 px · SVG</span>
        </span>
      )}
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
  imageClassName = "aspect-[4/5]",
}: Readonly<{
  promotion: NavigationItem["promotions"][number];
  onNavigate: () => void;
  imageClassName?: string;
}>) {
  return (
    <a href={promotion.href} className="group block" onClick={onNavigate}>
      <div className={`relative overflow-hidden bg-surface ${imageClassName}`}>
        <Image
          src={promotion.imageSrc}
          alt={promotion.imageAlt}
          fill
          sizes="(min-width: 1280px) 20vw, (min-width: 640px) 42vw, 88vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
          style={{ objectPosition: promotion.imagePosition }}
        />
      </div>
      <p className="header-type-label mt-4 text-subtle">{promotion.eyebrow}</p>
      <p className="header-type-editorial-copy mt-1.5 max-w-[18rem] text-ink">{promotion.title}</p>
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
              <p className="header-type-label text-subtle">Explore</p>
              <h2 className="header-type-editorial-heading mt-2">{item.label}</h2>
            </div>
            <a
              href={item.href}
              className="header-type-action group inline-flex min-h-11 items-center gap-2"
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
                <h3 id={`${item.id}-${section.title}`} className="header-type-label text-subtle">
                  {section.title}
                </h3>
                <ul className="mt-3 space-y-0.5">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="mega-menu-link header-type-link inline-flex min-h-11 items-center text-ink"
                        onClick={onNavigate}
                        data-mega-link
                      >
                        <span className="mega-menu-link__label">{link.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-5">
          {item.promotions.map((promotion) => (
            <PromotionCard
              key={`${item.id}-${promotion.href}`}
              promotion={promotion}
              onNavigate={onNavigate}
              imageClassName="h-[clamp(17.5rem,25vw,22.25rem)]"
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
              className="header-type-primary flex min-h-16 w-full items-center justify-between gap-5 py-3 text-left"
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
                        className="header-type-action group inline-flex min-h-11 items-center gap-2 underline underline-offset-4"
                        onClick={onNavigate}
                      >
                        View all {item.label.toLowerCase()}
                        <ArrowRightIcon className="size-4" />
                      </a>
                      <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-1">
                        {item.sections.map((section) => (
                          <section key={section.title}>
                            <h3 className="header-type-label text-subtle">{section.title}</h3>
                            <ul className="mt-2 space-y-0.5">
                              {section.links.map((link) => (
                                <li key={link.href}>
                                  <a
                                    href={link.href}
                                    className="mega-menu-link header-type-link inline-flex min-h-11 items-center"
                                    onClick={onNavigate}
                                  >
                                    <span className="mega-menu-link__label">{link.label}</span>
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

export function HeaderNavigation({
  storeName,
  logoUrl,
  items,
  utilityLinks,
  searchContent,
  cartCount,
}: HeaderNavigationProps) {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileItemId, setExpandedMobileItemId] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<readonly string[]>([]);
  const reducedMotion = useReducedMotion();
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileCloseRef = useRef<HTMLButtonElement>(null);
  const searchTriggerRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const desktopTriggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeItem = items.find((item) => item.id === activeMenuId) ?? null;
  const normalizedCartCount = Number.isFinite(cartCount) ? Math.max(0, Math.trunc(cartCount)) : 0;
  const cartLabel = `Shopping bag, ${normalizedCartCount} ${
    normalizedCartCount === 1 ? "item" : "items"
  }`;

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

  const rememberSearch = (term: string) => {
    const normalizedTerm = term.trim();
    if (!normalizedTerm) {
      return;
    }

    setRecentSearches((currentSearches) =>
      [
        normalizedTerm,
        ...currentSearches.filter(
          (currentTerm) => currentTerm.toLocaleLowerCase() !== normalizedTerm.toLocaleLowerCase(),
        ),
      ].slice(0, 3),
    );
  };

  useEffect(() => {
    if (!searchOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = window.requestAnimationFrame(() => searchInputRef.current?.focus());
    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
    };
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
      className="sticky top-0 z-50 bg-white"
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
        <div className="header-type-utility ui-container flex min-h-11 items-center justify-center sm:justify-between">
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

      <div className="border-b border-line-soft bg-white">
        <div className="ui-container grid min-h-[4.875rem] grid-cols-[auto_1fr] items-center gap-2 sm:gap-6 xl:grid-cols-[11.25rem_1fr_11.25rem]">
          <BrandLogo storeName={storeName} logoUrl={logoUrl} />

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
                  className="header-type-primary group relative flex min-h-11 items-center gap-1.5 px-4 2xl:px-5"
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
            <IconLink href="/bag" label={cartLabel}>
              <BagIcon className="size-5" />
              {normalizedCartCount > 0 ? (
                <span className="header-type-badge absolute top-1.5 right-1 flex h-4 min-w-4 items-center justify-center bg-ink px-1 text-white">
                  {normalizedCartCount}
                </span>
              ) : null}
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
          <HeaderSearchPanel
            content={searchContent}
            inputRef={searchInputRef}
            recentSearches={recentSearches}
            onClearRecentSearches={() => setRecentSearches([])}
            onCommitSearch={rememberSearch}
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
            className="fixed inset-0 z-[70] overflow-y-auto overscroll-contain bg-white xl:hidden"
          >
            <div className="ui-container flex min-h-[100svh] flex-col">
              <div className="flex min-h-[4.875rem] items-center justify-between border-b border-line-soft">
                <BrandLogo storeName={storeName} logoUrl={logoUrl} />
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
                  className="header-type-action flex min-h-14 items-center gap-3 bg-white px-4"
                >
                  <SearchIcon className="size-4" /> Search
                </a>
                <a
                  href="/account"
                  className="header-type-action flex min-h-14 items-center gap-3 bg-white px-4"
                >
                  <AccountIcon className="size-4" /> Account
                </a>
                <a
                  href="/wishlist"
                  className="header-type-action flex min-h-14 items-center gap-3 bg-white px-4"
                >
                  <HeartIcon className="size-4" /> Wishlist
                </a>
                <a
                  href="/help"
                  className="header-type-action flex min-h-14 items-center bg-white px-4"
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
