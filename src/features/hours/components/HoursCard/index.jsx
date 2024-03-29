/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import AbsentIcon from "material-ui-icons/Clear";
import ApproveIcon from "material-ui-icons/AssignmentTurnedIn";
import Button from "material-ui/Button";
import Collapse from "material-ui/transitions/Collapse";
import ExpandLess from "material-ui-icons/ExpandLess";
import ExpandMore from "material-ui-icons/ExpandMore";
import { green, grey, lightBlue, orange, red } from "material-ui/colors";
import { ListItem, ListItemText } from "material-ui/List";
import moment from "moment";
import { Route } from "react-router";
import SignInIcon from "material-ui-icons/AssignmentReturned";
import SignOutIcon from "material-ui-icons/AssignmentReturn";
import TextField from "material-ui/TextField";
import Typography from "material-ui/Typography";
import WarningIcon from "material-ui-icons/Warning";
import { withStyles } from "material-ui/styles";
import defaultProfilePicture from "../../image/default-profile-picture.png";

const styles = {
  absentButton: {
    backgroundColor: grey[50]
  },
  approveButton: {
    backgroundColor: green[500],
    color: grey[50],
    flex: 1,
    "&:hover": {
      backgroundColor: green[300]
    }
  },
  approvedButton: {
    flex: 1
  },
  buttonWrapper: {
    width: "100%",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    "@media (min-width: 904px)": {
      width: 200,
      height: 140
    }
  },
  coachName: {
    width: "100%",
    padding: 10,
    textAlign: "center",
    color: grey[600],
    backgroundColor: grey[50],
    border: `1px solid ${grey[300]}`
  },
  contentWrapper: {
    padding: 16
  },
  eventInfoButton: {
    marginTop: 16,
    width: "100%"
  },
  eventTimes: {
    color: grey[900],
    flexGrow: 1,
    textAlign: "center",
    margin: "8px 0"
  },
  eventTitle: {
    flexGrow: 1,
    textAlign: "center",
    color: grey[900]
  },
  header: {
    backgroundColor: "white"
  },
  hoursWrapper: {
    display: "flex",
    alignItems: "stretch",
    flexWrap: "wrap",
    backgroundColor: grey[100],
    margin: "16px 0"
  },
  markedAbsentText: {
    color: red[500]
  },
  markedAbsentTextWrapper: {
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  profilePicture: {
    backgroundColor: grey[50],
    border: `1px solid ${grey[300]}`,
    display: "none",
    "@media (min-width: 704px)": {
      display: "block",
      height: 140,
      width: 140
    }
  },
  rootWrapper: {
    backgroundColor: grey[100]
  },
  signInButton: {
    backgroundColor: lightBlue[500],
    color: grey[50],
    flex: 1,
    "&:hover": {
      backgroundColor: lightBlue[300]
    }
  },
  signOutButton: {
    backgroundColor: orange[500],
    color: grey[50],
    flex: 1,
    "&:hover": {
      backgroundColor: orange[300]
    }
  },
  time: {
    fontSize: "1.6rem",
    margin: 24,
    minWidth: 120
  },
  timeWrapper: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  timesWrapper: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    backgroundColor: grey[50],
    border: `1px solid ${grey[300]}`,
    padding: 0
  },
  unmarkAbsentButton: {
    backgroundColor: grey[50],
    flex: 1
  },
  warningIcon: {
    color: red[500],
    margin: 8
  }
};

class HoursCard extends Component {
  state = {
    coaches: {},
    isOpen: false
  };

