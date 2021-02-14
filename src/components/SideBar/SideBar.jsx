import React, { useState, useEffect } from 'react';
import {
    Drawer,
    DrawerBody,
    useDisclosure,
    DrawerOverlay,
    DrawerContent,
    IconButton,
    Grid,
    Heading,
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
import { ImUser } from "react-icons/im"
import { GrClose } from "react-icons/gr"
import { AiOutlineMenu } from "react-icons/ai"
import { BiDotsHorizontalRounded } from "react-icons/bi"
import FetchClient from '../../Utils/Interceptor/FetchClient';
import useQuest from "../../lib/hooks/useQuest"
import { Redirect } from 'react-router-dom';
import { useUser } from "../../lib/context/UserProfileContext";


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

    const [success, setSuccess] = useState(false);

    const [user] = useUser();

    let { name, points, level, quest, type } = user.user;


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
        return (<Redirect to="/" />);
    }

    function openProfile() {
        //Open profile
        if(type == "STUDENT"){
            return (<Redirect to="/profile" />); 
        }
        else{
            return (<Redirect to="/profileTeacher" />); 
        }
    }

    function showNotifications() {
        if(type == "STUDENT"){
            open(); 
        }
    }


    function printError() {
        return (
            <Heading as="h1" size="lg">No Quest Selected</Heading>);
    }

    function printData() {
        return (
            <>
                {dataSelected != null && dataSelected.reward != null ? <><br></br>
                    <Heading as="h1" size="lg">Quest Name: {dataSelected.name}</Heading><br></br>
                    <Heading as="h4" size="md">Description: {dataSelected.description}</Heading>
                    <Heading as="h5" size="sm">Room: {dataSelected.roomId}</Heading>
                    <Heading as="h5" size="sm">Creator: {dataSelected.creatorId}</Heading><br></br>
                    <Divider /><br></br>
                    <Heading as="h4" size="md">Reward</Heading>
                    <Heading as="h5" size="sm">Description: {dataSelected.reward.description}</Heading>
                    <Heading as="h5" size="sm">Points: {dataSelected.reward.points}</Heading>
                    <Heading as="h5" size="sm">Type: {dataSelected.reward.type}</Heading><br></br>
                    <Button /*onClick="sendNotificationFinished()"*/>Mark as finished</Button><br></br><br></br></> :
                    <>{printError()}</>
                }
            </>
        );
    }

    return (
        <Box height="0">
            <IconButton
                mt={10} ml={10}
                bg="#3FDDD3"
                colorScheme="teal"
                color="black"
                isRound
                aria-label="Open Sidebar"
                icon={<AiOutlineMenu />}
                w="10vh" h="10vh"
                onClick={onOpen}
            />
            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay p={0} m={0}>
                    <DrawerContent p={0} m={0} bg="#00000000">
                        <DrawerBody p={0} m={0} borderRadius="0px 30px 30px 0px" w="10vw">
                            <Grid p={0} m={0} bg="#3FDDD3" height="100%" alignItems="center" templateRows="repeat(6, 1fr)"
                                templateColumns="repeat(1, 1fr)">
                                <Box w="100%" h="50%">
                                    <Center>
                                        <IconButton
                                            onClick={onClose}
                                            colorScheme="blackAlpha"
                                            color="black"
                                            isRound
                                            aria-label="Close Sidebar"
                                            icon={<AiOutlineMenu />}
                                            w="10vh"
                                            h="10vh"
                                        />
                                    </Center>
                                </Box>
                                <Box w="100%" h="50%">
                                    <Center>
                                        <IconButton
                                            onClick={showNotifications}
                                            bg="#FFE48670"
                                            colorScheme="yellow"
                                            color="#644E00"
                                            border="4px"
                                            borderColor="#FFE486"
                                            isRound
                                            aria-label="Notifications"
                                            icon={<BiDotsHorizontalRounded />}
                                            w="10vh"
                                            h="10vh"
                                        />
                                    </Center>
                                </Box>
                                <Box w="100%" h="50%">
                                    <Center>
                                        <IconButton
                                            onClick={changeStateMicrophone}
                                            colorScheme="blackAlpha"
                                            color="black"
                                            border="4px"
                                            borderColor="black"
                                            isRound
                                            aria-label={microEnabled ? "Disable Microphone" : "Enable Microphone"}
                                            icon={microEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}
                                            w="10vh"
                                            h="10vh"
                                        />
                                    </Center>
                                </Box>
                                <Box w="100%" h="50%">
                                    <Center>
                                        <IconButton
                                            onClick={changeStateCamera}
                                            colorScheme="blackAlpha"
                                            color="black"
                                            border="4px"
                                            borderColor="black"
                                            isRound
                                            aria-label={camaraEnabled ? "Disable Camera" : "Enable Camera"}
                                            icon={camaraEnabled ? <MdVideocam /> : <MdVideocamOff />}
                                            w="10vh"
                                            h="10vh"
                                        />
                                    </Center>
                                </Box>
                                <Box w="100%" h="50%">
                                    <Center>
                                        <IconButton
                                            onClick={openProfile}
                                            colorScheme="whiteAlpha"
                                            color="black"
                                            border="4px"
                                            borderColor="white"
                                            isRound
                                            aria-label={camaraEnabled ? "Disable Camera" : "Enable Camera"}
                                            icon={<ImUser />}
                                            w="10vh"
                                            h="10vh"
                                        />
                                    </Center>
                                </Box>
                                <Box w="100%" h="50%">
                                    <Center>
                                        <IconButton
                                            onClick={exitCall}
                                            bg="#EB000070"
                                            colorScheme="red"
                                            color="#EB0000"
                                            border="4px"
                                            borderColor="#EB0000"
                                            isRound
                                            aria-label="Exit call"
                                            icon={<GrClose />}
                                            w="10vh"
                                            h="10vh"
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
                <ModalContent bg="gray.700" border="2px" borderColor="#3FDDD3" color="white">
                    <ModalHeader textAlign="center">Quest List</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Grid bg="#3FDDD3" color="black"
                            templateColumns="repeat(2, 1fr)">
                            <GridItem w="50%">
                                <Center>
                                    {quests != null ? <div>{quests.map((d) => {
                                        return (
                                            <Box as="button" w="100%" onClick={() => display(d)}>
                                                <br></br><Heading as="Heading" size="lg">{d.name}</Heading><Heading as="h4" size="md">{d.description}</Heading><br></br><Divider />
                                            </Box>)
                                    })}</div> : <></>}
                                </Center>
                            </GridItem>
                            <GridItem >
                                <Center>
                                    <div>
                                        {dataSelected != null ? printData() : <></>}
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