/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import { Redirect, Route, Switch } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import backgroundImage from "./images/background-image.jpeg";
import CustomAppBar from "./components/CustomAppBar";
import Dashboard from "../dashboard/DashboardView";
import DecisionModal from "../../components/DecisionModal";
import Hours from "../hours/HoursView";
import LoadingScreen from "./components/LoadingScreen";
import ManageInstitutionsDialog from "./components/ManageInstitutionsDialog";
import Results from "../results/ResultsView";
import People from "../people/PeopleView";
import Schedule from "../schedule/ScheduleView";
import Settings from "../settings/SettingsView";
import SideMenu from "./components/SideMenu";
import Teams from "../teams/TeamsView";
import Wages from "../wages/WagesView";

const drawerWidth = 240;

const styles = theme => ({
  appBar: {
    position: "absolute",
    zIndex: theme.zIndex.navDrawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  appFrame: {
    position: "relative",
    display: "flex",
    width: "100%",
    height: "100%"
  },
  content: {
    width: "100%",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.background.default,
    padding: 0,
    height: "calc(100% - 56px)",
    marginTop: 56,
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    [theme.breakpoints.up("sm")]: {
      height: "calc(100% - 64px)",
      marginTop: 64
    }
  },
  hide: {
    display: "none"
  },
  main: {
    height: "100%",
    overflow: "auto"
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  root: {
    width: "100%",
    height: "100vh",
    zIndex: 1,
    overflow: "hidden"
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
      loadAccountInfo
    } = nextProps.actions;
    const { userID, isLoggedIn, accountInfo } = nextProps.uiConfig;
    const { loadInstitutionInfo } = nextProps.actions;

    if (
      accountInfo !== this.props.uiConfig.accountInfo &&
      accountInfo.institutions
    ) {
      _.toPairs(accountInfo.institutions).map(([id, info]) => {
        loadInstitutionInfo(id);
      });
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
    const { updateAppBarTitle } = this.props.actions;
    const featureName = pathname.split("/")[2];

    switch (featureName) {
      case "home":
        updateAppBarTitle("Home");
        break;
      case "schedule":
        updateAppBarTitle("Schedule");
        break;
      case "hours":
        updateAppBarTitle("Hours");
        break;
      case "wages":
        updateAppBarTitle("Wages");
        break;
      case "reports":
        updateAppBarTitle("Reports");
        break;
      case "people":
        updateAppBarTitle("People");
        break;
      case "teams":
        updateAppBarTitle("Teams");
        break;
      case "settings":
        updateAppBarTitle("Settings");
        break;
      case "results":
        updateAppBarTitle("Results");
        break;
      default:
        updateAppBarTitle("Home");
        break;
    }
  }

  updateWindowDimensions() {
    this.setState({ windowWidth: window.innerWidth });
  }

  render() {
    const {
      classes,
      unreadNotifications,
      readNotifications,
      institutions,
      verifiedInstitutions
    } = this.props;
    const {
      toggleSideMenu,
      signOut,
      openLogOutModal,
      closeLogOutModal,
      markNotificationsRead,
      openManageInstitutionsDialog,
      closeManageInstitutionsDialog,
      createInstitution,
      loadVerifiedInstitutions,
      joinInstitution
    } = this.props.actions;
    const { windowWidth } = this.state;
    const {
      isNotificationsLoading,
      isAccountInfoLoading,
      isInstitutionsLoading,
      isInstitutionCreationLoading,
      isVerifiedInstitutionsLoading,
      isJoinInstitutionLoading
    } = this.props.loadingStatus;
    const {
      isLoggedIn,
      accountInfo,
      appBarTitle,
      isSideMenuOpen,
      userID
    } = this.props.uiConfig;
    const {
      isLogOutModalOpen,
      isManageInstitutionsDialogOpen
    } = this.props.dialogs;

    const isMobile = windowWidth < 600;
    const isTablet = windowWidth < 960;

    const role = _.toLower(accountInfo.lastAccessed.role);
    const activeInstitutionID = accountInfo.lastAccessed.institutionID;

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
        <div className={classes.root}>
          <div className={classes.appFrame}>
            <CustomAppBar
              title={appBarTitle}
              isSideMenuOpen={isSideMenuOpen}
              actions={{
                toggleSideMenu,
                openLogOutModal,
                markNotificationsRead,
                openManageInstitutionsDialog
              }}
              isMobile={isMobile}
              readNotifications={readNotifications}
              unreadNotifications={unreadNotifications}
              isNotificationsLoading={isNotificationsLoading}
              emblemURL={
                institutions[activeInstitutionID]
                  ? institutions[activeInstitutionID].info.emblemURL
                  : ""
              }
              role={role}
            />
            <SideMenu
              isOpen={isSideMenuOpen}
              actions={{
                toggleSideMenu
              }}
              isMobile={isMobile}
              feature={appBarTitle}
              versionNumber="0.9.24"
              role={role}
              permissions={permissions}
            />
            <div className={classes.content}>
              <div className={classes.main}>
                <Switch>
                  <Route exact path={"/myaccount/"}>
                    <Dashboard
                      isMobile={isMobile}
                      isTablet={isTablet}
                      userID={userID}
                      role={role}
                      activeInstitutionID={activeInstitutionID}
                      accountInfo={accountInfo}
                      isAccountInfoLoading={isAccountInfoLoading}
                      institutions={institutions}
                      permissions={permissions}
                    />
                  </Route>
                  <Route exact path={"/myaccount/home/"}>
                    <Dashboard
                      isMobile={isMobile}
                      isTablet={isTablet}
                      userID={userID}
                      role={role}
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
                  <Route exact path={"/myaccount/hours/"}>
                    <Hours
                      isMobile={isMobile}
                      isTablet={isTablet}
                      activeInstitutionID={activeInstitutionID}
                      isAccountInfoLoading={isAccountInfoLoading}
                      userID={userID}
                      role={role}
                      paymentDefaults={paymentDefaults}
                      institutionCreationDate={institutionCreationDate}
                    />
                  </Route>
                  <Route exact path={"/myaccount/hours/:coachID"}>
                    <Hours
                      isMobile={isMobile}
                      isTablet={isTablet}
                      activeInstitutionID={activeInstitutionID}
                      isAccountInfoLoading={isAccountInfoLoading}
                      userID={userID}
                      role={role}
                      paymentDefaults={paymentDefaults}
                      institutionCreationDate={institutionCreationDate}
                    />
                  </Route>
                  <Route exact path={"/myaccount/results/"}>
                    <Results
                      isMobile={isMobile}
                      isTablet={isTablet}
                      activeInstitutionID={activeInstitutionID}
                      isAccountInfoLoading={isAccountInfoLoading}
                      userID={userID}
                      role={role}
                      permissions={permissions}
                    />
                  </Route>
                  <Route exact path={"/myaccount/results/:teamID"}>
                    <Results
                      isMobile={isMobile}
                      isTablet={isTablet}
                      activeInstitutionID={activeInstitutionID}
                      isAccountInfoLoading={isAccountInfoLoading}
                      userID={userID}
                      role={role}
                      permissions={permissions}
                    />
                  </Route>
                  <Route exact path={"/myaccount/results/:teamID/:eventID"}>
                    <Results
                      isMobile={isMobile}
                      isTablet={isTablet}
                      activeInstitutionID={activeInstitutionID}
                      isAccountInfoLoading={isAccountInfoLoading}
                      userID={userID}
                      role={role}
                      permissions={permissions}
                    />
                  </Route>
                  <Route exact path={"/myaccount/people/"}>
                    <People
                      activeInstitutionID={activeInstitutionID}
                      isMobile={isMobile}
                      isTablet={isTablet}
                      isAccountInfoLoading={isAccountInfoLoading}
                      paymentDefaults={paymentDefaults}
                      userID={userID}
                      role={role}
                    />
                  </Route>
                  <Route path={"/myaccount/people/:personID"}>
                    <People
                      activeInstitutionID={activeInstitutionID}
                      isMobile={isMobile}
                      isTablet={isTablet}
                      isAccountInfoLoading={isAccountInfoLoading}
                      paymentDefaults={paymentDefaults}
                      userID={userID}
                      role={role}
                    />
                  </Route>
                  <Route exact path={"/myaccount/teams/"}>
                    <Teams
                      userID={userID}
                      role={role}
                      activeInstitutionID={activeInstitutionID}
                      isMobile={isMobile}
                      isTablet={isTablet}
                      isAccountInfoLoading={isAccountInfoLoading}
                      permissions={permissions}
                    />
                  </Route>
                  <Route path={"/myaccount/teams/:teamID"}>
                    <Teams
                      userID={userID}
                      role={role}
                      activeInstitutionID={activeInstitutionID}
                      isMobile={isMobile}
                      isTablet={isTablet}
                      isAccountInfoLoading={isAccountInfoLoading}
                      permissions={permissions}
                    />
                  </Route>
                  <Route exact path={"/myaccount/schedule/"}>
                    <Schedule
                      userID={userID}
                      role={role}
                      isMobile={isMobile}
                      isTablet={isTablet}
                      activeInstitutionID={activeInstitutionID}
                      isAccountInfoLoading={isAccountInfoLoading}
                      permissions={permissions}
                    />
                  </Route>
                  <Route exact path={"/myaccount/schedule/:dateSelected"}>
                    <Schedule
                      userID={userID}
                      role={role}
                      isMobile={isMobile}
                      isTablet={isTablet}
                      activeInstitutionID={activeInstitutionID}
                      isAccountInfoLoading={isAccountInfoLoading}
                      permissions={permissions}
                    />
                  </Route>
                  <Route
                    exact
                    path={"/myaccount/schedule/:dateSelected/:eventID"}
                  >
                    <Schedule
                      userID={userID}
                      role={role}
                      isMobile={isMobile}
                      isTablet={isTablet}
                      activeInstitutionID={activeInstitutionID}
                      isAccountInfoLoading={isAccountInfoLoading}
                      permissions={permissions}
                    />
                  </Route>
                  <Route exact path={"/myaccount/wages"}>
                    <Wages
                      isMobile={isMobile}
                      isTablet={isTablet}
                      userID={userID}
                      role={role}
                      activeInstitutionID={activeInstitutionID}
                      isAccountInfoLoading={isAccountInfoLoading}
                      permissions={permissions}
                      institutionCreationDate={institutionCreationDate}
                      paymentDefaults={paymentDefaults}
                    />
                  </Route>
                  <Route path={"/myaccount/wages/:coachID"}>
                    <Wages
                      isMobile={isMobile}
                      isTablet={isTablet}
                      userID={userID}
                      role={role}
                      activeInstitutionID={activeInstitutionID}
                      isAccountInfoLoading={isAccountInfoLoading}
                      permissions={permissions}
                      institutionCreationDate={institutionCreationDate}
                      paymentDefaults={paymentDefaults}
                    />
                  </Route>
                  <Route>
                    <Dashboard
                      isMobile={isMobile}
                      isTablet={isTablet}
                      userID={userID}
                      role={role}
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
          <ManageInstitutionsDialog
            isOpen={isManageInstitutionsDialogOpen}
            isMobile={isMobile}
            institutions={institutions}
            verifiedInstitutions={verifiedInstitutions}
            isLoading={
              isInstitutionCreationLoading ||
              isVerifiedInstitutionsLoading ||
              isJoinInstitutionLoading
            }
            userID={userID}
            userInfo={accountInfo}
            actions={{
              createInstitution,
              loadVerifiedInstitutions,
              joinInstitution,
              closeDialog: () => closeManageInstitutionsDialog()
            }}
          />
        </div>
      );
    }
  }
}

export default withStyles(styles)(CoreInterfaceLayout);