  componentWillMount() {
    const { eventInfo, role, userID, paymentDefaults } = this.props;

    let coaches = {};
    let isOpen = false;
    if (role === "coach" && eventInfo.coaches[userID]) {
      let hasSignInError = false;
      let signInErrorMessage = "";
      let hasSignOutError = false;
      let signOutErrorMessage = "";

      const isAbsent =
        !eventInfo.coaches[userID].attendance.didAttend ||
        !eventInfo.coaches[userID].attendance.willAttend;
      const signInTime = moment(eventInfo.coaches[userID].hours.times.signIn);
      const signOutTime = moment(eventInfo.coaches[userID].hours.times.signOut);
      const startTime = moment(eventInfo.requiredInfo.times.start);
      const maxOvertimeMoment = moment(eventInfo.requiredInfo.times.end).add(
        paymentDefaults.maxOvertimeHours,
        "hours"
      );

      if (signInTime.diff(startTime, "hours") < -1) {
        hasSignInError = true;
        signInErrorMessage = "Too early";
      }
      if (signInTime.isAfter(signOutTime)) {
        hasSignOutError = true;
        signOutErrorMessage = "Before sign in";
      }
      if (signOutTime.isAfter(maxOvertimeMoment)) {
        hasSignOutError = true;
        signOutErrorMessage = "Max overtime exceeded";
      }

      coaches[userID] = {
        signInTime: eventInfo.coaches[userID].hours.times.signIn,
        signOutTime: eventInfo.coaches[userID].hours.times.signOut,
        status: eventInfo.coaches[userID].hours.status,
        isAbsent,
        errors: {
          signIn: {
            hasError: hasSignInError,
            message: signInErrorMessage
          },
          signOut: {
            hasError: hasSignOutError,
            message: signOutErrorMessage
          }
        }
      };
      if (eventInfo.coaches[userID].hours.status !== "APPROVED") {
        if (!isAbsent) {
          isOpen = true;
        } else if (startTime.isAfter(moment().startOf("day"))) {
          isOpen = true;
        }
      }
      this.setState({
        coaches,
        isOpen
      });
    } else {
      _.toPairs(eventInfo.coaches).map(([coachID, coachInfo]) => {
        let hasSignInError = false;
        let signInErrorMessage = "";
        let hasSignOutError = false;
        let signOutErrorMessage = "";

        const isAbsent =
          !coachInfo.attendance.didAttend || !coachInfo.attendance.willAttend;
        const signInMoment = moment(coachInfo.hours.times.signIn);
        const signOutMoment = moment(coachInfo.hours.times.signOut);
        const startMoment = moment(eventInfo.requiredInfo.times.start);
        const maxOvertimeMoment = moment(eventInfo.requiredInfo.times.end).add(
          paymentDefaults.maxOvertimeHours,
          "hours"
        );

        if (signInMoment.diff(startMoment, "hours") < -1) {
          hasSignInError = true;
          signInErrorMessage = "Too early";
        }
        if (signInMoment.isAfter(signOutMoment)) {
          hasSignOutError = true;
          signOutErrorMessage = "Before sign in";
        }
        if (signOutMoment.isAfter(maxOvertimeMoment)) {
          hasSignOutError = true;
          signOutErrorMessage = "Max overtime exceeded";
        }

        coaches[coachID] = {
          signInTime: coachInfo.hours.times.signIn,
          signOutTime: coachInfo.hours.times.signOut,
          status: coachInfo.hours.status,
          isAbsent: !coachInfo.attendance.didAttend,
          errors: {
            signIn: {
              hasError: hasSignInError,
              message: signInErrorMessage
            },
            signOut: {
              hasError: hasSignOutError,
              message: signOutErrorMessage
            }
          }
        };
        if (coachInfo.hours.status !== "APPROVED") {
          if (!isAbsent) {
            isOpen = true;
          } else if (startMoment.isAfter(moment().startOf("day"))) {
            isOpen = true;
          }
        }
        this.setState({
          coaches,
          isOpen
        });
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { eventInfo, role, userID, paymentDefaults } = nextProps;

    if (
      eventInfo !== this.props.eventInfo ||
      role !== this.props.role ||
      userID !== this.props.userID
    ) {
      let coaches = {};
      let isOpen = false;
      if (role === "coach" && eventInfo.coaches[userID]) {
        let hasSignInError = false;
        let signInErrorMessage = "";
        let hasSignOutError = false;
        let signOutErrorMessage = "";

        const isAbsent =
          !eventInfo.coaches[userID].attendance.didAttend ||
          !eventInfo.coaches[userID].attendance.willAttend;
        const signInTime = moment(eventInfo.coaches[userID].hours.times.signIn);
        const signOutTime = moment(
          eventInfo.coaches[userID].hours.times.signOut
        );
        const startTime = moment(eventInfo.requiredInfo.times.start);
        const maxOvertimeMoment = moment(eventInfo.requiredInfo.times.end).add(
          paymentDefaults.maxOvertimeHours,
          "hours"
        );

        if (signInTime.diff(startTime, "hours") < -1) {
          hasSignInError = true;
          signInErrorMessage = "Too early";
        }
        if (signInTime.isAfter(signOutTime)) {
          hasSignOutError = true;
          signOutErrorMessage = "Before sign in";
        }
        if (signOutTime.isAfter(maxOvertimeMoment)) {
          hasSignOutError = true;
          signOutErrorMessage = "Max overtime exceeded";
        }

        coaches[userID] = {
          signInTime: eventInfo.coaches[userID].hours.times.signIn,
          signOutTime: eventInfo.coaches[userID].hours.times.signOut,
          status: eventInfo.coaches[userID].hours.status,
          isAbsent,
          errors: {
            signIn: {
              hasError: hasSignInError,
              message: signInErrorMessage
            },
            signOut: {
              hasError: hasSignOutError,
              message: signOutErrorMessage
            }
          }
        };
        if (eventInfo.coaches[userID].hours.status !== "APPROVED") {
          if (!isAbsent) {
            isOpen = true;
          } else if (startTime.isAfter(moment().startOf("day"))) {
            isOpen = true;
          }
        }
        this.setState({
          coaches,
          isOpen
        });
      } else {
        _.toPairs(eventInfo.coaches).map(([coachID, coachInfo]) => {
          let hasSignInError = false;
          let signInErrorMessage = "";
          let hasSignOutError = false;
          let signOutErrorMessage = "";

          const isAbsent =
            !coachInfo.attendance.didAttend || !coachInfo.attendance.willAttend;
          const signInTime = moment(coachInfo.hours.times.signIn);
          const signOutTime = moment(coachInfo.hours.times.signOut);
          const startTime = moment(eventInfo.requiredInfo.times.start);
          const maxOvertimeMoment = moment(
            eventInfo.requiredInfo.times.end
          ).add(paymentDefaults.maxOvertimeHours, "hours");

          if (signInTime.diff(startTime, "hours") < -1) {
            hasSignInError = true;
            signInErrorMessage = "Too early";
          }
          if (signInTime.isAfter(signOutTime)) {
            hasSignOutError = true;
            signOutErrorMessage = "Before sign in";
          }
          if (signOutTime.isAfter(maxOvertimeMoment)) {
            hasSignOutError = true;
            signOutErrorMessage = "Max overtime exceeded";
          }

          coaches[coachID] = {
            signInTime: coachInfo.hours.times.signIn,
            signOutTime: coachInfo.hours.times.signOut,
            status: coachInfo.hours.status,
            isAbsent: !coachInfo.attendance.didAttend,
            errors: {
              signIn: {
                hasError: hasSignInError,
                message: signInErrorMessage
              },
              signOut: {
                hasError: hasSignOutError,
                message: signOutErrorMessage
              }
            }
          };
          if (coachInfo.hours.status !== "APPROVED") {
            if (!isAbsent) {
              isOpen = true;
            } else if (startTime.isAfter(moment().startOf("day"))) {
              isOpen = true;
            }
          }
          this.setState({
            coaches,
            isOpen
          });
        });
      }
    }
  }

  updateCoachHours(eventID, coachID, signInTime, signOutTime, status) {
    const { coaches } = this.state;
    const { eventInfo, paymentDefaults } = this.props;

    let hasSignInError = false;
    let signInErrorMessage = "";
    let hasSignOutError = false;
    let signOutErrorMessage = "";

    const signInMoment = moment(signInTime);
    const signOutMoment = moment(signOutTime);
    const startMoment = moment(eventInfo.requiredInfo.times.start);
    const maxOvertimeMoment = moment(eventInfo.requiredInfo.times.end).add(
      paymentDefaults.maxOvertimeHours,
      "hours"
    );

    if (signInMoment.diff(startMoment, "hours") < -1) {
      hasSignInError = true;
      signInErrorMessage = "Too early";
    }
    if (signInMoment.isAfter(signOutMoment)) {
      hasSignOutError = true;
      signOutErrorMessage = "Before sign in";
    }
    if (signOutMoment.isAfter(maxOvertimeMoment)) {
      hasSignOutError = true;
      signOutErrorMessage = "Max overtime exceeded";
    }

    this.setState({
      coaches: {
        ...coaches,
        [coachID]: {
          signInTime,
          signOutTime,
          status,
          isAbsent: coaches[coachID].isAbsent,
          errors: {
            signIn: {
              hasError: hasSignInError,
              message: signInErrorMessage
            },
            signOut: {
              hasError: hasSignOutError,
              message: signOutErrorMessage
            }
          }
        }
      }
    });
  }

  renderCardContent() {
    const {
      classes,
      eventInfo,
      eventID,
      staff,
      institutionID,
      role,
      userID,
      paymentDefaults
    } = this.props;
    const {
      signIn,
      signOut,
      approveHours,
      openMarkAbsentModal,
      openUnmarkAbsentModal
    } = this.props.actions;

    if (role === "coach" && this.state.coaches[userID]) {
      const signInTime = this.state.coaches[userID].signInTime;
      const signOutTime = this.state.coaches[userID].signOutTime;
      const errors = this.state.coaches[userID].errors;
      const isAbsent = this.state.coaches[userID].isAbsent;

      switch (this.state.coaches[userID].status) {
        case "AWAITING_SIGN_IN":
          return (
            <div className={classes.hoursWrapper}>
              <div className={classes.timesWrapper}>
                {isAbsent && (
                  <div className={classes.markedAbsentTextWrapper}>
                    <WarningIcon className={classes.warningIcon} />
                    <Typography
                      type="headline"
                      component="p"
                      className={classes.markedAbsentText}
                    >
                      {"Marked absent"}
                    </Typography>
                  </div>
                )}
                {!isAbsent && (
                  <form className={classes.timeWrapper}>
                    <TextField
                      id="time"
                      label="Signed in"
                      type="time"
                      disabled
                      className={classes.time}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </form>
                )}
                {!isAbsent && (
                  <form className={classes.timeWrapper}>
                    <TextField
                      id="time"
                      label="Signed out"
                      type="time"
                      disabled
                      className={classes.time}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </form>
                )}
              </div>
              <div className={classes.buttonWrapper}>
                <Button
                  raised
                  disabled={isAbsent}
                  className={classes.signInButton}
                  onClick={() => {
                    const currentTime = moment();
                    if (currentTime.isAfter(eventInfo.requiredInfo.times.end)) {
                      signIn(
                        eventID,
                        userID,
                        eventInfo.requiredInfo.times.start,
                        "AWAITING_SIGN_OUT"
                      );
                    } else {
                      signIn(
                        eventID,
                        userID,
                        currentTime.toDate(),
                        "AWAITING_SIGN_OUT"
                      );
                    }
                  }}
                >
                  <SignInIcon /> Sign in
                </Button>
              </div>
            </div>
          );
        case "AWAITING_SIGN_OUT":
          return (
            <div className={classes.hoursWrapper}>
              <div className={classes.timesWrapper}>
                <form className={classes.timeWrapper}>
                  <TextField
                    id="time"
                    label="Signed in"
                    type="time"
                    disabled
                    value={moment(signInTime).format("HH:mm")}
                    className={classes.time}
                    error={errors.signIn.hasError}
                    helperText={errors.signIn.message}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </form>
                <form className={classes.timeWrapper}>
                  <TextField
                    id="time"
                    label="Signed out"
                    type="time"
                    disabled
                    className={classes.time}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </form>
              </div>
              <div className={classes.buttonWrapper}>
                <Button
                  raised
                  className={classes.signOutButton}
                  disabled={errors.signIn.hasError}
                  onClick={() => {
                    const currentTime = moment();
                    const endOfEventDay = moment(
                      eventInfo.requiredInfo.times.end
                    ).endOf("day");
                    if (currentTime.isAfter(endOfEventDay)) {
                      signOut(
                        eventID,
                        userID,
                        eventInfo.requiredInfo.times.end,
                        "AWAITING_APPROVAL"
                      );
                    } else {
                      signOut(
                        eventID,
                        userID,
                        currentTime.toDate(),
                        "AWAITING_APPROVAL"
                      );
                    }
                  }}
                >
                  <SignOutIcon /> Sign out
                </Button>
              </div>
            </div>
          );
        case "AWAITING_APPROVAL":
          return (
            <div className={classes.hoursWrapper}>
              <div className={classes.timesWrapper}>
                <form className={classes.timeWrapper}>
                  <TextField
                    id="time"
                    label="Signed in"
                    type="time"
                    disabled
                    value={moment(signInTime).format("HH:mm")}
                    className={classes.time}
                    error={errors.signIn.hasError}
                    helperText={errors.signIn.message}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </form>
                <form className={classes.timeWrapper}>
                  <TextField
                    id="time"
                    label="Signed out"
                    type="time"
                    disabled
                    value={moment(signOutTime).format("HH:mm")}
                    className={classes.time}
                    error={errors.signOut.hasError}
                    helperText={errors.signOut.message}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </form>
              </div>
              <div className={classes.buttonWrapper}>
                <Button raised disabled className={classes.approveButton}>
                  <ApproveIcon /> Awaiting approval
                </Button>
              </div>
            </div>
          );
        case "APPROVED":
          return (
            <div className={classes.hoursWrapper}>
              <div className={classes.timesWrapper}>
                <form className={classes.timeWrapper}>
                  <TextField
                    id="time"
                    label="Signed in"
                    type="time"
                    value={moment(signInTime).format("HH:mm")}
                    disabled
                    className={classes.time}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </form>
                <form className={classes.timeWrapper}>
                  <TextField
                    id="time"
                    label="Signed out"
                    type="time"
                    value={moment(signOutTime).format("HH:mm")}
                    disabled
                    className={classes.time}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </form>
              </div>
              <div className={classes.buttonWrapper}>
                <Button raised disabled className={classes.approvedButton}>
                  <ApproveIcon /> Approved
                </Button>
              </div>
            </div>
          );
        default:
          return (
            <Typography type="body1" component="p">
              {`Invalid stage ${this.state.coaches[userID].status}.`}
            </Typography>
          );
      }
    } else {
      return _.toPairs(eventInfo.coaches).map(([coachID, coachInfo]) => {
        if (this.state.coaches[coachID]) {
          const { profilePictureURL, name, surname } = staff[coachID].info;
          const signInTime = this.state.coaches[coachID].signInTime;
          const signOutTime = this.state.coaches[coachID].signOutTime;
          const errors = this.state.coaches[coachID].errors;
          const isAbsent = this.state.coaches[coachID].isAbsent;

          switch (this.state.coaches[coachID].status) {
            case "AWAITING_SIGN_IN":
              return (
                <div
                  className={classes.hoursWrapper}
                  key={`hours-${coachID}${eventID}`}
                >
                  <Typography
                    type="title"
                    component="h3"
                    className={classes.coachName}
                  >
                    {`${name} ${surname}`}
                  </Typography>
                  <img
                    alt={`${name} ${surname}`}
                    src={
                      profilePictureURL === ""
                        ? defaultProfilePicture
                        : profilePictureURL
                    }
                    className={classes.profilePicture}
                  />
                  <div className={classes.timesWrapper}>
                    {isAbsent && (
                      <div className={classes.markedAbsentTextWrapper}>
                        <WarningIcon className={classes.warningIcon} />
                        <Typography
                          type="headline"
                          component="p"
                          className={classes.markedAbsentText}
                        >
                          {"Marked absent"}
                        </Typography>
                      </div>
                    )}
                    {!isAbsent && (
                      <form className={classes.timeWrapper}>
                        <TextField
                          id="time"
                          label="Signed in"
                          type="time"
                          onChange={e => {
                            let signedInAt = new Date(
                              eventInfo.requiredInfo.times.start
                            );
                            signedInAt.setHours(e.target.value.slice(0, 2));
                            signedInAt.setMinutes(e.target.value.slice(3, 5));
                            this.updateCoachHours(
                              eventID,
                              coachID,
                              signedInAt,
                              signOutTime,
                              "AWAITING_SIGN_OUT"
                            );
                          }}
                          onBlur={() => {
                            if (!errors.signIn.hasError) {
                              signIn(
                                eventID,
                                coachID,
                                signInTime,
                                "AWAITING_SIGN_OUT"
                              );
                            }
                          }}
                          className={classes.time}
                          error={errors.signIn.hasError}
                          helperText={errors.signIn.message}
                          InputLabelProps={{
                            shrink: true
                          }}
                          inputProps={{
                            step: 300
                          }}
                        />
                      </form>
                    )}
                    {!isAbsent && (
                      <form className={classes.timeWrapper}>
                        <TextField
                          id="time"
                          label="Signed out"
                          type="time"
                          disabled
                          className={classes.time}
                          InputLabelProps={{
                            shrink: true
                          }}
                          inputProps={{
                            step: 300
                          }}
                        />
                      </form>
                    )}
                  </div>
                  <div className={classes.buttonWrapper}>
                    {!isAbsent && (
                      <Button
                        raised
                        className={classes.signInButton}
                        onClick={() => {
                          const currentTime = moment();
                          if (
                            currentTime.isAfter(
                              eventInfo.requiredInfo.times.end
                            )
                          ) {
                            signIn(
                              eventID,
                              coachID,
                              eventInfo.requiredInfo.times.start,
                              "AWAITING_SIGN_OUT"
                            );
                          } else {
                            signIn(
                              eventID,
                              coachID,
                              currentTime.toDate(),
                              "AWAITING_SIGN_OUT"
                            );
                          }
                        }}
                      >
                        <SignInIcon /> Sign in
                      </Button>
                    )}
                    {!isAbsent && (
                      <Button
                        raised
                        className={classes.absentButton}
                        onClick={() => openMarkAbsentModal(eventID, coachID)}
                      >
                        <AbsentIcon /> Mark absent
                      </Button>
                    )}
                    {isAbsent && (
                      <Button
                        raised
                        className={classes.unmarkAbsentButton}
                        onClick={() => openUnmarkAbsentModal(eventID, coachID)}
                      >
                        <AbsentIcon /> Unmark absent
                      </Button>
                    )}
                  </div>
                </div>
              );
            case "AWAITING_SIGN_OUT":
              return (
                <div
                  className={classes.hoursWrapper}
                  key={`hours-${coachID}${eventID}`}
                >
                  <Typography
                    type="title"
                    component="h3"
                    className={classes.coachName}
                  >
                    {`${name} ${surname}`}
                  </Typography>
                  <img
                    alt={`${name} ${surname}`}
                    className={classes.profilePicture}
                    src={
                      profilePictureURL === ""
                        ? defaultProfilePicture
                        : profilePictureURL
                    }
                  />
                  <div className={classes.timesWrapper}>
                    <form className={classes.timeWrapper}>
                      <TextField
                        id="time"
                        label="Signed in"
                        type="time"
                        value={moment(signInTime).format("HH:mm")}
                        onChange={e => {
                          let signedInAt = new Date(
                            eventInfo.requiredInfo.times.start
                          );
                          signedInAt.setHours(e.target.value.slice(0, 2));
                          signedInAt.setMinutes(e.target.value.slice(3, 5));
                          this.updateCoachHours(
                            eventID,
                            coachID,
                            signedInAt,
                            signOutTime,
                            "AWAITING_SIGN_OUT"
                          );
                        }}
                        onBlur={() => {
                          if (!errors.signIn.hasError) {
                            signIn(
                              eventID,
                              coachID,
                              signInTime,
                              "AWAITING_SIGN_OUT"
                            );
                          }
                        }}
                        className={classes.time}
                        error={errors.signIn.hasError}
                        helperText={errors.signIn.message}
                        InputLabelProps={{
                          shrink: true
                        }}
                        inputProps={{
                          step: 300
                        }}
                      />
                    </form>
                    <form className={classes.timeWrapper}>
                      <TextField
                        id="time"
                        label="Signed out"
                        type="time"
                        onChange={e => {
                          let signedOutAt = new Date(
                            eventInfo.requiredInfo.times.start
                          );
                          signedOutAt.setHours(e.target.value.slice(0, 2));
                          signedOutAt.setMinutes(e.target.value.slice(3, 5));
                          this.updateCoachHours(
                            eventID,
                            coachID,
                            signInTime,
                            signedOutAt,
                            "AWAITING_APPROVAL"
                          );
                        }}
                        onBlur={() => {
                          if (!errors.signOut.hasError) {
                            signOut(
                              eventID,
                              coachID,
                              signOutTime,
                              "AWAITING_APPROVAL"
                            );
                          }
                        }}
                        className={classes.time}
                        error={errors.signOut.hasError}
                        helperText={errors.signOut.message}
                        InputLabelProps={{
                          shrink: true
                        }}
                        inputProps={{
                          step: 300
                        }}
                      />
                    </form>
                  </div>
                  <div className={classes.buttonWrapper}>
                    <Button
                      raised
                      className={classes.signOutButton}
                      disabled={errors.signIn.hasError}
                      onClick={() => {
                        const currentTime = moment();
                        const endOfEventDay = moment(
                          eventInfo.requiredInfo.times.end
                        ).endOf("day");
                        if (currentTime.isAfter(endOfEventDay)) {
                          signOut(
                            eventID,
                            coachID,
                            eventInfo.requiredInfo.times.end,
                            "AWAITING_APPROVAL"
                          );
                        } else {
                          signOut(
                            eventID,
                            coachID,
                            currentTime.toDate(),
                            "AWAITING_APPROVAL"
                          );
                        }
                      }}
                    >
                      <SignOutIcon /> Sign out
                    </Button>
                  </div>
                </div>
              );
            case "AWAITING_APPROVAL":
              return (
                <div
                  className={classes.hoursWrapper}
                  key={`hours-${coachID}${eventID}`}
                >
                  <Typography
                    type="title"
                    component="h3"
                    className={classes.coachName}
                  >
                    {`${name} ${surname}`}
                  </Typography>
                  <img
                    alt={`${name} ${surname}`}
                    className={classes.profilePicture}
                    src={
                      profilePictureURL === ""
                        ? defaultProfilePicture
                        : profilePictureURL
                    }
                  />
                  <div className={classes.timesWrapper}>
                    <form className={classes.timeWrapper}>
                      <TextField
                        id="time"
                        label="Signed in"
                        type="time"
                        value={moment(signInTime).format("HH:mm")}
                        onChange={e => {
                          let signedInAt = new Date(
                            eventInfo.requiredInfo.times.start
                          );
                          signedInAt.setHours(e.target.value.slice(0, 2));
                          signedInAt.setMinutes(e.target.value.slice(3, 5));
                          this.updateCoachHours(
                            eventID,
                            coachID,
                            signedInAt,
                            signOutTime,
                            "AWAITING_APPROVAL"
                          );
                        }}
                        onBlur={() => {
                          if (!errors.signIn.hasError) {
                            signIn(
                              eventID,
                              coachID,
                              signInTime,
                              "AWAITING_APPROVAL"
                            );
                          }
                        }}
                        className={classes.time}
                        error={errors.signIn.hasError}
                        helperText={errors.signIn.message}
                        InputLabelProps={{
                          shrink: true
                        }}
                        inputProps={{
                          step: 300
                        }}
                      />
                    </form>
                    <form className={classes.timeWrapper}>
                      <TextField
                        id="time"
                        label="Signed out"
                        type="time"
                        value={moment(signOutTime).format("HH:mm")}
                        onChange={e => {
                          let signedOutAt = new Date(
                            eventInfo.requiredInfo.times.start
                          );
                          signedOutAt.setHours(e.target.value.slice(0, 2));
                          signedOutAt.setMinutes(e.target.value.slice(3, 5));
                          this.updateCoachHours(
                            eventID,
                            coachID,
                            signInTime,
                            signedOutAt,
                            "AWAITING_APPROVAL"
                          );
                        }}
                        onBlur={() => {
                          if (!errors.signIn.hasError) {
                            signOut(
                              eventID,
                              coachID,
                              signOutTime,
                              "AWAITING_APPROVAL"
                            );
                          }
                        }}
                        className={classes.time}
                        error={errors.signOut.hasError}
                        helperText={errors.signOut.message}
                        InputLabelProps={{
                          shrink: true
                        }}
                        inputProps={{
                          step: 300
                        }}
                      />
                    </form>
                  </div>
                  <div className={classes.buttonWrapper}>
                    <Button
                      raised
                      className={classes.approveButton}
                      disabled={
                        errors.signIn.hasError || errors.signOut.hasError
                      }
                      onClick={() => {
                        approveHours(
                          institutionID,
                          eventID,
                          coachID,
                          staff[coachID].institutions[institutionID]
                            .paymentDefaults,
                          eventInfo,
                          moment(signInTime),
                          moment(signOutTime),
                          paymentDefaults.maxOvertimeHours
                        );
                        this.setState({
                          isOpen: false
                        });
                      }}
                    >
                      <ApproveIcon /> Approve
                    </Button>
                  </div>
                </div>
              );
            case "APPROVED":
              return (
                <div
                  className={classes.hoursWrapper}
                  key={`hours-${coachID}${eventID}`}
                >
                  <Typography
                    type="title"
                    component="h3"
                    className={classes.coachName}
                  >
                    {`${name} ${surname}`}
                  </Typography>
                  <img
                    alt={`${name} ${surname}`}
                    className={classes.profilePicture}
                    src={
                      profilePictureURL === ""
                        ? defaultProfilePicture
                        : profilePictureURL
                    }
                  />
                  <div className={classes.timesWrapper}>
                    <form className={classes.timeWrapper}>
                      <TextField
                        id="time"
                        label="Signed in"
                        type="time"
                        value={moment(signInTime).format("HH:mm")}
                        disabled
                        className={classes.time}
                        InputLabelProps={{
                          shrink: true
                        }}
                        inputProps={{
                          step: 300
                        }}
                      />
                    </form>
                    <form className={classes.timeWrapper}>
                      <TextField
                        id="time"
                        label="Signed out"
                        type="time"
                        value={moment(signOutTime).format("HH:mm")}
                        disabled
                        className={classes.time}
                        InputLabelProps={{
                          shrink: true
                        }}
                        inputProps={{
                          step: 300
                        }}
                      />
                    </form>
                  </div>
                  <div className={classes.buttonWrapper}>
                    <Button raised disabled className={classes.approvedButton}>
                      <ApproveIcon /> Approved
                    </Button>
                  </div>
                </div>
              );
            default:
              return (
                <Typography
                  type="body1"
                  component="p"
                  key={`hours-${coachID}${eventID}`}
                >
                  {`Invalid stage ${this.state.coaches[coachID].status}.`}
                </Typography>
              );
          }
        } else {
          console.log(`Could not find ${coachID} in list of coaches.`);
        }
      });
    }
  }

  toggleOpen() {
    const { isOpen } = this.state;

    this.setState({
      isOpen: !isOpen
    });
  }

  render() {
    const { classes, eventInfo, eventID } = this.props;
    const { isOpen } = this.state;

    const eventDate = moment(eventInfo.requiredInfo.times.start).format(
      "YYYY-MM-DD"
    );
    const startTime = moment(eventInfo.requiredInfo.times.start).format(
      "h:mm A"
    );
    const endTime = moment(eventInfo.requiredInfo.times.end).format("h:mm A");

    return (
      <div className={classes.rootWrapper}>
        <ListItem
          button
          className={classes.header}
          onClick={() => this.toggleOpen()}
        >
          <ListItemText
            primary={eventInfo.requiredInfo.title}
            secondary={`${startTime} - ${endTime}`}
          />
          {isOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse component="div" in={isOpen} timeout="auto" unmountOnExit>
          <Route
            render={({ history }) => (
              <Button
                className={classes.eventInfoButton}
                onClick={() =>
                  history.push(`/myaccount/schedule/${eventDate}/${eventID}`)}
              >
                View event info
              </Button>
            )}
          />
          <div className={classes.contentWrapper}>
            {this.renderCardContent()}
          </div>
        </Collapse>
      </div>
    );
  }
}

export default withStyles(styles)(HoursCard);
