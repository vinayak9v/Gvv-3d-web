import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getPageMetadata } from "@/lib/seo";
import "./globals.css";

// ISR: pages are cached and regenerated in the background at most once a
// minute, instead of doing a full server render + DB round-trip on every
// request (force-dynamic). Admin edits (SEO fields, site images) still show
// up within ~60s — plenty fresh for a low-traffic school site — while static
// visitors get cached, fast responses.
export const revalidate = 60;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/");
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
