import { useEffect, useRef, useCallback } from "react";
import { io } from "socket.io-client";

export function useSocket() {
  const socketRef = useRef(null);
  const listenersRef = useRef(new Map());

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000", {
      autoConnect: false,
    });

    // Connect to socket server
    socketRef.current.connect();

    // Store current listeners map for cleanup
    const currentListeners = listenersRef.current;

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        // Remove all listeners using the captured map
        currentListeners.forEach((callback, event) => {
          socketRef.current.off(event, callback);
        });
        currentListeners.clear();
        socketRef.current.disconnect();
      }
    };
  }, []);

  const addListener = useCallback((event, callback) => {
    if (!socketRef.current) return;
    
    // Store the callback for cleanup
    listenersRef.current.set(event, callback);
    socketRef.current.on(event, callback);
    
    // Return cleanup function
    return () => {
      if (socketRef.current) {
        socketRef.current.off(event, callback);
        listenersRef.current.delete(event);
      }
    };
  }, []);

  const joinRoom = useCallback(({ roomCode, userId, userName }) => {
    if (!socketRef.current) return;
    socketRef.current.emit("join-room", { roomCode, userId, userName });
  }, []);

  const leaveRoom = useCallback(({ roomCode, userId }) => {
    if (!socketRef.current) return;
    socketRef.current.emit("leave-room", { roomCode, userId });
  }, []);

  const updateReadyStatus = useCallback(({ roomCode, userId, isReady }) => {
    if (!socketRef.current) return;
    socketRef.current.emit("player-ready", { roomCode, userId, isReady });
  }, []);

  const updateGameState = useCallback(({ roomCode, gameState }) => {
    if (!socketRef.current) return;
    socketRef.current.emit("game-state-update", { roomCode, gameState });
  }, []);

  const onPlayerJoined = useCallback((callback) => {
    return addListener("player-joined", callback);
  }, [addListener]);

  const onPlayerLeft = useCallback((callback) => {
    return addListener("player-left", callback);
  }, [addListener]);

  const onReadyUpdate = useCallback((callback) => {
    return addListener("player-ready-update", callback);
  }, [addListener]);

  const onGameStateUpdate = useCallback((callback) => {
    return addListener("game-state-update", callback);
  }, [addListener]);

  const onRoomState = useCallback((callback) => {
    return addListener("room-state", callback);
  }, [addListener]);

  const onError = useCallback((callback) => {
    return addListener("error", callback);
  }, [addListener]);

  return {
    joinRoom,
    leaveRoom,
    updateReadyStatus,
    updateGameState,
    onPlayerJoined,
    onPlayerLeft,
    onReadyUpdate,
    onGameStateUpdate,
    onRoomState,
    onError,
  };
} 