import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import AppBarMenuIcon from "material-ui-icons/MoreVert";
import Avatar from "material-ui/Avatar";
import classNames from "classnames";
import { grey } from "material-ui/colors";
import IconButton from "material-ui/IconButton";
import InstitutionsIcon from "material-ui-icons/AccountBalance";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import LogOutIcon from "material-ui-icons/ExitToApp";
import MenuIcon from "material-ui-icons/Menu";
import Popover from "material-ui/Popover";
import SettingsIcon from "material-ui-icons/Settings";
import Toolbar from "material-ui/Toolbar";
import Tooltip from "material-ui/Tooltip";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import adminIcon from "./image/admin-icon.png";
import coachIcon from "./image/coach-icon.png";
import defaultEmblem from "./image/default-emblem.jpg";
import managerIcon from "./image/manager-icon.png";
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
  appBarWrapper: {
    display: "flex",
    alignItems: "center"
  },
  avatar: {
    width: 32,
    height: 32,
    margin: 8,
    backgroundColor: grey[200]
  },
  badgeColor: {
    backgroundColor: grey[50]
  },
  desktopIcons: {
    display: "flex",
    alignItems: "center"
  },
  flexGrow: {
    flexGrow: 1
  },
  hide: {
    display: "none"
  },
  menuButton: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  },
  rightButtons: {
    marginRight: "20px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  titleMargin: {
    marginLeft: theme.spacing.unit * 3
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
      unreadNotifications,
      readNotifications,
      isNotificationsLoading,
      emblemURL,
      role
    } = this.props;
    const {
      toggleSideMenu,
      openLogOutModal,
      openSettingsAlert,
      markNotificationsRead,
      openManageInstitutionsDialog
    } = this.props.actions;

    let roleIcon = adminIcon;
    if (role === "coach") {
      roleIcon = coachIcon;
    } else if (role === "manager") {
      roleIcon = managerIcon;
    }

    return (
      <AppBar
        className={classNames(
          classes.appBar,
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
          <div className={classes.rightButtons}>
            {!isMobile && (
              <Avatar
                className={classes.avatar}
                src={emblemURL === "" ? defaultEmblem : emblemURL}
                aria-label="institution emblem"
              />
            )}
            {!isMobile && (
              <Avatar
                src={roleIcon}
                className={classes.avatar}
                aria-label="role icon"
              />
            )}
            <NotificationsTray
              isMobile={isMobile}
              readNotifications={readNotifications}
              unreadNotifications={unreadNotifications}
              isLoading={isNotificationsLoading}
              actions={{
                markNotificationsRead
              }}
            />
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
              <Popover
                anchorEl={this.state.anchorEl}
                open={this.state.open}
                onRequestClose={this.handleRequestClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
              >
                <List className={classes.list}>
                  <ListItem
                    button
                    onClick={() => {
                      this.handleRequestClose();
                      openManageInstitutionsDialog();
                    }}
                  >
                    <ListItemIcon>
                      <InstitutionsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Manage institutions" />
                  </ListItem>
                  <ListItem
                    button
                    onClick={() => {
                      this.handleRequestClose();
                      openSettingsAlert();
                    }}
                  >
                    <ListItemIcon>
                      <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                  </ListItem>
                  <ListItem
                    button
                    onClick={() => {
                      this.handleRequestClose();
                      openLogOutModal();
                    }}
                  >
                    <ListItemIcon>
                      <LogOutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Log out" />
                  </ListItem>
                </List>
              </Popover>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(CustomAppBar);
