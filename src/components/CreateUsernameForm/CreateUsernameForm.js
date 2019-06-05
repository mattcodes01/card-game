import React from "react";

import Input from "../Form/Input";
import Button from "../Button";

export default function CreateUsernameForm({ onSubmit }) {
  return (
    <div className="CreateUsernameForm">
      <form onSubmit={onSubmit}>
        <Input type="text" id="username" name="username" labelText="Username" />
        <Button className="mt-2" type="submit">
          Create
        </Button>
      </form>
    </div>
  );
}
