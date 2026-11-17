import {
  SoftwareGuidePage,
  softwareGuidePath,
} from "@/components/tool/software-guide-page";
import { XERO_GUIDE as guide } from "@/lib/software-guides/xero-netsuite";
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
