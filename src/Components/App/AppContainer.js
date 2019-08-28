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
    localStorage.removeItem("token");
  };

  _onModal = () => {
    this.setState({
      modal: true
    });
  };

  _offModal = () => {
    this.setState({
      modal: false
    });
  };

  state = {
    modal: false,
    onLogin: this._onLogin,
    onLogout: this._onLogout,
    onModal: this._onModal,
    offModal: this._offModal,
    route: ""
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
