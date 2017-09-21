// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { grey } from "material-ui/colors";
import AddIcon from "material-ui-icons/Add";
import EditIcon from "material-ui-icons/Edit";
import Button from "material-ui/Button";
import PeopleList from "./components/PeopleList";
import PersonInfo from "./components/PersonInfo";
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

class PeopleLayout extends Component {
  render() {
    const { classes, accountType, people } = this.props;
    const { personID } = this.props.match.params;
    return (
      <div className={classes.root}>
        {personID ? (
          <div>
            <PersonInfo info={people[personID]} accountType={accountType} />
            {accountType === "institution" && (
              <Button
                fab
                color="accent"
                aria-label="edit person"
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
            <PeopleList accountType={accountType} people={people} />
            {accountType === "institution" && (
              <Button
                fab
                color="accent"
                aria-label="add person"
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

PeopleLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PeopleLayout);
