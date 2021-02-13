import React, { useRef, useEffect } from "react";
import { Socket, io } from "socket.io-client";

interface ISocketContext {
  socket: Socket | null;
}

const contextData: ISocketContext = {
  socket: null,
};

export const SocketConnectionContext = React.createContext(contextData);

const { Provider } = SocketConnectionContext;

const serverUrl = process.env.REACT_APP_SERVER_URL as string;
interface IProps {
  children: JSX.Element;
}

/**
 * Gives access to the socket if there is an established connection to the server.
 */
export function SocketConnectionProvider({ children }: IProps) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (socketRef.current === null) {
      socketRef.current = io(serverUrl, {
        withCredentials: true,
      });
    }
  }, []);

  return (
    <Provider
      value={{
        socket: socketRef.current,
      }}
    >
      {children}
    </Provider>
  );
}
