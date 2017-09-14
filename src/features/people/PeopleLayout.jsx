// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import PeopleList from "./components/PeopleList";
import LeaderboardAd from "../../components/LeaderboardAd";

const styles = theme => ({
  root: {
    width: "100%"
  },
  adWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    margin: "24px 0"
  }
});

class PeopleLayout extends Component {
  render() {
    const { classes, accountType } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.adWrapper}>
          <LeaderboardAd />
        </div>
        <PeopleList
          accountType={accountType}
          people={[
            {
              name: "Brett",
              surname: "Cook",
              type: "Manager",
              profilePictureURL:
                "https://firebasestorage.googleapis.com/v0/b/sportomatic-5e646.appspot.com/o/images%2Fprofile-picture%2F8427160905878?alt=media&token=60b9eaea-0466-4552-8c46-cd8530708cc4"
            },
            {
              name: "Rowan",
              surname: "Walker-Campbell",
              type: "Coach",
              profilePictureURL:
                "https://firebasestorage.googleapis.com/v0/b/sportomatic-5e646.appspot.com/o/images%2Fprofile-picture%2F6608339627275?alt=media&token=af8b1ebd-210d-4f98-baed-4f87dee882b4"
            }
          ]}
        />
      </div>
    );
  }
}

PeopleLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PeopleLayout);
