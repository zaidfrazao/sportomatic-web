// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { grey } from "material-ui/colors";
import Card, { CardContent, CardHeader } from "material-ui/Card";
import Typography from "material-ui/Typography";

const styles = {
  root: {
    maxWidth: 970,
    margin: "24px auto"
  },
  tabletRoot: {
    margin: 24
  },
  timesWrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    backgroundColor: grey[100],
    border: `1px solid ${grey[300]}`
  },
  timeWrapper: {
    textAlign: "center",
    margin: 40
  },
  time: {
    fontSize: "1.8rem",
    margin: 24
  }
};

class HoursCard extends Component {
  renderCardContent() {
    const { classes } = this.props;
    const { stage, signInTime, signOutTime } = this.props.info;

    switch (stage) {
      case "AWAITING_SIGN_IN":
        return (
          <CardContent className={classes.timesWrapper}>
            <div className={classes.timeWrapper}>
              <Typography type="subheading" component="h3">
                Signed in at
              </Typography>
              <Typography type="body1" component="p" className={classes.time}>
                N/A
              </Typography>
            </div>
            <div className={classes.timeWrapper}>
              <Typography type="subheading" component="h3">
                Signed out at
              </Typography>
              <Typography type="body1" component="p" className={classes.time}>
                N/A
              </Typography>
            </div>
          </CardContent>
        );
      case "AWAITING_SIGN_OUT":
        return (
          <CardContent className={classes.timesWrapper}>
            <div className={classes.timeWrapper}>
              <Typography type="subheading" component="h3">
                Signed in at
              </Typography>
              <Typography type="body1" component="p" className={classes.time}>
                {signInTime}
              </Typography>
            </div>
            <div className={classes.timeWrapper}>
              <Typography type="subheading" component="h3">
                Signed out at
              </Typography>
              <Typography type="body1" component="p" className={classes.time}>
                N/A
              </Typography>
            </div>
          </CardContent>
        );
      case "AWAITING_APPROVAL":
        return (
          <CardContent className={classes.timesWrapper}>
            <div className={classes.timeWrapper}>
              <Typography type="subheading" component="h3">
                Signed in at
              </Typography>
              <Typography type="body1" component="p" className={classes.time}>
                {signInTime}
              </Typography>
            </div>
            <div className={classes.timeWrapper}>
              <Typography type="subheading" component="h3">
                Signed out at
              </Typography>
              <Typography type="body1" component="p" className={classes.time}>
                {signOutTime}
              </Typography>
            </div>
          </CardContent>
        );
      default:
        return (
          <CardContent className={classes.timesWrapper}>
            <Typography type="body1" component="p">
              Invalid stage supplied.
            </Typography>
          </CardContent>
        );
    }
  }

  render() {
    const { classes, info, isTablet } = this.props;
    const dateOptions = {
      month: "short",
      day: "numeric",
      year: "numeric"
    };

    return (
      <div className={isTablet ? classes.tabletRoot : classes.root}>
        <Card>
          <CardHeader
            title={info.eventTitle}
            subheader={new Date(info.date).toLocaleDateString(
              "en-US",
              dateOptions
            )}
          />
          {this.renderCardContent()}
        </Card>
      </div>
    );
  }
}

HoursCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HoursCard);
