import React, { Component } from "react";
import CoreInterface from "../features/core-interface/CoreInterfaceView";
import { Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/institution">
          <CoreInterface accountType="institution" />
        </Route>
        <Route path="/manager">
          <CoreInterface accountType="manager" />
        </Route>
        <Route path="/coach">
          <CoreInterface accountType="coach" />
        </Route>
      </Switch>
    );
  }
}

export default App;
