import React from "react";
import styles from "./CreateUsernameForm.module.css";

import Input from "../Form/Input";
import Button from "../Button";

export default function CreateUsernameForm({ onSubmit, errors }) {
  return (
    <div className="CreateUsernameForm">
      <form onSubmit={onSubmit}>
        <Input type="text" id="username" name="username" labelText="Username" />
        <Button className="mt-2" type="submit">
          {"Create"}
        </Button>
      </form>
      {errors && <p className={styles["error-msg"]}>{errors}</p>}
    </div>
  );
}
