import React, { Component } from "react";
import _ from "lodash";
import { grey } from "material-ui/colors";
import { withStyles } from "material-ui/styles";
import CommunityInfo from "./components/CommunityInfo";
import emblem from "./images/emblem.png";

const styles = theme => ({
  arrow: {
    position: "absolute",
    content: "",
    top: "calc(50% - 14px)",
    left: "calc(100% - 4px)",
    width: 0,
    height: 0,
    border: "14px solid transparent",
    borderColor: `transparent ${grey[200]} transparent transparent`,
    "@media (max-width: 768px)": {
      display: "none"
    }
  },
  menu: {
    padding: 0,
    flex: 1,
    "@media (max-width: 600px)": {
      display: "flex",
      flexWrap: "wrap"
    }
  },
  menuItem: {
    transition: "0.25s",
    fontSize: 16,
    padding: "24px 0",
    margin: "0 48px",
    cursor: "pointer",
    borderTop: `1px solid ${grey[100]}`,
    "@media (max-width: 600px)": {
      border: `1px solid ${grey[100]}`,
      textAlign: "center",
      width: "calc(50% - 2px)",
      margin: 0,
      padding: "28px 0"
    },
    "&:hover": {
      fontWeight: "bold",
      color: grey[300]
    }
  },
  menuItemIcon: {
    textAlign: "center",
    marginRight: 14,
    width: 25,
    height: 25
  },
  menuItemSelected: {
    borderTop: `1px solid ${grey[100]}`,
    transition: "0.25s",
    padding: "24px 0",
    margin: "0 24px",
    fontSize: 18,
    position: "relative",
    fontWeight: "bold",
    "@media (max-width: 600px)": {
      border: `1px solid ${grey[100]}`,
      textAlign: "center",
      width: "calc(50% - 2px)",
      margin: 0,
      padding: "28px 0"
    }
  },
  menuItemText: {
    display: "flex",
    alignItems: "center",
    color: grey[800],
    justifyContent: "center"
  },
  wrapperDesktop: {
    overflowY: "auto",
    backgroundColor: "white",
    zIndex: 1000,
    width: 320,
    height: "calc(100vh - 64px)"
  },
  wrapperMobileClosed: {
    transition: "0.5s",
    overflowY: "auto",
    backgroundColor: "white",
    zIndex: 1000,
    position: "fixed",
    width: "100%",
    height: 0
  },
  wrapperMobileOpen: {
    transition: "0.5s",
    overflowY: "auto",
    backgroundColor: "white",
    zIndex: 1000,
    position: "fixed",
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
        <CommunityInfo emblem={emblem} name="Weltevreden Park Primary School" />
        <div className={classes.menu}>{menuItems}</div>
      </div>
    );
  }
}

export default withStyles(styles)(SideMenu);
