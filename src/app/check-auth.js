"use client";

import { useEffect, useState } from "react";

export default function CheckAuth() {
  const [info, setInfo] = useState({
    baseUrl: "",
    callbackUrl: "",
  });

  useEffect(() => {
    // Only run in browser
    const baseUrl = window.location.origin;
    const callbackUrl = `${baseUrl}/api/auth/callback/google`;

    setInfo({
      baseUrl,
      callbackUrl,
    });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">NextAuth Configuration Info</h1>
      <div className="bg-gray-100 p-4 rounded mb-4">
        <p className="mb-2">
          <strong>Base URL:</strong> {info.baseUrl}
        </p>
        <p className="mb-2">
          <strong>Google Callback URL:</strong> {info.callbackUrl}
        </p>
        <p className="mb-6">
          Add this exact callback URL to your Google Cloud Console
        </p>
      </div>

      <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
        <h2 className="font-bold mb-2">
          Steps to fix the redirect_uri_mismatch error:
        </h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            Go to the{" "}
            <a
              href="https://console.cloud.google.com/apis/credentials"
              target="_blank"
              className="text-blue-600 underline"
            >
              Google Cloud Console
            </a>
          </li>
          <li>Select your project</li>
          <li>Go to "APIs & Services" &gt; "Credentials"</li>
          <li>Edit your OAuth 2.0 Client ID</li>
          <li>
            Under "Authorized redirect URIs", add:{" "}
            <span className="font-mono bg-gray-200 px-1">
              {info.callbackUrl}
            </span>
          </li>
          <li>Click "Save"</li>
          <li>
            Make sure your .env file has{" "}
            <span className="font-mono bg-gray-200 px-1">
              NEXTAUTH_URL={info.baseUrl}
            </span>
          </li>
        </ol>
      </div>
    </div>
  );
}
