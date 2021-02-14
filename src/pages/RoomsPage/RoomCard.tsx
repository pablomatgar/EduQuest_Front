import React from "react";
import { Flex, Text } from "@chakra-ui/react";

interface IProps {
  name: string;
  description: string;
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
      <Text fontWeight="bold" fontSize="2xl">
        {props.name}
      </Text>
      <Text fontStyle="italic" color="gray.200">
        {props.description}
      </Text>
    </Flex>
  );
}
