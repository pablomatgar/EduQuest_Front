import React, { useState } from "react";
import {
    Drawer,
    DrawerBody,
    useDisclosure,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    IconButton,
    Grid,
    Box,
    Center
} from "@chakra-ui/react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa"
import { MdVideocam, MdVideocamOff } from "react-icons/md"
import { GrClose } from "react-icons/gr"
import { AiOutlineMenu } from "react-icons/ai"
import { BiDotsHorizontalRounded } from "react-icons/bi"

export function SideBar() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [microEnabled, setMicroEnabled] = useState(false);

    const [camaraEnabled, setCamaraEnabled] = useState(false);

    function changeStateMicrophone(){
        //Disable/enable microphone
        {microEnabled ? setMicroEnabled(false):setMicroEnabled(true)}
    }

    function changeStateCamera(){
        //Disable/enable camera
        {camaraEnabled ? setCamaraEnabled(false):setCamaraEnabled(true)}
    }

    function exitCall(){
        //Exit call
    }

    function showNotifications(){
        //Show notifications
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
                                        aria-label={microEnabled ? "Disable Microphone":"Enable Microphone"}
                                        icon={microEnabled ? <FaMicrophone />:<FaMicrophoneSlash />}
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
                                        aria-label={camaraEnabled ? "Disable Camera":"Enable Camera"}
                                        icon={camaraEnabled ? <MdVideocam />:<MdVideocamOff />}
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
        </Box>
    );
}