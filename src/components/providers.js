// src/components/providers.js
"use client";

import { SessionProvider } from "next-auth/react";
import { ToastProvider } from "@/hooks/use-toast";

export function Providers({ children }) {
  return (
    <SessionProvider>
      <ToastProvider>{children}</ToastProvider>
    </SessionProvider>
  );
}
