// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import WagesTable from "./components/WagesTable";
import LeaderboardAd from "../../../components/LeaderboardAd";
import BannerAd from "../../../components/BannerAd";
import LargeMobileBannerAd from "../../../components/LargeMobileBannerAd";
import { CircularProgress } from "material-ui/Progress";

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
    justifyContent: "center"
  },
  wagesTableWrapper: {
    flexGrow: 1,
    display: "flex"
  },
  loaderWrapper: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    margin: "24px 24px 0 24px",
    "@media (max-width: 960px)": {
      margin: 0,
      width: "100%"
    }
  },
  coachName: {
    margin: 24,
    width: "calc(100% - 48px)",
    textAlign: "center"
  }
});

class WagesLayout extends Component {
  componentWillMount() {
    const { userID, activeInstitutionID } = this.props;
    const { loadCoachWages } = this.props.actions;

    loadCoachWages(activeInstitutionID, userID);
  }

  componentWillReceiveProps(nextProps) {
    const { userID, activeInstitutionID } = this.props;
    const { loadCoachWages } = this.props.actions;

    if (activeInstitutionID !== nextProps.activeInstitutionID) {
      loadCoachWages(nextProps.activeInstitutionID, nextProps.userID);
    }
    if (userID !== nextProps.userID) {
      loadCoachWages(nextProps.activeInstitutionID, nextProps.userID);
    }
  }

  render() {
    const { classes, isMobile, isTablet, coachWages } = this.props;
    const { isWagesLoading } = this.props.loadingStatus;

    let ad = <LeaderboardAd />;
    if (isMobile) {
      ad = <LargeMobileBannerAd />;
    } else if (isTablet) {
      ad = <BannerAd />;
    }

    if (isWagesLoading) {
      return (
        <div className={classes.root}>
          <div className={classes.loaderWrapper}>
            <CircularProgress />
          </div>
        </div>
      );
    } else {
      return (
        <div className={classes.root}>
          <div className={classes.adWrapper}>{ad}</div>
          <div className={classes.wagesTableWrapper}>
            <WagesTable
              isMobile={isMobile}
              isTablet={isTablet}
              wages={coachWages}
            />
          </div>
        </div>
      );
    }
  }
}

WagesLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WagesLayout);
