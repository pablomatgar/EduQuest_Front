import React from "react";
import {
  Box,
  Container,
  Flex,
  Badge,
  StarIcon,
  Button,
} from "@chakra-ui/react";
import { useUser } from "../../lib/context/UserProfileContext";
import Notification from "../../components/Notification/Notification";
import socket from "../../Utils/Socket/socket";

const VideoBox = ({ video, student }) => {
  const [user] = useUser();
  let { name, points, level, quest, type } = user.user;

  const propertyStudent = {
    level: level,
    points: points,
    name: name,
    quest: quest,
    motto: "Journey Before Destination",
  };

  function testNotification(e) {
    e.preventDefault();
    socket.emit("createNotification", {
      title: "Prueba",
      description: "A test",
      type: "Quest",
      userType: "STUDENT",
    });
    console.log("We've emited the event");
  }

  let boxSize = "m";

  if (type == "STUDENT") {
    boxSize = "xs";
  }

  return (
    <Box maxW={boxSize} borderWidth="10px" borderRadius="lg" overflow="hidden">
      <video playsInline muted ref={video} autoPlay />;
      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            Mage
          </Badge>

          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            textTransform="uppercase"
            ml="4"
          >
            {propertyStudent.level} level &bull; {propertyStudent.points} Points
            &bull; {propertyStudent.quest.length} Quest
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h2"
          lineHeight="tight"
          isTruncated
          fontSize="1.7rem"
        >
          {propertyStudent.name}
        </Box>

        <Box>{propertyStudent.motto}</Box>
        <Button onClick={testNotification}>Test Notification</Button>
      </Box>
    </Box>
  );
};

export function VideoComponent({
  stream,
  userVideo,
  partnerVideo,
  callAccepted,
  student,
}) {
  return (
    <Box bg="gray.100">
      {stream ? (
        <Flex
          h="100vh"
          direction="column"
          align="center"
          justify="space-evenly"
        >
          {callAccepted ? (
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
              <VideoBox video={partnerVideo} />
            </Flex>
          ) : (
            <></>
          )}

          <VideoBox video={userVideo} />
          <Notification />
        </Flex>
      ) : (
        <></>
      )}
    </Box>
  );
}
