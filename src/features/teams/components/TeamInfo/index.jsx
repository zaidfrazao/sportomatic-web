/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import { Redirect } from "react-router-dom";
import injectStyles from "react-jss";
import Button from "../../../../components/Button";
import BannerAd from "../../../../components/BannerAd";
import { common, grey, lightBlue } from "../../../../utils/colours";
import Details from "./components/Details";
import LargeMobileBannerAd from "../../../../components/LargeMobileBannerAd";
import LeaderboardAd from "../../../../components/LeaderboardAd";
import Tabs from "../../../../components/Tabs";

const styles = {
  actionsBar: {
    margin: "0 12px",
    backgroundColor: grey[200],
    display: "flex",
    justifyContent: "center"
  },
  adWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonSeparator: {
    height: 12
  },
  buttonWrapper: {
    margin: "24px 12px"
  },
  flexGrow: {
    flexGrow: 1
  },
  header: {
    margin: "0 24px",
    padding: 12,
    borderRadius: 16,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    color: common["white"],
    backgroundColor: lightBlue[800]
  },
  iconAdjacentText: {
    marginRight: 8
  },
  menuButtonWrapper: {
    margin: "0 24px"
  },
  outerWrapper: {
    flexGrow: 1,
    overflow: "auto"
  },
  root: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column"
  },
  section: {
    borderRadius: 16,
    marginBottom: 24,
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: common["white"]
  },
  sectionContent: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  sectionHeading: {
    fontSize: 18,
    borderRadius: "16px 16px 0 0",
    padding: "18px 0",
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    color: common["white"],
    backgroundColor: grey[500]
  },
  sectionList: {
    flexGrow: 1,
    margin: "12px 12px 0 12px",
    width: "calc(100% - 24px)"
  },
  subheader: {
    margin: "12px 24px 0 24px",
    padding: 12,
    borderRadius: 16,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    color: grey[800],
    backgroundColor: grey[300]
  },
  tabsWrapper: {
    margin: "0 24px 24px 24px"
  },
  wrapper: {
    padding: 24
  }
};

class TeamInfo extends Component {
  state = {
    tabSelected: "details"
  };

