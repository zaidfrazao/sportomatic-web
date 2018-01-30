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
import NotificationModal from "../../components/NotificationModal";
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
    const { userID, isLoggedIn } = nextProps.uiConfig;

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
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateCoreUI(pathname) {
    const { updateAppBarTitle } = this.props.actions;
    const featureName = pathname.split("/")[2];

    switch (featureName) {
      case "dashboard":
        updateAppBarTitle("Dashboard");
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
        updateAppBarTitle("Dashboard");
        break;
    }
  }

  updateWindowDimensions() {
    this.setState({ windowWidth: window.innerWidth });
  }

  render() {
    const { classes, unreadNotifications, readNotifications } = this.props;
    const {
      toggleSideMenu,
      signOut,
      closeSettingsAlert,
      openSettingsAlert,
      openLogOutModal,
      closeLogOutModal,
      markNotificationsRead
    } = this.props.actions;
    const { windowWidth } = this.state;
    const {
      isNotificationsLoading,
      isAccountInfoLoading
    } = this.props.loadingStatus;
    const {
      isLoggedIn,
      accountInfo,
      appBarTitle,
      isSideMenuOpen,
      userID
    } = this.props.uiConfig;
    const { isSettingsAlertOpen, isLogOutModalOpen } = this.props.dialogs;

    const isMobile = windowWidth < 600;
    const isTablet = windowWidth < 960;

    const role = _.toLower(accountInfo.lastAccessed.role);
    const activeInstitutionID = accountInfo.lastAccessed.institutionID;

    if (!isLoggedIn) {
      return <Redirect to="/sign-in" />;
    }

    if (isAccountInfoLoading) {
      return <LoadingScreen />;
    }

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <CustomAppBar
            title={appBarTitle}
            isSideMenuOpen={isSideMenuOpen}
            actions={{
              toggleSideMenu,
              openLogOutModal,
              openSettingsAlert,
              markNotificationsRead
            }}
            isMobile={isMobile}
            readNotifications={readNotifications}
            unreadNotifications={unreadNotifications}
            isNotificationsLoading={isNotificationsLoading}
          />
          <SideMenu
            isOpen={isSideMenuOpen}
            actions={{
              toggleSideMenu
            }}
            isMobile={isMobile}
            feature={appBarTitle}
            role={role}
          />
          <div className={classes.content}>
            <div className={classes.main}>
              <Switch>
                <Route exact path={"/myaccount/"}>
                  <Dashboard
                    isMobile={isMobile}
                    isTablet={isTablet}
                    userID={userID}
                    activeInstitutionID={activeInstitutionID}
                    accountInfo={accountInfo}
                    isAccountInfoLoading={isAccountInfoLoading}
                  />
                </Route>
                <Route exact path={"/myaccount/dashboard/"}>
                  <Dashboard
                    isMobile={isMobile}
                    isTablet={isTablet}
                    userID={userID}
                    activeInstitutionID={activeInstitutionID}
                    accountInfo={accountInfo}
                    isAccountInfoLoading={isAccountInfoLoading}
                  />
                </Route>
                <Route exact path={"/myaccount/hours/"}>
                  <Hours
                    isMobile={isMobile}
                    isTablet={isTablet}
                    activeInstitutionID={activeInstitutionID}
                    isAccountInfoLoading={isAccountInfoLoading}
                  />
                </Route>
                <Route exact path={"/myaccount/hours/:coachID"}>
                  <Hours
                    isMobile={isMobile}
                    isTablet={isTablet}
                    activeInstitutionID={activeInstitutionID}
                    isAccountInfoLoading={isAccountInfoLoading}
                  />
                </Route>
                <Route exact path={"/myaccount/results/"}>
                  <Results
                    isMobile={isMobile}
                    isTablet={isTablet}
                    activeInstitutionID={activeInstitutionID}
                    isAccountInfoLoading={isAccountInfoLoading}
                  />
                </Route>
                <Route exact path={"/myaccount/results/:teamID"}>
                  <Results
                    isMobile={isMobile}
                    isTablet={isTablet}
                    activeInstitutionID={activeInstitutionID}
                    isAccountInfoLoading={isAccountInfoLoading}
                  />
                </Route>
                <Route exact path={"/myaccount/results/:teamID/:eventID"}>
                  <Results
                    isMobile={isMobile}
                    isTablet={isTablet}
                    activeInstitutionID={activeInstitutionID}
                    isAccountInfoLoading={isAccountInfoLoading}
                  />
                </Route>
                <Route exact path={"/myaccount/people/"}>
                  <People
                    activeInstitutionID={activeInstitutionID}
                    isMobile={isMobile}
                    isTablet={isTablet}
                    isAccountInfoLoading={isAccountInfoLoading}
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
                  />
                </Route>
                <Route exact path={"/myaccount/settings/"}>
                  <Settings isAccountInfoLoading={isAccountInfoLoading} />
                </Route>
                <Route exact path={"/myaccount/wages"}>
                  <Wages
                    isMobile={isMobile}
                    isTablet={isTablet}
                    userID={userID}
                    role={role}
                    activeInstitutionID={activeInstitutionID}
                    isAccountInfoLoading={isAccountInfoLoading}
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
                  />
                </Route>
                <Route>
                  <Dashboard
                    isMobile={isMobile}
                    isTablet={isTablet}
                    userID={userID}
                    activeInstitutionID={activeInstitutionID}
                    accountInfo={accountInfo}
                    isAccountInfoLoading={isAccountInfoLoading}
                  />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
        <NotificationModal
          isOpen={isSettingsAlertOpen}
          handleOkClick={closeSettingsAlert}
          heading="Unavailable in Beta"
          message="The ability to edit account settings is unavailable in this version of the beta."
        />
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
      </div>
    );
  }
}

export default withStyles(styles)(CoreInterfaceLayout);
