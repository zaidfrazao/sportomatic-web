import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Account from "../features/core-interface/CoreInterfaceView";
import SignIn from "../features/sign-in/SignInView";
import SignUp from "../features/sign-up/SignUpView";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/sign-up/:userID" component={SignUp} />
        <Route path="/myaccount" component={Account} />
        <Route component={Account} />
      </Switch>
    );
  }
}

export default App;
