import React, { Component } from "react";
import Button from "material-ui/Button";

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <h2>Welcome to React</h2>
        </div>
        <p>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Button raised>Click me</Button>
      </div>
    );
  }
}

export default App;
