import React, { Component } from "react";
import _ from "lodash";
import injectSheet from "react-jss";
import { common, grey, lightBlue } from "../../../../utils/colours";
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
  firstName: {
    value: string,
    helperText: string,
    validation: string
  },
  lastName: {
    value: string,
    helperText: string,
    validation: string
  }
};

class NameEntry extends Component<Props, State> {
  state = {
    firstName: {
      value: "",
      helperText: "",
      validation: "default"
    },
    lastName: {
      value: "",
      helperText: "",
      validation: "default"
    }
  };

  handleFirstNameChange(text) {
    if (
      text.length > 0 &&
      (text !== _.startCase(text) && text !== `${_.startCase(text)} `)
    ) {
      this.setState({
        ...this.state,
        firstName: {
          value: text,
          helperText: "Names are usually capitalised",
          validation: "warning"
        }
      });
    } else {
      this.setState({
        ...this.state,
        firstName: {
          value: text,
          helperText: "",
          validation: "default"
        }
      });
    }
  }

  handleLastNameChange(text) {
    if (
      text.length > 0 &&
      (text !== _.startCase(text) && text !== `${_.startCase(text)} `)
    ) {
      this.setState({
        ...this.state,
        lastName: {
          value: text,
          helperText: "Names are usually capitalised",
          validation: "warning"
        }
      });
    } else {
      this.setState({
        ...this.state,
        lastName: {
          value: text,
          helperText: "",
          validation: "default"
        }
      });
    }
  }

  validateForm() {
    let isFormValid = true;
    let firstName = {
      value: this.state.firstName.value,
      helperText: "",
      validation: "approved"
    };
    let lastName = {
      value: this.state.lastName.value,
      helperText: "",
      validation: "approved"
    };

    if (firstName.value.length === 0) {
      firstName = {
        value: "",
        helperText: "Please provide your first name",
        validation: "error"
      };
      isFormValid = false;
    }
    if (lastName.value.length === 0) {
      lastName = {
        value: "",
        helperText: "Please provide your last name",
        validation: "error"
      };
      isFormValid = false;
    }

    this.setState({
      firstName,
      lastName
    });

    return isFormValid;
  }

  render() {
    const { classes } = this.props;
    const { handleNextClick } = this.props.actions;
    const { firstName, lastName } = this.state;

    return (
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <h1 className={classes.headline}>Tell us about yourself</h1>
          <form className={classes.form}>
            <TextField
              type="text"
              placeholder="First name"
              value={firstName.value}
              helperText={firstName.helperText}
              validation={firstName.validation}
              actions={{
                handleChange: value => this.handleFirstNameChange(value)
              }}
            />
            <TextField
              type="text"
              placeholder="Last name"
              value={lastName.value}
              helperText={lastName.helperText}
              validation={lastName.validation}
              actions={{
                handleChange: value => this.handleLastNameChange(value)
              }}
            />
            <div className={classes.buttonWrapper}>
              <Button
                type="dark"
                colour="primary"
                filled
                fullWidth
                actions={{
                  handleClick: () => {
                    const isFormValid = this.validateForm();
                    isFormValid &&
                      handleNextClick(firstName.value, lastName.value);
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

export default injectSheet(styles)(NameEntry);
