/* eslint-disable array-callback-return */
import React, { Component } from "react";
import Avatar from "material-ui/Avatar";
import Button from "material-ui/Button";
import Checkbox from "material-ui/Checkbox";
import { CircularProgress } from "material-ui/Progress";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from "material-ui/Dialog";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel
} from "material-ui/Form";
import { grey } from "material-ui/colors";
import Input, { InputAdornment, InputLabel } from "material-ui/Input";
import { Route } from "react-router";
import Select from "material-ui/Select";
import Slide from "material-ui/transitions/Slide";
import TextField from "material-ui/TextField";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import { isValidEmail } from "../../../../utils/validation";
import defaultProfilePicture from "../../image/default-profile-picture.png";

const styles = theme => ({
  additionalInfoWrapper: {
    display: "flex",
    flexDirection: "column"
  },
  basicInfoTextField: {
    margin: 8
  },
  button: {
    width: "100%"
  },
  contentWrapper: {
    minWidth: 280,
    maxWidth: 320,
    margin: "0 auto"
  },
  errorText: {
    color: grey[600],
    width: "100%",
    maxWidth: 200,
    margin: 8,
    textAlign: "center"
  },
  formControl: {
    margin: "16px 0"
  },
  messageWrapper: {
    border: `1px solid ${grey[300]}`,
    padding: 16,
    margin: "16px 0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  profilePicture: {
    backgroundColor: grey[300],
    height: 80,
    width: 80,
    margin: 8
  },
  subFormControl: {
    margin: "8px 0"
  },
  userInfoWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    margin: "16px 0"
  }
});

class InvitePersonModal extends Component {
  state = {
    emailEntered: "",
    emailError: false,
    personStatus: "AWAITING_EMAIL",
    newUser: {
      name: "",
      surname: ""
    },
    paymentDefaults: {
      type: "N/A",
      rates: {
        standard: 100,
        overtime: 150,
        salary: 6000
      }
    },
    type: {
      coach: false,
      manager: false,
      admin: false
    },
    Transition: props => <Slide direction="up" {...props} />
  };

  componentWillReceiveProps(nextProps) {
    const { inviteeInfo, institutionID, isOpen } = nextProps;

    if (isOpen !== this.props.isOpen && !isOpen) {
      this.resetState();
    }

    if (inviteeInfo !== this.props.inviteeInfo) {
      if (!inviteeInfo.institutions) {
        this.setState({
          personStatus: "NEW_USER"
        });
      } else if (inviteeInfo.institutions[institutionID]) {
        this.setState({
          personStatus: "ALREADY_MEMBER"
        });
      } else {
        this.setState({
          personStatus: "REGISTERED_USER"
        });
      }
    }
  }

