import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get the user session
    const session = await getServerSession(authOptions);
    
    // Return session info for debugging
    return NextResponse.json({
      authenticated: !!session,
      session: session,
      user: session?.user || null,
      message: session ? "User is authenticated" : "User is not authenticated"
    });
  } catch (error) {
    console.error("Debug route error:", error);
    return NextResponse.json({
      error: error.message,
      stack: error.stack,
      message: "An error occurred while checking authentication"
    }, { status: 500 });
  }
} 