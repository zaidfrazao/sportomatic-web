import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Account from "../features/core-interface/CoreInterfaceView";
import LandingPage from "../features/landing-page/LandingPageView";
import SignIn from "../features/sign-in/SignInView";
import SignUp from "../features/sign-up/SignUpView";
import SignUp2 from "../features/sign-up-2/SignUpView";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/sign-up/:userID" component={SignUp} />
        <Route exact path="/home" component={LandingPage} />
        <Route exact path="/home/sign-up" component={SignUp2} />
        <Route exact path="/home/sign-up/:currentStep" component={SignUp2} />
        <Route path="/myaccount" component={Account} />
        <Route component={Account} />
      </Switch>
    );
  }
}

export default App;
