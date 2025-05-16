import { useSession } from "next-auth/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

// Session storage key
const SESSION_CACHE_KEY = 'session_cache';

export function useSessionManager() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // Start with false to avoid initial flash
  const [lastSessionCheck, setLastSessionCheck] = useState(() => {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(SESSION_CACHE_KEY);
      return cached ? JSON.parse(cached).timestamp : 0;
    }
    return 0;
  });

  // Memoize session data to prevent unnecessary re-renders
  const sessionData = useMemo(() => ({
    user: session?.user,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading" || isLoading,
  }), [session?.user, status, isLoading]);

  // Cache session data in localStorage
  useEffect(() => {
    if (session?.user && typeof window !== 'undefined') {
      const cacheData = {
        user: session.user,
        timestamp: Date.now()
      };
      localStorage.setItem(SESSION_CACHE_KEY, JSON.stringify(cacheData));
    }
  }, [session?.user]);

  // Optimized session check with caching and parallel loading
  const checkSession = useCallback(async () => {
    const now = Date.now();
    
    // Return cached data if within cache duration
    if (now - lastSessionCheck < CACHE_DURATION) {
      return sessionData;
    }

    // Start loading state
    setIsLoading(true);

    try {
      // Parallel session update
      const updatePromise = update();
      
      // If we have cached data, use it immediately while update is in progress
      if (session?.user) {
        setLastSessionCheck(now);
      }

      // Wait for update to complete
      await updatePromise;
      setLastSessionCheck(now);
    } catch (error) {
      console.error("Session check failed:", error);
      // On error, try to use cached data if available
      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem(SESSION_CACHE_KEY);
        if (cached) {
          const { user, timestamp } = JSON.parse(cached);
          if (now - timestamp < CACHE_DURATION) {
            return { ...sessionData, user };
          }
        }
      }
    } finally {
      setIsLoading(false);
    }
    return sessionData;
  }, [lastSessionCheck, sessionData, update, session?.user]);

  // Force session refresh with optimistic update
  const refreshSession = useCallback(async () => {
    setIsLoading(true);
    const previousUser = session?.user;

    try {
      // Optimistically update the UI
      if (previousUser) {
        setLastSessionCheck(Date.now());
      }

      // Perform the actual update
      await update();
      setLastSessionCheck(Date.now());
    } catch (error) {
      console.error("Session refresh failed:", error);
      // Revert to previous state on error
      if (previousUser) {
        setLastSessionCheck(Date.now() - CACHE_DURATION - 1);
      }
    } finally {
      setIsLoading(false);
    }
  }, [update, session?.user]);

  // Handle authentication redirects with debounce
  const requireAuth = useCallback((redirectTo = "/login") => {
    if (status === "unauthenticated") {
      // Use requestAnimationFrame for smoother navigation
      requestAnimationFrame(() => {
        router.push(redirectTo);
      });
      return false;
    }
    return true;
  }, [status, router]);

  // Initialize session check on mount with requestIdleCallback
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => checkSession());
      } else {
        setTimeout(checkSession, 0);
      }
    }
  }, [checkSession]);

  return {
    ...sessionData,
    checkSession,
    refreshSession,
    requireAuth,
    status,
  };
}
