"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Users, Clock, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

export function GameCard({ game, onJoin }) {
  const statusColors = {
    waiting: "bg-green-100 text-green-800 border-green-300",
    "in-progress": "bg-yellow-100 text-yellow-800 border-yellow-300",
    finished: "bg-gray-100 text-gray-800 border-gray-300",
  }

  const statusLabels = {
    waiting: "Waiting for Players",
    "in-progress": "Game in Progress",
    finished: "Game Finished",
  }

  return (
    <div className="bg-white rounded-2xl border-4 border-violet-300 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:rotate-[0.5deg]">
      <div className="relative">
        <Image src={game.imageUrl || "/placeholder.svg"} alt={game.title} className="w-full h-48 object-cover" />
        <Badge
          className={cn("absolute top-3 right-3 px-3 py-1 rounded-full font-bold border-2", statusColors[game.status])}
        >
          {statusLabels[game.status]}
        </Badge>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-purple-800 mb-2">{game.title}</h3>

        <div className="flex flex-col mb-3">
          <div className="flex items-center text-gray-600">
            <Users size={18} className="mr-1 text-blue-500" />
            <span className="text-sm font-medium">
              {game.players.current}/{game.players.max} Players
              {game.status === "waiting" && game.players.current < game.players.max && (
                <span className="ml-1 text-green-600 font-bold">
                  ({game.players.max - game.players.current} spots left)
                </span>
              )}
            </span>
          </div>

          <div className="flex items-center text-gray-600 my-2">
            <Clock size={18} className="mr-1 text-orange-500" />
            <span className="text-sm">
              {new Date(game.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        </div>

        <Button
          onClick={() => onJoin(game.id)}
          className={cn(
            "w-full rounded-xl font-bold text-white",
            "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
            "border-2 border-purple-300 shadow-md",
            "transition-all duration-200 hover:shadow-lg",
            (game.status === "finished" || game.players.current >= game.players.max) && "opacity-50 cursor-not-allowed",
          )}
          disabled={game.status === "finished" || game.players.current >= game.players.max}
        >
          {game.status === "waiting"
            ? game.players.current >= game.players.max
              ? "Game Full"
              : "Join Game"
            : game.status === "in-progress"
              ? "Spectate"
              : "View Results"}
        </Button>
      </div>
    </div>
  )
}

