"use client";

import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { useId } from "react";
import { useRouter } from "next/navigation";

import { useSocket } from "@/hooks/use-socket";
import { GameCard } from "@/components/game-card";
import { GamesPagination } from "@/components/game-pagination";
import { GamesFilter } from "@/components/game-filters";
import { useToast } from "@/hooks/use-toast";
import { CreateRoomModal, RoomCodeModal } from "@/components/create-room-modal";
import { JoinRoomModal } from "@/components/join-room-modal";
import { useAuth } from "@/hooks/use-auth";

// Memoized GameCard component
const MemoizedGameCard = memo(GameCard);

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export function GameRoomsClient({ initialRooms }) {
  const { toast } = useToast();
  const socket = useSocket();
  const router = useRouter();
  const [rooms, setRooms] = useState(initialRooms);
  const [filteredRooms, setFilteredRooms] = useState(initialRooms);
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
  const [createdRoomCode, setCreatedRoomCode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeRoomCode, setActiveRoomCode] = useState(null);
  const [pendingAction, setPendingAction] = useState(null);

  // Use auth hook
  const { user, isAuthenticated, needsAuthChoice } = useAuth();

  // Use a stable ID from React's useId hook
  const baseId = useId();

  // Function to generate a reasonable player name
  const generatePlayerName = useCallback(() => {
    const adjectives = [
      "Happy",
      "Lucky",
      "Clever",
      "Brave",
      "Swift",
      "Calm",
      "Wise",
    ];
    const nouns = [
      "Wizard",
      "Eagle",
      "Tiger",
      "Dragon",
      "Knight",
      "Player",
      "Hero",
    ];
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${adj}${noun}`;
  }, []);

  // Use authenticated user data when available
  const currentUserId = user?.id || `anon-${baseId.replace(/:/g, "")}`;
  const currentUserName = user?.name || generatePlayerName();

  // Don't render room actions if user hasn't made auth choice or isn't authenticated
  if (needsAuthChoice || !isAuthenticated) {
    return (
      <div className="text-center py-12 min-h-[600px] flex flex-col items-center justify-center bg-white/50 rounded-2xl border-4 border-violet-200 font-poppins">
        <div className="text-6xl mb-4">🎮</div>
        <h3 className="text-xl font-bangers text-gray-700 mb-2 tracking-wide">
          Welcome to RMCS!
        </h3>
        <p className="text-gray-500">
          {needsAuthChoice 
            ? "Please choose your authentication method to continue playing."
            : "Authenticating... Please wait."
          }
        </p>
      </div>
    );
  }

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

  // Socket connection for real-time updates
  useEffect(() => {
    if (!socket.isConnected) {
      return;
    }

    // Handle room state updates
    const handleRoomUpdate = (updatedRoom) => {
      if (!updatedRoom || !updatedRoom.id) return;

      setRooms((prevRooms) => {
        const exists = prevRooms.some((room) => room.id === updatedRoom.id);
        const formattedRoom = {
          ...updatedRoom,
          players: {
            current:
              updatedRoom.playersList?.length ||
              updatedRoom.players?.current ||
              0,
            max: updatedRoom.players?.max || 4,
          },
          status: updatedRoom.status || "waiting",
          playersList: updatedRoom.playersList || [],
        };

        return exists
          ? prevRooms.map((room) =>
              room.id === updatedRoom.id ? formattedRoom : room
            )
          : [formattedRoom, ...prevRooms];
      });
    };

    // Add a periodic refresh of game rooms
    const refreshTimer = setInterval(async () => {
      try {
        const result = await fetch(`${API_BASE_URL}/api/rooms`).then((res) => res.json());
        if (result.success) {
          setRooms((prevRooms) => {
            const existingRoomsMap = new Map(
              prevRooms.map((room) => [room.id, room])
            );
            return result.rooms.map((newRoom) => {
              const existingRoom = existingRoomsMap.get(newRoom.id);
              if (existingRoom) {
                return {
                  ...newRoom,
                  players: {
                    current: Math.max(
                      existingRoom.players?.current || 0,
                      newRoom.players?.current || 0,
                      newRoom.playersList?.length || 0
                    ),
                    max: newRoom.players?.max || existingRoom.players?.max || 4,
                  },
                  playersList:
                    newRoom.playersList?.length >=
                    existingRoom.playersList?.length
                      ? newRoom.playersList
                      : existingRoom.playersList,
                };
              }
              return newRoom;
            });
          });
        }
      } catch (error) {
        console.error("Error refreshing rooms:", error);
      }
    }, 10000);

    // Register event listeners
    const gameStateCleanup = socket.onGameStateUpdate(handleRoomUpdate);
    const playerJoinedCleanup = socket.onPlayerJoined((data) => {
      const { roomCode, userId, userName } = data;
      setRooms((prevRooms) =>
        prevRooms.map((room) => {
          if (room.roomCode === roomCode) {
            const updatedPlayersList = [...(room.playersList || [])];
            if (!updatedPlayersList.some((p) => p.id === userId)) {
              updatedPlayersList.push({
                id: userId,
                name: userName,
                isReady: false,
                joinedAt: Date.now(),
              });
            }
            return {
              ...room,
              playersList: updatedPlayersList,
              players: {
                ...room.players,
                current: updatedPlayersList.length,
              },
            };
          }
          return room;
        })
      );

      toast({
        title: "Player Joined",
        description: `${userName} has joined the room!`,
        variant: "default",
      });
    });

    const playerLeftCleanup = socket.onPlayerLeft((data) => {
      const { roomCode, userId } = data;
      setRooms((prevRooms) =>
        prevRooms.map((room) => {
          if (room.roomCode === roomCode) {
            const leavingPlayer = room.playersList?.find(
              (p) => p.id === userId
            );
            const updatedPlayersList = (room.playersList || []).filter(
              (p) => p.id !== userId
            );

            if (leavingPlayer) {
              setTimeout(() => {
                toast({
                  title: "Player Left",
                  description: `${leavingPlayer.name} has left the room.`,
                  variant: "default",
                });
              }, 0);
            }

            return {
              ...room,
              playersList: updatedPlayersList,
              players: {
                ...room.players,
                current: updatedPlayersList.length,
              },
            };
          }
          return room;
        })
      );
    });

    return () => {
      clearInterval(refreshTimer);
      gameStateCleanup?.();
      playerJoinedCleanup?.();
      playerLeftCleanup?.();
    };
  }, [socket, toast]);

  // Memoized filter function
  const filterRooms = useCallback((rooms, filters) => {
    return rooms.filter((room) => {
      const matchesSearch =
        !filters.search ||
        room.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
        room.roomCode?.toLowerCase().includes(filters.search.toLowerCase());

      const matchesStatus =
        filters.status === "all" || room.status === filters.status;

      const matchesPrivacy =
        filters.isPrivate === "all" ||
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
  const proceedWithJoiningRoom = useCallback(
    async (room) => {
      if (
        room.status === "waiting" &&
        room.players &&
        room.players.current >= room.players.max
      ) {
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

      try {
        const token = localStorage.getItem("auth_token");
        const response = await fetch(`${API_BASE_URL}/api/rooms/${room.roomCode}/join`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify({
            userId: currentUserId,
            userName: currentUserName,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to join room via API");
        }

        setActiveRoomCode(room.roomCode);
        localStorage.setItem("activeRoomCode", room.roomCode);

        toast({
          title: getJoinActionText(room.status),
          description: `You are ${getJoinActionVerb(room.status)} Room ${
            room.roomCode
          }`,
          variant: "default",
        });

        router.push(`/game/${room.roomCode}`);
      } catch (error) {
        console.error("Error joining room:", error);
        toast({
          title: "Error",
          description:
            error.message || "Failed to join room. Please try again.",
          variant: "destructive",
        });
      }
    },
    [
      currentUserId,
      currentUserName,
      toast,
      router,
      setIsJoinModalOpen,
    ]
  );

  // Update handleJoinRoom to use auth data
  const handleJoinRoom = useCallback(
    async (roomId) => {
      const room = rooms.find((r) => r.id === roomId);
      if (!room) {
        toast({
          title: "Error",
          description: "Room not found.",
          variant: "destructive",
        });
        return;
      }

      if (activeRoomCode && activeRoomCode !== room.roomCode) {
        toast({
          title: "Already in a Room",
          description: (
            <div className="flex flex-col space-y-2">
              <p>
                You're already in room {activeRoomCode}. Do you want to leave
                that room and join this one?
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => proceedWithJoiningRoom(room)}
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

      proceedWithJoiningRoom(room);
    },
    [rooms, toast, router, activeRoomCode, proceedWithJoiningRoom]
  );

  // Update handleCreateRoom to use backend API
  const handleCreateRoom = useCallback(
    async (roomName) => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await fetch(`${API_BASE_URL}/api/rooms`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
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

        const { room: newRoom } = await response.json();
        setRooms((prevRooms) => [newRoom, ...prevRooms]);
        setCreatedRoomCode(newRoom.roomCode);

        setActiveRoomCode(newRoom.roomCode);
        localStorage.setItem("activeRoomCode", newRoom.roomCode);

        await fetch(`${API_BASE_URL}/api/rooms/${newRoom.roomCode}/join`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify({
            userId: currentUserId,
            userName: currentUserName,
          }),
        });

        setIsCodeModalOpen(true);

        toast({
          title: "Room Created",
          description: `Your new room (${newRoom.roomCode}) is ready! Redirecting to game...`,
          variant: "success",
        });

        setTimeout(() => {
          router.push(`/game/${newRoom.roomCode}`);
        }, 1500);
      } catch (error) {
        console.error("Failed to create room:", error);
        toast({
          title: "Error",
          description:
            error.message || "Failed to create room. Please try again.",
          variant: "destructive",
        });
      }
    },
    [
      currentUserId,
      currentUserName,
      toast,
      router,
    ]
  );

  // Handle joining by code
  const handleJoinByCode = useCallback(
    async (roomCode) => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/rooms/${roomCode}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(
              "Room not found. Please check the code and try again."
            );
          } else {
            throw new Error("Failed to join room. Please try again.");
          }
        }

        const { room } = await response.json();

        if (activeRoomCode && activeRoomCode !== roomCode) {
          toast({
            title: "Already in a Room",
            description: `You're already in room ${activeRoomCode}. Leaving that room first.`,
            variant: "warning",
          });

          try {
            const token = localStorage.getItem("auth_token");
            await fetch(`${API_BASE_URL}/api/rooms/${activeRoomCode}/leave`, {
              method: "POST",
              headers: { 
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
              },
              body: JSON.stringify({ userId: currentUserId }),
            });
          } catch (error) {
            console.error("Error leaving previous room:", error);
          }
        }

        proceedWithJoiningRoom(room);
      } catch (error) {
        console.error("Failed to join room:", error);
        toast({
          title: "Error",
          description:
            error.message || "Failed to join room. Please try again.",
          variant: "destructive",
        });
      }
    },
    [toast, activeRoomCode, proceedWithJoiningRoom, currentUserId]
  );

  // Memoized pagination calculations
  const { totalPages, paginatedRooms } = useMemo(() => {
    const totalPages = Math.ceil(filteredRooms.length / pageSize);
    const paginatedRooms = filteredRooms.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
    return { totalPages, paginatedRooms };
  }, [filteredRooms, currentPage, pageSize]);

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
