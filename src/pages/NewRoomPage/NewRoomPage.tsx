import React, { Suspense, useMemo, useCallback } from "react";
import { FormikHelpers } from "formik";
import { Box, Heading, Text, useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import fetchWithAuth from "../../Utils/Interceptor/FetchClient";
import { IFormValues } from "./RoomForm";

const RoomForm = React.lazy(() => import("./RoomForm"));

export function NewRoomPage() {
  const mutation = useMutation((data: IFormValues) =>
    fetchWithAuth.post("/api/rooms", data)
  );
  const initialValues: IFormValues = useMemo(() => {
    return {
      name: "",
      description: "",
      studentIds: [],
      questIds: [],
    };
  }, []);
  const toast = useToast();

  const submitCallback = useCallback(
    (vals: IFormValues, actions: FormikHelpers<IFormValues>) => {
      mutation.mutate(
        {
          ...vals,
        },
        {
          onSuccess: () => {
            actions.setSubmitting(false);
            toast({
              title: "Room created",
              description: `The room "${vals.name}" has been succesfully created :)`,
              status: "success",
            });
          },
          onError: (err) => {
            actions.setSubmitting(false);
            toast({
              title: "Oops!",
              description: "Something weird has happened, please try again!",
              status: "error",
            });
            console.log(err);
          },
        }
      );
    },
    []
  );

  return (
    <Box
      borderTop="6px solid"
      borderColor="magenta"
      backgroundColor="black"
      h="100vh"
    >
      <Heading color="white" pt={20} textAlign="center" fontSize="5xl">
        Create A New Room
      </Heading>
      <Text color="white" mb={8} mt={4} textAlign="center" fontSize="xl">
        You'll be able to add quests to this class once you've set up the basics
      </Text>
      <Suspense fallback={null}>
        <RoomForm initialValues={initialValues} onSubmit={submitCallback} />
      </Suspense>
    </Box>
  );
}
