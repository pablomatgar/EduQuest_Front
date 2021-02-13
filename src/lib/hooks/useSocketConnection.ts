import { useContext } from "react";
import { SocketConnectionContext } from "../context/SocketConnectionContext";

export function useSocketConnection() {
  const context = useContext(SocketConnectionContext);
  return context;
}
