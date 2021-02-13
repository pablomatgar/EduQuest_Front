import React, { useState } from "react";
import * as yup from 'yup';
import {Formik, Form} from 'formik';
import { Box, Flex, Heading, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";


let schema = yup.object().shape({
  email: yup.string().email(),
  password: yup.string()
});


export function LoginPage() {
  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form /*onSubmit={validate}*/>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="mail@mail.com" onChange={event => setEmail(event.currentTarget.value)} />
            </FormControl>
            <FormControl mt={6} isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="*******" onChange={event => setPassword(event.currentTarget.value)} />
            </FormControl>
            <Button type="submit" colorScheme="teal" variantColor="teal" variant="outline" width="full" mt={4}>
              Sign In
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}
