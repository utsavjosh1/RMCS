"use client";

import { useSessionManager } from "@/hooks/use-session-manager";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function DebugPage() {
  const { user, isAuthenticated, isLoading: sessionLoading, checkSession, refreshSession } = useSessionManager();
  const router = useRouter();
  const [error, setError] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);
  const [detailedResponse, setDetailedResponse] = useState(null);
  const [cookieInfo, setCookieInfo] = useState(null);
  const cookieChecked = useRef(false);

  // Get cookie information on mount - but only once
  useEffect(() => {
    if (typeof window !== 'undefined' && !cookieChecked.current) {
      cookieChecked.current = true; // Set flag to avoid repeated checks
      
      const cookies = document.cookie.split(';')
        .map(cookie => cookie.trim())
        .filter(cookie => cookie);
      
      const authCookies = cookies.filter(
        cookie => cookie.startsWith('next-auth.session-token=') || 
                 cookie.startsWith('authjs.session-token=')
      );
      
      setCookieInfo({
        allCookies: cookies.map(c => c.split('=')[0]),
        authCookies: authCookies.map(c => c.split('=')[0]),
        authCookiesPresent: authCookies.length > 0
      });
    }
  }, []);

  // Manual tests triggered by button clicks - no automatic API calls
  const testProfileRoute = async () => {
    try {
      setError(null);
      const response = await fetch("/api/users/debug");
      const data = await response.json();
      setApiResponse(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const verifySession = async () => {
    try {
      setError(null);
      const response = await fetch("/api/users/verify-session");
      const data = await response.json();
      setDetailedResponse(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const refreshUserSession = async () => {
    try {
      setError(null);
      // Force a session refresh
      await refreshSession();
      setApiResponse({ message: "Session refreshed successfully" });
      
      // Also update cookie info
      if (typeof window !== 'undefined') {
        const cookies = document.cookie.split(';')
          .map(cookie => cookie.trim())
          .filter(cookie => cookie);
        
        const authCookies = cookies.filter(
          cookie => cookie.startsWith('next-auth.session-token=') || 
                   cookie.startsWith('authjs.session-token=')
        );
        
        setCookieInfo({
          allCookies: cookies.map(c => c.split('=')[0]),
          authCookies: authCookies.map(c => c.split('=')[0]),
          authCookiesPresent: authCookies.length > 0
        });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const forceSignOut = async () => {
    try {
      await signOut({ redirect: false });
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Session Debug Page</h1>
      
      <div className="bg-gray-100 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Session Status: {sessionLoading ? "loading" : isAuthenticated ? "authenticated" : "unauthenticated"}</h2>
        
        {sessionLoading && (
          <div className="animate-pulse">Loading session information...</div>
        )}
        
        {isAuthenticated && user && (
          <div>
            <p className="mb-2"><strong>Logged in as:</strong> {user.name}</p>
            <p className="mb-2"><strong>Email:</strong> {user.email}</p>
            <p className="mb-2"><strong>User ID:</strong> {user.id || "Not available"}</p>
            
            <pre className="bg-gray-800 text-white p-4 rounded mt-4 overflow-auto max-h-60">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        )}
        
        {!isAuthenticated && (
          <div className="text-red-500">
            <p>You are not logged in. Session data is not available.</p>
            <button 
              onClick={() => router.push("/login")}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Sign in with Google
            </button>
          </div>
        )}
      </div>
      
      {/* Add cookie information panel */}
      {cookieInfo && (
        <div className="bg-violet-50 p-6 rounded-lg mb-6 border border-violet-200">
          <h2 className="text-xl font-semibold mb-4">Browser Cookies</h2>
          <div>
            <p className="mb-2"><strong>Auth Cookies Present:</strong> {cookieInfo.authCookiesPresent ? "Yes" : "No"}</p>
            
            {cookieInfo.authCookies.length > 0 && (
              <div className="mb-4">
                <p className="font-medium">Authentication Cookies:</p>
                <ul className="list-disc pl-5">
                  {cookieInfo.authCookies.map((name, i) => (
                    <li key={i} className="text-violet-700">{name}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <p className="font-medium mt-4">All Cookies:</p>
            <div className="bg-white p-3 rounded border border-gray-200 overflow-auto max-h-40">
              <ul className="list-disc pl-5">
                {cookieInfo.allCookies.map((name, i) => (
                  <li key={i} className={cookieInfo.authCookies.includes(name) ? "text-green-600" : "text-gray-700"}>
                    {name} {cookieInfo.authCookies.includes(name) && "(auth)"}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded p-4">
          <h3 className="font-semibold mb-3">Navigation Links</h3>
          <div className="space-y-2">
            <div>
              <a 
                href="/profile"
                className="block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-center"
              >
                Direct Link to Profile
              </a>
            </div>
            <div>
              <a 
                href="/stats"
                className="block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-center"
              >
                Direct Link to Stats
              </a>
            </div>
            <div>
              <a 
                href="/"
                className="block bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-center"
              >
                Home Page
              </a>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded p-4">
          <h3 className="font-semibold mb-3">Authentication Actions</h3>
          <div className="space-y-2">
            <button 
              onClick={testProfileRoute}
              className="block w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded text-center"
            >
              Test API Authentication
            </button>
            <button 
              onClick={verifySession}
              className="block w-full bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded text-center"
            >
              Verify Session Details
            </button>
            <button 
              onClick={refreshUserSession}
              className="block w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-center"
            >
              Force Session Refresh
            </button>
            <button 
              onClick={forceSignOut}
              className="block w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-center"
            >
              Force Sign Out (Reset)
            </button>
          </div>
        </div>
      </div>
      
      {apiResponse && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">API Response: </strong>
          <pre className="mt-2 bg-white p-3 rounded">{JSON.stringify(apiResponse, null, 2)}</pre>
        </div>
      )}
      
      {detailedResponse && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Detailed Session Information: </strong>
          <pre className="mt-2 bg-white p-3 rounded">{JSON.stringify(detailedResponse, null, 2)}</pre>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error: </strong>
          <pre className="mt-2">{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}
    </div>
  );
} 