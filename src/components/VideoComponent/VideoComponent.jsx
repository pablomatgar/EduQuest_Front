import React from "react";
import { Box, Container, Flex } from "@chakra-ui/react";

export function VideoComponent({ stream, userVideo, partnerVideo }) {
  return (
    <Box bg="gray.100">
      {stream ? (
        <Flex
          h="100vh"
          direction="column"
          align="center"
          justify="space-evenly"
        >
          <Flex
            h="50vh"
            direction="column"
            justify="space-between"
            bg="green.100"
            border="4px"
            borderColor="gray.900"
            borderRadius="15px"
            centerContent
          >
            <video playsInline ref={partnerVideo} autoPlay />;
            <Box bg="green.300">Teacher</Box>
          </Flex>
          <Flex
            h="30vh"
            direction="column"
            justify="space-between"
            bg="red.100"
            border="4px"
            borderColor="gray.900"
            borderRadius="15px"
            centerContent
          >
            <video playsInline muted ref={userVideo} autoPlay />;
            <Box bg="red.300">Student</Box>
          </Flex>
        </Flex>
      ) : (
        <></>
      )}
    </Box>
  );
}
