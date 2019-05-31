import React from "react";
import styles from "./Button.module.css";

export default function Button(props) {
  const { children, className } = props;
  return (
    <button type="button" className={className || styles.Button} {...props}>
      {children}
    </button>
  );
}
