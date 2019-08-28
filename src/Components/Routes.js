import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "Routes/Home";
import About from "Routes/About";
import User from "Routes/User";

const AppRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/user" component={User} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default AppRouter;
