import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import CoachAccount from "../features/coach/core-interface/CoreInterfaceView";
import InstitutionAccount from "../features/institution/core-interface/CoreInterfaceView";
import ManagerAccount from "../features/manager/core-interface/CoreInterfaceView";
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
        <Route path="/institution">
          <InstitutionAccount />
        </Route>
        <Route path="/manager">
          <ManagerAccount />
        </Route>
        <Route path="/coach">
          <CoachAccount />
        </Route>
      </Switch>
    );
  }
}

export default App;
