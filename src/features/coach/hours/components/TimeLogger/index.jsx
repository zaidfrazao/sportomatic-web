// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
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
    margin: "0 24px 24px 24px"
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
    justifyContent: "center"
  },
  eventInfoWrapper: {
    width: "40%",
    backgroundColor: grey[100]
  },
  moreInfoButton: {
    width: "100%"
  }
};

class TimeLogger extends Component {
  renderButton() {
    const { classes } = this.props;
    const { stage } = this.props.info;

    switch (stage) {
      case "AWAITING_SIGN_IN":
        return (
          <Button raised color="primary" className={classes.button}>
            <SignInIcon /> Sign in
          </Button>
        );
      case "AWAITING_SIGN_OUT":
        return (
          <Button raised color="accent" className={classes.button}>
            <SignOutIcon /> Sign out
          </Button>
        );
      default:
        return <Typography>Error</Typography>;
    }
  }

  render() {
    const { classes, isMobile, info } = this.props;

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
        {isMobile ? (
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
                    00:00:00
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
                  <Typography type="display3" component="p">
                    00:00:00
                  </Typography>
                </div>
                {this.renderButton()}
              </div>
              <div className={classes.eventInfoWrapper}>
                <Button className={classes.moreInfoButton}>
                  View more event info
                </Button>
                <List>
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
