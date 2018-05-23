import React, { Component } from "react";
import injectStyles from "react-jss";
import EmptyState from "../../../../components/EmptyState";
import TeamCard from "./components/TeamCard";

const mobileBreakpoint = 800;
const tabletBreakpoint = 1080;

const styles = {
  cardsWrapper: {
    display: "flex",
    flexWrap: "wrap",
    padding: 24,
    margin: "0 auto"
  },
  cardWrapper: {
    padding: 24,
    width: "calc(100% - 48px)",
    [`@media (min-width: ${mobileBreakpoint}px)`]: {
      width: "calc(50% - 48px)"
    },
    [`@media (min-width: ${tabletBreakpoint}px)`]: {
      width: "calc(33% - 48px)"
    }
  },
  emptyState: {
    padding: 24
  }
};

class TeamsList extends Component {
  render() {
    const { classes, teams, navigateTo } = this.props;

    if (teams.length > 0) {
      return (
        <div className={classes.cardsWrapper}>
          {teams.map(teamInfo => (
            <div className={classes.cardWrapper} key={teamInfo.id}>
              <TeamCard
                name={teamInfo.name}
                sport={teamInfo.sport}
                id={teamInfo.id}
                status={teamInfo.status}
                navigateTo={navigateTo}
              />
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className={classes.emptyState}>
          <EmptyState message="No teams" />
        </div>
      );
    }
  }
}

export default injectStyles(styles)(TeamsList);
