import { useState } from "react";
import { X, Copy, Check } from "lucide-react";

export function CreateRoomModal({ isOpen, onClose, onCreateRoom }) {
  const [roomName, setRoomName] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!roomName.trim()) return;

    setIsCreating(true);
    try {
      await onCreateRoom(roomName);
      onClose();
    } catch (error) {
      console.error("Failed to create room:", error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-purple-800 mb-4">Create New Room</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="roomName" className="block text-sm font-medium text-gray-700 mb-1">
              Room Name
            </label>
            <input
              type="text"
              id="roomName"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="Enter room name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isCreating || !roomName.trim()}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 px-4 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCreating ? "Creating..." : "Create Room"}
          </button>
        </form>
      </div>
    </div>
  );
}

export function RoomCodeModal({ isOpen, onClose, roomCode }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(roomCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">Room Created!</h2>
          <p className="text-gray-600 mb-4">Share this code with your friends to join:</p>
          
          <div className="bg-gray-100 p-4 rounded-lg mb-4 flex items-center justify-between">
            <code className="text-2xl font-mono font-bold text-purple-800">{roomCode}</code>
            <button
              onClick={handleCopyCode}
              className="p-2 hover:bg-gray-200 rounded-lg transition"
              title="Copy to clipboard"
            >
              {isCopied ? (
                <Check className="text-green-500" size={20} />
              ) : (
                <Copy className="text-gray-500" size={20} />
              )}
            </button>
          </div>

          <p className="text-sm text-gray-500">
            Players can join by entering this code in the join room section
          </p>
        </div>
      </div>
    </div>
  );
} 