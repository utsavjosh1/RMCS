"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useAuth } from "@/hooks/use-auth";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, login, createGuest } = useAuth();
  const [guestName, setGuestName] = useState("");
  const [isCreatingGuest, setIsCreatingGuest] = useState(false);
  const [showGuestForm, setShowGuestForm] = useState(false);

  // If authenticated, redirect to home
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleGoogleSignIn = () => {
    login();
  };

  const handleGuestLogin = async () => {
    if (!guestName.trim()) return;

    setIsCreatingGuest(true);
    try {
      await createGuest(guestName.trim());
      router.push("/");
    } catch (error) {
      console.error("Error creating guest:", error);
    } finally {
      setIsCreatingGuest(false);
    }
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full bg-gradient-to-br from-indigo-50 to-pink-50">
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="w-16 h-16 border-t-4 border-purple-500 border-solid rounded-full animate-spin"></div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-indigo-50 to-pink-50">
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bangers text-purple-800 tracking-wide mb-2">
              Welcome to RMCS
            </h1>
            <p className="text-gray-600 text-sm">
              Sign in to play Raja Mantri Chor Sipahi
            </p>
          </div>

          <div className="space-y-4">
            {/* Google Sign In */}
            <Button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full py-6 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-xl flex items-center justify-center space-x-3 shadow-sm transition"
            >
              <Image
                src="/google-logo.svg"
                width={20}
                height={20}
                alt="Google logo"
              />
              <span className="font-medium">Sign in with Google</span>
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or</span>
              </div>
            </div>

            {/* Guest Login */}
            {!showGuestForm ? (
              <Button
                onClick={() => setShowGuestForm(true)}
                variant="outline"
                className="w-full py-6 border-purple-300 text-purple-700 hover:bg-purple-50 rounded-xl"
              >
                Continue as Guest
              </Button>
            ) : (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === "Enter" && handleGuestLogin()}
                  disabled={isCreatingGuest}
                />
                <div className="flex space-x-2">
                  <Button
                    onClick={handleGuestLogin}
                    disabled={!guestName.trim() || isCreatingGuest}
                    className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
                  >
                    {isCreatingGuest ? "Creating..." : "Play as Guest"}
                  </Button>
                  <Button
                    onClick={() => {
                      setShowGuestForm(false);
                      setGuestName("");
                    }}
                    variant="outline"
                    disabled={isCreatingGuest}
                    className="px-4 py-3 border-gray-300 text-gray-700 rounded-xl"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our terms of service and privacy policy.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
} 