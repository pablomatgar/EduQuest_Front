import React, { useRef, useState } from "react";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Redirect } from "react-router-dom";

import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { useAuth } from "../../../Utils/Auth/index";

let schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  passwordConfirm: yup
    .string()
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
});

export function SignUp(props) {
  const { signUp, currentUser } = useAuth();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  //References to values created by the user
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const codeRef = useRef();
  const nameRef = useRef();

  function changeState() {
    props.funcion(true); //Volvemos al Login
  }

  const handleSignUp = (e) => {
    let userType = "STUDENT";

    e.preventDefault();
    console.log("Referencia de contra: ", passwordRef.current.value);
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError("Passwords do not match");
      return;
    }

    if ((codeRef.current.value = "123456")) {
      userType = "TEACHER";
    }
    try {
      setError("");
      setLoading(true);
      signUp(
        emailRef.current.value,
        passwordRef.current.value,
        nameRef.current.value,
        userType
      );
      setSuccess(true);
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values, actions) => {}}
      validationSchema={schema}
    >
      {(formPropts) => {
        return (
          <Form>
            {success && <Redirect to="/videoRoom" />}
            <Flex width="full" align="center" justifyContent="center">
              <Box
                p={8}
                width="600px"
                borderWidth={1}
                borderRadius={8}
                boxShadow="lg"
              >
                <Box textAlign="center">
                  <Heading>Sign Up</Heading>
                </Box>
                <Box my={4} textAlign="left">
                  <Field name="name">
                    {({ field, form }) => {
                      return (
                        <FormControl mt={6}>
                          <FormLabel>Name</FormLabel>
                          <Input
                            {...field}
                            type="text"
                            placeholder="John Smith"
                            ref={nameRef}
                          />
                          <ErrorMessage name="name" />
                        </FormControl>
                      );
                    }}
                  </Field>
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
                        <FormControl mt={6}>
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
                  <Field name="passwordConfirm">
                    {({ field, form }) => {
                      return (
                        <FormControl mt={6}>
                          <FormLabel>Repeat password</FormLabel>
                          <Input
                            type="password"
                            placeholder="*******"
                            ref={passwordConfirmRef}
                          />
                          <ErrorMessage name="passwordConfirm" />
                        </FormControl>
                      );
                    }}
                  </Field>
                  <Field name="userType">
                    {({ field, form }) => {
                      return (
                        <FormControl mt={6}>
                          <FormLabel>Code for Teachers</FormLabel>
                          <Input
                            type="text"
                            placeholder="Place your code if you're a teacher"
                            ref={codeRef}
                          />
                          <ErrorMessage name="password" />
                        </FormControl>
                      );
                    }}
                  </Field>
                  {error && <h2>{error}</h2>}
                  <Button
                    onClick={changeState}
                    type="submit"
                    colorScheme="teal"
                    variantColor="teal"
                    variant="outline"
                    width="full"
                    mt={4}
                  >
                    Sign Up
                  </Button>
                  <Button
                    disabled={loading}
                    onClick={handleSignUp}
                    type="submit"
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
