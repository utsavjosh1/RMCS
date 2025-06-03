"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  HeartHandshake,
  Home,
  BookOpen,
  User,
  BarChart2,
  Settings,
  HelpCircle,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  {
    icon: Home,
    label: "Home",
    href: "/",
    color: "bg-blue-100/80 hover:bg-blue-200/90 text-blue-700",
    activeColor: "bg-blue-200 text-blue-800 shadow-inner shadow-blue-300/50",
    description: "Return to the main dashboard",
  },
  {
    icon: HeartHandshake,
    label: "Donate",
    href: "/donate",
    color: "bg-red-100/80 hover:bg-red-200/90 text-red-700",
    activeColor: "bg-red-200 text-red-800 shadow-inner shadow-red-300/50",
    description: "Support our community",
  },
  {
    icon: BookOpen,
    label: "Rules",
    href: "/rules",
    color: "bg-purple-100/80 hover:bg-purple-200/90 text-purple-700",
    activeColor:
      "bg-purple-200 text-purple-800 shadow-inner shadow-purple-300/50",
    description: "Learn about our community guidelines",
  },
];

const profileItems = [
  {
    icon: User,
    label: "Profile",
    href: "/profile",
    color: "bg-green-100/80 hover:bg-green-200/90 text-green-700",
    activeColor: "bg-green-200 text-green-800 shadow-inner shadow-green-300/50",
    description: "View and edit your profile",
  },
  {
    icon: BarChart2,
    label: "Stats",
    href: "/stats",
    color: "bg-indigo-100/80 hover:bg-indigo-200/90 text-indigo-700",
    activeColor:
      "bg-indigo-200 text-indigo-800 shadow-inner shadow-indigo-300/50",
    description: "Check your gaming statistics",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
    color: "bg-slate-100/80 hover:bg-slate-200/90 text-slate-700",
    activeColor: "bg-slate-200 text-slate-800 shadow-inner shadow-slate-300/50",
    description: "Manage your account settings",
  },
  {
    icon: HelpCircle,
    label: "Help",
    href: "/help",
    color: "bg-teal-100/80 hover:bg-teal-200/90 text-teal-700",
    activeColor: "bg-teal-200 text-teal-800 shadow-inner shadow-teal-300/50",
    description: "Get help and support",
  },
];

