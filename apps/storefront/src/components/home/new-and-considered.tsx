import Image from "next/image";

import { ArrowRightIcon } from "@/components/icons/header-icons";
import { PreviewWishlistButton } from "@/components/home/preview-wishlist-button";
import type { HomepageProduct, NewAndConsideredContent } from "@/config/homepage";

function ProductCard({ product }: Readonly<{ product: HomepageProduct }>) {
  const fullName = `${product.brand} ${product.name}`;
  const colourLabel = `${product.colourCount} ${product.colourCount === 1 ? "colour" : "colours"}`;

  return (
    <article className="home-product-card">
      <div className="home-product-card__media">
        <a
          aria-label={`View ${fullName}`}
          className="home-product-card__image-link"
          href={product.href}
        >
          <Image
            alt={product.primaryImage.alt}
            className="home-product-card__image home-product-card__image--primary"
            fill
            sizes="(max-width: 767px) 46vw, (max-width: 1099px) 45vw, 24vw"
            src={product.primaryImage.src}
          />
          <Image
            alt=""
            aria-hidden="true"
            className="home-product-card__image home-product-card__image--alternate"
            fill
            sizes="(max-width: 767px) 46vw, (max-width: 1099px) 45vw, 24vw"
            src={product.alternateImage.src}
          />
        </a>

        <PreviewWishlistButton productName={fullName} />
      </div>

      <div className="home-product-card__details">
        <div className="home-product-card__topline">
          <p className="home-product-card__brand">{product.brand}</p>
          <p className="home-product-card__price">{product.price}</p>
        </div>

        <h3 className="home-product-card__name">
          <a href={product.href}>{product.name}</a>
        </h3>

        <p className="home-product-card__descriptor">
          {product.category} · {product.material}
        </p>
        <p className="home-product-card__colours">{colourLabel}</p>
      </div>
    </article>
  );
}

export function NewAndConsidered({ content }: Readonly<{ content: NewAndConsideredContent }>) {
  return (
    <section aria-labelledby="new-and-considered-title" className="home-product-edit">
      <div className="ui-container">
        <header className="home-product-edit__header">
          <div className="home-product-edit__heading">
            <p className="home-product-edit__eyebrow">{content.eyebrow}</p>
            <h2 id="new-and-considered-title">{content.title}</h2>
          </div>

          <div className="home-product-edit__introduction">
            <p>{content.description}</p>
            <a className="home-product-edit__view-link" href={content.viewAllHref}>
              <span className="home-product-edit__view-label">{content.viewAllLabel}</span>
              <ArrowRightIcon aria-hidden="true" />
            </a>
          </div>
        </header>

        <div className="home-product-edit__grid">
          {content.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
