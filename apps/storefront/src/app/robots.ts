import type { MetadataRoute } from "next";
import { storeConfig } from "@/config/store";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: storeConfig.indexable
      ? { userAgent: "*", allow: "/" }
      : { userAgent: "*", disallow: "/" },
    sitemap: storeConfig.indexable ? `${storeConfig.url}/sitemap.xml` : undefined,
  };
}
