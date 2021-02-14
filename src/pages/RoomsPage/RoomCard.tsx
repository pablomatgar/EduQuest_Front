import React from "react";
import { Flex, Text } from "@chakra-ui/react";

interface IProps {
  name: string;
  description: string;
  questIds: string[];
  studentIds: string[];
}

export default function RoomCard(props: IProps) {
  return (
    <Flex
      flexDir="column"
      border="4px solid"
      borderColor="green.300"
      borderRadius="lg"
      p={5}
      backgroundColor="gray.900"
    >
      <Text fontWeight="bold" fontSize="3xl">
        {props.name}
      </Text>
      <Text fontSize="xl" fontStyle="italic" color="gray.200">
        {props.description}
      </Text>
      <Flex flexDir="column" mt={4}>
        <Text>
          <Text as="span" color="magenta">
            {props.studentIds.length}
          </Text>{" "}
          students in this room
        </Text>
        <Text>
          <Text as="span" color="magenta">
            {props.questIds.length}
          </Text>{" "}
          quests available
        </Text>
      </Flex>
    </Flex>
  );
}
