import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { isAuthorizedAdminRequest } from "@/lib/auth";
import { saveUploadedFile, isUsableUploadedFile } from "@/lib/upload";

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM gallery ORDER BY id DESC');
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
    const title = formData.get("title");
    const category = formData.get("category");
    const file = formData.get("image");

    if (typeof title !== "string" || typeof category !== "string" || !title || !category || !isUsableUploadedFile(file)) {
      return NextResponse.json({ success: false, error: "Title, Category, and Image are required" }, { status: 400 });
    }

    const imageUrl = await saveUploadedFile(file, "gallery");

    const [result]: any = await pool.query(
      'INSERT INTO gallery (title, category, image_url) VALUES (?, ?, ?)',
      [title, category, imageUrl]
    );

    return NextResponse.json({ success: true, message: "Image added successfully", insertId: result.insertId }, { status: 201 });

  } catch (error: any) {
    console.error("POST Gallery Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
