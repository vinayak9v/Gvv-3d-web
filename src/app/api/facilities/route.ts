import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { isAuthorizedAdminRequest } from "@/lib/auth";
import { saveUploadedFile, isUsableUploadedFile } from "@/lib/upload";

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM facilities ORDER BY created_at DESC');
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
    const name = formData.get("name");
    const file = formData.get("image");

    if (typeof name !== "string" || !name || !isUsableUploadedFile(file)) {
      return NextResponse.json({ success: false, error: "Name and image are required" }, { status: 400 });
    }

    const imageUrl = await saveUploadedFile(file, "facilities");

    const [result]: any = await pool.query(
      'INSERT INTO facilities (name, image_url) VALUES (?, ?)',
      [name, imageUrl]
    );

    return NextResponse.json({ success: true, message: "Facility added successfully", insertId: result.insertId }, { status: 201 });

  } catch (error: any) {
    console.error("Upload Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
