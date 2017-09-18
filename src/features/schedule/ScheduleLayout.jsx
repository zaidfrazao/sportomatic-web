// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import LeaderboardAd from "../../components/LeaderboardAd";
import Calendar from "./components/Calendar";
import EventsList from "./components/EventsList";

const styles = theme => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  adWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    margin: "24px 0"
  },
  calendarWrapper: {
    flexGrow: 1,
    padding: "0 40px 40px 40px",
    display: "flex"
  },
  desktopCalendar: {
    width: "50%"
  },
  desktopEventsList: {
    flexGrow: 1
  }
});

class ScheduleLayout extends Component {
  renderView() {
    const { accountType, isTablet, classes } = this.props;
    const { dateSelected } = this.props.match.params;
    if (isTablet) {
      if (dateSelected) {
        return <EventsList />;
      } else {
        return <Calendar accountType={accountType} />;
      }
    } else {
      return (
        <div className={classes.calendarWrapper}>
          <div className={classes.desktopCalendar}>
            <Calendar accountType={accountType} />
          </div>
          <div className={classes.desktopEventsList}>
            <EventsList />
          </div>
        </div>
      );
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.adWrapper}>
          <LeaderboardAd />
        </div>
        {this.renderView()}
      </div>
    );
  }
}

ScheduleLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ScheduleLayout);
