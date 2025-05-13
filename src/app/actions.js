"use server";

import prisma from "@/db/prisma";

export async function getInitialRooms() {
  try {
    const rooms = await prisma.gameRoom.findMany({
      include: {
        players: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
    });

    return { success: true, data: rooms };
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return { success: false, error: "Failed to fetch rooms" };
  }
}
