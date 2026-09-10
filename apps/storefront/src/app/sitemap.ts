import type { MetadataRoute } from "next";
import { storeConfig } from "@/config/store";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: storeConfig.url,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
