import { NextResponse } from "next/server";
import pool from "@/lib/db";

// POST API - To save form data to the MySQL database
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { studentName, parentName, classApplying, mobileNumber, email, message } = body;

    // Parameterized query to prevent SQL Injection
    const query = `
      INSERT INTO enquiries (studentName, parentName, classApplying, mobileNumber, email, message)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [studentName, parentName, classApplying, mobileNumber, email, message || ""];

    // Execute the query
    const [result]: any = await pool.query(query, values);

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully",
      insertId: result.insertId
    }, { status: 201 });

  } catch (error: any) {
    console.error("POST Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// GET API - To fetch data with Pagination
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse page and limit from the URL, default to page 1 and 10 items
    const page = parseInt(searchParams.get("page") || "1") || 1;
    const limit = parseInt(searchParams.get("limit") || "10") || 10;

    // Calculate the OFFSET for MySQL
    const offset = (page - 1) * limit;

    // 1. Get the total count of rows (required for frontend pagination UI)
    const [countResult]: any = await pool.query('SELECT COUNT(*) as total FROM enquiries');
    const totalItems = countResult[0].total;

    // 2. Fetch the actual paginated data, newest first
    const query = 'SELECT * FROM enquiries ORDER BY createdAt DESC LIMIT ? OFFSET ?';

    // Notice we pass [limit, offset] as an array of values
    const [rows] = await pool.query(query, [limit, offset]);

    return NextResponse.json({
      success: true,
      data: rows,
      pagination: {
        totalItems: totalItems,
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        itemsPerPage: limit
      }
    }, { status: 200 });

  } catch (error: any) {
    console.error("GET Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
