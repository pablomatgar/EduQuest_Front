import React from "react";
import { useEffect, useRef, useState } from "react";
import socket from "../../Utils/Socket/socket";

function useNotification() {
  const [data, setData] = useState({ title: "", description: "" });
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socket;

    socketRef.current.on("notification", (data) => {
      console.log("We've detected the event", data);

      //Debería cambiarlo por currentProfile[type] (?) - No recuerdo (?)
      if ("STUDENT" == data.userType) {
        console.log("We've updated the data", data);
        setData(data);
      }

      return () => {
        socketRef.current.disconnect();
      };
    });
  }, []);

  return { data };
}

export default useNotification;
