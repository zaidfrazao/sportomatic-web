import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import { grey } from "material-ui/colors";
import { Route } from "react-router-dom";
import classNames from "classnames";
import AppBar from "material-ui/AppBar";
import Grid from "material-ui/Grid";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import AppBarMenuIcon from "material-ui-icons/MoreVert";
import LogOutIcon from "material-ui-icons/ExitToApp";
import SettingsIcon from "material-ui-icons/Settings";
import Menu, { MenuItem } from "material-ui/Menu";
import Toolbar from "material-ui/Toolbar";
import Tooltip from "material-ui/Tooltip";
import Typography from "material-ui/Typography";

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
  appBarWrapper: {
    display: "flex",
    alignItems: "center"
  },
  flexGrow: {
    flexGrow: 1
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
  titleMargin: {
    marginLeft: 36
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
    const {
      toggleSideMenu,
      openLogOutModal,
      openSettingsAlert
    } = this.props.actions;

    return (
      <AppBar
        className={classNames(
          !isMobile && classes.appBar,
          !isMobile && isSideMenuOpen && classes.appBarShift
        )}
      >
        <Toolbar disableGutters className={classes.appBarWrapper}>
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
            className={classNames(
              classes.flexGrow,
              isSideMenuOpen && classes.titleMargin
            )}
          >
            {title}
          </Typography>
          <div item className={classes.rightButtons}>
            <Grid container justify="space-around" align="center">
              <Route
                render={({ history }) => (
                  <Tooltip title="Settings" placement="bottom">
                    <IconButton
                      color="contrast"
                      aria-label="edit settings"
                      onClick={() => openSettingsAlert()}
                    >
                      <SettingsIcon />
                    </IconButton>
                  </Tooltip>
                )}
              />
              {isMobile ? (
                <div>
                  <Tooltip title="Options" placement="bottom">
                    <IconButton
                      color="contrast"
                      aria-label="app bar menu"
                      onClick={this.handleClick}
                    >
                      <AppBarMenuIcon />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onRequestClose={this.handleRequestClose}
                  >
                    <MenuItem
                      onClick={() => {
                        this.handleRequestClose();
                        openLogOutModal();
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
              ) : (
                <div className={classes.desktopIcons}>
                  <Route
                    render={({ history }) => (
                      <Tooltip title="Log out" placement="bottom">
                        <IconButton
                          color="contrast"
                          aria-label="log out"
                          onClick={() => openLogOutModal()}
                        >
                          <LogOutIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  />
                </div>
              )}
            </Grid>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(CustomAppBar);
