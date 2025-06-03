import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./use-auth";
import { useSocket } from "./use-socket";
import { useToast } from "./use-toast";

const defaultPreferences = {
  theme: "light",
  soundEnabled: true,
  musicEnabled: true,
  notificationsEnabled: true,
  language: "en",
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
};

export function usePreferences() {
  const { user, isAuthenticated } = useAuth();
  const { socket } = useSocket();
  const { toast } = useToast();
  const [preferences, setPreferences] = useState(defaultPreferences);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch preferences from API
  const fetchPreferences = useCallback(async () => {
    if (!isAuthenticated) {
      setPreferences(defaultPreferences);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/users/preferences", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch preferences");
      }

      const data = await response.json();
      setPreferences(data.preferences);
      setError(null);
    } catch (err) {
      setError(err.message);
      toast({
        title: "Error",
        description: "Failed to load preferences",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, toast]);

  // Update preferences
  const updatePreferences = useCallback(async (updates) => {
    if (!isAuthenticated) {
      setPreferences((prev) => ({ ...prev, ...updates }));
      return;
    }

    try {
      const response = await fetch("/api/users/preferences", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error("Failed to update preferences");
      }

      const data = await response.json();
      setPreferences(data.preferences);

      // Emit socket event for real-time updates
      if (socket) {
        socket.emit("user:preferences:update", updates);
      }

      toast({
        title: "Success",
        description: "Preferences updated successfully",
      });
    } catch (err) {
      setError(err.message);
      toast({
        title: "Error",
        description: "Failed to update preferences",
        variant: "destructive",
      });
    }
  }, [isAuthenticated, socket, toast]);

  // Listen for preference updates from socket
  useEffect(() => {
    if (!socket || !isAuthenticated) return;

    const handlePreferencesUpdate = (updatedPreferences) => {
      setPreferences(updatedPreferences);
    };

    socket.on("user:preferences:updated", handlePreferencesUpdate);

    return () => {
      socket.off("user:preferences:updated", handlePreferencesUpdate);
    };
  }, [socket, isAuthenticated]);

  // Fetch preferences on mount and auth change
  useEffect(() => {
    fetchPreferences();
  }, [fetchPreferences, isAuthenticated]);

  // Apply theme preference
  useEffect(() => {
    const theme = preferences.theme;
    const root = window.document.documentElement;

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.remove("light", "dark");
      root.classList.add(systemTheme);
    } else {
      root.classList.remove("light", "dark");
      root.classList.add(theme);
    }
  }, [preferences.theme]);

  // Apply language preference
  useEffect(() => {
    if (preferences.language) {
      document.documentElement.lang = preferences.language;
    }
  }, [preferences.language]);

  return {
    preferences,
    isLoading,
    error,
    updatePreferences,
    refreshPreferences: fetchPreferences,
  };
} 