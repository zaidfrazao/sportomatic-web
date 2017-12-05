import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import TeamCard from "./components/TeamCard";

const styles = {
  wrapper: {
    padding: 24,
    maxWidth: 1200,
    margin: "0 auto"
  }
};

class TeamsList extends Component {
  render() {
    const { classes, teams } = this.props;
    const { openDeleteTeamAlert } = this.props.actions;
    return (
      <div className={classes.wrapper}>
        <Grid container direction="row" spacing={40} align="stretch">
          {teams.map(teamInfo => (
            <Grid item xs={12} sm={12} md={6} lg={4} xl={4} key={teamInfo.id}>
              <TeamCard
                name={teamInfo.name}
                sport={teamInfo.sport}
                id={teamInfo.id}
                actions={{ deleteTeam: openDeleteTeamAlert }}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(TeamsList);
