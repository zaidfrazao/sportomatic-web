// @flow
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { getStore } from "./utils/redux";
import { MuiThemeProvider } from "material-ui/styles";
import { Provider } from "react-redux";
import App from "./app/App";
import defineMUITheme from "./utils/mui-theme";
import registerServiceWorker from "./utils/register-service-worker";
import { initFirebase } from "./utils/firebase";
import "./index.css";

initFirebase();
const theme = defineMUITheme();
const store = getStore();

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("root")
);

registerServiceWorker();
