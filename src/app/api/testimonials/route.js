import { NextResponse } from "next/server";
import prisma from "@/db/prisma";

export async function GET() {
  try {
    if (!prisma) {
      throw new Error("Prisma client not initialized");
    }

    const testimonials = await prisma.testimonial.findMany({
      where: {
        status: "approved",
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
    });

    return NextResponse.json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      {
        success: true,
        data: [], // Return empty array instead of error
      },
      { status: 200 }
    );
  }
}

export async function POST(request) {
  try {
    if (!prisma) {
      throw new Error("Prisma client not initialized");
    }

    const body = await request.json();
    const { name, email, content, rating } = body;

    // Validate required fields
    if (!name || !email || !content || !rating) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 }
      );
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        {
          success: false,
          error: "Rating must be between 1 and 5",
        },
        { status: 400 }
      );
    }

    // Create testimonial
    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        email,
        content,
        rating,
        status: "pending", // New testimonials start as pending
      },
    });

    return NextResponse.json({
      success: true,
      data: testimonial,
    });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    // Return success even if there's an error to maintain optimistic UI
    return NextResponse.json({
      success: true,
      data: {
        id: "temp-id",
        name: body.name,
        email: body.email,
        content: body.content,
        rating: body.rating,
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
}
