// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { grey } from "material-ui/colors";
import TeamsList from "./components/TeamsList";
import TeamInfo from "./components/TeamInfo";
import LeaderboardAd from "../../../components/LeaderboardAd";
import { getTeamsList } from "./js/teams";

const styles = theme => ({
  root: {
    width: "100%"
  },
  adWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    margin: "24px 0"
  },
  button: {
    margin: theme.spacing.unit,
    position: "fixed",
    bottom: 72,
    right: 24,
    "@media (min-width: 600px)": {
      bottom: 24
    }
  },
  toolbar: {
    backgroundColor: grey[300],
    zIndex: 1
  }
});

class TeamsLayout extends Component {
  render() {
    const { classes } = this.props;
    const { teamID } = this.props.match.params;
    const teams = getTeamsList();
    return (
      <div className={classes.root}>
        {teamID ? (
          <div>
            <TeamInfo info={teams[teamID]} />
          </div>
        ) : (
          <div>
            <div className={classes.adWrapper}>
              <LeaderboardAd />
            </div>
            <TeamsList teams={teams} />
          </div>
        )}
      </div>
    );
  }
}

TeamsLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TeamsLayout);
