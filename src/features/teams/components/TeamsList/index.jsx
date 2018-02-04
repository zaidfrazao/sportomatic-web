import React, { Component } from "react";
import { grey } from "material-ui/colors";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import TeamCard from "./components/TeamCard";

const styles = {
  noTeamsText: {
    color: grey[500],
    padding: 40,
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
    const { classes, teams, hasTeamsCreated } = this.props;
    const { openDeleteTeamAlert } = this.props.actions;

    if (teams.length > 0) {
      return (
        <div className={classes.wrapper}>
          <Grid container direction="row" spacing={40} align="stretch">
            {teams.map(teamInfo => (
              <Grid item xs={12} sm={12} md={6} lg={4} xl={4} key={teamInfo.id}>
                <TeamCard
                  name={teamInfo.name}
                  sport={teamInfo.sport}
                  id={teamInfo.id}
                  status={teamInfo.status}
                  actions={{ deleteTeam: openDeleteTeamAlert }}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      );
    } else {
      return (
        <div className={classes.noTeamsWrapper}>
          <Typography
            type="title"
            component="h3"
            className={classes.noTeamsText}
          >
            {hasTeamsCreated
              ? "No teams found"
              : 'Press "+" to create your first team'}
          </Typography>
        </div>
      );
    }
  }
}

export default withStyles(styles)(TeamsList);
