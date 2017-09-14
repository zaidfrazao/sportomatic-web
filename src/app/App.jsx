import React, { Component } from "react";
import CoreInterface from "../features/core-interface/CoreInterfaceView";
import { Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/institution">
          <CoreInterface />
        </Route>
        <Route path="/manager">
          <CoreInterface />
        </Route>
        <Route path="/coach">
          <CoreInterface />
        </Route>
      </Switch>
    );
  }
}

export default App;
