import { NextResponse } from "next/server";
import pool from "@/lib/db";

// PUT API - Update existing fee structure
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { className, installment1, installment2, installment3, annualAllocation } = body;

    // Recalculate total safely
    const totalFee =
      Number(installment1 || 0) +
      Number(installment2 || 0) +
      Number(installment3 || 0) +
      Number(annualAllocation || 0);

    const query = `
      UPDATE fees
      SET className = ?, installment1 = ?, installment2 = ?, installment3 = ?, annualAllocation = ?, totalFee = ?
      WHERE id = ?
    `;

    const values = [
      className,
      installment1 || 0,
      installment2 || 0,
      installment3 || 0,
      annualAllocation || 0,
      totalFee,
      id
    ];

    const [result]: any = await pool.query(query, values);

    if (result.affectedRows === 0) {
      return NextResponse.json({ success: false, error: "Record not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Fee structure updated successfully" }, { status: 200 });

  } catch (error: any) {
    console.error("UPDATE Fees Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE API - Delete fee structure
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const [result]: any = await pool.query('DELETE FROM fees WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ success: false, error: "Record not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Fee structure deleted successfully" }, { status: 200 });

  } catch (error: any) {
    console.error("DELETE Fees Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
