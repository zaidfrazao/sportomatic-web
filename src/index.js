import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "react-jss";
import { Provider } from "react-redux";
import App from "./app/App";
import { getStore } from "./utils/redux";
import { initFirebase } from "./utils/firebase";
import registerServiceWorker from "./utils/register-service-worker";
import "./index.css";

initFirebase();
const theme = {};
const store = getStore();

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);

registerServiceWorker();
