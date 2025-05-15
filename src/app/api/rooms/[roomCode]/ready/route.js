import { NextResponse } from "next/server";
import prisma from "@/db/prisma";

export async function POST(request, { params }) {
  try {
    const { roomCode } = params;
    const body = await request.json();
    const { userId, isReady } = body;

    // Verify that the room exists
    const room = await prisma.gameRoom.findFirst({
      where: { roomCode },
      include: {
        playersList: {
          where: { id: userId }
        }
      }
    });

    if (!room) {
      return NextResponse.json(
        { error: "Room not found" },
        { status: 404 }
      );
    }

    // Check if player exists in this room
    if (room.playersList.length === 0) {
      return NextResponse.json(
        { error: "Player not in this room" },
        { status: 404 }
      );
    }

    // Update the player's ready status
    const player = await prisma.player.update({
      where: {
        id: userId,
      },
      data: {
        isReady
      }
    });

    return NextResponse.json({
      success: true,
      player
    });
  } catch (error) {
    console.error("Error updating player ready status:", error);
    return NextResponse.json(
      { error: "Failed to update player ready status" },
      { status: 500 }
    );
  }
} 