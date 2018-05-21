/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import injectStyles from "react-jss";
import moment from "moment";
import Button from "../../../../../../components/Button";
import { common, grey } from "../../../../../../utils/colours";
import EventCard from "./components/EventCard";

const styles = {
  addEventWrapper: {
    textAlign: "center",
    fontSize: 14,
    borderRadius: 12,
    border: `2px dotted ${grey[300]}`,
    color: grey[300],
    cursor: "pointer",
    padding: 12,
    margin: 8,
    "&:hover": {
      border: `2px solid ${grey[400]}`,
      color: grey[400]
    }
  },
  addEventWrapperTablet: {
    margin: 8
  },
  column: {
    width: "14%",
    border: `1px solid ${grey[100]}`,
    backgroundColor: common["white"]
  },
  columnLeft: {
    width: "14%",
    borderRadius: "16px 0 0 16px",
    backgroundColor: grey[50],
    border: `1px solid ${grey[100]}`
  },
  columnRight: {
    width: "14%",
    borderRadius: "0 16px 16px 0",
    backgroundColor: grey[50],
    border: `1px solid ${grey[100]}`
  },
  columnTablet: {
    width: "100%",
    borderRadius: 16,
    backgroundColor: common["white"]
  },
  header: {
    fontSize: 18,
    padding: "18px 0",
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    color: grey[800],
    backgroundColor: grey[100]
  },
  headerToday: {
    fontSize: 18,
    padding: "18px 0",
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    color: grey[800],
    backgroundColor: grey[300]
  },
  headerLeft: {
    fontSize: 18,
    borderRadius: "16px 0 0 0",
    padding: "18px 0",
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    color: grey[800],
    backgroundColor: grey[100]
  },
  headerLeftToday: {
    fontSize: 18,
    borderRadius: "16px 0 0 0",
    padding: "18px 0",
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    color: grey[800],
    backgroundColor: grey[300]
  },
  headerRight: {
    fontSize: 18,
    borderRadius: "0 16px 0 0",
    padding: "18px 0",
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    color: grey[800],
    backgroundColor: grey[100]
  },
  headerRightToday: {
    fontSize: 18,
    borderRadius: "0 16px 0 0",
    padding: "18px 0",
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    color: grey[800],
    backgroundColor: grey[300]
  },
  headerTablet: {
    fontSize: 18,
    borderRadius: "16px 16px 0 0",
    padding: "18px 0",
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    color: grey[800],
    backgroundColor: grey[100]
  },
  icon: {
    marginRight: 8
  },
  noEvents: {
    textAlign: "center",
    fontSize: 14,
    color: grey[400],
    padding: 12,
    margin: 8
  },
  wrapper: {
    borderRadius: 16,
    backgroundColor: grey[100],
    display: "flex",
    justifyContent: "space-around"
  }
};

class ListOfEvents extends Component {
  checkIfInfoMissing(eventInfo) {
    const venue = eventInfo.optionalInfo.venue;
    const isCompetitive = eventInfo.requiredInfo.isCompetitive;
    let isMissingInfo = venue === "";

    if (isCompetitive) {
      const teams = eventInfo.teams;

      _.toPairs(teams).map(([teamID, teamInfo]) => {
        _.toPairs(teamInfo.opponents).map(([opponentID, opponentInfo]) => {
          isMissingInfo = opponentInfo.name;
        });
      });
    }

    return isMissingInfo;
  }

  checkIfActionsRequired(eventInfo) {
    const coaches = eventInfo.coaches;
    let isActionsRequired = false;

    _.toPairs(coaches).map(([coachID, coachInfo]) => {
      isActionsRequired =
        coachInfo.hours.status !== "APPROVED" &&
        coachInfo.attendance.willAttend;
    });

    return isActionsRequired;
  }

  checkIfPastEvent(endTime) {
    const endTimeMoment = moment(endTime);
    const currentMoment = moment(new Date(Date.now()));

    return endTimeMoment.isBefore(currentMoment);
  }

