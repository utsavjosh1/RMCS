"use server";

import prisma from "@/db/prisma";

export async function getInitialRooms() {
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

    return {
      success: true,
      data: rooms
    };
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return {
      success: false,
      error: "Failed to fetch rooms"
    };
  }
}
