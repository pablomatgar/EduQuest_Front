import React from "react";
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Box, Flex, Heading, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";


let schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Email must be a valid email').required('Email is required'),
    password: yup.string().required('Password is required'),
    passwordConfirm: yup.string().test('passwords-match', 'Passwords must match', function (value) {return this.parent.password === value})
});


export function SignUp(props) {

  function changeState() {
    //BASE DATOS
    props.funcion(true); //Volvemos al Login
  }

  return (
    <Formik initialValues={{email:"", password:""}} onSubmit={(values, actions) => { }} validationSchema={schema}>
      {formPropts => {
        return (
        <Form>
          <Flex width="full" align="center" justifyContent="center">
            <Box p={8} width="600px" borderWidth={1} borderRadius={8} boxShadow="lg">
              <Box textAlign="center">
                <Heading>Sign Up</Heading>
              </Box>
              <Box my={4} textAlign="left">
              <Field name="name">
                  {({field,form})=>{
                    return(
                      <FormControl mt={6}>
                      <FormLabel>Name</FormLabel>
                      <Input {...field} type="text" placeholder="John Smith" />
                      <ErrorMessage name="name"/>
                    </FormControl>
                    )
                  }}
                </Field>
                <Field name="email">
                  {({field,form})=>{
                    return(
                      <FormControl mt={6}>
                      <FormLabel>Email</FormLabel>
                      <Input {...field} type="text" placeholder="mail@mail.com" />
                      <ErrorMessage name="email"/>
                    </FormControl>
                    )
                  }}
                </Field>
                <Field name="password">
                {({field,form})=>{
                    return(
                  <FormControl mt={6}>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" placeholder="*******" />
                      <ErrorMessage name="password"/>
                  </FormControl>
                    )
                  }}
                </Field>
                <Field name="passwordConfirm">
                {({field,form})=>{
                    return(
                  <FormControl mt={6}>
                    <FormLabel>Repeat password</FormLabel>
                    <Input type="password" placeholder="*******" />
                    <ErrorMessage name="passwordConfirm"/>
                  </FormControl>
                    )
                  }}
                </Field>
                  <Button onClick={changeState} type="submit" colorScheme="teal" variantColor="teal" variant="outline" width="full" mt={4}>
                    Sign Up
                </Button>
                
              </Box>
            </Box>
          </Flex>
        </Form>
        )
      }}
    </Formik>
  );
}
