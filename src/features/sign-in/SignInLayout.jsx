// @flow
/* eslint-disable flowtype/require-valid-file-annotation */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { lightBlue, red } from "material-ui/colors";
import { withStyles } from "material-ui/styles";
import { Route } from "react-router-dom";
import Button from "material-ui/Button";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import backgroundImage from "./images/background-image.jpeg";
import logo from "./images/logo.png";

const styles = theme => ({
  paperPositioner: {
    width: "100%",
    height: "100%",
    minWidth: "300px",
    flex: 1,
    "@media (min-width: 768px)": {
      maxWidth: "30rem",
      maxHeight: "40rem"
    }
  },
  paper: {
    textAlign: "center",
    fontFamily: "Roboto, sans-serif",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  logo: {
    width: "300px",
    height: "auto",
    margin: "0 auto"
  },
  button: {
    margin: "10px",
    width: "10rem"
  },
  forgotPasswordLink: {
    width: "100%",
    textAlign: "center",
    margin: "10px",
    fontSize: "0.9rem",
    textDecoration: "none",
    cursor: "pointer",
    ":hover": {
      textDecoration: "underline"
    }
  },
  buttons: {
    margin: "20px"
  },
  loginError: {
    color: red[500],
    textAlign: "center",
    fontSize: "0.9rem",
    marginTop: "10px",
    marginLeft: "auto",
    marginRight: "auto"
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    transition: "all ease-in-out 0.5s",
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: "#fff"
  },
  header: {
    display: "block",
    backgroundColor: lightBlue[700],
    height: "4rem",
    color: "#fff",
    paddingTop: "calc((4rem - 50px) / 2)",
    borderBottom: "1px solid #E0E0E0"
  },
  footer: {
    display: "block",
    width: "100%",
    height: "4rem",
    textAlign: "right",
    backgroundColor: lightBlue[700],
    borderTop: "1px solid #E0E0E0"
  },
  content: {
    flexGrow: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "auto"
  }
});

class SignInLayout extends Component {
  render() {
    const { classes, loading } = this.props;

    return (
      <div className={classes.wrapper}>
        <div className={classes.paperPositioner}>
          <Paper className={classes.paper}>
            <div className={classes.header} />
            <div className={classes.content}>
              {!loading && (
                <form onSubmit={e => this.handleSubmit(e)}>
                  <img
                    src={logo}
                    alt="Sportomatic Logo"
                    className={classes.logo}
                  />
                  <div>
                    <div>
                      <TextField type="email" label="Email" />
                    </div>
                    <div>
                      <TextField type="password" label="Password" />
                    </div>
                    <div className={classes.buttons}>
                      <Route
                        render={({ history }) => (
                          <Button
                            raised
                            type="submit"
                            color="primary"
                            className={classes.button}
                            onClick={() => history.push("/coach")}
                          >
                            Sign in
                          </Button>
                        )}
                      />

                      <br />
                      <Button
                        disabled
                        raised
                        color="accent"
                        className={classes.button}
                      >
                        Create account
                      </Button>
                      <br />
                      <p className={classes.forgotPasswordLink}>
                        Forgot password?
                      </p>
                    </div>
                  </div>
                </form>
              )}
            </div>
            <div className={classes.footer} />
          </Paper>
        </div>
      </div>
    );
  }
}

SignInLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignInLayout);
