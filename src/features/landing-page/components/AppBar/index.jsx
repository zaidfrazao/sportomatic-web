import React, { Component } from "react";
import { grey } from "material-ui/colors";
import { withStyles } from "material-ui/styles";
import Button from "../Button";
import logo from "./images/logo.png";

const styles = theme => ({
  appBar: {
    padding: "0 32px",
    backgroundColor: grey[50],
    borderBottom: `2px solid ${grey[300]}`
  },
  appBarContent: {
    padding: "12px 0",
    display: "flex",
    alignItems: "center"
  },
  flex: {
    flex: 1
  },
  logo: {
    backgroundImage: `url(${logo})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: 160,
    height: 30
  },
  signUpButtonWrapper: {
    display: "inline-block",
    marginLeft: 12,
    "@media (max-width: 600px)": {
      display: "none"
    }
  }
});

type Props = {
  actions: {
    goToSignUp: () => null
  },
  classes: {
    appBar: string,
    appBarContent: string,
    flex: string,
    logo: string,
    signUpButtonWrapper: string
  }
};

class AppBar extends Component<Props> {
  static defaultProps = {
    actions: {
      goToSignUp: () => console.log("User clicked to sign up")
    }
  };

  render() {
    const { classes } = this.props;
    const { goToSignUp } = this.props.actions;

    return (
      <div className={classes.appBar}>
        <div className={classes.appBarContent}>
          <div className={classes.logo} />
          <div className={classes.flex} />
          <div className={classes.buttonsWrapper}>
            <Button colour="secondary" slim>
              Log in
            </Button>
            <div className={classes.signUpButtonWrapper}>
              <Button
                colour="primary"
                filled
                slim
                actions={{
                  handleClick: () => goToSignUp()
                }}
              >
                Sign up for free
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AppBar);
