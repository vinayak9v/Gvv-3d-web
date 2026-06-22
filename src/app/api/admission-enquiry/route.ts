import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const enquiry = await prisma.admissionEnquiry.create({
      data: {
        studentName: body.studentName,
        parentName: body.parentName,
        classApplying: body.classApplying,
        mobileNumber: body.mobileNumber,
        email: body.email,
        message: body.message || "",
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: enquiry,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const enquiries = await prisma.admissionEnquiry.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch enquiries",
      },
      { status: 500 }
    );
  }
}