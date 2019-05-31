import React from "react";
import "./firebaseui.css";

export default function SignInButton(props) {
  return (
    <button
      type="button"
      style={{ width: 203 }}
      className="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-google firebaseui-id-idp-button"
      {...props}
    >
      <span className="firebaseui-idp-icon-wrapper">
        <img
          className="firebaseui-idp-icon"
          alt=""
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        />
      </span>
      <span className="firebaseui-idp-text firebaseui-idp-text-long">
        Sign in with Google
      </span>
      <span className="firebaseui-idp-text firebaseui-idp-text-short">
        Google
      </span>
    </button>
  );
}
