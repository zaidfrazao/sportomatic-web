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
    left: "calc(100% - 28px)",
    width: 0,
    height: 0,
    border: "14px solid transparent",
    borderColor: `transparent ${grey[200]} transparent transparent`,
    "@media (max-width: 800px)": {
      display: "none"
    }
  },
  menu: {
    padding: 0
  },
  menuItem: {
    backgroundColor: "white",
    fontSize: 16,
    padding: "20px 42px",
    cursor: "pointer",
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
    padding: "24px 48px",
    fontSize: 18,
    position: "relative",
    fontWeight: "bold"
  },
  menuItemText: {
    display: "flex",
    alignItems: "center",
    color: grey[800]
  },
  wrapperDesktop: {
    overflowY: "auto",
    backgroundColor: "white",
    zIndex: 1000,
    width: 240,
    minHeight: "calc(100vh - 80px)"
  },
  wrapperMobileClosed: {
    transition: "0.5s",
    overflowY: "auto",
    backgroundColor: "white",
    zIndex: 1000,
    position: "fixed",
    width: 0,
    height: "100%"
  },
  wrapperMobileOpen: {
    transition: "0.5s",
    overflowY: "auto",
    backgroundColor: "white",
    zIndex: 1000,
    position: "fixed",
    width: "100%",
    height: "100%"
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
    const { classes, selected, items, isMobile } = this.props;
    const { changeSelected, toggleSideNav } = this.props.actions;

    return _.toPairs(items).map(([key, item]) => (
      <div
        key={`side-menu-item-${key}`}
        className={
          selected === key ? classes.menuItemSelected : classes.menuItem
        }
        onClick={() => {
          changeSelected(key);
          isMobile && toggleSideNav();
        }}
      >
        <span className={classes.menuItemText}>
          <span className={classes.menuItemIcon}>
            <i className={item.icon} />
          </span>
          {item.label}
        </span>
        {selected === key && !isMobile && <span className={classes.arrow} />}
      </div>
    ));
  }

  render() {
    const { classes, isSideMenuOpen, isMobile } = this.props;
    const menuItems = this.getMenuItems();

    let wrapperStyle = classes.wrapperDesktop;
    if (isMobile) {
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
