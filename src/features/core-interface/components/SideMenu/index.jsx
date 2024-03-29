import React, { Component } from "react";
import ChevronLeftIcon from "material-ui-icons/ChevronLeft";
import classNames from "classnames";
import HomeIcon from "material-ui-icons/Home";
import Divider from "material-ui/Divider";
import Drawer from "material-ui/Drawer";
import { grey } from "material-ui/colors";
import HoursIcon from "material-ui-icons/Alarm";
import IconButton from "material-ui/IconButton";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import ResultsIcon from "material-ui-icons/PlusOne";
import { Route } from "react-router-dom";
import PeopleIcon from "material-ui-icons/Person";
import ScheduleIcon from "material-ui-icons/Event";
import SettingsIcon from "material-ui-icons/Settings";
import TeamsIcon from "material-ui-icons/People";
import Typography from "material-ui/Typography";
import WagesIcon from "material-ui-icons/AttachMoney";
import { withStyles } from "material-ui/styles";
import logo from "./images/logo.png";

const drawerWidth = 240;

const styles = theme => ({
  drawerPaper: {
    position: "relative",
    height: "100%",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    width: 60,
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  drawerInner: {
    height: "100%",
    width: drawerWidth,
    display: "flex",
    flexDirection: "column"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    height: 56,
    [theme.breakpoints.up("sm")]: {
      height: 64
    }
  },
  featureList: {
    flexGrow: 1
  },
  logo: {
    backgroundImage: `url(${logo})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: 160,
    height: 30
  },
  selectedItem: {
    backgroundColor: grey[300]
  },
  unselectedItem: {
    backgroundColor: grey[0]
  },
  version: {
    color: grey[500],
    padding: 16,
    textAlign: "center"
  }
});

class SideMenu extends Component {
  render() {
    const {
      classes,
      isOpen,
      isMobile,
      feature,
      role,
      versionNumber,
      permissions
    } = this.props;
    const { toggleSideMenu } = this.props.actions;

    return (
      <Drawer
        type={isMobile ? "temporary" : "permanent"}
        classes={{
          paper: classNames(
            !isMobile && classes.drawerPaper,
            !isMobile && !isOpen && classes.drawerPaperClose
          )
        }}
        onRequestClose={() => toggleSideMenu()}
        open={isOpen}
      >
        <div className={classes.drawerInner}>
          <div className={classes.drawerHeader}>
            <div className={classes.logo} />
            <IconButton onClick={() => toggleSideMenu()}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List className={classes.featureList}>
            <Route
              key={1}
              render={({ history }) => (
                <ListItem
                  button
                  onClick={() => {
                    history.push("/myaccount/home");
                    isMobile && toggleSideMenu();
                  }}
                  className={classNames(
                    feature !== "Home" && classes.unselectedItem,
                    feature === "Home" && classes.selectedItem
                  )}
                >
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem>
              )}
            />
            <Route
              key={2}
              render={({ history }) => (
                <ListItem
                  button
                  onClick={() => {
                    history.push("/myaccount/schedule");
                    isMobile && toggleSideMenu();
                  }}
                  className={classNames(
                    feature !== "Schedule" && classes.unselectedItem,
                    feature === "Schedule" && classes.selectedItem
                  )}
                >
                  <ListItemIcon>
                    <ScheduleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Schedule" />
                </ListItem>
              )}
            />
            <Route
              key={3}
              render={({ history }) => (
                <ListItem
                  button
                  onClick={() => {
                    history.push("/myaccount/hours");
                    isMobile && toggleSideMenu();
                  }}
                  className={classNames(
                    feature !== "Hours" && classes.unselectedItem,
                    feature === "Hours" && classes.selectedItem
                  )}
                >
                  <ListItemIcon>
                    <HoursIcon />
                  </ListItemIcon>
                  <ListItemText primary="Hours" />
                </ListItem>
              )}
            />
            <Route
              key={4}
              render={({ history }) => (
                <ListItem
                  button
                  onClick={() => {
                    history.push("/myaccount/results");
                    isMobile && toggleSideMenu();
                  }}
                  className={classNames(
                    feature !== "Results" && classes.unselectedItem,
                    feature === "Results" && classes.selectedItem
                  )}
                >
                  <ListItemIcon>
                    <ResultsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Results" />
                </ListItem>
              )}
            />
            {(role === "admin" ||
              role === "coach" ||
              (role === "manager" && permissions.managers.wages.canView)) && (
              <Route
                key={5}
                render={({ history }) => (
                  <ListItem
                    button
                    onClick={() => {
                      history.push("/myaccount/wages");
                      isMobile && toggleSideMenu();
                    }}
                    className={classNames(
                      feature !== "Wages" && classes.unselectedItem,
                      feature === "Wages" && classes.selectedItem
                    )}
                  >
                    <ListItemIcon>
                      <WagesIcon />
                    </ListItemIcon>
                    <ListItemText primary="Wages" />
                  </ListItem>
                )}
              />
            )}
            <Route
              key={6}
              render={({ history }) => (
                <ListItem
                  button
                  onClick={() => {
                    history.push("/myaccount/people");
                    isMobile && toggleSideMenu();
                  }}
                  className={classNames(
                    feature !== "People" && classes.unselectedItem,
                    feature === "People" && classes.selectedItem
                  )}
                >
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary="People" />
                </ListItem>
              )}
            />
            <Route
              key={7}
              render={({ history }) => (
                <ListItem
                  button
                  onClick={() => {
                    history.push("/myaccount/teams");
                    isMobile && toggleSideMenu();
                  }}
                  className={classNames(
                    feature !== "Teams" && classes.unselectedItem,
                    feature === "Teams" && classes.selectedItem
                  )}
                >
                  <ListItemIcon>
                    <TeamsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Teams" />
                </ListItem>
              )}
            />
            <Route
              key={8}
              render={({ history }) => (
                <ListItem
                  button
                  onClick={() => {
                    history.push("/myaccount/settings");
                    isMobile && toggleSideMenu();
                  }}
                  className={classNames(
                    feature !== "Settings" && classes.unselectedItem,
                    feature === "Settings" && classes.selectedItem
                  )}
                >
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItem>
              )}
            />
          </List>
          <Typography type="body1" component="p" className={classes.version}>
            {`v${versionNumber}`}
          </Typography>
        </div>
      </Drawer>
    );
  }
}

export default withStyles(styles)(SideMenu);
