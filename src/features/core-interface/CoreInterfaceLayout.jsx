/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import { Redirect, Route, Switch } from "react-router-dom";
import injectStyles from "react-jss";
import { grey } from "../../utils/colours";
import AppBar from "./components/AppBar";
import Community from "../community/CommunityView";
import Dashboard from "../dashboard/DashboardView";
import Dialog from "../../components/Dialog";
import LoadingScreen from "../../components/LoadingScreen";
import People from "../people/PeopleView";
import Schedule from "../schedule/ScheduleView";
import Settings from "../settings/SettingsView";
import SideMenu from "./components/SideMenu";
import Teams from "../teams/TeamsView";

import hockeyIcon from "./images/hockey.png";
import netballIcon from "./images/netball.png";
import rugbyIcon from "./images/rugby.png";
import otherIcon from "./images/other.png";

const mobileBreakpoint = 800;

const styles = {
  content: {
    maxWidth: 1200,
    margin: "0 auto"
  },
  contentWrapper: {
    position: "relative",
    top: 64,
    flex: 1,
    overflow: "auto",
    marginLeft: 242,
    backgroundColor: grey[200],
    [`@media (max-width: ${mobileBreakpoint}px)`]: {
      marginLeft: 0
    }
  },
  coreWrapper: {
    display: "flex",
    height: "calc(100vh - 64px)"
  },
  headerIcon: {
    marginRight: 16
  },
  headerText: {
    borderBottom: `1px solid ${grey[300]}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    lineHeight: "36px",
    backgroundColor: "white",
    padding: "32px 0",
    textAlign: "center"
  },
  sportSelectedIcon: {
    width: 40,
    height: 40,
    marginRight: 16
  },
  wrapper: {}
};

class CoreInterfaceLayout extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      windowWidth: "0"
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentWillMount() {
    const { pathname } = this.props.location;
    const {
      initUser,
      loadUnreadNotifications,
      loadReadNotifications,
      loadAccountInfo
    } = this.props.actions;
    const { userID, isLoggedIn } = this.props.uiConfig;

    initUser();
    if (userID !== "" && isLoggedIn) {
      loadUnreadNotifications(userID);
      loadReadNotifications(userID);
      loadAccountInfo(userID);
    }
    this.updateCoreUI(pathname);
  }

  componentWillReceiveProps(nextProps) {
    const { institutions } = nextProps;
    const { pathname } = nextProps.location;
    const {
      loadUnreadNotifications,
      loadReadNotifications,
      loadAccountInfo,
      changeMeAllFilter
    } = nextProps.actions;
    const { userID, isLoggedIn, accountInfo } = nextProps.uiConfig;
    const { loadInstitutionInfo, checkCompletionProgress } = nextProps.actions;

    if (
      accountInfo !== this.props.uiConfig.accountInfo &&
      accountInfo.institutions
    ) {
      const activeInstitutionID = accountInfo.lastAccessed.institutionID;

      checkCompletionProgress(activeInstitutionID, userID);

      _.toPairs(accountInfo.institutions).map(([id, info]) => {
        loadInstitutionInfo(id);
      });
      if (
        accountInfo.institutions[activeInstitutionID] &&
        accountInfo.institutions[activeInstitutionID].roles.admin === "APPROVED"
      ) {
        changeMeAllFilter("all");
      } else {
        changeMeAllFilter("me");
      }
    }

    if (pathname !== this.props.location.pathname) {
      this.updateCoreUI(pathname);
    }

    if (userID !== this.props.uiConfig.userID && userID !== "" && isLoggedIn) {
      loadUnreadNotifications(userID);
      loadReadNotifications(userID);
      loadAccountInfo(userID);
    }

    if (institutions !== this.props.institutions) {
      const activeInstitutionID = accountInfo.lastAccessed.institutionID;

      checkCompletionProgress(activeInstitutionID, userID);
    }
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    const { resetState } = this.props.actions;
    resetState();
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateCoreUI(pathname) {
    const { updateSideMenu } = this.props.actions;
    const featureName = pathname.split("/")[2];

    switch (featureName) {
      case "overview":
        updateSideMenu("overview");
        break;
      case "schedule":
        updateSideMenu("schedule");
        break;
      case "reports":
        updateSideMenu("reports");
        break;
      case "people":
        updateSideMenu("people");
        break;
      case "teams":
        updateSideMenu("teams");
        break;
      case "community":
        updateSideMenu("community");
        break;
      case "settings":
        updateSideMenu("settings");
        break;
      default:
        updateSideMenu("overview");
        break;
    }
  }

  updateWindowDimensions() {
    this.setState({ windowWidth: window.innerWidth });
  }

  getSideMenuItems() {
    return {
      overview: {
        label: "News",
        icon: "fas fa-newspaper"
      },
      reports: {
        label: "Reports",
        icon: "fas fa-clipboard"
      },
      schedule: {
        label: "Events",
        icon: "fas fa-calendar"
      },
      people: {
        label: "People",
        icon: "fas fa-user"
      },
      teams: {
        label: "Teams",
        icon: "fas fa-user-friends"
      },
      community: {
        label: "Community",
        icon: "fas fa-users"
      },
      settings: {
        label: "Settings",
        icon: "fas fa-cog"
      }
    };
  }

  getSportsIcon(sport) {
    const icons = {
      Hockey: hockeyIcon,
      Netball: netballIcon,
      Rugby: rugbyIcon,
      Other: otherIcon
    };

    if (icons[sport]) return icons[sport];
    return icons["Other"];
  }

  getSportsItems(sports) {
    const sportItems = _.fromPairs(
      sports.map(sport => {
        if (sport.info) {
          return [
            sport.info.name,
            {
              label: sport.info.name,
              icon: this.getSportsIcon(sport.info.name)
            }
          ];
        } else {
          return [
            sport,
            {
              label: sport,
              icon: this.getSportsIcon(sport)
            }
          ];
        }
      })
    );

    return {
      all: {
        label: "All",
        icon: "N/A"
      },
      ...sportItems
    };
  }

  navigateTo(path) {
    const { history } = this.props;

    history.push(path);
  }

  goBack() {
    const { history } = this.props;

    history.goBack();
  }

  getRole() {
    const { accountInfo } = this.props.uiConfig;

    const activeCommunityID = accountInfo.lastAccessed.institutionID;
    const activeCommunityRoles =
      accountInfo &&
      accountInfo.institutions[activeCommunityID] &&
      accountInfo.institutions[activeCommunityID].roles;

    if (activeCommunityRoles) {
      if (activeCommunityRoles.admin === "APPROVED") {
        return "admin";
      } else if (
        activeCommunityRoles.manager === "APPROVED" ||
        activeCommunityRoles.coach === "APPROVED"
      ) {
        return "staff";
      } else {
        return "guest";
      }
    } else {
      return "guest";
    }
  }

  getSwitchCommunitiesInfo() {
    const { institutions } = this.props;

    return _.toPairs(institutions)
      .map(([id, info]) => {
        let institutionInfo = {
          id: "",
          emblemURL: "",
          name: ""
        };
        if (info) {
          institutionInfo = {
            id,
            emblem: info.info.emblemURL,
            name: info.info.name
          };
        }
        return institutionInfo;
      })
      .sort((communityA, communityB) => {
        if (communityA.name > communityB.name) return +1;
        if (communityA.name < communityB.name) return -1;
        return 0;
      });
  }

  getTeamOptions(institutionInfo) {
    const ageGroups = institutionInfo.info.ageGroups.map(ageGroup => {
      if (!isNaN(parseInt(ageGroup, 10))) {
        return {
          key: ageGroup,
          label: `U/${ageGroup}`
        };
      }
      return {
        key: ageGroup,
        label: ageGroup
      };
    });
    const divisions = institutionInfo.info.divisions.map(division => {
      return {
        key: division,
        label: division
      };
    });
    const sports = institutionInfo.info.sports.map(sport => {
      if (sport.info) {
        return {
          key: sport.info.name,
          label: sport.info.name
        };
      } else {
        return {
          key: sport,
          label: sport
        };
      }
    });
    const genders = _.lowerCase(institutionInfo.info.gender);

    return {
      ageGroups,
      divisions,
      sports,
      genders
    };
  }

  getHeaderText(sideMenuItems, sportsItems) {
    const { classes } = this.props;
    const { sportSelected, sideMenuItemSelected } = this.props.uiConfig;

    const sideMenuItem = sideMenuItems[sideMenuItemSelected];

    if (
      sportSelected === "all" ||
      sideMenuItem.label === "Community" ||
      sideMenuItem.label === "Settings"
    ) {
      return (
        <h1 className={classes.headerText}>
          <i className={`${sideMenuItem.icon} ${classes.headerIcon}`} />
          {sideMenuItem.label}
        </h1>
      );
    } else {
      return (
        <h1 className={classes.headerText}>
          <img
            src={sportsItems[sportSelected].icon}
            alt="Sport selected icon"
            className={classes.sportSelectedIcon}
          />
          {`${sportsItems[sportSelected].label} ${sideMenuItems[
            sideMenuItemSelected
          ].label}`}
        </h1>
      );
    }
  }

  render() {
    const { classes, institutions, history } = this.props;
    const {
      toggleSideMenu,
      signOut,
      openLogOutModal,
      closeLogOutModal,
      updateSport,
      switchRole,
      changeMeAllFilter,
      switchInstitution,
      checkCompletionProgress
    } = this.props.actions;
    const { windowWidth } = this.state;
    const {
      isAccountInfoLoading,
      isInstitutionsLoading,
      isCompletionProgressLoading
    } = this.props.loadingStatus;
    const {
      isLoggedIn,
      accountInfo,
      isSideMenuOpen,
      userID,
      sportSelected,
      sideMenuItemSelected,
      meAllFilter,
      personalProgress,
      communityProgress
    } = this.props.uiConfig;
    const { isLogOutModalOpen } = this.props.dialogs;

    const allowedSports = ["Hockey", "Netball", "Rugby"];
    const isMobile = windowWidth < 800;
    const isTablet = windowWidth < 1080;
    const versionNumber = "0.9.19";

    const communityRole = this.getRole();
    const userFirstName = accountInfo.info.name;
    const userLastName = accountInfo.info.surname;
    const userEmail = accountInfo.info.email;
    const userPhoneNumber = accountInfo.info.phoneNumber;
    const userProfilePicture = accountInfo.info.profilePictureURL;
    const userName = `${userFirstName} ${userLastName}`;
    const role = _.toLower(accountInfo.lastAccessed.role);
    const activeInstitutionID = accountInfo.lastAccessed.institutionID;
    const sideMenuItems = this.getSideMenuItems();
    const userSports = _.toPairs(accountInfo.info.sports)
      .filter(([name, isPreferred]) => {
        return isPreferred && allowedSports.includes(name);
      })
      .map(([name, isPreferred]) => name);

    let isAdmin = false;
    let communityName = "Default";
    let emblem = "";
    let phoneNumber = "";
    let physicalAddress = "";
    let publicEmail = "";
    let sports = [];
    let sportsItems = {};
    let institutionCreationDate = new Date(Date.now());
    let teamOptions = {
      ageGroups: [],
      divisions: [],
      sports: [],
      genders: "both"
    };

    if (institutions[activeInstitutionID]) {
      sports = institutions[activeInstitutionID].info.sports.map(sport => {
        if (sport.info) {
          return sport.info.name;
        } else {
          return sport;
        }
      });
      sportsItems = this.getSportsItems(sports);
      teamOptions = this.getTeamOptions(institutions[activeInstitutionID]);
      isAdmin =
        accountInfo.institutions[activeInstitutionID].roles.admin ===
        "APPROVED";
      communityName = institutions[activeInstitutionID].info.name;
      emblem = institutions[activeInstitutionID].info.emblemURL;
      phoneNumber = institutions[activeInstitutionID].info.phoneNumber;
      publicEmail = institutions[activeInstitutionID].info.publicEmail;
      physicalAddress = institutions[activeInstitutionID].info.physicalAddress;
      institutionCreationDate =
        institutions[activeInstitutionID].metadata.creationDate;
    }

    const headerText = this.getHeaderText(sideMenuItems, sportsItems);

    if (!isLoggedIn) {
      return <Redirect to="/sign-in" />;
    }

    if (
      isAccountInfoLoading ||
      isInstitutionsLoading ||
      isCompletionProgressLoading
    ) {
      return <LoadingScreen />;
    } else {
      return (
        <div className={classes.wrapper}>
          <AppBar
            selected={sportSelected}
            sports={sportsItems}
            isTablet={isMobile}
            isSideMenuOpen={isSideMenuOpen}
            actions={{
              logOut: () => openLogOutModal(),
              changeSportSelected: key => updateSport(key),
              toggleSideNav: () => toggleSideMenu()
            }}
          />
          <div className={classes.coreWrapper}>
            <SideMenu
              selected={sideMenuItemSelected}
              items={sideMenuItems}
              isTablet={isMobile}
              isSideMenuOpen={isSideMenuOpen}
              communityName={communityName}
              emblem={emblem}
              selectedRole={role}
              meAllFilter={meAllFilter}
              versionNumber={versionNumber}
              actions={{
                logOut: () => openLogOutModal(),
                changeSelected: key => history.push(`/myaccount/${key}`),
                toggleSideNav: () => toggleSideMenu(),
                switchRoles: newRole => switchRole(userID, newRole)
              }}
            />
            <div className={classes.contentWrapper}>
              {headerText}
              <div className={classes.content}>
                <Switch>
                  <Route exact path={"/myaccount/"}>
                    <Dashboard
                      isAdmin={isAdmin}
                      personalProgress={personalProgress}
                      communityProgress={communityProgress}
                      communityName={communityName}
                      activeInstitutionID={activeInstitutionID}
                      isMobile={isMobile}
                      isTablet={isTablet}
                      sportFilter={sportSelected}
                      meAllFilter={meAllFilter}
                      isAccountInfoLoading={isAccountInfoLoading}
                      userID={userID}
                      userName={userName}
                      institutionCreationDate={institutionCreationDate}
                      navigateTo={path => this.navigateTo(path)}
                      goBack={() => this.goBack()}
                      communityInfo={{
                        phoneNumber,
                        publicEmail,
                        emblem,
                        sports,
                        physicalAddress
                      }}
                      personalInfo={{
                        email: userEmail,
                        phoneNumber: userPhoneNumber,
                        profilePicture: userProfilePicture,
                        preferredSports: userSports
                      }}
                      changeMeAllFilter={newFilter =>
                        changeMeAllFilter(newFilter)}
                    />
                  </Route>
                  <Route exact path={"/myaccount/overview/"}>
                    <Dashboard
                      isAdmin={isAdmin}
                      communityName={communityName}
                      personalProgress={personalProgress}
                      communityProgress={communityProgress}
                      activeInstitutionID={activeInstitutionID}
                      isMobile={isMobile}
                      isTablet={isTablet}
                      sportFilter={sportSelected}
                      meAllFilter={meAllFilter}
                      isAccountInfoLoading={isAccountInfoLoading}
                      userID={userID}
                      userName={userName}
                      institutionCreationDate={institutionCreationDate}
                      navigateTo={path => this.navigateTo(path)}
                      goBack={() => this.goBack()}
                      communityInfo={{
                        phoneNumber,
                        publicEmail,
                        emblem,
                        sports,
                        physicalAddress
                      }}
                      personalInfo={{
                        email: userEmail,
                        phoneNumber: userPhoneNumber,
                        profilePicture: userProfilePicture,
                        preferredSports: userSports
                      }}
                      changeMeAllFilter={newFilter =>
                        changeMeAllFilter(newFilter)}
                    />
                  </Route>
                  <Route exact path={"/myaccount/overview/:infoTab"}>
                    <Dashboard
                      isAdmin={isAdmin}
                      communityName={communityName}
                      personalProgress={personalProgress}
                      communityProgress={communityProgress}
                      activeInstitutionID={activeInstitutionID}
                      isMobile={isMobile}
                      isTablet={isTablet}
                      sportFilter={sportSelected}
                      meAllFilter={meAllFilter}
                      isAccountInfoLoading={isAccountInfoLoading}
                      userID={userID}
                      userName={userName}
                      institutionCreationDate={institutionCreationDate}
                      navigateTo={path => this.navigateTo(path)}
                      goBack={() => this.goBack()}
                      communityInfo={{
                        phoneNumber,
                        publicEmail,
                        emblem,
                        sports,
                        physicalAddress
                      }}
                      personalInfo={{
                        email: userEmail,
                        phoneNumber: userPhoneNumber,
                        profilePicture: userProfilePicture,
                        preferredSports: userSports
                      }}
                      changeMeAllFilter={newFilter =>
                        changeMeAllFilter(newFilter)}
                    />
                  </Route>
                  <Route exact path={"/myaccount/people/"}>
                    <People
                      isAdmin={isAdmin}
                      communityName={communityName}
                      personalProgress={personalProgress}
                      communityProgress={communityProgress}
                      activeInstitutionID={activeInstitutionID}
                      isMobile={isMobile}
                      isTablet={isTablet}
                      sportFilter={sportSelected}
                      meAllFilter={meAllFilter}
                      isAccountInfoLoading={isAccountInfoLoading}
                      userID={userID}
                      userName={userName}
                      institutionCreationDate={institutionCreationDate}
                      navigateTo={path => this.navigateTo(path)}
                      goBack={() => this.goBack()}
                      changeMeAllFilter={newFilter =>
                        changeMeAllFilter(newFilter)}
                    />
                  </Route>
                  <Route exact path={"/myaccount/people/:personID"}>
                    <People
                      isAdmin={isAdmin}
                      communityName={communityName}
                      personalProgress={personalProgress}
                      communityProgress={communityProgress}
                      activeInstitutionID={activeInstitutionID}
                      isMobile={isMobile}
                      isTablet={isTablet}
                      sportFilter={sportSelected}
                      meAllFilter={meAllFilter}
                      isAccountInfoLoading={isAccountInfoLoading}
                      userID={userID}
                      userName={userName}
                      institutionCreationDate={institutionCreationDate}
                      navigateTo={path => this.navigateTo(path)}
                      goBack={() => this.goBack()}
                      changeMeAllFilter={newFilter =>
                        changeMeAllFilter(newFilter)}
                    />
                  </Route>
                  <Route exact path={"/myaccount/people/:personID/:infoTab"}>
                    <People
                      isAdmin={isAdmin}
                      communityName={communityName}
                      personalProgress={personalProgress}
                      communityProgress={communityProgress}
                      activeInstitutionID={activeInstitutionID}
                      isMobile={isMobile}
                      isTablet={isTablet}
                      sportFilter={sportSelected}
                      meAllFilter={meAllFilter}
                      isAccountInfoLoading={isAccountInfoLoading}
                      userID={userID}
                      userName={userName}
                      institutionCreationDate={institutionCreationDate}
                      navigateTo={path => this.navigateTo(path)}
                      goBack={() => this.goBack()}
                      changeMeAllFilter={newFilter =>
                        changeMeAllFilter(newFilter)}
                    />
                  </Route>
                  <Route exact path={"/myaccount/teams/"}>
                    <Teams
                      teamOptions={teamOptions}
                      personalProgress={personalProgress}
                      communityProgress={communityProgress}
                      isAdmin={isAdmin}
                      userID={userID}
                      userEmail={userEmail}
                      userFirstName={userFirstName}
                      userLastName={userLastName}
                      role={role}
                      sportFilter={sportSelected}
                      activeInstitutionID={activeInstitutionID}
                      isMobile={isMobile}
                      isTablet={isTablet}
                      meAllFilter={meAllFilter}
                      institutionCreationDate={institutionCreationDate}
                      isAccountInfoLoading={isAccountInfoLoading}
                      navigateTo={path => this.navigateTo(path)}
                      goBack={() => this.goBack()}
                      changeMeAllFilter={newFilter =>
                        changeMeAllFilter(newFilter)}
                      checkCompletionProgress={() =>
                        checkCompletionProgress(activeInstitutionID, userID)}
                    />
                  </Route>
                  <Route exact path={"/myaccount/teams/:teamID"}>
                    <Teams
                      teamOptions={teamOptions}
                      personalProgress={personalProgress}
                      communityProgress={communityProgress}
                      isAdmin={isAdmin}
                      userID={userID}
                      userEmail={userEmail}
                      userFirstName={userFirstName}
                      userLastName={userLastName}
                      role={role}
                      sportFilter={sportSelected}
                      activeInstitutionID={activeInstitutionID}
                      isMobile={isMobile}
                      isTablet={isTablet}
                      meAllFilter={meAllFilter}
                      institutionCreationDate={institutionCreationDate}
                      isAccountInfoLoading={isAccountInfoLoading}
                      navigateTo={path => this.navigateTo(path)}
                      goBack={() => this.goBack()}
                      changeMeAllFilter={newFilter =>
                        changeMeAllFilter(newFilter)}
                      checkCompletionProgress={() =>
                        checkCompletionProgress(activeInstitutionID, userID)}
                    />
                  </Route>
                  <Route exact path={"/myaccount/teams/:teamID/:infoTab"}>
                    <Teams
                      teamOptions={teamOptions}
                      personalProgress={personalProgress}
                      communityProgress={communityProgress}
                      isAdmin={isAdmin}
                      userID={userID}
                      userEmail={userEmail}
                      userFirstName={userFirstName}
                      userLastName={userLastName}
                      role={role}
                      sportFilter={sportSelected}
                      activeInstitutionID={activeInstitutionID}
                      isMobile={isMobile}
                      isTablet={isTablet}
                      meAllFilter={meAllFilter}
                      institutionCreationDate={institutionCreationDate}
                      isAccountInfoLoading={isAccountInfoLoading}
                      navigateTo={path => this.navigateTo(path)}
                      goBack={() => this.goBack()}
                      changeMeAllFilter={newFilter =>
                        changeMeAllFilter(newFilter)}
                      checkCompletionProgress={() =>
                        checkCompletionProgress(activeInstitutionID, userID)}
                    />
                  </Route>
                  <Route exact path={"/myaccount/community/"}>
                    <Community
                      sports={sports}
                      personalProgress={personalProgress}
                      communityProgress={communityProgress}
                      genders={teamOptions.genders}
                      ageGroups={teamOptions.ageGroups}
                      divisions={teamOptions.divisions}
                      isAdmin={isAdmin}
                      userID={userID}
                      role={communityRole}
                      isMobile={isMobile}
                      isTablet={isTablet}
                      meAllFilter={meAllFilter}
                      activeCommunityID={activeInstitutionID}
                      isAccountInfoLoading={isAccountInfoLoading}
                      navigateTo={path => this.navigateTo(path)}
                      goBack={() => this.goBack()}
                      communities={institutions}
                      switchCommunity={communityID =>
                        switchInstitution(userID, communityID, "ADMIN")}
                      checkCompletionProgress={() =>
                        checkCompletionProgress(activeInstitutionID, userID)}
                    />
                  </Route>
                  <Route exact path={"/myaccount/community/:infoTab"}>
                    <Community
                      sports={sports}
                      personalProgress={personalProgress}
                      communityProgress={communityProgress}
                      genders={teamOptions.genders}
                      ageGroups={teamOptions.ageGroups}
                      divisions={teamOptions.divisions}
                      isAdmin={isAdmin}
                      userID={userID}
                      role={communityRole}
                      isMobile={isMobile}
                      isTablet={isTablet}
                      meAllFilter={meAllFilter}
                      activeCommunityID={activeInstitutionID}
                      isAccountInfoLoading={isAccountInfoLoading}
                      navigateTo={path => this.navigateTo(path)}
                      goBack={() => this.goBack()}
                      communities={institutions}
                      switchCommunity={communityID =>
                        switchInstitution(userID, communityID, "ADMIN")}
                      checkCompletionProgress={() =>
                        checkCompletionProgress(activeInstitutionID, userID)}
                    />
                  </Route>
                  <Route exact path={"/myaccount/settings/"}>
                    <Settings
                      isAdmin={isAdmin}
                      isMobile={isMobile}
                      isTablet={isTablet}
                      personalProgress={personalProgress}
                      communityProgress={communityProgress}
                      isAccountInfoLoading={isAccountInfoLoading}
                      userID={userID}
                      personalInfo={{
                        firstName: accountInfo.info.name,
                        lastName: accountInfo.info.surname,
                        email: accountInfo.info.email,
                        profilePictureURL: accountInfo.info.profilePictureURL,
                        phoneNumber: accountInfo.info.phoneNumber,
                        sports: userSports
                      }}
                    />
                  </Route>
                  <Route exact path={"/myaccount/schedule/"}>
                    <Schedule
                      emblem={emblem}
                      isAdmin={isAdmin}
                      userID={userID}
                      role={communityRole}
                      personalProgress={personalProgress}
                      communityProgress={communityProgress}
                      sportFilter={sportSelected}
                      isMobile={isMobile}
                      isTablet={isTablet}
                      meAllFilter={meAllFilter}
                      activeInstitutionID={activeInstitutionID}
                      institutionCreationDate={institutionCreationDate}
                      isAccountInfoLoading={isAccountInfoLoading}
                      navigateTo={path => this.navigateTo(path)}
                      goBack={() => this.goBack()}
                      changeMeAllFilter={newFilter =>
                        changeMeAllFilter(newFilter)}
                    />
                  </Route>
                  <Route exact path={"/myaccount/schedule/:dateSelected"}>
                    <Schedule
                      emblem={emblem}
                      isAdmin={isAdmin}
                      userID={userID}
                      role={communityRole}
                      personalProgress={personalProgress}
                      communityProgress={communityProgress}
                      sportFilter={sportSelected}
                      isMobile={isMobile}
                      isTablet={isTablet}
                      meAllFilter={meAllFilter}
                      activeInstitutionID={activeInstitutionID}
                      institutionCreationDate={institutionCreationDate}
                      isAccountInfoLoading={isAccountInfoLoading}
                      navigateTo={path => this.navigateTo(path)}
                      goBack={() => this.goBack()}
                      changeMeAllFilter={newFilter =>
                        changeMeAllFilter(newFilter)}
                    />
                  </Route>
                  <Route
                    exact
                    path={"/myaccount/schedule/:dateSelected/:eventID"}
                  >
                    <Schedule
                      emblem={emblem}
                      isAdmin={isAdmin}
                      userID={userID}
                      role={communityRole}
                      personalProgress={personalProgress}
                      communityProgress={communityProgress}
                      sportFilter={sportSelected}
                      isMobile={isMobile}
                      isTablet={isTablet}
                      meAllFilter={meAllFilter}
                      activeInstitutionID={activeInstitutionID}
                      institutionCreationDate={institutionCreationDate}
                      isAccountInfoLoading={isAccountInfoLoading}
                      navigateTo={path => this.navigateTo(path)}
                      goBack={() => this.goBack()}
                      changeMeAllFilter={newFilter =>
                        changeMeAllFilter(newFilter)}
                    />
                  </Route>
                  <Route
                    exact
                    path={"/myaccount/schedule/:dateSelected/:eventID/:infoTab"}
                  >
                    <Schedule
                      emblem={emblem}
                      isAdmin={isAdmin}
                      userID={userID}
                      role={communityRole}
                      personalProgress={personalProgress}
                      communityProgress={communityProgress}
                      sportFilter={sportSelected}
                      isMobile={isMobile}
                      isTablet={isTablet}
                      meAllFilter={meAllFilter}
                      activeInstitutionID={activeInstitutionID}
                      institutionCreationDate={institutionCreationDate}
                      isAccountInfoLoading={isAccountInfoLoading}
                      navigateTo={path => this.navigateTo(path)}
                      goBack={() => this.goBack()}
                      changeMeAllFilter={newFilter =>
                        changeMeAllFilter(newFilter)}
                    />
                  </Route>
                  <Route>
                    <Dashboard
                      isAdmin={isAdmin}
                      communityName={communityName}
                      personalProgress={personalProgress}
                      communityProgress={communityProgress}
                      activeInstitutionID={activeInstitutionID}
                      isMobile={isMobile}
                      isTablet={isTablet}
                      sportFilter={sportSelected}
                      meAllFilter={meAllFilter}
                      isAccountInfoLoading={isAccountInfoLoading}
                      userID={userID}
                      userName={userName}
                      institutionCreationDate={institutionCreationDate}
                      navigateTo={path => this.navigateTo(path)}
                      goBack={() => this.goBack()}
                      communityInfo={{
                        phoneNumber,
                        publicEmail,
                        emblem,
                        sports,
                        physicalAddress
                      }}
                      personalInfo={{
                        email: userEmail,
                        phoneNumber: userPhoneNumber,
                        profilePicture: userProfilePicture,
                        preferredSports: userSports
                      }}
                      changeMeAllFilter={newFilter =>
                        changeMeAllFilter(newFilter)}
                    />
                  </Route>
                </Switch>
              </div>
            </div>
          </div>
          <Dialog
            isOpen={isLogOutModalOpen}
            handleYesClick={() => {
              signOut();
              closeLogOutModal();
            }}
            handleNoClick={closeLogOutModal}
            heading="Log Out"
            type="decision"
          >
            Are you sure you want to log out?
          </Dialog>
        </div>
      );
    }
  }
}

export default injectStyles(styles)(CoreInterfaceLayout);
