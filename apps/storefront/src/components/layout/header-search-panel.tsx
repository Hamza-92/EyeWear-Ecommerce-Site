"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState, type FormEvent, type RefObject } from "react";
import { ArrowRightIcon, CloseIcon } from "@/components/icons/header-icons";
import type { SearchPreviewContent, SearchPreviewProduct } from "@/config/search-preview";

const previewResultLimit = 4;
const simulatedRequestDelay = 320;

function ProductResult({
  product,
  onNavigate,
}: Readonly<{
  product: SearchPreviewProduct;
  onNavigate: () => void;
}>) {
  return (
    <article>
      <a
        href={product.href}
        className="group block focus-visible:outline-offset-4"
        onClick={onNavigate}
        aria-label={`${product.brand} ${product.name}, ${product.price}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-surface">
          <Image
            src={product.imageSrc}
            alt={product.imageAlt}
            fill
            sizes="(min-width: 1280px) 18vw, (min-width: 640px) 42vw, 46vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
            style={{ objectPosition: product.imagePosition }}
          />
        </div>
        <div className="mt-3 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="header-type-label truncate text-subtle">{product.brand}</p>
            <h3 className="mt-1 text-sm font-medium tracking-[-0.01em] text-ink">{product.name}</h3>
          </div>
          <p className="shrink-0 text-sm font-medium tracking-[-0.01em] text-ink">
            {product.price}
          </p>
        </div>
        <p className="mt-1 text-xs leading-5 text-subtle">
          {product.category} · {product.material}
        </p>
      </a>
    </article>
  );
}

function LoadingResults() {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:gap-x-6 lg:grid-cols-4" aria-hidden="true">
      {Array.from({ length: previewResultLimit }, (_, index) => (
        <div key={index} className="animate-pulse">
          <div className="aspect-[4/3] bg-surface" />
          <div className="mt-3 h-2.5 w-20 bg-line-soft" />
          <div className="mt-3 h-3 w-32 max-w-full bg-line-soft" />
          <div className="mt-2 h-2.5 w-24 bg-line-soft" />
        </div>
      ))}
    </div>
  );
}

function SearchTermGroup({
  id,
  label,
  terms,
  onSelect,
  onClear,
}: Readonly<{
  id: string;
  label: string;
  terms: readonly string[];
  onSelect: (term: string) => void;
  onClear?: () => void;
}>) {
  return (
    <section aria-labelledby={id}>
      <div className="flex min-h-8 items-center justify-between gap-1">
        <h3 id={id} className="header-type-label text-subtle">
          {label}
        </h3>
        {onClear ? (
          <button
            type="button"
            className="header-search-muted-action header-type-action min-h-8 underline decoration-line underline-offset-4 transition-colors"
            onClick={onClear}
          >
            Clear
          </button>
        ) : null}
      </div>
      <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
        {terms.map((term) => (
          <button
            key={term}
            type="button"
            className="min-h-8 text-xs text-ink underline decoration-line underline-offset-4 transition-colors hover:text-copy hover:decoration-ink"
            onClick={() => onSelect(term)}
          >
            {term}
          </button>
        ))}
      </div>
    </section>
  );
}

export function HeaderSearchPanel({
  content,
  inputRef,
  recentSearches,
  onClearRecentSearches,
  onCommitSearch,
  onClose,
  reducedMotion,
}: Readonly<{
  content: SearchPreviewContent;
  inputRef: RefObject<HTMLInputElement | null>;
  recentSearches: readonly string[];
  onClearRecentSearches: () => void;
  onCommitSearch: (term: string) => void;
  onClose: () => void;
  reducedMotion: boolean | null;
}>) {
  const [query, setQuery] = useState("");
  const [settledQuery, setSettledQuery] = useState("");
  const normalizedQuery = settledQuery.trim().toLocaleLowerCase();
  const queryTokens = normalizedQuery.split(/\s+/).filter(Boolean);
  const isSearching = query.trim() !== settledQuery;
  const matchingProducts = normalizedQuery
    ? content.products.filter((product) => {
        const searchableProduct = [
          product.brand,
          product.name,
          product.category,
          product.material,
          ...product.searchTerms,
        ]
          .join(" ")
          .toLocaleLowerCase();

        return queryTokens.every((token) => searchableProduct.includes(token));
      })
    : content.products;
  const relatedSearches =
    normalizedQuery.length >= 2
      ? content.relatedSearches
          .filter((suggestion) =>
            suggestion.matchTerms.some((term) => {
              const normalizedTerm = term.toLocaleLowerCase();
              return (
                normalizedTerm.includes(normalizedQuery) || normalizedQuery.includes(normalizedTerm)
              );
            }),
          )
          .map((suggestion) => suggestion.label)
          .slice(0, 4)
      : [];
  const visibleProducts = matchingProducts.slice(0, previewResultLimit);
  const popularProducts = content.products.slice(0, previewResultLimit);
  const resultSummary = normalizedQuery
    ? `${matchingProducts.length} ${matchingProducts.length === 1 ? "result" : "results"} for “${settledQuery}”`
    : "Popular products";
  const resultsUrl = `/search?q=${encodeURIComponent(settledQuery)}`;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSettledQuery(query.trim());
    }, simulatedRequestDelay);

    return () => window.clearTimeout(timer);
  }, [query]);

  const commitSearch = (term: string) => {
    const nextTerm = term.trim();
    if (!nextTerm) {
      return;
    }

    onCommitSearch(nextTerm);
    setQuery(nextTerm);
    setSettledQuery(nextTerm);
  };

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    commitSearch(query);
  };

  const applySuggestion = (suggestion: string) => {
    commitSearch(suggestion);
    inputRef.current?.focus();
  };

  const clearSearch = () => {
    setQuery("");
    setSettledQuery("");
    inputRef.current?.focus();
  };

  const navigateFromResults = () => {
    if (normalizedQuery) {
      onCommitSearch(settledQuery);
    }
    onClose();
  };

  return (
    <motion.section
      id="header-search-panel"
      aria-label="Search the catalogue"
      initial={reducedMotion ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
      transition={{ duration: reducedMotion ? 0 : 0.2 }}
      className="absolute top-full right-0 left-0 z-20 max-h-[calc(100svh-7.625rem)] overflow-y-auto overscroll-contain border-t border-line-soft bg-white"
    >
      <div className="ui-container py-7 sm:py-9">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between gap-5">
            <div>
              <p className="header-type-label text-subtle">Search</p>
              <h2 className="header-type-editorial-heading mt-1">What are you looking for?</h2>
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
            className="header-search-form mt-6 flex"
            onSubmit={submitSearch}
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
              value={query}
              aria-controls="header-search-results"
              aria-describedby="header-search-help header-search-status"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search frames, designers and collections"
              className="header-search-input min-h-14 min-w-0 flex-1 border-0 bg-transparent px-0 text-base outline-none placeholder:text-subtle"
            />
            {query ? (
              <button
                type="button"
                className="header-search-clear-control inline-flex size-11 shrink-0 items-center justify-center transition-colors"
                aria-label="Clear search"
                onClick={clearSearch}
              >
                <CloseIcon className="size-3.5" />
              </button>
            ) : null}
            <button
              type="submit"
              className="header-type-action group inline-flex min-h-14 shrink-0 items-center gap-2 pl-2 sm:pl-4"
            >
              Search
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <div
            id="header-search-help"
            className={`mt-4 grid gap-5 border-b border-line-soft pb-5 ${
              !normalizedQuery && recentSearches.length > 0
                ? "min-[24rem]:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] min-[24rem]:gap-4 sm:grid-cols-2 sm:gap-8"
                : ""
            }`}
          >
            {normalizedQuery ? (
              relatedSearches.length > 0 ? (
                <SearchTermGroup
                  id="related-searches-label"
                  label="Related searches"
                  terms={relatedSearches}
                  onSelect={applySuggestion}
                />
              ) : (
                <p className="text-xs leading-8 text-subtle">
                  Search by designer, frame name, material or shape.
                </p>
              )
            ) : (
              <>
                {recentSearches.length > 0 ? (
                  <SearchTermGroup
                    id="recent-searches-label"
                    label="Recent searches"
                    terms={recentSearches}
                    onSelect={applySuggestion}
                    onClear={onClearRecentSearches}
                  />
                ) : null}
                <SearchTermGroup
                  id="popular-searches-label"
                  label="Popular searches"
                  terms={content.popularSearches}
                  onSelect={applySuggestion}
                />
              </>
            )}
          </div>

          <section
            id="header-search-results"
            aria-labelledby="header-search-status"
            aria-busy={isSearching}
            className="mt-5"
          >
            <div className="mb-5 flex min-h-8 items-center justify-between gap-5">
              <p
                id="header-search-status"
                role="status"
                aria-live="polite"
                className="header-type-label text-subtle"
              >
                {isSearching ? "Searching catalogue…" : resultSummary}
              </p>
              {!isSearching && normalizedQuery && matchingProducts.length > 0 ? (
                <a
                  href={resultsUrl}
                  className="header-type-action group inline-flex min-h-11 items-center gap-2"
                  onClick={navigateFromResults}
                >
                  View all results
                  <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                </a>
              ) : null}
            </div>

            {isSearching ? (
              <LoadingResults />
            ) : visibleProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:gap-x-6 lg:grid-cols-4">
                {visibleProducts.map((product) => (
                  <ProductResult
                    key={product.id}
                    product={product}
                    onNavigate={navigateFromResults}
                  />
                ))}
              </div>
            ) : (
              <>
                <div className="border-b border-line-soft pb-7 sm:pb-8">
                  <h3 className="text-base font-medium tracking-[-0.01em] text-ink">
                    No exact matches
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-copy">
                    Check the spelling or try a broader material, shape or designer name.
                  </p>
                </div>
                <div className="pt-5">
                  <p className="header-type-label mb-5 text-subtle">You may also like</p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:gap-x-6 lg:grid-cols-4">
                    {popularProducts.map((product) => (
                      <ProductResult key={product.id} product={product} onNavigate={onClose} />
                    ))}
                  </div>
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </motion.section>
  );
}
