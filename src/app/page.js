import { Suspense } from "react";
import { Gamepad2 } from "lucide-react";
import { GameRooms } from "@/components/game-rooms";
import { GameRoomsSkeleton } from "@/components/game-rooms-skeleton";

export default async function Home() {
  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-indigo-50 to-pink-50">
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bangers text-purple-800 mb-2 flex items-center tracking-wide">
                <Gamepad2 className="mr-2 text-pink-500" size={32} />
                Raja Mantri Chor Sipahi
              </h1>
              <p className="text-gray-600 font-poppins">
                Join an existing room or create your own to play the classic Indian card game!
              </p>
            </div>
          </div>

          <Suspense fallback={<GameRoomsSkeleton />}>
            <GameRooms />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
