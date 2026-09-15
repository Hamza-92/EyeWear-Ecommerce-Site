export interface HomeHeroContent {
  eyebrow: string;
  title: string;
  description: string;
  actions: readonly {
    label: string;
    href: string;
    emphasis: "primary" | "quiet";
  }[];
  media: {
    alt: string;
    desktop: {
      src: string;
      width: number;
      height: number;
    };
    mobile: {
      src: string;
      width: number;
      height: number;
    };
  };
}

export const homeHeroContent: HomeHeroContent = {
  eyebrow: "The new perspective",
  title: "A clearer point of view.",
  description:
    "Lightweight frames, considered proportions, and lenses chosen around the way you live.",
  actions: [
    {
      label: "Shop eyeglasses",
      href: "/eyeglasses",
      emphasis: "primary",
    },
    {
      label: "Shop sunglasses",
      href: "/sunglasses",
      emphasis: "quiet",
    },
  ],
  media: {
    alt: "Model wearing translucent crystal eyeglasses in a warm modernist interior",
    desktop: {
      src: "/images/home/hero-desktop.jpg",
      width: 1536,
      height: 1024,
    },
    mobile: {
      src: "/images/home/hero-mobile.jpg",
      width: 1024,
      height: 1536,
    },
  },
};
