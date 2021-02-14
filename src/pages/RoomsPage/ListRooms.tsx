import React, { useState } from "react";
import { SimpleGrid, Text, Flex } from "@chakra-ui/react";
import { useQuery } from "react-query";
import fetchWithAuth from "../../Utils/Interceptor/FetchClient";
import RoomCard from "./RoomCard";

export default function ListRooms() {
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(30);

  const { data, isLoading, isError } = useQuery(["rooms", skip, take], (vars) =>
    fetchWithAuth
      .get(`/api/rooms?take=${take}&skip=${skip}`)
      .then((res) => res.data)
  );

  if (isLoading) {
    return null;
  }

  if (isError) {
    return (
      <Text textAlign="center">An error ocurred while fetching the rooms!</Text>
    );
  }

  console.log(data);

  return (
    <Flex justifyContent="center" mt={12} p={5}>
      <SimpleGrid columns={[1, 1, 3, 3]} spacingX={7} spacingY={4} w="100%">
        {data.rooms.map((room: any) => {
          return (
            <RoomCard
              key={room.id}
              name={room.name}
              description={room.description}
              questIds={room.questIds}
              studentIds={room.studentIds}
            />
          );
        })}
      </SimpleGrid>
    </Flex>
  );
}
