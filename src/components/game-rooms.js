"use client";

import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { useSocket } from "@/hooks/use-socket";
import { GameCard } from "@/components/game-card";
import { GamesPagination } from "@/components/game-pagination";
import { GamesFilter } from "@/components/game-filters";
import { useToast } from "@/hooks/use-toast";
import { CreateRoomModal, RoomCodeModal } from "@/components/create-room-modal";
import { useId } from "react";
import { getInitialRooms } from "@/app/actions";

// Memoized GameCard component
const MemoizedGameCard = memo(GameCard);

export function GameRooms() {
  const { toast } = useToast();
  const socket = useSocket();
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
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [createdRoomCode, setCreatedRoomCode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Use a stable ID from React's useId hook
  const baseId = useId();
  const currentUserId = `user-${baseId.replace(/:/g, '')}`;

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
    const handleRoomUpdate = (updatedRoom) => {
      setRooms(prevRooms => 
        prevRooms.map(room => 
          room.id === updatedRoom.id ? updatedRoom : room
        )
      );
    };

    const cleanup = socket.onGameStateUpdate(handleRoomUpdate);
    return cleanup;
  }, [socket]);

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

  const navigateToRoom = useCallback((room) => {
    toast({
      title: getJoinActionText(room.status),
      description: `You are ${getJoinActionVerb(room.status)} Room ${room.roomCode}`,
      variant: "default",
    });

    if (room.status === "waiting") {
      socket.joinRoom({
        roomCode: room.roomCode,
        userId: currentUserId,
        userName: `Player${currentUserId.split("-")[1]}`,
      });
    }
  }, [currentUserId, toast, socket]);

  const handleJoinRoom = useCallback((roomId) => {
    const room = rooms.find((r) => r.id === roomId);
    if (!room) return;

    if (room.status === "waiting" && room.players.current >= room.players.max) {
      toast({
        title: "Room is Full",
        description: `Room ${room.roomCode} is at maximum capacity.`,
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
      return;
    }

    navigateToRoom(room);
  }, [rooms, currentUserId, toast, navigateToRoom]);

  const handleCreateRoom = useCallback(async (roomName) => {
    try {
      const response = await fetch("/api/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: roomName,
          hostId: currentUserId,
          hostName: `Player${currentUserId.split("-")[1]}`,
          isPrivate: false,
        }),
      });

      if (!response.ok) throw new Error("Failed to create room");

      const { data: newRoom } = await response.json();
      setRooms(prevRooms => [newRoom, ...prevRooms]);
      setCreatedRoomCode(newRoom.roomCode);
      setIsCodeModalOpen(true);

      toast({
        title: "Room Created",
        description: `Your new room (${newRoom.roomCode}) is ready! You are now the host.`,
        variant: "success",
      });
    } catch (error) {
      console.error("Failed to create room:", error);
      toast({
        title: "Error",
        description: "Failed to create room. Please try again.",
        variant: "destructive",
      });
    }
  }, [currentUserId, toast]);

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
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 px-6 rounded-full font-medium hover:opacity-90 transition shadow-md"
        >
          Create Room
        </button>
      </div>

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
        <div className="text-center py-12 min-h-[600px] flex flex-col items-center justify-center bg-white/50 rounded-2xl border-4 border-violet-200">
          <div className="text-6xl mb-4">🎮</div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">
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
