import React, { useRef, useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  Input,
  Button,
} from "@chakra-ui/react";
import socket from "../../../Utils/Socket/socket";

function FormNoti(caller) {
  const [selectValue, setSelectValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [descValue, setDescValue] = useState("");

  const data = {
    title: titleValue,
    description: descValue,
    type: selectValue,
    userType: "STUDENT",
    userToCall: caller,
  };

  function testNotification(e, data) {
    e.preventDefault();
    socket.emit("createNotification", {
      title: data.title,
      description: data.description,
      type: data.type,
      userType: data.userType,
      userToCall: data.caller,
    });

    console.log("We've emited the event ", data);
  }

  return (
    <FormControl>
      <FormLabel>Type of Notification</FormLabel>
      <Select
        placeholder="Select Notification"
        onChange={(e) => setSelectValue(e.target.value)}
      >
        <option>Quest</option>
        <option>Points</option>
        <option>Item</option>
      </Select>
      <Input
        placeholder="Título"
        onChange={(e) => setTitleValue(e.target.value)}
      />
      <Input
        placeholder="Descripcion"
        onChange={(e) => setDescValue(e.target.value)}
      />
      <Button onClick={(e) => testNotification(e, data)}>Send</Button>
    </FormControl>
  );
}

export default FormNoti;
