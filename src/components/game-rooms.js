"use client";

import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { useSocket } from "@/hooks/use-socket";
import { GameCard } from "@/components/game-card";
import { GamesPagination } from "@/components/game-pagination";
import { GamesFilter } from "@/components/game-filters";
import { useToast } from "@/hooks/use-toast";
import { CreateRoomModal, RoomCodeModal } from "@/components/create-room-modal";
import { JoinRoomModal } from "@/components/join-room-modal";
import { useId } from "react";
import { getInitialRooms } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { AuthModal } from "@/components/auth-modal";
import Image from "next/image";

// Memoized GameCard component
const MemoizedGameCard = memo(GameCard);

export function GameRooms() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const socket = useSocket();
  const router = useRouter();
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    isPrivate: "all",
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [createdRoomCode, setCreatedRoomCode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeRoomCode, setActiveRoomCode] = useState(null);
  const [pendingAction, setPendingAction] = useState(null);
  
  // Use a stable ID from React's useId hook  
  const baseId = useId();
  
  // Function to generate a reasonable player name
  const generatePlayerName = useCallback(() => {
    const adjectives = ["Happy", "Lucky", "Clever", "Brave", "Swift", "Calm", "Wise"];
    const nouns = ["Wizard", "Eagle", "Tiger", "Dragon", "Knight", "Player", "Hero"];
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${adj}${noun}`;
  }, []);

  // Add a function to get or create a user name
  const getUserName = useCallback(() => {
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("playerName");
      if (storedName) {
        return storedName;
      }
      const generatedName = generatePlayerName();
      localStorage.setItem("playerName", generatedName);
      return generatedName;
    }
    return generatePlayerName();
  }, [generatePlayerName]);
  
  // Use authenticated user data when available, otherwise use localStorage fallback  
  const getUserIdFromLocalStorage = () => typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
  const getUserNameFromLocalStorage = () => typeof window !== 'undefined' ? localStorage.getItem('playerName') : null;
  
  const currentUserId = session?.user?.id || getUserIdFromLocalStorage() || `anon-${baseId.replace(/:/g, '')}`;
  const currentUserName = session?.user?.name || getUserNameFromLocalStorage() || generatePlayerName();

  // Check if user is already in a room on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRoomCode = localStorage.getItem("activeRoomCode");
      if (storedRoomCode) {
        setActiveRoomCode(storedRoomCode);
        
        // If user is already in a room, offer to return there
        toast({
          title: "Active Game Session",
          description: (
            <div className="flex flex-col space-y-2">
              <p>You're currently in room {storedRoomCode}.</p>
              <button 
                onClick={() => router.push(`/game/${storedRoomCode}`)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm"
              >
                Return to Room
              </button>
            </div>
          ),
          duration: 8000,
        });
      }
    }
  }, [router, toast]);

  // Initial data fetch using server action
  useEffect(() => {
    const fetchInitialRooms = async () => {
      try {
        const result = await getInitialRooms();
        if (result.success) {
          setRooms(result.data);
        } else {
          console.error("Failed to fetch initial rooms:", result.error);
          toast({
            title: "Error",
            description: "Failed to load rooms. Please refresh the page.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching initial rooms:", error);
        toast({
          title: "Error",
          description: "Failed to load rooms. Please refresh the page.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialRooms();
  }, [toast]);

  // Socket connection for real-time updates
  useEffect(() => {
    if (!socket.isConnected) {
      return;
    }

    // Handle room state updates
    const handleRoomUpdate = (updatedRoom) => {

      // Ensure the room has all the required properties
      if (!updatedRoom || !updatedRoom.id) {
        return;
      }
      
      setRooms(prevRooms => {
        // Check if the room already exists
        const exists = prevRooms.some(room => room.id === updatedRoom.id);
        
        // Create a properly formatted room object with all required fields
        const formattedRoom = {
          ...updatedRoom,
          // Ensure players field is correctly structured
          players: {
            current: updatedRoom.playersList?.length || updatedRoom.players?.current || 0,
            max: updatedRoom.players?.max || 4
          },
          // Ensure status is a valid status
          status: updatedRoom.status || "waiting",
          // Copy over playersList if available
          playersList: updatedRoom.playersList || []
        };
        
        
        if (exists) {
          // Update existing room
          return prevRooms.map(room => 
            room.id === updatedRoom.id ? formattedRoom : room
          );
        } else {
          // Add new room
          return [formattedRoom, ...prevRooms];
        }
      });
    };
    
    // Add a periodic refresh of game rooms to ensure data is up to date
    const refreshTimer = setInterval(async () => {
      try {
        const result = await getInitialRooms();
        if (result.success) {
          setRooms(prevRooms => {
            // Create a map of existing rooms for faster lookup
            const existingRoomsMap = new Map(
              prevRooms.map(room => [room.id, room])
            );
            
            // Process the new data from the server
            const updatedRooms = result.data.map(newRoom => {
              const existingRoom = existingRoomsMap.get(newRoom.id);
              
              // If room exists, merge data preferring real-time data
              if (existingRoom) {
                return {
                  ...newRoom,
                  // Preserve local state that may be more up-to-date
                  players: {
                    current: Math.max(
                      existingRoom.players?.current || 0,
                      newRoom.players?.current || 0,
                      newRoom.playersList?.length || 0
                    ),
                    max: newRoom.players?.max || existingRoom.players?.max || 4
                  },
                  // Keep existing playersList if it's more complete
                  playersList: newRoom.playersList?.length >= existingRoom.playersList?.length
                    ? newRoom.playersList
                    : existingRoom.playersList
                };
              }
              
              // Otherwise return the new room data
              return newRoom;
            });
            
            return updatedRooms;
          });
        }
      } catch (error) {
        console.error("Error refreshing rooms:", error);
      }
    }, 10000); // Refresh every 10 seconds

    // Handle player joining event
    const handlePlayerJoined = (data) => {
      const { roomCode, userId, userName, timestamp } = data;
      
      // Update the specific room with the new player count
      setRooms(prevRooms => {
        return prevRooms.map(room => {
          if (room.roomCode === roomCode) {
            // Update playersList and player count
            const updatedPlayersList = [...(room.playersList || [])];
            
            // Only add if player isn't already in the list
            if (!updatedPlayersList.some(p => p.id === userId)) {
              updatedPlayersList.push({
                id: userId,
                name: userName,
                isReady: false,
                joinedAt: timestamp
              });
            }
            
            return {
              ...room,
              playersList: updatedPlayersList,
              players: {
                ...room.players,
                current: updatedPlayersList.length
              }
            };
          }
          return room;
        });
      });
      
      toast({
        title: "Player Joined",
        description: `${userName} has joined the room!`,
        variant: "default",
      });
    };

    // Handle player leaving event
    const handlePlayerLeft = (data) => {
      const { roomCode, userId, timestamp } = data;
      
      // Update the specific room with the reduced player count
      setRooms(prevRooms => {
        return prevRooms.map(room => {
          if (room.roomCode === roomCode) {
            // Get player name before removing
            const leavingPlayer = room.playersList?.find(p => p.id === userId);
            const playerName = leavingPlayer?.name || "A player";
            
            // Update playersList by removing the player
            const updatedPlayersList = (room.playersList || []).filter(
              p => p.id !== userId
            );
            
            // Toast notification outside the rendering logic
            if (leavingPlayer) {
              setTimeout(() => {
                toast({
                  title: "Player Left",
                  description: `${playerName} has left the room.`,
                  variant: "default",
                });
              }, 0);
            }
            
            return {
              ...room,
              playersList: updatedPlayersList,
              players: {
                ...room.players,
                current: updatedPlayersList.length
              }
            };
          }
          return room;
        });
      });
    };
    
    // Handle game started event
    const handleGameStarted = (data) => {
      const { roomCode } = data;
      
      // Update the specific room to show in-progress status
      setRooms(prevRooms => {
        return prevRooms.map(room => {
          if (room.roomCode === roomCode) {
            return {
              ...room,
              status: "in-progress"
            };
          }
          return room;
        });
      });
      
      toast({
        title: "Game Started",
        description: `A game has started in room ${roomCode}!`,
        variant: "success",
      });
    };

    // Handle host changed event
    const handleHostChanged = (data) => {
      const { roomCode, previousHostId, newHostId, timestamp } = data;
      
      // Get the new host name from the existing room data if possible
      const room = rooms.find(r => r.roomCode === roomCode);
      const newHostName = room?.playersList?.find(p => p.id === newHostId)?.name || "New host";
      
      toast({
        title: "Host Changed",
        description: `${newHostName} is now the host of the room.`,
        variant: "info",
      });
      
      // The full room state update will come from onGameStateUpdate
    };

    // Handle room error event
    const handleRoomError = (error) => {
      toast({
        title: "Room Error",
        description: error.message || "Something went wrong with the room.",
        variant: "destructive",
      });
    };

    // Register event listeners
    const gameStateCleanup = socket.onGameStateUpdate(handleRoomUpdate);
    const playerJoinedCleanup = socket.onPlayerJoined(handlePlayerJoined);
    const playerLeftCleanup = socket.onPlayerLeft(handlePlayerLeft);
    const gameStartedCleanup = socket.onGameStarted ? socket.onGameStarted(handleGameStarted) : null;
    const hostChangedCleanup = socket.onHostChanged ? socket.onHostChanged(handleHostChanged) : null;
    const errorCleanup = socket.onError(handleRoomError);

    // Cleanup all listeners when component unmounts
    return () => {
      clearInterval(refreshTimer);
      gameStateCleanup && gameStateCleanup();
      playerJoinedCleanup && playerJoinedCleanup();
      playerLeftCleanup && playerLeftCleanup();
      gameStartedCleanup && gameStartedCleanup();
      hostChangedCleanup && hostChangedCleanup();
      errorCleanup && errorCleanup();
    };
  }, [socket, toast, rooms, socket.isConnected]);

  // Memoized filter function
  const filterRooms = useCallback((rooms, filters) => {
    return rooms.filter((room) => {
      const matchesSearch = !filters.search || 
        room.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
        room.roomCode?.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesStatus = filters.status === "all" || room.status === filters.status;
      
      const matchesPrivacy = filters.isPrivate === "all" || 
        (filters.isPrivate === "private" ? room.isPrivate : !room.isPrivate);

      return matchesSearch && matchesStatus && matchesPrivacy;
    });
  }, []);

  // Apply filters when they change
  useEffect(() => {
    const result = filterRooms(rooms, filters);
    setFilteredRooms(result);
    setCurrentPage(1);
  }, [filters, rooms, filterRooms]);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  // Helper function to handle the actual room joining
  const proceedWithJoiningRoom = useCallback(async (room) => {
    // Check if room is full and handle accordingly
    if (room.status === "waiting" && room.players && room.players.current >= room.players.max) {
      toast({
        title: "Room is Full",
        description: `Room ${room.roomCode} is at maximum capacity (${room.players.current}/${room.players.max}).`,
        variant: "destructive",
      });
      return;
    }

    if (room.isPrivate && room.hostId !== currentUserId) {
      toast({
        title: "Private Room",
        description: `This is a private room. Please enter the room code to join.`,
        variant: "warning",
      });
      setIsJoinModalOpen(true);
      return;
    }

    // If not authenticated, prompt with auth modal if not dismissed before
    if (!session && !localStorage.getItem('dismissAuthModal')) {
      // Save pending action to continue after auth
      setPendingAction(() => () => proceedWithJoiningRoom(room));
      setIsAuthModalOpen(true);
      return;
    }
    
    // For anonymous users, we still need to store a consistent identity
    if (!session) {
      // Store minimal info for anonymous users
      localStorage.setItem('playerName', currentUserName);
      localStorage.setItem('userId', currentUserId);
    }
    
    try {
      // Join the room via API to update the database
      const response = await fetch(`/api/rooms/${room.roomCode}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userId: currentUserId, 
          userName: currentUserName 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to join room via API');
      }
      
      // Update the active room code
      setActiveRoomCode(room.roomCode);
      localStorage.setItem("activeRoomCode", room.roomCode);

      // Show toast before navigation
      toast({
        title: getJoinActionText(room.status),
        description: `You are ${getJoinActionVerb(room.status)} Room ${room.roomCode}`,
        variant: "default",
      });

      // Redirect to the game page
      router.push(`/game/${room.roomCode}`);
    } catch (error) {
      console.error("Error joining room:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to join room. Please try again.",
        variant: "destructive",
      });
    }
  }, [currentUserId, currentUserName, toast, router, session, setIsJoinModalOpen, setIsAuthModalOpen, setPendingAction]);

  // Update handleJoinRoom to use auth data and direct database access
  const handleJoinRoom = useCallback(async (roomId) => {
    const room = rooms.find((r) => r.id === roomId);
    if (!room) {
      toast({
        title: "Error",
        description: "Room not found.",
        variant: "destructive",
      });
      return;
    }

    // If user is already in another room, warn them
    if (activeRoomCode && activeRoomCode !== room.roomCode) {
      toast({
        title: "Already in a Room",
        description: (
          <div className="flex flex-col space-y-2">
            <p>You're already in room {activeRoomCode}. Do you want to leave that room and join this one?</p>
            <div className="flex space-x-2">
              <button 
                onClick={() => {
                  // Continue with joining new room
                  proceedWithJoiningRoom(room);
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm"
              >
                Join New Room
              </button>
              <button 
                onClick={() => router.push(`/game/${activeRoomCode}`)}
                className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-3 rounded text-sm"
              >
                Return to Current Room
              </button>
            </div>
          </div>
        ),
        duration: 10000,
      });
      return;
    }

    // Otherwise proceed with joining
    proceedWithJoiningRoom(room);
  }, [rooms, toast, router, activeRoomCode, proceedWithJoiningRoom]);

  // Update handleCreateRoom to use auth data and update game stats
  const handleCreateRoom = useCallback(async (roomName) => {
    try {
      // If not authenticated, prompt with auth modal instead of redirect
      if (!session && !localStorage.getItem('dismissAuthModal')) {
        // Save pending action to continue after auth
        setPendingAction(() => () => handleCreateRoom(roomName));
        setIsAuthModalOpen(true);
        return;
      }

      // For anonymous users, we still need to store a consistent identity
      if (!session) {
        localStorage.setItem('playerName', currentUserName);
        localStorage.setItem('userId', currentUserId);
      }

      // Create the room via API
      const response = await fetch("/api/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: roomName,
          hostId: currentUserId,
          hostName: currentUserName,
          isPrivate: false,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create room");
      }

      const { data: newRoom } = await response.json();
      setRooms(prevRooms => [newRoom, ...prevRooms]);
      setCreatedRoomCode(newRoom.roomCode);
      
      // Set active room code
      setActiveRoomCode(newRoom.roomCode);
      localStorage.setItem("activeRoomCode", newRoom.roomCode);
      
      // Join the room via API to add the host as a player
      await fetch(`/api/rooms/${newRoom.roomCode}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userId: currentUserId, 
          userName: currentUserName 
        }),
      });
      
      // First show the room code modal
      setIsCodeModalOpen(true);
      
      // Then redirect to the game page with the room code
      toast({
        title: "Room Created",
        description: `Your new room (${newRoom.roomCode}) is ready! Redirecting to game...`,
        variant: "success",
      });
      
      // Redirect after showing the code (slight delay for better UX)
      setTimeout(() => {
        router.push(`/game/${newRoom.roomCode}`);
      }, 1500);
    } catch (error) {
      console.error("Failed to create room:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create room. Please try again.",
        variant: "destructive",
      });
    }
  }, [currentUserId, currentUserName, toast, router, session, setIsAuthModalOpen, setPendingAction]);

  // Handle joining by code - updated to use the proceedWithJoiningRoom helper
  const handleJoinByCode = useCallback(async (roomCode) => {
    try {
      // First verify the room exists by fetching it from the API
      const response = await fetch(`/api/rooms/${roomCode}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Room not found. Please check the code and try again.");
        } else {
          throw new Error("Failed to join room. Please try again.");
        }
      }

      const { data: room } = await response.json();

      // Check if user is already in another room
      if (activeRoomCode && activeRoomCode !== roomCode) {
        toast({
          title: "Already in a Room",
          description: `You're already in room ${activeRoomCode}. Leaving that room first.`,
          variant: "warning",
        });
        
        // Try to leave the current room before joining the new one
        try {
          await fetch(`/api/rooms/${activeRoomCode}/leave`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: currentUserId })
          });
        } catch (error) {
          console.error("Error leaving previous room:", error);
        }
      }

      // Use the same helper function for consistency
      proceedWithJoiningRoom(room);
    } catch (error) {
      console.error("Failed to join room:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to join room. Please try again.",
        variant: "destructive",
      });
    }
  }, [toast, router, activeRoomCode, proceedWithJoiningRoom, currentUserId]);

  // Memoized pagination calculations
  const { totalPages, paginatedRooms } = useMemo(() => {
    const totalPages = Math.ceil(filteredRooms.length / pageSize);
    const paginatedRooms = filteredRooms.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
    return { totalPages, paginatedRooms };
  }, [filteredRooms, currentPage, pageSize]);

  // Display connection status
  useEffect(() => {
    if (socket.connectionError) {
      toast({
        title: "Connection Error",
        description: "Failed to connect to the game server. Some features may not work properly.",
        variant: "destructive",
      });
    }
  }, [socket.connectionError, toast]);

  // Handle auth success
  const handleAuthSuccess = useCallback(() => {
    if (pendingAction) {
      // Execute the saved action after successful authentication
      pendingAction();
      setPendingAction(null);
    }
  }, [pendingAction]);

  return (
    <>
      <div className="flex justify-between mb-6">
        <button
          onClick={() => setIsJoinModalOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-2 px-6 rounded-full font-poppins font-medium hover:opacity-90 transition shadow-md"
        >
          Join Room
        </button>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 px-6 rounded-full font-poppins font-medium hover:opacity-90 transition shadow-md"
        >
          Create Room
        </button>
      </div>

      {!socket.isConnected && !isLoading && (
        <div className="mb-4 p-2 bg-amber-50 text-amber-800 rounded-lg border border-amber-200 text-sm">
          Connecting to game server... Some features may be limited.
        </div>
      )}

      {/* Display auth status */}
      {!session ? (
        <div className="mb-4 p-2 bg-blue-50 text-blue-800 rounded-lg border border-blue-200 text-sm flex items-center justify-between">
          <span>Sign in to track your game stats and create persistent rooms.</span>
          <button 
            onClick={() => setIsAuthModalOpen(true)}
            className="text-xs bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded-full text-blue-700 font-medium"
          >
            Sign In
          </button>
        </div>
      ) : (
        <div className="mb-4 p-3 bg-gradient-to-r from-violet-50 to-purple-50 text-purple-800 rounded-lg border border-purple-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {session.user.image ? (
              <Image 
                src={session.user.image} 
                width={36} 
                height={36} 
                alt={session.user.name || "User"}
                className="rounded-full"
              />
            ) : (
              <div className="w-9 h-9 bg-purple-200 rounded-full flex items-center justify-center">
                <span className="text-purple-800 font-bold">
                  {session.user.name?.[0] || "U"}
                </span>
              </div>
            )}
            <div>
              <p className="font-medium">{session.user.name}</p>
              <p className="text-xs opacity-75">Signed in with Google</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => window.location.href = '/profile'}
              className="text-xs bg-purple-100 hover:bg-purple-200 px-3 py-1 rounded-full text-purple-700 font-medium"
            >
              Profile
            </button>
            <button
              onClick={() => window.location.href = '/stats'}
              className="text-xs bg-indigo-100 hover:bg-indigo-200 px-3 py-1 rounded-full text-indigo-700 font-medium"
            >
              My Stats
            </button>
          </div>
        </div>
      )}

      <GamesFilter
        onFilterChange={handleFilterChange}
        includePrivacyFilter={true}
      />

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[600px]">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-[320px] bg-white/50 rounded-2xl border-4 border-violet-200 animate-pulse"
            />
          ))}
        </div>
      ) : paginatedRooms.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[600px]">
            {paginatedRooms.map((room) => (
              <MemoizedGameCard
                key={room.id}
                game={room}
                onJoin={handleJoinRoom}
                currentUserId={currentUserId}
              />
            ))}
          </div>
          <div className="mt-6">
            <GamesPagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalItems={filteredRooms.length}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
            />
          </div>
        </>
      ) : (
        <div className="text-center py-12 min-h-[600px] flex flex-col items-center justify-center bg-white/50 rounded-2xl border-4 border-violet-200 font-poppins">
          <div className="text-6xl mb-4">🎮</div>
          <h3 className="text-xl font-bangers text-gray-700 mb-2 tracking-wide">
            No rooms found
          </h3>
          <p className="text-gray-500">
            Try adjusting your filters or create a new room!
          </p>
        </div>
      )}

      <CreateRoomModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateRoom={handleCreateRoom}
      />

      <JoinRoomModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        onJoinRoom={handleJoinByCode}
      />

      <RoomCodeModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        roomCode={createdRoomCode}
      />
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        message="Sign in to save your game progress and statistics"
      />
    </>
  );
}

// Utility functions
function getJoinActionText(status) {
  const actions = {
    waiting: "Joining Room",
    "in-progress": "Spectating Room",
    finished: "Viewing Results",
  };
  return actions[status] || "Accessing Room";
}

function getJoinActionVerb(status) {
  const verbs = {
    waiting: "joining",
    "in-progress": "spectating",
    finished: "viewing",
  };
  return verbs[status] || "accessing";
}
