import Image from "next/image";

import { ArrowRightIcon } from "@/components/icons/header-icons";
import type { ShopByIntentContent, ShopByIntentItem } from "@/config/homepage";

function IntentCard({
  item,
  revealDelay,
}: Readonly<{ item: ShopByIntentItem; revealDelay: number }>) {
  const titleId = `shop-by-intent-${item.id}-title`;

  return (
    <article
      className={`home-intent-card home-intent-card--${item.prominence}`}
      data-intent={item.id}
      data-scroll-reveal
      data-scroll-reveal-delay={revealDelay}
    >
      <a aria-labelledby={titleId} className="home-intent-card__link" href={item.href}>
        <div className="home-intent-card__media">
          <Image
            alt={item.image.alt}
            className="home-intent-card__image"
            fill
            sizes={
              item.prominence === "feature"
                ? "(max-width: 767px) 100vw, (max-width: 1099px) 100vw, 57vw"
                : "(max-width: 767px) 100vw, (max-width: 1099px) 50vw, 41vw"
            }
            src={item.image.src}
          />
        </div>

        <div className="home-intent-card__body">
          <p className="home-intent-card__label">{item.label}</p>
          <h3 id={titleId}>{item.title}</h3>
          <p className="home-intent-card__description">{item.description}</p>

          <span aria-hidden="true" className="home-intent-card__action">
            <span className="home-intent-card__action-label">{item.actionLabel}</span>
            <ArrowRightIcon />
          </span>
        </div>
      </a>
    </article>
  );
}

export function ShopByIntent({ content }: Readonly<{ content: ShopByIntentContent }>) {
  return (
    <section aria-labelledby="shop-by-intent-title" className="home-intent">
      <div className="ui-container">
        <header className="home-intent__header" data-scroll-reveal>
          <div className="home-intent__heading">
            <p className="home-intent__eyebrow">{content.eyebrow}</p>
            <h2 id="shop-by-intent-title">{content.title}</h2>
          </div>
          <p className="home-intent__description">{content.description}</p>
        </header>

        <div className="home-intent__grid">
          {content.items.map((item, index) => (
            <IntentCard item={item} key={item.id} revealDelay={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
