// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { Route, Switch } from "react-router-dom";
import CustomAppBar from "./components/CustomAppBar";
import BottomNav from "./components/BottomNav";
import SideMenu from "./components/SideMenu";
import Dashboard from "../dashboard/DashboardView";
import People from "../people/PeopleView";
import Schedule from "../schedule/ScheduleView";
import Settings from "../settings/SettingsView";
import Teams from "../teams/TeamsView";
import Wages from "../wages/WagesView";
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
      case "wages":
        updateAppBarTitle("Wages");
        updateBottomNavValue("wages");
        break;
      case "reports":
        updateAppBarTitle("Reports");
        updateBottomNavValue("reports");
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
    const { classes, uiConfig, accountType } = this.props;
    const { toggleSideMenu } = this.props.actions;
    const { windowWidth } = this.state;
    const isMobile = windowWidth < 600;
    const isTablet = windowWidth < 960;

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <CustomAppBar
            title={uiConfig.appBarTitle}
            isSideMenuOpen={uiConfig.isSideMenuOpen}
            actions={{ toggleSideMenu }}
            isMobile={isMobile}
            accountType={accountType}
          />
          <SideMenu
            isOpen={uiConfig.isSideMenuOpen}
            actions={{
              toggleSideMenu
            }}
            accountType={accountType}
            isMobile={isMobile}
          />
          <div className={classes.content}>
            <div className={classes.main}>
              <Switch>
                <Route exact path={`/${accountType}/`}>
                  <Dashboard accountType={accountType} />
                </Route>
                <Route exact path={`/${accountType}/dashboard/`}>
                  <Dashboard accountType={accountType} />
                </Route>
                <Route exact path={`/${accountType}/people/`}>
                  <People accountType={accountType} />
                </Route>
                <Route path={`/${accountType}/people/:personID`}>
                  <People accountType={accountType} />
                </Route>
                <Route exact path={`/${accountType}/schedule/`}>
                  <Schedule
                    accountType={accountType}
                    isMobile={isMobile}
                    isTablet={isTablet}
                  />
                </Route>
                <Route exact path={`/${accountType}/schedule/:dateSelected`}>
                  <Schedule
                    accountType={accountType}
                    isMobile={isMobile}
                    isTablet={isTablet}
                  />
                </Route>
                <Route
                  exact
                  path={`/${accountType}/schedule/:dateSelected/:eventID`}
                >
                  <Schedule
                    accountType={accountType}
                    isMobile={isMobile}
                    isTablet={isTablet}
                  />
                </Route>
                <Route exact path={`/${accountType}/settings/`}>
                  <Settings accountType={accountType} />
                </Route>
                <Route exact path={`/${accountType}/teams/`}>
                  <Teams accountType={accountType} />
                </Route>
                <Route path={`/${accountType}/teams/:teamID`}>
                  <Teams accountType={accountType} />
                </Route>
                <Route exact path={`/${accountType}/wages`}>
                  <Wages
                    accountType={accountType}
                    isMobile={isMobile}
                    isTablet={isTablet}
                  />
                </Route>
                <Route
                  exact
                  path={`/${accountType}/wages/:coachID/:dateSelected`}
                >
                  <Wages
                    accountType={accountType}
                    isMobile={isMobile}
                    isTablet={isTablet}
                  />
                </Route>
                <Route path={`/${accountType}/wages/:dateSelected`}>
                  <Wages
                    accountType={accountType}
                    isMobile={isMobile}
                    isTablet={isTablet}
                  />
                </Route>
              </Switch>
            </div>
            {isMobile && (
              <BottomNav
                value={uiConfig.bottomNavValue}
                accountType={accountType}
              />
            )}
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
