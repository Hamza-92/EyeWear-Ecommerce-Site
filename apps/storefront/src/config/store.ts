import type { StorefrontConfig } from "@eyewear/types";

function publicBoolean(value: string | undefined, fallback = false): boolean {
  if (value === undefined) {
    return fallback;
  }

  return value.toLowerCase() === "true";
}

export const storeConfig = {
  key: process.env.NEXT_PUBLIC_STORE_KEY ?? "default",
  name: process.env.NEXT_PUBLIC_STORE_NAME ?? "Eyewear",
  domain: process.env.NEXT_PUBLIC_STORE_DOMAIN ?? "localhost",
  url: process.env.NEXT_PUBLIC_STOREFRONT_URL ?? "http://localhost:3000",
  locale: process.env.NEXT_PUBLIC_STORE_LOCALE ?? "en",
  indexable: publicBoolean(process.env.NEXT_PUBLIC_INDEXABLE),
  description: "A considered foundation for a premium, product-led eyewear experience.",
  branding: {
    displayFont: "Instrument Serif",
    interfaceFont: "Manrope",
    logoUrl: null,
  },
} satisfies StorefrontConfig;
