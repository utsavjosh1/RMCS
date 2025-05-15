import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/db/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request, { params }) {
  try {
    // Get the current session to verify the user
    const session = await getServerSession(authOptions);
    const { userId } = params;

    // Make sure the user is authenticated and is updating their own stats
    if (!session || !session.user || session.user.id !== userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Parse the request body
    const body = await request.json();
    const { action, score } = body;

    // Get the current stats
    let stats = await prisma.gameStats.findUnique({
      where: { userId },
    });

    // If stats don't exist yet, create default stats
    if (!stats) {
      stats = await prisma.gameStats.create({
        data: {
          userId,
          gamesPlayed: 0,
          gamesWon: 0,
          roomsCreated: 0,
          totalScore: 0,
        },
      });
    }

    // Update stats based on the action
    let updateData = {};

    switch (action) {
      case "gamePlayed":
        updateData.gamesPlayed = stats.gamesPlayed + 1;
        break;
      case "gameWon":
        updateData.gamesWon = stats.gamesWon + 1;
        break;
      case "roomCreated":
        updateData.roomsCreated = stats.roomsCreated + 1;
        break;
      case "scoreAdded":
        if (typeof score === "number") {
          updateData.totalScore = stats.totalScore + score;
        }
        break;
      default:
        return NextResponse.json(
          { error: "Invalid action" },
          { status: 400 }
        );
    }

    // Update the stats in the database
    const updatedStats = await prisma.gameStats.update({
      where: { userId },
      data: updateData,
    });

    return NextResponse.json(updatedStats);
  } catch (error) {
    console.error("Error updating user stats:", error);
    return NextResponse.json(
      { error: "Failed to update game statistics" },
      { status: 500 }
    );
  }
} 