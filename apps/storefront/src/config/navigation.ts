export type NavigationLink = Readonly<{
  label: string;
  href: string;
}>;

export type NavigationSection = Readonly<{
  title: string;
  links: readonly NavigationLink[];
}>;

export type NavigationPromotion = Readonly<{
  eyebrow: string;
  title: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: string;
}>;

export type NavigationItem = Readonly<{
  id: string;
  label: string;
  href: string;
  sections: readonly NavigationSection[];
  promotions: readonly NavigationPromotion[];
}>;

const opticalPortrait = "/images/navigation/optical-portrait.png";
const sunglassesStillLife = "/images/navigation/sunglasses-still-life.png";

export const utilityNavigation = [
  { label: "Book an eye test", href: "/services/eye-tests" },
  { label: "Find a store", href: "/stores" },
  { label: "Help", href: "/help" },
] as const satisfies readonly NavigationLink[];

export const primaryNavigation = [
  {
    id: "new-in",
    label: "New in",
    href: "/collections/new-arrivals",
    sections: [
      {
        title: "Latest",
        links: [
          { label: "New optical", href: "/collections/new-optical" },
          { label: "New sunglasses", href: "/collections/new-sunglasses" },
          { label: "Limited editions", href: "/collections/limited-editions" },
          { label: "Editor’s selection", href: "/collections/editors-selection" },
        ],
      },
      {
        title: "Discover",
        links: [
          { label: "The new perspective", href: "/editorial/new-perspective" },
          { label: "Material stories", href: "/editorial/material-stories" },
          { label: "Seasonal silhouettes", href: "/editorial/seasonal-silhouettes" },
          { label: "The gift edit", href: "/gifts" },
        ],
      },
      {
        title: "Shop by",
        links: [
          { label: "Women", href: "/women/new-arrivals" },
          { label: "Men", href: "/men/new-arrivals" },
          { label: "Unisex", href: "/unisex/new-arrivals" },
          { label: "Teens", href: "/teens/new-arrivals" },
        ],
      },
    ],
    promotions: [
      {
        eyebrow: "The optical edit",
        title: "Subtle forms, considered details",
        href: "/collections/new-optical",
        imageSrc: opticalPortrait,
        imageAlt: "Model wearing translucent optical frames in warm architectural light",
      },
      {
        eyebrow: "Just arrived",
        title: "Sunglasses shaped by light",
        href: "/collections/new-sunglasses",
        imageSrc: sunglassesStillLife,
        imageAlt: "Tortoiseshell sunglasses displayed on limestone and dark metal",
      },
    ],
  },
  {
    id: "eyeglasses",
    label: "Eyeglasses",
    href: "/eyeglasses",
    sections: [
      {
        title: "Silhouette",
        links: [
          { label: "Cat-eye", href: "/eyeglasses/cat-eye" },
          { label: "Round", href: "/eyeglasses/round" },
          { label: "Square", href: "/eyeglasses/square" },
          { label: "Aviator", href: "/eyeglasses/aviator" },
        ],
      },
      {
        title: "Material",
        links: [
          { label: "Acetate", href: "/eyeglasses/acetate" },
          { label: "Titanium", href: "/eyeglasses/titanium" },
          { label: "Metal", href: "/eyeglasses/metal" },
          { label: "Mixed material", href: "/eyeglasses/mixed-material" },
        ],
      },
      {
        title: "Fit",
        links: [
          { label: "Low bridge", href: "/eyeglasses/low-bridge" },
          { label: "Wide fit", href: "/eyeglasses/wide-fit" },
          { label: "Petite", href: "/eyeglasses/petite" },
          { label: "Adjustable nose pads", href: "/eyeglasses/adjustable-nose-pads" },
        ],
      },
    ],
    promotions: [
      {
        eyebrow: "Frame focus",
        title: "The quiet confidence of crystal acetate",
        href: "/eyeglasses/acetate",
        imageSrc: opticalPortrait,
        imageAlt: "Model wearing translucent optical frames in warm architectural light",
      },
      {
        eyebrow: "Fit guide",
        title: "Find a frame that feels made for you",
        href: "/guides/frame-fit",
        imageSrc: sunglassesStillLife,
        imageAlt: "Tortoiseshell frame displayed on sculptural stone and metal",
      },
    ],
  },
  {
    id: "sunglasses",
    label: "Sunglasses",
    href: "/sunglasses",
    sections: [
      {
        title: "Style",
        links: [
          { label: "Statement", href: "/sunglasses/statement" },
          { label: "Everyday", href: "/sunglasses/everyday" },
          { label: "Aviator", href: "/sunglasses/aviator" },
          { label: "Sport-inspired", href: "/sunglasses/sport-inspired" },
        ],
      },
      {
        title: "Lens",
        links: [
          { label: "Polarised", href: "/sunglasses/polarised" },
          { label: "Gradient", href: "/sunglasses/gradient" },
          { label: "Photochromic", href: "/sunglasses/photochromic" },
          { label: "Prescription-ready", href: "/sunglasses/prescription-ready" },
        ],
      },
      {
        title: "Shop by",
        links: [
          { label: "Women", href: "/women/sunglasses" },
          { label: "Men", href: "/men/sunglasses" },
          { label: "Unisex", href: "/unisex/sunglasses" },
          { label: "All sunglasses", href: "/sunglasses" },
        ],
      },
    ],
    promotions: [
      {
        eyebrow: "Sun edit",
        title: "Architectural lines for brighter days",
        href: "/sunglasses",
        imageSrc: sunglassesStillLife,
        imageAlt: "Tortoiseshell sunglasses displayed on limestone and dark metal",
      },
      {
        eyebrow: "Lens guide",
        title: "Clarity, tint and protection explained",
        href: "/guides/sun-lenses",
        imageSrc: opticalPortrait,
        imageAlt: "Close portrait showing the fit and proportions of an eyewear frame",
      },
    ],
  },
  {
    id: "designers",
    label: "Designers",
    href: "/designers",
    sections: [
      {
        title: "Featured houses",
        links: [
          { label: "Aster & Row", href: "/designers/aster-and-row" },
          { label: "Form Atelier", href: "/designers/form-atelier" },
          { label: "Kanso Studio", href: "/designers/kanso-studio" },
          { label: "Lumen Works", href: "/designers/lumen-works" },
        ],
      },
      {
        title: "Browse",
        links: [
          { label: "Designers A–Z", href: "/designers" },
          { label: "Independent makers", href: "/designers/independent" },
          { label: "Japanese craft", href: "/designers/japanese-craft" },
          { label: "New designers", href: "/designers/new" },
        ],
      },
      {
        title: "Curated editions",
        links: [
          { label: "Titanium edit", href: "/collections/titanium" },
          { label: "Heritage acetate", href: "/collections/heritage-acetate" },
          { label: "Limited colourways", href: "/collections/limited-colourways" },
          { label: "Responsible materials", href: "/collections/responsible-materials" },
        ],
      },
    ],
    promotions: [
      {
        eyebrow: "Maker story",
        title: "Where precision becomes character",
        href: "/editorial/maker-story",
        imageSrc: opticalPortrait,
        imageAlt: "Editorial portrait featuring finely detailed translucent eyewear",
      },
      {
        eyebrow: "Material study",
        title: "Acetate, titanium and enduring form",
        href: "/editorial/material-study",
        imageSrc: sunglassesStillLife,
        imageAlt: "Detailed tortoiseshell sunglasses on contrasting architectural surfaces",
      },
    ],
  },
  {
    id: "services",
    label: "Services",
    href: "/services",
    sections: [
      {
        title: "Your vision",
        links: [
          { label: "Book an eye test", href: "/services/eye-tests" },
          { label: "Upload a prescription", href: "/services/prescriptions" },
          { label: "Lens guide", href: "/guides/lenses" },
          { label: "Measure your PD", href: "/guides/pupillary-distance" },
        ],
      },
      {
        title: "Aftercare",
        links: [
          { label: "Frame adjustment", href: "/services/frame-adjustment" },
          { label: "Repairs", href: "/services/repairs" },
          { label: "Warranty", href: "/help/warranty" },
          { label: "Delivery & returns", href: "/help/delivery-returns" },
        ],
      },
      {
        title: "Explore",
        links: [
          { label: "Virtual try-on", href: "/virtual-try-on" },
          { label: "Style consultation", href: "/services/style-consultation" },
          { label: "Store locator", href: "/stores" },
          { label: "Help & contact", href: "/help" },
        ],
      },
    ],
    promotions: [
      {
        eyebrow: "Personal service",
        title: "Expert guidance, from first look to final fit",
        href: "/services/style-consultation",
        imageSrc: opticalPortrait,
        imageAlt: "Model wearing fitted optical frames in soft natural light",
      },
      {
        eyebrow: "Frame care",
        title: "Keep every detail at its best",
        href: "/services/frame-adjustment",
        imageSrc: sunglassesStillLife,
        imageAlt: "Carefully presented eyewear showing frame and hinge details",
      },
    ],
  },
] as const satisfies readonly NavigationItem[];
