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

function FormNoti({ caller }) {
  const [selectValue, setSelectValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [descValue, setDescValue] = useState("");
  const [rewardValue, setReward] = useState("");
  const [pointsValue, setPoints] = useState(0);
  const [itemValue, setItem] = useState("");

  const data = {
    title: titleValue,
    description: descValue,
    type: selectValue,
    userType: "STUDENT",
    reward: rewardValue,
    points: pointsValue,
    item: itemValue,
  };

  function testNotification(data) {
    socket.emit("createNotification", {
      title: data.title,
      description: data.description,
      type: data.type,
      userType: data.userType,
      userToCall: caller,
      reward: data.reward,
      points: data.points,
      item: data.item,
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

      {selectValue == "Quest" ? (
        <div>
          <Input
            placeholder="Título"
            onChange={(e) => setTitleValue(e.target.value)}
          />
          <Input
            placeholder="Descripcion"
            onChange={(e) => setDescValue(e.target.value)}
          />
          <Select
            placeholder="Select Reward"
            onChange={(e) => setReward(e.target.value)}
          >
            <option>Points</option>
            <option>Item</option>
          </Select>
        </div>
      ) : (
        <></>
      )}
      {rewardValue == "Points" || selectValue == "Points" ? (
        <Input
          placeholder="Amount"
          onChange={(e) => setPoints(e.target.value)}
        />
      ) : (
        <></>
      )}
      {rewardValue == "Item" || selectValue == "Item" ? (
        <Input
          placeholder="Name of the Item"
          onChange={(e) => setItem(e.target.value)}
        />
      ) : (
        <></>
      )}
      <Button onClick={() => testNotification(data)}>Send</Button>
    </FormControl>
  );
}

export default FormNoti;
