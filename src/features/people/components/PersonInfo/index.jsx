/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import { Redirect } from "react-router-dom";
import injectStyles from "react-jss";
import Button from "../../../../components/Button";
import BannerAd from "../../../../components/BannerAd";
import { common, grey, lightBlue } from "../../../../utils/colours";
import Details from "./components/Details";
import Hours from "./components/Hours";
import LargeMobileBannerAd from "../../../../components/LargeMobileBannerAd";
import LeaderboardAd from "../../../../components/LeaderboardAd";
import Tabs from "../../../../components/Tabs";
import Wages from "./components/Wages";

const styles = {
  actionsBar: {
    display: "flex",
    justifyContent: "flex-end",
    backgroundColor: grey[200]
  },
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
  buttonWrapper: {
    margin: "24px 24px 0 24px"
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

  getAdminButton(info) {
    const { classes } = this.props;
    const { updateAdminStatus } = this.props.actions;

    if (info.isAdmin) {
      return (
        <Button
          colour="primary"
          slim
          filled
          handleClick={() => updateAdminStatus("N/A")}
        >
          <i className={`fas fa-ban ${classes.iconAdjacentText}`} />
          Revoke admin privileges
        </Button>
      );
    } else {
      return (
        <Button
          colour="primary"
          slim
          filled
          handleClick={() => updateAdminStatus("APPROVED")}
        >
          <i className={`fas fa-unlock-alt ${classes.iconAdjacentText}`} />
          Give admin privileges
        </Button>
      );
    }
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
      userID,
      institutionCreationDate
    } = this.props;
    const { navigateTo } = this.props.actions;
    const { tabSelected } = this.state;

    const ad = this.createAd();
    const adminButton = this.getAdminButton(info);

    if (isMobile) {
      switch (infoTab) {
        case "details":
          return (
            <div>
              <div className={classes.adWrapper}>{ad}</div>
              <div className={classes.actionsBar}>
                <div className={classes.buttonWrapper}>
                  {personID !== userID && adminButton}
                </div>
              </div>
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
              <div className={classes.actionsBar}>
                <div className={classes.buttonWrapper}>
                  {personID !== userID && adminButton}
                </div>
              </div>
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
              <div className={classes.actionsBar}>
                <div className={classes.buttonWrapper}>
                  {personID !== userID && adminButton}
                </div>
              </div>
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
              <div className={classes.actionsBar}>
                <div className={classes.buttonWrapper}>
                  {personID !== userID && adminButton}
                </div>
              </div>
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
              <div className={classes.actionsBar}>
                <div className={classes.buttonWrapper}>
                  {personID !== userID && adminButton}
                </div>
              </div>
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
              <div className={classes.actionsBar}>
                <div className={classes.buttonWrapper}>
                  {personID !== userID && adminButton}
                </div>
              </div>
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
              <div className={classes.actionsBar}>
                <div className={classes.buttonWrapper}>
                  {personID !== userID && adminButton}
                </div>
              </div>
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

  getTabs(isUserInfo, isUserManager, isUserAdmin, isPersonCoach) {
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
      if (isPersonCoach) {
        return allTabs;
      } else {
        return [allTabs[0]];
      }
    } else {
      if (isUserAdmin) {
        if (isPersonCoach) {
          return allTabs;
        } else {
          return [allTabs[0]];
        }
      } else if (isUserManager) {
        if (isPersonCoach) {
          return [allTabs[0], allTabs[1]];
        } else {
          return [allTabs[0]];
        }
      } else {
        return [allTabs[0]];
      }
    }
  }

  getTeams() {
    const { personID, teams, seasons } = this.props;

    let personTeams = {};

    _.toPairs(seasons).map(([seasonID, seasonInfo]) => {
      if (
        seasonInfo.managers[personID] ||
        seasonInfo.coaches[personID] ||
        (seasonInfo.athletes && seasonInfo.athletes[personID]) ||
        (seasonInfo.parents && seasonInfo.parents[personID])
      ) {
        personTeams[seasonInfo.teamID] = teams[seasonInfo.teamID];
      }
    });

    return _.toPairs(personTeams).map(([teamID, teamInfo]) => {
      return {
        id: teamID,
        name: teamInfo.info.name,
        coaches: teamInfo.coaches,
        managers: teamInfo.managers
      };
    });
  }

  checkIfUserInfo() {
    const { userID, personID } = this.props;

    return userID === personID;
  }

  checkIfUserManagesPerson() {
    const { userID, personID, seasons } = this.props;
    let isManager = false;

    _.toPairs(seasons).map(([seasonID, seasonInfo]) => {
      if (
        seasonInfo.managers[personID] ||
        seasonInfo.coaches[personID] ||
        (seasonInfo.athletes && seasonInfo.athletes[personID])
      ) {
        isManager = isManager || seasonInfo.managers[userID];
      }
    });

    return isManager;
  }

  checkIfPersonCoach() {
    const { personID, seasons } = this.props;

    let isCoach = false;

    _.toPairs(seasons).map(([seasonID, seasonInfo]) => {
      isCoach = isCoach || seasonInfo.coaches[personID];
    });

    return isCoach;
  }

  getRoles(isAdmin) {
    const { personID, seasons } = this.props;

    let isManager = false;
    let isCoach = false;
    let isAthlete = false;
    let isParent = false;

    _.toPairs(seasons).map(([seasonID, seasonInfo]) => {
      isCoach = isCoach || seasonInfo.coaches[personID];
      isManager = isManager || seasonInfo.managers[personID];
      isAthlete =
        isAthlete || (seasonInfo.athletes && seasonInfo.athletes[personID]);
      isParent =
        isParent || (seasonInfo.parents && seasonInfo.parents[personID]);
    });

    let roles = "";

    if (isAdmin) {
      roles = roles === "" ? "Admin" : roles + " | Admin";
    }
    if (isCoach) {
      roles = roles === "" ? "Coach" : roles + " | Coach";
    }
    if (isManager) {
      roles = roles === "" ? "Manager" : roles + " | Manager";
    }
    if (isAthlete) {
      roles = roles === "" ? "Athlete" : roles + " | Athlete";
    }
    if (isParent) {
      roles = roles === "" ? "Parent" : roles + " | Parent";
    }
    if (roles === "") {
      roles = "No Role Assigned";
    }

    return roles;
  }

  render() {
    const { classes, isMobile, infoTab, personID, isUserAdmin } = this.props;
    const { goBack } = this.props.actions;
    const { tabSelected } = this.state;

    const info = this.getInfo();
    const teams = this.getTeams();
    const isUserInfo = this.checkIfUserInfo();
    const isPersonCoach = this.checkIfPersonCoach();
    const isUserManager = this.checkIfUserManagesPerson();
    const personRolesHeading = this.getRoles(teams, info.isAdmin);

    if (!isMobile && infoTab) {
      return <Redirect to={`/myaccount/people/${personID}`} />;
    }

    if (!isPersonCoach && (infoTab === "hours" || infoTab === "wages")) {
      return <Redirect to={`/myaccount/people/${personID}/details`} />;
    }

    const sectionDisplay = this.getSectionDisplay(info, teams, isPersonCoach);
    const tabs = this.getTabs(
      isUserInfo,
      isUserManager,
      isUserAdmin,
      isPersonCoach
    );

    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <div className={classes.backButton} onClick={() => goBack()}>
            <div>
              <i className="fas fa-caret-left" />
            </div>
          </div>
          <div className={classes.headerInnerWrapper}>
            {`${info.firstName} ${info.lastName}`}
            <div className={classes.subheader}>{personRolesHeading}</div>
          </div>
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

export default injectStyles(styles)(PersonInfo);
