import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { green, grey, lightBlue, orange } from "material-ui/colors";
import ApproveIcon from "material-ui-icons/AssignmentTurnedIn";
import Button from "material-ui/Button";
import Card, { CardContent, CardHeader } from "material-ui/Card";
import SignInIcon from "material-ui-icons/AssignmentReturned";
import SignOutIcon from "material-ui-icons/AssignmentReturn";
import TextField from "material-ui/TextField";
import Typography from "material-ui/Typography";

const styles = {
  root: {
    maxWidth: 970,
    margin: "24px auto"
  },
  tabletRoot: {
    margin: 24
  },
  hoursWrapper: {
    display: "flex",
    alignItems: "stretch",
    flexWrap: "wrap",
    margin: "10px 0"
  },
  timesWrapper: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    backgroundColor: grey[100],
    border: `1px solid ${grey[300]}`,
    padding: 0
  },
  timeWrapper: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  time: {
    fontSize: "1.6rem",
    margin: 24
  },
  signInButton: {
    backgroundColor: lightBlue[500],
    color: grey[50],
    width: "100%",
    height: "100%"
  },
  signOutButton: {
    backgroundColor: orange[500],
    color: grey[50],
    width: "100%",
    height: "100%"
  },
  approveButton: {
    backgroundColor: green[500],
    color: grey[50],
    width: "100%",
    height: "100%"
  },
  buttonWrapper: {
    width: "100%",
    height: 60,
    "@media (min-width: 904px)": {
      width: 200,
      height: 140
    }
  },
  profilePicture: {
    border: `1px solid ${grey[300]}`,
    display: "none",
    "@media (min-width: 704px)": {
      display: "block",
      height: 140,
      width: 140
    }
  },
  coachName: {
    border: `1px solid ${grey[300]}`,
    display: "block",
    width: "100%",
    padding: 10,
    textAlign: "center",
    "@media (min-width: 704px)": {
      display: "none"
    }
  }
};

class HoursCard extends Component {
  renderCardContent() {
    const { classes, eventInfo, institutionID } = this.props;
    const { signIn, signOut } = this.props.actions;
    const {
      status,
      signInTime,
      signOutTime,
      name,
      surname,
      coachID
    } = this.props.coachInfo;

    let currentTime = new Date(Date.now());
    currentTime.setHours(currentTime.getHours() + 2);
    currentTime = currentTime.toISOString().slice(11, 16);

    switch (status) {
      case "AWAITING_SIGN_IN":
        return (
          <div className={classes.hoursWrapper}>
            <div className={classes.timesWrapper}>
              <div className={classes.timeWrapper}>
                <TextField
                  id="time"
                  label="Signed in"
                  type="time"
                  value={signInTime}
                  disabled
                  className={classes.time}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </div>
              <div className={classes.timeWrapper}>
                <TextField
                  id="time"
                  label="Signed out"
                  type="time"
                  value={signOutTime}
                  disabled
                  className={classes.time}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </div>
            </div>
            <div className={classes.buttonWrapper}>
              <Button
                raised
                className={classes.signInButton}
                onClick={() => {
                  if (currentTime > eventInfo.endTime) {
                    signIn(
                      institutionID,
                      eventInfo,
                      coachID,
                      eventInfo.startTime
                    );
                  } else {
                    signIn(institutionID, eventInfo, coachID, currentTime);
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
              <div className={classes.timeWrapper}>
                <TextField
                  id="time"
                  label="Signed in"
                  type="time"
                  value={signInTime}
                  disabled
                  className={classes.time}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </div>
              <div className={classes.timeWrapper}>
                <TextField
                  id="time"
                  label="Signed out"
                  type="time"
                  value={signOutTime}
                  disabled
                  className={classes.time}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </div>
            </div>
            <div className={classes.buttonWrapper}>
              <Button
                raised
                className={classes.signOutButton}
                onClick={() => {
                  if (currentTime > eventInfo.endTime) {
                    signOut(
                      institutionID,
                      eventInfo,
                      coachID,
                      eventInfo.endTime
                    );
                  } else {
                    signOut(institutionID, eventInfo, coachID, currentTime);
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
              <div className={classes.timeWrapper}>
                <TextField
                  id="time"
                  label="Signed in"
                  type="time"
                  value={signInTime}
                  disabled
                  className={classes.time}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </div>
              <div className={classes.timeWrapper}>
                <TextField
                  id="time"
                  label="Signed out"
                  type="time"
                  value={signOutTime}
                  disabled
                  className={classes.time}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </div>
            </div>
            <div className={classes.buttonWrapper}>
              <Button raised className={classes.approveButton} disabled>
                <ApproveIcon /> Awaiting Approval
              </Button>
            </div>
          </div>
        );
      default:
        return (
          <Typography type="body1" component="p">
            Invalid stage supplied.
          </Typography>
        );
    }
  }

  render() {
    const { classes, eventInfo, isTablet } = this.props;
    const dateOptions = {
      month: "short",
      day: "numeric",
      year: "numeric"
    };

    return (
      <div className={isTablet ? classes.tabletRoot : classes.root}>
        <Card>
          <CardHeader
            title={eventInfo.eventTitle}
            subheader={`${new Date(eventInfo.date).toLocaleDateString(
              "en-US",
              dateOptions
            )} | ${eventInfo.startTime} to ${eventInfo.endTime}`}
          />
          <CardContent>{this.renderCardContent()}</CardContent>
        </Card>
      </div>
    );
  }
}

HoursCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HoursCard);
