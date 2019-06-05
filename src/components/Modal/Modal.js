import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

const modalContainer = document.createElement("div");

export default function Modal({ children, style, show, onClose }) {
  React.useEffect(() => {
    document.getElementById("modal-root").appendChild(modalContainer);

    return function cleanup() {
      document.getElementById("modal-root").removeChild(modalContainer);
    };
  });

  const handleClick = event => {
    // TODO: find alternative to checking id?
    if (document.getElementById("modal") === event.target) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    show ? (
      <div
        role="button"
        tabIndex="0"
        id="modal"
        className={styles.Modal}
        style={style}
        onClick={handleClick}
        onKeyPress={() => {}}
      >
        {children}
      </div>
    ) : null,
    modalContainer
  );
}
