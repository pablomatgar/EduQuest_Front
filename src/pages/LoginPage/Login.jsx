import React from "react";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

let schema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export function Login(props) {
  function changeState() {
    props.funcion(false);
  }

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values, actions) => {}}
      validationSchema={schema}
    >
      {(formPropts) => {
        return (
          <Form>
            <Flex width="full" align="center" justifyContent="center">
              <Box
                p={8}
                width="600px"
                borderWidth={1}
                borderRadius={8}
                boxShadow="lg"
              >
                <Box textAlign="center">
                  <Heading>Login</Heading>
                </Box>
                <Box my={4} textAlign="left">
                  <Field name="email">
                    {({ field, form }) => {
                      return (
                        <FormControl mt={6}>
                          <FormLabel>Email</FormLabel>
                          <Input
                            {...field}
                            type="text"
                            placeholder="mail@mail.com"
                          />
                          <ErrorMessage name="email" />
                        </FormControl>
                      );
                    }}
                  </Field>
                  <Field name="password">
                    {({ field, form }) => {
                      return (
                        <FormControl mt={6} isRequired>
                          <FormLabel>Password</FormLabel>
                          <Input type="password" placeholder="*******" />
                          <ErrorMessage name="password" />
                        </FormControl>
                      );
                    }}
                  </Field>
                  <Button
                    type="submit"
                    colorScheme="teal"
                    variantColor="teal"
                    variant="outline"
                    width="full"
                    mt={4}
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={changeState}
                    colorScheme="teal"
                    variantColor="teal"
                    variant="outline"
                    width="full"
                    mt={4}
                  >
                    Sign Up
                  </Button>
                </Box>
              </Box>
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
}
