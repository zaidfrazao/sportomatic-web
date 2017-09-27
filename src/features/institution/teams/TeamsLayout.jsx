// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { grey } from "material-ui/colors";
import AddIcon from "material-ui-icons/Add";
import Button from "material-ui/Button";
import EditIcon from "material-ui-icons/Edit";
import TeamsList from "./components/TeamsList";
import TeamInfo from "./components/TeamInfo";
import LeaderboardAd from "../../../components/LeaderboardAd";

const styles = theme => ({
  root: {
    width: "100%"
  },
  adWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
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
    const { classes, teams } = this.props;
    const { teamID } = this.props.match.params;

    return (
      <div className={classes.root}>
        {teamID ? (
          <div>
            <TeamInfo info={teams[teamID]} />
            <Button
              fab
              color="accent"
              aria-label="edit team"
              className={classes.button}
            >
              <EditIcon />
            </Button>
          </div>
        ) : (
          <div>
            <div className={classes.adWrapper}>
              <LeaderboardAd />
            </div>
            <TeamsList teams={teams} />
            <Button
              fab
              color="accent"
              aria-label="add team"
              className={classes.button}
            >
              <AddIcon />
            </Button>
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
