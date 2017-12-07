import React, { Component } from "react";
import Avatar from "material-ui/Avatar";
import { CircularProgress } from "material-ui/Progress";
import { Route } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import { grey, lightBlue, orange, red } from "material-ui/colors";
import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from "material-ui/List";
import Button from "material-ui/Button";
import CancelIcon from "material-ui-icons/Cancel";
import UncancelIcon from "material-ui-icons/Undo";
import IconButton from "material-ui/IconButton";
import Tooltip from "material-ui/Tooltip";
import Typography from "material-ui/Typography";
import _ from "lodash";

const styles = theme => ({
  competitiveEvent: {
    backgroundColor: orange[500]
  },
  nonCompetitiveEvent: {
    backgroundColor: lightBlue[500]
  },
  root: {
    width: "100%",
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
  },
  canceledEvent: {
    backgroundColor: red[200]
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
    const {
      classes,
      dateSelected,
      isTablet,
      events,
      institutionID,
      isLoading
    } = this.props;
    const {
      openCancelEventAlert,
      openUncancelEventAlert,
      updateView
    } = this.props.actions;

    const allEvents = this.getFullSortedEventsList(events);

    const morningEvents = allEvents
      .filter(eventInfo => {
        const startHour = eventInfo.metadata.startTime;
        const isMorningEvent = startHour < "12:00";
        return isMorningEvent;
      })
      .map(eventInfo => {
        const eventDate = new Date(eventInfo.metadata.date);
        const currentDate = new Date(Date.now());
        const showCancelButton = eventDate > currentDate;
        const eventStartTime = eventInfo.metadata.startTime;
        const eventEndTime = eventInfo.metadata.endTime;
        return (
          <Route
            key={eventInfo.id}
            render={({ history }) => {
              if (eventInfo.status === "CANCELLED") {
                return (
                  <ListItem
                    button
                    className={classes.canceledEvent}
                    onClick={() => {
                      history.push(
                        `/admin/schedule/${dateSelected}/${eventInfo.id}`
                      );
                      updateView("EVENT_INFO");
                    }}
                  >
                    <Avatar
                      className={
                        eventInfo.metadata.isCompetitive
                          ? classes.competitiveEvent
                          : classes.nonCompetitiveEvent
                      }
                    />
                    <ListItemText
                      primary={eventInfo.metadata.title + " [Cancelled]"}
                      secondary={`${eventStartTime} - ${eventEndTime}`}
                    />
                    {showCancelButton && (
                      <ListItemSecondaryAction>
                        <Tooltip title="Uncancel" placement="left">
                          <IconButton
                            aria-label="uncancel event"
                            onClick={() =>
                              openUncancelEventAlert(
                                institutionID,
                                eventInfo.id,
                                _.keys(eventInfo.managers),
                                _.keys(eventInfo.coaches),
                                dateSelected.slice(0, 4),
                                dateSelected.slice(5, 7)
                              )}
                          >
                            <UncancelIcon />
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    )}
                  </ListItem>
                );
              } else {
                return (
                  <ListItem
                    button
                    onClick={() => {
                      history.push(
                        `/admin/schedule/${dateSelected}/${eventInfo.id}`
                      );
                      updateView("EVENT_INFO");
                    }}
                  >
                    <Avatar
                      className={
                        eventInfo.metadata.isCompetitive
                          ? classes.competitiveEvent
                          : classes.nonCompetitiveEvent
                      }
                    />
                    <ListItemText
                      primary={eventInfo.metadata.title}
                      secondary={`${eventStartTime} - ${eventEndTime}`}
                    />
                    {showCancelButton && (
                      <ListItemSecondaryAction>
                        <Tooltip title="Cancel" placement="left">
                          <IconButton
                            aria-label="cancel event"
                            onClick={() =>
                              openCancelEventAlert(
                                institutionID,
                                eventInfo.id,
                                _.keys(eventInfo.managers),
                                _.keys(eventInfo.coaches),
                                dateSelected.slice(0, 4),
                                dateSelected.slice(5, 7)
                              )}
                          >
                            <CancelIcon />
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    )}
                  </ListItem>
                );
              }
            }}
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
        const eventDate = new Date(eventInfo.metadata.date);
        const currentDate = new Date(Date.now());
        const showCancelButton = eventDate > currentDate;
        const eventStartTime = eventInfo.metadata.startTime;
        const eventEndTime = eventInfo.metadata.endTime;
        return (
          <Route
            key={eventInfo.id}
            render={({ history }) => {
              if (eventInfo.status === "CANCELLED") {
                return (
                  <ListItem
                    button
                    className={classes.canceledEvent}
                    onClick={() => {
                      history.push(
                        `/admin/schedule/${dateSelected}/${eventInfo.id}`
                      );
                      updateView("EVENT_INFO");
                    }}
                  >
                    <Avatar
                      className={
                        eventInfo.metadata.isCompetitive
                          ? classes.competitiveEvent
                          : classes.nonCompetitiveEvent
                      }
                    />
                    <ListItemText
                      primary={eventInfo.metadata.title + " [Cancelled]"}
                      secondary={`${eventStartTime} - ${eventEndTime}`}
                    />
                    {showCancelButton && (
                      <ListItemSecondaryAction>
                        <Tooltip
                          title="Uncancel"
                          placement="left"
                          onClick={() =>
                            openUncancelEventAlert(
                              institutionID,
                              eventInfo.id,
                              _.keys(eventInfo.managers),
                              _.keys(eventInfo.coaches),
                              dateSelected.slice(0, 4),
                              dateSelected.slice(5, 7)
                            )}
                        >
                          <IconButton aria-label="uncancel event">
                            <UncancelIcon />
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    )}
                  </ListItem>
                );
              } else {
                return (
                  <ListItem
                    button
                    onClick={() => {
                      history.push(
                        `/admin/schedule/${dateSelected}/${eventInfo.id}`
                      );
                      updateView("EVENT_INFO");
                    }}
                  >
                    <Avatar
                      className={
                        eventInfo.metadata.isCompetitive
                          ? classes.competitiveEvent
                          : classes.nonCompetitiveEvent
                      }
                    />
                    <ListItemText
                      primary={eventInfo.metadata.title}
                      secondary={`${eventStartTime} - ${eventEndTime}`}
                    />
                    {showCancelButton && (
                      <ListItemSecondaryAction>
                        <Tooltip title="Cancel" placement="left">
                          <IconButton
                            aria-label="cancel event"
                            onClick={() =>
                              openCancelEventAlert(
                                institutionID,
                                eventInfo.id,
                                _.keys(eventInfo.managers),
                                _.keys(eventInfo.coaches),
                                dateSelected.slice(0, 4),
                                dateSelected.slice(5, 7)
                              )}
                          >
                            <CancelIcon />
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    )}
                  </ListItem>
                );
              }
            }}
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
        const eventDate = new Date(eventInfo.metadata.date);
        const currentDate = new Date(Date.now());
        const showCancelButton = eventDate > currentDate;
        const eventStartTime = eventInfo.metadata.startTime;
        const eventEndTime = eventInfo.metadata.endTime;
        return (
          <Route
            key={eventInfo.id}
            render={({ history }) => {
              if (eventInfo.status === "CANCELLED") {
                return (
                  <ListItem
                    button
                    className={classes.canceledEvent}
                    onClick={() => {
                      history.push(
                        `/admin/schedule/${dateSelected}/${eventInfo.id}`
                      );
                      updateView("EVENT_INFO");
                    }}
                  >
                    <Avatar
                      className={
                        eventInfo.metadata.isCompetitive
                          ? classes.competitiveEvent
                          : classes.nonCompetitiveEvent
                      }
                    />
                    <ListItemText
                      primary={eventInfo.metadata.title + " [Cancelled]"}
                      secondary={`${eventStartTime} - ${eventEndTime}`}
                    />
                    {showCancelButton && (
                      <ListItemSecondaryAction>
                        <Tooltip title="Uncancel" placement="left">
                          <IconButton
                            aria-label="uncancel event"
                            onClick={() =>
                              openUncancelEventAlert(
                                institutionID,
                                eventInfo.id,
                                _.keys(eventInfo.managers),
                                _.keys(eventInfo.coaches),
                                dateSelected.slice(0, 4),
                                dateSelected.slice(5, 7)
                              )}
                          >
                            <UncancelIcon />
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    )}
                  </ListItem>
                );
              } else {
                return (
                  <ListItem
                    button
                    onClick={() => {
                      history.push(
                        `/admin/schedule/${dateSelected}/${eventInfo.id}`
                      );
                      updateView("EVENT_INFO");
                    }}
                  >
                    <Avatar
                      className={
                        eventInfo.metadata.isCompetitive
                          ? classes.competitiveEvent
                          : classes.nonCompetitiveEvent
                      }
                    />
                    <ListItemText
                      primary={eventInfo.metadata.title}
                      secondary={`${eventStartTime} - ${eventEndTime}`}
                    />
                    {showCancelButton && (
                      <ListItemSecondaryAction>
                        <Tooltip title="Cancel" placement="left">
                          <IconButton
                            aria-label="cancel event"
                            onClick={() =>
                              openCancelEventAlert(
                                institutionID,
                                eventInfo.id,
                                _.keys(eventInfo.managers),
                                _.keys(eventInfo.coaches),
                                dateSelected.slice(0, 4),
                                dateSelected.slice(5, 7)
                              )}
                          >
                            <CancelIcon />
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    )}
                  </ListItem>
                );
              }
            }}
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
        {isLoading ? (
          <div className={classes.noEvents}>
            <CircularProgress />
          </div>
        ) : (
          <div className={classes.events}>
            <Typography
              component="h3"
              type="body2"
              className={classes.timeHeading}
            >
              Morning
            </Typography>
            {morningEvents.length > 0 ? (
              morningEvents
            ) : (
              <ListItem>
                <ListItemText primary="No morning events" />
              </ListItem>
            )}
            <Typography
              component="h3"
              type="body2"
              className={classes.timeHeading}
            >
              Afternoon
            </Typography>
            <List>
              {afternoonEvents.length > 0 ? (
                afternoonEvents
              ) : (
                <ListItem>
                  <ListItemText primary="No afternoon events" />
                </ListItem>
              )}
            </List>
            <Typography
              component="h3"
              type="body2"
              className={classes.timeHeading}
            >
              Evening
            </Typography>
            {eveningEvents.length > 0 ? (
              eveningEvents
            ) : (
              <ListItem>
                <ListItemText primary="No evening events" />
              </ListItem>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(EventsList);
