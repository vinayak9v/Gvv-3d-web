import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { isAuthorizedAdminRequest } from "@/lib/auth";
import { saveUploadedFile, isUsableUploadedFile } from "@/lib/upload";

// GET API - Fetch all books
export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM book_lists ORDER BY id ASC');
    return NextResponse.json({ success: true, data: rows }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST API - Upload PDF and save to DB
export async function POST(request: Request) {
  if (!(await isAuthorizedAdminRequest(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  try {
    const formData = await request.formData();
    const classes = formData.get("classes");
    const file = formData.get("pdf");

    if (typeof classes !== "string" || !classes || !isUsableUploadedFile(file)) {
      return NextResponse.json({ success: false, error: "Class name and PDF file are required" }, { status: 400 });
    }

    const pdfUrl = await saveUploadedFile(file, "books");

    const [result]: any = await pool.query(
      'INSERT INTO book_lists (classes, pdf_url) VALUES (?, ?)',
      [classes, pdfUrl]
    );

    return NextResponse.json({ success: true, message: "Book list added successfully", insertId: result.insertId }, { status: 201 });

  } catch (error: any) {
    console.error("POST BookList Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
