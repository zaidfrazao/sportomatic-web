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

class Results extends Component {
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
    const { classes, navigateTo, isMobile, events, emblem } = this.props;

    return _.toPairs(events).map(([eventID, eventInfo]) => {
      const eventDateMoment = moment(eventInfo.requiredInfo.times.start);
      const eventDateString = eventDateMoment.format("YYYY-MM-DD");
      const homeAway = eventInfo.optionalInfo.homeAway;
      const title = eventInfo.requiredInfo.title;
      const times = eventInfo.requiredInfo.times;
      const date = eventDateMoment.format("D MMMM YYYY");

      return _.toPairs(eventInfo.teams).map(([teamID, teamInfo]) => {
        const sport = teamInfo.logger;
        return _.toPairs(
          teamInfo.opponents
        ).map(([opponentID, opponentInfo]) => {
          let opponentName = "Unknown opponents";
          if (opponentInfo.name !== "") {
            opponentName = opponentInfo.name;
          }

          let homeTeam = {};
          let awayTeam = {};

          if (homeAway === "HOME") {
            homeTeam = {
              isUsersTeam: true,
              name: teamInfo.name,
              emblem,
              requiredStats:
                opponentInfo.ourScore && opponentInfo.ourScore.requiredStats,
              optionalStats:
                opponentInfo.ourScore && opponentInfo.ourScore.optionalStats
            };
            awayTeam = {
              isUsersTeam: false,
              name: opponentName,
              emblem: "",
              requiredStats:
                opponentInfo.theirScore &&
                opponentInfo.theirScore.requiredStats,
              optionalStats:
                opponentInfo.theirScore && opponentInfo.theirScore.optionalStats
            };
          } else {
            homeTeam = {
              isUsersTeam: false,
              name: opponentName,
              emblem: "",
              requiredStats:
                opponentInfo.theirScore &&
                opponentInfo.theirScore.requiredStats,
              optionalStats:
                opponentInfo.theirScore && opponentInfo.theirScore.optionalStats
            };
            awayTeam = {
              isUsersTeam: true,
              name: teamInfo.name,
              emblem,
              requiredStats:
                opponentInfo.ourScore && opponentInfo.ourScore.requiredStats,
              optionalStats:
                opponentInfo.ourScore && opponentInfo.ourScore.optionalStats
            };
          }

          return (
            <div
              className={classes.cardWrapper}
              key={`result-card-${eventID}-${teamID}-${opponentID}`}
            >
              <EventCard
                isMobile={isMobile}
                sport={sport}
                title={title}
                times={times}
                date={date}
                homeTeam={homeTeam}
                awayTeam={awayTeam}
                viewEventInfo={() =>
                  navigateTo(
                    `/myaccount/schedule/${eventDateString}/${eventID}`
                  )}
              />
            </div>
          );
        });
      });
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

export default injectSheet(styles)(Results);
