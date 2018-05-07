import React, { Component } from "react";
import injectSheet from "react-jss";
import { common, grey, lightBlue } from "../../../../utils/colours";
import Button from "../../../../components/Button";
import TextField from "../../../../components/TextField";

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
    color: grey[100]
  },
  disclaimerLink: {
    fontWeight: "bold",
    fontSize: 16,
    color: lightBlue[900],
    cursor: "pointer"
  },
  dotHighlighted: {
    width: 16,
    height: 16,
    borderRadius: "50%",
    margin: 4,
    backgroundColor: common["white"]
  },
  dotsWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    margin: "16px 0"
  },
  form: {
    color: grey[100],
    width: 260,
    margin: "0 auto"
  },
  headline: {
    color: common["white"],
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

type Props = {};

type State = {
  password: {
    value: string,
    helperText: string,
    validation: string
  }
};

class PasswordEntry extends Component<Props, State> {
  state = {
    password: {
      value: "",
      helperText: "",
      validation: "default"
    }
  };

  handlePasswordChange(text) {
    this.setState({
      ...this.state,
      password: {
        value: text,
        helperText: "",
        validation: "default"
      }
    });
  }

  validateForm() {
    let isFormValid = true;
    let password = {
      value: this.state.password.value,
      helperText: "",
      validation: "approved"
    };

    if (password.value.length === 0) {
      password = {
        value: "",
        helperText: "Please enter a password",
        validation: "error"
      };
      isFormValid = false;
    } else if (password.value.length < 6) {
      password = {
        value: "",
        helperText: "Your password must be at least 6 characters long",
        validation: "error"
      };
      isFormValid = false;
    }

    this.setState({
      password
    });

    return isFormValid;
  }

  render() {
    const { classes, showDots, isLoading, showPasswordEntry } = this.props;
    const { handleSignUpClick } = this.props.actions;
    const { password } = this.state;

    return (
      <div className={classes.wrapper}>
        <div className={classes.content}>
          {showPasswordEntry ? (
            <h1 className={classes.headline}>Lastly, you need a password</h1>
          ) : (
            <h1 className={classes.headline}>And you're done</h1>
          )}
          <form className={classes.form}>
            {showPasswordEntry && (
              <TextField
                type="password"
                placeholder="Password"
                value={password.value}
                helperText={password.helperText}
                validation={password.validation}
                handleChange={value => this.handlePasswordChange(value)}
              />
            )}
            <div className={classes.buttonWrapper}>
              <Button
                type="dark"
                colour="primary"
                loading={isLoading}
                filled
                fullWidth
                handleClick={() => {
                  if (showPasswordEntry) {
                    const isFormValid = this.validateForm();
                    isFormValid && handleSignUpClick(password.value);
                  } else {
                    handleSignUpClick(password.value);
                  }
                }}
              >
                Sign up
              </Button>
            </div>
            <span className={classes.disclaimer}>
              By clicking "Sign up", you agree to our{" "}
              <a
                className={classes.disclaimerLink}
                href="http://site.sportomaticapp.com/wp-content/uploads/2018/02/SPORTOMATIC-MOBILE-APP-TERMS-AND-CONDITIONS.pdf"
              >
                App Terms of Use
              </a>{" "}
              and{" "}
              <a
                className={classes.disclaimerLink}
                href="http://site.sportomaticapp.com/wp-content/uploads/2018/02/SPORTOMATIC-PRIVACY-POLICY.pdf"
              >
                Privacy Policy
              </a>
            </span>
          </form>
          {showDots && (
            <div className={classes.dotsWrapper}>
              <span className={classes.dotHighlighted} />
              <span className={classes.dotHighlighted} />
              <span className={classes.dotHighlighted} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(PasswordEntry);