  updateTabSelected(newTab) {
    this.setState({
      tabSelected: newTab
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

  getInfo() {
    const { info } = this.props;

    let reformattedInfo = {
      name: "Loading",
      ageGroup: "Loading",
      division: "Loading",
      gender: "Loading",
      sport: "Loading"
    };

    if (info) {
      reformattedInfo = {
        name: info.info.name,
        ageGroup: info.info.ageGroup,
        division: info.info.division,
        gender: info.info.gender,
        sport: info.info.sport
      };
    }

    return reformattedInfo;
  }

  getSectionDisplay(info, coaches, managers) {
    const { classes, isMobile, infoTab, teamID } = this.props;
    const { navigateTo } = this.props.actions;
    const { tabSelected } = this.state;

    const ad = this.createAd();

    if (isMobile) {
      switch (infoTab) {
        case "details":
          return (
            <div>
              <div className={classes.adWrapper}>{ad}</div>
              <Details
                name={info.name}
                ageGroup={info.ageGroup}
                division={info.division}
                sport={info.sport}
                gender={info.gender}
                coaches={coaches}
                managers={managers}
                navigateTo={navigateTo}
              />
            </div>
          );
        default:
          return (
            <div>
              <div className={classes.menuButtonWrapper}>
                <Button
                  type="dark"
                  colour="primary"
                  filled
                  fullWidth
                  handleClick={() =>
                    navigateTo(`/myaccount/teams/${teamID}/details`)}
                >
                  Details
                </Button>
              </div>
              <div className={classes.buttonSeparator} />
              <div className={classes.menuButtonWrapper}>
                <Button
                  type="dark"
                  colour="primary"
                  filled
                  fullWidth
                  handleClick={() =>
                    navigateTo(`/myaccount/teams/${teamID}/seasons`)}
                >
                  Seasons
                </Button>
              </div>
            </div>
          );
      }
    } else {
      switch (tabSelected) {
        case "details":
          return (
            <div>
              <div className={classes.adWrapper}>{ad}</div>
              <Details
                name={info.name}
                ageGroup={info.ageGroup}
                division={info.division}
                sport={info.sport}
                gender={info.gender}
                coaches={coaches}
                managers={managers}
                navigateTo={navigateTo}
              />
            </div>
          );
        default:
          return (
            <div>
              <div className={classes.adWrapper}>{ad}</div>
              <Details
                name={info.name}
                ageGroup={info.ageGroup}
                division={info.division}
                sport={info.sport}
                gender={info.gender}
                coaches={coaches}
                managers={managers}
                navigateTo={navigateTo}
              />
            </div>
          );
      }
    }
  }

  getTabs(isUserInfo, isUserManager, isUserAdmin) {
    const allTabs = [
      {
        key: "details",
        label: "Details"
      },
      {
        key: "seasons",
        label: "Seasons"
      }
    ];

    return allTabs;
  }

  getManagers() {
    const { info, staff } = this.props;

    if (info) {
      return _.toPairs(info.managers).map(([managerID, eventManagerInfo]) => {
        const managerInfo = staff[managerID];
        if (managerInfo) {
          return {
            id: managerID,
            name: `${managerInfo.info.name} ${managerInfo.info.surname}`,
            profilePicture: managerInfo.info.profilePictureURL
          };
        } else {
          return {
            id: managerID,
            name: "Error finding manager",
            profilePicture: ""
          };
        }
      });
    } else {
      return [];
    }
  }

  getCoaches() {
    const { info, staff } = this.props;

    if (info) {
      return _.toPairs(info.coaches).map(([coachID, eventCoachInfo]) => {
        const coachInfo = staff[coachID];
        if (coachInfo) {
          return {
            id: coachID,
            name: `${coachInfo.info.name} ${coachInfo.info.surname}`,
            profilePicture: coachInfo.info.profilePictureURL
          };
        } else {
          return {
            id: coachID,
            name: "Error finding manager",
            profilePicture: ""
          };
        }
      });
    } else {
      return [];
    }
  }

  render() {
    const { classes, isMobile, infoTab, teamID, isUserAdmin } = this.props;
    const { editTeam, goBack } = this.props.actions;
    const { tabSelected } = this.state;

    const info = this.getInfo();
    const coaches = this.getCoaches();
    const managers = this.getManagers();

    if (!isMobile && infoTab) {
      return <Redirect to={`/myaccount/teams/${teamID}`} />;
    }

    const sectionDisplay = this.getSectionDisplay(info, coaches, managers);
    const tabs = this.getTabs();

    return (
      <div className={classes.root}>
        <div className={classes.header}>{info.name}</div>
        <div className={classes.outerWrapper}>
          <div className={classes.actionsBar}>
            <div className={classes.buttonWrapper}>
              <Button colour="secondary" slim handleClick={() => goBack()}>
                <i
                  className={`fas fa-caret-left ${classes.iconAdjacentText}`}
                />
                Back
              </Button>
            </div>
            <div className={classes.flexGrow} />
            {isUserAdmin &&
              !isMobile && (
                <div className={classes.buttonWrapper}>
                  <Button
                    colour="secondary"
                    filled
                    slim
                    handleClick={() => editTeam()}
                  >
                    <i className={`fas fa-edit ${classes.iconAdjacentText}`} />
                    Edit team
                  </Button>
                </div>
              )}
          </div>
          {!isMobile && (
            <div className={classes.tabsWrapper}>
              <Tabs
                tabs={tabs}
                selected={tabSelected}
                handleClick={newTab => this.updateTabSelected(newTab)}
              />
            </div>
          )}
          {sectionDisplay}
        </div>
      </div>
    );
  }
}

export default injectStyles(styles)(TeamInfo);
