"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Gamepad2,
  Users,
  HeartHandshake,
  Home,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar({ className }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const navItems = [
    {
      icon: Home,
      label: "Home",
      href: "/",
      color: "bg-blue-100 hover:bg-blue-200 text-blue-700",
      activeColor: "bg-blue-200 text-blue-800",
    },
    {
      icon: Gamepad2,
      label: "Play",
      href: "/play",
      color: "bg-green-100 hover:bg-green-200 text-green-700",
      activeColor: "bg-green-200 text-green-800",
    },
    {
      icon: HeartHandshake,
      label: "Donate",
      href: "/donate",
      color: "bg-red-100 hover:bg-red-200 text-red-700",
      activeColor: "bg-red-200 text-red-800",
    },
    {
      icon: BookOpen,
      label: "Rules",
      href: "/rules",
      color: "bg-purple-100 hover:bg-purple-200 text-purple-700",
      activeColor: "bg-purple-200 text-purple-800",
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-col h-screen fixed top-0 left-0 bg-violet-50 border-r-4 border-violet-300 transition-all duration-300 shadow-lg",
        collapsed ? "w-24" : "w-72",
        "rounded-r-3xl overflow-hidden",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        {!collapsed && (
          <h2 className="font-bold text-xl tracking-wide rotate-[-1deg] transform">
            RMCS!
          </h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-white hover:bg-white/20 hover:rotate-6 transition-transform"
        >
          {collapsed ? <Menu size={24} /> : <X size={24} />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
            collapsed={collapsed}
            active={pathname === item.href}
            color={item.color}
            activeColor={item.activeColor}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t-4 border-violet-300 bg-violet-100">
        <div className="text-center text-violet-700 font-medium text-sm">
          {collapsed ? "🎮" : "Happy Gaming! 🎮"}
        </div>
      </div>
    </div>
  );
}

function NavItem({
  icon: Icon,
  label,
  href,
  collapsed,
  active,
  color,
  activeColor,
}) {
  return (
    <Link href={href} className="block">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start font-medium text-base rounded-xl border-2 border-transparent",
          "transition-all duration-200 hover:scale-105 hover:shadow-md",
          collapsed ? "p-3" : "p-4",
          active ? activeColor : color,
          active && "border-current rotate-[-0.5deg]"
        )}
      >
        <Icon
          size={collapsed ? 24 : 22}
          className={cn(
            "shrink-0",
            collapsed ? "mx-auto" : "mr-3",
            "animate-pulse-slow"
          )}
        />
        {!collapsed && (
          <span className={active ? "font-bold" : ""}>{label}</span>
        )}
      </Button>
    </Link>
  );
}
