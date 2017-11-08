import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import TeamCard from "./components/TeamCard";

const styles = {
  wrapper: {
    padding: 24
  }
};

class TeamsList extends Component {
  render() {
    const { classes, teams } = this.props;

    return (
      <div className={classes.wrapper}>
        <Grid container direction="row" spacing={40} align="stretch">
          {teams.map(teamInfo => (
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={teamInfo.id}>
              <TeamCard
                name={teamInfo.name}
                sport={teamInfo.sport}
                id={teamInfo.id}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(TeamsList);
