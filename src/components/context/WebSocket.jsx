"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

const CART_WS_URL = "ws://103.189.89.74:8004/ws/cart/";
//const CART_WS_URL = "ws://192.168.29.78:8001/ws/cart/";
const CartWebSocketContext = createContext(null);

export const useCartWebSocket = () => {
  const context = useContext(CartWebSocketContext);
  if (!context) {
    throw new Error(
      "useCartWebSocket must be used within CartWebSocketProvider"
    );
  }
  return context;
};

export const CartWebSocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const handlersRef = useRef([]);

  const [isConnected, setIsConnected] = useState(false);

  const initCartWebSocket = useCallback(() => {
    if (socketRef.current) return; // 🚫 prevent duplicates

    console.log("🔄 Connecting to CART WebSocket...");

    const socket = new WebSocket(CART_WS_URL);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("✅ Cart WebSocket CONNECTED!");
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("🛒 Cart WS message:", data);

        handlersRef.current.forEach((handler) => handler(data));
      } catch (err) {
        console.error("❌ Cart WS parse error:", err);
      }
    };

    socket.onclose = () => {
      console.log("🔌 Cart WebSocket disconnected");
      setIsConnected(false);
      socketRef.current = null;

      setTimeout(() => {
        console.log("🔄 Reconnecting Cart WebSocket...");
        initCartWebSocket();
      }, 3000);
    };

    socket.onerror = (err) => {
      console.error("❌ Cart WebSocket error:", err);
    };
  }, []);

  const sendCartEvent = useCallback((data) => {
    const socket = socketRef.current;
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(data));
      return true;
    }
    return false;
  }, []);

  const addCartMessageHandler = useCallback((handler) => {
    handlersRef.current.push(handler);

    return () => {
      handlersRef.current = handlersRef.current.filter(
        (h) => h !== handler
      );
    };
  }, []);

  useEffect(() => {
    initCartWebSocket();

    return () => {
      socketRef.current?.close();
    };
  }, [initCartWebSocket]);

  return (
    <CartWebSocketContext.Provider
      value={{
        isConnected,
        sendCartEvent,
        addCartMessageHandler,
      }}
    >
      {children}
    </CartWebSocketContext.Provider>
  );
};
