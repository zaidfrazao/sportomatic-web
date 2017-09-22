// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { green, grey, lightBlue, orange } from "material-ui/colors";
import ApproveIcon from "material-ui-icons/AssignmentTurnedIn";
import Button from "material-ui/Button";
import Card, { CardHeader } from "material-ui/Card";
import List, { ListItem, ListItemText } from "material-ui/List";
import SignInIcon from "material-ui-icons/AssignmentReturned";
import SignOutIcon from "material-ui-icons/AssignmentReturn";
import TextField from "material-ui/TextField";
import Typography from "material-ui/Typography";

const styles = {
  root: {
    flexGrow: 1,
    display: "flex",
    maxHeight: 600
  },
  cardWrapper: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    margin: "0 24px 24px 24px"
  },
  cardContent: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row"
  },
  mobileCard: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    margin: "0 24px 24px 24px"
  },
  mobileCardContent: {
    flexGrow: 1,
    overflow: "auto"
  },
  loggerWrapper: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: grey[50],
    overflow: "auto"
  },
  button: {
    width: "100%",
    height: 60,
    color: grey[50]
  },
  eventInfoWrapper: {
    width: "40%",
    backgroundColor: grey[100],
    overflow: "auto"
  },
  moreInfoButton: {
    width: "100%"
  },
  hoursWrapper: {
    display: "flex",
    alignItems: "stretch",
    flexWrap: "wrap",
    margin: 20
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
    height: 60
  },
  profilePicture: {
    border: `1px solid ${grey[300]}`,
    display: "none",
    "@media (min-width: 1100px)": {
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
    "@media (min-width: 1100px)": {
      display: "none"
    }
  }
};

class TimeLogger extends Component {
  renderLogger() {
    const { classes } = this.props;
    const { coaches } = this.props.info;

    return coaches.map((coachHours, index) => {
      const {
        stage,
        signInTime,
        signOutTime,
        profilePictureURL,
        name
      } = coachHours;
      switch (stage) {
        case "AWAITING_SIGN_IN":
          return (
            <div key={index} className={classes.hoursWrapper}>
              <img
                alt={name}
                src={profilePictureURL}
                className={classes.profilePicture}
              />
              <Typography
                type="subheading"
                component="h3"
                className={classes.coachName}
              >
                {name}
              </Typography>
              <div className={classes.timesWrapper}>
                <div className={classes.timeWrapper}>
                  <TextField
                    id="time"
                    label="Signed in at"
                    type="time"
                    className={classes.time}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </div>
                <div className={classes.timeWrapper}>
                  <TextField
                    id="time"
                    label="Signed out at"
                    type="time"
                    className={classes.time}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </div>
              </div>
              <div className={classes.buttonWrapper}>
                <Button raised className={classes.signInButton}>
                  <SignInIcon /> Sign in
                </Button>
              </div>
            </div>
          );
        case "AWAITING_SIGN_OUT":
          return (
            <div key={index} className={classes.hoursWrapper}>
              <img
                alt={name}
                src={profilePictureURL}
                className={classes.profilePicture}
              />
              <Typography
                type="subheading"
                component="h3"
                className={classes.coachName}
              >
                {name}
              </Typography>
              <div className={classes.timesWrapper}>
                <div className={classes.timeWrapper}>
                  <TextField
                    id="time"
                    label="Signed in at"
                    type="time"
                    defaultValue={signInTime}
                    className={classes.time}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </div>
                <div className={classes.timeWrapper}>
                  <TextField
                    id="time"
                    label="Signed out at"
                    type="time"
                    className={classes.time}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </div>
              </div>
              <div className={classes.buttonWrapper}>
                <Button raised className={classes.signOutButton}>
                  <SignOutIcon /> Sign out
                </Button>
              </div>
            </div>
          );
        case "AWAITING_APPROVAL":
          return (
            <div key={index} className={classes.hoursWrapper}>
              <img
                alt={name}
                src={profilePictureURL}
                className={classes.profilePicture}
              />
              <Typography
                type="subheading"
                component="h3"
                className={classes.coachName}
              >
                {name}
              </Typography>
              <div className={classes.timesWrapper}>
                <div className={classes.timeWrapper}>
                  <TextField
                    id="time"
                    label="Signed in at"
                    type="time"
                    defaultValue={signInTime}
                    className={classes.time}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </div>
                <div className={classes.timeWrapper}>
                  <TextField
                    id="time"
                    label="Signed out at"
                    type="time"
                    defaultValue={signOutTime}
                    className={classes.time}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </div>
              </div>
              <div className={classes.buttonWrapper}>
                <Button raised className={classes.approveButton}>
                  <ApproveIcon /> Approve
                </Button>
              </div>
            </div>
          );
        default:
          return (
            <Typography type="body1" component="p" key={index}>
              Invalid stage supplied.
            </Typography>
          );
      }
    });
  }

  render() {
    const { classes, isTablet, info } = this.props;

    const timeOptions = { hour: "2-digit", minute: "2-digit" };
    const startTime = new Date(info.startTime).toLocaleTimeString(
      "en-US",
      timeOptions
    );
    const endTime = new Date(info.endTime).toLocaleTimeString(
      "en-US",
      timeOptions
    );

    return (
      <div className={classes.root}>
        {isTablet ? (
          <Card className={classes.mobileCard}>
            <CardHeader
              title={info.eventTitle}
              subheader={`${startTime} - ${endTime}`}
            />
            <div className={classes.mobileCardContent}>
              <Button>View more event info</Button>
              {this.renderLogger()}
            </div>
          </Card>
        ) : (
          <Card className={classes.cardWrapper}>
            <CardHeader title={info.eventTitle} />
            <div className={classes.cardContent}>
              <div className={classes.loggerWrapper}>{this.renderLogger()}</div>
              <div className={classes.eventInfoWrapper}>
                <Button className={classes.moreInfoButton}>
                  View more event info
                </Button>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Type"
                      secondary={info.eventTypeName}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Starts at" secondary={startTime} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Ends as" secondary={endTime} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Venue" secondary={info.venue} />
                  </ListItem>
                  {info.eventType === "COMPETITIVE" && (
                    <div>
                      <ListItem>
                        <ListItemText
                          primary="Home / away"
                          secondary={info.matchInfo.homeAway}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Opponents"
                          secondary={info.matchInfo.opponents}
                        />
                      </ListItem>
                    </div>
                  )}
                  <ListItem>
                    <ListItemText primary="Notes" secondary={info.notes} />
                  </ListItem>
                </List>
              </div>
            </div>
          </Card>
        )}
      </div>
    );
  }
}

TimeLogger.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TimeLogger);
