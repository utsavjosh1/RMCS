import { NextResponse } from "next/server";
import prisma from "@/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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

function generateRoomCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await request.json();
    const { title, hostId, hostName, isPrivate } = body;

    // Generate a unique room code
    let roomCode;
    let isCodeUnique = false;

    // Try to find a unique code with minimal database queries
    while (!isCodeUnique) {
      roomCode = generateRoomCode();
      const existingRoom = await prisma.gameRoom.findUnique({
        where: { roomCode },
        select: { id: true }, // Only select ID field for performance
      });
      isCodeUnique = !existingRoom;
    }

    // Create room in a transaction to ensure data integrity
    const newRoom = await prisma.$transaction(async (tx) => {
      // Create the game room
      const room = await tx.gameRoom.create({
        data: {
          roomCode,
          title: title || `${hostName}'s Room`,
          imageUrl: `/room-images/${Math.floor(Math.random() * 6) + 1}.jpg`,
          status: "waiting",
          hostId,
          hostName,
          isPrivate: !!isPrivate,
          // Create RoomPlayers at the same time
          players: {
            create: {
              current: 0,
              max: 4,
            },
          },
        },
        include: {
          players: true,
        },
      });

      // If the user is authenticated, update their game stats
      if (session?.user?.id === hostId) {
        await tx.gameStats.upsert({
          where: { userId: hostId },
          update: {
            roomsCreated: { increment: 1 },
          },
          create: {
            userId: hostId,
            gamesPlayed: 0,
            gamesWon: 0,
            roomsCreated: 1,
            totalScore: 0,
          },
        });
      }

      return room;
    });

    return NextResponse.json({
      success: true,
      data: newRoom,
    });
  } catch (error) {
    console.error("Error creating room:", error);
    return NextResponse.json(
      { error: "Failed to create room" },
      { status: 500 }
    );
  }
}
