/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import injectSheet from "react-jss";
import moment from "moment";
import EmptyState from "../../../../components/EmptyState";
import EventCard from "./components/EventCard";
import { grey } from "../../../../utils/colours";

const styles = {
  actionsBar: {
    margin: "24px 24px 0 24px",
    backgroundColor: grey[200],
    display: "flex",
    justifyContent: "center"
  },
  emptyState: {
    padding: 24
  },
  flexGrow: {
    flexGrow: 1
  },
  iconAdjacentText: {
    marginRight: 8
  },
  wrapper: {
    width: "100%"
  }
};

class Today extends Component {
  getRelativeTime(times) {
    const currentTimeMoment = moment();
    const startTimeMoment = moment(times.start);
    const endTimeMoment = moment(times.end);

    if (currentTimeMoment.isBefore(startTimeMoment)) {
      return `Starts in about ${currentTimeMoment.to(startTimeMoment, true)}`;
    } else if (currentTimeMoment.isAfter(startTimeMoment)) {
      return `Ends in about ${currentTimeMoment.to(endTimeMoment, true)}`;
    } else {
      return `Ended about ${endTimeMoment.from(currentTimeMoment, true)}`;
    }
  }

  checkIfHoursLogged(eventCoaches) {
    let isHoursLogged = true;

    _.toPairs(eventCoaches).map(([coachID, coachInfo]) => {
      isHoursLogged =
        isHoursLogged &&
        (coachInfo.hours.status === "APPROVED" ||
          !coachInfo.attendance.didAttend);
    });

    return isHoursLogged;
  }

  getEventCards() {
    const { navigateTo, isMobile, events } = this.props;

    return _.toPairs(events).map(([eventID, eventInfo]) => {
      const eventDateMoment = moment(eventInfo.requiredInfo.times.start);
      const eventDateString = eventDateMoment.format("YYYY-MM-DD");
      const title = eventInfo.requiredInfo.title;
      const type = eventInfo.requiredInfo.type;
      const isCompetitive = eventInfo.requiredInfo.isCompetitive;
      const isCancelled = eventInfo.requiredInfo.status === "CANCELLED";
      const venue = eventInfo.optionalInfo.venue;
      const notes = eventInfo.optionalInfo.notes;
      const times = eventInfo.requiredInfo.times;
      const relativeTime = this.getRelativeTime(times);
      const hasHoursLogging = _.keys(eventInfo.coaches).length !== 0;
      const isHoursLogged = this.checkIfHoursLogged(eventInfo.coaches);

      return (
        <EventCard
          key={`today-card-${eventID}`}
          isMobile={isMobile}
          isCancelled={isCancelled}
          isCompetitive={isCompetitive}
          title={title}
          relativeTime={relativeTime}
          times={times}
          eventType={type}
          venue={venue}
          notes={notes}
          isHoursLogged={isHoursLogged}
          hasHoursLogging={hasHoursLogging}
          isResultsLogged={false}
          viewEventInfo={() =>
            navigateTo(`/myaccount/schedule/${eventDateString}/${eventID}`)}
        />
      );
    });
  }

  render() {
    const { classes } = this.props;

    const eventCards = this.getEventCards();

    return (
      <div className={classes.wrapper}>
        {eventCards.length === 0 ? (
          <div className={classes.emptyState}>
            <EmptyState message="No events today" />
          </div>
        ) : (
          eventCards
        )}
      </div>
    );
  }
}

export default injectSheet(styles)(Today);
