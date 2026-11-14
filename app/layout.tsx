import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "File Organizer for Mac: Sort Files Automatically",
  description:
    "A file organizer for Mac that sorts your desktop, Downloads, and folders with rules you control. Preview every change and undo moves. Start your free trial today.",
  openGraph: {
    title: "File Organizer for Mac: Sort Files Automatically",
    description:
      "A file organizer for Mac that sorts your desktop, Downloads, and folders with rules you control. Preview every change and undo moves. Start your free trial today.",
    type: "website",
    url: "/",
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
