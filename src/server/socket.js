const { Server } = require("socket.io");
const { createServer } = require("http");
const prisma = require("../db/prisma");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["my-custom-header"],
  },
  path: "/socket.io",
  transports: ["websocket", "polling"],
});

// In-memory session storage for authenticated users
const sessions = new Map();
// In-memory room state with player tracking
const activeRooms = new Map();
// Rate limiting for connection attempts
const connectionAttempts = new Map();

// Middleware for basic security
io.use(async (socket, next) => {
  const clientIp = socket.handshake.address;
  const now = Date.now();

  // Rate limiting
  if (connectionAttempts.has(clientIp)) {
    const attempts = connectionAttempts.get(clientIp);

    // Clear old attempts (older than 1 minute)
    const recentAttempts = attempts.filter((time) => now - time < 60000);

    // Too many attempts in the time window
    if (recentAttempts.length >= 10) {
      return next(new Error("Too many connection attempts"));
    }

    connectionAttempts.set(clientIp, [...recentAttempts, now]);
  } else {
    connectionAttempts.set(clientIp, [now]);
  }

  // Additional socket authentication can be added here
  next();
});

// Helper function to get or create user session
function getOrCreateSession(userId, userName) {
  if (!sessions.has(userId)) {
    sessions.set(userId, {
      id: userId,
      name: userName,
      connectedAt: new Date(),
      rooms: new Set(),
      isAuthenticated: true, // In a real app, this would be set based on auth status
    });
  }
  return sessions.get(userId);
}

// Helper function to update room state in database
async function updateRoomState(roomCode, updates) {
  try {
    // Need to handle 'players' updates specially
    const updatesWithoutPlayers = { ...updates };
    const playersUpdate = updates.players;
    delete updatesWithoutPlayers.players;

    // Create the correct update structure
    let updateData = updatesWithoutPlayers;

    // If there's a players update, handle it appropriately
    if (playersUpdate) {
      // Check if the RoomPlayers record already exists
      const room = await prisma.gameRoom.findUnique({
        where: { roomCode },
        include: { players: true },
      });

      if (room?.players) {
        // Use update if players already exists
        updateData.players = {
          update: playersUpdate,
        };
      } else {
        // Use create if players doesn't exist
        updateData.players = {
          create: {
            current: playersUpdate.current || 1,
            max: playersUpdate.max || 4,
          },
        };
      }
    }

    return await prisma.gameRoom.update({
      where: { roomCode },
      data: updateData,
      include: {
        playersList: {
          select: {
            id: true,
            name: true,
            isReady: true,
            joinedAt: true,
          },
        },
      },
    });
  } catch (error) {
    console.error(`Failed to update room ${roomCode}:`, error);
    throw error;
  }
}

// Helper to get room from the database
async function getRoomFromDB(roomCode) {
  try {
    return await prisma.gameRoom.findUnique({
      where: { roomCode },
      include: {
        playersList: {
          select: {
            id: true,
            name: true,
            isReady: true,
            joinedAt: true,
          },
        },
      },
    });
  } catch (error) {
    console.error(`Failed to fetch room ${roomCode}:`, error);
    return null;
  }
}

// Initialize a room's in-memory state
async function initializeRoomState(roomCode) {
  if (!activeRooms.has(roomCode)) {
    const dbRoom = await getRoomFromDB(roomCode);
    if (dbRoom) {
      activeRooms.set(roomCode, {
        ...dbRoom,
        connectedPlayers: new Set(),
        lastActivity: Date.now(),
        gameState: dbRoom.status === "in-progress" ? dbRoom.gameState : null,
      });
    }
  }
  return activeRooms.get(roomCode);
}

