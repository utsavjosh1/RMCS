import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./use-auth";
import { useSocket } from "./use-socket";
import { useToast } from "./use-toast";

const defaultStats = {
  gamesPlayed: 0,
  gamesWon: 0,
  roomsCreated: 0,
  totalScore: 0,
  winStreak: 0,
  bestWinStreak: 0,
  totalPlayTime: 0,
  lastGamePlayed: null,
  achievements: {},
  inventory: {},
  gameHistory: [],
};

export function useGameStats() {
  const { user, isAuthenticated } = useAuth();
  const { socket } = useSocket();
  const { toast } = useToast();
  const [stats, setStats] = useState(defaultStats);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch game stats from API
  const fetchStats = useCallback(async () => {
    if (!isAuthenticated) {
      setStats(defaultStats);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/users/stats", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch game stats");
      }

      const data = await response.json();
      setStats(data.stats);
      setError(null);
    } catch (err) {
      setError(err.message);
      toast({
        title: "Error",
        description: "Failed to load game statistics",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, toast]);

  // Update game stats
  const updateStats = useCallback(async (gameData) => {
    if (!isAuthenticated) return;

    try {
      const response = await fetch("/api/users/stats/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(gameData),
      });

      if (!response.ok) {
        throw new Error("Failed to update game stats");
      }

      const data = await response.json();
      setStats(data.stats);

      // Show achievement notifications if any
      if (data.achievements?.unlocked) {
        data.achievements.unlocked.forEach((achievement) => {
          toast({
            title: "Achievement Unlocked! 🏆",
            description: achievement.name,
            variant: "default",
          });
        });
      }

      toast({
        title: "Game Complete",
        description: `Game stats updated successfully`,
      });
    } catch (err) {
      setError(err.message);
      toast({
        title: "Error",
        description: "Failed to update game statistics",
        variant: "destructive",
      });
    }
  }, [isAuthenticated, toast]);

  // Update user status
  const updateStatus = useCallback(async (status) => {
    if (!isAuthenticated || !socket) return;

    try {
      const response = await fetch("/api/users/status", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      socket.emit("user:status:update", status);
    } catch (err) {
      setError(err.message);
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  }, [isAuthenticated, socket, toast]);

  // Listen for game state updates
  useEffect(() => {
    if (!socket || !isAuthenticated) return;

    const handleGameStateUpdate = (update) => {
      // Update local game state if needed
      console.log("Game state updated:", update);
    };

    socket.on("game:state:updated", handleGameStateUpdate);

    return () => {
      socket.off("game:state:updated", handleGameStateUpdate);
    };
  }, [socket, isAuthenticated]);

  // Fetch stats on mount and auth change
  useEffect(() => {
    fetchStats();
  }, [fetchStats, isAuthenticated]);

  // Update status on mount and unmount
  useEffect(() => {
    if (isAuthenticated) {
      updateStatus("online");
    }

    return () => {
      if (isAuthenticated) {
        updateStatus("offline");
      }
    };
  }, [isAuthenticated, updateStatus]);

  return {
    stats,
    isLoading,
    error,
    updateStats,
    updateStatus,
    refreshStats: fetchStats,
  };
} 