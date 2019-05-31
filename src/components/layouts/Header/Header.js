import React from "react";
import * as firebase from "firebase/app";
import styles from "./Header.module.css";

import { auth } from "../../../config/firebase-exports.js";

import Button from "../../Button";
import SignInButton from "../../SignInButton";
import AuthContext from "../../../auth/auth-context.js";

export default function Header({ loading }) {
  const handleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithRedirect(provider);
  };

  return (
    <AuthContext.Consumer>
      {authContext => {
        function getButton() {
          return authContext.isAuthenticated ? (
            <Button onClick={() => auth.signOut()}>Sign Out</Button>
          ) : (
            <SignInButton onClick={handleSignIn} />
          );
        }

        return (
          <header className={styles.Header}>
            <div className={styles.brand}>Card Game</div>
            {loading ? null : getButton()}
          </header>
        );
      }}
    </AuthContext.Consumer>
  );
}
