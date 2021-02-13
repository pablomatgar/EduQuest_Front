import React, { useRef } from "react";
import { Socket } from "socket.io-client";

interface ISocketContext {
  socket: Socket | null;
}

const contextData: ISocketContext = {
  socket: null,
};

export const SocketConnectionContext = React.createContext(contextData);

const { Provider } = SocketConnectionContext;

const serverUrl = process.env.REACT_APP_SERVER_URL;
interface IProps {
  children: JSX.Element;
}

/**
 * Gives access to the socket if there is an established connection to the server.
 */
export function SocketConnectionProvider({ children }: IProps) {
  const socketRef = useRef<Socket | null>(null);
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
