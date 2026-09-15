import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const competitions = await prisma.competition.findMany({
      where: {
        status: "PUBLISHED",
      },
      include: {
        prizes: true,
        eligibility: true,
        rules: true,
        instructions: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      competitions,
    });
  } catch (error) {
    console.error("Failed to fetch competitions:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch competitions",
      },
      {
        status: 500,
      }
    );
  }
}
