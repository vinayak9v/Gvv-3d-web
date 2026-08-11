import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { isAuthorizedAdminRequest } from "@/lib/auth";
import { saveUploadedFile, isUsableUploadedFile } from "@/lib/upload";

// Helper function to format file size
const formatFileSize = (bytes: number) => {
  if (bytes >= 1048576) {
    return (bytes / 1048576).toFixed(1) + " MB";
  } else {
    return (bytes / 1024).toFixed(0) + " KB";
  }
};

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM download_forms ORDER BY id DESC');
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
    const description = formData.get("description");
    const file = formData.get("pdf");

    if (typeof title !== "string" || typeof description !== "string" || !title || !description || !isUsableUploadedFile(file)) {
      return NextResponse.json({ success: false, error: "Title, Description, and PDF are required" }, { status: 400 });
    }

    // Calculate file size dynamically
    const fileSize = formatFileSize(file.size);

    const pdfUrl = await saveUploadedFile(file, "forms");

    const [result]: any = await pool.query(
      'INSERT INTO download_forms (title, description, file_size, pdf_url) VALUES (?, ?, ?, ?)',
      [title, description, fileSize, pdfUrl]
    );

    return NextResponse.json({ success: true, message: "Form uploaded successfully", insertId: result.insertId }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
