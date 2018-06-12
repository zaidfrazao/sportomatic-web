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
import Seasons from "./components/Seasons";
import Tabs from "../../../../components/Tabs";

const styles = {
  adWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  backButton: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: lightBlue[800],
    color: common["white"],
    cursor: "pointer",
    textAlign: "center",
    fontSize: 24,
    padding: "18px 24px",
    borderRadius: "16px 0 0 16px",
    "&:hover": {
      backgroundColor: lightBlue[700]
    }
  },
  buttonSeparator: {
    height: 12
  },
  header: {
    display: "flex",
    border: `1px solid ${grey[300]}`,
    margin: "0 24px 24px 24px",
    borderRadius: 16,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: grey[800],
    backgroundColor: common["white"]
  },
  headerInnerWrapper: {
    flexGrow: 1,
    textAlign: "center",
    padding: 24
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
  tabsWrapper: {
    margin: "0 24px 24px 24px"
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

  getSectionDisplay(info) {
    const {
      classes,
      isMobile,
      infoTab,
      teamID,
      seasons,
      staff,
      institutionCreationDate
    } = this.props;
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
                isMobile={isMobile}
                name={info.name}
                ageGroup={info.ageGroup}
                division={info.division}
                sport={info.sport}
                gender={info.gender}
                seasons={seasons}
                staff={staff}
                navigateTo={navigateTo}
              />
            </div>
          );
        case "seasons":
          return (
            <div>
              <div className={classes.adWrapper}>{ad}</div>
              <Seasons
                seasons={seasons}
                institutionCreationDate={institutionCreationDate}
                staff={staff}
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
                isMobile={isMobile}
                name={info.name}
                ageGroup={info.ageGroup}
                division={info.division}
                sport={info.sport}
                gender={info.gender}
                seasons={seasons}
                staff={staff}
                navigateTo={navigateTo}
              />
            </div>
          );
        case "seasons":
          return (
            <div>
              <div className={classes.adWrapper}>{ad}</div>
              <Seasons
                seasons={seasons}
                institutionCreationDate={institutionCreationDate}
                staff={staff}
                navigateTo={navigateTo}
              />
            </div>
          );
        default:
          return (
            <div>
              <div className={classes.adWrapper}>{ad}</div>
              <Details
                isMobile={isMobile}
                name={info.name}
                ageGroup={info.ageGroup}
                division={info.division}
                sport={info.sport}
                gender={info.gender}
                seasons={seasons}
                staff={staff}
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

  getSeasons() {
    const { seasons } = this.props;

    return _.toPairs(seasons)
      .map(([seasonID, seasonInfo]) => {
        return seasonInfo;
      })
      .sort((seasonA, seasonB) => {
        if (seasonA.dates.start < seasonB.dates.start) {
          return +1;
        } else {
          if (seasonA.dates.end < seasonB.dates.end) {
            return +1;
          } else {
            return -1;
          }
        }
      });
  }

  render() {
    const { classes, isMobile, infoTab, teamID } = this.props;
    const { goBack } = this.props.actions;
    const { tabSelected } = this.state;

    const info = this.getInfo();

    if (!isMobile && infoTab) {
      return <Redirect to={`/myaccount/teams/${teamID}`} />;
    }

    const sectionDisplay = this.getSectionDisplay(info);
    const tabs = this.getTabs();

    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <div className={classes.backButton} onClick={() => goBack()}>
            <div>
              <i className="fas fa-caret-left" />
            </div>
          </div>
          <div className={classes.headerInnerWrapper}>{info.name}</div>
        </div>
        <div className={classes.outerWrapper}>
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