// Helper function to handle a player leaving a room (extracted for reuse)
async function handleLeaveRoom(socket, roomCode, userId) {
  const roomState = activeRooms.get(roomCode);
  if (!roomState) return;

  // Remove from room state
  roomState.connectedPlayers.delete(userId);
  const userSession = sessions.get(userId);
  if (userSession) {
    userSession.rooms.delete(roomCode);
  }

  // Leave socket room
  socket.leave(roomCode);

  // Update timestamp
  roomState.lastActivity = Date.now();

  // Notify others
  socket.to(roomCode).emit("player-left", {
    roomCode,
    userId,
    timestamp: new Date().toISOString(),
  });

  // If this was the host and the game hasn't started, handle host migration
  const dbRoom = await getRoomFromDB(roomCode);
  if (dbRoom && dbRoom.hostId === userId && dbRoom.status === "waiting") {
    // Find a new host among remaining players
    const remainingPlayers = dbRoom.playersList.filter(
      (p) => p.id !== userId
    );
    if (remainingPlayers.length > 0) {
      // Assign first player as new host
      const newHostId = remainingPlayers[0].id;
      await updateRoomState(roomCode, {
        hostId: newHostId,
      });

      // Notify room of host change
      io.to(roomCode).emit("host-changed", {
        previousHostId: userId,
        newHostId: newHostId,
        roomCode,
        timestamp: new Date().toISOString(),
      });
    }
  }

  // If player list is empty and room is in 'waiting' status, consider cleaning up
  if (
    roomState.connectedPlayers.size === 0 &&
    dbRoom &&
    dbRoom.status === "waiting"
  ) {
    // Schedule for cleanup if no one rejoins in 5 minutes
    setTimeout(async () => {
      const currentState = activeRooms.get(roomCode);
      if (currentState && currentState.connectedPlayers.size === 0) {
        // Mark room as inactive
        await updateRoomState(roomCode, {
          status: "inactive",
        });
        activeRooms.delete(roomCode);
      }
    }, 5 * 60 * 1000);
  }

  // Update all clients with new room state
  const updatedRoom = await getRoomFromDB(roomCode);
  io.emit("game-state-update", updatedRoom);
  
  return updatedRoom;
}

