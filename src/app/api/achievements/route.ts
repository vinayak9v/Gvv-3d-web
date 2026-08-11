import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { isAuthorizedAdminRequest } from "@/lib/auth";
import { saveUploadedFile, isUsableUploadedFile } from "@/lib/upload";

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM achievements ORDER BY id DESC');
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
    const details = formData.get("details");
    const file = formData.get("image");

    if (typeof title !== "string" || typeof category !== "string" || typeof details !== "string" || !title || !category || !details || !isUsableUploadedFile(file)) {
      return NextResponse.json({ success: false, error: "Title, category, details and image are required" }, { status: 400 });
    }

    const imageName = file.name.replace(/\s+/g, '_');
    const imageUrl = await saveUploadedFile(file, "achievements");

    const [result]: any = await pool.query(
      'INSERT INTO achievements (category, image_name, image_url, title, details) VALUES (?, ?, ?, ?, ?)',
      [category, imageName, imageUrl, title, details]
    );

    return NextResponse.json({ success: true, message: "Achievement added successfully", insertId: result.insertId }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
