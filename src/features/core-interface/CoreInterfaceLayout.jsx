// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import CustomAppBar from "./components/CustomAppBar";
import BottomNav from "./components/BottomNav";
import SideMenu from "./components/SideMenu";

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
    padding: 24,
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
    } else if (pathname.includes("products")) {
      updateAppBarTitle("Products");
      updateBottomNavValue("products");
    } else if (pathname.includes("business-info")) {
      updateAppBarTitle("Business Info");
      updateBottomNavValue("business-info");
    } else if (pathname.includes("contact-info")) {
      updateAppBarTitle("Contact Info");
      updateBottomNavValue("contact-info");
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
    const { classes, uiConfig } = this.props;
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
            actions={{ toggleSideMenu, updateAppBarTitle }}
            isMobile={isMobile}
          />
          <div className={classes.content}>
            <div className={classes.main} />
            {isMobile && (
              <BottomNav
                value={uiConfig.bottomNavValue}
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
