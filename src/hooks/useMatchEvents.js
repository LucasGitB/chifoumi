import { useEffect, useCallback, useRef } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";

/**
 *
 * @param {string} matchId
 * @param {Object} eventHandlers
 * @param {(event: Object) => void} eventHandlers.onPlayer1Join
 * @param {(event: Object) => void} eventHandlers.onPlayer2Join
 * @param {(event: Object) => void} eventHandlers.onNewTurn
 * @param {(event: Object) => void} eventHandlers.onPlayer1Move
 * @param {(event: Object) => void} eventHandlers.onPlayer2Move
 * @param {(event: Object) => void} eventHandlers.onTurnEnded
 * @param {(event: Object) => void} eventHandlers.onMatchEnded
 * @param {(error: Object) => void} eventHandlers.onError
 * @returns
 */
export const useMatchEvents = (
  matchId,
  {
    onPlayer1Join = () => {},
    onPlayer2Join = () => {},
    onNewTurn = () => {},
    onPlayer1Move = () => {},
    onPlayer2Move = () => {},
    onTurnEnded = () => {},
    onMatchEnded = () => {},
    onError = () => {},
  }
) => {
  const handleEvent = useCallback(
    (event) => {
      switch (event.type) {
        case "PLAYER1_JOIN":
          onPlayer1Join(event.payload);
          break;
        case "PLAYER2_JOIN":
          onPlayer2Join(event.payload);
          break;
        case "NEW_TURN":
          onNewTurn(event.payload);
          break;
        case "PLAYER1_MOVED":
          onPlayer1Move(event.payload);
          break;
        case "PLAYER2_MOVED":
          onPlayer2Move(event.payload);
          break;
        case "TURN_ENDED":
          onTurnEnded(event.payload);
          break;
        case "MATCH_ENDED":
          onMatchEnded(event.payload);
          break;
        default:
          onError(new Error(`Unknown event type: ${event.type}`));
          break;
      }
    },
    [
      onError,
      onMatchEnded,
      onNewTurn,
      onPlayer1Join,
      onPlayer1Move,
      onPlayer2Join,
      onPlayer2Move,
      onTurnEnded,
    ]
  );

  const eventSourceRef = useRef(null);

  useEffect(() => {
    if (!matchId) return;

    const eventSource = new EventSourcePolyfill(
      `${import.meta.env.VITE_API_URL}/matches/${matchId}/subscribe`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "text/event-stream",
        },
      }
    );

    eventSource.onmessage = (event) => {
      const parsedEvents = JSON.parse(event.data);
      if (Array.isArray(parsedEvents)) {
        parsedEvents.forEach(handleEvent);
      } else {
        handleEvent(parsedEvents);
      }
    };
    return () => {
      eventSource.close();
    };
  }, []);
};
