import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Account from "../features/core-interface/CoreInterfaceView";
import SignIn from "../features/sign-in/SignInView";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-un" component={SignIn} />
        <Route path="/myaccount" component={Account} />
        <Route component={Account} />
      </Switch>
    );
  }
}

export default App;
