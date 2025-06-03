"use server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function getInitialRooms() {
  try {
    // Fetch all active rooms from the Node.js backend
    const response = await fetch(`${API_BASE_URL}/api/rooms`, {
      cache: 'no-store', // Ensure fresh data
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.success) {
      return {
        success: true,
        data: result.rooms || [],
      };
    } else {
      return {
        success: false,
        error: "Failed to fetch rooms from backend",
      };
    }
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return {
      success: false,
      error: "Failed to fetch rooms",
      data: [], // Return empty array as fallback
    };
  }
}
