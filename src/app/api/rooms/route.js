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

export const POST = async (request) => {
  try {
    const body = await request.json();
    const { title, hostId, hostName, isPrivate = false } = body;

    // Validate required fields
    if (!title || !hostId || !hostName) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    // Generate a unique room code
    const generateRoomCode = () => {
      return Math.random().toString(36).substring(2, 8).toUpperCase();
    };

    // Keep generating until we get a unique code
    let roomCode;
    let isUnique = false;
    while (!isUnique) {
      roomCode = generateRoomCode();
      const existingRoom = await prisma.gameRoom.findUnique({
        where: { roomCode },
      });
      if (!existingRoom) {
        isUnique = true;
      }
    }

    // Create the room with all related data in a transaction
    const newRoom = await prisma.$transaction(async (tx) => {
      // Create the room
      const room = await tx.gameRoom.create({
        data: {
          roomCode,
          title,
          imageUrl: `https://robohash.org/${encodeURIComponent(title)}.png?size=200x200&set=set2`,
          status: "waiting",
          hostId,
          hostName,
          isPrivate,
          // Create the players count record
          players: {
            create: {
              current: 1,
              max: 4,
            },
          },
          // Create the initial player (host)
          playersList: {
            create: {
              id: hostId,
              name: hostName,
              isReady: false,
              joinedAt: new Date(),
            },
          },
        },
        include: {
          players: true,
          playersList: true,
        },
      });

      return room;
    });

    return NextResponse.json(
      {
        success: true,
        data: newRoom,
        message: "Room created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Failed to create game room:", error);
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
