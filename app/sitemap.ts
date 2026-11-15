import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/landing-data";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: "2026-11-15",
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
