import React from 'react'
import { Box, Button, Flex, Square, Text } from "@chakra-ui/react"

export default function ProfileTeacherComponent() {
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

                <Flex w="100%" h="100%" justify="space-between">
                
                    <Flex w="30%" direction="column" align="center" mr="20px">
                        
                        {/*Profile picture*/}
                        <Square size="15vw" mb="20px" bg="#515151" boxShadow="0px 0px 4px #ddffb2"
                            border="2px" borderColor="#7EFF7B" borderRadius="15px">
                            :)
                        </Square>

                        {/*Teacher information*/}
                        <Box w="100%" h="100%" bg="#071609" boxShadow="0px 0px 4px #7EFF7B"
                            border="2px" borderColor="#7EFF7B" borderRadius="15px"
                            padding="10px 20px" fontSize="4vh">
                            <Text color="#7EFF7B">NAME | Teacher Name</Text>
                            <br/>
                            <Text as="u" color="#7EFF7B">EMAIL</Text>
                            <Text>teacher@teacher.edu</Text>
                            <br/>
                            <Text as="u" color="#7EFF7B">CLASSES</Text>
                            <Text>Teacher's classes go here</Text>
                        </Box>

                    </Flex>
                
                    {/*Students*/}
                    <Box w="35%" h="100%" mr="20px" bg="#071609" boxShadow="0px 0px 4px #7EFF7B"
                            border="2px" borderColor="#7EFF7B" borderRadius="15px"
                            padding="10px 20px" fontSize="5vh">
                        <Text as="u" color="#7EFF7B">STUDENTS</Text>
                        <Text>Teacher's students go here</Text>
                    </Box>
                
                    {/*Quests*/}
                    <Box w="35%" h="100%" bg="#071609" boxShadow="0px 0px 4px #7EFF7B"
                            border="2px" borderColor="#7EFF7B" borderRadius="15px"
                            padding="10px 20px" fontSize="5vh">
                        <Text as="u" color="#7EFF7B">QUESTS</Text>
                        <Text>Teacher's quests go here</Text>
                    </Box>

                </Flex>

            </Flex>
        </Box>
    )
}
