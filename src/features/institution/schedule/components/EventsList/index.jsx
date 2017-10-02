// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import { grey, lightBlue } from "material-ui/colors";
import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from "material-ui/List";
import Button from "material-ui/Button";
import CancelIcon from "material-ui-icons/Cancel";
import IconButton from "material-ui/IconButton";
import Tooltip from "material-ui/Tooltip";
import Typography from "material-ui/Typography";
import LeaderboardAd from "../../../../../components/LeaderboardAd";
import _ from "lodash";

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

  getFullSortedEventsList(events) {
    const { dateSelected } = this.props;
    return _.toPairs(events)
      .filter(
        ([id, info]) =>
          info.status !== "DELETED" && info.metadata.date === dateSelected
      )
      .map(([id, info]) => {
        return {
          id,
          ...info
        };
      })
      .sort((eventA, eventB) => {
        if (eventA.metadata.date < eventB.metadata.date) return -1;
        if (eventA.metadata.date > eventB.metadata.date) return +1;
        if (eventA.metadata.startTime < eventB.metadata.startTime) return -1;
        if (eventA.metadata.startTime > eventB.metadata.startTime) return +1;
        if (eventA.metadata.endTime < eventB.metadata.endTime) return -1;
        if (eventA.metadata.endTime > eventB.metadata.endTime) return +1;
        return 0;
      });
  }

  render() {
    const { classes, dateSelected, isTablet, events } = this.props;
    const { updateView } = this.props.actions;

    const headingDateOptions = {
      weekday: "short",
      month: "short",
      day: "numeric"
    };

    const allEvents = this.getFullSortedEventsList(events);

    const morningEvents = allEvents
      .filter(eventInfo => {
        const startHour = eventInfo.metadata.startTime;
        const isMorningEvent = startHour < "12:00";
        return isMorningEvent;
      })
      .map(eventInfo => {
        const eventStartTime = eventInfo.metadata.startTime;
        const eventEndTime = eventInfo.metadata.endTime;
        return (
          <Route
            key={eventInfo.id}
            render={({ history }) => (
              <ListItem
                button
                onClick={() => {
                  history.push(
                    `/institution/schedule/${dateSelected}}/${eventInfo.id}`
                  );
                  updateView("EVENT_INFO");
                }}
              >
                <ListItemText
                  primary={eventInfo.metadata.title}
                  secondary={`${eventStartTime} - ${eventEndTime}`}
                />
                <ListItemSecondaryAction>
                  <Tooltip label="Cancel event" placement="left">
                    <IconButton aria-label="cancel event">
                      <CancelIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            )}
          />
        );
      });

    const afternoonEvents = allEvents
      .filter(eventInfo => {
        const startHour = eventInfo.metadata.startTime;
        const isAfternoonEvent = startHour >= "12:00" && startHour < "18:00";
        return isAfternoonEvent;
      })
      .map(eventInfo => {
        const eventStartTime = eventInfo.metadata.startTime;
        const eventEndTime = eventInfo.metadata.endTime;
        return (
          <Route
            key={eventInfo.id}
            render={({ history }) => (
              <ListItem
                button
                onClick={() => {
                  history.push(
                    `/institution/schedule/${dateSelected}/${eventInfo.id}`
                  );
                  updateView("EVENT_INFO");
                }}
              >
                <ListItemText
                  primary={eventInfo.metadata.title}
                  secondary={`${eventStartTime} - ${eventEndTime}`}
                />
                <ListItemSecondaryAction>
                  <Tooltip label="Cancel event" placement="left">
                    <IconButton aria-label="cancel event">
                      <CancelIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            )}
          />
        );
      });

    const eveningEvents = allEvents
      .filter(eventInfo => {
        const startHour = eventInfo.metadata.startTime;
        const isEveningEvent = startHour >= "18:00";
        return isEveningEvent;
      })
      .map(eventInfo => {
        const eventStartTime = eventInfo.metadata.startTime;
        const eventEndTime = eventInfo.metadata.endTime;
        return (
          <Route
            key={eventInfo.id}
            render={({ history }) => (
              <ListItem
                button
                onClick={() => {
                  history.push(
                    `/institution/schedule/${dateSelected}/${eventInfo.id}`
                  );
                  updateView("EVENT_INFO");
                }}
              >
                <ListItemText
                  primary={eventInfo.metadata.title}
                  secondary={`${eventStartTime} - ${eventEndTime}`}
                />
                <ListItemSecondaryAction>
                  <Tooltip label="Cancel event" placement="left">
                    <IconButton aria-label="cancel event">
                      <CancelIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
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
                  {dateSelected.slice(0, 4)}
                </span>
                <span className="Cal__Header__dateWrapper Cal__Header__day Cal__Header__active">
                  {new Date(dateSelected).toLocaleDateString(
                    "en-US",
                    headingDateOptions
                  )}
                  {this.getDaySuffix(8, 10)}
                </span>
              </div>
            </div>
          )}
        </div>
        <div
          className={allEvents.length > 0 ? classes.events : classes.noEvents}
        >
          {allEvents.length === 0 && (
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