export function Sidebar({ className }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuth();

  // Handle initial load animation
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle responsive collapse
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Animation variants
  const sidebarVariants = {
    expanded: { 
      width: "min(20rem, 90vw)",
      height: "100dvh"
    },
    collapsed: { 
      width: "5rem",
      height: "100dvh"
    },
  };

  const itemVariants = {
    expanded: { opacity: 1, x: 0 },
    collapsed: { opacity: 0, x: -10 },
  };

  const iconVariants = {
    expanded: { rotate: 0 },
    collapsed: { rotate: 180 },
  };

  return (
    <TooltipProvider delayDuration={200}>
      <motion.div
        initial={false}
        animate={collapsed ? "collapsed" : "expanded"}
        variants={sidebarVariants}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className={cn(
          "flex flex-col fixed top-0 left-0 z-40",
          "bg-gradient-to-b from-violet-50 via-purple-50 to-violet-50",
          "border-r border-violet-200",
          "shadow-[5px_0_30px_-15px_rgba(139,92,246,0.3)]",
          mounted ? "opacity-100" : "opacity-0 translate-x-[-10px]",
          "h-[100dvh]",
          "max-h-[100dvh]",
          "overflow-hidden",
          className
        )}
      >
        {/* Header */}
        <div className="relative flex items-center justify-between p-4 min-h-[4rem] bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 text-white">
          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {!collapsed && (
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md">
                  <span className="text-purple-600 font-bold text-lg font-bangers">
                    R
                  </span>
                </div>
                <h2 className="font-bangers text-2xl tracking-wide transform rotate-[-1deg] text-shadow">
                  RMCS!
                </h2>
              </div>
            )}
          </motion.div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="text-white hover:bg-white/20 transition-all duration-300 rounded-full"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <motion.div variants={iconVariants} transition={{ duration: 0.3 }}>
              <ChevronRight size={20} />
            </motion.div>
          </Button>

          {/* Decorative elements */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 via-fuchsia-300 to-pink-400"></div>
        </div>

        {/* User Profile Section */}
        {isAuthenticated && (
          <div className="p-4 min-h-[5rem] border-b border-violet-200 bg-violet-100/50 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="focus:outline-none"
                  >
                    {user?.image ? (
                      <Image
                        src={user.image || "/placeholder.svg"}
                        width={44}
                        height={44}
                        alt={user.name || "User"}
                        className="rounded-full ring-2 ring-purple-400 hover:ring-purple-500 transition-all duration-300"
                      />
                    ) : (
                      <div className="w-11 h-11 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center ring-2 ring-purple-400 hover:ring-purple-500 transition-all duration-300">
                        <span className="text-white font-bold text-lg">
                          {user?.name?.[0] || "U"}
                        </span>
                      </div>
                    )}
                  </motion.button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 p-2">
                  <DropdownMenuLabel className="px-2 py-1.5">My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="my-2" />
                  <DropdownMenuItem asChild className="px-2 py-2.5">
                    <Link href="/profile" className="flex items-center">
                      <User className="mr-3 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="px-2 py-2.5">
                    <Link href="/settings" className="flex items-center">
                      <Settings className="mr-3 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-2" />
                  <DropdownMenuItem className="text-red-600 px-2 py-2.5">
                    <LogOut className="mr-3 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <motion.div
                variants={itemVariants}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                {!collapsed && (
                  <div>
                    <p className="font-medium text-violet-900">{user?.name}</p>
                    <div className="flex items-center text-xs text-violet-700">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                      <span>Online</span>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-violet-300 scrollbar-track-transparent min-h-0">
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
              description={item.description}
              badge={item.badge}
            />
          ))}

          {/* Profile Section */}
          {isAuthenticated && (
            <>
              <div
                className={cn(
                  "pt-6 mt-4 mb-2",
                  !collapsed && "border-t border-violet-200"
                )}
              >
                <motion.p
                  variants={collapsed ? {} : itemVariants}
                  className={cn(
                    "text-xs font-medium text-violet-600 mb-4 uppercase tracking-wider",
                    collapsed ? "text-center" : "px-3"
                  )}
                >
                  {collapsed ? "PROF" : "PROFILE"}
                </motion.p>
                <div className="space-y-3 px-1">
                  {profileItems.map((item) => (
                    <NavItem
                      key={item.href}
                      icon={item.icon}
                      label={item.label}
                      href={item.href}
                      collapsed={collapsed}
                      active={pathname === item.href}
                      color={item.color}
                      activeColor={item.activeColor}
                      description={item.description}
                      badge={item.badge}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </nav>

        {/* Footer */}
        <div className="p-4 min-h-[4rem] border-t border-violet-200 bg-violet-100/50 backdrop-blur-sm">
          <motion.div
            variants={collapsed ? {} : itemVariants}
            className="text-center text-violet-700 font-medium"
          >
            {collapsed ? (
              <span className="text-xl">🎮</span>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <span className="text-lg">🎮</span>
                <span className="font-poppins">Happy Gaming!</span>
                <span className="text-lg">🎮</span>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile overlay when sidebar is open */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 h-[100dvh] bg-black/50 backdrop-blur-sm z-30"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Mobile toggle button (visible when sidebar is collapsed) */}
      {collapsed && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={toggleSidebar}
          className="md:hidden fixed bottom-6 left-6 z-50 bg-violet-600 text-white p-3 rounded-full shadow-lg hover:bg-violet-700 transition-colors"
          aria-label="Open sidebar"
        >
          <Menu size={24} />
        </motion.button>
      )}
    </TooltipProvider>
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
  description,
  badge,
}) {
  return (
    <Link href={href} className="block h-[3.5rem]">
      {collapsed ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="relative h-full"
            >
              <Button
                variant="ghost"
                className={cn(
                  "w-full h-full justify-center p-3 rounded-xl",
                  "transition-all duration-200 hover:shadow-md",
                  active ? activeColor : color,
                  active && "border-2 border-current"
                )}
                aria-current={active ? "page" : undefined}
              >
                <Icon
                  size={24}
                  className={cn("shrink-0", active && "animate-pulse-slow")}
                />
                {badge && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center"
                  >
                    {badge}
                  </Badge>
                )}
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            className="bg-white/95 backdrop-blur-sm border border-violet-200 shadow-lg"
            sideOffset={5}
          >
            <p className="font-medium">{label}</p>
            {description && (
              <p className="text-xs text-gray-500 mt-1">{description}</p>
            )}
          </TooltipContent>
        </Tooltip>
      ) : (
        <motion.div
          whileHover={{ scale: 1.02, x: 3 }}
          whileTap={{ scale: 0.98 }}
          className="relative h-full"
        >
          <Button
            variant="ghost"
            className={cn(
              "w-full h-full justify-start font-medium text-base rounded-xl",
              "transition-all duration-200 hover:shadow-md",
              "p-3 px-4",
              active ? activeColor : color,
              active && "border-l-4 border-current pl-[18px]"
            )}
            aria-current={active ? "page" : undefined}
          >
            <Icon
              size={22}
              className={cn("shrink-0 mr-3", active && "animate-pulse-slow")}
            />
            <span className={active ? "font-bold" : ""}>{label}</span>
            {badge && (
              <Badge variant="destructive" className="ml-auto">
                {badge}
              </Badge>
            )}
          </Button>
        </motion.div>
      )}
    </Link>
  );
}
