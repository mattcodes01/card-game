import React from "react";
import styles from "./Input.module.css";

export default function Input(props) {
  const { id, labelText, ...restProps } = props;
  return (
    <>
      {labelText ? (
        <label htmlFor={id}>
          {labelText}
          <input className={styles.Input} {...restProps} />
        </label>
      ) : (
        <input className={styles.Input} {...restProps} />
      )}
    </>
  );
}
