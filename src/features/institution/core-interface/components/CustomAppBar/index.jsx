import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import { grey } from "material-ui/colors";
import classNames from "classnames";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import AppBarMenuIcon from "material-ui-icons/MoreVert";
import Popover from "material-ui/Popover";
import LogOutIcon from "material-ui-icons/ExitToApp";
import SettingsIcon from "material-ui-icons/Settings";
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
  appBarWrapper: {
    display: "flex",
    alignItems: "center"
  },
  flexGrow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  },
  hide: {
    display: "none"
  },
  rightButtons: {
    marginRight: "20px",
    display: "flex",
    flexDirection: "row"
  },
  badgeColor: {
    backgroundColor: grey[50]
  },
  desktopIcons: {
    display: "flex",
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
      isNotificationsLoading
    } = this.props;
    const {
      toggleSideMenu,
      openLogOutModal,
      openSettingsAlert,
      markNotificationsRead
    } = this.props.actions;

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
            <NotificationsTray
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
                  <ListItem button onClick={() => openSettingsAlert()}>
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
