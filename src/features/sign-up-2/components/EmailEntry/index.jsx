import React, { Component } from "react";
import injectSheet from "react-jss";
import { common, grey, lightBlue } from "../../../../utils/colours";
import { isValidEmail } from "../../../../utils/validation";
import Button from "../../../../components/Button";
import TextField from "../../../../components/TextField";

const styles = theme => ({
  buttonIcon: {
    marginLeft: 8
  },
  buttonWrapper: {
    margin: "24px 0"
  },
  content: {
    padding: "60px 0 60px 0",
    maxWidth: 800,
    margin: "0 auto"
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
  email: {
    value: string,
    helperText: string,
    validation: string
  }
};

class EmailEntry extends Component<Props, State> {
  state = {
    email: {
      value: "",
      helperText: "",
      validation: "default"
    }
  };

  componentWillMount() {
    const { email } = this.props;

    if (email.length > 0) {
      this.validateForm(email);
    }
  }

  handleEmailChange(text) {
    this.setState({
      email: {
        value: text,
        helperText: "",
        validation: "default"
      }
    });
  }

  validateForm(email) {
    let isFormValid = true;
    let newEmail = {
      value: email,
      helperText: "",
      validation: "approved"
    };

    if (newEmail.value.length === 0) {
      newEmail = {
        value: "",
        helperText: "Please provide your email address",
        validation: "error"
      };
      isFormValid = false;
    } else if (!isValidEmail(newEmail.value)) {
      newEmail = {
        value: newEmail.value,
        helperText: "This email address is not valid",
        validation: "error"
      };
      isFormValid = false;
    }

    this.setState({
      email: newEmail
    });

    return isFormValid;
  }

  render() {
    const { classes } = this.props;
    const { handleNextClick } = this.props.actions;
    const { email } = this.state;

    return (
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <h1 className={classes.headline}>Let's get started</h1>
          <form className={classes.form}>
            <TextField
              type="email"
              placeholder="Email"
              value={email.value}
              helperText={email.helperText}
              validation={email.validation}
              actions={{
                handleChange: value => this.handleEmailChange(value)
              }}
            />
            <div className={classes.buttonWrapper}>
              <Button
                type="dark"
                fullWidth
                actions={{
                  handleClick: () => {
                    const isFormValid = this.validateForm(email.value);
                    isFormValid && handleNextClick(email.value);
                  }
                }}
              >
                Next{" "}
                <i className={`fas fa-arrow-right ${classes.buttonIcon}`} />
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(EmailEntry);
