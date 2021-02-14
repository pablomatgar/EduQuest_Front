import React, { useState, useEffect } from 'react';
import {
    Drawer,
    DrawerBody,
    useDisclosure,
    DrawerOverlay,
    DrawerContent,
    IconButton,
    Grid,
    Box,
    Center,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    GridItem,
    Divider,
    Button
} from "@chakra-ui/react";

import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa"
import { MdVideocam, MdVideocamOff } from "react-icons/md"
import { GrClose } from "react-icons/gr"
import { AiOutlineMenu } from "react-icons/ai"
import { BiDotsHorizontalRounded } from "react-icons/bi"
import FetchClient from '../../Utils/Interceptor/FetchClient';
import useQuest from "../../lib/hooks/useQuest"
import { Redirect } from 'react-router-dom';


export function SideBar() {

    //const {quests} = useQuest();


    function display(d) {
        setDataSelected(d);
    }

    /*
        const data : {
            id: string;
            name: string;
            description: string;
            creatorId: string;
            roomId: string;
            reward: {
                description: string;
                points: string;
                type: string;
            };
        }[]  = ReadApi();
    */
    //console.log(data);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [opened, setOpened] = useState(false);

    const [microEnabled, setMicroEnabled] = useState(false);

    const [camaraEnabled, setCamaraEnabled] = useState(false);

    const [dataSelected, setDataSelected] = useState([]);

    //Estos datos se leen de la DB
    
    const quests = [{
        "id": "11223344",
        "name": "Quest 1",
        "description": "This quest...",
        "creatorId": "123",
        "roomId": "123",
        "reward": {
            "description": "Amazing reward",
            "points": "10",
            "type": "Sth"
        }
    },
    {
        "id": "44332211",
        "name": "Quest 2",
        "description": "This another quest...",
        "creatorId": "321",
        "roomId": "321",
        "reward": {
            "description": "Cool reward",
            "points": "100",
            "type": "Sth else"
        }
    }];
    
    console.log(quests)
    function close() {
        setOpened(false);
    }

    function open() {
        setOpened(true);
    }

    function changeStateMicrophone() {
        //Disable/enable microphone
        //{ microEnabled ? MediaDevices.getUserMedia().getAudioTracks()[0].enabled = false : navigator.mediaDevices.getUserMedia({audio: true}) }
        { microEnabled ? setMicroEnabled(false) : setMicroEnabled(true) }
    }

    function changeStateCamera() {
        //Disable/enable camera
        //{ camaraEnabled ? navigator.mediaDevices.getUserMedia({video: false}) : navigator.mediaDevices.getUserMedia({video: true}) }
        { camaraEnabled ? setCamaraEnabled(false) : setCamaraEnabled(true) }
    }

    function exitCall() {
        //Exit call
        <Redirect to="/" />
    }

    function showNotifications() {
        open(); //if user is student
    }


    function printError() {
        return (
            <h1>No Quest Selected</h1>);
    }

    function printData() {
        return (
            <>
            {dataSelected != null  && dataSelected.reward != null ?<>
                <h1>Quest Id: {dataSelected.id}</h1>
                <h1>Quest Name: {dataSelected.name}</h1>
                <h2>Description: {dataSelected.description}</h2>
                <h3>Room: {dataSelected.roomId}</h3>
                <h3>Creator: {dataSelected.creatorId}</h3>
                <Divider />
                <h2>Reward</h2>
                <h3>Description: {dataSelected.reward.description}</h3>
                <h3>Points: {dataSelected.reward.points}</h3>
                <h3>Type: {dataSelected.reward.type}</h3>
                <Button /*onClick="sendNotificationFinished()"*/>Mark as finished</Button></>:
                <><h1>Quest Id: -</h1>
                <h1>Quest Name: -</h1>
                <h2>Description: -</h2>
                <h3>Room: -</h3>
                <h3>Creator: -</h3>
                <Divider />
                <h2>Reward</h2>
                <h3>Description: -</h3>
                <h3>Points: -</h3>
                <h3>Type: -</h3></>
            }
            </>
        );
    }

    return (
        <Box height="0">
            <IconButton
                m={20}
                colorScheme="teal"
                isRound
                aria-label="Open Sidebar"
                icon={<AiOutlineMenu />}
                size="lg"
                onClick={onOpen}
            />
            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay p={0} m={0}>
                    <DrawerContent p={0} m={0}>
                        <DrawerBody p={0} m={0}>
                            <Grid p={0} m={0} bg="teal" height="100%" alignItems="center" templateRows="repeat(5, 1fr)"
                                templateColumns="repeat(1, 1fr)">
                                <Box w="100%" h="20%">
                                    <Center>
                                        <IconButton
                                            onClick={onClose}
                                            colorScheme="blackAlpha"
                                            isRound
                                            aria-label="Close Sidebar"
                                            icon={<AiOutlineMenu />}
                                            size="lg"
                                        />
                                    </Center>
                                </Box>
                                <Box w="100%" h="20%">
                                    <Center>
                                        <IconButton
                                            onClick={showNotifications}
                                            colorScheme="yellow"
                                            isRound
                                            aria-label="Notifications"
                                            icon={<BiDotsHorizontalRounded />}
                                            size="lg"
                                        />
                                    </Center>
                                </Box>
                                <Box w="100%" h="20%">
                                    <Center>
                                        <IconButton
                                            onClick={changeStateMicrophone}
                                            colorScheme="blackAlpha"
                                            isRound
                                            aria-label={microEnabled ? "Disable Microphone" : "Enable Microphone"}
                                            icon={microEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}
                                            size="lg"
                                        />
                                    </Center>
                                </Box>
                                <Box w="100%" h="20%">
                                    <Center>
                                        <IconButton
                                            onClick={changeStateCamera}
                                            colorScheme="blackAlpha"
                                            isRound
                                            aria-label={camaraEnabled ? "Disable Camera" : "Enable Camera"}
                                            icon={camaraEnabled ? <MdVideocam /> : <MdVideocamOff />}
                                            size="lg"
                                        />
                                    </Center>
                                </Box>
                                <Box w="100%" h="20%">
                                    <Center>
                                        <IconButton
                                            onClick={exitCall}
                                            colorScheme="red"
                                            isRound
                                            aria-label="Exit call"
                                            icon={<GrClose />}
                                            size="lg"
                                        />
                                    </Center>
                                </Box>
                            </Grid>
                        </DrawerBody>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
            <Modal onClose={close} isOpen={opened} isCentered size="2xl">
                <ModalOverlay />
                <ModalContent bg="orange" >
                    <ModalHeader textAlign="center">Quest List</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Grid bg="orange"
                            templateColumns="repeat(2, 1fr)">
                            <GridItem w="50%">
                                <Center>
                                    {quests != null ? <div>{quests.map((d) => {
                                        return (
                                            <Box as="button" w="100%" onClick={() => display(d)}>
                                                <h1>{d.name}</h1><h2>{d.description}</h2><Divider />
                                            </Box>)
                                    })}
                                    </div>:<></>}
                                </Center>
                            </GridItem>
                            <GridItem w="50%">
                                <Center>
                                    <div>
                                        {dataSelected!=null ? printData() : printError()}
                                    </div>
                                </Center>
                            </GridItem>
                        </Grid>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
}