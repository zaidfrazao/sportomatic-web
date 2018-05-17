import React, { Component } from "react";
import _ from "lodash";
import Avatar from "material-ui/Avatar";
import { CircularProgress } from "material-ui/Progress";
import { grey, lightBlue, orange, red } from "material-ui/colors";
import List, { ListItem, ListItemText } from "material-ui/List";
import moment from "moment";
import injectStyles from "react-jss";
import Button from "../../../../components/Button";

const mobileBreakpoint = 800;

const styles = theme => ({
  adWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "24px 0"
  },
  backButtonWrapper: {
    margin: 12
  },
  cancelledEvent: {
    backgroundColor: red[500]
  },
  competitiveEvent: {
    backgroundColor: orange[500]
  },
  header: {
    height: 98,
    backgroundColor: lightBlue[700]
  },
  loaderWrapper: {
    width: "100%",
    textAlign: "center",
    padding: "24px 0"
  },
  nonCompetitiveEvent: {
    backgroundColor: lightBlue[500]
  },
  root: {
    width: "100%",
    height: "100%",
    overflow: "auto",
    borderRadius: "0 0 16px 16px",
    [`@media (min-width: ${mobileBreakpoint}px)`]: {
      backgroundColor: grey[100],
      borderRadius: "0 0 16px 0"
    }
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
    const { updateView, navigateTo } = this.props.actions;

    const allEvents = this.getFullSortedEventsList(events)
      .filter(eventInfo => {
        const status = eventInfo.requiredInfo.status;
        return status === "ACTIVE" || status === "CANCELLED";
      })
      .map(eventInfo => {
        const eventStartTime = moment(
          eventInfo.requiredInfo.times.start
        ).format("h:mm A");
        const eventEndTime = moment(eventInfo.requiredInfo.times.end).format(
          "h:mm A"
        );
        const status = eventInfo.requiredInfo.status;
        const isCompetitive = eventInfo.requiredInfo.isCompetitive;

        let avatarStyle = classes.nonCompetitiveEvent;
        if (status === "CANCELLED") {
          avatarStyle = classes.cancelledEvent;
        } else if (isCompetitive) {
          avatarStyle = classes.competitiveEvent;
        }

        return (
          <ListItem
            key={eventInfo.id}
            button
            onClick={() => {
              navigateTo(`/myaccount/schedule/${dateSelected}/${eventInfo.id}`);
              updateView("EVENT_INFO");
            }}
          >
            <Avatar className={avatarStyle} />
            <ListItemText
              primary={eventInfo.requiredInfo.title}
              secondary={`${eventStartTime} - ${eventEndTime}`}
            />
          </ListItem>
        );
      });

    return (
      <div className={classes.root}>
        {isTablet && (
          <div className={classes.backButtonWrapper}>
            <Button
              colour="primary"
              fullWidth
              filled
              handleClick={() => updateView("SCHEDULE")}
            >
              Select date
            </Button>
          </div>
        )}
        <div className={classes.events}>
          {isLoading ? (
            <div className={classes.loaderWrapper}>
              <CircularProgress />
            </div>
          ) : (
            <List>
              {allEvents.length > 0 ? (
                allEvents
              ) : (
                <ListItem>
                  <ListItemText primary="No events" />
                </ListItem>
              )}
            </List>
          )}
        </div>
      </div>
    );
  }
}

export default injectStyles(styles)(EventsList);
