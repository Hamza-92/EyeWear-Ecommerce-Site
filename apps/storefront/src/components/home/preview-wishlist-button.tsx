"use client";

import { useState } from "react";

import { HeartIcon } from "@/components/icons/header-icons";

interface PreviewWishlistButtonProps {
  productName: string;
}

export function PreviewWishlistButton({ productName }: Readonly<PreviewWishlistButtonProps>) {
  const [isSaved, setIsSaved] = useState(false);
  const action = isSaved ? "Remove" : "Add";

  return (
    <button
      aria-label={`${action} ${productName} ${isSaved ? "from" : "to"} wishlist`}
      aria-pressed={isSaved}
      className="home-product-card__wishlist"
      onClick={() => setIsSaved((saved) => !saved)}
      type="button"
    >
      <HeartIcon aria-hidden="true" fill={isSaved ? "currentColor" : "none"} />
    </button>
  );
}
