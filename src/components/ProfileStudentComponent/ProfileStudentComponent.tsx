import React from 'react'
import { Box, Button, Center, Flex, Square, Text } from "@chakra-ui/react"
import { Redirect } from 'react-router-dom'

export default function ProfileStudentComponent() {
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

                <Flex w="100%" justify="space-between">

                    {/*Profile picture*/}
                    <Square size="30vh" bg="#0C0F14" boxShadow="0px 0px 4px #66e3ff"
                        border="2px" borderColor="#66E3FF" borderRadius="15px">
                        <Center><Text>No picture available</Text></Center>
                    </Square>

                    {/*Student information*/}
                    <Box w="100%" h="30vh" ml="20px" bg="#0C0F14" boxShadow="0px 0px 4px #66e3ff"
                        border="2px" borderColor="#66E3FF" borderRadius="10px"
                        padding="10px 20px" fontSize="5vh">
                        <Text float="left" color="#66E3FF">NAME | John Doe</Text>
                        <Text float="right" >GRADE | 4</Text>
                        <br/>
                        <Text float="left">POINTS | 326</Text>
                        <Text float="right">LEVEL | 13</Text>
                        <br/>
                        <Text>EMAIL | johndoe@gmail.com</Text>
                    </Box>

                </Flex>
                
                <Flex w="100%" h="100%" justify="space-between" mt="20px">

                    {/*Classes*/}
                    <Box w="40%" bg="#0C0F14" boxShadow="0px 0px 4px #66e3ff"
                        border="2px" borderColor="#66E3FF" borderRadius="10px"
                        padding="10px 20px" fontSize="5vh">
                        <Text as="u" color="#66E3FF">CLASSES</Text>
                        <Text bg="#ffffff12" padding="5px">Math</Text>
                        <Text padding="5px">History II</Text>
                        <Text bg="#ffffff12" padding="5px">Physics C</Text>
                        <Text padding="5px">Writing Class</Text>
                    </Box>

                    {/*Quests*/}
                    <Box w="60%" ml="20px" bg="#0C0F14" boxShadow="0px 0px 4px #66e3ff"
                        border="2px" borderColor="#66E3FF" borderRadius="10px"
                        padding="10px 20px" fontSize="5vh">
                        <Text as="u" color="#66E3FF">QUESTS</Text>
                        <Text bg="#ffffff12" padding="5px">Complete 5 problems</Text>
                        <Text padding="5px">Discuss the reading material with a classmate</Text>
                        <Text bg="#ffffff12" padding="5px">Do the challenge problem</Text>
                        <Text padding="5px">Write a summary of the chapter</Text>
                    </Box>

                </Flex>

            </Flex>
        </Box>
    )
}
