// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import { lightBlue } from "material-ui/colors";
import Paper from "material-ui/Paper";
import LeaderboardAd from "../../../components/LeaderboardAd";
import Calendar from "./components/Calendar";
import EventInfo from "./components/EventInfo";
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
    justifyContent: "center"
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
  },
  eventsListWrapper: {
    height: "calc(100% - 98px)"
  }
});

class ScheduleLayout extends Component {
  renderView() {
    const { isTablet, isMobile, classes } = this.props;
    const { dateSelected } = this.props.match.params;
    const { currentView } = this.props.uiConfig;
    const { updateView } = this.props.actions;

    const currentDate = new Date(Date.now());
    const dateSelectedComponents = dateSelected
      ? dateSelected.split("-")
      : [
          currentDate.getDate(),
          currentDate.getMonth(),
          currentDate.getFullYear()
        ];
    const events = getEvents();

    if (!dateSelected) {
      return (
        <Redirect
          to={`/coach/schedule/${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`}
        />
      );
    }

    if (currentView === "EVENT_INFO") {
      return (
        <EventInfo info={events["2017-8-18"][0]} actions={{ updateView }} />
      );
    }

    if (isTablet) {
      if (currentView === "EVENTS_LIST") {
        return (
          <EventsList
            isTablet={isTablet}
            dateSelected={new Date(...dateSelectedComponents)}
            events={events[dateSelected] || []}
            actions={{ updateView }}
          />
        );
      } else {
        return (
          <div>
            <div className={classes.adWrapper}>
              <LeaderboardAd />
            </div>
            <Calendar
              dateSelected={new Date(...dateSelectedComponents)}
              isMobile={isMobile}
              isTablet={isTablet}
              actions={{ updateView }}
            />
          </div>
        );
      }
    } else {
      return (
        <div>
          <div className={classes.adWrapper}>
            <LeaderboardAd />
          </div>
          <Paper className={classes.calendarWrapper}>
            <div className={classes.desktopCalendar}>
              <Calendar
                dateSelected={new Date(...dateSelectedComponents)}
                isMobile={isMobile}
                isTablet={isTablet}
                actions={{ updateView }}
              />
            </div>
            <div className={classes.desktopEventsList}>
              <EventsList
                isTablet={isTablet}
                dateSelected={new Date(...dateSelectedComponents)}
                events={events[dateSelected] || []}
                actions={{ updateView }}
              />
            </div>
          </Paper>
        </div>
      );
    }
  }

  render() {
    const { classes } = this.props;
    return <div className={classes.root}>{this.renderView()}</div>;
  }
}

ScheduleLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ScheduleLayout);
