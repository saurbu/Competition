import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const competition = await prisma.competition.findUnique({
      where: {
        slug,
      },
      include: {
        prizes: true,
        eligibility: true,
        rules: true,
        instructions: true,
      },
    });

    if (!competition) {
      return NextResponse.json(
        { error: "Competition not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(competition);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch competition" },
      { status: 500 }
    );
  }
}