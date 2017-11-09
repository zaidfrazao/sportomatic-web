import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { Redirect, Route, Switch } from "react-router-dom";
import CustomAppBar from "./components/CustomAppBar";
import BottomNav from "./components/BottomNav";
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
    const { initUser } = this.props.actions;
    initUser();
    this.updateCoreUI(pathname);
  }

  componentWillReceiveProps(nextProps) {
    const { pathname } = nextProps.location;

    if (pathname !== this.props.location.pathname) {
      this.updateCoreUI(pathname);
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
    const { updateAppBarTitle, updateBottomNavValue } = this.props.actions;
    const featureName = pathname.split("/")[2];

    switch (featureName) {
      case "dashboard":
        updateAppBarTitle("Dashboard");
        updateBottomNavValue("dashboard");
        break;
      case "schedule":
        updateAppBarTitle("Schedule");
        updateBottomNavValue("schedule");
        break;
      case "hours":
        updateAppBarTitle("Hours");
        updateBottomNavValue("hours");
        break;
      case "wages":
        updateAppBarTitle("Wages");
        updateBottomNavValue("wages");
        break;
      case "reports":
        updateAppBarTitle("Reports");
        updateBottomNavValue("reports");
        break;
      case "people":
        updateAppBarTitle("People");
        updateBottomNavValue("people");
        break;
      case "teams":
        updateAppBarTitle("Teams");
        updateBottomNavValue("teams");
        break;
      case "settings":
        updateAppBarTitle("Settings");
        updateBottomNavValue("settings");
        break;
      case "results":
        updateAppBarTitle("Results");
        updateBottomNavValue("results");
        break;
      default:
        updateAppBarTitle("Dashboard");
        updateBottomNavValue("dashboard");
        break;
    }
  }

  updateWindowDimensions() {
    this.setState({ windowWidth: window.innerWidth });
  }

  render() {
    const { classes } = this.props;
    const {
      toggleSideMenu,
      signOut,
      closeSettingsAlert,
      openSettingsAlert,
      openLogOutModal,
      closeLogOutModal
    } = this.props.actions;
    const { windowWidth } = this.state;
    const {
      userID,
      isLoggedIn,
      type,
      appBarTitle,
      isSideMenuOpen,
      bottomNavValue
    } = this.props.uiConfig;
    const { isSettingsAlertOpen, isLogOutModalOpen } = this.props.dialogs;
    const isMobile = windowWidth < 600;
    const isTablet = windowWidth < 960;

    if (!isLoggedIn) {
      return <Redirect to="/sign-in" />;
    }

    if (type !== "INSTITUTION") {
      return <Redirect to="/sign-in" />;
    }

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <CustomAppBar
            title={appBarTitle}
            isSideMenuOpen={isSideMenuOpen}
            actions={{ toggleSideMenu, openLogOutModal, openSettingsAlert }}
            isMobile={isMobile}
          />
          <SideMenu
            isOpen={isSideMenuOpen}
            actions={{
              toggleSideMenu
            }}
            isMobile={isMobile}
          />
          <div className={classes.content}>
            <div className={classes.main}>
              <Switch>
                <Route exact path={"/institution/"}>
                  <Dashboard isTablet={isTablet} />
                </Route>
                <Route exact path={`/institution/dashboard/`}>
                  <Dashboard isTablet={isTablet} />
                </Route>
                <Route exact path={`/institution/hours/`}>
                  <Hours
                    isMobile={isMobile}
                    isTablet={isTablet}
                    userID={userID}
                  />
                </Route>
                <Route exact path={`/institution/hours/:coachID`}>
                  <Hours
                    isMobile={isMobile}
                    isTablet={isTablet}
                    userID={userID}
                  />
                </Route>
                <Route exact path={`/institution/results/`}>
                  <Results
                    isMobile={isMobile}
                    isTablet={isTablet}
                    userID={userID}
                  />
                </Route>
                <Route exact path={`/institution/results/:teamID`}>
                  <Results
                    isMobile={isMobile}
                    isTablet={isTablet}
                    userID={userID}
                  />
                </Route>
                <Route exact path={`/institution/results/:teamID/:eventID`}>
                  <Results
                    isMobile={isMobile}
                    isTablet={isTablet}
                    userID={userID}
                  />
                </Route>
                <Route exact path={`/institution/people/`}>
                  <People
                    userID={userID}
                    isMobile={isMobile}
                    isTablet={isTablet}
                  />
                </Route>
                <Route path={`/institution/people/:personID`}>
                  <People
                    userID={userID}
                    isMobile={isMobile}
                    isTablet={isTablet}
                  />
                </Route>
                <Route exact path={`/institution/teams/`}>
                  <Teams
                    userID={userID}
                    isMobile={isMobile}
                    isTablet={isTablet}
                  />
                </Route>
                <Route path={`/institution/teams/:teamID`}>
                  <Teams
                    userID={userID}
                    isMobile={isMobile}
                    isTablet={isTablet}
                  />
                </Route>
                <Route exact path={`/institution/schedule/`}>
                  <Schedule
                    isMobile={isMobile}
                    isTablet={isTablet}
                    userID={userID}
                  />
                </Route>
                <Route exact path={`/institution/schedule/:dateSelected`}>
                  <Schedule
                    isMobile={isMobile}
                    isTablet={isTablet}
                    userID={userID}
                  />
                </Route>
                <Route
                  exact
                  path={`/institution/schedule/:dateSelected/:eventID`}
                >
                  <Schedule
                    isMobile={isMobile}
                    isTablet={isTablet}
                    userID={userID}
                  />
                </Route>
                <Route exact path={`/institution/settings/`}>
                  <Settings />
                </Route>
                <Route exact path={`/institution/wages`}>
                  <Wages
                    isMobile={isMobile}
                    isTablet={isTablet}
                    userID={userID}
                  />
                </Route>
                <Route path={`/institution/wages/:coachID`}>
                  <Wages
                    isMobile={isMobile}
                    isTablet={isTablet}
                    userID={userID}
                  />
                </Route>
              </Switch>
            </div>
            {isMobile && <BottomNav value={bottomNavValue} />}
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
