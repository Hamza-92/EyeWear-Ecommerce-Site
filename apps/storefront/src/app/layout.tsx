import type { Metadata } from "next";
import type { ReactNode } from "react";
import { StorefrontHeader } from "@/components/layout/storefront-header";
import { storeConfig } from "@/config/store";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(storeConfig.url),
  title: {
    default: storeConfig.name,
    template: `%s — ${storeConfig.name}`,
  },
  description: storeConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: storeConfig.locale,
    siteName: storeConfig.name,
    title: storeConfig.name,
    description: storeConfig.description,
    url: "/",
  },
  robots: {
    index: storeConfig.indexable,
    follow: storeConfig.indexable,
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang={storeConfig.locale} data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <div className="flex min-h-screen flex-col">
          <StorefrontHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
