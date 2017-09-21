// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import WagesTable from "./components/WagesTable";
import LeaderboardAd from "../../../components/LeaderboardAd";

const styles = theme => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  adWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    margin: "24px 0"
  },
  wagesTableWrapper: {
    flexGrow: 1,
    display: "flex"
  }
});

class WagesLayout extends Component {
  render() {
    const { classes, isMobile, isTablet, wageInfo } = this.props;
    const { dateSelected } = this.props.match.params;

    if (dateSelected) {
      const dateComponents = dateSelected.split("-");
      const year = parseInt(dateComponents[0], 10);
      const month = parseInt(dateComponents[1], 10);
      return (
        <div className={classes.root}>
          <div className={classes.adWrapper}>
            <LeaderboardAd />
          </div>
          <div className={classes.wagesTableWrapper}>
            <WagesTable
              isMobile={isMobile}
              isTablet={isTablet}
              wageInfo={wageInfo[year][month]}
              year={year}
              month={month}
            />
          </div>
        </div>
      );
    } else {
      return (
        <Redirect
          to={`/coach/wages/${new Date(Date.now()).getFullYear()}-${new Date(
            Date.now()
          ).getMonth()}`}
        />
      );
    }
  }
}

WagesLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WagesLayout);
