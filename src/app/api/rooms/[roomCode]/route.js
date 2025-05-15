import { NextResponse } from "next/server";
import prisma from "@/db/prisma";

export async function GET(request, { params }) {
  try {
    const { roomCode } = params;

    // Fetch room with related data in a single query for better performance
    const room = await prisma.gameRoom.findFirst({
      where: { roomCode },
      include: {
        players: true,
        playersList: {
          select: {
            id: true,
            name: true,
            isReady: true,
            joinedAt: true,
            userId: true
          }
        }
      }
    });

    if (!room) {
      return NextResponse.json(
        { error: "Room not found" },
        { status: 404 }
      );
    }

    // Return room data
    return NextResponse.json({ 
      success: true,
      data: room 
    });
  } catch (error) {
    console.error("Error fetching room:", error);
    return NextResponse.json(
      { error: "Failed to fetch room data" },
      { status: 500 }
    );
  }
} 