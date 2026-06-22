import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await req.json();
    const { id } = await params;

    const fee = await prisma.feeStructure.update({
      where: {
        id: Number(id),
      },
      data: {
        className: body.className,
        installment1: body.installment1,
        installment2: body.installment2,
        installment3: body.installment3,
        annualAllocation: body.annualAllocation,
        totalFee: body.totalFee,
      },
    });

    return NextResponse.json({
      success: true,
      data: fee,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update fee" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.feeStructure.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Fee deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete fee" },
      { status: 500 }
    );
  }
}