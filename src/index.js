import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./App.scss";
import { AuthContext } from "./AuthContext";

ReactDOM.render(
  <>
    <AuthContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContext>
  </>,
  document.getElementById("root")
);
