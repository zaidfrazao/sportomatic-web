import React, { Component } from "react";
import _ from "lodash";
import AppBar from "material-ui/AppBar";
import { Redirect } from "react-router-dom";
import Tabs, { Tab } from "material-ui/Tabs";
import { withStyles } from "material-ui/styles";
import BannerAd from "../../components/BannerAd";
import InstitutionsList from "./components/InstitutionsList";
import LargeMobileBannerAd from "../../components/LargeMobileBannerAd";
import LeaderboardAd from "../../components/LeaderboardAd";
import PersonInfo from "./components/PersonInfo";

const styles = theme => ({
  adWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: 24
  },
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  tabs: {
    height: 72
  }
});

class SettingsLayout extends Component {
  componentWillUnmount() {
    const { resetState } = this.props.actions;
    resetState();
  }

  getInstitutionCardsInfo(institutions) {
    const { accountInfo } = this.props;
    return _.values(
      _.mapValues(institutions, (value, key) => {
        return {
          ...value,
          id: key,
          name: value.info.name,
          emblemURL: value.info.emblemURL,
          type: value.info.type,
          canEdit: accountInfo.institutions[key].roles.admin === "APPROVED"
        };
      })
    ).sort((institutionA, institutionB) => {
      if (institutionA.info.name > institutionB.info.name) return +1;
      if (institutionA.info.name < institutionB.info.name) return -1;
      return 0;
    });
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
    const {
      classes,
      accountInfo,
      isAccountInfoLoading,
      isMobile,
      isTablet,
      userID,
      institutions,
      history
    } = this.props;
    const { institutionID } = this.props.match.params;
    const { currentTab } = this.props.uiConfig;
    const {
      isUpdateBasicInfoLoading,
      isUpdateSportsLoading,
      isUpdateLoginDetailsLoading
    } = this.props.loadingStatus;
    const {
      updateTab,
      updateBasicInfo,
      updateSports,
      updateLoginDetails
    } = this.props.actions;

    const ad = this.createAd();

    if (institutionID && accountInfo.institutions) {
      if (accountInfo.institutions[institutionID].roles.admin !== "APPROVED") {
        return <Redirect to="/myaccount/settings" />;
      }
    }

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={currentTab}
            onChange={(event, newTab) => {
              history.push("/myaccount/settings");
              updateTab(newTab);
            }}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Personal" value="PERSONAL" className={classes.tabs} />
            <Tab
              label="Institutions"
              value="INSTITUTIONS"
              className={classes.tabs}
            />
          </Tabs>
        </AppBar>
        {currentTab === "PERSONAL" && (
          <PersonInfo
            accountInfo={accountInfo}
            userID={userID}
            isAccountInfoLoading={isAccountInfoLoading}
            isUpdateBasicInfoLoading={isUpdateBasicInfoLoading}
            isUpdateSportsLoading={isUpdateSportsLoading}
            isUpdateLoginDetailsLoading={isUpdateLoginDetailsLoading}
            isMobile={isMobile}
            isTablet={isTablet}
            actions={{
              updateBasicInfo,
              updateSports,
              updateLoginDetails
            }}
          />
        )}
        {currentTab === "INSTITUTIONS" &&
          (!institutionID && (
            <div>
              <div className={classes.adWrapper}>{ad}</div>
              <InstitutionsList
                institutions={this.getInstitutionCardsInfo(institutions)}
              />
            </div>
          ))}
      </div>
    );
  }
}

export default withStyles(styles)(SettingsLayout);
