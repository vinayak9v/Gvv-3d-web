import { NextResponse } from "next/server";
import pool from "@/lib/db";

// GET API - Fetch all fee structures
export async function GET() {
  try {
    // ID ke hisaab se sort kar rahe hain taaki classes line se aayein (Nursery, LKG, 1, 2, etc.)
    const [rows] = await pool.query('SELECT * FROM fees ORDER BY id ASC');
    return NextResponse.json({ success: true, data: rows }, { status: 200 });
  } catch (error: any) {
    console.error("GET Fees Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST API - Add new fee structure
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { className, installment1, installment2, installment3, annualAllocation } = body;

    // Backend par total calculate karna safe hota hai
    const totalFee =
      Number(installment1 || 0) +
      Number(installment2 || 0) +
      Number(installment3 || 0) +
      Number(annualAllocation || 0);

    const query = `
      INSERT INTO fees (className, installment1, installment2, installment3, annualAllocation, totalFee)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
      className,
      installment1 || 0,
      installment2 || 0,
      installment3 || 0,
      annualAllocation || 0,
      totalFee
    ];

    const [result]: any = await pool.query(query, values);

    return NextResponse.json({
      success: true,
      message: "Fee structure added successfully",
      insertId: result.insertId
    }, { status: 201 });

  } catch (error: any) {
    console.error("POST Fees Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
