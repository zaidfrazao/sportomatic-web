/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import { Redirect } from "react-router-dom";
import injectStyles from "react-jss";
import Button from "../../../../components/Button";
import BannerAd from "../../../../components/BannerAd";
import { common, grey } from "../../../../utils/colours";
import Details from "./components/Details";
import Hours from "./components/Hours";
import LargeMobileBannerAd from "../../../../components/LargeMobileBannerAd";
import LeaderboardAd from "../../../../components/LeaderboardAd";
import Tabs from "../../../../components/Tabs";
import Wages from "./components/Wages";

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
    border: `1px solid ${grey[300]}`,
    margin: "0 24px",
    padding: 24,
    borderRadius: 16,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: grey[800],
    backgroundColor: common["white"]
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
  subheader: {
    paddingTop: 8,
    marginTop: 8,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    color: grey[700]
  },
  tabsWrapper: {
    margin: "0 24px 24px 24px"
  }
};

class PersonInfo extends Component {
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

  getSportsArray(sports) {
    return _.toPairs(sports)
      .map(([name, plays]) => {
        if (plays && name !== "Unknown") return name;
      })
      .filter(sport => sport !== undefined);
  }

  getInfo() {
    const { info, activeInstitutionID } = this.props;

    let reformattedInfo = {
      email: "Loading",
      firstName: "Loading",
      lastName: "",
      phoneNumber: "Loading",
      profilePicture: "",
      sports: [],
      isAdmin: false
    };

    if (info) {
      const sports = this.getSportsArray(info.info.sports);

      reformattedInfo = {
        sports,
        email: info.info.email,
        firstName: info.info.name,
        lastName: info.info.surname,
        phoneNumber: info.info.phoneNumber,
        profilePicture: info.info.profilePictureURL,
        isAdmin:
          info.institutions[activeInstitutionID].roles.admin === "APPROVED"
      };
    }

    return reformattedInfo;
  }

