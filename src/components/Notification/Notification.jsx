import React, { useRef, useState, useEffect } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";

import useNotification from "../../lib/hooks/useNotification";

const MyAlert = () => {
  const [status, setStatus] = useState("success");
  const [title, setTitle] = useState("Notification!");
  const [close, setClose] = useState(false);
  const { data } = useNotification();

  useEffect(() => {
    console.log("Configurando notificacion");
    setClose(false);
    switch (data.type) {
      case "Quest":
        console.log("La notificación es un quest!");
        setStatus("info");
        setTitle("New quest!");
        break;

      case "Quest completed":
        console.log("La notificación es un quest completado");
        setStatus("success");
        setTitle(`Quest completed by: ${data.user}`);
        break;

      case "Item":
        console.log("La notificación es un item!");
        setStatus("success");
        setTitle(`You have a new item!: ${data.item}`);
        break;

      case "Points":
        console.log("La notificación es un Points!");
        setStatus("success");
        setTitle(`You've gained points!: ${data.points}`);
        break;

      default:
        console.log("No logramos identificar la notificación", data.type);
        break;
    }
  }, [data]);

  return (
    <div>
      {close ? (
        <></>
      ) : (
        <Alert status={status}>
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
  return (
    <>
      <div>
        <MyAlert />
      </div>
    </>
  );
}

export default Notification;
