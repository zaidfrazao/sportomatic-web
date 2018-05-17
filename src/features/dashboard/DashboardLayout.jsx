/* eslint-disable array-callback-return */
import React, { Component } from "react";
import injectStyles from "react-jss";
import BannerAd from "../../components/BannerAd";
import LargeMobileBannerAd from "../../components/LargeMobileBannerAd";
import LeaderboardAd from "../../components/LeaderboardAd";

const styles = {
  adWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  root: {
    width: "100%"
  }
};

class DashboardLayout extends Component {
  componentWillMount() {
    const { activeInstitutionID, role, userID } = this.props;
    const {
      loadRecentWages,
      loadStaff,
      loadTeams,
      loadUpcomingEvents,
      loadPastEvents
    } = this.props.actions;

    if (activeInstitutionID && activeInstitutionID !== "" && userID !== "") {
      loadStaff(activeInstitutionID);
      loadTeams(activeInstitutionID);
      loadUpcomingEvents(activeInstitutionID);
      loadPastEvents(activeInstitutionID);
      if (role === "admin") {
        loadRecentWages(activeInstitutionID);
      } else if (role === "coach") {
        loadRecentWages(activeInstitutionID, userID);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { activeInstitutionID, role, userID } = nextProps;
    const {
      loadRecentWages,
      loadStaff,
      loadTeams,
      loadUpcomingEvents,
      loadPastEvents,
      resetState
    } = nextProps.actions;

    if (
      activeInstitutionID !== this.props.activeInstitutionID &&
      activeInstitutionID &&
      activeInstitutionID !== ""
    ) {
      resetState();
      loadStaff(activeInstitutionID);
      loadTeams(activeInstitutionID);
      loadUpcomingEvents(activeInstitutionID);
      loadPastEvents(activeInstitutionID);
      if (role === "admin") {
        loadRecentWages(activeInstitutionID);
      } else if (role === "coach") {
        loadRecentWages(activeInstitutionID, userID);
      }
    }

    if (
      role !== this.props.role &&
      role &&
      role !== "" &&
      activeInstitutionID &&
      activeInstitutionID !== ""
    ) {
      if (role === "admin" || role === "manager") {
        loadRecentWages(activeInstitutionID);
      } else if (role === "coach") {
        loadRecentWages(activeInstitutionID, userID);
      }
    }
  }

  componentWillUnmount() {
    const { resetState } = this.props.actions;
    resetState();
  }

  createAd() {
    const { isMobile, isTablet } = this.props;

    let ad = <LeaderboardAd />;
    if (isMobile) {
      ad = <LargeMobileBannerAd />;
    } else if (isTablet) {
      ad = <BannerAd />;
    }

    return ad;
  }

  render() {
    const { classes } = this.props;

    const ad = this.createAd();

    return (
      <div className={classes.root}>
        <div className={classes.adWrapper}>{ad}</div>
      </div>
    );
  }
}

export default injectStyles(styles)(DashboardLayout);
