import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import { grey } from "material-ui/colors";
import classNames from "classnames";
import AppBar from "material-ui/AppBar";
import Avatar from "material-ui/Avatar";
import Badge from "material-ui/Badge";
import Button from "material-ui/Button";
import Grid from "material-ui/Grid";
import IconButton from "material-ui/IconButton";
import Menu, { MenuItem } from "material-ui/Menu";
import MenuIcon from "material-ui-icons/Menu";
import NotificationsIcon from "material-ui-icons/Notifications";
import { ListItemText } from "material-ui/List";
import LogOutIcon from "material-ui-icons/ExitToApp";
import Toolbar from "material-ui/Toolbar";
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
  mobileTitle: {
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
                    isSideMenuOpen && classes.hide,
                    isMobile && classes.hide
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
                <IconButton
                  color="contrast"
                  aria-label="view notifications"
                  onClick={this.handleClick}
                >
                  <Badge
                    classes={{ colorPrimary: classes.badgeColor }}
                    badgeContent={4}
                    color="primary"
                  >
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <Menu
                  id="simple-menu"
                  getContentAnchorEl={null}
                  anchorEl={this.state.anchorEl}
                  open={this.state.open}
                  onRequestClose={this.handleRequestClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center"
                  }}
                >
                  <MenuItem onClick={this.handleRequestClose}>
                    <Avatar
                      alt="iPhone 7"
                      src="https://store.storeimages.cdn-apple.com/4974/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone7/select/iphone7-select-2016?wid=222&hei=305&fmt=png-alpha&qlt=95&.v=1471892660314"
                    />
                    <ListItemText primary="Sales Update" secondary="iPhone 7" />
                  </MenuItem>
                  <MenuItem onClick={this.handleRequestClose}>
                    <Avatar
                      alt="Apple Watch"
                      src="https://www.imore.com/sites/imore.com/files/styles/large/public/topic_images/2015/topic-apple-watch-all.png?itok=OUtlCphV"
                    />
                    <ListItemText
                      primary="Sales Update"
                      secondary="Apple Watch"
                    />
                  </MenuItem>
                  <MenuItem onClick={this.handleRequestClose}>
                    <Avatar
                      alt="MacBook Pro"
                      src="https://store.storeimages.cdn-apple.com/4974/as-images.apple.com/is/image/AppleInc/aos/published/images/m/bp/mbp15touch/gray/mbp15touch-gray-select-201610?wid=452&hei=420&fmt=jpeg&qlt=95&op_sharpen=0&resMode=bicub&op_usm=0.5,0.5,0,0&iccEmbed=0&layer=comp&.v=1496611018929"
                    />
                    <ListItemText
                      primary="Sales Update"
                      secondary="Apple Watch"
                    />
                  </MenuItem>
                  <MenuItem onClick={this.handleRequestClose}>
                    <Avatar
                      alt="iPhone 7"
                      src="https://store.storeimages.cdn-apple.com/4974/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone7/select/iphone7-select-2016?wid=222&hei=305&fmt=png-alpha&qlt=95&.v=1471892660314"
                    />
                    <ListItemText primary="Sales Update" secondary="iPhone 7" />
                  </MenuItem>
                </Menu>
                {isMobile ? (
                  <IconButton color="contrast" aria-label="log out">
                    <LogOutIcon />
                  </IconButton>
                ) : (
                  <Button>Log out</Button>
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
