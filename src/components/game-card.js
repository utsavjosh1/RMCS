"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Users, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function GameCard({ game, onJoin, currentUserId }) {
  // Add state to handle client-side rendering
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const statusColors = {
    waiting: "bg-green-100 text-green-800 border-green-300",
    "in-progress": "bg-yellow-100 text-yellow-800 border-yellow-300",
    finished: "bg-gray-100 text-gray-800 border-gray-300",
    inactive: "bg-red-100 text-red-800 border-red-300",
  };

  const statusLabels = {
    waiting: "Waiting for Players",
    "in-progress": "Game in Progress",
    finished: "Game Finished",
    inactive: "Room Inactive",
  };
  
  // Safely determine player count - check all possible sources
  const playerCount = (() => {
    // If playersList exists, it's the most accurate source
    if (game.playersList?.length) {
      return game.playersList.length;
    }
    // Otherwise fall back to players.current
    if (game.players?.current !== undefined) {
      return game.players.current;
    }
    // Last resort: default to 0
    return 0;
  })();
  
  const maxPlayers = game.players?.max || 4;
  const isFull = playerCount >= maxPlayers;
  const isInGame = game.status === "in-progress";
  const isFinished = game.status === "finished";
  const isInactive = game.status === "inactive";
  
  // Determine if we're the host
  const isHost = game.hostId === currentUserId;
  
  // Determine if current player is in this room
  const isInRoom = game.playersList?.some(p => p.id === currentUserId) || false;
  
  // Determine button state
  const isButtonDisabled = 
    isFinished || 
    isInactive || 
    (game.status === "waiting" && isFull && !isInRoom);
  
  // Determine appropriate button text based on detailed status
  const getButtonText = () => {
    if (isInRoom) {
      return "Return to Game";
    }
    
    if (game.status === "waiting") {
      return isFull ? "Room Full" : "Join Game";
    }
    
    if (isInGame) {
      return "Spectate Game";
    }
    
    if (isFinished) {
      return "View Results";
    }
    
    return "Join Room";
  };

  // Don't render dynamic content until after hydration
  if (!isMounted) {
    return (
      <div className="h-[320px] bg-white rounded-2xl border-4 border-violet-300 shadow-lg flex flex-col font-poppins">
        <div className="relative h-[140px]">
          <Image
            width={400}
            height={140}
            src={game.imageUrl || "/placeholder.svg"}
            alt={game.title}
            className="w-full h-full object-cover rounded-t-xl"
          />
          <Badge
            className={cn(
              "absolute top-3 right-3 px-3 py-1 rounded-full font-bold border-2",
              statusColors[game.status] || statusColors.waiting
            )}
          >
            {statusLabels[game.status] || statusLabels.waiting}
          </Badge>
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-xl font-bangers text-purple-800 mb-2 line-clamp-1 tracking-wide">
            {game.title}
          </h3>
          <div className="flex flex-col mb-3">
            <div className="flex items-center text-gray-600">
              <Users size={18} className="mr-1 text-blue-500" />
              <span className="text-sm font-medium">
                {playerCount}/{maxPlayers} Players
              </span>
            </div>
            <div className="flex items-center text-gray-600 my-2">
              <Clock size={18} className="mr-1 text-orange-500" />
              <span className="text-sm">
                {new Date(game.createdAt).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true,
                  timeZone: 'UTC'
                })}
              </span>
            </div>
          </div>
          <Button
            className="w-full rounded-xl font-bold text-white mt-auto font-poppins bg-gradient-to-r from-purple-500 to-pink-500"
            disabled={true}
          >
            Loading...
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`h-[320px] bg-white rounded-2xl border-4 
        ${isInRoom ? 'border-blue-300' : 'border-violet-300'} 
        ${isInactive ? 'opacity-60' : ''} 
        shadow-lg hover:shadow-xl transition-all duration-300 
        hover:scale-[1.02] hover:rotate-[0.5deg] flex flex-col font-poppins`}
    >
      <div className="relative h-[140px]">
        <Image
          width={400}
          height={140}
          src={game.imageUrl || "/placeholder.svg"}
          alt={game.title}
          className="w-full h-full object-cover rounded-t-xl"
        />
        <Badge
          className={cn(
            "absolute top-3 right-3 px-3 py-1 rounded-full font-bold border-2",
            statusColors[game.status] || statusColors.waiting
          )}
        >
          {statusLabels[game.status] || statusLabels.waiting}
        </Badge>
        
        {isHost && (
          <Badge
            className="absolute top-3 left-3 px-3 py-1 rounded-full font-bold border-2 bg-purple-100 text-purple-800 border-purple-300"
          >
            Your Room
          </Badge>
        )}
        
        {isInRoom && !isHost && (
          <Badge
            className="absolute top-3 left-3 px-3 py-1 rounded-full font-bold border-2 bg-blue-100 text-blue-800 border-blue-300"
          >
            Joined
          </Badge>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-xl font-bangers text-purple-800 mb-2 line-clamp-1 tracking-wide">
          {game.title}
        </h3>

        <div className="flex flex-col mb-3">
          <div className="flex items-center text-gray-600">
            <Users size={18} className="mr-1 text-blue-500" />
            <span className="text-sm font-medium">
              {playerCount}/{maxPlayers} Players
              {game.status === "waiting" && !isFull && (
                <span className="ml-1 text-green-600 font-bold">
                  ({maxPlayers - playerCount} spots left)
                </span>
              )}
              {isFull && (
                <span className="ml-1 text-red-600 font-bold">
                  (Full)
                </span>
              )}
            </span>
          </div>

          <div className="flex items-center text-gray-600 my-2">
            <Clock size={18} className="mr-1 text-orange-500" />
            <span className="text-sm">
              {new Date(game.createdAt).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
                timeZone: 'UTC'
              })}
            </span>
          </div>
        </div>

        <Button
          onClick={() => onJoin(game.id)}
          className={cn(
            "w-full rounded-xl font-bold text-white mt-auto font-poppins",
            "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
            "border-2 border-purple-300 shadow-md",
            "transition-all duration-200 hover:shadow-lg",
            (isFinished || isInactive) && "opacity-50 cursor-not-allowed",
            (game.status === "waiting" && isFull && !isInRoom) && 
              "bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 border-gray-300",
            isInRoom && "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 border-blue-300"
          )}
          disabled={isButtonDisabled}
        >
          {getButtonText()}
        </Button>
      </div>
    </div>
  );
}
