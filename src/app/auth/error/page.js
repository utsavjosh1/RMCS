"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle } from "lucide-react";

export default function AuthErrorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState("Authentication failed");

  useEffect(() => {
    const message = searchParams.get("message");
    if (message) {
      setErrorMessage(decodeURIComponent(message));
    }
    
    // Clear any stale auth data when user lands on error page
    localStorage.removeItem("auth_token");
    localStorage.removeItem("authChoice");
    localStorage.removeItem("guest_user");
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          
          <h1 className="text-2xl font-bangers text-red-600 tracking-wide mb-2">
            Authentication Failed
          </h1>
          
          <p className="text-gray-600 mb-6">
            {errorMessage}
          </p>
          
          <div className="space-y-3">
            <button
              onClick={() => router.push("/")}
              className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
            >
              Try Again
            </button>
            
            <button
              onClick={() => router.push("/")}
              className="w-full px-6 py-2 text-gray-600 hover:text-gray-800 transition text-sm"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 