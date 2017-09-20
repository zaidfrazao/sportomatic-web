// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { grey } from "material-ui/colors";
import AddIcon from "material-ui-icons/Add";
import EditIcon from "material-ui-icons/Edit";
import Button from "material-ui/Button";
import TeamsList from "./components/TeamsList";
import TeamInfo from "./components/TeamInfo";
import LeaderboardAd from "../../components/LeaderboardAd";
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
    const { classes, accountType } = this.props;
    const { teamID } = this.props.match.params;
    const teams = getTeamsList();
    return (
      <div className={classes.root}>
        {teamID ? (
          <div>
            <TeamInfo info={teams[teamID]} accountType={accountType} />
            {accountType === "institution" && (
              <Button
                fab
                color="accent"
                aria-label="edit team"
                className={classes.button}
              >
                <EditIcon />
              </Button>
            )}
          </div>
        ) : (
          <div>
            <div className={classes.adWrapper}>
              <LeaderboardAd />
            </div>
            <TeamsList accountType={accountType} teams={teams} />
            {accountType === "institution" && (
              <Button
                fab
                color="accent"
                aria-label="add team"
                className={classes.button}
              >
                <AddIcon />
              </Button>
            )}
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
