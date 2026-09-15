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

export interface HomepageProduct {
  id: string;
  brand: string;
  name: string;
  category: "Eyeglasses" | "Sunglasses";
  material: string;
  price: string;
  colourCount: number;
  href: string;
  primaryImage: {
    src: string;
    alt: string;
  };
  alternateImage: {
    src: string;
  };
}

export interface NewAndConsideredContent {
  eyebrow: string;
  title: string;
  description: string;
  viewAllLabel: string;
  viewAllHref: string;
  products: readonly HomepageProduct[];
}

export const newAndConsideredContent: NewAndConsideredContent = {
  eyebrow: "New & considered",
  title: "Frames worth a closer look.",
  description:
    "Four distinctive silhouettes, selected for material, proportion, and the way they frame a face.",
  viewAllLabel: "View new arrivals",
  viewAllHref: "/new-in",
  products: [
    {
      id: "aster-row-atelier-01",
      brand: "Aster & Row",
      name: "Atelier 01",
      category: "Eyeglasses",
      material: "Crystal acetate",
      price: "£245",
      colourCount: 4,
      href: "/eyeglasses/aster-row-atelier-01",
      primaryImage: {
        src: "/images/products/home-edit/atelier-01-still.jpg",
        alt: "Crystal acetate Atelier 01 eyeglasses resting on pale travertine",
      },
      alternateImage: {
        src: "/images/products/home-edit/atelier-01-on-face.jpg",
      },
    },
    {
      id: "kanso-hikari",
      brand: "Kanso Studio",
      name: "Hikari",
      category: "Eyeglasses",
      material: "Brushed titanium",
      price: "£285",
      colourCount: 3,
      href: "/eyeglasses/kanso-studio-hikari",
      primaryImage: {
        src: "/images/products/home-edit/hikari-still.jpg",
        alt: "Graphite titanium Hikari eyeglasses on a charcoal stone plinth",
      },
      alternateImage: {
        src: "/images/products/home-edit/hikari-on-face.jpg",
      },
    },
    {
      id: "form-atelier-cava",
      brand: "Form Atelier",
      name: "Cava",
      category: "Sunglasses",
      material: "Tortoiseshell acetate",
      price: "£260",
      colourCount: 3,
      href: "/sunglasses/form-atelier-cava",
      primaryImage: {
        src: "/images/products/home-edit/cava-still.jpg",
        alt: "Dark tortoiseshell Cava sunglasses displayed on cream linen",
      },
      alternateImage: {
        src: "/images/products/home-edit/cava-on-face.jpg",
      },
    },
    {
      id: "lumen-works-solis",
      brand: "Lumen Works",
      name: "Solis",
      category: "Sunglasses",
      material: "Black titanium",
      price: "£235",
      colourCount: 2,
      href: "/sunglasses/lumen-works-solis",
      primaryImage: {
        src: "/images/products/home-edit/solis-still.jpg",
        alt: "Black titanium Solis sunglasses on a warm architectural ledge",
      },
      alternateImage: {
        src: "/images/products/home-edit/solis-on-face.jpg",
      },
    },
  ],
};
