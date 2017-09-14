import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import classNames from "classnames";
import { Route } from "react-router-dom";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import ChevronLeftIcon from "material-ui-icons/ChevronLeft";
import DashboardIcon from "material-ui-icons/Dashboard";
import ProductsIcon from "material-ui-icons/ShoppingBasket";
import BusinessInfoIcon from "material-ui-icons/BusinessCenter";
import ContactInfoIcon from "material-ui-icons/Person";
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
    backgroundSize: `${drawerWidth * 0.6}px 48px`,
    width: drawerWidth * 0.6,
    height: 48
  }
});

class SideMenu extends Component {
  render() {
    const { classes, isOpen, isMobile } = this.props;
    const { toggleSideMenu, updateAppBarTitle } = this.props.actions;

    const sideMenuItems = [
      <Route
        key={1}
        render={({ history }) => (
          <ListItem
            button
            onClick={() => {
              history.push("/customer/dashboard");
              updateAppBarTitle("Dashboard");
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
              history.push("/customer/products");
              updateAppBarTitle("Products");
            }}
          >
            <ListItemIcon>
              <ProductsIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>
        )}
      />,
      <Route
        key={3}
        render={({ history }) => (
          <ListItem
            button
            onClick={() => {
              history.push("/customer/business-info");
              updateAppBarTitle("Business Info");
            }}
          >
            <ListItemIcon>
              <BusinessInfoIcon />
            </ListItemIcon>
            <ListItemText primary="Business Info" />
          </ListItem>
        )}
      />,
      <Route
        key={4}
        render={({ history }) => (
          <ListItem
            button
            onClick={() => {
              history.push("/customer/contact-info");
              updateAppBarTitle("Contact Info");
            }}
          >
            <ListItemIcon>
              <ContactInfoIcon />
            </ListItemIcon>
            <ListItemText primary="Contact Info" />
          </ListItem>
        )}
      />
    ];

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
          <List>{sideMenuItems}</List>
        </div>
      </Drawer>
    );
  }
}

export default withStyles(styles)(SideMenu);
