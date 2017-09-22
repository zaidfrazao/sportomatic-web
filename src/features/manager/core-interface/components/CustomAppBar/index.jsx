import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import { grey } from "material-ui/colors";
import { Route } from "react-router-dom";
import classNames from "classnames";
import AppBar from "material-ui/AppBar";
import Avatar from "material-ui/Avatar";
import Grid from "material-ui/Grid";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import AppBarMenuIcon from "material-ui-icons/MoreVert";
import LogOutIcon from "material-ui-icons/ExitToApp";
import SettingsIcon from "material-ui-icons/Settings";
import Toolbar from "material-ui/Toolbar";
import Tooltip from "material-ui/Tooltip";
import Typography from "material-ui/Typography";
import institutionLogo from "./images/institutionLogo.png";

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
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  rightButtons: {
    marginRight: "20px"
  },
  badgeColor: {
    backgroundColor: grey[50]
  },
  desktopIcons: {
    display: "flex",
    alignItems: "center"
  },
  institutionSelector: {
    padding: 4,
    width: 40,
    height: 40,
    cursor: "pointer"
  }
});

class CustomAppBar extends Component {
  state = {
    anchorEl: null,
    open: false
  };

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, title, isSideMenuOpen, isMobile } = this.props;
    const { toggleSideMenu } = this.props.actions;

    return (
      <AppBar
        className={classNames(
          !isMobile && classes.appBar,
          !isMobile && isSideMenuOpen && classes.appBarShift
        )}
      >
        <Toolbar disableGutters={!isSideMenuOpen}>
          <Grid container justify="space-between" align="center">
            <Grid item>
              <Grid container direction="row" align="center">
                <IconButton
                  color="contrast"
                  aria-label="open drawer"
                  onClick={() => toggleSideMenu()}
                  className={classNames(
                    classes.menuButton,
                    isSideMenuOpen && classes.hide
                  )}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  type="title"
                  color="inherit"
                  noWrap
                  className={classNames(isMobile && classes.mobileTitle)}
                >
                  {title}
                </Typography>
              </Grid>
            </Grid>
            <Grid item className={classes.rightButtons}>
              <Grid container justify="space-around" align="center">
                <Route
                  render={({ history }) => (
                    <Tooltip label="Settings" placement="bottom">
                      <IconButton
                        color="contrast"
                        aria-label="view notifications"
                        onClick={() => history.push(`/manager/settings/`)}
                      >
                        <SettingsIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                />

                {isMobile ? (
                  <Tooltip label="Options" placement="bottom">
                    <IconButton color="contrast" aria-label="app bar menu">
                      <AppBarMenuIcon />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <div className={classes.desktopIcons}>
                    <Tooltip label="Log out" placement="bottom">
                      <IconButton color="contrast" aria-label="log out">
                        <LogOutIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip label="Switch institutions" placement="bottom">
                      <Avatar
                        src={institutionLogo}
                        className={classes.institutionSelector}
                      />
                    </Tooltip>
                  </div>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(CustomAppBar);
