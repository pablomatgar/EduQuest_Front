import React from 'react'
import { Box, Button, Center, Flex, Square, Text } from "@chakra-ui/react"
import { Redirect } from 'react-router-dom'

export default function ProfileTeacherComponent() {
    return (
        <Box w="100vw" h="100vh" padding="20px"
            bgGradient="radial(#181f33, #101625)" color="white">
            <Flex w="100%" h="100%" direction="column" justify="space-between">

                {/*Back button*/}
                <Button width="60px" mb="20px" lineHeight="1.5"
                    border="2px" borderColor="#ff48b6" borderRadius="10px"
                    boxShadow="0px 0px 4px #ff48b6"
                    bg="#570044" _hover={{bg: "#570044"}}  _active={{bg: "#2d0023"}} 
                    onClick={() => (<Redirect to="/videoRoom" />)}>
                    Back
                </Button>

                <Flex w="100%" h="100%" justify="space-between">
                
                    <Flex w="30%" direction="column" align="center" mr="20px">
                        
                        {/*Profile picture*/}
                        <Square size="15vw" mb="20px" bg="#071609" boxShadow="0px 0px 4px #ddffb2"
                            border="2px" borderColor="#7EFF7B" borderRadius="15px">
                            <Center><Text>No Picture Available</Text></Center>
                        </Square>

                        {/*Teacher information*/}
                        <Box w="100%" h="100%" bg="#071609" boxShadow="0px 0px 4px #7EFF7B"
                            border="2px" borderColor="#7EFF7B" borderRadius="15px"
                            padding="10px 20px" fontSize="4vh">
                            <Text color="#7EFF7B">NAME | Jane Smith</Text>
                            <br/>
                            <Text as="u" color="#7EFF7B">EMAIL</Text>
                            <Text>jsmith@outlook.com</Text>
                            <br/>
                            <Text as="u" color="#7EFF7B">CLASSES</Text>
                            <Text bg="#ffffff12" padding="5px">History I</Text>
                            <Text padding="5px">History II</Text>
                        </Box>

                    </Flex>
                
                    {/*Students*/}
                    <Box w="35%" h="100%" mr="20px" bg="#071609" boxShadow="0px 0px 4px #7EFF7B"
                            border="2px" borderColor="#7EFF7B" borderRadius="15px"
                            padding="10px 20px" fontSize="5vh">
                        <Text as="u" color="#7EFF7B">STUDENTS</Text>
                        <Text bg="#ffffff12" padding="5px">Bob Adams</Text>
                            <Text padding="5px">Mary Burke</Text>
                            <Text bg="#ffffff12" padding="5px">James Collins</Text>
                            <Text padding="5px">John Doe</Text>
                            <Text bg="#ffffff12" padding="5px">Susan Evans</Text>
                            <Text padding="5px">Emma Flynn</Text>
                    </Box>
                
                    {/*Quests*/}
                    <Box w="35%" h="100%" bg="#071609" boxShadow="0px 0px 4px #7EFF7B"
                            border="2px" borderColor="#7EFF7B" borderRadius="15px"
                            padding="10px 20px" fontSize="4.5vh">
                        <Text as="u" color="#7EFF7B" fontSize="5vh">QUESTS</Text>
                        <Text bg="#ffffff12" padding="5px">Discuss the reading material with a classmate</Text>
                        <Text padding="5px">Write about a section</Text>
                        <Text bg="#ffffff12"padding="5px">Ask a question</Text>
                        <Text padding="5px">Write three facts about this figure</Text>
                        <Text bg="#ffffff12"padding="5px">Write three facts about this event</Text>
                    </Box>

                </Flex>

            </Flex>
        </Box>
    )
}
