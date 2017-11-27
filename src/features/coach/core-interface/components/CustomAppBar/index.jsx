import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import { grey } from "material-ui/colors";
import { Route } from "react-router-dom";
import classNames from "classnames";
import AppBar from "material-ui/AppBar";
import Avatar from "material-ui/Avatar";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import AppBarMenuIcon from "material-ui-icons/MoreVert";
import LogOutIcon from "material-ui-icons/ExitToApp";
import SettingsIcon from "material-ui-icons/Settings";
import Menu, { MenuItem } from "material-ui/Menu";
import Toolbar from "material-ui/Toolbar";
import Tooltip from "material-ui/Tooltip";
import Typography from "material-ui/Typography";
import NotificationsTray from "./components/NotificationsTray";

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
    cursor: "pointer",
    backgroundColor: grey[100]
  },
  flexGrow: {
    flexGrow: 1
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
    const {
      classes,
      title,
      isSideMenuOpen,
      isMobile,
      activeInstitution
    } = this.props;
    const {
      toggleSideMenu,
      openLogOutModal,
      openSwitchInstitutionsDialog,
      openSettingsAlert
    } = this.props.actions;

    const notifications = [
      {
        body: "Match on 30 Nov 2017 at 1:00 pm.",
        feature: "SCHEDULE",
        isRead: false,
        title: "New event"
      },
      {
        body: "Steve was signed in at 12:22 pm.",
        feature: "HOURS",
        isRead: false,
        title: "Coach signed in"
      },
      {
        body: "Steve earned R350.00.",
        feature: "WAGES",
        isRead: false,
        title: "Wages approved"
      },
      {
        body: "The U/14 A Rugby Boys team won 23 - 10.",
        feature: "RESULTS",
        isRead: false,
        title: "Results approved"
      },
      {
        body: "Lucy Stein wants to join your institution.",
        feature: "PEOPLE",
        isRead: false,
        title: "Staff request"
      },
      {
        body: "U/14 A Rugby Boys name changed to The Vipers",
        feature: "TEAMS",
        isRead: false,
        title: "Team modified"
      },
      {
        body: "U/12 B Cricket Practice on Thurs, 30 Nov 2017 canceled.",
        feature: "SCHEDULE",
        isRead: false,
        title: "Event canceled"
      }
    ];

    return (
      <AppBar
        className={classNames(
          !isMobile && classes.appBar,
          !isMobile && isSideMenuOpen && classes.appBarShift
        )}
      >
        <Toolbar disableGutters={!isSideMenuOpen}>
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
          <div className={classes.flexGrow} />
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
          <NotificationsTray notifications={notifications} />
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
                    openSwitchInstitutionsDialog();
                  }}
                >
                  Switch institutions
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    this.handleRequestClose();
                    openLogOutModal();
                  }}
                >
                  Log out
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
              <Tooltip title="Switch institutions" placement="bottom">
                <Avatar
                  src={activeInstitution.emblemURL}
                  className={classes.institutionSelector}
                  onClick={() => openSwitchInstitutionsDialog()}
                />
              </Tooltip>
            </div>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(CustomAppBar);
