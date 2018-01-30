/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import AbsentIcon from "material-ui-icons/Clear";
import ApproveIcon from "material-ui-icons/AssignmentTurnedIn";
import Button from "material-ui/Button";
import Collapse from "material-ui/transitions/Collapse";
import ExpandLess from "material-ui-icons/ExpandLess";
import ExpandMore from "material-ui-icons/ExpandMore";
import { green, grey, lightBlue, orange } from "material-ui/colors";
import { ListItem, ListItemText } from "material-ui/List";
import moment from "moment";
import { Route } from "react-router";
import SignInIcon from "material-ui-icons/AssignmentReturned";
import SignOutIcon from "material-ui-icons/AssignmentReturn";
import TextField from "material-ui/TextField";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";

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
  }
};

class HoursCard extends Component {
  state = {
    coaches: {},
    isOpen: false
  };

  componentWillMount() {
    const { eventInfo } = this.props;

    let coaches = {};
    let isOpen = false;
    _.toPairs(eventInfo.coaches).map(([coachID, coachInfo]) => {
      coaches[coachID] = {
        signInTime: coachInfo.hours.times.signIn,
        signOutTime: coachInfo.hours.times.signOut,
        status: coachInfo.hours.status
      };
      if (coachInfo.hours.status !== "APPROVED") {
        isOpen = true;
      }
      this.setState({
        coaches,
        isOpen
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    const { eventInfo } = nextProps;

    if (eventInfo !== this.props.eventInfo) {
      let coaches = {};
      _.toPairs(eventInfo.coaches).map(([coachID, coachInfo]) => {
        coaches[coachID] = {
          signInTime: coachInfo.hours.times.signIn,
          signOutTime: coachInfo.hours.times.signOut,
          status: coachInfo.hours.status
        };
      });
      this.setState({
        coaches
      });
    }
  }

  updateCoachHours(eventID, coachID, signInTime, signOutTime, status) {
    const { coaches } = this.state;

    this.setState({
      coaches: {
        ...coaches,
        [coachID]: {
          signInTime,
          signOutTime,
          status
        }
      }
    });
  }

  renderCardContent() {
    const { classes, eventInfo, eventID, staff, institutionID } = this.props;
    const { signIn, signOut, approveHours } = this.props.actions;

    return _.toPairs(eventInfo.coaches).map(([coachID, coachInfo]) => {
      const { profilePictureURL, name, surname } = staff[coachID].info;
      const signInTime = this.state.coaches[coachID].signInTime;
      const signOutTime = this.state.coaches[coachID].signOutTime;

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
                src={profilePictureURL}
                className={classes.profilePicture}
              />
              <div className={classes.timesWrapper}>
                <form className={classes.timeWrapper}>
                  <TextField
                    id="time"
                    label="Signed in"
                    type="time"
                    onChange={e => {
                      let signedInAt = eventInfo.requiredInfo.times.start;
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
                    onBlur={() =>
                      signIn(eventID, coachID, signInTime, "AWAITING_SIGN_OUT")}
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
                <Button
                  raised
                  className={classes.signInButton}
                  onClick={() => {
                    const currentTime = moment();
                    if (currentTime.isAfter(eventInfo.requiredInfo.times.end)) {
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
                <Button raised className={classes.absentButton}>
                  <AbsentIcon /> Mark absent
                </Button>
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
                src={profilePictureURL}
                className={classes.profilePicture}
              />
              <div className={classes.timesWrapper}>
                <form className={classes.timeWrapper}>
                  <TextField
                    id="time"
                    label="Signed in"
                    type="time"
                    value={moment(signInTime).format("HH:mm")}
                    onChange={e => {
                      let signedInAt = eventInfo.requiredInfo.times.start;
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
                    onBlur={() =>
                      signIn(eventID, coachID, signInTime, "AWAITING_SIGN_OUT")}
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
                    onChange={e => {
                      let signedOutAt = eventInfo.requiredInfo.times.start;
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
                    onBlur={() =>
                      signOut(
                        eventID,
                        coachID,
                        signOutTime,
                        "AWAITING_APPROVAL"
                      )}
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
                <Button
                  raised
                  className={classes.signOutButton}
                  onClick={() => {
                    const currentTime = moment();
                    if (currentTime.isAfter(eventInfo.requiredInfo.times.end)) {
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
                src={profilePictureURL}
                className={classes.profilePicture}
              />
              <div className={classes.timesWrapper}>
                <form className={classes.timeWrapper}>
                  <TextField
                    id="time"
                    label="Signed in"
                    type="time"
                    value={moment(signInTime).format("HH:mm")}
                    onChange={e => {
                      let signedInAt = eventInfo.requiredInfo.times.start;
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
                    onBlur={() =>
                      signIn(eventID, coachID, signInTime, "AWAITING_APPROVAL")}
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
                    onChange={e => {
                      let signedOutAt = eventInfo.requiredInfo.times.start;
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
                    onBlur={() =>
                      signOut(
                        eventID,
                        coachID,
                        signOutTime,
                        "AWAITING_APPROVAL"
                      )}
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
                <Button
                  raised
                  className={classes.approveButton}
                  onClick={() =>
                    approveHours(
                      institutionID,
                      eventID,
                      coachID,
                      staff[coachID].institutions[institutionID]
                        .paymentDefaults,
                      eventInfo,
                      moment(signInTime),
                      moment(signOutTime)
                    )}
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
                src={profilePictureURL}
                className={classes.profilePicture}
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
    });
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
