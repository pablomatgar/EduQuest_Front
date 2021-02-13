import React from 'react'
import { Box, Container, Flex } from "@chakra-ui/react";

export function VideoComponent() {
    return (
        <Box bg="gray.100">
            
            <Flex h="100vh" 
                direction="column" align="center" justify="space-evenly">

                {/*
                Note: the video components go inside the Boxes.
                */}

                <Flex h="50vh" direction="column" justify="space-between"
                    bg="green.100" 
                    border="4px" borderColor="gray.900" borderRadius="15px" 
                    centerContent>
                    <video></video>
                    <Box bg="green.300">Teacher</Box>
                </Flex>

                <Flex h="30vh" direction="column" justify="space-between"
                    bg="red.100" 
                    border="4px" borderColor="gray.900" borderRadius="15px" 
                    centerContent>
                    <video></video>
                    <Box bg="red.300">Student</Box>
                </Flex>

            </Flex>
            
        </Box>
        
    )
}