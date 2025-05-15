"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function AuthModal({ 
  isOpen, 
  onClose, 
  onSuccess,
  message = "Sign in to save your progress and game statistics",
  callbackUrl
}) {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);
  const router = useRouter();

  // Close modal when authentication completes
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      // Show success state before closing
      setAuthSuccess(true);
      
      // Wait a bit to show success message
      const timer = setTimeout(() => {
        onSuccess?.();
        onClose();
        
        // If a callback URL was provided, redirect to it
        if (callbackUrl) {
          router.push(callbackUrl);
        }
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [status, session, onClose, onSuccess, router, callbackUrl]);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { 
        callbackUrl: callbackUrl || window.location.href 
      });
    } catch (error) {
      console.error("Authentication error:", error);
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full animate-in fade-in slide-in-from-bottom-10 duration-300">
        {authSuccess ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-8 w-8 text-green-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bangers text-purple-800 tracking-wide mb-2">
              Login Successful!
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              You have been signed in successfully!
            </p>
            {session?.user?.image && (
              <div className="flex justify-center mb-4">
                <Image 
                  src={session.user.image} 
                  width={60} 
                  height={60} 
                  alt={session.user.name || "User"} 
                  className="rounded-full"
                />
              </div>
            )}
            <p className="text-gray-700 font-medium">
              Welcome, {session?.user?.name || "User"}!
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-5">
              <h2 className="text-2xl font-bangers text-purple-800 tracking-wide mb-2">
                Sign In
              </h2>
              <p className="text-gray-600 text-sm">
                {message}
              </p>
            </div>

            <Button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full py-6 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-xl flex items-center justify-center space-x-3 shadow-sm transition"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-t-2 border-b-2 border-gray-800 rounded-full animate-spin"></div>
              ) : (
                <Image
                  src="/google-logo.svg"
                  width={20}
                  height={20}
                  alt="Google logo"
                />
              )}
              <span className="font-medium">
                {isLoading ? "Signing in..." : "Sign in with Google"}
              </span>
            </Button>

            <div className="mt-4 flex justify-between">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                Continue as Guest
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  localStorage.setItem('dismissAuthModal', 'true');
                  onClose();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                Don't show again
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 