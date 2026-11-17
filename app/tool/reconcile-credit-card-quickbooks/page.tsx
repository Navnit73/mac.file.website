import {
  SoftwareGuidePage,
  softwareGuidePath,
} from "@/components/tool/software-guide-page";
import { QUICKBOOKS_CARD_GUIDE as guide } from "@/lib/software-guides/quickbooks";
import { createPageMetadata } from "@/lib/site-config";

export const metadata = createPageMetadata({
  path: softwareGuidePath(guide),
  title: guide.metaTitle,
  description: guide.description,
  keywords: [guide.keyword, ...guide.secondaryKeywords],
  type: "article",
});

export default function Page() {
  return <SoftwareGuidePage guide={guide} />;
}
