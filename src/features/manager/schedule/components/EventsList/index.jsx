// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import { grey, lightBlue } from "material-ui/colors";
import List, { ListItem, ListItemText } from "material-ui/List";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import LeaderboardAd from "../../../../../components/LeaderboardAd";

const styles = theme => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  adWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "24px 0"
  },
  header: {
    height: 98,
    backgroundColor: lightBlue[700]
  },
  events: {
    flexGrow: 1,
    backgroundColor: grey[50],
    overflow: "auto"
  },
  noEvents: {
    flexGrow: 1,
    backgroundColor: grey[50],
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  timeHeading: {
    padding: 12.5,
    backgroundColor: lightBlue[900],
    fontWeight: "normal",
    color: grey[50]
  },
  backButton: {
    margin: 24
  }
});

class EventsList extends Component {
  getDaySuffix(day) {
    if (day === 1 || day === 21 || day === 31) return "st";
    if (day === 2 || day === 22) return "nd";
    if (day === 3 || day === 23) return "rd";
    return "th";
  }

  render() {
    const { classes, dateSelected, isTablet, events } = this.props;
    const { updateView } = this.props.actions;

    const dateOptions = { hour: "2-digit", minute: "2-digit" };
    const headingDateOptions = {
      weekday: "short",
      month: "short",
      day: "numeric"
    };

    const morningEvents = events
      .filter(eventInfo => {
        const startHour = new Date(eventInfo.startTime).getHours();
        const isMorningEvent = startHour < 12;
        return isMorningEvent;
      })
      .map(eventInfo => {
        const eventStartTime = new Date(eventInfo.startTime).toLocaleTimeString(
          "en-US",
          dateOptions
        );
        const eventEndTime = new Date(eventInfo.endTime).toLocaleTimeString(
          "en-US",
          dateOptions
        );
        return (
          <Route
            key={eventInfo.id}
            render={({ history }) => (
              <ListItem
                button
                onClick={() => {
                  history.push(
                    `/coach/schedule/${dateSelected.getFullYear()}-${dateSelected.getMonth()}-${dateSelected.getDate()}/${eventInfo.id}`
                  );
                  updateView("EVENT_INFO");
                }}
              >
                <ListItemText
                  primary={eventInfo.title}
                  secondary={`${eventStartTime} - ${eventEndTime}`}
                />
              </ListItem>
            )}
          />
        );
      });

    const afternoonEvents = events
      .filter(eventInfo => {
        const startHour = new Date(eventInfo.startTime).getHours();
        const isAfternoonEvent = startHour > 12 && startHour < 18;
        return isAfternoonEvent;
      })
      .map(eventInfo => {
        const eventStartTime = new Date(eventInfo.startTime).toLocaleTimeString(
          "en-US",
          dateOptions
        );
        const eventEndTime = new Date(eventInfo.endTime).toLocaleTimeString(
          "en-US",
          dateOptions
        );
        return (
          <Route
            key={eventInfo.id}
            render={({ history }) => (
              <ListItem
                button
                onClick={() => {
                  history.push(
                    `/coach/schedule/${dateSelected.getFullYear()}-${dateSelected.getMonth()}-${dateSelected.getDate()}/${eventInfo.id}`
                  );
                  updateView("EVENT_INFO");
                }}
              >
                <ListItemText
                  primary={eventInfo.title}
                  secondary={`${eventStartTime} - ${eventEndTime}`}
                />
              </ListItem>
            )}
          />
        );
      });

    const eveningEvents = events
      .filter(eventInfo => {
        const startHour = new Date(eventInfo.startTime).getHours();
        const isEveningEvent = startHour > 18;
        return isEveningEvent;
      })
      .map(eventInfo => {
        const eventStartTime = new Date(eventInfo.startTime).toLocaleTimeString(
          "en-US",
          dateOptions
        );
        const eventEndTime = new Date(eventInfo.endTime).toLocaleTimeString(
          "en-US",
          dateOptions
        );
        return (
          <Route
            key={eventInfo.id}
            render={({ history }) => (
              <ListItem
                button
                onClick={() => {
                  history.push(
                    `/coach/schedule/${dateSelected.getFullYear()}-${dateSelected.getMonth()}-${dateSelected.getDate()}/${eventInfo.id}`
                  );
                  updateView("EVENT_INFO");
                }}
              >
                <ListItemText
                  primary={eventInfo.title}
                  secondary={`${eventStartTime} - ${eventEndTime}`}
                />
              </ListItem>
            )}
          />
        );
      });

    return (
      <div className={classes.root}>
        {isTablet && (
          <Route
            render={({ history }) => (
              <Button
                raised
                className={classes.backButton}
                onClick={() => updateView("SCHEDULE")}
              >
                Back to calendar
              </Button>
            )}
          />
        )}
        {isTablet && (
          <div className={classes.adWrapper}>
            <LeaderboardAd />
          </div>
        )}
        <div className={classes.header}>
          {isTablet && (
            <div className="Cal__Header__root">
              <div className="Cal__Header__wrapper">
                <span className="Cal__Header__dateWrapper Cal__Header__year">
                  {dateSelected.getFullYear()}
                </span>
                <span className="Cal__Header__dateWrapper Cal__Header__day Cal__Header__active">
                  {dateSelected.toLocaleDateString("en-US", headingDateOptions)}
                  {this.getDaySuffix(dateSelected.getDate())}
                </span>
              </div>
            </div>
          )}
        </div>
        <div className={events.length > 0 ? classes.events : classes.noEvents}>
          {events.length === 0 && (
            <Typography component="p" type="body1">
              No events have been scheduled on this day.
            </Typography>
          )}
          {morningEvents.length > 0 && (
            <div>
              <Typography
                component="h3"
                type="body2"
                className={classes.timeHeading}
              >
                Morning
              </Typography>
              <List>{morningEvents}</List>
            </div>
          )}
          {afternoonEvents.length > 0 && (
            <div>
              <Typography
                component="h3"
                type="body2"
                className={classes.timeHeading}
              >
                Afternoon
              </Typography>
              <List>{afternoonEvents}</List>
            </div>
          )}
          {eveningEvents.length > 0 && (
            <div>
              <Typography
                component="h3"
                type="body2"
                className={classes.timeHeading}
              >
                Evening
              </Typography>
              <List>{eveningEvents}</List>
            </div>
          )}
        </div>
      </div>
    );
  }
}

EventsList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EventsList);
