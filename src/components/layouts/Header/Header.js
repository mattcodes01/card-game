import React from "react";
import * as firebase from "firebase/app";
import styles from "./Header.module.css";

import { auth } from "../../../config/firebase-exports.js";

import Button from "../../Button";
import SignInButton from "../../SignInButton";
import AuthContext from "../../../auth/auth-context.js";

export default function Header({ loading, username, onSignOut }) {
  const { isAuthenticated } = React.useContext(AuthContext);

  const handleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithRedirect(provider);
  };

  const getButton = () => {
    return isAuthenticated ? (
      <Button
        className={styles["links-item"]}
        onClick={() => {
          onSignOut();
          auth.signOut();
        }}
      >
        Sign Out
      </Button>
    ) : (
      <SignInButton
        // className={styles["links-item"]}
        onClick={handleSignIn}
      />
    );
  };

  return (
    <header className={styles.Header}>
      <div className={styles.brand}>Card Game</div>
      <div className={styles.links}>
        {/* <div className={styles["links-item"]}>asdf</div> */}
        {username}
        {loading ? null : getButton()}
      </div>
    </header>
  );
}
