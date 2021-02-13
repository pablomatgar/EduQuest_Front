import React, { useState, useRef, useEffect } from "react";
import { SideBar } from "../../components/SideBar/SideBar";
import { VideoComponent } from "../../components/VideoComponent/VideoComponent";
import { useSocketConnection } from "../../lib/hooks/useSocketConnection";
import Peer from "simple-peer";

export function GeneralVideoComponent() {
  const [yourID, setYourID] = useState(""); //Id of the user
  const [users, setUsers] = useState({}); //Object what will store all users in the room
  const [stream, setStream] = useState(); //Steaming object (Video for example)
  const [receivingCall, setReceivingCall] = useState(false); //Boolean that allows us to know if the user recieved a call
  const [caller, setCaller] = useState(""); //User that call you
  const [callerSignal, setCallerSignal] = useState(); //Signal of the caller
  const [callAccepted, setCallAccepted] = useState(false); //Boolean that shows if the user accepted the call

  const { socket } = useSocketConnection();

  const userVideo = useRef(); //Reference for the video
  const partnerVideo = useRef(); //Reference for the video od the other user

  useEffect(() => {
    if (socket == null) return;

    socket.on("yourID", (id) => {
      //We suscribe to the event "yourID"
      setYourID(id); //If the event is called (from server) we're going to update the state of the id of the user
    });
    socket.on("allUsers", (users) => {
      //We suscribe to the event "allUsers"
      console.log("Tenemos los valores de los usuarios");
      setUsers(users); //We update the users
    });

    socket.on("hey", (data) => {
      //We suscribe to the event "hey"
      console.log("Estamos actualizando 'Receiving Call'");
      setReceivingCall(true); //We set that we have a receiving call
      setCaller(data.from); //We set who is the caller
      setCallerSignal(data.signal); //We set the caller signal
    });
  }, []);

  function callPeer(id) {
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
      console.log("Lanzando una señal desde el peer");
      socket.emit("callUser", {
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

    console.log("Recibió la llamada?: ", receivingCall);

    socket.on("callAccepted", (signal) => {
      //We suscribe to the event "callAccepted"
      console.log("La señal fue aceptada");
      setCallAccepted(true); //We set that the call is accepted
      peer.signal(signal); //We send a signal
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
      socket.emit("acceptCall", { signal: data, to: caller });
    });

    //We suscribe to the stream
    peer.on("stream", (stream) => {
      partnerVideo.current.srcObject = stream;
    });

    //We send a signal (With the caller signal)
    peer.signal(callerSignal);
  }

  return (
    <>
      <SideBar />
      <VideoComponent />
    </>
  );
}
