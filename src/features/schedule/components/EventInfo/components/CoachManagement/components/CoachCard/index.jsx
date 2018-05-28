import React, { Component } from "react";
import injectStyles from "react-jss";
import moment from "moment";
import {
  common,
  green,
  grey,
  orange,
  red
} from "../../../../../../../../utils/colours";
import Button from "../../../../../../../../components/Button";
import EditTimesDialog from "./components/EditTimesDialog";
import defaultProfilePicture from "./images/default-profile-picture.png";
import MarkAbsentDialog from "./components/MarkAbsentDialog";

const styles = {
  absentBadWrapper: {
    borderRadius: 16,
    textAlign: "center",
    border: `2px solid ${red[500]}`,
    margin: 12,
    padding: "24px 12px",
    color: red[500]
  },
  absentWrapper: {
    borderRadius: 16,
    textAlign: "center",
    border: `2px solid ${grey[400]}`,
    margin: 12,
    padding: "24px 12px",
    color: grey[400]
  },
  approvedWrapper: {
    borderRadius: "0 0 16px 16px",
    textAlign: "center",
    padding: "24px 0",
    fontWeight: "bold",
    color: grey[500],
    backgroundColor: grey[300]
  },
  buttonDisabledWrapper: {
    borderRadius: "0 0 16px 16px",
    backgroundColor: grey[300]
  },
  buttonPrimaryWrapper: {
    borderRadius: "0 0 16px 16px",
    backgroundColor: orange["A400"],
    "&:hover": {
      backgroundColor: orange["A200"]
    }
  },
  buttonSecondaryWrapper: {
    padding: 12
  },
  card: {
    border: `1px solid ${grey[300]}`,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    borderRadius: 16,
    backgroundColor: common["white"]
  },
  deltaNegative: {
    fontWeight: "bold",
    padding: 8,
    borderRadius: 8,
    fontSize: 12,
    margin: "0 12px",
    backgroundColor: red[500],
    color: common["white"]
  },
  deltaPositive: {
    fontWeight: "bold",
    padding: 8,
    borderRadius: 8,
    fontSize: 12,
    margin: "0 12px",
    backgroundColor: green[500],
    color: common["white"]
  },
  header: {
    borderBottom: `1px solid ${grey[300]}`,
    fontSize: 18,
    borderRadius: "16px 16px 0 0",
    padding: 12,
    width: "calc(100% - 24px)",
    fontWeight: "bold",
    color: grey[800],
    backgroundColor: grey[100],
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    marginRight: 12
  },
  picture: {
    marginRight: 12,
    borderRadius: "50%",
    width: 40,
    height: 40
  },
  timesIconWrapper: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    backgroundColor: grey[100],
    width: 80,
    padding: "24px 0"
  },
  timesText: {
    flex: 1,
    paddingLeft: 12,
    color: grey[700]
  },
  timesWrapper: {
    borderBottom: `1px solid ${grey[100]}`,
    display: "flex",
    alignItems: "center"
  }
};

class CoachCard extends Component {
  state = {
    isEditTimesDialogOpen: false,
    isMarkAbsentDialogOpen: false
  };

  toggleEditTimesDialog() {
    const { isEditTimesDialogOpen } = this.state;

    this.setState({
      isEditTimesDialogOpen: !isEditTimesDialogOpen
    });
  }

  toggleMarkAbsentDialog() {
    this.setState({
      isMarkAbsentDialogOpen: !this.state.isMarkAbsentDialogOpen
    });
  }

  getWages() {
    const { isCompetitive, wageSettings, hours, eventTimes } = this.props;
    const { type, rates } = wageSettings;

    if (type === "HOURLY") {
      const signInMoment = moment(hours.times.signIn);
      const eventStartMoment = moment(eventTimes.start);
      const signOutMoment = moment(hours.times.signOut);
      const eventEndMoment = moment(eventTimes.end);

      let standardHours = 0;
      let overtimeHours = 0;

      if (eventStartMoment.isBefore(signInMoment)) {
        if (eventEndMoment.isBefore(signOutMoment)) {
          standardHours = Math.round(
            eventEndMoment.diff(signInMoment, "hours", true)
          );
          overtimeHours = Math.round(
            signOutMoment.diff(eventEndMoment, "hours", true)
          );
        } else {
          standardHours = Math.round(
            signOutMoment.diff(signInMoment, "hours", true)
          );
        }
      } else {
        if (eventEndMoment.isBefore(signOutMoment)) {
          standardHours = Math.round(
            eventEndMoment.diff(eventStartMoment, "hours", true)
          );
          overtimeHours = Math.round(
            signOutMoment.diff(eventEndMoment, "hours", true)
          );
        } else {
          standardHours = Math.round(
            signOutMoment.diff(eventStartMoment, "hours", true)
          );
        }
      }

      const wage =
        standardHours * rates.standard + overtimeHours * rates.overtime;

      return wage;
    } else if (type === "FIXED") {
      let wage = rates.nonCompetitive;

      if (isCompetitive) {
        wage = rates.competitive;
      }

      return wage;
    } else {
      return 0;
    }
  }

