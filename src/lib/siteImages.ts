import pool from "@/lib/db";
import { findSiteImageSlot } from "@/lib/siteImageSlots";

// Server-only: reads the admin-uploaded image URL for a slot, falling back
// to the slot's original hardcoded image when nothing has been uploaded yet.
export async function getSiteImageUrl(key: string): Promise<string> {
  const fallback = findSiteImageSlot(key)?.defaultUrl ?? "";
  try {
    const [rows]: any = await pool.query(
      "SELECT image_url FROM site_images WHERE image_key = ? LIMIT 1",
      [key]
    );
    return rows?.[0]?.image_url || fallback;
  } catch {
    return fallback;
  }
}
