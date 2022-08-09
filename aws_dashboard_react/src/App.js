import Status from "./pages/Status";
import useToken from './pages/useToken';
import Login from "./pages/Login";
import React, { useState } from "react";






function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return (<Login setToken={setToken} />);

  }
  if (token) {

    return (<Status />);
  }
};
export default App;
