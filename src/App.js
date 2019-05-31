import React from "react";
import "./App.css";

import AuthProvider from "./auth/AuthProvider";

import { Grid, Header, Main, Footer } from "./components/layouts";
import Content from "./components/Content";

export default function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Grid>
          <Header />
          <Main>
            <Content />
          </Main>
          <Footer />
        </Grid>
      </div>
    </AuthProvider>
  );
}
