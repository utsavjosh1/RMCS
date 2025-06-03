"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

export default function AuthSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");
    const userParam = searchParams.get("user");

    if (token && userParam) {
      try {
        // Parse user data
        const userData = JSON.parse(decodeURIComponent(userParam));
        
        // Validate user data
        if (!userData.id || !userData.email) {
          throw new Error("Invalid user data received");
        }
        
        // Store authentication data only after validation
        localStorage.setItem("auth_token", token);
        localStorage.setItem("authChoice", "google");
        
        // Clear any guest data
        localStorage.removeItem("guest_user");
        
        // Redirect to home page - the auth context will pick up the changes
        router.replace("/");
      } catch (error) {
        console.error("Error processing auth success:", error);
        // Clear any potentially corrupted data
        localStorage.removeItem("auth_token");
        localStorage.removeItem("authChoice");
        localStorage.removeItem("guest_user");
        router.replace("/auth/error?message=" + encodeURIComponent("Authentication processing failed"));
      }
    } else {
      // Missing parameters, redirect to error
      console.error("Missing auth parameters:", { token: !!token, userParam: !!userParam });
      router.replace("/auth/error?message=" + encodeURIComponent("Missing authentication data"));
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Processing Authentication</h2>
        <p className="text-gray-500">Please wait while we complete your sign-in...</p>
      </div>
    </div>
  );
} 