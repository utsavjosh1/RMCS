"use client";

import React, { useState } from "react";
import { Gamepad2, Plus, Users, Key } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Play = () => {
  const { toast } = useToast();
  const [joinCode, setJoinCode] = useState("");
  const [createRoomOpen, setCreateRoomOpen] = useState(false);
  const [roomDetails, setRoomDetails] = useState({
    title: "",
    maxPlayers: 4,
    isPrivate: false,
  });

  const handleCreateRoom = () => {
    if (!roomDetails.title.trim()) {
      toast({
        title: "Room Title Required",
        description: "Please enter a title for your room",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would call an API to create the room
    const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    toast({
      title: "Room Created",
      description: `Your room "${roomDetails.title}" has been created with code ${roomCode}`,
      variant: "success",
    });

    // Reset form and close modal
    setRoomDetails({
      title: "",
      maxPlayers: 4,
      isPrivate: false,
    });
    setCreateRoomOpen(false);

    // In a real app, you would redirect to the room
    // router.push(`/rooms/${roomId}`);
  };

  const handleJoinRoom = () => {
    if (!joinCode.trim()) {
      toast({
        title: "Room Code Required",
        description: "Please enter a room code to join",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would validate the room code before joining
    toast({
      title: "Joining Room",
      description: `Attempting to join room with code ${joinCode}...`,
      variant: "default",
    });

    // Reset form
    setJoinCode("");

    // In a real app, you would redirect to the room
    // router.push(`/rooms/${roomId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-purple-800 mb-2 flex items-center justify-center">
          <Gamepad2 className="mr-3 text-pink-500" size={36} />
          Game Room
        </h1>
        <p className="text-gray-600 max-w-md mx-auto">
          Create your own game room or join an existing one to play with friends
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* Create Room Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border-4 border-violet-200 flex flex-col">
          <div className="flex items-center text-purple-700 mb-4">
            <Plus size={24} className="mr-2" />
            <h2 className="text-2xl font-semibold">Create Room</h2>
          </div>

          {createRoomOpen ? (
            <div className="space-y-4 flex-1">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Room Title
                </label>
                <input
                  type="text"
                  placeholder="Enter a room name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  value={roomDetails.title}
                  onChange={(e) =>
                    setRoomDetails({ ...roomDetails, title: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Players
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  value={roomDetails.maxPlayers}
                  onChange={(e) =>
                    setRoomDetails({
                      ...roomDetails,
                      maxPlayers: Number(e.target.value),
                    })
                  }
                >
                  {[2, 3, 4, 5, 6, 8, 10].map((num) => (
                    <option key={num} value={num}>
                      {num} Players
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPrivate"
                  className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                  checked={roomDetails.isPrivate}
                  onChange={(e) =>
                    setRoomDetails({
                      ...roomDetails,
                      isPrivate: e.target.checked,
                    })
                  }
                />
                <label htmlFor="isPrivate" className="ml-2 text-gray-700">
                  Private Room (Only accessible with room code)
                </label>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleCreateRoom}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition shadow-md"
                >
                  Create Room
                </button>
                <button
                  onClick={() => setCreateRoomOpen(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-6">
                Start a new game room and invite friends to join. You&apos;ll be
                the host with control over game settings.
              </p>
              <button
                onClick={() => setCreateRoomOpen(true)}
                className="mt-auto bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition shadow-md w-full"
              >
                Create New Room
              </button>
            </>
          )}
        </div>

        {/* Join Room Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border-4 border-violet-200 flex flex-col">
          <div className="flex items-center text-purple-700 mb-4">
            <Users size={24} className="mr-2" />
            <h2 className="text-2xl font-semibold">Join Room</h2>
          </div>

          <p className="text-gray-600 mb-6">
            Enter a room code to join an existing game. Ask your friends for
            their room code to join them.
          </p>

          <div className="mt-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Key size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Enter 6-character room code"
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 uppercase"
                value={joinCode}
                onChange={(e) =>
                  setJoinCode(e.target.value.toUpperCase().slice(0, 6))
                }
                maxLength={6}
              />
            </div>

            <button
              onClick={handleJoinRoom}
              className="mt-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition shadow-md w-full"
            >
              Join Room
            </button>

            <button
              onClick={() => {
                // In a real app, this would navigate to the browse rooms page
                // router.push('/rooms');
                toast({
                  title: "Browse Rooms",
                  description: "Redirecting to room browser...",
                  variant: "default",
                });
              }}
              className="mt-3 w-full text-center py-2 text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Browse Public Rooms
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Play;
