import React from 'react';
import Application from "./components/Application";
import UserProvider from "./providers/UserProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <UserProvider>
      <Application />
      <ToastContainer />
    </UserProvider>
  );
}

export default App;