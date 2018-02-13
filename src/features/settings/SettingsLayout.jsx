import React, { Component } from "react";
import _ from "lodash";
import AppBar from "material-ui/AppBar";
import { Redirect } from "react-router-dom";
import Tabs, { Tab } from "material-ui/Tabs";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import BannerAd from "../../components/BannerAd";
import InstitutionInfo from "./components/InstitutionInfo";
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
  name: {
    margin: 24,
    width: "calc(100% - 48px)",
    textAlign: "center"
  },
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  tabs: {
    height: 64
  }
});

class SettingsLayout extends Component {
  componentWillMount() {
    const { institutionID } = this.props.match.params;
    const { updateTab } = this.props.actions;

    if (institutionID) {
      updateTab("INSTITUTIONS");
    }
  }

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
      isUpdateLoginDetailsLoading,
      isUpdatePermissionsLoading,
      isUpdatePaymentDefaultsLoading,
      isUpdateProfilePictureLoading
    } = this.props.loadingStatus;
    const {
      updateTab,
      updateBasicInfo,
      updateSports,
      updateLoginDetails,
      updatePermissions,
      updatePaymentDefaults,
      updateProfilePicture
    } = this.props.actions;

    const ad = this.createAd();

    if (institutionID && accountInfo.institutions) {
      if (accountInfo.institutions[institutionID].roles.admin !== "APPROVED") {
        return <Redirect to="/myaccount/settings" />;
      }
    }

    if (institutionID) {
      return (
        <div className={classes.root}>
          <AppBar position="static" color="default">
            {!institutions[institutionID] ? (
              <Typography className={classes.name} type="title" component="h2">
                Loading...
              </Typography>
            ) : (
              <Typography className={classes.name} type="title" component="h2">
                {`${institutions[institutionID].info.name}`}
              </Typography>
            )}
          </AppBar>
          <InstitutionInfo
            info={institutions[institutionID]}
            institutionID={institutionID}
            isUpdatePermissionsLoading={isUpdatePermissionsLoading}
            isUpdatePaymentDefaultsLoading={isUpdatePaymentDefaultsLoading}
            isMobile={isMobile}
            isTablet={isTablet}
            userID={userID}
            actions={{
              updatePermissions,
              updatePaymentDefaults,
              updateTab
            }}
          />
        </div>
      );
    } else {
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
              isUpdateProfilePictureLoading={isUpdateProfilePictureLoading}
              isMobile={isMobile}
              isTablet={isTablet}
              actions={{
                updateBasicInfo,
                updateSports,
                updateLoginDetails,
                updateProfilePicture
              }}
            />
          )}
          {currentTab === "INSTITUTIONS" && (
            <div>
              <div className={classes.adWrapper}>{ad}</div>
              <InstitutionsList
                institutions={this.getInstitutionCardsInfo(institutions)}
              />
            </div>
          )}
        </div>
      );
    }
  }
}

export default withStyles(styles)(SettingsLayout);
