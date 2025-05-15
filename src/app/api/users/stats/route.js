import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/db/prisma";
import { NextResponse } from "next/server";

// GET /api/users/stats - Fetch current user's game statistics
export async function GET() {
  try {
    // Get the user session
    const session = await getServerSession(authOptions);
    
    // If not authenticated, return 401
    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be signed in to view your stats" }, 
        { status: 401 }
      );
    }
    
    // Get user ID from session
    const userId = session.user.id;

    // Verify user ID exists
    if (!userId) {
      return NextResponse.json(
        { error: "User ID not found in session" }, 
        { status: 400 }
      );
    }

    // Fetch user statistics from the database
    const stats = await prisma.gameStats.findUnique({
      where: { userId },
    });
    
    // If stats don't exist yet, create default stats
    if (!stats) {
      try {
        // Create default stats
        const newStats = await prisma.gameStats.create({
          data: {
            userId,
            gamesPlayed: 0,
            gamesWon: 0,
            roomsCreated: 0,
            totalScore: 0
          }
        });
        
        return NextResponse.json(newStats);
      } catch (createError) {
        console.error("Error creating user stats:", createError);
        return NextResponse.json(
          { 
            error: "Failed to create game statistics", 
            details: createError.message 
          }, 
          { status: 500 }
        );
      }
    }
    
    // Return the stats
    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch game statistics",
        details: error.message 
      }, 
      { status: 500 }
    );
  }
} 