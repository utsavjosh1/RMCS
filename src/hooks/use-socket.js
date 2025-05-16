import { useEffect, useRef, useCallback, useState } from "react";
import { io } from "socket.io-client";

export function useSocket() {
  const socketRef = useRef(null);
  const listenersRef = useRef(new Map());
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const maxReconnectAttempts = 5;

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io(
      process.env.SOCKET_URL || "http://localhost:3001",
      {
        autoConnect: true,
        reconnectionAttempts: maxReconnectAttempts,
        reconnectionDelay: 1000,
        timeout: 20000,
        transports: ["websocket", "polling"],
        path: "/socket.io",
      }
    );

    // Connection event handlers
    const onConnect = () => {
      setIsConnected(true);
      setConnectionError(null);
      setReconnectAttempts(0);
    };

    const onDisconnect = (reason) => {
      setIsConnected(false);

      // Handle special disconnect cases
      if (reason === "io server disconnect") {
        // Server initiated disconnect, don't reconnect automatically
      } else {
        // Client-side disconnect, try to reconnect
        setReconnectAttempts((prev) => {
          const newCount = prev + 1;

          if (newCount <= maxReconnectAttempts) {
            setTimeout(() => {
              if (socketRef.current) {
                socketRef.current.connect();
              }
            }, 1000 * Math.min(newCount, 5)); // Exponential backoff capped at 5 seconds
          }

          return newCount;
        });
      }
    };

    const onConnectError = (error) => {
      console.error("Socket connection error:", error);
      setConnectionError(error.message);
      setIsConnected(false);
    };

    const onReconnect = (attemptNumber) => {
      setIsConnected(true);
      setConnectionError(null);
      setReconnectAttempts(0);
    };

    const onReconnectError = (error) => {
      console.error("Socket reconnection error:", error);
      setConnectionError(`Reconnection failed: ${error.message}`);
    };

    // Add connection event listeners
    socketRef.current.on("connect", onConnect);
    socketRef.current.on("disconnect", onDisconnect);
    socketRef.current.on("connect_error", onConnectError);
    socketRef.current.on("reconnect", onReconnect);
    socketRef.current.on("reconnect_error", onReconnectError);

    // Store current listeners map for cleanup
    const currentListeners = listenersRef.current;

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        // Remove connection event listeners
        socketRef.current.off("connect", onConnect);
        socketRef.current.off("disconnect", onDisconnect);
        socketRef.current.off("connect_error", onConnectError);
        socketRef.current.off("reconnect", onReconnect);
        socketRef.current.off("reconnect_error", onReconnectError);

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

  const emitWithRetry = useCallback(
    (event, data, maxRetries = 3) => {
      if (!socketRef.current)
        return Promise.reject(new Error("Socket not initialized"));

      return new Promise((resolve, reject) => {
        let retries = 0;
        let retryTimeout = null;
        let responseReceived = false;
        let timeoutId = null;

        const tryEmit = () => {
          if (!isConnected) {
            if (retries < maxRetries) {
              retries++;
              retryTimeout = setTimeout(tryEmit, 1000 * retries); // Increase backoff with each retry
              return;
            } else {
              return reject(
                new Error("Socket not connected after max retries")
              );
            }
          }

          // Clear any previous timeout if it exists
          if (timeoutId) {
            clearTimeout(timeoutId);
          }

          // If connected, try to emit the event
          try {
            socketRef.current.emit(event, data, (response) => {
              // Handle acknowledgment if server supports it
              responseReceived = true;

              // Clear timeout since we got a response
              if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
              }

              if (response && response.error) {
                reject(new Error(response.error));
              } else {
                resolve(response);
              }
            });

            // Add a timeout to handle cases where server doesn't send acknowledgement
            timeoutId = setTimeout(() => {
              if (!responseReceived) {
                resolve({ success: true, autoResolved: true });
              }
            }, 5000); // Increased timeout period to give server more time to respond
          } catch (err) {
            console.error(`Error emitting ${event}:`, err);
            reject(err);
          }
        };

        tryEmit();

        // Clean up any pending retry timeouts on unmount
        return () => {
          if (retryTimeout) {
            clearTimeout(retryTimeout);
          }
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
        };
      });
    },
    [isConnected]
  );

  const joinRoom = useCallback(
    async ({ roomCode, userId, userName }) => {
      // First, call the API endpoint to update the database
      try {
        const response = await fetch(`/api/rooms/${roomCode}/join`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, userName }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to join room via API");
        }

        // Then emit the socket event
        return emitWithRetry("join-room", { roomCode, userId, userName });
      } catch (error) {
        console.error("Error joining room:", error);
        throw error;
      }
    },
    [emitWithRetry]
  );

  const leaveRoom = useCallback(
    async ({ roomCode, userId }) => {
      // First, call the API endpoint to update the database
      try {
        const response = await fetch(`/api/rooms/${roomCode}/leave`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error in leave API:", errorData);
          // Don't throw here, still try the socket disconnect
        }
      } catch (error) {
        console.error("Error calling leave API:", error);
        // Don't throw here, still try the socket disconnect
      }

      // Then emit the socket event regardless of API success
      return emitWithRetry("leave-room", { roomCode, userId });
    },
    [emitWithRetry]
  );

  const setPlayerReady = useCallback(
    async ({ roomCode, userId, isReady }) => {
      try {
        // First update the database via the API
        const response = await fetch(`/api/rooms/${roomCode}/ready`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, isReady }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || "Failed to update ready status via API"
          );
        }

        // Then emit the socket event
        return emitWithRetry("player-ready", { roomCode, userId, isReady });
      } catch (error) {
        console.error("Error updating ready status:", error);
        throw error;
      }
    },
    [emitWithRetry]
  );

  const startGame = useCallback(
    async ({ roomCode }) => {
      try {
        // First update the game status in the database
        const response = await fetch(`/api/rooms/${roomCode}/start`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            hostId:
              socketRef.current?.auth?.userId || localStorage.getItem("userId"),
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to start game via API");
        }

        // Then emit the socket event to start the game in real-time
        return emitWithRetry("start-game", { roomCode });
      } catch (error) {
        console.error("Error starting game:", error);
        throw error;
      }
    },
    [emitWithRetry]
  );

  const updateGameState = useCallback(
    ({ roomCode, gameState }) => {
      return emitWithRetry("game-state-update", { roomCode, gameState });
    },
    [emitWithRetry]
  );

  const sendChatMessage = useCallback(
    ({ roomCode, userId, message }) => {
      return emitWithRetry("game-action", {
        roomCode,
        action: "chat-message",
        data: { message },
      });
    },
    [emitWithRetry]
  );

  const makeSipahiGuess = useCallback(
    ({ roomCode, userId, suspectedChorId }) => {
      return emitWithRetry("game-action", {
        roomCode,
        action: "sipahi-guess",
        data: { suspectedChorId },
      });
    },
    [emitWithRetry]
  );

  const endRound = useCallback(
    ({ roomCode, userId }) => {
      return emitWithRetry("game-action", {
        roomCode,
        action: "end-round",
      });
    },
    [emitWithRetry]
  );

  const onPlayerJoined = useCallback(
    (callback) => {
      return addListener("player-joined", callback);
    },
    [addListener]
  );

  const onPlayerLeft = useCallback(
    (callback) => {
      return addListener("player-left", callback);
    },
    [addListener]
  );

  const onReadyUpdate = useCallback(
    (callback) => {
      return addListener("player-ready-update", callback);
    },
    [addListener]
  );

  const onGameStateUpdate = useCallback(
    (callback) => {
      return addListener("game-state-update", callback);
    },
    [addListener]
  );

  const onRoomState = useCallback(
    (callback) => {
      return addListener("room-state", callback);
    },
    [addListener]
  );

  const onHostChanged = useCallback(
    (callback) => {
      return addListener("host-changed", callback);
    },
    [addListener]
  );

  const onGameStarted = useCallback(
    (callback) => {
      return addListener("game-started", callback);
    },
    [addListener]
  );

  const onRoleAssigned = useCallback(
    (callback) => {
      return addListener("role-assigned", callback);
    },
    [addListener]
  );

  const onSipahiGuessed = useCallback(
    (callback) => {
      return addListener("sipahi-guessed", callback);
    },
    [addListener]
  );

  const onRoundEnded = useCallback(
    (callback) => {
      return addListener("round-ended", callback);
    },
    [addListener]
  );

  const onChatMessage = useCallback(
    (callback) => {
      return addListener("chat-message", callback);
    },
    [addListener]
  );

  const onError = useCallback(
    (callback) => {
      return addListener("error", callback);
    },
    [addListener]
  );

  const onGameResult = useCallback(
    (callback) => {
      return addListener("game-result", callback);
    },
    [addListener]
  );

  return {
    joinRoom,
    leaveRoom,
    setPlayerReady,
    startGame,
    updateGameState,
    sendChatMessage,
    makeSipahiGuess,
    endRound,
    onPlayerJoined,
    onPlayerLeft,
    onReadyUpdate,
    onGameStateUpdate,
    onRoomState,
    onHostChanged,
    onGameStarted,
    onRoleAssigned,
    onSipahiGuessed,
    onRoundEnded,
    onChatMessage,
    onError,
    onGameResult,
    isConnected,
    connectionError,
    reconnectAttempts,
    maxReconnectAttempts,
  };
}
