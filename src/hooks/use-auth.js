"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

const AuthContext = createContext();

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isGuestMode, setIsGuestMode] = useState(false);

  // Check if user has made an authentication choice
  const hasAuthChoice = useCallback(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("authChoice") !== null;
  }, []);

  // Initialize authentication state
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Check if user has made an auth choice
        if (!hasAuthChoice()) {
          setIsLoading(false);
          return;
        }

        const authChoice = localStorage.getItem("authChoice");
        const token = localStorage.getItem("auth_token");

        if (authChoice === "guest") {
          // Handle guest mode
          const guestUser = localStorage.getItem("guest_user");
          if (guestUser) {
            const parsedUser = JSON.parse(guestUser);
            setUser(parsedUser);
            setIsAuthenticated(true);
            setIsGuestMode(true);
          }
        } else if (authChoice === "google" && token) {
          // Verify token with backend
          const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          });

          if (response.ok) {
            const data = await response.json();
            if (data.success && data.user) {
              setUser(data.user);
              setIsAuthenticated(true);
              setIsGuestMode(false);
            } else {
              // Invalid token, clear it
              localStorage.removeItem("auth_token");
              localStorage.removeItem("authChoice");
            }
          } else {
            // Token expired or invalid
            localStorage.removeItem("auth_token");
            localStorage.removeItem("authChoice");
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        // Clear invalid auth data
        localStorage.removeItem("auth_token");
        localStorage.removeItem("authChoice");
        localStorage.removeItem("guest_user");
      } finally {
        setIsLoading(false);
      }
    };

    // Add a timeout to prevent infinite loading
    const authTimeout = setTimeout(() => {
      if (isLoading) {
        console.warn("Auth initialization timeout, proceeding without auth");
        setIsLoading(false);
      }
    }, 10000); // 10 second timeout

    initAuth();

    return () => clearTimeout(authTimeout);
  }, [hasAuthChoice, isLoading]);

  const login = useCallback(() => {
    // Don't set authChoice here - only set it after successful OAuth
    // Clear any existing auth data first
    localStorage.removeItem("auth_token");
    localStorage.removeItem("authChoice");
    localStorage.removeItem("guest_user");
    
    // Redirect to Google OAuth (backend will handle the flow)
    window.location.href = `${API_BASE_URL}/api/auth/google`;
  }, []);

  const createGuest = useCallback(async (guestName) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/guest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: guestName }),
      });

      if (!response.ok) {
        throw new Error("Failed to create guest user");
      }

      const data = await response.json();
      if (data.success) {
        localStorage.setItem("authChoice", "guest");
        localStorage.setItem("guest_user", JSON.stringify(data.user));
        localStorage.setItem("auth_token", data.token);
        
        setUser(data.user);
        setIsAuthenticated(true);
        setIsGuestMode(true);
        
        return { success: true, user: data.user };
      } else {
        throw new Error(data.message || "Failed to create guest user");
      }
    } catch (error) {
      console.error("Guest creation error:", error);
      return { success: false, error: error.message };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      // Call backend logout endpoint
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear local storage
      localStorage.removeItem("auth_token");
      localStorage.removeItem("authChoice");
      localStorage.removeItem("guest_user");
      localStorage.removeItem("playerName");
      localStorage.removeItem("userId");
      localStorage.removeItem("activeRoomCode");
      
      // Reset state
      setUser(null);
      setIsAuthenticated(false);
      setIsGuestMode(false);
      
      // Reload page to reset app state
      window.location.reload();
    }
  }, []);

  // Check if user needs to make an auth choice - NO MORE DISMISSAL
  const needsAuthChoice = useCallback(() => {
    return !isLoading && !hasAuthChoice();
  }, [isLoading, hasAuthChoice]);

  const value = {
    user,
    isAuthenticated,
    isLoading,
    isGuestMode,
    needsAuthChoice: needsAuthChoice(),
    hasAuthChoice: hasAuthChoice(),
    login,
    logout,
    createGuest,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 