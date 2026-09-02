import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { isAuthorizedAdminRequest } from "@/lib/auth";
import { saveUploadedFile, deleteUploadedFile, isUsableUploadedFile } from "@/lib/upload";

export async function GET() {
  try {
    const [rows] = await pool.query(
      "SELECT image_key, image_url, updated_at FROM site_images"
    );
    return NextResponse.json({ success: true, data: rows }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAuthorizedAdminRequest(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  try {
    const formData = await request.formData();
    const key = formData.get("key");
    const file = formData.get("image");

    if (typeof key !== "string" || !key || !isUsableUploadedFile(file)) {
      return NextResponse.json({ success: false, error: "key and image are required" }, { status: 400 });
    }

    const [existingRows]: any = await pool.query(
      "SELECT image_url FROM site_images WHERE image_key = ? LIMIT 1",
      [key]
    );
    const previousUrl = existingRows?.[0]?.image_url;

    const imageUrl = await saveUploadedFile(file, "site-images");

    await pool.query(
      `INSERT INTO site_images (image_key, image_url)
       VALUES (?, ?)
       ON DUPLICATE KEY UPDATE image_url = VALUES(image_url)`,
      [key, imageUrl]
    );

    if (previousUrl) await deleteUploadedFile(previousUrl);

    return NextResponse.json({ success: true, message: "Image updated successfully", url: imageUrl }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
