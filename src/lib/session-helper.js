// Session helper utility
import { getSession } from 'next-auth/react';

/**
 * Force a session refresh by calling getSession directly
 * This can help fix cases where the session cookie exists 
 * but the client-side useSession hook hasn't picked it up
 */
export async function refreshSession() {
  try {
    // Force a fresh request to the session endpoint
    const session = await getSession({ force: true });
    console.log('Session refresh result:', session ? 'Session found' : 'No session found');
    
    // Log cookie information if available
    if (typeof window !== 'undefined') {
      const authCookies = document.cookie.split(';')
        .map(cookie => cookie.trim())
        .filter(cookie => 
          cookie.startsWith('next-auth.session-token=') || 
          cookie.startsWith('authjs.session-token=')
        );
      
      console.log('Auth cookies found:', authCookies.length > 0 ? 'Yes' : 'No');
      if (authCookies.length > 0) {
        console.log('Auth cookie names:', authCookies.map(c => c.split('=')[0]));
      }
    }
    
    return session;
  } catch (error) {
    console.error('Error refreshing session:', error);
    return null;
  }
}

/**
 * Check if a user is authenticated for client components
 * by directly checking the session
 */
export async function isAuthenticated() {
  const session = await getSession({ force: true });
  return !!session;
}

/**
 * Check if authentication cookies exist in the browser
 * This is a quick check that doesn't require API requests
 */
export function hasAuthCookies() {
  if (typeof window === 'undefined') return false;
  
  const cookies = document.cookie.split(';').map(cookie => cookie.trim());
  return cookies.some(
    cookie => cookie.startsWith('next-auth.session-token=') || 
              cookie.startsWith('authjs.session-token=')
  );
}

/**
 * Direct function to bypass auth checks when needed in an emergency
 * Should only be used for debugging
 */
export function forceAccessProtectedRoute(route) {
  if (typeof window !== 'undefined') {
    window.location.href = route;
    return true;
  }
  return false;
} 