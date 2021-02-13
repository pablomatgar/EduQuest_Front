import React, { useRef } from "react";
import { Socket } from "socket.io-client";

interface IContextData {
  socket: Socket | null;
}

const contextData: IContextData = {
  socket: null,
};

export const SocketConnectionContext = React.createContext(contextData);

const { Provider } = SocketConnectionContext;

interface IProps {
  children: JSX.Element;
}

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
