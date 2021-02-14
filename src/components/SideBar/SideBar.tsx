import React, { useState, useEffect} from 'react';
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

export function SideBar() {

    function ReadApi() {
        const [quests, setQuests] = useState<any[]>([]);

        useEffect(() => {
        fetch('http://localhost:8000/api/quests?take=10&skip=0')
        .then(response => {console.log(response)})
        .then(data => console.log(data))},[]);

        return <div>{quests.map((d) => {
            return (
                <Box as="button" w="100%" onClick={() => display(d)}>
                    <h1>{d.name}</h1><h2>{d.description}</h2><Divider />
                </Box>)
        })}
        </div>
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

    const [isDataSelected, setDataSelected] = useState(false);

    var dataSelected: {
        id: string,
        name: string;
        description: string;
        creatorId: string;
        roomId: string;
        reward: {
            description: string;
            points: string;
            type: string;
        };
    };

    //Estos datos se leen de la DB
    /*
    const data = [{
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
    */

    function close() {
        setOpened(false);
    }

    function open() {
        setOpened(true);
    }

    function changeStateMicrophone() {
        //Disable/enable microphone
        { microEnabled ? setMicroEnabled(false) : setMicroEnabled(true) }
    }

    function changeStateCamera() {
        //Disable/enable camera
        { camaraEnabled ? setCamaraEnabled(false) : setCamaraEnabled(true) }
    }

    function exitCall() {
        //Exit call
    }

    function showNotifications() {
        open(); //if user is student
    }

    function display(d: {
        id: string,
        name: string;
        description: string;
        creatorId: string;
        roomId: string;
        reward: {
            description: string;
            points: string;
            type: string;
        };
    }) {
        dataSelected = d;
        setDataSelected(true);
    }

    function printError() {
        return (
            <h1>No Quest Selected</h1>);
    }

    function printData() {
        return (
            <>
                <h1>Quest Name: {dataSelected.name}</h1>
                <h2>Description: {dataSelected.description}</h2>
                <h3>Room: {dataSelected.roomId}</h3>
                <h3>Creator: {dataSelected.creatorId}</h3>
                <Divider />
                <h2>Reward</h2>
                <h3>Description: {dataSelected.reward.description}</h3>
                <h3>Points: {dataSelected.reward.points}</h3>
                <h3>Type: {dataSelected.reward.type}</h3>
                <Button /*onClick="sendNotificationFinished()"*/>Mark as finished</Button>
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
                            <Grid p={0} m={0} bg="#3FDDD3" height="100%" alignItems="center" templateRows="repeat(5, 1fr)"
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
                                    {ReadApi}
                                </Center>
                            </GridItem>
                            <GridItem >
                                <Center>
                                    <div>
                                        {isDataSelected ? printData() : printError()}
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