import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SITE_URL } from "@/lib/landing-data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const PAGE_TITLE =
  "Reconcile Bank Statement Files & Ledgers | ClearTie Software";
const PAGE_DESCRIPTION =
  "Reconcile bank statement PDFs, images, CSV, and XLSX files against your ledger in seconds. Spot gaps, duplicates, and mismatches with XLSX/CSV export.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  applicationName: "ClearTie",
  keywords: [
    "reconcile bank statement",
    "reconciling bank statements",
    "financial reconciliation software",
    "account reconciliation software",
    "bank reconciliation software",
    "automated bank reconciliation",
    "bank account reconciliation",
    "account reconciliation meaning",
    "accounting account reconciliation",
    "bank and account reconciliation",
    "reconciliation for accounting",
    "credit card reconciliation",
    "balance sheet account reconciliation",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    type: "website",
    url: "/",
    siteName: "ClearTie",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#111214] selection:bg-[#BDF71D] selection:text-[#111214]">
        {children}
      </body>
    </html>
  );
}
