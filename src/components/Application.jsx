import React, { useContext } from "react";
import { Router } from "@reach/router";

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Crudalumnos from "./crudalumnos";
import PasswordReset from "./PasswordReset";

import { UserContext } from "../providers/UserProvider";


function Application() {
  // Asigna un user para leer el contexto actual.
  // React encontrará el Provider superior más cercano 
  // y usará su valor.
  const user = useContext(UserContext);
  console.log(" Usuario Application : " + user);
  
  return (
    user ? <Crudalumnos />  // true
      : // false
      <Router> 
          <SignIn path="/" />
          <SignUp path="signUp" />
          <PasswordReset path="passwordReset" />
      </Router>
  );
}

export default Application;