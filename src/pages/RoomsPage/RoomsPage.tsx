import React, { Suspense } from "react";
import { Box, Heading } from "@chakra-ui/react";

const ListRooms = React.lazy(() => import("./ListRooms"));

export function RoomsPage() {
  return (
    <Box
      borderTop="6px solid"
      borderColor="magenta"
      backgroundColor="black"
      h="100vh"
    >
      <Heading color="white" pt={20} textAlign="center" fontSize="5xl">
        Rooms
      </Heading>
      <Suspense fallback={null}>
        <ListRooms />
      </Suspense>
    </Box>
  );
}
