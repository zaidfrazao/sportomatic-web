import React, { Component } from "react";
import _ from "lodash";
import Avatar from "material-ui/Avatar";
import Button from "material-ui/Button";
import { CircularProgress } from "material-ui/Progress";
import { grey, lightBlue, orange, red } from "material-ui/colors";
import List, { ListItem, ListItemText } from "material-ui/List";
import moment from "moment";
import { Route } from "react-router-dom";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  adWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "24px 0"
  },
  backButton: {
    margin: 24
  },
  cancelledHeading: {
    padding: 12.5,
    backgroundColor: red[900],
    fontWeight: "normal",
    color: grey[50]
  },
  competitiveEvent: {
    backgroundColor: orange[500]
  },
  header: {
    height: 98,
    backgroundColor: lightBlue[700]
  },
  loaderWrapper: {
    height: 80,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  nonCompetitiveEvent: {
    backgroundColor: lightBlue[500]
  },
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "auto"
  },
  timeHeading: {
    padding: 12.5,
    backgroundColor: lightBlue[900],
    fontWeight: "normal",
    color: grey[50]
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
        const eventStartTime = moment(
          eventInfo.requiredInfo.times.start
        ).format("h:mm A");
        const eventEndTime = moment(eventInfo.requiredInfo.times.end).format(
          "h:mm A"
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
                      `/myaccount/schedule/${dateSelected}/${eventInfo.id}`
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
        const eventStartTime = moment(
          eventInfo.requiredInfo.times.start
        ).format("h:mm A");
        const eventEndTime = moment(eventInfo.requiredInfo.times.end).format(
          "h:mm A"
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
                      `/myaccount/schedule/${dateSelected}/${eventInfo.id}`
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
        const eventStartTime = moment(
          eventInfo.requiredInfo.times.start
        ).format("h:mm A");
        const eventEndTime = moment(eventInfo.requiredInfo.times.end).format(
          "h:mm A"
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
                      `/myaccount/schedule/${dateSelected}/${eventInfo.id}`
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
        const eventStartTime = moment(
          eventInfo.requiredInfo.times.start
        ).format("h:mm A");
        const eventEndTime = moment(eventInfo.requiredInfo.times.end).format(
          "h:mm A"
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
                      `/myaccount/schedule/${dateSelected}/${eventInfo.id}`
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
                View calendar
              </Button>
            )}
          />
        )}
        <div className={classes.events}>
          <Typography
            component="h3"
            type="body2"
            className={classes.timeHeading}
          >
            Morning
          </Typography>
          {isLoading ? (
            <div className={classes.loaderWrapper}>
              <CircularProgress />
            </div>
          ) : (
            <List>
              {morningEvents.length > 0 ? (
                morningEvents
              ) : (
                <ListItem>
                  <ListItemText primary="No morning events" />
                </ListItem>
              )}
            </List>
          )}
          <Typography
            component="h3"
            type="body2"
            className={classes.timeHeading}
          >
            Afternoon
          </Typography>
          {isLoading ? (
            <div className={classes.loaderWrapper}>
              <CircularProgress />
            </div>
          ) : (
            <List>
              {afternoonEvents.length > 0 ? (
                afternoonEvents
              ) : (
                <ListItem>
                  <ListItemText primary="No afternoon events" />
                </ListItem>
              )}
            </List>
          )}
          <Typography
            component="h3"
            type="body2"
            className={classes.timeHeading}
          >
            Evening
          </Typography>
          {isLoading ? (
            <div className={classes.loaderWrapper}>
              <CircularProgress />
            </div>
          ) : (
            <List>
              {eveningEvents.length > 0 ? (
                eveningEvents
              ) : (
                <ListItem>
                  <ListItemText primary="No evening events" />
                </ListItem>
              )}
            </List>
          )}
          <Typography
            component="h3"
            type="body2"
            className={classes.cancelledHeading}
          >
            Cancelled Events
          </Typography>
          {isLoading ? (
            <div className={classes.loaderWrapper}>
              <CircularProgress />
            </div>
          ) : (
            <List>
              {cancelledEvents.length > 0 ? (
                cancelledEvents
              ) : (
                <ListItem>
                  <ListItemText primary="No cancelled events" />
                </ListItem>
              )}
            </List>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(EventsList);
