import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Account from "../features/core-interface/CoreInterfaceView";
import LandingPage from "../features/landing-page/LandingPageView";
import Sandbox from "../features/sandbox/SandboxView";
import SignIn from "../features/sign-in/SignInView";
import SignUp2 from "../features/sign-up-2/SignUpView";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/home" component={LandingPage} />
        <Route exact path="/sign-up" component={SignUp2} />
        <Route exact path="/sign-up/:initiation" component={SignUp2} />
        <Route
          exact
          path="/sign-up/:initiation/:currentStep"
          component={SignUp2}
        />
        <Route
          exact
          path="/sign-up/:initiation/:currentStep/:optionalParameters"
          component={SignUp2}
        />
        <Route exact path="/sandbox" component={Sandbox} />
        <Route path="/myaccount" component={Account} />
        <Route component={Account} />
      </Switch>
    );
  }
}

export default App;
