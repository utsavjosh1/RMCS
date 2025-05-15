import { NextResponse } from "next/server";
import prisma from "@/db/prisma";

export async function POST(request, { params }) {
  try {
    const { roomCode } = params;
    const body = await request.json();
    const { userId } = body;

    // Verify that the room exists
    const room = await prisma.gameRoom.findFirst({
      where: { roomCode },
      include: {
        players: true,
        playersList: true,
      },
    });

    if (!room) {
      return NextResponse.json(
        { error: "Room not found" },
        { status: 404 }
      );
    }

    // Check if player exists in this room
    const existingPlayer = room.playersList.find(p => p.id === userId);
    if (!existingPlayer) {
      return NextResponse.json({
        message: "Player not in this room",
      });
    }

    // Delete the player entry from the database
    await prisma.player.delete({
      where: {
        id: userId,
      },
    });

    // Update the room player count
    await prisma.roomPlayers.update({
      where: { roomId: room.id },
      data: {
        current: Math.max(0, room.players.current - 1),
      },
    });

    // If this was the last player and the room is not in progress, mark it as inactive
    if (room.playersList.length <= 1 && room.status !== "in-progress") {
      await prisma.gameRoom.update({
        where: { id: room.id },
        data: {
          status: "finished",
        },
      });
    }
    
    // If the player was the host and there are other players, we would assign a new host
    // For simplicity, we'll assume the socket server will handle host reassignment

    // Return success
    return NextResponse.json({
      message: "Successfully left room",
    });
  } catch (error) {
    console.error("Error leaving room:", error);
    return NextResponse.json(
      { error: "Failed to leave room" },
      { status: 500 }
    );
  }
} 