import { getServerSession } from "next-auth";
import { Suspense } from "react";


import { GameRoomsClient } from "./game-rooms-client";
import { GameRoomsSkeleton } from "@/components/game-rooms-skeleton";
import { getInitialRooms } from "@/app/actions";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GameRooms() {
  // Fetch initial data on the server
  const initialRooms = await getInitialRooms();
  const session = await getServerSession(authOptions);

  return (
    <Suspense fallback={<GameRoomsSkeleton />}>
      <GameRoomsClient
        initialRooms={initialRooms.success ? initialRooms.data : []}
        initialSession={session}
      />
    </Suspense>
  );
}
