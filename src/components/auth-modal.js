"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth";
import { Chrome, User, Gamepad2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function AuthModal({ isOpen, onClose, message }) {
  const [guestName, setGuestName] = useState("");
  const [isCreatingGuest, setIsCreatingGuest] = useState(false);
  const { login, createGuest } = useAuth();
  const { toast } = useToast();

  const handleGoogleLogin = () => {
    login();
  };

  const handleGuestLogin = async () => {
    if (!guestName.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter a name to continue as guest",
        variant: "destructive",
      });
      return;
    }

    setIsCreatingGuest(true);
    try {
      const result = await createGuest(guestName.trim());
      if (result.success) {
        toast({
          title: "Welcome!",
          description: `Playing as guest: ${result.user.name}`,
        });
        onClose();
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to create guest account",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Guest login error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreatingGuest(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && guestName.trim()) {
      handleGuestLogin();
    }
  };

  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={() => {}} // Completely prevent closing
      modal={true}
    >
      <DialogContent 
        className="sm:max-w-[480px] p-0 bg-gradient-to-br from-purple-50 to-pink-50 border-0"
        hideCloseButton={true}
        onEscapeKeyDown={(e) => e.preventDefault()} // Prevent escape key
        onPointerDownOutside={(e) => e.preventDefault()} // Prevent clicking outside
        onInteractOutside={(e) => e.preventDefault()} // Prevent any outside interaction
      >
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <Gamepad2 className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bangers text-purple-800 tracking-wide mb-2">
              Welcome to RMCS!
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {message || "Choose how you'd like to play the classic Raja Mantri Chor Sipahi game"}
            </p>
          </div>

          {/* Google Login */}
          <div className="space-y-4">
            <Button
              onClick={handleGoogleLogin}
              className="w-full h-12 bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 shadow-sm"
              variant="outline"
            >
              <Chrome className="w-5 h-5 mr-3 text-blue-500" />
              <span className="font-medium">Continue with Google</span>
            </Button>

            <div className="text-xs text-center text-gray-500 bg-white/50 rounded-lg p-2 border border-gray-200">
              ✅ Save your progress • ✅ Track statistics • ✅ Leaderboards
            </div>
          </div>

          {/* Separator */}
          <div className="flex items-center my-6">
            <Separator className="flex-1 bg-gray-300" />
            <span className="px-3 text-sm text-gray-500 font-medium">OR</span>
            <Separator className="flex-1 bg-gray-300" />
          </div>

          {/* Guest Login */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="guestName" className="text-sm font-medium text-gray-700">
                Play as Guest
              </Label>
              <Input
                id="guestName"
                placeholder="Enter your display name"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                onKeyPress={handleKeyPress}
                className="h-12 border-2 border-gray-200 focus:border-purple-400 bg-white"
                maxLength={20}
              />
            </div>

            <Button
              onClick={handleGuestLogin}
              disabled={!guestName.trim() || isCreatingGuest}
              className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200"
            >
              {isCreatingGuest ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Creating account...
                </div>
              ) : (
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-3" />
                  Continue as Guest
                </div>
              )}
            </Button>

            <div className="text-xs text-center text-gray-500 bg-yellow-50 rounded-lg p-2 border border-yellow-200">
              ⚠️ Guest progress won't be saved after closing browser
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              You must choose an option to continue playing
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Persistent Auth Guard Component
export function AuthGuard({ children }) {
  const { needsAuthChoice, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // If user needs to make auth choice, show auth modal and hide everything else
  if (needsAuthChoice) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="text-center">
            <div className="text-6xl mb-4">🎮</div>
            <h3 className="text-xl font-bangers text-gray-700 mb-2 tracking-wide">
              Welcome to RMCS!
            </h3>
            <p className="text-gray-500">
              Please authenticate to continue playing.
            </p>
          </div>
        </div>
        <AuthModal 
          isOpen={true} 
          onClose={() => {}} // Cannot close
          message="Authentication is required to access game rooms."
        />
      </>
    );
  }

  // Only show children if authenticated
  return (
    <>
      {children}
    </>
  );
} 