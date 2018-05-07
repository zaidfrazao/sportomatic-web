import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Account from "../features/core-interface/CoreInterfaceView";
import Sandbox from "../features/sandbox/SandboxView";
import SignIn from "../features/sign-in/SignInView";
import SignUp from "../features/sign-up/SignUpView";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-in/:social" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/sign-up/:initiation" component={SignUp} />
        <Route
          exact
          path="/sign-up/:initiation/:currentStep"
          component={SignUp}
        />
        <Route
          exact
          path="/sign-up/:initiation/:currentStep/:optionalParameters"
          component={SignUp}
        />
        <Route
          exact
          path="/sign-up/:initiation/:currentStep/:optionalParameters/:stage"
          component={SignUp}
        />
        <Route exact path="/sandbox" component={Sandbox} />
        <Route path="/myaccount" component={Account} />
        <Route component={Account} />
      </Switch>
    );
  }
}

export default App;
