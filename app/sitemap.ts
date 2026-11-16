import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/landing-data";
import {
  SITE_CONFIG,
  TOOL_PAGE_ROUTES,
  TRUST_PAGE_ROUTES,
} from "@/lib/site-config";

const HIGH_PRIORITY_ROUTES = new Set<string>([
  "/how-it-works",
  "/bank-reconciliation-guide",
  "/bank-reconciliation-methodology",
  "/faq",
  "/security",
  ...TOOL_PAGE_ROUTES,
]);

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = SITE_CONFIG.lastReviewedDate;

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/reconcile`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...[...TRUST_PAGE_ROUTES, ...TOOL_PAGE_ROUTES].map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified,
      changeFrequency: HIGH_PRIORITY_ROUTES.has(route)
        ? ("monthly" as const)
        : ("yearly" as const),
      priority: HIGH_PRIORITY_ROUTES.has(route) ? 0.8 : 0.6,
    })),
  ];
}