  getTimes() {
    const { hours, eventTimes } = this.props;

    const signInMoment = moment(hours.times.signIn);
    const eventStartMoment = moment(eventTimes.start);
    const startDiff = signInMoment.diff(eventStartMoment, "minutes");
    const startSymbol = startDiff <= 0 ? "-" : "+";

    const signOutMoment = moment(hours.times.signOut);
    const eventEndMoment = moment(eventTimes.end);
    const endDiff = signOutMoment.diff(eventEndMoment, "minutes");
    const endSymbol = endDiff <= 0 ? "-" : "+";

    switch (hours.status) {
      case "AWAITING_SIGN_OUT":
        return {
          signIn: signInMoment.format("h:mm A"),
          signOut: "Not signed out",
          signInDelta: {
            show: true,
            text: `${startSymbol}${Math.abs(startDiff)} min`,
            positive: startDiff <= 0
          },
          signOutDelta: {
            show: false,
            text: "",
            positive: false
          }
        };
      case "AWAITING_APPROVAL":
      case "APPROVED":
        return {
          signIn: signInMoment.format("h:mm A"),
          signOut: signOutMoment.format("h:mm A"),
          signInDelta: {
            show: true,
            text: `${startSymbol}${Math.abs(startDiff)} min`,
            positive: startDiff <= 0
          },
          signOutDelta: {
            show: true,
            text: `${endSymbol}${Math.abs(endDiff)} min`,
            positive: endDiff <= 0
          }
        };
      default:
        return {
          signIn: "Not signed in",
          signOut: "Not signed out",
          signInDelta: {
            show: false,
            text: "",
            positive: false
          },
          signOutDelta: {
            show: false,
            text: "",
            positive: false
          }
        };
    }
  }

  getSignInTime() {
    const { eventTimes } = this.props;

    const eventEndMoment = moment(eventTimes.end);
    const currentMoment = moment(new Date(Date.now()));

    if (currentMoment.isAfter(eventEndMoment)) {
      return eventTimes.start;
    } else {
      return currentMoment.toDate();
    }
  }

  getSignOutTime() {
    const { eventTimes } = this.props;

    const maxOvertimeMoment = moment(eventTimes.end).add(3, "hours");
    const currentMoment = moment(new Date(Date.now()));

    if (currentMoment.isAfter(maxOvertimeMoment)) {
      return eventTimes.end;
    } else {
      return currentMoment.toDate();
    }
  }

  getSecondaryAction() {
    const {
      classes,
      hours,
      name,
      eventTimes,
      updateTimes,
      updateAbsent,
      coachID
    } = this.props;
    const { isEditTimesDialogOpen, isMarkAbsentDialogOpen } = this.state;

    if (hours.status === "AWAITING_SIGN_IN") {
      return (
        <div className={classes.buttonSecondaryWrapper}>
          <Button
            colour="secondary"
            slim
            fullWidth
            handleClick={() => this.toggleMarkAbsentDialog()}
          >
            Mark absent
          </Button>
          <MarkAbsentDialog
            isOpen={isMarkAbsentDialogOpen}
            name={name}
            closeDialog={() => this.toggleMarkAbsentDialog()}
            updateAbsent={rating => updateAbsent(coachID, rating)}
          />
        </div>
      );
    } else {
      return (
        <div className={classes.buttonSecondaryWrapper}>
          <Button
            colour="secondary"
            slim
            fullWidth
            handleClick={() => this.toggleEditTimesDialog()}
          >
            Edit times
          </Button>
          <EditTimesDialog
            isOpen={isEditTimesDialogOpen}
            name={name}
            status={hours.status}
            signInTime={hours.times.signIn}
            signOutTime={hours.times.signOut}
            eventTimes={eventTimes}
            closeDialog={() => this.toggleEditTimesDialog()}
            updateTimes={(signInTime, signOutTime) =>
              updateTimes(coachID, signInTime, signOutTime)}
          />
        </div>
      );
    }
  }

