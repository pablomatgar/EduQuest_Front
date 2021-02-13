import React, { useRef, useState, useEffect } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";

import io from "socket.io-client";
import { useAuth } from "../../Utils/Auth/index";

const MyAlert = (data) => {
  const [status, setStatus] = useState("success");
  const [title, setTitle] = useState("Notification!");
  const [close, setClose] = useState(false);

  useEffect(() => {
    setClose(false);
    switch (data.type) {
      case "Quest":
        setStatus("info");
        setTitle("New quest!");
        break;

      case "Quest completed":
        setStatus("succes");
        setTitle(`Quest completed by: ${data.user}`);
        break;

      default:
        break;
    }
  }, []);

  return (
    <div>
      {close ? (
        <></>
      ) : (
        <Alert
          status={status}
          style={{ maxWidth: "30vw", justifyContent: "center" }}
        >
          <AlertIcon />
          <AlertTitle mr={2}>{title}</AlertTitle>
          <AlertDescription>{data.description}</AlertDescription>
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={() => setClose(true)}
          />
        </Alert>
      )}
    </div>
  );
};

function Notification() {
  const [data, setData] = useState({ name: "", description: "" });
  const { currentProfile } = useAuth();

  const socket = useRef();

  useEffect(() => {
    socket.current = io.connect("http://localhost:8000/", {
      withCredentials: true,
    });

    socket.current.on("notification", (data) => {
      //Debería cambiarlo por currentProfile[type] (?) - No recuerdo lel
      if (currentProfile.type == data.userType) {
        setData(data);
      }
    });
  }, []);

  return <MyAlert data={data} />;
}

export default Notification;
