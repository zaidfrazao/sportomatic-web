/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import injectStyles from "react-jss";
import Button from "../../../../components/Button";
import Dialog from "../../../../components/Dialog";
import { isValidEmail } from "../../../../utils/validation";
import Select from "../../../../components/Select";
import TextField from "../../../../components/TextField";

const styles = theme => ({
  contentWrapper: {
    minWidth: 280,
    maxWidth: 320,
    margin: "0 auto"
  }
});

class InvitePersonDialog extends Component {
  state = {
    email: {
      value: "",
      validation: "default",
      message: ""
    },
    firstName: {
      value: "",
      validation: "default",
      message: ""
    },
    lastName: {
      value: "",
      validation: "default",
      message: ""
    },
    type: {
      value: {
        key: "none",
        label: ""
      },
      validation: "default",
      message: ""
    }
  };

  componentWillReceiveProps(nextProps) {
    const { isOpen } = nextProps;

    if (isOpen !== this.props.isOpen && !isOpen) {
      this.resetState();
    }
  }

  resetState() {
    this.setState({
      email: {
        value: "",
        validation: "default",
        message: ""
      },
      firstName: {
        value: "",
        validation: "default",
        message: ""
      },
      lastName: {
        value: "",
        validation: "default",
        message: ""
      },
      type: {
        value: {
          key: "none",
          label: ""
        },
        validation: "default",
        message: ""
      }
    });
  }

  handleChange(input, newValue) {
    this.setState({
      [input]: {
        ...this.state[input],
        value: newValue
      }
    });
  }

  validateForm(type, firstName, lastName, email) {
    let isValid = true;
    let newState = {};

    if (type.value.key === "none") {
      isValid = false;
      newState.type = {
        value: type.value,
        validation: "error",
        message: "Please select a type"
      };
    } else {
      newState.type = {
        value: type.value,
        validation: "default",
        message: ""
      };
    }

    if (firstName.value === "") {
      isValid = false;
      newState.firstName = {
        value: firstName.value,
        validation: "error",
        message: "Please enter a first name"
      };
    } else if (firstName.value.length > 32) {
      isValid = false;
      newState.firstName = {
        value: firstName.value,
        validation: "error",
        message: "Max. 32 characters allowed"
      };
    } else if (firstName.value !== _.startCase(firstName.value)) {
      newState.firstName = {
        value: firstName.value,
        validation: "warning",
        message: "Names are usually capitalised"
      };
    } else {
      newState.firstName = {
        value: firstName.value,
        validation: "default",
        message: ""
      };
    }

    if (lastName.value === "") {
      isValid = false;
      newState.lastName = {
        value: lastName.value,
        validation: "error",
        message: "Please enter a last name"
      };
    } else if (lastName.value.length > 32) {
      isValid = false;
      newState.lastName = {
        value: lastName.value,
        validation: "error",
        message: "Max. 32 characters allowed"
      };
    } else if (lastName.value !== _.startCase(lastName.value)) {
      newState.lastName = {
        value: lastName.value,
        validation: "warning",
        message: "Names are usually capitalised"
      };
    } else {
      newState.lastName = {
        value: lastName.value,
        validation: "default",
        message: ""
      };
    }

    if (email.value === "") {
      isValid = false;
      newState.email = {
        value: email.value,
        validation: "error",
        message: "Please enter an email address"
      };
    } else if (!isValidEmail(email.value)) {
      isValid = false;
      newState.email = {
        value: email.value,
        validation: "error",
        message: "This email address is invalid"
      };
    } else {
      newState.email = {
        value: email.value,
        validation: "default",
        message: ""
      };
    }

    this.setState(newState);

    return isValid;
  }

  render() {
    const { classes, isOpen, isLoading } = this.props;
    const { closeModal, invitePerson } = this.props.actions;
    const { email, type, firstName, lastName } = this.state;

    const actions = [
      <Button
        colour="primary"
        slim
        disabled={isLoading}
        handleClick={() => {
          closeModal();
          this.resetState();
        }}
      >
        Cancel
      </Button>,
      <Button
        slim
        filled
        colour="primary"
        loading={isLoading}
        handleClick={() => {
          const isValid = this.validateForm(type, firstName, lastName, email);

          if (isValid) {
            invitePerson(
              type.value.key,
              firstName.value,
              lastName.value,
              email.value
            );
          }
        }}
      >
        Invite
      </Button>
    ];

    return (
      <Dialog
        isOpen={isOpen}
        heading="Invite Person to Community"
        actions={actions}
      >
        <div className={classes.contentWrapper}>
          <Select
            placeholder="Type"
            items={[
              {
                key: "ADMIN",
                label: "Administrator"
              },
              {
                key: "STAFF",
                label: "Staff member"
              }
            ]}
            selectedItem={type.value}
            validation={type.validation}
            helperText={type.message}
            handleChange={(key, label) =>
              this.handleChange("type", { key, label })}
          />
          <TextField
            type="text"
            placeholder="First name"
            value={firstName.value}
            validation={firstName.validation}
            helperText={firstName.message}
            handleChange={newValue => this.handleChange("firstName", newValue)}
          />
          <TextField
            type="text"
            placeholder="Last name"
            value={lastName.value}
            validation={lastName.validation}
            helperText={lastName.message}
            handleChange={newValue => this.handleChange("lastName", newValue)}
          />
          <TextField
            type="email"
            placeholder="Email"
            value={email.value}
            validation={email.validation}
            helperText={email.message}
            handleChange={newValue => this.handleChange("email", newValue)}
          />
        </div>
      </Dialog>
    );
  }
}

export default injectStyles(styles)(InvitePersonDialog);