  checkIfSignInDisabled() {
    const { eventTimes } = this.props;

    const minSignInMoment = moment(eventTimes.start).subtract(1, "hour");
    const currentMoment = moment(new Date(Date.now()));

    return currentMoment.isBefore(minSignInMoment);
  }

  getPrimaryAction() {
    const {
      classes,
      coachID,
      hours,
      signIn,
      signOut,
      approveHours,
      wageSettings
    } = this.props;

    switch (hours.status) {
      case "AWAITING_SIGN_IN":
        const signInTime = this.getSignInTime();
        const disableSignIn = this.checkIfSignInDisabled();

        return (
          <div
            className={
              disableSignIn
                ? classes.buttonDisabledWrapper
                : classes.buttonPrimaryWrapper
            }
          >
            <Button
              colour="secondary"
              filled
              fullWidth
              disabled={disableSignIn}
              handleClick={() => signIn(coachID, signInTime)}
            >
              {disableSignIn ? "Too early to sign in" : "Sign in"}
            </Button>
          </div>
        );
      case "AWAITING_SIGN_OUT":
        const signOutTime = this.getSignOutTime();

        return (
          <div className={classes.buttonPrimaryWrapper}>
            <Button
              colour="secondary"
              filled
              fullWidth
              handleClick={() => signOut(coachID, signOutTime)}
            >
              Sign out
            </Button>
          </div>
        );
      case "AWAITING_APPROVAL":
        const wage = this.getWages();
        const shouldCreateWage =
          wageSettings.type === "HOURLY" || wageSettings.type === "FIXED";

        return (
          <div className={classes.buttonPrimaryWrapper}>
            <Button
              colour="secondary"
              filled
              fullWidth
              handleClick={() =>
                approveHours(
                  coachID,
                  shouldCreateWage,
                  wage,
                  wageSettings.type
                )}
            >
              Approve
            </Button>
          </div>
        );
      default:
        return (
          <div className={classes.approvedWrapper}>
            <i className={`fas fa-check ${classes.icon}`} />Approved
          </div>
        );
    }
  }

  render() {
    const { classes, name, profilePicture, hours, absenteeism } = this.props;

    const times = this.getTimes();
    const primaryAction = this.getPrimaryAction();
    const secondaryAction = this.getSecondaryAction();

    return (
      <div className={classes.card}>
        <div className={classes.header}>
          <img
            className={classes.picture}
            src={profilePicture === "" ? defaultProfilePicture : profilePicture}
            alt={name}
          />
          {name}
        </div>
        {!absenteeism.isAbsent && (
          <div className={classes.timesWrapper}>
            <div className={classes.timesIconWrapper}>
              <span>Sign in</span>
            </div>
            <span className={classes.timesText}>{times.signIn}</span>
            {times.signInDelta.show && (
              <span
                className={
                  times.signInDelta.positive
                    ? classes.deltaPositive
                    : classes.deltaNegative
                }
              >
                {times.signInDelta.text}
              </span>
            )}
          </div>
        )}
        {!absenteeism.isAbsent && (
          <div className={classes.timesWrapper}>
            <div className={classes.timesIconWrapper}>
              <span>Sign out</span>
            </div>
            <span className={classes.timesText}>{times.signOut}</span>
            {times.signOutDelta.show && (
              <span
                className={
                  times.signOutDelta.positive
                    ? classes.deltaPositive
                    : classes.deltaNegative
                }
              >
                {times.signOutDelta.text}
              </span>
            )}
          </div>
        )}
        {hours.status !== "APPROVED" &&
          !absenteeism.isAbsent &&
          secondaryAction}
        {absenteeism.isAbsent &&
          (absenteeism.rating === "GOOD" ? (
            <div className={classes.absentWrapper}>
              <i className={`fas fa-thumbs-up ${classes.icon}`} />Absent with
              excuse
            </div>
          ) : (
            <div className={classes.absentBadWrapper}>
              <i className={`fas fa-thumbs-down ${classes.icon}`} />Absent
              without excuse
            </div>
          ))}
        {!absenteeism.isAbsent && primaryAction}
      </div>
    );
  }
}

export default injectStyles(styles)(CoachCard);
