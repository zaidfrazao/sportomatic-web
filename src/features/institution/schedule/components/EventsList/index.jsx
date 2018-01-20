import React, { Component } from "react";
import Avatar from "material-ui/Avatar";
import { CircularProgress } from "material-ui/Progress";
import { Route } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import { grey, lightBlue, orange, red } from "material-ui/colors";
import List, { ListItem, ListItemText } from "material-ui/List";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import _ from "lodash";

const styles = theme => ({
  cancelledHeading: {
    padding: 12.5,
    backgroundColor: red[900],
    fontWeight: "normal",
    color: grey[50]
  },
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
  }
});

class EventsList extends Component {
  getFullSortedEventsList(events) {
    const { dateSelected } = this.props;
    return _.toPairs(events)
      .filter(
        ([id, info]) =>
          info.status !== "DELETED" &&
          info.requiredInfo.times.start.toDateString() ===
            new Date(dateSelected).toDateString()
      )
      .map(([id, info]) => {
        return {
          id,
          ...info
        };
      })
      .sort((eventA, eventB) => {
        if (eventA.requiredInfo.startTime < eventB.requiredInfo.startTime)
          return -1;
        if (eventA.requiredInfo.startTime > eventB.requiredInfo.startTime)
          return +1;
        if (eventA.requiredInfo.endTime < eventB.requiredInfo.endTime)
          return -1;
        if (eventA.requiredInfo.endTime > eventB.requiredInfo.endTime)
          return +1;
        return 0;
      });
  }

  render() {
    const { classes, dateSelected, isTablet, events, isLoading } = this.props;
    const { updateView } = this.props.actions;

    const allEvents = this.getFullSortedEventsList(events);
    const options = { hour12: true, hour: "2-digit", minute: "2-digit" };

    const morningEvents = allEvents
      .filter(eventInfo => {
        const startHour = eventInfo.requiredInfo.times.start.getHours();
        const isMorningEvent = startHour < 12;
        return isMorningEvent;
      })
      .filter(eventInfo => {
        return eventInfo.requiredInfo.status === "ACTIVE";
      })
      .map(eventInfo => {
        const eventStartTime = eventInfo.requiredInfo.times.start.toLocaleTimeString(
          "en-US",
          options
        );
        const eventEndTime = eventInfo.requiredInfo.times.end.toLocaleTimeString(
          "en-US",
          options
        );
        return (
          <Route
            key={eventInfo.id}
            render={({ history }) => {
              return (
                <ListItem
                  button
                  onClick={() => {
                    history.push(
                      `/admin/schedule/${dateSelected}/${eventInfo.id}`
                    );
                  }}
                >
                  <Avatar
                    className={
                      eventInfo.requiredInfo.isCompetitive
                        ? classes.competitiveEvent
                        : classes.nonCompetitiveEvent
                    }
                  />
                  <ListItemText
                    primary={eventInfo.requiredInfo.title}
                    secondary={`${eventStartTime} - ${eventEndTime}`}
                  />
                </ListItem>
              );
            }}
          />
        );
      });

    const afternoonEvents = allEvents
      .filter(eventInfo => {
        const startHour = eventInfo.requiredInfo.times.start.getHours();
        const isAfternoonEvent = startHour >= 12 && startHour < 18;
        return isAfternoonEvent;
      })
      .filter(eventInfo => {
        return eventInfo.requiredInfo.status === "ACTIVE";
      })
      .map(eventInfo => {
        const eventStartTime = eventInfo.requiredInfo.times.start.toLocaleTimeString(
          "en-US",
          options
        );
        const eventEndTime = eventInfo.requiredInfo.times.end.toLocaleTimeString(
          "en-US",
          options
        );
        return (
          <Route
            key={eventInfo.id}
            render={({ history }) => {
              return (
                <ListItem
                  button
                  onClick={() => {
                    history.push(
                      `/admin/schedule/${dateSelected}/${eventInfo.id}`
                    );
                  }}
                >
                  <Avatar
                    className={
                      eventInfo.requiredInfo.isCompetitive
                        ? classes.competitiveEvent
                        : classes.nonCompetitiveEvent
                    }
                  />
                  <ListItemText
                    primary={eventInfo.requiredInfo.title}
                    secondary={`${eventStartTime} - ${eventEndTime}`}
                  />
                </ListItem>
              );
            }}
          />
        );
      });

    const eveningEvents = allEvents
      .filter(eventInfo => {
        const startHour = eventInfo.requiredInfo.times.start.getHours();
        const isEveningEvent = startHour >= 18;
        return isEveningEvent;
      })
      .filter(eventInfo => {
        return eventInfo.requiredInfo.status === "ACTIVE";
      })
      .map(eventInfo => {
        const eventStartTime = eventInfo.requiredInfo.times.start.toLocaleTimeString(
          "en-US",
          options
        );
        const eventEndTime = eventInfo.requiredInfo.times.end.toLocaleTimeString(
          "en-US",
          options
        );
        return (
          <Route
            key={eventInfo.id}
            render={({ history }) => {
              return (
                <ListItem
                  button
                  onClick={() => {
                    history.push(
                      `/admin/schedule/${dateSelected}/${eventInfo.id}`
                    );
                  }}
                >
                  <Avatar
                    className={
                      eventInfo.requiredInfo.isCompetitive
                        ? classes.competitiveEvent
                        : classes.nonCompetitiveEvent
                    }
                  />
                  <ListItemText
                    primary={eventInfo.requiredInfo.title}
                    secondary={`${eventStartTime} - ${eventEndTime}`}
                  />
                </ListItem>
              );
            }}
          />
        );
      });

    const cancelledEvents = allEvents
      .filter(eventInfo => {
        return eventInfo.requiredInfo.status === "CANCELLED";
      })
      .map(eventInfo => {
        const eventStartTime = eventInfo.requiredInfo.times.start.toLocaleTimeString(
          "en-US",
          options
        );
        const eventEndTime = eventInfo.requiredInfo.times.end.toLocaleTimeString(
          "en-US",
          options
        );
        return (
          <Route
            key={eventInfo.id}
            render={({ history }) => {
              return (
                <ListItem
                  button
                  onClick={() => {
                    history.push(
                      `/admin/schedule/${dateSelected}/${eventInfo.id}`
                    );
                  }}
                >
                  <Avatar
                    className={
                      eventInfo.requiredInfo.isCompetitive
                        ? classes.competitiveEvent
                        : classes.nonCompetitiveEvent
                    }
                  />
                  <ListItemText
                    primary={eventInfo.requiredInfo.title}
                    secondary={`${eventStartTime} - ${eventEndTime}`}
                  />
                </ListItem>
              );
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
            <List>
              {morningEvents.length > 0 ? (
                morningEvents
              ) : (
                <ListItem>
                  <ListItemText primary="No morning events" />
                </ListItem>
              )}
            </List>
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
            <List>
              {eveningEvents.length > 0 ? (
                eveningEvents
              ) : (
                <ListItem>
                  <ListItemText primary="No evening events" />
                </ListItem>
              )}
            </List>
            <Typography
              component="h3"
              type="body2"
              className={classes.cancelledHeading}
            >
              Cancelled Events
            </Typography>
            <List>
              {cancelledEvents.length > 0 ? (
                cancelledEvents
              ) : (
                <ListItem>
                  <ListItemText primary="No cancelled events" />
                </ListItem>
              )}
            </List>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(EventsList);
