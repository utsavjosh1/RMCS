import { NextResponse } from "next/server";
import prisma from "@/db/prisma";

export const GET = async () => {
  try {
    const rooms = await prisma.gameRoom.findMany({
      include: {
        players: true,
        playersList: {
          select: {
            id: true,
            name: true,
            isReady: true,
            joinedAt: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 50, 
    });

    return NextResponse.json({ success: true, data: rooms }, { status: 200 });
  } catch (error) {
    console.error("❌ Failed to fetch game rooms:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
};
