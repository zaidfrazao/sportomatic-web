import React, { Component } from "react";
import CoreInterface from "../features/core-interface/CoreInterfaceView";
import SignIn from "../features/sign-in/SignInView";
import CoachAccount from "../features/coach/core-interface/CoreInterfaceView";
import { Route, Switch } from "react-router-dom";

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
        <Route path="/institution">
          <CoreInterface accountType="institution" />
        </Route>
        <Route path="/manager">
          <CoreInterface accountType="manager" />
        </Route>
        <Route path="/coach">
          <CoachAccount />
        </Route>
      </Switch>
    );
  }
}

export default App;