  getEventCards(date) {
    const { events, navigateTo, isTablet } = this.props;

    return _.toPairs(events)
      .filter(([eventID, eventInfo]) => {
        const startOfDate = moment(date).startOf("day");
        const endOfDate = moment(date).endOf("day");
        const eventDate = moment(eventInfo.requiredInfo.times.start);
        return eventDate.isBetween(startOfDate, endOfDate);
      })
      .map(([eventID, eventInfo]) => {
        const startTime = moment(eventInfo.requiredInfo.times.start).format(
          "h:mm A"
        );
        const endTime = moment(eventInfo.requiredInfo.times.end).format(
          "h:mm A"
        );
        const eventDate = moment(eventInfo.requiredInfo.times.start).format(
          "YYYY-MM-DD"
        );
        const title = eventInfo.requiredInfo.title;
        const isCompetitive = eventInfo.requiredInfo.isCompetitive;
        const isCancelled = eventInfo.requiredInfo.status === "CANCELLED";
        const isMissingInfo = this.checkIfInfoMissing(eventInfo);
        const isActionsRequired = this.checkIfActionsRequired(eventInfo);
        const isPastEvent = this.checkIfPastEvent(
          eventInfo.requiredInfo.times.end
        );

        return (
          <EventCard
            key={eventID}
            isActionsRequired={isActionsRequired}
            isPastEvent={isPastEvent}
            isCompetitive={isCompetitive}
            isCancelled={isCancelled}
            startTime={startTime}
            endTime={endTime}
            title={title}
            isTablet={isTablet}
            isMissingInfo={isMissingInfo}
            viewEventInfo={() =>
              navigateTo(`/myaccount/schedule/${eventDate}/${eventID}`)}
          />
        );
      });
  }

  getColumns() {
    const {
      classes,
      datesToDisplay,
      isTablet,
      isMobile,
      canCreate
    } = this.props;
    const today = moment(new Date(Date.now()));

    return datesToDisplay.map((date, index) => {
      const eventCards = this.getEventCards(date);
      const isToday =
        moment(date).format("DD-MM-YYYY") === today.format("DD-MM-YYYY");
      const showAddButton = !moment(date).isBefore(today.startOf("day"));

      if (isTablet) {
        const formattedDate = moment(date).format("dddd");

        return (
          <div className={classes.columnTablet}>
            <div className={classes.headerTablet}>
              {isToday ? "Today" : formattedDate}
            </div>
            {isMobile &&
              canCreate &&
              showAddButton && (
                <div className={classes.addEventWrapperTablet}>
                  <Button colour="secondary" filled fullWidth>
                    <i className={`fas fa-plus ${classes.icon}`} />Add event
                  </Button>
                </div>
              )}
            {eventCards}
            {eventCards.length === 0 && (
              <div className={classes.noEvents}>No events</div>
            )}
          </div>
        );
      }
      if (index === 0) {
        const formattedDate = moment(date).format("ddd, D");
        return (
          <div className={classes.columnLeft}>
            <div
              className={isToday ? classes.headerLeftToday : classes.headerLeft}
            >
              {isToday ? "Today" : formattedDate}
            </div>
            {eventCards}
            {eventCards.length === 0 && (
              <div className={classes.noEvents}>No events</div>
            )}
            {canCreate &&
              showAddButton && (
                <div className={classes.addEventWrapper}>
                  <i className={`fas fa-plus ${classes.icon}`} />Add event
                </div>
              )}
          </div>
        );
      }
      if (index === 6) {
        const formattedDate = moment(date).format("ddd, D");
        return (
          <div className={classes.columnRight}>
            <div
              className={
                isToday ? classes.headerRightToday : classes.headerRight
              }
            >
              {isToday ? "Today" : formattedDate}
            </div>
            {eventCards}
            {eventCards.length === 0 && (
              <div className={classes.noEvents}>No events</div>
            )}
            {canCreate &&
              showAddButton && (
                <div className={classes.addEventWrapper}>
                  <i className={`fas fa-plus ${classes.icon}`} />Add event
                </div>
              )}
          </div>
        );
      }
      const formattedDate = moment(date).format("ddd, D");
      return (
        <div className={classes.column}>
          <div className={isToday ? classes.headerToday : classes.header}>
            {isToday ? "Today" : formattedDate}
          </div>
          {eventCards}
          {eventCards.length === 0 && (
            <div className={classes.noEvents}>No events</div>
          )}
          {canCreate &&
            showAddButton && (
              <div className={classes.addEventWrapper}>
                <i className={`fas fa-plus ${classes.icon}`} />Add event
              </div>
            )}
        </div>
      );
    });
  }

  render() {
    const { classes } = this.props;

    return <div className={classes.wrapper}>{this.getColumns()}</div>;
  }
}

export default injectStyles(styles)(ListOfEvents);
