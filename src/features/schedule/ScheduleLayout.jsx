// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { lightBlue } from "material-ui/colors";
import Paper from "material-ui/Paper";
import LeaderboardAd from "../../components/LeaderboardAd";
import Calendar from "./components/Calendar";
import EventsList from "./components/EventsList";
import { getEvents } from "./js/events";

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
    margin: "0 40px",
    display: "flex",
    backgroundColor: lightBlue[700]
  },
  desktopCalendar: {
    width: "40%"
  },
  desktopEventsList: {
    flexGrow: 1
  }
});

class ScheduleLayout extends Component {
  renderView() {
    const { accountType, isTablet, isMobile, classes } = this.props;
    const { dateSelected } = this.props.match.params;
    const currentDate = new Date(Date.now());
    const dateSelectedComponents = dateSelected
      ? dateSelected.split("-")
      : [
          currentDate.getDate(),
          currentDate.getMonth(),
          currentDate.getFullYear()
        ];
    const events = getEvents();
    if (isTablet) {
      if (dateSelected) {
        return (
          <EventsList
            isTablet={isTablet}
            dateSelected={new Date(...dateSelectedComponents)}
            events={events[dateSelected] || []}
            accountType={accountType}
          />
        );
      } else {
        return (
          <Calendar
            accountType={accountType}
            isMobile={isMobile}
            isTablet={isTablet}
          />
        );
      }
    } else {
      return (
        <Paper className={classes.calendarWrapper}>
          <div className={classes.desktopCalendar}>
            <Calendar
              accountType={accountType}
              isMobile={isMobile}
              isTablet={isTablet}
            />
          </div>
          <div className={classes.desktopEventsList}>
            <EventsList
              isTablet={isTablet}
              dateSelected={new Date(...dateSelectedComponents)}
              events={events[dateSelected] || []}
              accountType={accountType}
            />
          </div>
        </Paper>
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
