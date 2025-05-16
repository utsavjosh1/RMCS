"use client";

import { useSessionManager } from "@/hooks/use-session-manager";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading: sessionLoading, checkSession } = useSessionManager();
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const statsLoaded = useRef(false);

  // Force a session check on page load
  useEffect(() => {
    checkSession();
  }, [checkSession]);

  useEffect(() => {
    // Only fetch stats if we haven't already and the user is authenticated
    if (!statsLoaded.current && isAuthenticated && user) {
      // Ensure user has an ID before fetching stats
      if (!user.id) {
        setIsLoading(false);
        return;
      }

      // Fetch user stats from API
      fetch("/api/users/stats")
        .then((res) => {
          if (!res.ok) {
            throw new Error(`API returned ${res.status}: ${res.statusText}`);
          }
          return res.json();
        })
        .then((data) => {
          setStats(data);
          statsLoaded.current = true;
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch user stats:", error);
          setIsLoading(false);
        });
    } else if (!isAuthenticated) {
      // Redirect to login if not authenticated
      router.push("/login?callbackUrl=/profile");
    } else if (!sessionLoading) {
      // If we're not loading, not fetching stats, and not redirecting, we can stop loading
      setIsLoading(false);
    }
  }, [user, isAuthenticated, sessionLoading, router]);

  // If loading, show spinner
  if (sessionLoading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  // If unauthenticated, show auth required UI
  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen flex-col">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
          <p className="text-gray-600 mb-6">You need to be signed in to view this page.</p>
          <button 
            onClick={() => router.push("/login?callbackUrl=/profile")}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-8 text-white">
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "Profile"}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <span className="text-3xl text-gray-600 font-bold">
                    {(user.name || "User")[0].toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="opacity-80">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Game Statistics */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Game Statistics</h2>
          {stats ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard title="Games Played" value={stats.gamesPlayed} />
              <StatCard title="Games Won" value={stats.gamesWon} />
              <StatCard
                title="Win Rate"
                value={`${
                  stats.gamesPlayed > 0
                    ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100)
                    : 0
                }%`}
              />
              <StatCard title="Rooms Created" value={stats.roomsCreated} />
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded text-center">
              <p>No game statistics available yet. Play some games to see your stats!</p>
            </div>
          )}

          {/* Recent Games */}
          <h2 className="text-xl font-bold text-gray-700 mt-8 mb-4">Recent Games</h2>
          <div className="bg-gray-50 p-4 rounded text-center">
            <button 
              onClick={() => router.push("/my-games")} 
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg"
            >
              View Game History
            </button>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button 
              onClick={() => router.push("/game/new")}
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-lg shadow hover:shadow-lg transition-all"
            >
              Create New Game
            </button>
            <button 
              onClick={() => router.push("/")}
              className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg shadow hover:shadow-lg transition-all"
            >
              Browse Games
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-2xl font-bold text-indigo-600">{value}</p>
    </div>
  );
} 