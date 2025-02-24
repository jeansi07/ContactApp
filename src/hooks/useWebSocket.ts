import { useEffect, useState } from "react";

const useWebSocket = <T>(url: string) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string | null>(null);
  const [currentSocket, setCurrentSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const socket = new WebSocket(url);
    console.log("socket");

    socket.onopen = () => {
      console.log("socket open");

      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      console.log("event", event);

      setData(JSON.parse(event.data));
    };

    socket.onerror = (event) => {
      setError("WebSocket error");
    };

    socket.onclose = () => {
      setIsConnected(false);
    };

    setCurrentSocket(socket);
    return () => {
      socket.close();
    };
  }, [url]);

  return { data, error, isConnected, currentSocket };
};

export default useWebSocket;
