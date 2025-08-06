import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  const { clerkUserId, email, name, imageUrl } = body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { clerkUserId },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: {
          clerkUserId,
          email,
          name,
          imageUrl,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("User insert failed:", error);
    return new NextResponse("User insert failed", { status: 500 });
  }
}
