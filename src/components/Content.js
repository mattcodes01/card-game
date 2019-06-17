import React from "react";

import { functions } from "../config/firebase-exports";

import AuthContext from "../auth/auth-context.js";
import Users from "../firebase/Users";

import Modal from "./Modal";
import CreateUsernameForm from "./CreateUsernameForm";
import Chat from "./Chat";

export default function Content({ onCreateUsername, username }) {
  const { isAuthenticated } = React.useContext(AuthContext);
  const [modalShow, setModalShow] = React.useState(false);
  const [usernameFormErrors, setUsernameFormErrors] = React.useState([]);

  const handleCreateUsernameFormSubmit = async event => {
    event.preventDefault();
    setUsernameFormErrors([]);

    const formData = new FormData(event.target);
    const newUsername = formData.getAll("username")[0];

    if (newUsername) {
      const exists = await Users.usernameExists(newUsername);
      if (exists) {
        setUsernameFormErrors(["username exists"]);
      } else {
        const createUsername = functions.httpsCallable("createUsername");
        createUsername({ username: newUsername })
          .then(() => {
            setModalShow(false);
            onCreateUsername(newUsername);
          })
          .catch(() => {
            setUsernameFormErrors(["error creating username"]);
          });
      }
    }
  };

  const handleModalOpen = () => {
    setModalShow(true);
  };

  const handleModalClose = () => {
    setModalShow(false);
  };

  return isAuthenticated ? (
    <div style={{ width: 1080, display: "flex" }}>
      <Modal show={modalShow} onClose={handleModalClose}>
        <div
          style={{
            padding: 20,
            width: 250,
            height: 250,
            borderRadius: 2,
            background: "white"
          }}
        >
          <CreateUsernameForm
            onSubmit={handleCreateUsernameFormSubmit}
            errors={usernameFormErrors}
          />
        </div>
      </Modal>
      <Chat onModalOpen={handleModalOpen} hasUsername={Boolean(username)} />
    </div>
  ) : (
    <div>no auth</div>
  );
}