  generatePassword() {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  getType() {
    const { inviteeInfo, institutionID } = this.props;

    let type = "";
    if (inviteeInfo) {
      if (inviteeInfo.institutions[institutionID].roles.admin === "APPROVED") {
        type = "Admin";
      }
      if (
        inviteeInfo.institutions[institutionID].roles.manager === "APPROVED"
      ) {
        type = "Manager";
      }
      if (inviteeInfo.institutions[institutionID].roles.coach === "APPROVED") {
        type = "Coach";
      }
      if (
        inviteeInfo.institutions[institutionID].roles.admin === "APPROVED" &&
        inviteeInfo.institutions[institutionID].roles.coach === "APPROVED"
      ) {
        type = "Admin / Coach";
      }
      if (
        inviteeInfo.institutions[institutionID].roles.coach === "APPROVED" &&
        inviteeInfo.institutions[institutionID].roles.manager === "APPROVED"
      ) {
        type = "Manager / Coach";
      }
      if (
        inviteeInfo.institutions[institutionID].roles.admin === "APPROVED" &&
        inviteeInfo.institutions[institutionID].roles.manager === "APPROVED"
      ) {
        type = "Admin / Manager";
      }
      if (
        inviteeInfo.institutions[institutionID].roles.admin === "APPROVED" &&
        inviteeInfo.institutions[institutionID].roles.coach === "APPROVED" &&
        inviteeInfo.institutions[institutionID].roles.manager === "APPROVED"
      ) {
        type = "Admin / Coach / Manager";
      }
    }

    return type;
  }

  updateType(typeToUpdate, isSelected) {
    const { type } = this.state;

    this.setState({
      type: {
        ...type,
        [typeToUpdate]: isSelected
      }
    });
  }

  updateEmail(newEmail) {
    this.setState({
      personStatus: "AWAITING_EMAIL",
      emailEntered: newEmail,
      paymentDefaults: {
        type: "N/A",
        rates: {
          standard: 100,
          overtime: 150,
          salary: 6000
        }
      },
      type: {
        coach: false,
        manager: false,
        admin: false
      }
    });
  }

  changePaymentType(newType) {
    const { paymentDefaults } = this.state;

    this.setState({
      paymentDefaults: {
        ...paymentDefaults,
        type: newType
      }
    });
  }

  updateStandard(standard) {
    const { paymentDefaults } = this.state;

    this.setState({
      paymentDefaults: {
        ...paymentDefaults,
        rates: {
          ...paymentDefaults.rates,
          standard
        }
      }
    });
  }

  updateOvertime(overtime) {
    const { paymentDefaults } = this.state;

    this.setState({
      paymentDefaults: {
        ...paymentDefaults,
        rates: {
          ...paymentDefaults.rates,
          overtime
        }
      }
    });
  }

  updateSalary(salary) {
    const { paymentDefaults } = this.state;

    this.setState({
      paymentDefaults: {
        ...paymentDefaults,
        rates: {
          ...paymentDefaults.rates,
          salary
        }
      }
    });
  }

  updateName(name) {
    this.setState({
      newUser: {
        name,
        surname: this.state.newUser.surname
      }
    });
  }

  updateSurname(surname) {
    this.setState({
      newUser: {
        surname,
        name: this.state.newUser.name
      }
    });
  }

  checkEmail(e) {
    e.preventDefault();
    const { fetchInviteeInfo } = this.props.actions;
    const { emailEntered } = this.state;
    const emailEnteredValid = isValidEmail(emailEntered);

    if (emailEnteredValid) {
      fetchInviteeInfo(emailEntered);
    }

    this.setState({
      emailError: !emailEnteredValid,
      paymentDefaults: {
        type: "N/A",
        rates: {
          standard: 100,
          overtime: 150,
          salary: 6000
        }
      },
      type: {
        coach: false,
        manager: false,
        admin: false
      }
    });
  }

  resetState() {
    this.setState({
      emailEntered: "",
      emailError: false,
      personStatus: "AWAITING_EMAIL",
      paymentDefaults: {
        type: "N/A",
        rates: {
          standard: 100,
          overtime: 150,
          salary: 6000
        }
      },
      type: {
        coach: false,
        manager: false,
        admin: false
      }
    });
  }

  render() {
    const {
      classes,
      isOpen,
      isLoading,
      inviteeID,
      inviteeInfo,
      institutionID,
      isMobile
    } = this.props;
    const {
      closeModal,
      invitePerson,
      createUser,
      editRoles
    } = this.props.actions;
    const {
      emailEntered,
      emailError,
      type,
      personStatus,
      newUser,
      paymentDefaults
    } = this.state;

    return (
      <Dialog
        open={isOpen}
        fullScreen={isMobile}
        transition={this.state.Transition}
      >
        <DialogTitle>Invite Person</DialogTitle>
        <DialogContent>
          <div className={classes.contentWrapper}>
            <form autoComplete="off">
              <FormControl className={classes.formControl}>
                <FormLabel>Person's email</FormLabel>
                <TextField
                  id="email"
                  type="email"
                  placeholder="example@gmail.com"
                  value={emailEntered}
                  onChange={e => this.updateEmail(e.target.value)}
                  error={emailError}
                  helperText={
                    emailError ? "This is not a valid email address" : ""
                  }
                />
              </FormControl>
              <Button
                raised
                type="submit"
                disabled={isLoading}
                color="primary"
                className={classes.button}
                aria-label="check email"
                onClick={e => this.checkEmail(e)}
              >
                Check email
              </Button>
              <div className={classes.messageWrapper}>
                {isLoading && <CircularProgress />}
                {!isLoading &&
                  personStatus === "AWAITING_EMAIL" && (
                    <Typography
                      className={classes.errorText}
                      type="body1"
                      component="p"
                    >
                      Click "Check email" to proceed...
                    </Typography>
                  )}
                {!isLoading &&
                  personStatus === "NEW_USER" && (
                    <Typography
                      className={classes.errorText}
                      type="body1"
                      component="p"
                    >
                      This person is not registered with Sportomatic yet
                    </Typography>
                  )}
                {!isLoading &&
                  personStatus === "ALREADY_MEMBER" && (
                    <div className={classes.userInfoWrapper}>
                      <Typography
                        className={classes.errorText}
                        type="body1"
                        component="p"
                      >
                        This person is already a member of your institution
                      </Typography>
                      <Avatar
                        src={
                          inviteeInfo.info.profilePictureURL === ""
                            ? defaultProfilePicture
                            : inviteeInfo.info.profilePictureURL
                        }
                        className={classes.profilePicture}
                      />
                      <Typography type="title" component="h4">
                        {`${inviteeInfo.info.name} ${inviteeInfo.info.surname}`}
                      </Typography>
                      <Typography type="subheading" component="h5">
                        {this.getType()}
                      </Typography>
                      <Route
                        render={({ history }) => (
                          <Button
                            disabled={isLoading}
                            aria-label="edit roles"
                            onClick={() => {
                              history.push(`/admin/people/${inviteeID}`);
                              editRoles(inviteeID);
                            }}
                          >
                            Edit roles
                          </Button>
                        )}
                      />
                    </div>
                  )}
                {!isLoading &&
                  personStatus === "REGISTERED_USER" && (
                    <div className={classes.userInfoWrapper}>
                      <Typography
                        className={classes.errorText}
                        type="body1"
                        component="p"
                      >
                        This person has a Sportomatic account already
                      </Typography>
                      <Avatar
                        src={
                          inviteeInfo.info.profilePictureURL === ""
                            ? defaultProfilePicture
                            : inviteeInfo.info.profilePictureURL
                        }
                        className={classes.profilePicture}
                      />
                      <Typography type="title" component="h4">
                        {`${inviteeInfo.info.name} ${inviteeInfo.info.surname}`}
                      </Typography>
                    </div>
                  )}
              </div>
              <div className={classes.additionalInfoWrapper}>
                {!isLoading &&
                  personStatus === "NEW_USER" && (
                    <FormControl className={classes.formControl}>
                      <FormGroup component="fieldset">
                        <FormLabel component="legend">Basic Info</FormLabel>
                        <TextField
                          id="name"
                          placeholder="Name"
                          className={classes.basicInfoTextField}
                          value={newUser.name}
                          onChange={e => this.updateName(e.target.value)}
                        />
                        <TextField
                          id="surname"
                          placeholder="Surname"
                          className={classes.basicInfoTextField}
                          value={newUser.surname}
                          onChange={e => this.updateSurname(e.target.value)}
                        />
                      </FormGroup>
                    </FormControl>
                  )}
                {!isLoading &&
                  (personStatus === "REGISTERED_USER" ||
                    personStatus === "NEW_USER") && (
                    <FormControl className={classes.formControl}>
                      <FormGroup component="fieldset">
                        <FormLabel component="legend">Select roles</FormLabel>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={type.admin}
                              onChange={(e, isChecked) =>
                                this.updateType("admin", isChecked)}
                              value="admin"
                            />
                          }
                          label="Admin"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={type.coach}
                              onChange={(e, isChecked) => {
                                this.setState({
                                  paymentDefaults: {
                                    type: "N/A",
                                    rates: {
                                      standard: 100,
                                      overtime: 150,
                                      salary: 6000
                                    }
                                  }
                                });
                                this.updateType("coach", isChecked);
                              }}
                              value="coach"
                            />
                          }
                          label="Coach"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={type.manager}
                              onChange={(e, isChecked) =>
                                this.updateType("manager", isChecked)}
                              value="manager"
                            />
                          }
                          label="Manager"
                        />
                      </FormGroup>
                    </FormControl>
                  )}
                {!isLoading &&
                  (personStatus === "REGISTERED_USER" ||
                    personStatus === "NEW_USER") &&
                  type.coach && (
                    <FormControl className={classes.formControl}>
                      <FormGroup component="fieldset">
                        <FormLabel component="legend">
                          Specify coach payment settings
                        </FormLabel>
                        <FormControl className={classes.subFormControl}>
                          <InputLabel htmlFor="terms">Terms</InputLabel>
                          <Select
                            native
                            value={paymentDefaults.type}
                            onChange={e =>
                              this.changePaymentType(e.target.value)}
                            input={<Input id="paymentType" />}
                          >
                            <option value="N/A">Not applicable</option>
                            <option value="HOURLY">Paid per hour</option>
                            <option value="MONTHLY">
                              Earns monthly salary
                            </option>
                          </Select>
                        </FormControl>
                        {paymentDefaults.type === "HOURLY" && (
                          <FormControl className={classes.subFormControl}>
                            <InputLabel htmlFor="standardHourlyRate">
                              Standard hourly rate
                            </InputLabel>
                            <Input
                              id="standard"
                              type="number"
                              inputProps={{
                                step: "50",
                                min: "0"
                              }}
                              value={paymentDefaults.rates.standard}
                              onChange={e =>
                                this.updateStandard(parseFloat(e.target.value))}
                              className={classes.basicInfoTextField}
                              startAdornment={
                                <InputAdornment position="start">
                                  R
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                        )}
                        {paymentDefaults.type === "HOURLY" && (
                          <FormControl className={classes.subFormControl}>
                            <InputLabel htmlFor="overtimeHourlyRate">
                              Overtime hourly rate
                            </InputLabel>
                            <Input
                              id="overtime"
                              type="number"
                              inputProps={{
                                step: "50",
                                min: "0"
                              }}
                              value={paymentDefaults.rates.overtime}
                              onChange={e =>
                                this.updateOvertime(parseFloat(e.target.value))}
                              className={classes.basicInfoTextField}
                              startAdornment={
                                <InputAdornment position="start">
                                  R
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                        )}
                        {paymentDefaults.type === "MONTHLY" && (
                          <FormControl className={classes.subFormControl}>
                            <InputLabel htmlFor="monthlySalary">
                              Monthly salary
                            </InputLabel>
                            <Input
                              id="salary"
                              type="number"
                              inputProps={{
                                step: "1000",
                                min: "0"
                              }}
                              value={paymentDefaults.rates.salary}
                              onChange={e =>
                                this.updateSalary(parseFloat(e.target.value))}
                              className={classes.basicInfoTextField}
                              startAdornment={
                                <InputAdornment position="start">
                                  R
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                        )}
                      </FormGroup>
                    </FormControl>
                  )}
              </div>
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              closeModal();
              this.resetState();
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={
              emailEntered === "" || !(type.admin || type.coach || type.manager)
            }
            color="primary"
            onClick={() => {
              if (personStatus === "NEW_USER") {
                const tempPassword = this.generatePassword();
                const userInfo = {
                  completeness: {
                    hasName: true,
                    hasPassword: false,
                    hasSurname: true,
                    hasEmail: true,
                    hasPhoneNumber: false,
                    hasProfilePicture: false,
                    hasSports: false
                  },
                  info: {
                    email: emailEntered,
                    name: newUser.name,
                    surname: newUser.surname,
                    phoneNumber: "",
                    profilePictureURL: "",
                    sports: {
                      Unknown: true
                    }
                  },
                  institutions: {
                    [institutionID]: {
                      roles: {
                        admin: type.admin ? "APPROVED" : "N/A",
                        coach: type.coach ? "APPROVED" : "N/A",
                        manager: type.manager ? "APPROVED" : "N/A"
                      },
                      paymentDefaults,
                      status: "STAFF"
                    }
                  },
                  lastAccessed: {
                    accountType: "ADMIN",
                    institutionID
                  },
                  metadata: {
                    creationDate: new Date(Date.now()),
                    createdVia: "INVITE",
                    createdBy: institutionID,
                    status: "ACTIVE",
                    tempPassword
                  },
                  tutorialStatus: {
                    lessons: {
                      dashboard: "NOT_STARTED",
                      schedule: "NOT_STARTED",
                      hours: "NOT_STARTED",
                      results: "NOT_STARTED",
                      wages: "NOT_STARTED",
                      people: "NOT_STARTED",
                      teams: "NOT_STARTED"
                    }
                  }
                };
                createUser(emailEntered, tempPassword, userInfo);
              } else {
                invitePerson(inviteeID, {
                  ...inviteeInfo,
                  institutions: {
                    ...inviteeInfo.institutions,
                    [institutionID]: {
                      roles: {
                        admin: type.admin ? "APPROVED" : "N/A",
                        coach: type.coach ? "APPROVED" : "N/A",
                        manager: type.manager ? "APPROVED" : "N/A"
                      },
                      paymentDefaults,
                      status: "STAFF"
                    }
                  }
                });
              }
            }}
          >
            Invite
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(InvitePersonModal);
