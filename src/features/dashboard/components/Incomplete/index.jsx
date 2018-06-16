/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import injectSheet from "react-jss";
import moment from "moment";
import EmptyState from "../../../../components/EmptyState";
import EventCard from "./components/EventCard";
import { grey } from "../../../../utils/colours";

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
    padding: 12,
    [`@media (min-width: ${tabletBreakpoint}px)`]: {
      width: "calc(50% - 24px)"
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
  wrapper: {
    width: "100%"
  }
};

class Today extends Component {
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
    const { classes, navigateTo, events } = this.props;

    return _.toPairs(events).map(([eventID, eventInfo]) => {
      const eventDateMoment = moment(eventInfo.requiredInfo.times.start);
      const eventDateString = eventDateMoment.format("YYYY-MM-DD");
      const title = eventInfo.requiredInfo.title;
      const isCompetitive = eventInfo.requiredInfo.isCompetitive;
      const isCancelled = eventInfo.requiredInfo.status === "CANCELLED";
      const times = eventInfo.requiredInfo.times;
      const date = eventDateMoment.format("D MMMM YYYY");
      const hasHoursLogging = _.keys(eventInfo.coaches).length !== 0;
      const isHoursLogged = this.checkIfHoursLogged(eventInfo.coaches);

      return (
        <div className={classes.cardWrapper} key={`incomplete-card-${eventID}`}>
          <EventCard
            isCancelled={isCancelled}
            isCompetitive={isCompetitive}
            title={title}
            date={date}
            times={times}
            isHoursLogged={isHoursLogged}
            hasHoursLogging={hasHoursLogging}
            isResultsLogged={false}
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
            <EmptyState message="No incomplete events" />
          </div>
        ) : (
          <div className={classes.cardsWrapper}>{eventCards}</div>
        )}
      </div>
    );
  }
}

export default injectSheet(styles)(Today);