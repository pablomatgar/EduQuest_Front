import React, { useState } from "react";
import { Login } from "./Login";
import { SignUp } from "./SignUp";

export function LoginPage() {
  const [status, setStatus] = useState(true);
  return (
    <>
      {status ? <Login funcion={setStatus} /> : <SignUp funcion={setStatus} />}
    </>
  );
}
