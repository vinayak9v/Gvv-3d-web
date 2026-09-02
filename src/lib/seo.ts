import type { Metadata } from "next";
import pool from "@/lib/db";
import { findSeoPage } from "@/lib/seoPages";

// Server-only: reads the admin-editable title/meta description for a route,
// falling back to the page's default copy when nothing has been saved yet.
export async function getPageMetadata(route: string): Promise<Metadata> {
  const def = findSeoPage(route);
  const fallbackTitle = def?.defaultTitle ?? "Garima Vidhya Vihar";
  const fallbackDescription = def?.defaultDescription ?? "";

  try {
    const [rows]: any = await pool.query(
      "SELECT title, meta_description FROM page_seo WHERE route = ? LIMIT 1",
      [route]
    );
    const row = rows?.[0];
    const title = typeof row?.title === "string" && row.title.trim() ? row.title.trim() : fallbackTitle;
    const description =
      typeof row?.meta_description === "string" && row.meta_description.trim()
        ? row.meta_description.trim()
        : fallbackDescription;
    return { title, description };
  } catch {
    return { title: fallbackTitle, description: fallbackDescription };
  }
}
