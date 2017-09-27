// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { Redirect, Route, Switch } from "react-router-dom";
import CustomAppBar from "./components/CustomAppBar";
import BottomNav from "./components/BottomNav";
import SideMenu from "./components/SideMenu";
import Dashboard from "../dashboard/DashboardView";
import Hours from "../hours/HoursView";
import People from "../people/PeopleView";
import Schedule from "../schedule/ScheduleView";
import Settings from "../settings/SettingsView";
import Teams from "../teams/TeamsView";
import backgroundImage from "./images/background-image.jpeg";

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
    const { classes, uiConfig } = this.props;
    const { toggleSideMenu, signOut } = this.props.actions;
    const { windowWidth } = this.state;
    const isMobile = windowWidth < 600;
    const isTablet = windowWidth < 960;

    if (!uiConfig.isLoggedIn) {
      return <Redirect to="/sign-in" />;
    }

    if (uiConfig.type !== "MANAGER") {
      return <Redirect to="/sign-in" />;
    }

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <CustomAppBar
            title={uiConfig.appBarTitle}
            isSideMenuOpen={uiConfig.isSideMenuOpen}
            actions={{ toggleSideMenu, signOut }}
            activeInstitution={uiConfig.activeInstitution}
            isMobile={isMobile}
          />
          <SideMenu
            isOpen={uiConfig.isSideMenuOpen}
            actions={{
              toggleSideMenu
            }}
            isMobile={isMobile}
          />
          <div className={classes.content}>
            <div className={classes.main}>
              <Switch>
                <Route exact path={"/manager/"}>
                  <Dashboard />
                </Route>
                <Route exact path={`/manager/dashboard/`}>
                  <Dashboard />
                </Route>
                <Route exact path={`/manager/hours/`}>
                  <Hours isMobile={isMobile} isTablet={isTablet} />
                </Route>
                <Route exact path={`/manager/people/`}>
                  <People />
                </Route>
                <Route path={`/manager/people/:personID`}>
                  <People />
                </Route>
                <Route exact path={`/manager/teams/`}>
                  <Teams />
                </Route>
                <Route path={`/manager/teams/:teamID`}>
                  <Teams />
                </Route>
                <Route exact path={`/manager/schedule/`}>
                  <Schedule isMobile={isMobile} isTablet={isTablet} />
                </Route>
                <Route exact path={`/manager/schedule/:dateSelected`}>
                  <Schedule isMobile={isMobile} isTablet={isTablet} />
                </Route>
                <Route exact path={`/manager/schedule/:dateSelected/:eventID`}>
                  <Schedule isMobile={isMobile} isTablet={isTablet} />
                </Route>
                <Route exact path={`/manager/settings/`}>
                  <Settings />
                </Route>
              </Switch>
            </div>
            {isMobile && <BottomNav value={uiConfig.bottomNavValue} />}
          </div>
        </div>
      </div>
    );
  }
}

CoreInterfaceLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CoreInterfaceLayout);
