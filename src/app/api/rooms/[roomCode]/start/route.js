import { NextResponse } from "next/server";
import prisma from "@/db/prisma";

export async function POST(request, { params }) {
  try {
    const { roomCode } = params;
    const body = await request.json();
    const { hostId } = body;

    // Verify that the room exists
    const room = await prisma.gameRoom.findFirst({
      where: { roomCode },
      include: {
        playersList: true
      }
    });

    if (!room) {
      return NextResponse.json(
        { error: "Room not found" },
        { status: 404 }
      );
    }

    // Verify that the request is from the host
    if (room.hostId !== hostId) {
      return NextResponse.json(
        { error: "Only the host can start the game" },
        { status: 403 }
      );
    }

    // Verify that there are exactly 4 players
    if (room.playersList.length !== 4) {
      return NextResponse.json(
        { error: "Game requires exactly 4 players" },
        { status: 400 }
      );
    }

    // Verify that all players are ready
    const allReady = room.playersList.every(player => player.isReady);
    if (!allReady) {
      return NextResponse.json(
        { error: "All players must be ready" },
        { status: 400 }
      );
    }

    // Update the room status
    const updatedRoom = await prisma.gameRoom.update({
      where: { id: room.id },
      data: {
        status: "in_progress"
      },
      include: {
        playersList: true,
        players: true
      }
    });

    // Update game statistics for all authenticated players
    for (const player of room.playersList) {
      if (player.userId) {
        // Check if player has a user account
        try {
          await prisma.gameStats.upsert({
            where: { userId: player.userId },
            update: {
              gamesPlayed: { increment: 1 }
            },
            create: {
              userId: player.userId,
              gamesPlayed: 1,
              gamesWon: 0,
              roomsCreated: 0,
              totalScore: 0
            }
          });
        } catch (error) {
          console.error(`Error updating stats for user ${player.userId}:`, error);
          // Continue with the next player, don't stop the game from starting
        }
      }
    }

    return NextResponse.json({
      success: true,
      room: updatedRoom
    });
  } catch (error) {
    console.error("Error starting game:", error);
    return NextResponse.json(
      { error: "Failed to start game" },
      { status: 500 }
    );
  }
} 