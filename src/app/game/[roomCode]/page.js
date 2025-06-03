"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSocket } from "@/hooks/use-socket";
import { usePreventNavigation } from "@/hooks/use-prevent-navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Shield,
  Crown,
  User,
  Copy,
  Users,
  Check,
  X,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";
import { useId } from "react";
import { useSessionManager } from "@/hooks/use-session-manager";
import { api } from "@/lib/api";

export default function GameRoom() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const socket = useSocket();
  const roomCode = params.roomCode;
  const { user, isAuthenticated } = useSessionManager();

  // Get user ID and name from authentication first, fallback to localStorage if not authenticated
  const baseId = useId();
  const defaultUserId = `anon-${baseId.replace(/:/g, "")}`;

  // Add a state to track whether the room has been fetched
  const [hasRoomBeenFetched, setHasRoomBeenFetched] = useState(false);

  // Add a state to track active rooms
  const [activeRoomCode, setActiveRoomCode] = useState(null);

  // Use authentication for user identity, with fallback for anonymous users
  const getUserId = () => {
    if (user?.id) {
      return user.id;
    }
    
    if (typeof window !== "undefined") {
      const storedId = localStorage.getItem("userId");
      if (storedId) {
        return storedId;
      }
      // Create a new anonymous ID and store it
      localStorage.setItem("userId", defaultUserId);
      return defaultUserId;
    }
    return defaultUserId;
  };

  const getUserName = () => {
    if (user?.name) {
      return user.name;
    }
    
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("playerName");
      if (storedName) {
        return storedName;
      }
      // Generate a name for anonymous users
      const generatedName = generateAnonymousName();
      localStorage.setItem("playerName", generatedName);
      return generatedName;
    }
    return `Player${defaultUserId.slice(-5)}`;
  };

  // Function to generate a name for anonymous users
  const generateAnonymousName = () => {
    const adjectives = ["Happy", "Lucky", "Clever", "Brave", "Swift", "Calm", "Wise"];
    const nouns = ["Wizard", "Eagle", "Tiger", "Dragon", "Knight", "Player", "Hero"];
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${adj}${noun}`;
  };

  const currentUserId = getUserId();
  const currentUserName = getUserName();


  const [room, setRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [players, setPlayers] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [hasJoined, setHasJoined] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [gameResult, setGameResult] = useState(null);

  // Ref to track if we've already attempted to join the room
  const hasAttemptedToJoin = useRef(false);

  // Check if we're the host
  const isHost = room?.hostId === currentUserId;

  // Function to handle errors
  const handleError = useCallback(
    (error) => {
      setErrorMessage(error.message || "An error occurred");
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    },
    [toast]
  );

  // Read active room from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRoomCode = localStorage.getItem("activeRoomCode");
      if (storedRoomCode && storedRoomCode !== roomCode) {
        // User is trying to join a new room while already in another one
        toast({
          title: "Already in a Room",
          description: `You're already in room ${storedRoomCode}. Leaving that room first.`,
          variant: "warning",
        });
        
        // Force leave the old room first
        socket.leaveRoom({
          roomCode: storedRoomCode,
          userId: currentUserId,
        }).catch(err => {
          console.error("Error leaving previous room:", err);
        });
        
        // Clear the stored room
        localStorage.removeItem("activeRoomCode");
      }
      
      // If the user joins this room successfully, we'll set activeRoomCode in joinRoom
    }
  }, [roomCode, currentUserId, toast, socket]);

  // Handle room joining
  const joinRoom = useCallback(async () => {
    if (hasAttemptedToJoin.current) {
      return;
    }
    hasAttemptedToJoin.current = true;

    try {
      // Check if we're already in the room
      if (room?.playersList?.some(p => p.id === currentUserId)) {
        setHasJoined(true);
        setActiveRoomCode(roomCode);
        localStorage.setItem("activeRoomCode", roomCode);
        return;
      }

      // Store minimal info for anonymous users
      if (!isAuthenticated && typeof window !== "undefined") {
        localStorage.setItem("userId", currentUserId);
        localStorage.setItem("playerName", currentUserName);
      }


      // Set a timeout to prevent hanging if requests don't respond
      const joinTimeout = setTimeout(() => {
        if (!hasJoined) {
          console.error("Join room timeout - server did not respond");
          hasAttemptedToJoin.current = false; // Reset to allow retrying
          throw new Error("Timed out waiting for server response");
        }
      }, 8000); // Increased timeout for slower connections

      try {
        // First update the database via the API
        const response = await api.joinRoom(roomCode, {
          userId: currentUserId,
          userName: currentUserName,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to join room via API');
        }
        
        
        // Then attempt to join via socket for real-time updates
        await socket.joinRoom({
          roomCode,
          userId: currentUserId,
          userName: currentUserName,
        });
        
        clearTimeout(joinTimeout);
        
        // Store the active room code in localStorage
        localStorage.setItem("activeRoomCode", roomCode);
        setActiveRoomCode(roomCode);
        
        // The server should send us a room-state event that will set hasJoined
        // But in case it doesn't, we'll set it here as a fallback
        setTimeout(() => {
          if (!hasJoined) {
            setHasJoined(true);
          }
        }, 1000);
      } catch (socketError) {
        clearTimeout(joinTimeout);
        console.error("Error joining room:", socketError);
        throw socketError;
      }
    } catch (error) {
      console.error("Error joining room:", error);
      
      // Reset the attempt flag so we can try again if needed
      hasAttemptedToJoin.current = false;
      
      // Only show error if we're not already joined (to avoid duplicate toasts)
      if (!hasJoined) {
        handleError({
          message: error.message || "Failed to join room. Please try again.",
        });
      }
    }
  }, [
    roomCode,
    currentUserId,
    currentUserName,
    socket,
    toast,
    handleError,
    hasJoined,
    room,
    isAuthenticated
  ]);

  // Leave room function - call this when the user leaves or the component unmounts
  const leaveRoom = useCallback(async () => {
    if (hasJoined && roomCode && currentUserId) {

      try {
        // First remove the player from the database
        const response = await api.leaveRoom(roomCode, {
          userId: currentUserId,
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error removing from room in database:", errorData);
          }
        
        // Then disconnect from the socket
        await socket.leaveRoom({
          roomCode,
          userId: currentUserId,
        });
      } catch (error) {
        console.error("Error leaving room:", error);
      }

      // Clear the active room from localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("activeRoomCode");
      }
      
      setActiveRoomCode(null);
      setHasJoined(false);
    }
  }, [roomCode, currentUserId, socket, hasJoined]);

  // Add a state to track game status transitions
  const [gameStatusTransition, setGameStatusTransition] = useState({
    from: null,
    to: null,
    timestamp: null
  });

  // Update game statistics when the game ends
  const updateGameStats = useCallback(async (result) => {
    // Only update stats for authenticated users
    if (!user?.id) return;
    
    try {
      // Record that the user played a game
      await api.updateUserStats(user.id, {
        action: "gamePlayed",
      });
      
      // If the user won, update their win count
      if (result?.winner === currentUserId) {
        await api.updateUserStats(user.id, {
          action: "gameWon",
        });
      }
      
      // If there's a score to add
      if (result?.score) {
        await api.updateUserStats(user.id, {
          action: "scoreAdded",
          score: result.score,
        });
      }
    } catch (error) {
      console.error("Error updating game stats:", error);
    }
  }, [user, currentUserId]);

  // Fetch room details and set up socket listeners
  useEffect(() => {
    let isMounted = true;
    let hasDisplayedConnectionError = false;
    let loadingTimeout = null;

    // Add a timeout to prevent indefinite loading
    const setupLoadingTimeout = () => {
      // Clear any existing timeout
      if (loadingTimeout) clearTimeout(loadingTimeout);
      
      // Set a new timeout to force exit loading state after 10 seconds
      loadingTimeout = setTimeout(() => {
        if (isMounted && isLoading) {
          setIsLoading(false);
          if (!errorMessage) {
            setErrorMessage("Failed to load room data in a reasonable time. Please refresh and try again.");
          }
        }
      }, 10000);
    };

    // Call the timeout setup
    setupLoadingTimeout();

    // Fetch room details - only once
    const fetchRoom = async () => {
      // Don't fetch if we've already done so or if already attempting to join
      if (hasRoomBeenFetched || hasAttemptedToJoin.current) return;
      
      try {
        const response = await api.getRoom(roomCode);
        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? "Room not found"
              : "Failed to load room data"
          );
        }

        const { data } = await response.json();

        if (isMounted) {
          setRoom(data);
          setPlayers(data.playersList || []);
          setHasRoomBeenFetched(true); // Mark as fetched to prevent loops
          setIsLoading(false); // Explicitly set loading to false when data is received

          // Check if user is already in the room
          const isPlayerInRoom = data.playersList?.some(
            (p) => p.id === currentUserId
          );

          // Check if room is full and user is not already in it
          if (data.status === "waiting" && 
              data.players && 
              data.players.current >= data.players.max && 
              !isPlayerInRoom) {
            setErrorMessage(`Room ${roomCode} is full (${data.players.current}/${data.players.max})`);
            toast({
              title: "Room is Full",
              description: `Cannot join room ${roomCode} as it is at maximum capacity.`,
              variant: "destructive",
            });
            // Don't attempt to join - user is not already in and room is full
            return;
          }

          if (isPlayerInRoom) {
            setHasJoined(true);
          } else if (socket.isConnected && !hasJoined) {
            // Try to join the room if not already in it and not already attempting
            // We'll set hasAttemptedToJoin in the joinRoom function
            joinRoom();
          }
        }
      } catch (error) {
        console.error("Error fetching room:", error);
        if (isMounted) {
          setErrorMessage(
            error.message || "Room not found or no longer available"
          );
          toast({
            title: "Error",
            description:
              error.message || "Room not found or no longer available",
            variant: "destructive",
          });
          setHasRoomBeenFetched(true); // Mark as fetched even on error
          setIsLoading(false); // Always set loading to false on error as well
        }
      }
    };

    fetchRoom();

    // Setup socket listeners for room events
    const handleRoomState = (updatedRoom) => {
      if (!isMounted || !updatedRoom) return;
      
      // Check for status changes
      if (room && room.status !== updatedRoom.status) {
        setGameStatusTransition({
          from: room.status,
          to: updatedRoom.status,
          timestamp: new Date()
        });
        
        // Show toast for status changes
        if (updatedRoom.status === "in-progress" && room.status === "waiting") {
          toast({
            title: "Game Started",
            description: "The game has started! Good luck and have fun!",
            variant: "success",
          });
        } else if (updatedRoom.status === "finished" && room.status === "in-progress") {
          toast({
            title: "Game Ended",
            description: "The game has ended. Check the results!",
            variant: "info",
          });
          
          // Update game statistics if the game finished
          if (updatedRoom.gameState?.result) {
            setGameResult(updatedRoom.gameState.result);
            updateGameStats(updatedRoom.gameState.result);
          }
        } else if (updatedRoom.status === "inactive") {
          toast({
            title: "Room Inactive",
            description: "This room has been marked as inactive.",
            variant: "destructive",
          });
        }
      }
      
      // Always update the room state when we receive an update
      setRoom(updatedRoom);
      setPlayers(updatedRoom.playersList || []);
      
      // Make sure loading is false when we get room state
      setIsLoading(false);
      
      // If this update confirms we're in the room, set hasJoined
      const isPlayerInRoom = updatedRoom.playersList?.some(
        (p) => p.id === currentUserId
      );
      
      if (isPlayerInRoom && !hasJoined) {
        setHasJoined(true);
        
        // Store the active room code in localStorage
        localStorage.setItem("activeRoomCode", roomCode);
        setActiveRoomCode(roomCode);
      }
    };

    const handlePlayerJoined = (data) => {
      if (isMounted && data.roomCode === roomCode) {
        toast({
          title: "Player Joined",
          description: `${data.userName} has joined the room!`,
          variant: "default",
        });

        // We'll get a full room update from the server, but update immediately for better UX
        setPlayers((prev) => {
          if (prev.some((p) => p.id === data.userId)) {
            return prev;
          }
          return [
            ...prev,
            { id: data.userId, name: data.userName, isReady: false },
          ];
        });
      }
    };

    const handlePlayerLeft = (data) => {
      if (isMounted && data.roomCode === roomCode) {
        const playerName =
          players.find((p) => p.id === data.userId)?.name || "A player";

        toast({
          title: "Player Left",
          description: `${playerName} has left the room.`,
          variant: "default",
        });

        // We'll get a full room update from the server, but update immediately for better UX
        setPlayers((prev) => prev.filter((p) => p.id !== data.userId));
      }
    };

    const handleReadyUpdate = (data) => {
      if (isMounted && data.roomCode === roomCode) {
        const playerName =
          players.find((p) => p.id === data.userId)?.name || "A player";

        toast({
          title: data.isReady ? "Player Ready" : "Player Not Ready",
          description: `${playerName} is ${
            data.isReady ? "ready" : "not ready"
          } to play.`,
          variant: "default",
        });

        // Update the player's ready status
        setPlayers((prev) =>
          prev.map((p) =>
            p.id === data.userId ? { ...p, isReady: data.isReady } : p
          )
        );
      }
    };

    const handleHostChanged = (data) => {
      if (isMounted && data.roomCode === roomCode) {
        const newHostName =
          players.find((p) => p.id === data.newHostId)?.name || "New host";

        toast({
          title: "Host Changed",
          description: `${newHostName} is now the host of the room.`,
          variant: "info",
        });

        // Update room host ID immediately for better UX
        if (room) {
          setRoom((prev) => ({ ...prev, hostId: data.newHostId }));
        }
      }
    };

    const handleGameStarted = (data) => {
      if (isMounted && data.roomCode === roomCode) {
        toast({
          title: "Game Started",
          description: "The game has started! Get ready to play.",
          variant: "success",
        });
      }
    };

    const handleRoleAssigned = (data) => {
      if (isMounted && data.userId === currentUserId) {
        let roleDisplay = "";

        switch (data.role) {
          case "raja":
            roleDisplay = "Raja (King)";
            break;
          case "mantri":
            roleDisplay = "Mantri (Minister)";
            break;
          case "chor":
            roleDisplay = "Chor (Thief)";
            break;
          case "sipahi":
            roleDisplay = "Sipahi (Police)";
            break;
          default:
            roleDisplay = data.role;
        }

        toast({
          title: "Role Assigned",
          description: `You are the ${roleDisplay} this round.`,
          variant: "success",
        });
      }
    };

    const handleChatMessage = (data) => {
      if (isMounted && data.roomCode === roomCode) {
        setChatMessages((prev) => [
          ...prev,
          {
            playerId: data.playerId,
            playerName: data.playerName,
            message: data.message,
            timestamp: data.timestamp,
          },
        ]);
      }
    };

    const handleGameResult = (data) => {
      if (isMounted && data.roomCode === roomCode) {
        setGameResult(data);
        
        // Update game statistics
        updateGameStats(data);
        
        toast({
          title: "Game Result",
          description: `The game has ended. ${data.winnerName || 'Someone'} has won!`,
          variant: "success",
        });
      }
    };

    const handleRoomError = (error) => {
      if (isMounted) {
        handleError(error);
      }
    };

    // Register all event listeners
    const cleanupFunctions = [];

    if (socket.isConnected) {
      cleanupFunctions.push(socket.onRoomState(handleRoomState));
      cleanupFunctions.push(socket.onPlayerJoined(handlePlayerJoined));
      cleanupFunctions.push(socket.onPlayerLeft(handlePlayerLeft));
      cleanupFunctions.push(socket.onReadyUpdate(handleReadyUpdate));
      cleanupFunctions.push(socket.onHostChanged(handleHostChanged));
      cleanupFunctions.push(socket.onGameStarted(handleGameStarted));
      cleanupFunctions.push(socket.onRoleAssigned(handleRoleAssigned));
      cleanupFunctions.push(socket.onChatMessage(handleChatMessage));
      cleanupFunctions.push(socket.onError(handleRoomError));
      
      // Add new event handler for game results if available
      if (socket.onGameResult) {
        cleanupFunctions.push(socket.onGameResult(handleGameResult));
      }

      // If socket is connected but we haven't joined, try to join
      if (!hasJoined && !hasAttemptedToJoin.current) {
        joinRoom();
      }
    }

    // Handle connection changes
    const connectionStatusCheck = setInterval(() => {
      if (socket.isConnected && !hasJoined && !hasAttemptedToJoin.current) {
        // Only try to join if we have room data and haven't attempted yet
        if (room && !hasAttemptedToJoin.current) {
          joinRoom();
        } else if (!hasRoomBeenFetched && !hasAttemptedToJoin.current) {
          // If we don't have room data yet, fetch it first
          fetchRoom();
        }
      } else if (socket.connectionError && !hasDisplayedConnectionError) {
        // Show connection error only once
        hasDisplayedConnectionError = true;
        toast({
          title: "Connection Error",
          description:
            "Failed to connect to game server. Please try again later.",
          variant: "destructive",
        });
      }
    }, 3000); // Increased interval to reduce checks

    // Cleanup function
    return () => {
      isMounted = false;
      if (loadingTimeout) clearTimeout(loadingTimeout);
      clearInterval(connectionStatusCheck);

      // Clean up all event listeners
      cleanupFunctions.forEach((cleanup) => {
        if (typeof cleanup === "function") {
          cleanup();
        }
      });

      // Leave the room when component unmounts
      leaveRoom();
    };
  }, [
    roomCode,
    currentUserId,
    socket,
    toast,
    handleError,
    joinRoom,
    hasJoined,
    leaveRoom,
    players,
    room,
    hasRoomBeenFetched,
    isLoading,
    errorMessage,
    isAuthenticated,
    updateGameStats
  ]);

  // Add a special effect just to listen for socket connection changes
  useEffect(() => {
    if (socket.isConnected && isLoading && !hasRoomBeenFetched && !hasAttemptedToJoin.current) {
      // If socket connected but we're still loading and haven't fetched room yet, try to fetch
      const fetchRoomData = async () => {
        try {
          const response = await api.getRoom(roomCode);
          
          if (!response.ok) {
            throw new Error("Failed to load room");
          }
          
          const { data } = await response.json();
          setRoom(data);
          setPlayers(data.playersList || []);
          setHasRoomBeenFetched(true);
          setIsLoading(false);
          
          // Continue with join logic if needed
          const isPlayerInRoom = data.playersList?.some(p => p.id === currentUserId);
          if (isPlayerInRoom) {
            setHasJoined(true);
          } else if (!hasAttemptedToJoin.current) {
            joinRoom();
          }
        } catch (error) {
          console.error("Error fetching room on socket connect:", error);
          setErrorMessage(error.message || "Failed to load room");
          setIsLoading(false);
        }
      };
      
      fetchRoomData();
    }
  }, [socket.isConnected, isLoading, hasRoomBeenFetched, roomCode, currentUserId, joinRoom, hasAttemptedToJoin]);

  // Add beforeunload event listener to leave room when browser closes
  useEffect(() => {
    const handleBeforeUnload = () => {
      leaveRoom();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [leaveRoom]);

  // Copy room code to clipboard
  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
    toast({
      title: "Room Code Copied",
      description: "You can share this code with friends to join your game",
    });
  };

  // Toggle ready status
  const toggleReady = async () => {
    if (!currentPlayer) {
      toast({
        title: "Error",
        description: "You must join the room before you can ready up.",
        variant: "destructive",
      });
      return;
    }
    
    // If game is not in waiting state, don't allow ready toggle
    if (gameStatus !== "waiting") {
      toast({
        title: "Cannot Change Ready Status",
        description: "The game is already in progress.",
        variant: "warning",
      });
      return;
    }
    
    const newReadyStatus = !players.find((p) => p.id === currentUserId)?.isReady;
    
    try {
      await socket.setPlayerReady({
        roomCode,
        userId: currentUserId,
        isReady: newReadyStatus,
      });
      
      // Optimistically update UI
      setPlayers(prev => 
        prev.map(player => 
          player.id === currentUserId 
            ? {...player, isReady: newReadyStatus}
            : player
        )
      );
      
    } catch (error) {
      console.error("Error toggling ready status:", error);
      handleError({
        message: "Failed to update ready status. Please try again."
      });
    }
  };

  // Start game with proper validation
  const startGame = async () => {
    if (!isHost) {
      toast({
        title: "Not Host",
        description: "Only the host can start the game",
        variant: "warning",
      });
      return;
    }
    
    if (players.length < 4) {
      toast({
        title: "Not Enough Players",
        description: "You need exactly 4 players to start the game",
        variant: "warning",
      });
      return;
    }

    if (!players.every((p) => p.isReady)) {
      toast({
        title: "Players Not Ready",
        description: "All players must be ready to start the game",
        variant: "warning",
      });
      return;
    }

    try {
      // Show loading state
      toast({
        title: "Starting Game",
        description: "Please wait while the game initializes...",
      });
      
      await socket.startGame({ roomCode });
      
      // Game started successfully, the socket will send updates
      toast({
        title: "Game Started",
        description: "The game has begun! Have fun!",
        variant: "success",
      });
    } catch (error) {
      console.error("Error starting game:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to start game. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Send chat message
  const sendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    socket
      .sendChatMessage({
        roomCode,
        userId: currentUserId,
        message: messageInput.trim(),
      })
      .catch(handleError);

    setMessageInput("");
  };

  // Handle leaving the room manually
  const handleLeaveRoom = () => {
    leaveRoom();
    router.push('/');
  };

  // Define gameStatus before using it in usePreventNavigation
  const gameStatus = room?.status || "waiting";

  // Add the usePreventNavigation hook before the return statement
  usePreventNavigation(
    hasJoined && gameStatus === "in-progress",
    "You are currently in a game. Are you sure you want to leave?",
    () => {
      leaveRoom();
    }
  );

  if (isLoading) {
    return (
      <div className="flex h-screen w-full bg-gradient-to-br from-indigo-50 to-pink-50">
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <h2 className="text-xl font-bold text-purple-800">
                  Loading Game Room...
                </h2>
                {!socket.isConnected && (
                  <p className="text-amber-600 mt-2">
                    Connecting to game server...
                  </p>
                )}
                <button 
                  onClick={() => {
                    // Force exit loading state
                    setIsLoading(false);
                    // Try to fetch room again
                    if (typeof window !== "undefined") {
                      window.location.reload();
                    }
                  }}
                  className="mt-6 text-sm text-purple-600 hover:text-purple-800 underline"
                >
                  Taking too long? Click to refresh
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (errorMessage || !room) {
    return (
      <div className="flex h-screen w-full bg-gradient-to-br from-indigo-50 to-pink-50">
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">😕</div>
                <h2 className="text-xl font-bold text-purple-800 mb-2">
                  {errorMessage || "Room Not Found"}
                </h2>
                <p className="text-gray-600 mb-6">
                  {errorMessage
                    ? "Please try again later."
                    : "This game room doesn't exist or is no longer available."}
                </p>
                <div className="flex space-x-4 justify-center">
                  <Button
                    onClick={() => router.push("/")}
                    className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 px-6 rounded-full"
                  >
                    Back to Home
                  </Button>
                  <Button
                    onClick={() => {
                      // Clear error and try again
                      setErrorMessage(null);
                      setIsLoading(true);
                      setHasRoomBeenFetched(false);
                      hasAttemptedToJoin.current = false;
                      
                      // Force page refresh to retry
                      if (typeof window !== "undefined") {
                        window.location.reload();
                      }
                    }}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 px-6 rounded-full"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const currentPlayer = players.find((p) => p.id === currentUserId);
  const allPlayersReady =
    players.length >= 4 && players.every((p) => p.isReady);
  const isGameInProgress = gameStatus === "in-progress";

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-indigo-50 to-pink-50">
      <main className="flex-1 p-4 md:p-8 font-poppins">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 border-4 border-violet-300">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="mr-2 text-gray-500 hover:text-gray-700"
                  onClick={handleLeaveRoom}
                >
                  <ArrowLeft size={18} className="mr-1" />
                  Leave
                </Button>

                <div>
                  <h1 className="text-2xl font-bangers text-purple-800 tracking-wide">
                    {room.title}
                  </h1>
                  <div className="flex items-center mt-2">
                    <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium text-sm flex items-center">
                      <span>Room Code: {roomCode}</span>
                      <button
                        onClick={copyRoomCode}
                        className="ml-2 text-purple-600 hover:text-purple-800"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium text-sm flex items-center mr-2">
                  <Users className="mr-1" size={16} />
                  <span>
                    {players.length}/{room.players?.max || 4} Players
                  </span>
                </div>
                {isHost && gameStatus === "waiting" && (
                  <Button
                    onClick={startGame}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-poppins"
                    disabled={!allPlayersReady || players.length !== 4}
                  >
                    Start Game
                  </Button>
                )}
              </div>
            </div>

            {gameStatus === "waiting" && (
              <div className="mb-6">
                <h2 className="text-lg font-bangers text-gray-800 mb-3 tracking-wide">
                  Waiting for Players
                </h2>
                <p className="text-gray-600 mb-2">
                  This game requires exactly 4 players. Mark yourself as ready
                  when you're prepared to start.
                </p>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      allPlayersReady && players.length === 4
                        ? "bg-green-500"
                        : players.length < 4
                        ? "bg-yellow-500"
                        : "bg-orange-500"
                    }`}
                  ></div>
                  <span className="text-sm font-medium">
                    {allPlayersReady && players.length === 4
                      ? "All players ready! Game can start."
                      : players.length < 4
                      ? `Waiting for more players (${players.length}/4)...`
                      : "Waiting for players to ready up..."}
                  </span>
                </div>
                {players.length < 4 && (
                  <div className="mt-2 text-sm text-purple-600">
                    <span>Share the room code <span className="font-bold">{roomCode}</span> with your friends to join!</span>
                    <button
                      onClick={copyRoomCode}
                      className="ml-2 underline text-purple-800 hover:text-purple-900"
                    >
                      Copy Code
                    </button>
                  </div>
                )}
              </div>
            )}

            {gameStatus === "in-progress" && room.gameState && (
              <div className="mb-6">
                <h2 className="text-lg font-bangers text-gray-800 mb-3 tracking-wide">
                  Game in Progress
                </h2>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-yellow-800 font-medium">
                    Round {room.gameState.round}: {room.gameState.phase}
                  </p>
                  {room.gameState.phase === "role-assignment" && (
                    <p className="text-yellow-700 text-sm mt-1">
                      Roles have been assigned. Check your role below!
                    </p>
                  )}
                  {room.gameState.phase === "guess-made" && (
                    <p className="text-yellow-700 text-sm mt-1">
                      The Sipahi has made their guess! Waiting for round to end...
                    </p>
                  )}
                </div>
              </div>
            )}

            {gameStatus === "finished" && (
              <div className="mb-6">
                <h2 className="text-lg font-bangers text-gray-800 mb-3 tracking-wide">
                  Game Finished
                </h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-blue-800">
                    This game has ended. Final scores are displayed below.
                  </p>
                </div>
              </div>
            )}

            {gameStatus === "inactive" && (
              <div className="mb-6">
                <h2 className="text-lg font-bangers text-red-800 mb-3 tracking-wide">
                  Room Inactive
                </h2>
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-800">
                    This room has been marked as inactive due to inactivity or all players leaving.
                  </p>
                  <button
                    onClick={() => router.push('/')}
                    className="mt-2 text-sm underline text-red-600 hover:text-red-800"
                  >
                    Return to lobby
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {players.map((player) => (
                <div
                  key={player.id}
                  className={`p-4 rounded-xl border-2 ${
                    player.isReady
                      ? "border-green-300 bg-green-50"
                      : "border-gray-200 bg-gray-50"
                  } ${
                    player.id === currentUserId
                      ? "border-blue-300 bg-blue-50"
                      : ""
                  } transition-all duration-300`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {player.id === room.hostId ? (
                        <Crown className="mr-2 text-amber-500" size={20} />
                      ) : (
                        <User className="mr-2 text-blue-500" size={20} />
                      )}
                      <div>
                        <div className="font-medium">
                          {player.name}
                          {player.id === currentUserId && " (You)"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {player.id === room.hostId ? "Host" : "Player"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      {gameStatus === "waiting" && (
                        <div
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            player.isReady
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {player.isReady ? (
                            <span className="flex items-center">
                              <Check size={12} className="mr-1" />
                              Ready
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <X size={12} className="mr-1" />
                              Not Ready
                            </span>
                          )}
                        </div>
                      )}

                      {gameStatus === "in-progress" &&
                        room.gameState &&
                        room.gameState.playerRoles &&
                        currentUserId === player.id && (
                          <div className="px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800">
                            Your Role:{" "}
                            {room.gameState.playerRoles[currentUserId]}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {currentPlayer && gameStatus === "waiting" && (
              <div className="flex justify-center mb-6">
                <Button
                  onClick={toggleReady}
                  className={`px-6 py-2 rounded-full font-medium ${
                    currentPlayer.isReady
                      ? "bg-amber-500 hover:bg-amber-600 text-white"
                      : "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                  }`}
                >
                  {currentPlayer.isReady ? "Cancel Ready" : "Ready Up"}
                </Button>
              </div>
            )}

            {/* Chat Section */}
            <div className="mt-8 border-t-2 border-gray-100 pt-4">
              <h3 className="font-bangers text-gray-800 mb-3 tracking-wide flex items-center">
                <MessageCircle size={18} className="mr-2 text-blue-500" />
                Chat
              </h3>

              <div className="h-48 overflow-y-auto border rounded-lg p-3 mb-3 bg-gray-50">
                {chatMessages.length === 0 && (
                  <div className="text-gray-400 text-center py-4">
                    No messages yet. Say hello!
                  </div>
                )}

                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-2 ${
                      msg.playerId === currentUserId ? "text-right" : ""
                    }`}
                  >
                    <div
                      className={`inline-block px-3 py-2 rounded-lg ${
                        msg.playerId === currentUserId
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      <div className="text-xs font-medium mb-1">
                        {msg.playerId === currentUserId
                          ? "You"
                          : msg.playerName}
                      </div>
                      <div className="text-sm">{msg.message}</div>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={sendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg"
                  disabled={!messageInput.trim()}
                >
                  Send
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
