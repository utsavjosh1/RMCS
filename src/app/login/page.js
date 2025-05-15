"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  // If authenticated, redirect to callbackUrl or home
  useEffect(() => {
    if (status === "authenticated") {
      router.push(callbackUrl);
    }
  }, [status, callbackUrl, router]);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("google", {
        callbackUrl: callbackUrl,
      });
    } catch (error) {
      console.error("Authentication error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-indigo-50 to-pink-50">
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 border-4 border-violet-300 max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bangers text-purple-800 tracking-wide mb-4">
              Raja Mantri Chor Sipahi
            </h1>
            <p className="text-gray-600">
              Sign in to create rooms, join games, and play with friends!
            </p>
            {callbackUrl !== "/" && (
              <p className="mt-2 text-sm text-indigo-600">
                You'll be redirected after login
              </p>
            )}
          </div>

          <div className="space-y-4">
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

            <Button
              onClick={() => router.push("/")}
              variant="outline"
              className="w-full mt-4"
            >
              Continue as Guest
            </Button>

            <div className="text-center text-sm text-gray-500 mt-8">
              <p>
                By signing in, you agree to our privacy policy and terms of
                service.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 