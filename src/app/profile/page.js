"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { refreshSession, hasAuthCookies, forceAccessProtectedRoute } from "@/lib/session-helper";

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const statsLoaded = useRef(false);
  const authChecked = useRef(false);

  // Check for cookies immediately to determine auth status
  useEffect(() => {
    // If we have auth cookies but no session, force a refresh
    if (hasAuthCookies() && status === "unauthenticated") {
      refreshSession().then(refreshedSession => {
        if (refreshedSession) {
          update(refreshedSession);
        }
      });
    }
  }, [status, update]);

  // Force a session refresh on page load to ensure we have the latest session data
  useEffect(() => {
    const forceSessionRefresh = async () => {
      const refreshedSession = await refreshSession();
      
      if (refreshedSession) {
        update(refreshedSession); // Update the useSession hook with the refreshed session
      } else if (status === "unauthenticated") {
        // If we have cookies but no session, this might be a NextAuth issue
        if (hasAuthCookies()) {
          // Stay on the page to avoid redirect loops
        } else {
          window.location.href = "/login?callbackUrl=/profile";
        }
      }
    };

    forceSessionRefresh();
  }, []); // Run only once on mount

  useEffect(() => {
    // Only fetch stats if we haven't already and the user is authenticated
    if (!statsLoaded.current && status === "authenticated" && session?.user) {
      // Ensure user has an ID before fetching stats
      if (!session.user.id) {
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
    } else if (status === "unauthenticated" && !hasAuthCookies()) {
      // Only redirect if we don't have any auth cookies
      window.location.href = "/login?callbackUrl=/profile";
    } else if (status !== "loading") {
      // If we're not loading, not fetching stats, and not redirecting, we can stop loading
      setIsLoading(false);
    }
  }, [session, status]); // Only run when session or status changes
  
  // Add an extra check when the component mounts to force authentication
  useEffect(() => {
    // This helps with edge cases where the session might not be recognized by middleware
    const checkAuth = async () => {
      // Prevent multiple auth checks
      if (authChecked.current) return;
      
      try {
        const response = await fetch("/api/users/debug");
        const data = await response.json();
        
        if (!data.authenticated && !hasAuthCookies()) {
          console.warn("Server reports user is not authenticated, redirecting");
          window.location.href = "/login?callbackUrl=/profile";
        }
        authChecked.current = true;
      } catch (error) {
        console.error("Error checking authentication:", error);
        authChecked.current = true;
      }
    };
    
    if (status !== "loading") {
      checkAuth();
    }
  }, [status]); // Only run when status changes

  // If loading or we have auth cookies but no session yet, show spinner
  if (status === "loading" || isLoading || (hasAuthCookies() && status === "unauthenticated")) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  // If unauthenticated but we have auth cookies, let's wait for session to refresh
  if (!session?.user && hasAuthCookies()) {
    return (
      <div className="flex items-center justify-center min-h-screen flex-col">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600">Verifying your session...</p>
      </div>
    );
  }

  // If truly unauthenticated, redirect should have happened, but show fallback UI
  if (!session?.user) {
    return (
      <div className="flex items-center justify-center min-h-screen flex-col">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
          <p className="text-gray-600 mb-6">You need to be signed in to view this page.</p>
          <button 
            onClick={() => window.location.href = "/login?callbackUrl=/profile"}
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
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "Profile"}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <span className="text-3xl text-gray-600 font-bold">
                    {(session.user.name || "User")[0].toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{session.user.name}</h1>
              <p className="opacity-80">{session.user.email}</p>
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
              onClick={() => window.location.href = "/my-games"} 
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg"
            >
              View Game History
            </button>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button 
              onClick={() => window.location.href = "/game/new"}
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-lg shadow hover:shadow-lg transition-all"
            >
              Create New Game
            </button>
            <button 
              onClick={() => window.location.href = "/"}
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