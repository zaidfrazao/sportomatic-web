import React, { Component } from "react";
import _ from "lodash";
import injectStyles from "react-jss";
import { common, red } from "../../../../../../utils/colours";
import EmptyState from "../../../../../../components/EmptyState";
import DesktopLogger from "./components/DesktopLogger";
import MobileLogger from "./components/MobileLogger";

const styles = {
  cancelledAlert: {
    fontSize: 18,
    borderRadius: 16,
    padding: "24px 12px",
    width: "calc(100% - 24px)",
    marginBottom: 24,
    textAlign: "center",
    fontWeight: "bold",
    color: common["white"],
    backgroundColor: red[500]
  },
  cancelledIcon: {
    marginRight: 8
  },
  cancelledWrapper: {
    width: "calc(100% - 48px)",
    margin: 24
  },
  notAllowedIcon: {
    marginRight: 12,
    fontSize: 20,
    color: red[500]
  },
  wrapper: {
    margin: 24
  }
};

class Results extends Component {
  getResultCards() {
    const {
      isTablet,
      teams,
      eventInfo,
      emblem,
      startLogging,
      toggleOptionalStats,
      finaliseResults,
      editResult
    } = this.props;

    if (isTablet) {
      return teams.map(teamInfo => {
        return _.toPairs(
          teamInfo.results.opponents
        ).map(([opponentID, opponentInfo]) => {
          let opponentName = "Unknown opponents";
          if (opponentInfo.name !== "") {
            opponentName = opponentInfo.name;
          }

          if (eventInfo.homeAway === "HOME") {
            return (
              <MobileLogger
                key={`${teamInfo.id}-${opponentID}`}
                editResult={newResult =>
                  editResult(teamInfo.id, opponentID, newResult)}
                startLogging={structure =>
                  startLogging(teamInfo.id, structure, [opponentID])}
                toggleOptionalStats={newState =>
                  toggleOptionalStats(teamInfo.id, opponentID, newState)}
                finaliseResults={() => finaliseResults(teamInfo.id)}
                status={teamInfo.results.resultsStatus}
                sport={teamInfo.results.logger}
                trackOptional={opponentInfo.trackOptionalStats}
                commentary={opponentInfo.commentary}
                playingAtHome={true}
                homeTeam={{
                  isUsersTeam: true,
                  name: teamInfo.name,
                  emblem,
                  requiredStats:
                    opponentInfo.ourScore &&
                    opponentInfo.ourScore.requiredStats,
                  optionalStats:
                    opponentInfo.ourScore && opponentInfo.ourScore.optionalStats
                }}
                awayTeam={{
                  isUsersTeam: false,
                  name: opponentName,
                  emblem: "",
                  requiredStats:
                    opponentInfo.theirScore &&
                    opponentInfo.theirScore.requiredStats,
                  optionalStats:
                    opponentInfo.theirScore &&
                    opponentInfo.theirScore.optionalStats
                }}
              />
            );
          } else {
            return (
              <MobileLogger
                key={`${teamInfo.id}-${opponentID}`}
                editResult={newResult =>
                  editResult(teamInfo.id, opponentID, newResult)}
                startLogging={structure =>
                  startLogging(teamInfo.id, structure, [opponentID])}
                toggleOptionalStats={newState =>
                  toggleOptionalStats(teamInfo.id, opponentID, newState)}
                finaliseResults={() => finaliseResults(teamInfo.id)}
                status={teamInfo.results.resultsStatus}
                sport={teamInfo.results.logger}
                trackOptional={opponentInfo.trackOptionalStats}
                commentary={opponentInfo.commentary}
                playingAtHome={false}
                homeTeam={{
                  isUsersTeam: false,
                  name: opponentName,
                  emblem: "",
                  requiredStats:
                    opponentInfo.theirScore &&
                    opponentInfo.theirScore.requiredStats,
                  optionalStats:
                    opponentInfo.theirScore &&
                    opponentInfo.theirScore.optionalStats
                }}
                awayTeam={{
                  isUsersTeam: true,
                  name: teamInfo.name,
                  emblem,
                  requiredStats:
                    opponentInfo.ourScore &&
                    opponentInfo.ourScore.requiredStats,
                  optionalStats:
                    opponentInfo.ourScore && opponentInfo.ourScore.optionalStats
                }}
              />
            );
          }
        });
      });
    } else {
      return teams.map(teamInfo => {
        return _.toPairs(
          teamInfo.results.opponents
        ).map(([opponentID, opponentInfo]) => {
          let opponentName = "Unknown opponents";
          if (opponentInfo.name !== "") {
            opponentName = opponentInfo.name;
          }

          if (eventInfo.homeAway === "HOME") {
            return (
              <DesktopLogger
                key={`${teamInfo.id}-${opponentID}`}
                editResult={newResult =>
                  editResult(teamInfo.id, opponentID, newResult)}
                startLogging={structure =>
                  startLogging(teamInfo.id, structure, [opponentID])}
                toggleOptionalStats={newState =>
                  toggleOptionalStats(teamInfo.id, opponentID, newState)}
                finaliseResults={() => finaliseResults(teamInfo.id)}
                status={teamInfo.results.resultsStatus}
                sport={teamInfo.results.logger}
                trackOptional={opponentInfo.trackOptionalStats}
                commentary={opponentInfo.commentary}
                playingAtHome={true}
                homeTeam={{
                  isUsersTeam: true,
                  name: teamInfo.name,
                  emblem,
                  requiredStats:
                    opponentInfo.ourScore &&
                    opponentInfo.ourScore.requiredStats,
                  optionalStats:
                    opponentInfo.ourScore && opponentInfo.ourScore.optionalStats
                }}
                awayTeam={{
                  isUsersTeam: false,
                  name: opponentName,
                  emblem: "",
                  requiredStats:
                    opponentInfo.theirScore &&
                    opponentInfo.theirScore.requiredStats,
                  optionalStats:
                    opponentInfo.theirScore &&
                    opponentInfo.theirScore.optionalStats
                }}
              />
            );
          } else {
            return (
              <DesktopLogger
                key={`${teamInfo.id}-${opponentID}`}
                editResult={newResult =>
                  editResult(teamInfo.id, opponentID, newResult)}
                startLogging={structure =>
                  startLogging(teamInfo.id, structure, [opponentID])}
                toggleOptionalStats={newState =>
                  toggleOptionalStats(teamInfo.id, opponentID, newState)}
                finaliseResults={() => finaliseResults(teamInfo.id)}
                status={teamInfo.results.resultsStatus}
                sport={teamInfo.results.logger}
                trackOptional={opponentInfo.trackOptionalStats}
                commentary={opponentInfo.commentary}
                playingAtHome={false}
                homeTeam={{
                  isUsersTeam: false,
                  name: opponentName,
                  emblem: "",
                  requiredStats:
                    opponentInfo.theirScore &&
                    opponentInfo.theirScore.requiredStats,
                  optionalStats:
                    opponentInfo.theirScore &&
                    opponentInfo.theirScore.optionalStats
                }}
                awayTeam={{
                  isUsersTeam: true,
                  name: teamInfo.name,
                  emblem,
                  requiredStats:
                    opponentInfo.ourScore &&
                    opponentInfo.ourScore.requiredStats,
                  optionalStats:
                    opponentInfo.ourScore && opponentInfo.ourScore.optionalStats
                }}
              />
            );
          }
        });
      });
    }
  }

  render() {
    const { classes, isCancelled } = this.props;

    const resultsCards = this.getResultCards();

    return (
      <div className={classes.wrapper}>
        {isCancelled ? (
          <div className={classes.cancelledWrapper}>
            <div className={classes.cancelledAlert}>
              <i
                className={`fas fa-exclamation ${classes.cancelledIcon}`}
              />This event has been cancelled.
            </div>
            <EmptyState>
              <i className={`fas fa-times ${classes.notAllowedIcon}`} />You
              can't log results for cancelled events.
            </EmptyState>
          </div>
        ) : (
          resultsCards
        )}
      </div>
    );
  }
}

export default injectStyles(styles)(Results);
