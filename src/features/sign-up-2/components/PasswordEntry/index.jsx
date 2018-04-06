import React, { Component } from "react";
import { grey, lightBlue } from "material-ui/colors";
import { withStyles } from "material-ui/styles";
import Button from "../Button";

const styles = theme => ({
  buttonWrapper: {
    margin: "24px 0"
  },
  content: {
    padding: "60px 0 60px 0",
    maxWidth: 800,
    margin: "0 auto"
  },
  disclaimer: {
    width: "100%",
    display: "inline-block",
    textAlign: "center",
    fontSize: 14,
    color: grey[800]
  },
  disclaimerLink: {
    fontWeight: "bold",
    fontSize: 16,
    color: grey[900],
    cursor: "pointer"
  },
  form: {
    color: grey[100],
    width: 260,
    margin: "0 auto"
  },
  headline: {
    color: "white",
    textAlign: "center",
    margin: 24
  },
  wrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    background: `linear-gradient(${lightBlue[300]}, ${lightBlue[500]})`
  }
});

type Props = {
  classes: {}
};

class PasswordEntry extends Component<Props> {
  render() {
    const { classes } = this.props;
    const { handleSignUpClick } = this.props.actions;

    return (
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <h1 className={classes.headline}>Lastly, you need a password</h1>
          <div className={classes.form}>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />
            <div className={classes.buttonWrapper}>
              <Button
                type="dark"
                fullWidth
                actions={{ handleClick: handleSignUpClick }}
              >
                Sign up
              </Button>
            </div>
            <span className={classes.disclaimer}>
              By clicking "Sign up", you agree to our{" "}
              <span className={classes.disclaimerLink} href="terms">
                Terms of Use
              </span>{" "}
              and{" "}
              <span className={classes.disclaimerLink} href="policy">
                Privacy Policy
              </span>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PasswordEntry);
