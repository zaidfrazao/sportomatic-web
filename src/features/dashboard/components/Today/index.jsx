/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import injectSheet from "react-jss";
import moment from "moment";
import EmptyState from "../../../../components/EmptyState";
import EventCard from "./components/EventCard";
import { green, grey } from "../../../../utils/colours";

const tabletBreakpoint = 1080;

const styles = {
  actionsBar: {
    margin: "24px 24px 0 24px",
    backgroundColor: grey[200],
    display: "flex",
    justifyContent: "center"
  },
  cardsWrapper: {
    display: "flex",
    flexWrap: "wrap",
    margin: "0 auto"
  },
  cardWrapper: {
    width: "100%",
    padding: 24,
    [`@media (min-width: ${tabletBreakpoint}px)`]: {
      width: "calc(50% - 48px)"
    }
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
  thumbsUpIcon: {
    marginRight: 12,
    fontSize: 20,
    color: green[500]
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
    } else if (
      currentTimeMoment.isAfter(startTimeMoment) &&
      currentTimeMoment.isBefore(endTimeMoment)
    ) {
      return `Ends in about ${currentTimeMoment.to(endTimeMoment, true)}`;
    } else {
      return `Ended about ${endTimeMoment.from(currentTimeMoment, true)} ago`;
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

  checkIfResultsLogged(eventTeams) {
    let isResultsLogged = true;

    _.toPairs(eventTeams).map(([teamID, teamInfo]) => {
      isResultsLogged =
        isResultsLogged && teamInfo.resultsStatus === "FINALISED";
    });

    return isResultsLogged;
  }

  getEventCards() {
    const {
      classes,
      navigateTo,
      isMobile,
      events,
      meAllFilter,
      isUserAdmin,
      roles
    } = this.props;

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
      const isResultsLogged = this.checkIfResultsLogged(eventInfo.teams);

      return (
        <div className={classes.cardWrapper} key={`today-card-${eventID}`}>
          <EventCard
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
            isResultsLogged={isResultsLogged}
            hasHoursLogging={hasHoursLogging}
            showLogging={
              isUserAdmin ||
              (roles.coach && roles.manager && meAllFilter === "me")
            }
            viewEventInfo={() =>
              navigateTo(`/myaccount/schedule/${eventDateString}/${eventID}`)}
          />
        </div>
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
            <EmptyState>
              <i className={`${classes.thumbsUpIcon} fas fa-thumbs-up`} />You
              have no events on today.
            </EmptyState>
          </div>
        ) : (
          <div className={classes.cardsWrapper}>{eventCards}</div>
        )}
      </div>
    );
  }
}

export default injectSheet(styles)(Today);
