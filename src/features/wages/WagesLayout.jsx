// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import WagesTable from "./components/WagesTable";
import LeaderboardAd from "../../components/LeaderboardAd";

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
    const { classes, accountType, isMobile, isTablet, wageInfo } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.adWrapper}>
          <LeaderboardAd />
        </div>
        {accountType === "coach" && (
          <div className={classes.wagesTableWrapper}>
            <WagesTable
              isMobile={isMobile}
              isTablet={isTablet}
              wageInfo={wageInfo}
            />
          </div>
        )}
        {accountType === "institution" && (
          <div className={classes.wagesTableWrapper}>
            <WagesTable
              isMobile={isMobile}
              isTablet={isTablet}
              wageInfo={wageInfo}
            />
          </div>
        )}
      </div>
    );
  }
}

WagesLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WagesLayout);
