// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import { lightBlue } from "material-ui/colors";
import AddIcon from "material-ui-icons/Add";
import Button from "material-ui/Button";
import EditIcon from "material-ui-icons/Edit";
import Paper from "material-ui/Paper";
import LeaderboardAd from "../../../components/LeaderboardAd";
import Calendar from "./components/Calendar";
import EventInfo from "./components/EventInfo";
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
  tabletEventsListWrapper: {
    height: "100%"
  },
  eventsListWrapper: {
    height: "calc(100% - 98px)"
  },
  button: {
    margin: theme.spacing.unit,
    position: "fixed",
    bottom: 72,
    right: 24,
    zIndex: 1,
    "@media (min-width: 600px)": {
      bottom: 24
    }
  }
});

class ScheduleLayout extends Component {
  renderView() {
    const { isTablet, isMobile, classes, events } = this.props;
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

    if (!dateSelected) {
      return (
        <Redirect
          to={`/manager/schedule/${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`}
        />
      );
    }

    if (currentView === "EVENT_INFO") {
      return (
        <div>
          <EventInfo info={events["2017-8-18"][0]} actions={{ updateView }} />
          <Button
            fab
            color="accent"
            aria-label="edit event"
            className={classes.button}
          >
            <EditIcon />
          </Button>
        </div>
      );
    }

    if (isTablet) {
      if (currentView === "EVENTS_LIST") {
        return (
          <div className={classes.tabletEventsListWrapper}>
            <EventsList
              isTablet={isTablet}
              dateSelected={new Date(...dateSelectedComponents)}
              events={events[dateSelected] || []}
              actions={{ updateView }}
            />
            <Button
              fab
              color="accent"
              aria-label="add event"
              className={classes.button}
            >
              <AddIcon />
            </Button>
          </div>
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
          <Button
            fab
            color="accent"
            aria-label="add event"
            className={classes.button}
          >
            <AddIcon />
          </Button>
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
