import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./util.css";
import App from "./App";

import AuthProvider from "./auth/AuthProvider";

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("root")
);
