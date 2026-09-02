import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { isAuthorizedAdminRequest } from "@/lib/auth";

export async function GET() {
  try {
    const [rows] = await pool.query(
      "SELECT route, title, meta_description, updated_at FROM page_seo"
    );
    return NextResponse.json({ success: true, data: rows }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await isAuthorizedAdminRequest(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const route = typeof body?.route === "string" ? body.route.trim() : "";
    const title = typeof body?.title === "string" ? body.title.trim() : "";
    const metaDescription = typeof body?.meta_description === "string" ? body.meta_description.trim() : "";

    if (!route) {
      return NextResponse.json({ success: false, error: "route is required" }, { status: 400 });
    }

    await pool.query(
      `INSERT INTO page_seo (route, title, meta_description)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE title = VALUES(title), meta_description = VALUES(meta_description)`,
      [route, title || null, metaDescription || null]
    );

    return NextResponse.json({ success: true, message: "SEO updated successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
