import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/db/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request, { params }) {
  try {
    // Get the current session to verify the user
    const session = await getServerSession(authOptions);
    const { userId } = params;

    // Make sure the user is authenticated and is requesting their own stats
    if (!session || !session.user || session.user.id !== userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get or create game stats for the user
    let gameStats = await prisma.gameStats.findUnique({
      where: { userId },
    });

    // If stats don't exist yet, create default stats
    if (!gameStats) {
      gameStats = await prisma.gameStats.create({
        data: {
          userId,
          gamesPlayed: 0,
          gamesWon: 0,
          roomsCreated: 0,
          totalScore: 0,
        },
      });
    }

    return NextResponse.json(gameStats);
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch game statistics" },
      { status: 500 }
    );
  }
} 