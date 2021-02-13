import React, { useState } from "react";
import { Login } from "./Login/Login";
import { SignUp } from "./SignUp/SignUp";
import Notification from "../../components/Notification/Notification";

export function LoginPage() {
  const [status, setStatus] = useState(true);
  return (
    <>
      {status ? <Login funcion={setStatus} /> : <SignUp funcion={setStatus} />}
      <Notification />
    </>
  );
}
