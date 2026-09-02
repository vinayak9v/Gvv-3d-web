import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/about/achievements");
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
