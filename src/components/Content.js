import React from "react";

import AuthContext from "../auth/auth-context.js";

import Chat from "./Chat";

export default function Content() {
  return (
    <AuthContext.Consumer>
      {function display(authContext) {
        return authContext.isAuthenticated ? (
          <div style={{ width: 1080, display: "flex" }}>
            <Chat />
          </div>
        ) : (
          <div>no auth test</div>
        );
      }}
    </AuthContext.Consumer>
  );
}
