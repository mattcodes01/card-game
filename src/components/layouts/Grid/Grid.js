import React from "react";
import styles from "./Grid.module.css";

export default function Grid({ children }) {
  return <div className={styles.Grid}>{children}</div>;
}
