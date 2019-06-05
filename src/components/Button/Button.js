import React from "react";
import styles from "./Button.module.css";

/* eslint-disable */
export default function Button(props) {
  const { children, className, type, ...restProps } = props;
  let { type: buttonType } = props;
  if (["button", "submit", "reset"].includes(buttonType) === false) {
    buttonType = "button";
  }
  return (
    <button
      type={buttonType}
      className={`${styles.Button} ${className}`}
      {...restProps}
    >
      {children}
    </button>
  );
}
