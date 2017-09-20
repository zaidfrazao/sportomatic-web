import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import classNames from "classnames";
import { Route } from "react-router-dom";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import ChevronLeftIcon from "material-ui-icons/ChevronLeft";
import DashboardIcon from "material-ui-icons/Dashboard";
import ScheduleIcon from "material-ui-icons/Event";
import HoursIcon from "material-ui-icons/Alarm";
import WagesIcon from "material-ui-icons/AttachMoney";
import PeopleIcon from "material-ui-icons/Person";
import TeamsIcon from "material-ui-icons/People";
import ReportsIcon from "material-ui-icons/Assignment";
import Drawer from "material-ui/Drawer";
import Divider from "material-ui/Divider";
import IconButton from "material-ui/IconButton";
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
    width: drawerWidth
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
  logo: {
    backgroundImage: `url(${logo})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: 160,
    height: 30
  }
});

class SideMenu extends Component {
  renderMenu() {
    const { accountType, isMobile } = this.props;
    const { toggleSideMenu } = this.props.actions;
    switch (accountType) {
      case "coach":
        return [
          <Route
            key={1}
            render={({ history }) => (
              <ListItem
                button
                onClick={() => {
                  history.push("/coach/dashboard");
                  isMobile && toggleSideMenu();
                }}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            )}
          />,
          <Route
            key={2}
            render={({ history }) => (
              <ListItem
                button
                onClick={() => {
                  history.push("/coach/schedule");
                  isMobile && toggleSideMenu();
                }}
              >
                <ListItemIcon>
                  <ScheduleIcon />
                </ListItemIcon>
                <ListItemText primary="Schedule" />
              </ListItem>
            )}
          />,
          <Route
            key={3}
            render={({ history }) => (
              <ListItem
                button
                onClick={() => {
                  history.push("/coach/hours");
                  isMobile && toggleSideMenu();
                }}
              >
                <ListItemIcon>
                  <HoursIcon />
                </ListItemIcon>
                <ListItemText primary="Hours" />
              </ListItem>
            )}
          />,
          <Route
            key={4}
            render={({ history }) => (
              <ListItem
                button
                onClick={() => {
                  history.push("/coach/wages");
                  isMobile && toggleSideMenu();
                }}
              >
                <ListItemIcon>
                  <WagesIcon />
                </ListItemIcon>
                <ListItemText primary="Wages" />
              </ListItem>
            )}
          />,
          <Route
            key={5}
            render={({ history }) => (
              <ListItem
                button
                onClick={() => {
                  history.push("/coach/people");
                  isMobile && toggleSideMenu();
                }}
              >
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="People" />
              </ListItem>
            )}
          />,
          <Route
            key={6}
            render={({ history }) => (
              <ListItem
                button
                onClick={() => {
                  history.push("/coach/teams");
                  isMobile && toggleSideMenu();
                }}
              >
                <ListItemIcon>
                  <TeamsIcon />
                </ListItemIcon>
                <ListItemText primary="Teams" />
              </ListItem>
            )}
          />
        ];
      case "manager":
        return [
          <Route
            key={1}
            render={({ history }) => (
              <ListItem
                button
                onClick={() => {
                  history.push("/manager/dashboard");
                  isMobile && toggleSideMenu();
                }}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            )}
          />,
          <Route
            key={2}
            render={({ history }) => (
              <ListItem
                button
                onClick={() => {
                  history.push("/manager/schedule");
                  isMobile && toggleSideMenu();
                }}
              >
                <ListItemIcon>
                  <ScheduleIcon />
                </ListItemIcon>
                <ListItemText primary="Schedule" />
              </ListItem>
            )}
          />,
          <Route
            key={3}
            render={({ history }) => (
              <ListItem
                button
                onClick={() => {
                  history.push("/manager/hours");
                  isMobile && toggleSideMenu();
                }}
              >
                <ListItemIcon>
                  <HoursIcon />
                </ListItemIcon>
                <ListItemText primary="Hours" />
              </ListItem>
            )}
          />,
          <Route
            key={4}
            render={({ history }) => (
              <ListItem
                button
                onClick={() => {
                  history.push("/manager/people");
                  isMobile && toggleSideMenu();
                }}
              >
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="People" />
              </ListItem>
            )}
          />,
          <Route
            key={5}
            render={({ history }) => (
              <ListItem
                button
                onClick={() => {
                  history.push("/manager/teams");
                  isMobile && toggleSideMenu();
                }}
              >
                <ListItemIcon>
                  <TeamsIcon />
                </ListItemIcon>
                <ListItemText primary="Teams" />
              </ListItem>
            )}
          />
        ];
      case "institution":
        return [
          <Route
            key={1}
            render={({ history }) => (
              <ListItem
                button
                onClick={() => {
                  history.push("/institution/dashboard");
                  isMobile && toggleSideMenu();
                }}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            )}
          />,
          <Route
            key={2}
            render={({ history }) => (
              <ListItem
                button
                onClick={() => {
                  history.push("/institution/schedule");
                  isMobile && toggleSideMenu();
                }}
              >
                <ListItemIcon>
                  <ScheduleIcon />
                </ListItemIcon>
                <ListItemText primary="Schedule" />
              </ListItem>
            )}
          />,
          <Route
            key={3}
            render={({ history }) => (
              <ListItem
                button
                onClick={() => {
                  history.push("/institution/hours");
                  isMobile && toggleSideMenu();
                }}
              >
                <ListItemIcon>
                  <HoursIcon />
                </ListItemIcon>
                <ListItemText primary="Hours" />
              </ListItem>
            )}
          />,
          <Route
            key={4}
            render={({ history }) => (
              <ListItem
                button
                onClick={() => {
                  history.push("/institution/wages");
                  isMobile && toggleSideMenu();
                }}
              >
                <ListItemIcon>
                  <WagesIcon />
                </ListItemIcon>
                <ListItemText primary="Wages" />
              </ListItem>
            )}
          />,
          <Route
            key={5}
            render={({ history }) => (
              <ListItem
                button
                onClick={() => {
                  history.push("/institution/people");
                  isMobile && toggleSideMenu();
                }}
              >
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="People" />
              </ListItem>
            )}
          />,
          <Route
            key={6}
            render={({ history }) => (
              <ListItem
                button
                onClick={() => {
                  history.push("/institution/teams");
                  isMobile && toggleSideMenu();
                }}
              >
                <ListItemIcon>
                  <TeamsIcon />
                </ListItemIcon>
                <ListItemText primary="Teams" />
              </ListItem>
            )}
          />,
          <Route
            key={7}
            render={({ history }) => (
              <ListItem
                button
                onClick={() => {
                  history.push("/institution/reports");
                  isMobile && toggleSideMenu();
                }}
              >
                <ListItemIcon>
                  <ReportsIcon />
                </ListItemIcon>
                <ListItemText primary="Reports" />
              </ListItem>
            )}
          />
        ];
      default:
        console.log("An error occured.");
        break;
    }
  }

  render() {
    const { classes, isOpen, isMobile } = this.props;
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
          <List>{this.renderMenu()}</List>
        </div>
      </Drawer>
    );
  }
}

export default withStyles(styles)(SideMenu);
