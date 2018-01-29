import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Account from "../features/core-interface/CoreInterfaceView";
import SignIn from "../features/sign-in/SignInView";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/">
          <SignIn />
        </Route>
        <Route exact path="/sign-in">
          <SignIn />
        </Route>
        <Route exact path="/sign-up">
          <SignIn />
        </Route>
        <Route path="/admin">
          <Account />
        </Route>
      </Switch>
    );
  }
}

export default App;
