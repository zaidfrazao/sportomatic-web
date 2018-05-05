import React, { Component } from "react";
import _ from "lodash";
import { grey } from "material-ui/colors";
import { withStyles } from "material-ui/styles";
import CommunityInfo from "./components/CommunityInfo";
import emblem from "./images/emblem.png";

const styles = theme => ({
  menu: {
    padding: "12px 0",
    flex: 1,
    "@media (max-width: 600px)": {
      display: "flex",
      flexWrap: "wrap"
    }
  },
  menuItem: {
    transition: "0.25s",
    fontSize: 14,
    padding: "18px 0",
    margin: "8px 18px",
    borderRadius: 8,
    cursor: "pointer",
    "@media (max-width: 600px)": {
      textAlign: "center",
      width: "calc(50% - 24px)",
      margin: 8,
      padding: "14px 0"
    },
    "&:hover": {
      backgroundColor: grey[100]
    }
  },
  menuItemIcon: {
    margin: "0 12px 0 24px",
    width: 25,
    height: 25,
    "@media (max-width: 600px)": {
      margin: "0 12px 0 0"
    }
  },
  menuItemSelected: {
    transition: "0.25s",
    borderRadius: 8,
    padding: "18px 0",
    margin: "8px 18px",
    fontSize: 16,
    position: "relative",
    fontWeight: "bold",
    cursor: "pointer",
    backgroundColor: grey[200],
    "@media (max-width: 600px)": {
      textAlign: "center",
      width: "calc(50% - 24px)",
      margin: 8,
      padding: "14px 0"
    },
    "&:hover": {
      backgroundColor: grey[200]
    }
  },
  menuItemText: {
    color: grey[800]
  },
  wrapperDesktop: {
    backgroundColor: "white",
    width: 240,
    height: "calc(100vh - 64px)"
  },
  wrapperMobileClosed: {
    transition: "0.5s",
    backgroundColor: "white",
    position: "absolute",
    zIndex: 1000,
    left: "calc(100% * -1)",
    width: "100%",
    height: "calc(100vh - 64px)"
  },
  wrapperMobileOpen: {
    transition: "0.5s",
    backgroundColor: "white",
    left: 0,
    zIndex: 1000,
    position: "absolute",
    width: "100%",
    height: "calc(100vh - 64px)"
  }
});

type Props = {
  classes: {
    menu: string,
    menuItem: string,
    menuItemIcon: string,
    menuItemSelected: string,
    wrapper: string
  },
  actions: {
    changeSelected: (key: string) => {}
  },
  items: ArrayOf<{
    key: string,
    label: string,
    icon: string
  }>
};

class SideMenu extends Component<Props> {
  static defaultProps = {
    actions: {
      changeSelected: key => console.log(`Selected item changed to ${key}`)
    }
  };

  getMenuItems() {
    const { classes, selected, items, isTablet } = this.props;
    const { changeSelected, toggleSideNav } = this.props.actions;

    return _.toPairs(items).map(([key, item]) => (
      <div
        key={`side-menu-item-${key}`}
        className={
          selected === key ? classes.menuItemSelected : classes.menuItem
        }
        onClick={() => {
          changeSelected(key);
          isTablet && toggleSideNav();
        }}
      >
        <span className={classes.menuItemText}>
          <span className={classes.menuItemIcon}>
            <i className={item.icon} />
          </span>
          {item.label}
        </span>
        {selected === key && !isTablet && <span className={classes.arrow} />}
      </div>
    ));
  }

  render() {
    const { classes, isSideMenuOpen, isTablet } = this.props;
    const menuItems = this.getMenuItems();

    let wrapperStyle = classes.wrapperDesktop;
    if (isTablet) {
      if (isSideMenuOpen) {
        wrapperStyle = classes.wrapperMobileOpen;
      } else {
        wrapperStyle = classes.wrapperMobileClosed;
      }
    }

    return (
      <div className={wrapperStyle}>
        <CommunityInfo emblem={emblem} name="Northcliff High School" />
        <div className={classes.menu}>{menuItems}</div>
      </div>
    );
  }
}

export default withStyles(styles)(SideMenu);
