export function GameRoomsSkeleton() {
  return (
    <>
      <div className="flex justify-end mb-6">
        <div className="h-10 w-32 bg-white/50 rounded-full animate-pulse" />
      </div>

      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <div className="h-11 bg-white/50 rounded-xl animate-pulse" />
          </div>
          <div className="flex gap-2">
            <div className="h-11 w-24 bg-white/50 rounded-xl animate-pulse" />
            <div className="h-11 w-24 bg-white/50 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[600px]">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="h-[320px] bg-white/50 rounded-2xl border-4 border-violet-200 animate-pulse"
          />
        ))}
      </div>
    </>
  );
} 