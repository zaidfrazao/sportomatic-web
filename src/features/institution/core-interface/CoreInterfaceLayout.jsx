import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { Redirect, Route, Switch } from "react-router-dom";
import CustomAppBar from "./components/CustomAppBar";
import SideMenu from "./components/SideMenu";
import Dashboard from "../dashboard/DashboardView";
import Hours from "../hours/HoursView";
import Results from "../results/ResultsView";
import People from "../people/PeopleView";
import Schedule from "../schedule/ScheduleView";
import Settings from "../settings/SettingsView";
import Teams from "../teams/TeamsView";
import Wages from "../wages/WagesView";
import backgroundImage from "./images/background-image.jpeg";
import NotificationModal from "../../../components/NotificationModal";
import DecisionModal from "../../../components/DecisionModal";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: "100%",
    height: "100vh",
    zIndex: 1,
    overflow: "hidden"
  },
  appFrame: {
    position: "relative",
    display: "flex",
    width: "100%",
    height: "100%"
  },
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
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: "none"
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
  main: {
    height: "100%",
    overflow: "auto"
  }
});

class CoreInterfaceLayout extends Component {
  constructor(props) {
    super(props);
    this.state = { windowWidth: "0" };
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
    const { userID } = this.props.uiConfig;
    initUser();
    if (userID !== "") {
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
    const { userID } = nextProps.uiConfig;

    if (pathname !== this.props.location.pathname) {
      this.updateCoreUI(pathname);
    }

    if (userID !== this.props.uiConfig.userID) {
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
      type,
      accountInfo,
      appBarTitle,
      isSideMenuOpen,
      userID
    } = this.props.uiConfig;
    const { isSettingsAlertOpen, isLogOutModalOpen } = this.props.dialogs;
    const isMobile = windowWidth < 600;
    const isTablet = windowWidth < 960;

    if (!isLoggedIn) {
      return <Redirect to="/sign-in" />;
    }

    if (type !== "ADMIN") {
      return <Redirect to="/sign-in" />;
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
          />
          <div className={classes.content}>
            <div className={classes.main}>
              <Switch>
                <Route exact path={"/admin/"}>
                  <Dashboard
                    isMobile={isMobile}
                    isTablet={isTablet}
                    userID={userID}
                    activeInstitutionID={
                      accountInfo.lastAccessed.institutionID || ""
                    }
                    accountInfo={accountInfo}
                    isAccountInfoLoading={isAccountInfoLoading}
                  />
                </Route>
                <Route exact path={`/admin/dashboard/`}>
                  <Dashboard
                    isMobile={isMobile}
                    isTablet={isTablet}
                    userID={userID}
                    activeInstitutionID={
                      accountInfo.lastAccessed.institutionID || ""
                    }
                    accountInfo={accountInfo}
                    isAccountInfoLoading={isAccountInfoLoading}
                  />
                </Route>
                <Route exact path={`/admin/hours/`}>
                  <Hours
                    isMobile={isMobile}
                    isTablet={isTablet}
                    activeInstitutionID={
                      accountInfo.lastAccessed.institutionID || ""
                    }
                  />
                </Route>
                <Route exact path={`/admin/hours/:coachID`}>
                  <Hours
                    isMobile={isMobile}
                    isTablet={isTablet}
                    activeInstitutionID={
                      accountInfo.lastAccessed.institutionID || ""
                    }
                  />
                </Route>
                <Route exact path={`/admin/results/`}>
                  <Results
                    isMobile={isMobile}
                    isTablet={isTablet}
                    activeInstitutionID={
                      accountInfo.lastAccessed.institutionID || ""
                    }
                  />
                </Route>
                <Route exact path={`/admin/results/:teamID`}>
                  <Results
                    isMobile={isMobile}
                    isTablet={isTablet}
                    activeInstitutionID={
                      accountInfo.lastAccessed.institutionID || ""
                    }
                  />
                </Route>
                <Route exact path={`/admin/results/:teamID/:eventID`}>
                  <Results
                    isMobile={isMobile}
                    isTablet={isTablet}
                    activeInstitutionID={
                      accountInfo.lastAccessed.institutionID || ""
                    }
                  />
                </Route>
                <Route exact path={`/admin/people/`}>
                  <People
                    activeInstitutionID={
                      accountInfo.lastAccessed.institutionID || ""
                    }
                    isMobile={isMobile}
                    isTablet={isTablet}
                  />
                </Route>
                <Route path={`/admin/people/:personID`}>
                  <People
                    activeInstitutionID={
                      accountInfo.lastAccessed.institutionID || ""
                    }
                    isMobile={isMobile}
                    isTablet={isTablet}
                  />
                </Route>
                <Route exact path={`/admin/teams/`}>
                  <Teams
                    activeInstitutionID={
                      accountInfo.lastAccessed.institutionID || ""
                    }
                    isMobile={isMobile}
                    isTablet={isTablet}
                  />
                </Route>
                <Route path={`/admin/teams/:teamID`}>
                  <Teams
                    activeInstitutionID={
                      accountInfo.lastAccessed.institutionID || ""
                    }
                    isMobile={isMobile}
                    isTablet={isTablet}
                  />
                </Route>
                <Route exact path={`/admin/schedule/`}>
                  <Schedule
                    isMobile={isMobile}
                    isTablet={isTablet}
                    activeInstitutionID={
                      accountInfo.lastAccessed.institutionID || ""
                    }
                  />
                </Route>
                <Route exact path={`/admin/schedule/:dateSelected`}>
                  <Schedule
                    isMobile={isMobile}
                    isTablet={isTablet}
                    activeInstitutionID={
                      accountInfo.lastAccessed.institutionID || ""
                    }
                  />
                </Route>
                <Route exact path={`/admin/schedule/:dateSelected/:eventID`}>
                  <Schedule
                    isMobile={isMobile}
                    isTablet={isTablet}
                    activeInstitutionID={
                      accountInfo.lastAccessed.institutionID || ""
                    }
                  />
                </Route>
                <Route exact path={`/admin/settings/`}>
                  <Settings />
                </Route>
                <Route exact path={`/admin/wages`}>
                  <Wages
                    isMobile={isMobile}
                    isTablet={isTablet}
                    activeInstitutionID={
                      accountInfo.lastAccessed.institutionID || ""
                    }
                  />
                </Route>
                <Route path={`/admin/wages/:coachID`}>
                  <Wages
                    isMobile={isMobile}
                    isTablet={isTablet}
                    activeInstitutionID={
                      accountInfo.lastAccessed.institutionID || ""
                    }
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

CoreInterfaceLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CoreInterfaceLayout);
