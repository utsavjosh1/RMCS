"use client";

import { useState, useEffect } from "react";

import { Sidebar } from "@/components/sidebar";
import { MobileSidebarToggle } from "@/components/mobile-sidebar";
import { cn } from "@/lib/utils";

export function AppShell({ children }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50/50 via-white to-purple-50/50">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile sidebar toggle */}
      <MobileSidebarToggle />

      {/* Main content */}
      <main
        className={cn(
          "transition-all duration-300 md:pl-[5rem] lg:pl-[20rem]",
          isMounted ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="container mx-auto p-4 md:p-6">{children}</div>
      </main>
    </div>
  );
}
