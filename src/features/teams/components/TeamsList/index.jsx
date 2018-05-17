import React, { Component } from "react";
import injectStyles from "react-jss";
import { grey } from "../../../../utils/colours";
import TeamCard from "./components/TeamCard";

const styles = {
  noTeamsText: {
    color: grey[500],
    padding: 40,
    borderRadius: 16,
    border: `3px solid ${grey[300]}`
  },
  noTeamsWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: 24
  },
  wrapper: {
    padding: 24,
    maxWidth: 1200,
    margin: "0 auto"
  }
};

class TeamsList extends Component {
  render() {
    const { classes, teams, hasTeamsCreated, navigateTo } = this.props;

    if (teams.length > 0) {
      return (
        <div className={classes.wrapper}>
          {teams.map(teamInfo => (
            <div key={teamInfo.id}>
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
        <div className={classes.noTeamsWrapper}>
          <div className={classes.noTeamsText}>
            {hasTeamsCreated
              ? "No teams found"
              : 'Press "+" to create your first team'}
          </div>
        </div>
      );
    }
  }
}

export default injectStyles(styles)(TeamsList);