  getSectionDisplay(info, teams) {
    const {
      classes,
      isMobile,
      isTablet,
      infoTab,
      personID,
      hours,
      wages,
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
                email={info.email}
                firstName={info.firstName}
                lastName={info.lastName}
                phoneNumber={info.phoneNumber}
                sports={info.sports}
                profilePicture={info.profilePicture}
                teams={teams}
                navigateTo={navigateTo}
              />
            </div>
          );
        case "hours":
          return (
            <div>
              <div className={classes.adWrapper}>{ad}</div>
              <Hours
                isTablet={isTablet}
                isMobile={isMobile}
                hours={hours}
                institutionCreationDate={institutionCreationDate}
              />
            </div>
          );
        case "wages":
          return (
            <div>
              <div className={classes.adWrapper}>{ad}</div>
              <Wages
                isTablet={isTablet}
                isMobile={isMobile}
                wages={wages}
                institutionCreationDate={institutionCreationDate}
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
                    navigateTo(`/myaccount/people/${personID}/details`)}
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
                    navigateTo(`/myaccount/people/${personID}/hours`)}
                >
                  Hours
                </Button>
              </div>
              <div>
                <div className={classes.buttonSeparator} />
                <div className={classes.menuButtonWrapper}>
                  <Button
                    type="dark"
                    colour="primary"
                    filled
                    fullWidth
                    handleClick={() =>
                      navigateTo(`/myaccount/people/${personID}/wages`)}
                  >
                    Wages
                  </Button>
                </div>
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
                email={info.email}
                firstName={info.firstName}
                lastName={info.lastName}
                phoneNumber={info.phoneNumber}
                sports={info.sports}
                profilePicture={info.profilePicture}
                teams={teams}
                navigateTo={navigateTo}
              />
            </div>
          );
        case "hours":
          return (
            <div>
              <div className={classes.adWrapper}>{ad}</div>
              <Hours
                isTablet={isTablet}
                isMobile={isMobile}
                hours={hours}
                institutionCreationDate={institutionCreationDate}
              />
            </div>
          );
        case "wages":
          return (
            <div>
              <div className={classes.adWrapper}>{ad}</div>
              <Wages
                isTablet={isTablet}
                isMobile={isMobile}
                wages={wages}
                institutionCreationDate={institutionCreationDate}
              />
            </div>
          );
        default:
          return (
            <div>
              <div className={classes.adWrapper}>{ad}</div>
              <Details
                email={info.email}
                firstName={info.firstName}
                lastName={info.lastName}
                phoneNumber={info.phoneNumber}
                sports={info.sports}
                profilePicture={info.profilePicture}
                teams={teams}
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
        key: "hours",
        label: "Hours"
      },
      {
        key: "wages",
        label: "Wages"
      }
    ];

    if (isUserInfo) {
      return allTabs;
    } else {
      if (isUserAdmin) {
        return allTabs;
      } else if (isUserManager) {
        return [allTabs[0], allTabs[1]];
      } else {
        return [allTabs[0]];
      }
    }
  }

  getTeams() {
    const { personID, teams } = this.props;

    return _.toPairs(teams)
      .map(([teamID, teamInfo]) => {
        return {
          id: teamID,
          name: teamInfo.info.name,
          coaches: teamInfo.coaches,
          managers: teamInfo.managers
        };
      })
      .filter(
        teamInfo => teamInfo.coaches[personID] || teamInfo.managers[personID]
      );
  }

  checkIfUserInfo() {
    const { userID, personID } = this.props;

    return userID === personID;
  }

  checkIfUserManagesPerson(personTeams) {
    const { userID, teams } = this.props;
    let isManager = false;

    personTeams.map(personTeamInfo => {
      const completeTeamInfo = teams[personTeamInfo.id];

      if (completeTeamInfo) {
        if (completeTeamInfo.managers[userID]) isManager = true;
      }
    });

    return isManager;
  }

  getPersonRolesHeading(personTeams, isAdmin) {
    const { teams, personID } = this.props;

    let isManager = false;
    let isCoach = false;

    personTeams.map(personTeamInfo => {
      const completeTeamInfo = teams[personTeamInfo.id];

      if (completeTeamInfo) {
        if (completeTeamInfo.coaches[personID]) isCoach = true;
        if (completeTeamInfo.managers[personID]) isManager = true;
      }
    });

    if (isAdmin && isManager && isCoach) {
      return "Admin | Manager | Coach";
    } else if (isAdmin && isManager && !isCoach) {
      return "Admin | Manager";
    } else if (isAdmin && !isManager && isCoach) {
      return "Admin | Coach";
    } else if (!isAdmin && isManager && isCoach) {
      return "Manager | Coach";
    } else if (isAdmin && !isManager && !isCoach) {
      return "Admin";
    } else if (!isAdmin && isManager && !isCoach) {
      return "Manager";
    } else if (!isAdmin && !isManager && isCoach) {
      return "Coach";
    } else {
      return "No Role Assigned";
    }
  }

  render() {
    const { classes, isMobile, infoTab, personID, isUserAdmin } = this.props;
    const { goBack } = this.props.actions;
    const { tabSelected } = this.state;

    const info = this.getInfo();
    const teams = this.getTeams();
    const isUserInfo = this.checkIfUserInfo();
    const isUserManager = this.checkIfUserManagesPerson(teams);
    const personRolesHeading = this.getPersonRolesHeading(teams, info.isAdmin);

    if (!isMobile && infoTab) {
      return <Redirect to={`/myaccount/people/${personID}`} />;
    }

    const sectionDisplay = this.getSectionDisplay(info, teams);
    const tabs = this.getTabs(isUserInfo, isUserManager, isUserAdmin);

    return (
      <div className={classes.root}>
        <div className={classes.header}>
          {`${info.firstName} ${info.lastName}`}
          <div className={classes.subheader}>{personRolesHeading}</div>
        </div>
        <div className={classes.outerWrapper}>
          <div className={classes.actionsBar}>
            <div className={classes.buttonWrapper}>
              <Button colour="primary" filled slim handleClick={() => goBack()}>
                <i
                  className={`fas fa-caret-left ${classes.iconAdjacentText}`}
                />
                Back
              </Button>
            </div>
            <div className={classes.flexGrow} />
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

export default injectStyles(styles)(PersonInfo);
