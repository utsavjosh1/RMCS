"use client";

import { useSessionManager } from "@/hooks/use-session-manager";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function StatsPage() {
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
        console.warn("User ID not available in session");
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
      router.push("/login?callbackUrl=/stats");
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
            onClick={() => router.push("/login?callbackUrl=/stats")}
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
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-8 text-white">
          <div className="flex items-center gap-6">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
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
              <h1 className="text-2xl font-bold">Game Statistics</h1>
              <p className="opacity-80">Player: {user.name}</p>
            </div>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard 
              title="Games Played" 
              value={stats?.gamesPlayed || 0} 
              icon="🎮"
              color="from-blue-500 to-blue-600"
            />
            <StatCard 
              title="Games Won" 
              value={stats?.gamesWon || 0} 
              icon="🏆"
              color="from-green-500 to-green-600"
            />
            <StatCard 
              title="Win Rate" 
              value={`${
                stats?.gamesPlayed > 0
                  ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100)
                  : 0
              }%`} 
              icon="📊"
              color="from-yellow-500 to-yellow-600"
            />
            <StatCard 
              title="Rooms Created" 
              value={stats?.roomsCreated || 0} 
              icon="🏠"
              color="from-purple-500 to-purple-600"
            />
          </div>

          {/* Performance Section */}
          <h2 className="text-xl font-bold text-gray-700 mb-4">Performance Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-gray-700 mb-2">Win Rate Over Time</h3>
              <div className="bg-gray-100 h-32 rounded flex items-center justify-center">
                <p className="text-gray-500">Chart will be displayed here</p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-gray-700 mb-2">Game Role Distribution</h3>
              <div className="bg-gray-100 h-32 rounded flex items-center justify-center">
                <p className="text-gray-500">Chart will be displayed here</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => router.push("/profile")}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:shadow-lg transition-all"
            >
              Back to Profile
            </button>
            <button 
              onClick={() => router.push("/")}
              className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg shadow hover:shadow-lg transition-all"
            >
              Find Games
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div className={`h-2 bg-gradient-to-r ${color}`}></div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <span className="text-xl">{icon}</span>
        </div>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
} 