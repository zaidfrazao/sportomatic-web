import React, { Component } from "react";
import { grey } from "material-ui/colors";
import { withStyles } from "material-ui/styles";
import CommunityInfo from "./components/CommunityInfo";
import emblem from "./images/emblem.png";

const styles = theme => ({
  menu: {
    padding: 0
  },
  menuItem: {
    backgroundColor: "white",
    fontSize: 18,
    padding: "24px 48px",
    borderRadius: "14px 0 0 14px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: grey[100],
      marginLeft: 12
    }
  },
  menuItemIcon: {
    textAlign: "center",
    marginRight: 14,
    width: 25,
    height: 25
  },
  menuItemSelected: {
    padding: "24px 48px",
    marginLeft: 18,
    borderRadius: "14px 0 0 14px",
    fontSize: 18,
    backgroundColor: grey[200]
  },
  menuItemText: {
    display: "flex",
    alignItems: "center",
    color: grey[800]
  },
  wrapper: {
    width: 240,
    overflow: "auto",
    minHeight: "calc(100vh - 84px)",
    backgroundColor: "white"
  }
});

type Props = {
  classes: {
    menu: string,
    menuItem: string,
    menuItemIcon: string,
    menuItemSelected: string,
    wrapper: string
  }
};

class SideMenu extends Component<Props> {
  getMenuItems() {
    const { classes } = this.props;
    const menuItemSelected = "schedule";

    const items = [
      {
        key: "overview",
        label: "Overview",
        icon: "fas fa-newspaper"
      },
      {
        key: "teams",
        label: "Teams",
        icon: "fas fa-users"
      },
      {
        key: "schedule",
        label: "Schedule",
        icon: "fas fa-calendar"
      },
      {
        key: "results",
        label: "Results",
        icon: "fas fa-list-ol"
      },
      {
        key: "hours",
        label: "Hours",
        icon: "fas fa-clock"
      },
      {
        key: "wages",
        label: "Wages",
        icon: "fas fa-dollar-sign"
      },
      {
        key: "people",
        label: "People",
        icon: "fas fa-user"
      },
      {
        key: "settings",
        label: "Settings",
        icon: "fas fa-cog"
      }
    ];

    return items.map(item => (
      <div
        key={`side-menu-item-${item.key}`}
        className={
          menuItemSelected === item.key
            ? classes.menuItemSelected
            : classes.menuItem
        }
      >
        <span className={classes.menuItemText}>
          <span className={classes.menuItemIcon}>
            <i className={item.icon} />
          </span>
          {item.label}
        </span>
      </div>
    ));
  }

  render() {
    const { classes } = this.props;

    const menuItems = this.getMenuItems();

    return (
      <div className={classes.wrapper}>
        <CommunityInfo
          emblem={emblem}
          name="Northcliff High School"
          numberOfMembers={1563}
        />
        <div className={classes.menu}>{menuItems}</div>
      </div>
    );
  }
}

export default withStyles(styles)(SideMenu);
