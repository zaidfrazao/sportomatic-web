import React, { Component } from "react";
import _ from "lodash";
import injectSheet from "react-jss";
import moment from "moment";
import EmptyState from "../../../../components/EmptyState";
import EventCard from "./components/EventCard";

const styles = {
  emptyState: {
    padding: 24
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

    if (startTimeMoment.isAfter(currentTimeMoment)) {
      return `Starts ${startTimeMoment.to(currentTimeMoment)}`;
    } else if (endTimeMoment.isAfter(currentTimeMoment)) {
      return `Ends ${endTimeMoment.to(currentTimeMoment)}`;
    } else {
      return `Ended ${endTimeMoment.from(currentTimeMoment)}`;
    }
  }

  checkIfHoursLogged(eventCoaches) {
    let isHoursLogged = true;

    _.toPairs(eventCoaches).map(([coachID, coachInfo]) => {
      isHoursLogged =
        isHoursLogged &&
        (coachInfo.hours.status === "APPROVED" ||
          !coachInfo.attendance.willAttend);
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
