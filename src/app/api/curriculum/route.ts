import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { isAuthorizedAdminRequest } from "@/lib/auth";
import { saveUploadedFile, isUsableUploadedFile } from "@/lib/upload";

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM curriculums ORDER BY id ASC');
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
    const file = formData.get("pdf");

    if (typeof title !== "string" || !title || !isUsableUploadedFile(file)) {
      return NextResponse.json({ success: false, error: "Title and PDF file are required" }, { status: 400 });
    }

    const pdfUrl = await saveUploadedFile(file, "pdf");

    const [result]: any = await pool.query(
      'INSERT INTO curriculums (title, pdf_url) VALUES (?, ?)',
      [title, pdfUrl]
    );

    return NextResponse.json({
      success: true,
      message: "Curriculum added successfully",
      data: { id: result.insertId, title, pdf_url: pdfUrl }
    }, { status: 201 });

  } catch (error: any) {
    console.error("POST Curriculum Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
