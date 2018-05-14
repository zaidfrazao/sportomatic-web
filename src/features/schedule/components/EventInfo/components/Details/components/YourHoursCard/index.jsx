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

const styles = {
  approvedWrapper: {
    borderRadius: "0 0 16px 16px",
    textAlign: "center",
    padding: "24px 0",
    color: grey[900],
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
  card: {
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
    fontSize: 18,
    borderRadius: "16px 16px 0 0",
    padding: "18px 0",
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    color: grey[800],
    backgroundColor: grey[100]
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
    borderTop: `1px solid ${grey[100]}`,
    display: "flex",
    alignItems: "center"
  }
};

class YourHoursCard extends Component {
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

  checkIfSignInDisabled() {
    const { eventTimes } = this.props;

    const minSignInMoment = moment(eventTimes.start).subtract(1, "hour");
    const currentMoment = moment(new Date(Date.now()));

    return currentMoment.isBefore(minSignInMoment);
  }

  getPrimaryAction() {
    const { classes, coachID, hours, signIn, signOut } = this.props;

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
        return (
          <div className={classes.buttonDisabledWrapper}>
            <Button colour="secondary" filled fullWidth disabled>
              Awaiting approval
            </Button>
          </div>
        );
      default:
        return <div className={classes.approvedWrapper}>Approved</div>;
    }
  }

  render() {
    const { classes } = this.props;

    const times = this.getTimes();
    const primaryAction = this.getPrimaryAction();

    return (
      <div className={classes.card}>
        <div className={classes.header}>Your Hours</div>
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
        {primaryAction}
      </div>
    );
  }
}

export default injectStyles(styles)(YourHoursCard);
