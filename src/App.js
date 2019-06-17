import React from "react";
import "./App.css";

import AuthContext from "./auth/auth-context.js";

import { Grid, Header, Main, Footer } from "./components/layouts";
import Content from "./components/Content";
import { db } from "./config/firebase-exports";
// import { auth, db } from "./config/firebase-exports";

export default function App() {
  const { user: authUser } = React.useContext(AuthContext);
  const [user, setUser] = React.useState({ user: null });

  const handleCreateUsername = username => {
    setUser({ ...user, username });
  };

  React.useEffect(() => {
    async function getUsername() {
      const doc = await db
        .collection("users")
        .doc(authUser.uid)
        .get();
      if (doc.exists) {
        setUser(u => ({ ...u, username: doc.data().username }));
      }
    }

    if (authUser && authUser.uid) getUsername();
    else setUser({});
  }, [authUser]);

  return (
    <div className="App">
      <Grid>
        <Header username={user.username} onSignOut={() => setUser({})} />
        <Main>
          <Content
            username={user.username}
            onCreateUsername={handleCreateUsername}
          />
        </Main>
        <Footer />
      </Grid>
    </div>
  );
}
