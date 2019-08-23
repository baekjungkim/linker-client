import React, { Component } from "react";
import AppPresenter from "./AppPresenter";
import Store from "store";

class AppContainer extends Component {
  // Login func
  _onLogin = () => {
    this.setState({
      logged: true
    });
  };

  // Logout func
  _onLogout = () => {
    this.setState({
      logged: false
    });
  };

  state = {
    logged: false,
    onLogin: this._onLogin,
    onLogout: this._onLogout
  };

  render() {
    return (
      <Store.Provider value={this.state}>
        <AppPresenter />
      </Store.Provider>
    );
  }
}

export default AppContainer;
