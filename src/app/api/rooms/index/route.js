import { NextResponse } from "next/server";
import prisma from "@/db/prisma";

export async function GET() {
  try {
    // Fetch all active rooms with optimized query
    const rooms = await prisma.gameRoom.findMany({
      where: {
        status: {
          in: ["waiting", "in_progress"]
        }
      },
      include: {
        players: true,
        playersList: {
          select: {
            id: true,
            name: true,
            isReady: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      },
      // Limit to a reasonable number for performance
      take: 50
    });

    return NextResponse.json({
      success: true,
      data: rooms
    });
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return NextResponse.json(
      { error: "Failed to fetch rooms" },
      { status: 500 }
    );
  }
} 