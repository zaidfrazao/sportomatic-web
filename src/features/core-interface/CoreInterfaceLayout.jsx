// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { Route, Switch } from "react-router-dom";
import CustomAppBar from "./components/CustomAppBar";
import BottomNav from "./components/BottomNav";
import SideMenu from "./components/SideMenu";
import People from "../people/PeopleView";

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
    const { updateAppBarTitle, updateBottomNavValue } = this.props.actions;

    if (pathname.includes("dashboard")) {
      updateAppBarTitle("Dashboard");
      updateBottomNavValue("dashboard");
    } else if (pathname.includes("schedule")) {
      updateAppBarTitle("Schedule");
      updateBottomNavValue("schedule");
    } else if (pathname.includes("hours")) {
      updateAppBarTitle("Hours");
      updateBottomNavValue("hours");
    } else if (pathname.includes("people")) {
      updateAppBarTitle("People");
      updateBottomNavValue("people");
    } else if (pathname.includes("teams")) {
      updateAppBarTitle("Teams");
      updateBottomNavValue("teams");
    } else if (pathname.includes("reports")) {
      updateAppBarTitle("Reports");
      updateBottomNavValue("reports");
    } else if (pathname.includes("wages")) {
      updateAppBarTitle("Wages");
      updateBottomNavValue("wages");
    } else if (pathname.includes("settings")) {
      updateAppBarTitle("Settings");
      updateBottomNavValue("settings");
    }
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ windowWidth: window.innerWidth });
  }

  render() {
    const { classes, uiConfig, accountType } = this.props;
    const {
      toggleSideMenu,
      updateAppBarTitle,
      updateBottomNavValue
    } = this.props.actions;
    const { windowWidth } = this.state;
    const isMobile = windowWidth < 600;

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <CustomAppBar
            title={uiConfig.appBarTitle}
            isSideMenuOpen={uiConfig.isSideMenuOpen}
            actions={{ toggleSideMenu }}
            isMobile={isMobile}
          />
          <SideMenu
            isOpen={uiConfig.isSideMenuOpen}
            actions={{
              toggleSideMenu,
              updateAppBarTitle,
              updateBottomNavValue
            }}
            accountType={accountType}
            isMobile={isMobile}
          />
          <div className={classes.content}>
            <div className={classes.main}>
              <Switch>
                <Route exact path={`/${accountType}/people/`}>
                  <People accountType={accountType} />
                </Route>
                <Route path={`/${accountType}/people/:id`}>
                  <People accountType={accountType} />
                </Route>
              </Switch>
            </div>
            {isMobile && (
              <BottomNav
                value={uiConfig.bottomNavValue}
                accountType={accountType}
                actions={{ updateAppBarTitle, updateBottomNavValue }}
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
