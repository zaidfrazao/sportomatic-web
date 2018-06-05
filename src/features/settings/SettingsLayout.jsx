/* eslint-disable array-callback-return */
import React, { Component } from "react";
import injectSheet from "react-jss";
import BannerAd from "../../components/BannerAd";
import PersonalInfo from "./components/PersonalInfo";
import LargeMobileBannerAd from "../../components/LargeMobileBannerAd";
import LeaderboardAd from "../../components/LeaderboardAd";

const styles = {
  adWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  contentWrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column"
  }
};

class SettingsLayout extends Component {
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

  getPersonalInfoView() {
    const {
      isTablet,
      isMobile,
      classes,
      userID,
      navigateTo,
      goBack,
      personalInfo
    } = this.props;
    const {
      isEditPersonalInfoLoading,
      isEditSportsLoading
    } = this.props.loadingStatus;
    const { editPersonalInfo, editSports } = this.props.actions;

    const ad = this.createAd();

    return (
      <div className={classes.root}>
        <div className={classes.contentWrapper}>
          <div className={classes.adWrapper}>{ad}</div>
          <PersonalInfo
            userID={userID}
            info={personalInfo}
            isMobile={isMobile}
            isTablet={isTablet}
            isEditPersonalInfoLoading={isEditPersonalInfoLoading}
            isEditSportsLoading={isEditSportsLoading}
            actions={{
              navigateTo,
              goBack,
              editSports: sports => editSports(userID, sports),
              editPersonalInfo: (blob, firstName, lastName, phoneNumber) =>
                editPersonalInfo(userID, blob, firstName, lastName, phoneNumber)
            }}
          />
        </div>
      </div>
    );
  }

  render() {
    const infoDisplay = this.getPersonalInfoView();

    return <div>{infoDisplay}</div>;
  }
}

export default injectSheet(styles)(SettingsLayout);
