import React from 'react'
import { Box, Button, Flex, Square, Text } from "@chakra-ui/react"

export default function ProfileStudentComponent() {
    return (
        <Box w="100vw" h="100vh" padding="20px" 
            bgGradient="radial(#181f33, #101625)" color="white">
            <Flex w="100%" h="100%" direction="column" justify="space-between">
                
                {/*Back button*/}
                <Button width="60px" mb="20px" lineHeight="1.5"
                    border="2px" borderColor="#ff48b6" borderRadius="10px"
                    boxShadow="0px 0px 4px #ff48b6"
                    bg="#570044" _hover={{bg: "#570044"}}  _active={{bg: "#2d0023"}}>
                    Back
                </Button>

                <Flex w="100%" justify="space-between">

                    {/*Profile picture*/}
                    <Square size="30vh" bg="#515151" boxShadow="0px 0px 4px #66e3ff"
                        border="2px" borderColor="#66E3FF" borderRadius="15px">
                        :)
                    </Square>

                    {/*Student information*/}
                    <Box w="100%" h="30vh" ml="20px" bg="#0C0F14" boxShadow="0px 0px 4px #66e3ff"
                        border="2px" borderColor="#66E3FF" borderRadius="10px"
                        padding="10px 20px" fontSize="5vh">
                        <Text float="left" color="#66E3FF">NAME | Student Name</Text>
                        <Text float="right" >GRADE | #</Text>
                        <br/>
                        <Text float="left">POINTS | ####</Text>
                        <Text float="right">LEVEL | #</Text>
                        <br/>
                        <Text>EMAIL | student@student.edu</Text>
                    </Box>
                    
                </Flex>
                
                <Flex w="100%" h="100%" justify="space-between" mt="20px">

                    {/*Classes*/}
                    <Box w="40%" bg="#0C0F14" boxShadow="0px 0px 4px #66e3ff"
                        border="2px" borderColor="#66E3FF" borderRadius="10px"
                        padding="10px 20px" fontSize="5vh">
                        <Text as="u" color="#66E3FF">CLASSES</Text>
                        <Text>Student's classes go here</Text>
                    </Box>

                    {/*Quests*/}
                    <Box w="60%" ml="20px" bg="#0C0F14" boxShadow="0px 0px 4px #66e3ff"
                        border="2px" borderColor="#66E3FF" borderRadius="10px"
                        padding="10px 20px" fontSize="5vh">
                        <Text as="u" color="#66E3FF">QUESTS</Text>
                        <Text>Student's quests go here</Text>
                    </Box>

                </Flex>

            </Flex>
        </Box>
    )
}