// Handle socket connections
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  let currentUser = null;
  let currentRoom = null;

  // Join room - add callback for acknowledgment
  socket.on("join-room", async ({ roomCode, userId, userName }, callback) => {
    try {
      // Validate room exists
      const room = await getRoomFromDB(roomCode);
      if (!room) {
        const errorResponse = { success: false, error: "Room not found or no longer available" };
        socket.emit("error", { message: errorResponse.error });
        
        // Send acknowledgment if callback exists
        if (typeof callback === 'function') {
          callback(errorResponse);
        }
        return;
      }

      // Check if player is already in another room
      if (currentUser && currentRoom && currentRoom !== roomCode) {
        console.log(`Player ${userName} (${userId}) is attempting to join room ${roomCode} while in room ${currentRoom}`);
        
        // Force leave the current room first
        try {
          await handleLeaveRoom(socket, currentRoom, userId);
        } catch (error) {
          console.error(`Error leaving previous room ${currentRoom}:`, error);
        }
      }

      // Check if room is full
      const isPlayerAlreadyInRoom = room.playersList.some(p => p.id === userId);
      const isRoomFull = room.playersList.length >= 4;
      
      if (room.status === "in-progress" || (isRoomFull && !isPlayerAlreadyInRoom)) {
        socket.emit("error", {
          message: room.status === "in-progress" 
            ? "Game is already in progress" 
            : `Room is full (${room.playersList.length}/4 players)`
        });
        return;
      }

      // Check if room is private and user is not the host
      if (room.isPrivate && room.hostId !== userId) {
        // For private rooms, we need to validate the user has the correct code
        socket.emit("error", { message: "This is a private room. You need an invitation to join." });
        return;
      }

      // Get or create user session
      currentUser = getOrCreateSession(userId, userName);

      // Check if player is already in the room
      const isPlayerInRoom = room.playersList.some((p) => p.id === userId);
      
      // Create or get room state
      const roomState = await initializeRoomState(roomCode);
      
      // If player is already in the room, just reconnect them
      if (isPlayerInRoom) {
        console.log(`Player ${userName} (${userId}) is reconnecting to room ${roomCode}`);
        
        // Join the socket room
        socket.join(roomCode);
        currentRoom = roomCode;
        
        // Add to user's session rooms
        currentUser.rooms.add(roomCode);
        
        // Add to room's connected players
        roomState.connectedPlayers.add(userId);
        
        // Send room state to the rejoining player
        const updatedRoom = await getRoomFromDB(roomCode);
        socket.emit("room-state", updatedRoom);
        
        // Broadcast room update to all clients
        io.emit("game-state-update", updatedRoom);
        
        // Send successful acknowledgment if callback exists
        if (typeof callback === 'function') {
          callback({ success: true, room: updatedRoom });
        }
        return;
      }

      // Add user to room in DB if not already there
      if (!isPlayerInRoom) {
        try {
          // Use upsert instead of create to handle the case when a player with the same ID exists
          await prisma.player.upsert({
            where: { id: userId },
            update: {
              name: userName,
              isReady: false,
              roomId: room.id,
              joinedAt: new Date()
            },
            create: {
              id: userId,
              name: userName,
              isReady: false,
              roomId: room.id,
              joinedAt: new Date()
            }
          });

          // Update room players count - check if players object exists first
          if (room.players) {
            await updateRoomState(roomCode, {
              players: {
                current: room.players.current + 1,
              },
            });
          } else {
            // Create players object if it doesn't exist
            await updateRoomState(roomCode, {
              players: {
                current: 1,
                max: 4
              },
            });
          }
        } catch (error) {
          console.error("Error adding player to room:", error);
          // We'll continue even if there's an error adding the player to the DB
        }
      }

      // Join the socket room
      socket.join(roomCode);
      currentRoom = roomCode;

      // Add to user's session rooms
      currentUser.rooms.add(roomCode);

      // Add to room's connected players
      roomState.connectedPlayers.add(userId);

      // Notify other players
      socket.to(roomCode).emit("player-joined", {
        roomCode,
        userId,
        userName,
        timestamp: new Date().toISOString(),
      });

      // Send room state to the joining player
      const updatedRoom = await getRoomFromDB(roomCode);
      socket.emit("room-state", updatedRoom);

      // Broadcast room update to all clients
      io.emit("game-state-update", updatedRoom);
      
      // Send successful acknowledgment if callback exists
      if (typeof callback === 'function') {
        callback({ success: true, room: updatedRoom });
      }
    } catch (error) {
      console.error("Error joining room:", error);
      const errorMessage = error.code === 'P2002' 
        ? "You're already in another room. Please leave that room first."
        : "Failed to join room. Please try again.";
      
      socket.emit("error", { message: errorMessage });
      
      // Send error acknowledgment if callback exists
      if (typeof callback === 'function') {
        callback({ success: false, error: errorMessage });
      }
    }
  });

  // Leave room - add callback for acknowledgment 
  socket.on("leave-room", async ({ roomCode, userId }, callback) => {
    try {
      if (!currentUser || currentUser.id !== userId) {
        const errorResponse = { success: false, error: "Unauthorized" };
        socket.emit("error", { message: errorResponse.error });
        
        // Send acknowledgment if callback exists
        if (typeof callback === 'function') {
          callback(errorResponse);
        }
        return;
      }

      await handleLeaveRoom(socket, roomCode, userId);

      // Reset current room
      if (currentRoom === roomCode) {
        currentRoom = null;
      }
      
      // Send successful acknowledgment if callback exists
      if (typeof callback === 'function') {
        callback({ success: true });
      }
    } catch (error) {
      console.error("Error leaving room:", error);
      socket.emit("error", { message: "Failed to leave room" });
      
      // Send error acknowledgment if callback exists
      if (typeof callback === 'function') {
        callback({ success: false, error: "Failed to leave room" });
      }
    }
  });

  // Player ready status - add callback for acknowledgment
  socket.on("player-ready", async ({ roomCode, userId, isReady }, callback) => {
    try {
      // Validate user and room
      if (!currentUser || currentUser.id !== userId) {
        const errorResponse = { success: false, error: "Unauthorized" };
        socket.emit("error", { message: errorResponse.error });
        
        // Send acknowledgment if callback exists
        if (typeof callback === 'function') {
          callback(errorResponse);
        }
        return;
      }

      const roomState = activeRooms.get(roomCode);
      if (!roomState || roomState.status !== "waiting") {
        socket.emit("error", {
          message: "Room not available for ready status change",
        });
        return;
      }

      // Update player's ready status in DB
      await prisma.player.update({
        where: {
          id: userId,
        },
        data: { isReady },
      });

      // Notify room of player ready status change
      io.to(roomCode).emit("player-ready-update", {
        userId,
        isReady,
        timestamp: new Date().toISOString(),
      });

      // Update room state
      const updatedRoom = await getRoomFromDB(roomCode);
      io.to(roomCode).emit("room-state", updatedRoom);
      io.emit("game-state-update", updatedRoom);
      
      // Send successful acknowledgment if callback exists
      if (typeof callback === 'function') {
        callback({ success: true });
      }
    } catch (error) {
      console.error("Error updating ready status:", error);
      socket.emit("error", { message: "Failed to update ready status" });
      
      // Send error acknowledgment if callback exists
      if (typeof callback === 'function') {
        callback({ success: false, error: "Failed to update ready status" });
      }
    }
  });

  // Start game - add callback for acknowledgment
  socket.on("start-game", async ({ roomCode }, callback) => {
    try {
      const roomState = activeRooms.get(roomCode);
      if (!roomState) {
        socket.emit("error", { message: "Room not found" });
        if (typeof callback === 'function') {
          callback({ success: false, error: "Room not found" });
        }
        return;
      }

      // Check if user is the host
      const dbRoom = await getRoomFromDB(roomCode);
      if (!dbRoom || dbRoom.hostId !== currentUser?.id) {
        socket.emit("error", { message: "Only the host can start the game" });
        if (typeof callback === 'function') {
          callback({ success: false, error: "Only the host can start the game" });
        }
        return;
      }

      // Ensure all players are ready and we have exactly 4 players
      if (dbRoom.playersList.length !== 4) {
        socket.emit("error", { message: "Need exactly 4 players to start" });
        if (typeof callback === 'function') {
          callback({ success: false, error: "Need exactly 4 players to start" });
        }
        return;
      }

      if (!dbRoom.playersList.every((player) => player.isReady)) {
        socket.emit("error", { message: "All players must be ready to start" });
        if (typeof callback === 'function') {
          callback({ success: false, error: "All players must be ready to start" });
        }
        return;
      }

      // Initialize game state
      const roles = ["raja", "mantri", "chor", "sipahi"];
      shuffleArray(roles);

      const playerRoles = {};
      dbRoom.playersList.forEach((player, index) => {
        playerRoles[player.id] = roles[index];
      });

      const initialGameState = {
        phase: "role-assignment",
        playerRoles,
        round: 1,
        guessedCorrectly: false,
        sipahiGuess: null,
        revealedRoles: false,
        scores: dbRoom.playersList.reduce((acc, player) => {
          acc[player.id] = 0;
          return acc;
        }, {}),
        messages: [
          {
            type: "system",
            content: "The game has started! Roles have been assigned.",
            timestamp: new Date().toISOString(),
          },
        ],
      };

      // Update room status and game state
      await updateRoomState(roomCode, {
        status: "in-progress",
        gameState: initialGameState,
      });

      // Update in-memory state
      roomState.status = "in-progress";
      roomState.gameState = initialGameState;

      // Notify all clients with the game started event, including the room code
      io.to(roomCode).emit("game-started", {
        roomCode,
        timestamp: new Date().toISOString(),
      });

      // Send private role information to each player
      dbRoom.playersList.forEach((player) => {
        io.to(roomCode).emit("role-assigned", {
          userId: player.id,
          role: playerRoles[player.id],
          timestamp: new Date().toISOString(),
        });
      });

      // Update all clients with new room state (without revealing roles to all)
      const publicGameState = { ...initialGameState };
      delete publicGameState.playerRoles;
      const updatedRoom = await getRoomFromDB(roomCode);

      // Broadcast updated room state to all clients, everywhere
      io.emit("game-state-update", updatedRoom);
      
      // Send successful acknowledgment if callback exists
      if (typeof callback === 'function') {
        callback({ success: true });
      }
    } catch (error) {
      console.error("Error starting game:", error);
      socket.emit("error", { message: "Failed to start game" });
      
      // Send error acknowledgment if callback exists
      if (typeof callback === 'function') {
        callback({ success: false, error: "Failed to start game" });
      }
    }
  });

  // Game actions - add callback for acknowledgment
  socket.on("game-action", async ({ roomCode, action, data }, callback) => {
    try {
      if (!currentUser) {
        socket.emit("error", { message: "Unauthorized" });
        return;
      }

      const roomState = activeRooms.get(roomCode);
      if (!roomState || roomState.status !== "in-progress") {
        socket.emit("error", { message: "Game not in progress" });
        return;
      }

      // Handle different game actions based on current phase
      switch (action) {
        case "sipahi-guess":
          handleSipahiGuess(roomCode, currentUser.id, data.suspectedChorId);
          break;
        case "end-round":
          handleEndRound(roomCode, currentUser.id);
          break;
        case "chat-message":
          handleChatMessage(roomCode, currentUser.id, data.message);
          break;
        default:
          socket.emit("error", { message: "Unknown game action" });
      }
      
      // Send successful acknowledgment if callback exists
      if (typeof callback === 'function') {
        callback({ success: true });
      }
    } catch (error) {
      console.error("Error processing game action:", error);
      socket.emit("error", { message: "Failed to process game action" });
      
      // Send error acknowledgment if callback exists
      if (typeof callback === 'function') {
        callback({ success: false, error: "Failed to process game action" });
      }
    }
  });

  // Disconnect handler - also use the extracted helper function
  socket.on("disconnect", async () => {
    console.log("Client disconnected:", socket.id);

    if (currentUser && currentRoom) {
      // Handle as a "leave room" event
      try {
        await handleLeaveRoom(socket, currentRoom, currentUser.id);
      } catch (error) {
        console.error("Error handling disconnect:", error);
      }

      // Mark the user as disconnected
      currentUser.disconnectedAt = Date.now();
    }
  });

  // Game-specific action handlers
  async function handleSipahiGuess(roomCode, userId, suspectedChorId) {
    const roomState = activeRooms.get(roomCode);
    const gameState = roomState.gameState;

    // Verify this user is the sipahi
    const sipahiId = Object.entries(gameState.playerRoles).find(
      ([id, role]) => role === "sipahi"
    )?.[0];

    if (userId !== sipahiId) {
      socket.emit("error", { message: "Only the Sipahi can make a guess" });
      return;
    }

    // Check if the guess is correct
    const chorId = Object.entries(gameState.playerRoles).find(
      ([id, role]) => role === "chor"
    )?.[0];

    const guessedCorrectly = suspectedChorId === chorId;

    // Update game state
    gameState.phase = "guess-made";
    gameState.sipahiGuess = suspectedChorId;
    gameState.guessedCorrectly = guessedCorrectly;

    // Update in database
    await updateRoomState(roomCode, {
      gameState,
    });

    // Notify room of the guess
    io.to(roomCode).emit("sipahi-guessed", {
      sipahiId,
      suspectedChorId,
      timestamp: new Date().toISOString(),
    });

    // Don't reveal if correct yet - that happens in the end round
  }

  async function handleEndRound(roomCode, userId) {
    const roomState = activeRooms.get(roomCode);
    const gameState = roomState.gameState;

    // Only host or raja can end the round
    const currentRajaId = Object.entries(gameState.playerRoles).find(
      ([id, role]) => role === "raja"
    )?.[0];

    const dbRoom = await getRoomFromDB(roomCode);

    if (userId !== dbRoom.hostId && userId !== currentRajaId) {
      socket.emit("error", {
        message: "Only the Host or Raja can end the round",
      });
      return;
    }

    // Reveal roles and calculate scores
    gameState.revealedRoles = true;
    gameState.phase = "round-end";

    // Calculate scores
    const { playerRoles } = gameState;
    const newScores = { ...gameState.scores };

    // Raja always gets 1000 points
    newScores[currentRajaId] += 1000;

    // Mantri always gets 800 points
    const mantriId = Object.entries(playerRoles).find(
      ([id, role]) => role === "mantri"
    )?.[0];
    newScores[mantriId] += 800;

    // Chor gets 500 if not caught, 0 otherwise
    const chorId = Object.entries(playerRoles).find(
      ([id, role]) => role === "chor"
    )?.[0];
    if (!gameState.guessedCorrectly) {
      newScores[chorId] += 500;
    }

    // Sipahi gets 600 if caught chor, 0 otherwise
    const sipahiId = Object.entries(playerRoles).find(
      ([id, role]) => role === "sipahi"
    )?.[0];
    if (gameState.guessedCorrectly) {
      newScores[sipahiId] += 600;
    }

    gameState.scores = newScores;

    // Add round summary message
    gameState.messages.push({
      type: "system",
      content: `Round ${gameState.round} ended. ${
        gameState.guessedCorrectly ? "Sipahi caught the Chor!" : "Chor escaped!"
      }`,
      timestamp: new Date().toISOString(),
    });

    // Update in database
    await updateRoomState(roomCode, {
      gameState,
    });

    // Notify room of round end and role reveal
    io.to(roomCode).emit("round-ended", {
      round: gameState.round,
      roles: playerRoles,
      guessedCorrectly: gameState.guessedCorrectly,
      scores: newScores,
      timestamp: new Date().toISOString(),
    });

    // After 5 seconds, start next round
    setTimeout(async () => {
      // Start new round if room is still active
      const currentRoomState = activeRooms.get(roomCode);
      if (currentRoomState && currentRoomState.status === "in-progress") {
        await startNewRound(roomCode);
      }
    }, 5000);
  }

  async function startNewRound(roomCode) {
    const roomState = activeRooms.get(roomCode);
    const gameState = roomState.gameState;

    // Rotate roles or shuffle randomly
    const roles = ["raja", "mantri", "chor", "sipahi"];
    shuffleArray(roles);

    const players = Object.keys(gameState.playerRoles);
    const playerRoles = {};
    players.forEach((playerId, index) => {
      playerRoles[playerId] = roles[index];
    });

    // Initialize new round state
    const newRound = gameState.round + 1;
    const newGameState = {
      ...gameState,
      phase: "role-assignment",
      playerRoles,
      round: newRound,
      guessedCorrectly: false,
      sipahiGuess: null,
      revealedRoles: false,
      messages: [
        ...gameState.messages,
        {
          type: "system",
          content: `Round ${newRound} has started! New roles have been assigned.`,
          timestamp: new Date().toISOString(),
        },
      ],
    };

    // Update in database
    await updateRoomState(roomCode, {
      gameState: newGameState,
    });

    // Update in-memory state
    roomState.gameState = newGameState;

    // Send private role information to each player
    players.forEach((playerId) => {
      io.to(roomCode).emit("role-assigned", {
        userId: playerId,
        role: playerRoles[playerId],
        timestamp: new Date().toISOString(),
      });
    });

    // Update all clients with new room state (without revealing roles to all)
    const publicGameState = { ...newGameState };
    delete publicGameState.playerRoles;

    const updatedRoom = await getRoomFromDB(roomCode);
    const publicRoom = {
      ...updatedRoom,
      gameState: publicGameState,
    };

    io.emit("game-state-update", publicRoom);
  }

  async function handleChatMessage(roomCode, userId, message) {
    // Add the message to the game state
    const roomState = activeRooms.get(roomCode);
    const gameState = roomState.gameState;

    // Get the player's name
    const dbRoom = await getRoomFromDB(roomCode);
    const player = dbRoom.playersList.find((p) => p.id === userId);

    if (!player) return;

    // Add message to game state
    gameState.messages = [
      ...gameState.messages,
      {
        type: "player",
        playerId: userId,
        playerName: player.name,
        content: message,
        timestamp: new Date().toISOString(),
      },
    ].slice(-50); // Keep only the last 50 messages

    // Update in database
    await updateRoomState(roomCode, {
      gameState,
    });

    // Broadcast to room
    io.to(roomCode).emit("chat-message", {
      playerId: userId,
      playerName: player.name,
      message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Maintenance interval - cleanup inactive rooms and sessions
setInterval(async () => {
  const now = Date.now();

  // Cleanup inactive rooms
  for (const [roomCode, roomState] of activeRooms.entries()) {
    // Room inactive for more than 30 minutes
    if (now - roomState.lastActivity > 30 * 60 * 1000) {
      if (roomState.connectedPlayers.size === 0) {
        // No connected players, clean up
        activeRooms.delete(roomCode);

        // Only update DB if game was in waiting status
        if (roomState.status === "waiting") {
          try {
            await updateRoomState(roomCode, {
              status: "inactive",
            });
          } catch (error) {
            console.error(`Failed to update inactive room ${roomCode}:`, error);
          }
        }
      }
    }
  }

  // Cleanup old connection attempts
  for (const [ip, attempts] of connectionAttempts.entries()) {
    const recentAttempts = attempts.filter((time) => now - time < 60000);
    if (recentAttempts.length === 0) {
      connectionAttempts.delete(ip);
    } else {
      connectionAttempts.set(ip, recentAttempts);
    }
  }

  // Cleanup idle sessions
  for (const [userId, session] of sessions.entries()) {
    // Session inactive for more than 2 hours
    if (
      session.disconnectedAt &&
      now - session.disconnectedAt > 2 * 60 * 60 * 1000
    ) {
      sessions.delete(userId);
    }
  }
}, 5 * 60 * 1000); // Run every 5 minutes

// Helper function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const PORT = process.env.SOCKET_PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});

module.exports = { io, httpServer };
