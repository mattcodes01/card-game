import React from "react";
import { Grid, Header, Main } from "../layouts";
import styles from "./LoadingScreen.module.css";

export default function LoadingScreen() {
  return (
    <Grid>
      <Header loading />
      <Main>
        <div className={styles.spinner}>Loading...</div>
      </Main>
    </Grid>
  );
}
