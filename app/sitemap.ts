import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/landing-data";
import { TRUST_PAGE_ROUTES } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
    },
    {
      url: `${SITE_URL}/reconcile`,
    },
    ...TRUST_PAGE_ROUTES.map((route) => ({
      url: `${SITE_URL}${route}`,
    })),
  ];
}
