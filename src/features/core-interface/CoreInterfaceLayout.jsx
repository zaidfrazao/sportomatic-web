/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import { Redirect, Route, Switch } from "react-router-dom";
import injectStyles from "react-jss";
import { grey } from "../../utils/colours";
import AppBar from "./components/AppBar";
import Dashboard from "../dashboard/DashboardView";
import DecisionModal from "../../components/DecisionModal";
import LoadingScreen from "../../components/LoadingScreen";
import SwitchCommunitiesDialog from "./components/SwitchCommunitiesDialog";
import People from "../people/PeopleView";
import Schedule from "../schedule/ScheduleView";
import Settings from "../settings/SettingsView";
import SideMenu from "./components/SideMenu";
import Teams from "../teams/TeamsView";

import netballIcon from "./images/netball.png";
import otherIcon from "./images/other.png";
import rugbyIcon from "./images/rugby.png";
import soccerIcon from "./images/soccer.png";

const styles = theme => ({
  content: {
    maxWidth: 1200,
    margin: "0 auto"
  },
  contentWrapper: {
    flex: 1,
    zIndex: 20,
    overflow: "auto",
    borderTop: `2px solid ${grey[300]}`,
    backgroundColor: grey[200]
  },
  coreWrapper: {
    display: "flex",
    height: "calc(100vh - 64px)"
  },
  headerText: {
    fontSize: 24,
    margin: 24,
    lineHeight: "36px",
    backgroundColor: "white",
    borderRadius: 12,
    padding: "12px 18px",
    textAlign: "center"
  },
  wrapper: {
    backgroundColor: grey[200]
  }
});

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
    const { pathname } = nextProps.location;
    const {
      loadUnreadNotifications,
      loadReadNotifications,
      loadAccountInfo,
      changeMeAllFilter
    } = nextProps.actions;
    const { userID, isLoggedIn, accountInfo } = nextProps.uiConfig;
    const { loadInstitutionInfo } = nextProps.actions;

    if (
      accountInfo !== this.props.uiConfig.accountInfo &&
      accountInfo.institutions
    ) {
      const activeInstitutionID = accountInfo.lastAccessed.institutionID;

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
        icon: "fas fa-users"
      },
      reports: {
        label: "Reports",
        icon: "fas fa-clipboard"
      },
      settings: {
        label: "Settings",
        icon: "fas fa-cog"
      }
    };
  }

  getSportsItems() {
    return {
      all: {
        label: "All",
        icon: "N/A"
      },
      netball: {
        label: "Netball",
        icon: netballIcon
      },
      rugby: {
        label: "Rugby",
        icon: rugbyIcon
      },
      soccer: {
        label: "Soccer",
        icon: soccerIcon
      },
      other: {
        label: "Other Sports",
        icon: otherIcon
      }
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

  render() {
    const { classes, institutions, history } = this.props;
    const {
      toggleSideMenu,
      signOut,
      openLogOutModal,
      closeLogOutModal,
      openManageInstitutionsDialog,
      closeManageInstitutionsDialog,
      updateSport,
      switchRole,
      changeMeAllFilter,
      switchInstitution
    } = this.props.actions;
    const { windowWidth } = this.state;
    const {
      isAccountInfoLoading,
      isInstitutionsLoading
    } = this.props.loadingStatus;
    const {
      isLoggedIn,
      accountInfo,
      isSideMenuOpen,
      userID,
      sportSelected,
      sideMenuItemSelected,
      meAllFilter
    } = this.props.uiConfig;
    const {
      isLogOutModalOpen,
      isManageInstitutionsDialogOpen
    } = this.props.dialogs;

    const isMobile = windowWidth < 800;
    const isTablet = windowWidth < 1080;

    const communityRole = this.getRole();
    const userName = `${accountInfo.info.name} ${accountInfo.info.surname}`;
    let isAdmin = false;

    const role = _.toLower(accountInfo.lastAccessed.role);
    const activeInstitutionID = accountInfo.lastAccessed.institutionID;
    const sideMenuItems = this.getSideMenuItems();
    const sportsItems = this.getSportsItems();
    const switchCommunityInfo = this.getSwitchCommunitiesInfo();

    let communityName = "Default";
    let emblem = "";
    let availableRoles = [
      {
        key: "admin",
        label: "Administrator"
      },
      {
        key: "coach",
        label: "Coach"
      },
      {
        key: "manager",
        label: "Manager"
      }
    ];
    let permissions = {
      coaches: {
        events: {
          canCancel: false,
          canCreate: false,
          canEdit: false
        },
        results: {
          canApprove: false,
          canEdit: true
        },
        teams: {
          canEdit: false
        }
      },
      managers: {
        events: {
          canCancel: true,
          canCreate: false,
          canEdit: true
        },
        teams: {
          canEdit: false
        },
        wages: {
          canCreate: false,
          canEdit: false,
          canView: false
        }
      }
    };
    let paymentDefaults = {
      maxOvertimeHours: 3,
      payDay: {
        day: 1,
        isEndOfTheMonth: false
      },
      rates: {
        overtime: 150,
        salary: 6000,
        standard: 100
      },
      type: "HOURLY"
    };
    let institutionCreationDate = new Date(Date.now());
    if (institutions[activeInstitutionID]) {
      const institutionRoles =
        accountInfo.institutions[activeInstitutionID].roles;

      isAdmin =
        accountInfo.institutions[activeInstitutionID].roles.admin ===
        "APPROVED";

      availableRoles = [];
      institutionRoles.admin === "APPROVED" &&
        availableRoles.push({
          key: "admin",
          label: "Administrator"
        });
      institutionRoles.manager === "APPROVED" &&
        availableRoles.push({
          key: "manager",
          label: "Manager"
        });
      institutionRoles.coach === "APPROVED" &&
        availableRoles.push({
          key: "coach",
          label: "Coach"
        });

      let validRoleSelected = false;
      availableRoles.map(availableRole => {
        if (availableRole.key === role) validRoleSelected = true;
      });
      if (!validRoleSelected) {
        switchRole(userID, availableRoles[0].key);
      }

      communityName = institutions[activeInstitutionID].info.name;
      emblem = institutions[activeInstitutionID].info.emblemURL;
      permissions = institutions[activeInstitutionID].permissions;
      paymentDefaults = institutions[activeInstitutionID].paymentDefaults;
      institutionCreationDate =
        institutions[activeInstitutionID].metadata.creationDate;
    }

    if (!isLoggedIn) {
      return <Redirect to="/sign-in" />;
    }

    if (isAccountInfoLoading || isInstitutionsLoading) {
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
              availableRoles={availableRoles}
              meAllFilter={meAllFilter}
              actions={{
                switchCommunities: () => openManageInstitutionsDialog(),
                changeMeAllFilter: newFilter => changeMeAllFilter(newFilter),
                logOut: () => openLogOutModal(),
                changeSelected: key => history.push(`/myaccount/${key}`),
                toggleSideNav: () => toggleSideMenu(),
                switchRoles: newRole => switchRole(userID, newRole)
              }}
            />
            <div className={classes.contentWrapper}>
              <div className={classes.content}>
                {sportSelected === "all" ? (
                  <h1 className={classes.headerText}>
                    {sideMenuItems[sideMenuItemSelected].label}
                  </h1>
                ) : (
                  <h1 className={classes.headerText}>
                    {`${sportsItems[sportSelected].label} ${sideMenuItems[
                      sideMenuItemSelected
                    ].label}`}
                  </h1>
                )}
                <Switch>
                  <Route exact path={"/myaccount/"}>
                    <Dashboard
                      isMobile={isMobile}
                      isTablet={isTablet}
                      userID={userID}
                      role={role}
                      sportFilter={sportSelected}
                      activeInstitutionID={activeInstitutionID}
                      accountInfo={accountInfo}
                      isAccountInfoLoading={isAccountInfoLoading}
                      institutions={institutions}
                      permissions={permissions}
                    />
                  </Route>
                  <Route exact path={"/myaccount/overview/"}>
                    <Dashboard
                      isMobile={isMobile}
                      isTablet={isTablet}
                      userID={userID}
                      role={role}
                      sportFilter={sportSelected}
                      activeInstitutionID={activeInstitutionID}
                      accountInfo={accountInfo}
                      isAccountInfoLoading={isAccountInfoLoading}
                      institutions={institutions}
                      permissions={permissions}
                    />
                  </Route>
                  <Route exact path={"/myaccount/settings/"}>
                    <Settings
                      isMobile={isMobile}
                      isTablet={isTablet}
                      userID={userID}
                      activeInstitutionID={activeInstitutionID}
                      accountInfo={accountInfo}
                      isAccountInfoLoading={isAccountInfoLoading}
                      institutions={institutions}
                    />
                  </Route>
                  <Route exact path={"/myaccount/settings/:institutionID"}>
                    <Settings
                      isMobile={isMobile}
                      isTablet={isTablet}
                      userID={userID}
                      activeInstitutionID={activeInstitutionID}
                      accountInfo={accountInfo}
                      isAccountInfoLoading={isAccountInfoLoading}
                      institutions={institutions}
                    />
                  </Route>
                  <Route exact path={"/myaccount/people/"}>
                    <People
                      isAdmin={isAdmin}
                      communityName={communityName}
                      activeInstitutionID={activeInstitutionID}
                      isMobile={isMobile}
                      isTablet={isTablet}
                      sportFilter={sportSelected}
                      meAllFilter={meAllFilter}
                      isAccountInfoLoading={isAccountInfoLoading}
                      paymentDefaults={paymentDefaults}
                      userID={userID}
                      userName={userName}
                      institutionCreationDate={institutionCreationDate}
                      navigateTo={path => this.navigateTo(path)}
                      goBack={() => this.goBack()}
                    />
                  </Route>
                  <Route exact path={"/myaccount/people/:personID"}>
                    <People
                      isAdmin={isAdmin}
                      communityName={communityName}
                      activeInstitutionID={activeInstitutionID}
                      isMobile={isMobile}
                      isTablet={isTablet}
                      sportFilter={sportSelected}
                      meAllFilter={meAllFilter}
                      isAccountInfoLoading={isAccountInfoLoading}
                      paymentDefaults={paymentDefaults}
                      userID={userID}
                      userName={userName}
                      institutionCreationDate={institutionCreationDate}
                      navigateTo={path => this.navigateTo(path)}
                      goBack={() => this.goBack()}
                    />
                  </Route>
                  <Route exact path={"/myaccount/people/:personID/:infoTab"}>
                    <People
                      isAdmin={isAdmin}
                      communityName={communityName}
                      activeInstitutionID={activeInstitutionID}
                      isMobile={isMobile}
                      isTablet={isTablet}
                      sportFilter={sportSelected}
                      meAllFilter={meAllFilter}
                      isAccountInfoLoading={isAccountInfoLoading}
                      paymentDefaults={paymentDefaults}
                      userID={userID}
                      userName={userName}
                      institutionCreationDate={institutionCreationDate}
                      navigateTo={path => this.navigateTo(path)}
                      goBack={() => this.goBack()}
                    />
                  </Route>
                  <Route exact path={"/myaccount/teams/"}>
                    <Teams
                      isAdmin={isAdmin}
                      userID={userID}
                      role={role}
                      sportFilter={sportSelected}
                      activeInstitutionID={activeInstitutionID}
                      isMobile={isMobile}
                      isTablet={isTablet}
                      meAllFilter={meAllFilter}
                      isAccountInfoLoading={isAccountInfoLoading}
                      navigateTo={path => this.navigateTo(path)}
                      goBack={() => this.goBack()}
                    />
                  </Route>
                  <Route exact path={"/myaccount/teams/:teamID"}>
                    <Teams
                      isAdmin={isAdmin}
                      userID={userID}
                      role={role}
                      sportFilter={sportSelected}
                      activeInstitutionID={activeInstitutionID}
                      isMobile={isMobile}
                      isTablet={isTablet}
                      meAllFilter={meAllFilter}
                      isAccountInfoLoading={isAccountInfoLoading}
                      navigateTo={path => this.navigateTo(path)}
                      goBack={() => this.goBack()}
                    />
                  </Route>
                  <Route exact path={"/myaccount/teams/:teamID/:infoTab"}>
                    <Teams
                      isAdmin={isAdmin}
                      userID={userID}
                      role={role}
                      sportFilter={sportSelected}
                      activeInstitutionID={activeInstitutionID}
                      isMobile={isMobile}
                      isTablet={isTablet}
                      meAllFilter={meAllFilter}
                      isAccountInfoLoading={isAccountInfoLoading}
                      navigateTo={path => this.navigateTo(path)}
                      goBack={() => this.goBack()}
                    />
                  </Route>
                  <Route exact path={"/myaccount/schedule/"}>
                    <Schedule
                      userID={userID}
                      role={communityRole}
                      sportFilter={sportSelected}
                      isMobile={isMobile}
                      isTablet={isTablet}
                      meAllFilter={meAllFilter}
                      activeInstitutionID={activeInstitutionID}
                      institutionCreationDate={institutionCreationDate}
                      isAccountInfoLoading={isAccountInfoLoading}
                      permissions={permissions}
                      navigateTo={path => this.navigateTo(path)}
                      goBack={() => this.goBack()}
                    />
                  </Route>
                  <Route exact path={"/myaccount/schedule/:dateSelected"}>
                    <Schedule
                      userID={userID}
                      role={communityRole}
                      sportFilter={sportSelected}
                      isMobile={isMobile}
                      isTablet={isTablet}
                      meAllFilter={meAllFilter}
                      activeInstitutionID={activeInstitutionID}
                      institutionCreationDate={institutionCreationDate}
                      isAccountInfoLoading={isAccountInfoLoading}
                      permissions={permissions}
                      navigateTo={path => this.navigateTo(path)}
                      goBack={() => this.goBack()}
                    />
                  </Route>
                  <Route
                    exact
                    path={"/myaccount/schedule/:dateSelected/:eventID"}
                  >
                    <Schedule
                      userID={userID}
                      role={communityRole}
                      sportFilter={sportSelected}
                      isMobile={isMobile}
                      isTablet={isTablet}
                      meAllFilter={meAllFilter}
                      activeInstitutionID={activeInstitutionID}
                      institutionCreationDate={institutionCreationDate}
                      isAccountInfoLoading={isAccountInfoLoading}
                      permissions={permissions}
                      navigateTo={path => this.navigateTo(path)}
                      goBack={() => this.goBack()}
                    />
                  </Route>
                  <Route
                    exact
                    path={"/myaccount/schedule/:dateSelected/:eventID/:infoTab"}
                  >
                    <Schedule
                      userID={userID}
                      role={communityRole}
                      sportFilter={sportSelected}
                      isMobile={isMobile}
                      isTablet={isTablet}
                      meAllFilter={meAllFilter}
                      activeInstitutionID={activeInstitutionID}
                      institutionCreationDate={institutionCreationDate}
                      isAccountInfoLoading={isAccountInfoLoading}
                      permissions={permissions}
                      navigateTo={path => this.navigateTo(path)}
                      goBack={() => this.goBack()}
                    />
                  </Route>
                  <Route>
                    <Dashboard
                      isMobile={isMobile}
                      isTablet={isTablet}
                      userID={userID}
                      role={role}
                      sportFilter={sportSelected}
                      activeInstitutionID={activeInstitutionID}
                      accountInfo={accountInfo}
                      isAccountInfoLoading={isAccountInfoLoading}
                      institutions={institutions}
                      permissions={permissions}
                    />
                  </Route>
                </Switch>
              </div>
            </div>
          </div>
          <DecisionModal
            isOpen={isLogOutModalOpen}
            handleYesClick={() => {
              signOut();
              closeLogOutModal();
            }}
            handleNoClick={closeLogOutModal}
            heading="Log Out"
            message="Are you sure you want to log out?"
          />
          <SwitchCommunitiesDialog
            isOpen={isManageInstitutionsDialogOpen}
            isMobile={isMobile}
            communities={switchCommunityInfo}
            activeCommunityID={activeInstitutionID}
            actions={{
              closeDialog: () => closeManageInstitutionsDialog(),
              updateActiveCommunity: newCommunityID => {
                this.navigateTo("/myaccount/overview");
                switchInstitution(userID, newCommunityID, role);
                closeManageInstitutionsDialog();
              }
            }}
          />
        </div>
      );
    }
  }
}

export default injectStyles(styles)(CoreInterfaceLayout);
