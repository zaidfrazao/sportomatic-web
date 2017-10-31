import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import { grey } from "material-ui/colors";
import Button from "material-ui/Button";
import Card, { CardHeader } from "material-ui/Card";
import List, { ListItem, ListItemText } from "material-ui/List";
import SignInIcon from "material-ui-icons/AssignmentReturned";
import SignOutIcon from "material-ui-icons/AssignmentReturn";
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
    margin: 24
  },
  cardContent: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row"
  },
  loggerWrapper: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: grey[50]
  },
  button: {
    width: "100%",
    height: 60,
    color: grey[50]
  },
  timeWrapper: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    margin: "24px 0"
  },
  eventInfoWrapper: {
    width: "40%",
    backgroundColor: grey[100],
    overflow: "auto"
  },
  moreInfoButton: {
    width: "100%"
  }
};

class TimeLogger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoursLogged: 0,
      minutesLogged: 0,
      secondsLogged: 0
    };
  }

  componentWillMount() {
    const { status, signInTime } = this.props.coachInfo;

    if (status === "AWAITING_SIGN_OUT") {
      const currentDate = new Date(Date.now());
      const currentTimeValue = currentDate.getTime();
      let signInTimeValue = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        signInTime.slice(0, 2),
        signInTime.slice(3, 5)
      );
      signInTimeValue = signInTimeValue.getTime();
      const millisecondsLogged = currentTimeValue - signInTimeValue;

      const hoursLogged = Math.floor(millisecondsLogged / 1000 / 60 / 60);
      const minutesLogged = Math.floor(
        (millisecondsLogged - hoursLogged * 1000 * 60 * 60) / 1000 / 60
      );
      const secondsLogged = Math.floor(
        (millisecondsLogged -
          (hoursLogged * 1000 * 60 * 60 + minutesLogged * 1000 * 60)) /
          1000
      );

      this.setState({
        hoursLogged,
        minutesLogged,
        secondsLogged
      });

      this.interval = setInterval(() => this.tick(), 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    this.setState(prevState => {
      if (prevState.secondsLogged === 59) {
        if (prevState.minutesLogged === 59) {
          return {
            hoursLogged: prevState.hoursLogged + 1,
            minutesLogged: 0,
            secondsLogged: 0
          };
        } else {
          return {
            minutesLogged: prevState.minutesLogged + 1,
            secondsLogged: 0
          };
        }
      } else {
        return { secondsLogged: prevState.secondsLogged + 1 };
      }
    });
  }

  renderButton() {
    const { classes, info, institutionID } = this.props;
    const { status, id } = this.props.coachInfo;
    const { signIn, signOut } = this.props.actions;

    let currentTime = new Date(Date.now());
    currentTime.setHours(currentTime.getHours() + 2);
    currentTime = currentTime.toISOString().slice(11, 16);

    switch (status) {
      case "AWAITING_SIGN_IN":
        return (
          <Button
            raised
            color="primary"
            className={classes.button}
            onClick={() => signIn(institutionID, info, id, currentTime)}
          >
            <SignInIcon /> Sign in
          </Button>
        );
      case "AWAITING_SIGN_OUT":
        return (
          <Button
            raised
            color="accent"
            className={classes.button}
            onClick={() => signOut(institutionID, info, id, currentTime)}
          >
            <SignOutIcon /> Sign out
          </Button>
        );
      default:
        return <Typography>Error</Typography>;
    }
  }

  render() {
    const { classes, isTablet, info } = this.props;
    const { secondsLogged, minutesLogged, hoursLogged } = this.state;

    const timeOptions = { hour: "2-digit", minute: "2-digit" };
    const startTime = info.startTime;
    const endTime = info.endTime;
    const timeLogged = `${hoursLogged.toLocaleString("en", {
      minimumIntegerDigits: 2
    })}:${minutesLogged.toLocaleString("en", {
      minimumIntegerDigits: 2
    })}:${secondsLogged.toLocaleString("en", { minimumIntegerDigits: 2 })}`;

    return (
      <div className={classes.root}>
        {isTablet ? (
          <Card className={classes.cardWrapper}>
            <CardHeader
              title={info.eventTitle}
              subheader={`${startTime} - ${endTime}`}
            />
            <div className={classes.cardContent}>
              <div className={classes.loggerWrapper}>
                <Button>View more event info</Button>
                <div className={classes.timeWrapper}>
                  <Typography type="display2" component="p">
                    {timeLogged}
                  </Typography>
                </div>
                {this.renderButton()}
              </div>
            </div>
          </Card>
        ) : (
          <Card className={classes.cardWrapper}>
            <CardHeader title={info.eventTitle} />
            <div className={classes.cardContent}>
              <div className={classes.loggerWrapper}>
                <div className={classes.timeWrapper}>
                  <div>
                    <Typography type="subheading" component="h3">
                      Time logged
                    </Typography>
                    <Typography type="display3" component="p">
                      {timeLogged}
                    </Typography>
                  </div>
                </div>
                {this.renderButton()}
              </div>
              <div className={classes.eventInfoWrapper}>
                <Route
                  component={({ history }) => (
                    <Button
                      className={classes.moreInfoButton}
                      onClick={() =>
                        history.push(
                          `/coach/schedule/${info.date}/${info.eventID}`
                        )}
                    >
                      View more event info
                    </Button>
                  )}
                />
                <List>
                  <ListItem>
                    <ListItemText primary="Starts at" secondary={startTime} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Ends as" secondary={endTime} />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Notes"
                      secondary={info.notes === "" ? "No notes" : info.notes}
                    />
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
