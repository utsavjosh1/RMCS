import { NextResponse } from "next/server";
import prisma from "@/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request, { params }) {
  try {
    const { roomCode } = params;
    const session = await getServerSession(authOptions);
    const body = await request.json();
    const { userId, userName } = body;

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

    // Check if room is full
    if (room.players && room.players.current >= room.players.max) {
      // Check if the player is already in the room before rejecting
      const existingPlayer = room.playersList.find(p => p.id === userId);
      if (!existingPlayer) {
        return NextResponse.json(
          { error: "Room is full" },
          { status: 409 }
        );
      }
    }

    // Check if player already exists in this room
    const existingPlayer = room.playersList.find(p => p.id === userId);
    if (existingPlayer) {
      return NextResponse.json({
        message: "Already joined this room",
        player: existingPlayer,
      });
    }

    // Create the player entry in the database
    const player = await prisma.player.create({
      data: {
        id: userId,
        name: userName,
        isReady: false,
        joinedAt: new Date(),
        room: {
          connect: { id: room.id },
        },
        // If authenticated, link to the user account
        ...(session?.user?.id === userId ? { user: { connect: { id: userId } } } : {}),
      },
    });

    // Update the room player count
    await prisma.roomPlayers.update({
      where: { roomId: room.id },
      data: {
        current: room.players.current + 1,
      },
    });

    // Return the player data
    return NextResponse.json({
      message: "Successfully joined room",
      player,
    });
  } catch (error) {
    console.error("Error joining room:", error);
    return NextResponse.json(
      { error: "Failed to join room" },
      { status: 500 }
    );
  }
} 