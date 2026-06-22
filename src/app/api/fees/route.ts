import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      className,
      installment1,
      installment2,
      installment3,
      annualAllocation,
      totalFee,
    } = body;

    if (
      !className ||
      installment1 === undefined ||
      installment2 === undefined ||
      installment3 === undefined ||
      annualAllocation === undefined ||
      totalFee === undefined
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    const fee = await prisma.feeStructure.create({
      data: {
        className,
        installment1: Number(installment1),
        installment2: Number(installment2),
        installment3: Number(installment3),
        annualAllocation: Number(annualAllocation),
        totalFee: Number(totalFee),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Fee added successfully",
        data: fee,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE FEE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create fee",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const fees = await prisma.feeStructure.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      data: fees,
    });
  } catch (error) {
    console.error("GET FEES ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 }
    );
  }
}   