import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RegisterRouteProps {
  params: Promise<{ id: string }>;
}

export async function POST(
  request: Request,
  { params }: RegisterRouteProps
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const college = String(body.college || "").trim();

    if (!name || !email || !phone || !college) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    const competition = await prisma.competition.findUnique({
      where: {
        id,
      },
    });

    if (!competition) {
      return NextResponse.json(
        {
          success: false,
          message: "Competition not found",
        },
        { status: 404 }
      );
    }

    const registration =
      await prisma.competitionRegistration.create({
        data: {
          competitionId: id,
          name,
          email,
          phone,
          college,
        },
      });

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful",
        registration,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Registration failed",
      },
      { status: 500 }
    );
  }
}