import React from "react";
import { Formik, FormikHelpers, Form, Field } from "formik";
import {
  FormControl,
  Stack,
  Box,
  Input,
  FormLabel,
  Textarea,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import * as Yup from "yup";

const schema = Yup.object({
  name: Yup.string()
    .min(2, "Please write a longer name!")
    .required("Please enter a name"),
  description: Yup.string()
    .min(5, "Please write a longer description!")
    .required("Please enter a description"),
  studentIds: Yup.array().of(Yup.string()),
  questIds: Yup.array().of(Yup.string()),
});

export interface IFormValues {
  name: string;
  description: string;
  studentIds: string[];
  questIds: string[];
}

interface IProps {
  initialValues: IFormValues;
  onSubmit: (vals: IFormValues, actions: FormikHelpers<IFormValues>) => void;
}

export default function RoomForm(props: IProps) {
  return (
    <Box
      border="5px solid"
      borderColor="green.300"
      mx="auto"
      w={["100%", null, "90%", "600px"]}
      py={5}
      px={6}
      borderRadius="md"
    >
      <Formik
        initialValues={props.initialValues}
        onSubmit={props.onSubmit}
        validationSchema={schema}
      >
        {(formProps) => {
          return (
            <Form>
              <Stack spacing={4}>
                <Field name="name">
                  {({ field, form }: { field: any; form: any }) => {
                    return (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}
                      >
                        <FormLabel>Name</FormLabel>
                        <Input
                          variant="filled"
                          {...field}
                          id="name"
                          placeholder="Math class"
                        />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    );
                  }}
                </Field>
                <Field name="description">
                  {({ field, form }: { field: any; form: any }) => {
                    return (
                      <FormControl
                        isInvalid={
                          form.errors.description && form.touched.description
                        }
                      >
                        <FormLabel>Description</FormLabel>
                        <Textarea
                          {...field}
                          id="description"
                          variant="filled"
                          placeholder="In this class we'll see tons of maths."
                        />
                        <FormErrorMessage>
                          {form.errors.description}
                        </FormErrorMessage>
                      </FormControl>
                    );
                  }}
                </Field>
              </Stack>
              <Button
                mt={6}
                colorScheme="green"
                mx="auto"
                w={"100%"}
                type="submit"
                isLoading={formProps.isSubmitting}
              >
                Submit
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
}
