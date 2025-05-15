"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function JoinRoomModal({ isOpen, onClose, onJoinRoom }) {
  const [roomCode, setRoomCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!roomCode.trim()) {
      setError("Please enter a room code");
      return;
    }
    
    setError("");
    setIsSubmitting(true);
    
    try {
      // First verify the room exists
      const response = await fetch(`/api/rooms/${roomCode}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setError("Room not found. Please check the code and try again.");
        } else {
          setError("Failed to join room. Please try again.");
        }
        setIsSubmitting(false);
        return;
      }
      
      // Call the join room function passed from parent
      onJoinRoom(roomCode);
      
      // Reset form and close modal
      setRoomCode("");
      onClose();
    } catch (error) {
      console.error("Error joining room:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] font-poppins">
        <DialogHeader>
          <DialogTitle className="text-xl font-bangers tracking-wide text-purple-800">Join a Game Room</DialogTitle>
          <DialogDescription>
            Enter a room code to join an existing game.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="room-code" className="font-medium">
                Room Code
              </Label>
              <Input
                id="room-code"
                placeholder="Enter room code"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                className="uppercase"
                autoFocus
                autoComplete="off"
                disabled={isSubmitting}
              />
              {error && (
                <p className="text-sm text-red-600 mt-1">{error}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Joining..." : "Join Room"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 