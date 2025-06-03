import { Suspense } from "react";
import { GameRoomsClient } from "./game-rooms-client";
import { GameRoomsSkeleton } from "@/components/game-rooms-skeleton";
import { getInitialRooms } from "@/app/actions";

export async function GameRooms() {
  // Fetch initial data on the server
  const initialRooms = await getInitialRooms();

  return (
    <Suspense fallback={<GameRoomsSkeleton />}>
      <GameRoomsClient
        initialRooms={initialRooms.success ? initialRooms.data : []}
      />
    </Suspense>
  );
}
