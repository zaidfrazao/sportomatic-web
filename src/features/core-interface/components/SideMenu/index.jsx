import React, { Component } from "react";
import _ from "lodash";
import injectStyles from "react-jss";
import Button from "../../../../components/Button";
import { common, grey, lightBlue } from "../../../../utils/colours";
import CommunityInfo from "./components/CommunityInfo";
import defaultEmblem from "./images/default-emblem.jpg";

const mobileBreakpoint = 800;

const styles = {
  content: {
    flexGrow: 1,
    overflow: "auto"
  },
  logOutButtonWrapper: {
    margin: 24,
    textAlign: "center",
    [`@media (min-width: ${mobileBreakpoint}px)`]: {
      display: "none"
    }
  },
  logOutIcon: {
    marginRight: 12
  },
  menu: {
    padding: "12px 0",
    flex: 1
  },
  menuItem: {
    transition: "0.25s",
    fontSize: 14,
    padding: "18px 0",
    margin: "12px 24px",
    borderRadius: 16,
    cursor: "pointer",
    backgroundColor: grey[100],
    [`@media (max-width: ${mobileBreakpoint}px)`]: {
      textAlign: "center"
    },
    "&:hover": {
      backgroundColor: grey[200]
    }
  },
  menuItemIcon: {
    margin: "0 12px 0 24px",
    width: 25,
    height: 25,
    [`@media (max-width: ${mobileBreakpoint}px)`]: {
      margin: "0 12px 0 0"
    }
  },
  menuItemInactive: {
    fontSize: 14,
    padding: "18px 0",
    margin: "12px 24px",
    borderRadius: 16,
    cursor: "not-allowed",
    backgroundColor: grey[200],
    [`@media (max-width: ${mobileBreakpoint}px)`]: {
      textAlign: "center"
    }
  },
  menuItemSelected: {
    transition: "0.25s",
    borderRadius: 16,
    padding: "18px 0",
    margin: "12px 24px",
    fontSize: 16,
    position: "relative",
    fontWeight: "bold",
    cursor: "pointer",
    backgroundColor: lightBlue[800],
    [`@media (max-width: ${mobileBreakpoint}px)`]: {
      textAlign: "center"
    },
    "&:hover": {
      backgroundColor: lightBlue[700]
    }
  },
  menuItemText: {
    color: common["black"]
  },
  menuItemTextInactive: {
    color: grey[400]
  },
  menuItemTextSelected: {
    color: common["white"]
  },
  versionNumber: {
    fontSize: 12,
    color: grey[300],
    width: "100%",
    textAlign: "center",
    marginBottom: 24
  },
  wrapperDesktop: {
    backgroundColor: "white",
    width: 240,
    height: "calc(100vh - 64px)",
    borderRight: `2px solid ${grey[300]}`
  },
  wrapperMobileClosed: {
    zIndex: 2,
    transition: "0.5s",
    backgroundColor: "white",
    position: "absolute",
    left: "calc(100% * -1)",
    width: "100%",
    height: "calc(100vh - 64px)"
  },
  wrapperMobileOpen: {
    zIndex: 2,
    transition: "0.5s",
    backgroundColor: "white",
    left: 0,
    position: "absolute",
    width: "100%",
    height: "calc(100vh - 64px)",
    display: "flex",
    flexDirection: "column"
  }
};

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
  communityName: string,
  emblem: string,
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
    },
    communityName: "Example Community",
    emblem: defaultEmblem
  };

  getMenuItems() {
    const { classes, selected, items, isTablet } = this.props;
    const { changeSelected, toggleSideNav } = this.props.actions;

    return _.toPairs(items).map(([key, item]) => {
      if (key === "reports" || key === "settings") {
        return (
          <div
            key={`side-menu-item-${key}`}
            className={classes.menuItemInactive}
          >
            <span className={classes.menuItemTextInactive}>
              <span className={classes.menuItemIcon}>
                <i className={item.icon} />
              </span>
              {item.label}
            </span>
          </div>
        );
      } else {
        return (
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
            <span
              className={
                selected === key
                  ? classes.menuItemTextSelected
                  : classes.menuItemText
              }
            >
              <span className={classes.menuItemIcon}>
                <i className={item.icon} />
              </span>
              {item.label}
            </span>
          </div>
        );
      }
    });
  }

  render() {
    const {
      classes,
      isSideMenuOpen,
      isTablet,
      communityName,
      emblem,
      versionNumber
    } = this.props;
    const { logOut } = this.props.actions;
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
        <CommunityInfo
          emblem={emblem === "" ? defaultEmblem : emblem}
          name={communityName}
          logOut={() => logOut()}
        />
        <div className={classes.content}>
          <div className={classes.menu}>{menuItems}</div>
          <div className={classes.logOutButtonWrapper}>
            <Button colour="primary" fullWidth handleClick={() => logOut()}>
              <i className={`fas fa-sign-out-alt ${classes.logOutIcon}`} />Log
              out
            </Button>
          </div>
          <div className={classes.versionNumber}>{`v${versionNumber}`}</div>
        </div>
      </div>
    );
  }
}

export default injectStyles(styles)(SideMenu);
