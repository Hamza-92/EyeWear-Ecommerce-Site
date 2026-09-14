export type SearchPreviewProduct = Readonly<{
  id: string;
  brand: string;
  name: string;
  category: "Eyeglasses" | "Sunglasses";
  material: string;
  price: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: string;
  searchTerms: readonly string[];
}>;

export type SearchPreviewContent = Readonly<{
  popularSearches: readonly string[];
  relatedSearches: readonly Readonly<{
    label: string;
    matchTerms: readonly string[];
  }>[];
  products: readonly SearchPreviewProduct[];
}>;

const opticalPortrait = "/images/navigation/optical-portrait.png";
const sunglassesStillLife = "/images/navigation/sunglasses-still-life.png";

export const searchPreviewContent = {
  popularSearches: ["Titanium", "Round", "Tortoiseshell", "Aster & Row"],
  relatedSearches: [
    {
      label: "Titanium eyeglasses",
      matchTerms: ["titanium", "hikari", "kumo", "lightweight"],
    },
    {
      label: "Round optical frames",
      matchTerms: ["round", "optical", "eyeglasses"],
    },
    {
      label: "Tortoiseshell sunglasses",
      matchTerms: ["tortoiseshell", "acetate", "sunglasses", "sun"],
    },
    {
      label: "Kanso Studio",
      matchTerms: ["kanso", "titanium", "round"],
    },
    {
      label: "Low-bridge frames",
      matchTerms: ["low bridge", "fit", "kumo"],
    },
    {
      label: "Aster & Row",
      matchTerms: ["aster", "row", "crystal", "heritage"],
    },
  ],
  products: [
    {
      id: "aster-row-atelier-01",
      brand: "Aster & Row",
      name: "Atelier 01",
      category: "Eyeglasses",
      material: "Crystal acetate",
      price: "£245",
      href: "/products/aster-row-atelier-01",
      imageSrc: opticalPortrait,
      imageAlt: "Model wearing the Atelier 01 crystal acetate optical frame",
      imagePosition: "50% 36%",
      searchTerms: ["aster", "row", "atelier", "optical", "eyeglasses", "crystal", "acetate"],
    },
    {
      id: "kanso-hikari",
      brand: "Kanso Studio",
      name: "Hikari",
      category: "Eyeglasses",
      material: "Brushed titanium",
      price: "£285",
      href: "/products/kanso-hikari",
      imageSrc: opticalPortrait,
      imageAlt: "Model wearing the Hikari lightweight titanium optical frame",
      imagePosition: "58% 34%",
      searchTerms: [
        "kanso",
        "studio",
        "hikari",
        "optical",
        "eyeglasses",
        "titanium",
        "round",
        "lightweight",
      ],
    },
    {
      id: "form-atelier-cava",
      brand: "Form Atelier",
      name: "Cava",
      category: "Sunglasses",
      material: "Tortoiseshell acetate",
      price: "£260",
      href: "/products/form-atelier-cava",
      imageSrc: sunglassesStillLife,
      imageAlt: "Cava tortoiseshell sunglasses displayed on sculptural stone",
      imagePosition: "48% 50%",
      searchTerms: [
        "form",
        "atelier",
        "cava",
        "sunglasses",
        "sun",
        "tortoiseshell",
        "acetate",
        "square",
      ],
    },
    {
      id: "lumen-solis",
      brand: "Lumen Works",
      name: "Solis",
      category: "Sunglasses",
      material: "Black titanium",
      price: "£235",
      href: "/products/lumen-solis",
      imageSrc: sunglassesStillLife,
      imageAlt: "Solis black titanium sunglasses in warm architectural light",
      imagePosition: "62% 50%",
      searchTerms: [
        "lumen",
        "works",
        "solis",
        "sunglasses",
        "sun",
        "black",
        "titanium",
        "aviator",
        "polarised",
      ],
    },
    {
      id: "aster-row-marlow",
      brand: "Aster & Row",
      name: "Marlow",
      category: "Eyeglasses",
      material: "Heritage acetate",
      price: "£225",
      href: "/products/aster-row-marlow",
      imageSrc: sunglassesStillLife,
      imageAlt: "Marlow heritage acetate frame shown against limestone and metal",
      imagePosition: "42% 48%",
      searchTerms: [
        "aster",
        "row",
        "marlow",
        "optical",
        "eyeglasses",
        "heritage",
        "acetate",
        "tortoiseshell",
      ],
    },
    {
      id: "kanso-kumo",
      brand: "Kanso Studio",
      name: "Kumo",
      category: "Eyeglasses",
      material: "Fine titanium",
      price: "£295",
      href: "/products/kanso-kumo",
      imageSrc: opticalPortrait,
      imageAlt: "Model wearing the Kumo fine titanium low-bridge frame",
      imagePosition: "45% 32%",
      searchTerms: [
        "kanso",
        "studio",
        "kumo",
        "optical",
        "eyeglasses",
        "titanium",
        "round",
        "low bridge",
      ],
    },
  ],
} as const satisfies SearchPreviewContent;
