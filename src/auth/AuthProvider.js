import React from "react";

import { auth } from "../config/firebase-exports.js";
import AuthContext from "./auth-context.js";

import LoadingScreen from "../components/LoadingScreen";

export default class AuthProvider extends React.Component {
  state = {
    authStatusReported: false,
    isAuthenticated: false,
    user: null
  };

  componentDidMount() {
    this.unregisterAuthObserver = auth.onAuthStateChanged(user => {
      this.setState({
        authStatusReported: true,
        isAuthenticated: !!user,
        user
      });
    });
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    const { authStatusReported, isAuthenticated, user } = this.state;
    const { children } = this.props;
    return (
      <AuthContext.Provider
        value={{ authStatusReported, isAuthenticated, user }}
      >
        {authStatusReported ? children : <LoadingScreen />}
      </AuthContext.Provider>
    );
  }
}
