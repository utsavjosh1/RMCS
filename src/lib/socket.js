import { Server } from "socket.io";

export default function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  // Socket.IO event handlers
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Join a room
    socket.on("join-room", async ({ roomCode, userId, userName }) => {
      try {
        // Join the socket room
        socket.join(roomCode);
        
        // Notify others in the room
        socket.to(roomCode).emit("player-joined", {
          userId,
          userName,
          timestamp: new Date().toISOString(),
        });

        // Send current room state to the new player
        const roomState = await getRoomState(roomCode);
        socket.emit("room-state", roomState);
      } catch (error) {
        console.error("Error joining room:", error);
        socket.emit("error", { message: "Failed to join room" });
      }
    });

    // Leave a room
    socket.on("leave-room", ({ roomCode, userId }) => {
      socket.leave(roomCode);
      socket.to(roomCode).emit("player-left", {
        userId,
        timestamp: new Date().toISOString(),
      });
    });

    // Player ready status
    socket.on("player-ready", ({ roomCode, userId, isReady }) => {
      socket.to(roomCode).emit("player-ready-update", {
        userId,
        isReady,
        timestamp: new Date().toISOString(),
      });
    });

    // Game state updates
    socket.on("game-state-update", ({ roomCode, gameState }) => {
      socket.to(roomCode).emit("game-state-update", {
        ...gameState,
        timestamp: new Date().toISOString(),
      });
    });

    // Disconnect handler
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
};

// Helper function to get room state
async function getRoomState(roomCode) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/rooms/${roomCode}`);
    if (!response.ok) throw new Error("Failed to fetch room state");
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching room state:", error);
    throw error;
  }
} 