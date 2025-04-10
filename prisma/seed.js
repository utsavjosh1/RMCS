import { PrismaClient, RoomStatus } from "../src/app/generated/prisma/client";

const prisma = new PrismaClient();

async function seed() {
    for (let i = 0; i < 10; i++) {
      const title = `Game Room ${i + 1}`;
      const status = [RoomStatus.waiting, RoomStatus.in_progress, RoomStatus.finished][
        Math.floor(Math.random() * 3)
      ];
  
      const room = await prisma.gameRoom.create({
        data: {
          roomCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
          title,
          imageUrl: `https://robohash.org/${encodeURIComponent(title)}.png?size=200x200&set=set2`,
          status,
          createdAt: new Date(Date.now() - Math.floor(Math.random() * 86400000)),
          hostId: `user-${Math.floor(Math.random() * 1000)}`,
          hostName: `Player${Math.floor(Math.random() * 1000)}`,
          isPrivate: Math.random() > 0.7,
        },
      });
  
      await prisma.roomPlayers.create({
        data: {
          current: Math.floor(Math.random() * 4) + 1,
          max: 4,
          roomId: room.id,
        },
      });
    }
  
    console.log("🌱 Seeded 10 game rooms with RoomPlayers.");
    await prisma.$disconnect();
  }
  

seed().catch(async (err) => {
  console.error("❌ Seed failed:", err);
  await prisma.$disconnect();
  process.exit(1);
});
