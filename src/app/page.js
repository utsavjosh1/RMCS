"use client";

import { useState, useEffect, useCallback } from "react";
import { Gamepad2 } from "lucide-react";

import { GameCard } from "@/components/game-card";
import { GamesPagination } from "@/components/game-pagination";
import { GamesFilter } from "@/components/game-filters";
import { useToast } from "@/hooks/use-toast";

// Custom debounce hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Utility functions moved outside the component
const getJoinActionText = (status) => {
  switch (status) {
    case "waiting":
      return "Joining Room";
    case "in-progress":
      return "Spectating Room";
    case "finished":
      return "Viewing Results";
    default:
      return "Accessing Room";
  }
};

const getJoinActionVerb = (status) => {
  switch (status) {
    case "waiting":
      return "joining";
    case "in-progress":
      return "spectating";
    case "finished":
      return "viewing";
    default:
      return "accessing";
  }
};

export default function Home() {
  const { toast } = useToast();
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    isPrivate: "all",
  });

  const debouncedFilters = useDebounce(filters, 300);
  const [currentUserId] = useState(`user-${Math.floor(Math.random() * 1000)}`);

  const getAllRooms = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/rooms");
      if (!response.ok) {
        throw new Error("Failed to fetch rooms");
      }
      const data = await response.json();
      setRooms(data?.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllRooms();
  }, []);

  useEffect(() => {
    const result = rooms.filter(
      (room) =>
        (debouncedFilters.search
          ? room.title
              ?.toLowerCase()
              .includes(debouncedFilters.search.toLowerCase()) ||
            room.roomCode
              ?.toLowerCase()
              .includes(debouncedFilters.search.toLowerCase())
          : true) &&
        (debouncedFilters.status !== "all"
          ? room.status === debouncedFilters.status
          : true) &&
        (debouncedFilters.isPrivate !== "all"
          ? debouncedFilters.isPrivate === "private"
            ? room.isPrivate
            : !room.isPrivate
          : true)
    );
    setFilteredRooms(result);
    setCurrentPage(1);
  }, [debouncedFilters, rooms]);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  // navigateToRoom defined before handleJoinRoom
  const navigateToRoom = useCallback(
    (room) => {
      toast({
        title: getJoinActionText(room.status),
        description: `You are ${getJoinActionVerb(room.status)} Room ${
          room.roomCode
        }`,
        variant: "default",
      });

      if (room.status === "waiting") {
        setRooms((prevRooms) =>
          prevRooms.map((r) => {
            if (r.id === room.id && r.players.current < r.players.max) {
              return {
                ...r,
                players: {
                  ...r.players,
                  current: r.players.current + 1,
                },
                playersList: [
                  ...(r.playersList || []),
                  {
                    id: currentUserId,
                    name: `Player${currentUserId.split("-")[1]}`,
                    isReady: false,
                    joinedAt: new Date().toISOString(),
                  },
                ],
              };
            }
            return r;
          })
        );
      }
    },
    [currentUserId, toast, setRooms]
  );

  // handleJoinRoom now includes navigateToRoom in dependencies
  const handleJoinRoom = useCallback(
    (roomId) => {
      const room = rooms.find((r) => r.id === roomId);
      if (!room) return;

      if (
        room.status === "waiting" &&
        room.players.current >= room.players.max
      ) {
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

        setTimeout(() => {
          navigateToRoom(room);
        }, 500);
        return;
      }

      navigateToRoom(room);
    },
    [rooms, currentUserId, toast, navigateToRoom]
  );

  const handleCreateRoom = useCallback(() => {
    const newRoomId = `room-${rooms.length + 1}`;
    const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    const newRoom = {
      id: newRoomId,
      roomCode: roomCode,
      title: `Room ${rooms.length + 1}`,
      imageUrl: `/globe.svg`,
      players: { current: 1, max: 4 },
      status: "waiting",
      createdAt: new Date().toISOString(),
      hostId: currentUserId,
      hostName: `Player${currentUserId.split("-")[1]}`,
      isPrivate: false,
      playersList: [
        {
          id: currentUserId,
          name: `Player${currentUserId.split("-")[1]}`,
          isReady: false,
          joinedAt: new Date().toISOString(),
        },
      ],
    };

    setRooms((prevRooms) => [newRoom, ...prevRooms]);

    toast({
      title: "Room Created",
      description: `Your new room (${roomCode}) is ready! You are now the host.`,
      variant: "success",
    });
  }, [rooms.length, currentUserId, toast]);

  const totalPages = Math.ceil(filteredRooms.length / pageSize);
  const paginatedRooms = filteredRooms.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="flex bg-gradient-to-br from-indigo-50 to-pink-50">
      <main className="flex-1 p-4 md:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-purple-800 mb-2 flex items-center">
                <Gamepad2 className="mr-2 text-pink-500" size={32} />
                Game Rooms
              </h1>
              <p className="text-gray-600">
                Join an existing room or create your own!
              </p>
            </div>
            <button
              onClick={handleCreateRoom}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: pageSize }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white/50 rounded-2xl border-4 border-violet-200 h-80 animate-pulse"
                />
              ))}
            </div>
          ) : paginatedRooms.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedRooms.map((room) => (
                  <GameCard
                    key={room.id}
                    game={room}
                    onJoin={handleJoinRoom}
                    currentUserId={currentUserId}
                  />
                ))}
              </div>
              <GamesPagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                totalItems={filteredRooms.length}
                onPageChange={setCurrentPage}
                onPageSizeChange={setPageSize}
              />
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎮</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">
                No rooms found
              </h3>
              <p className="text-gray-500">
                Try adjusting your filters or create a new room!
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
