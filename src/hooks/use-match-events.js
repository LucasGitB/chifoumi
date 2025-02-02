import { useEffect, useRef } from "react";
import { EventSourcePolyfill as EventSource } from "event-source-polyfill";

export const useMatchEvents = (matchId, onEvent) => {
  const eventSourceRef = useRef(null);

  useEffect(() => {
    if (!eventSourceRef.current) {
      eventSourceRef.current = new EventSource(
        `http://localhost:3002/matches/${matchId}/subscribe`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      eventSourceRef.current.addEventListener("message", (event) => {
        const data = JSON.parse(event.data);
        onEvent(data);
      });
    }

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, [matchId, onEvent]);
};
