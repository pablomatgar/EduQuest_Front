import React, { useRef, useState } from "react";
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
import { useAuth } from "../../../Utils/Auth";

let schema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export function Login(props) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState([]);
  const { login } = useAuth();

  function changeState() {
    props.funcion(false);
  }

  function handleLogin(e) {
    e.preventDefault();
    if (emailRef.current == undefined || passwordRef.current == undefined) {
      console.log("Sign in incomplete");
      setError([true, "Please complete the form in order to acces"]);
    } else {
      try {
        login(emailRef.current.value, passwordRef.current.value);
        console.log("Login was succesful");
      } catch {
        setError([true, "Error while login"]);
        console.log("Error");
      }
    }
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
                            ref={emailRef}
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
                          <Input
                            type="password"
                            placeholder="*******"
                            ref={passwordRef}
                          />
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
                  <Button
                    onClick={(e) => {
                      handleLogin(e);
                    }}
                    colorScheme="teal"
                    variantColor="teal"
                    variant="outline"
                    width="full"
                    mt={4}
                  >
                    Confirm
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
