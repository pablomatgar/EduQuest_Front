import React, { useState, useRef, useEffect } from "react";
import { SideBar } from "../../components/SideBar/SideBar";
import { VideoComponent } from "../../components/VideoComponent/VideoComponent";
import socket from "../../Utils/Socket/socket";
import {
  Grid,
  GridItem,
  Flex,
  Container,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";

import Peer from "simple-peer";
import FormNoti from "./FormNotification/FormNoti";
import { useUser } from "../../lib/context/UserProfileContext";

export function GeneralVideoComponent() {
  const [yourID, setYourID] = useState(""); //Id of the user
  const [users, setUsers] = useState({}); //Object what will store all users in the room
  const [stream, setStream] = useState(); //Steaming object (Video for example)
  const [receivingCall, setReceivingCall] = useState(false); //Boolean that allows us to know if the user recieved a call
  const [caller, setCaller] = useState(""); //User that call you
  const [callerSignal, setCallerSignal] = useState(); //Signal of the caller
  const [callAccepted, setCallAccepted] = useState(false); //Boolean that shows if the user accepted the call

  const userVideo = useRef(); //Reference for the video
  const partnerVideo = useRef(); //Reference for the video od the other user
  const socketRef = useRef();

  const [user] = useUser();
  let { name, points, level, quest, type } = user.user;

  function testNotification(data) {
    socketRef.current.emit("createNotification", {
      title: data.title,
      description: data.description,
      type: data.type,
      userType: data.userType,
      userToCall: caller,
    });
  }

  useEffect(() => {
    console.log("Tipo de usuario: ", type);
    socketRef.current = socket;

    navigator.mediaDevices //Acces to the navigator media
      .getUserMedia({ video: true, audio: true }) //We obtain the video and audio
      .then((stream) => {
        //After the user has accepted the credentials..
        setStream(stream); //We update the stream state
        if (userVideo.current) {
          //If our user (us) has video...
          userVideo.current.srcObject = stream; //We stablished that the src is going to be the stream
        }
      });

    socketRef.current.on("yourID", (id) => {
      console.log("I've recieved my id!");
      //We suscribe to the event "yourID"
      setYourID(id); //If the event is called (from server) we're going to update the state of the id of the user
    });

    socketRef.current.on("notification", (data) => {
      console.log("I've recieved a NOTIFICATION");
    });

    socketRef.current.on("allUsers", (users) => {
      //We suscribe to the event "allUsers"
      console.log("I've recieved all users ", users);
      setUsers(users); //We update the users
    });

    socketRef.current.on("hey", (data) => {
      //We suscribe to the event "hey"
      console.log("I'm receiving a call");
      setReceivingCall(true); //We set that we have a receiving call
      setCaller(data.from); //We set who is the caller
      setCallerSignal(data.signal); //We set the caller signal
    });
  }, []);

  function callPeer(id) {
    setCaller(id);
    //Function that runs when the user wants to connect to a another user
    const peer = new Peer({
      //We create a peer (us)
      initiator: true, //We are the initiator
      trickle: false,
      stream: stream,
    });

    console.log("Hemos llamado y creado al peer", peer);

    peer.on("signal", (data) => {
      //When we recieve a "signal"
      console.log("Lanzando una se??al desde el peer");
      socketRef.current.emit("callUser", {
        //We emmit an event (callUser) passing the id, the data and our id
        userToCall: id,
        signalData: data,
        from: yourID,
      });
    });

    peer.on("stream", (stream) => {
      //When we recieve a "stream"
      console.log("Hemos creado el stream");
      if (partnerVideo.current) {
        //If the user has video
        partnerVideo.current.srcObject = stream; //We relate the current video with the stream that was passed to us
      }
    });

    console.log("Recibi?? la llamada?: ", receivingCall);

    socketRef.current.on("callAccepted", (data) => {
      //We suscribe to the event "callAccepted"
      console.log("La se??al fue aceptada");

      setCallAccepted(true); //We set that the call is accepted
      peer.signal(data.signal); //We send a signal
    });
  }

  //Function that runs when the user accept the call
  function acceptCall() {
    //We update our state
    setCallAccepted(true);
    const peer = new Peer({
      //We create a peer
      initiator: false, //We are not the ones who are establishing the call
      trickle: false,
      stream: stream,
    });

    //We suscribe to the signal
    peer.on("signal", (data) => {
      //We emit "acceptCall" to the other user
      socketRef.current.emit("acceptCall", { signal: data, to: caller });
    });

    //We suscribe to the stream
    peer.on("stream", (stream) => {
      partnerVideo.current.srcObject = stream;
    });

    //We send a signal (With the caller signal)
    peer.signal(callerSignal);
  }

  let incomingCall; //Variable that will store the notification when an user send request for call
  if (receivingCall) {
    //if there is a recieving call
    incomingCall = ( //We render the notification
      <Alert status="info">
        <AlertIcon />
        <AlertTitle mr={2}>{}</AlertTitle>
        <AlertDescription>{caller} is calling you!</AlertDescription>
        <Button onClick={acceptCall}>Accept</Button>
        <CloseButton position="absolute" right="8px" top="8px" />
      </Alert>
    );
  }

  return (
    <>
      <Flex direction="row" align="center">
        <Container>
          {Object.keys(users).map((key) => {
            if (key === yourID) {
              return null;
            }
            return (
              <Button onClick={() => callPeer(key)}>Call user! {key}</Button>
            );
          })}
        </Container>
      </Flex>

      <Container>{incomingCall}</Container>
      <SideBar />

      <VideoComponent
        userVideo={userVideo}
        partnerVideo={partnerVideo}
        stream={stream}
        callAccepted={callAccepted}
      />

      {type == "STUDENT" || !callAccepted ? (
        <></>
      ) : (
        <Container style={{ width: "100vw" }}>
          <FormNoti caller={caller} />
        </Container>
      )}
    </>
  );
}
