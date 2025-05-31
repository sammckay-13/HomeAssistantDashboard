// components/HomeAssistantSocket.tsx
"use client";

import { useEffect, useRef } from "react";

export const HomeAssistantSocket = () => {
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const connect = () => {
      ws.current = new WebSocket("ws://spoofstack.local:8123/api/websocket");

      ws.current.onopen = () => {
        console.log("WebSocket connected");

        // Send authentication
        ws.current?.send(
          JSON.stringify({
            type: "auth",
            access_token: process.env.HA_LL_TOKEN,
          })
        );
      };

      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Message from Home Assistant:", data);

        // After auth success, subscribe to state change events
        if (data.type === "auth_ok") {
          ws.current?.send(
            JSON.stringify({
              id: 1,
              type: "subscribe_events",
              event_type: "state_changed",
            })
          );
        }

        // Example: handle state updates
        if (data.type === "event" && data.event?.data?.entity_id) {
          const entityId = data.event.data.entity_id;
          const newState = data.event.data.new_state;
          console.log(`[${entityId}] is now:`, newState?.state);
        }
      };

      ws.current.onclose = () => {
        console.warn("WebSocket closed. Reconnecting in 5s...");
        setTimeout(connect, 5000); // Reconnect on disconnect
      };

      ws.current.onerror = (err) => {
        console.error("WebSocket error", err);
      };
    };

    connect();

    return () => {
      ws.current?.close();
    };
  }, []);

  return null; // Or return a UI component that uses this data
};