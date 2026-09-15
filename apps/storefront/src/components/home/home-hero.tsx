import { getImageProps } from "next/image";
import type { HomeHeroContent } from "@/config/homepage";

interface HomeHeroProps {
  content: HomeHeroContent;
}

export function HomeHero({ content }: HomeHeroProps) {
  const {
    props: { srcSet: desktopSrcSet, ...desktopImageProps },
  } = getImageProps({
    alt: content.media.alt,
    src: content.media.desktop.src,
    width: content.media.desktop.width,
    height: content.media.desktop.height,
    sizes: "100vw",
    quality: 88,
    fetchPriority: "high",
  });
  const {
    props: { srcSet: mobileSrcSet },
  } = getImageProps({
    alt: content.media.alt,
    src: content.media.mobile.src,
    width: content.media.mobile.width,
    height: content.media.mobile.height,
    sizes: "100vw",
    quality: 88,
    fetchPriority: "high",
  });

  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <picture className="home-hero__picture">
        <source media="(max-width: 47.999rem)" sizes="100vw" srcSet={mobileSrcSet} />
        <source media="(min-width: 48rem)" sizes="100vw" srcSet={desktopSrcSet} />
        <img {...desktopImageProps} alt={content.media.alt} className="home-hero__image" />
      </picture>
      <div className="home-hero__veil" aria-hidden="true" />

      <div className="home-hero__content ui-container">
        <div className="home-hero__copy">
          <p className="home-hero__eyebrow ui-eyebrow">{content.eyebrow}</p>
          <h1 id="home-hero-title" className="home-hero__title">
            {content.title}
          </h1>
          <p className="home-hero__description">{content.description}</p>
          <div className="home-hero__actions" aria-label="Shop the collection">
            {content.actions.map((action) => (
              <a
                key={action.href}
                href={action.href}
                className={`ui-button ui-button--${action.emphasis}`}
              >
                <span>{action.label}</span>
                {action.emphasis === "quiet" ? (
                  <svg className="home-hero__action-arrow" viewBox="0 0 16 12" aria-hidden="true">
                    <path d="M1 6h13M10 2l4 4-4 4" />
                  </svg>
                ) : null}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
