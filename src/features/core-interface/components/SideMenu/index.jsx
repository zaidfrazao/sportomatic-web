import React, { Component } from "react";
import _ from "lodash";
import { common, grey, lightBlue } from "../../../../utils/colours";
import injectStyles from "react-jss";
import CommunityInfo from "./components/CommunityInfo";
import defaultEmblem from "./images/default-emblem.jpg";

const mobileBreakpoint = 800;

const styles = {
  menu: {
    padding: "12px 0",
    flex: 1
  },
  menuItem: {
    transition: "0.25s",
    fontSize: 14,
    padding: "18px 0",
    margin: "16px 18px",
    borderRadius: 16,
    cursor: "pointer",
    backgroundColor: grey[100],
    [`@media (max-width: ${mobileBreakpoint}px)`]: {
      textAlign: "center",
      margin: "20px 18px",
      padding: "22px 0",
      fontSize: 20
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
    margin: "16px 18px",
    borderRadius: 16,
    cursor: "not-allowed",
    backgroundColor: grey[200],
    [`@media (max-width: ${mobileBreakpoint}px)`]: {
      textAlign: "center",
      margin: "20px 18px",
      padding: "22px 0",
      fontSize: 20
    }
  },
  menuItemSelected: {
    transition: "0.25s",
    borderRadius: 16,
    padding: "18px 0",
    margin: "16px 18px",
    fontSize: 16,
    position: "relative",
    fontWeight: "bold",
    cursor: "pointer",
    backgroundColor: lightBlue[800],
    [`@media (max-width: ${mobileBreakpoint}px)`]: {
      textAlign: "center",
      margin: "20px 18px",
      padding: "22px 0",
      fontSize: 20
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
  wrapperDesktop: {
    backgroundColor: "white",
    width: 240,
    height: "calc(100vh - 64px)",
    overflow: "auto",
    borderRight: `2px solid ${grey[300]}`
  },
  wrapperMobileClosed: {
    transition: "0.5s",
    backgroundColor: "white",
    position: "absolute",
    left: "calc(100% * -1)",
    width: "100%",
    height: "calc(100vh - 64px)",
    overflow: "auto"
  },
  wrapperMobileOpen: {
    transition: "0.5s",
    backgroundColor: "white",
    left: 0,
    position: "absolute",
    width: "100%",
    height: "calc(100vh - 64px)",
    overflow: "auto"
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
      selectedRole,
      availableRoles,
      meAllFilter
    } = this.props;
    const {
      switchRoles,
      toggleSideNav,
      logOut,
      changeMeAllFilter,
      switchCommunities
    } = this.props.actions;
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
          selectedRole={selectedRole}
          switchCommunities={switchCommunities}
          switchRoles={newRole => {
            toggleSideNav();
            switchRoles(newRole);
          }}
          changeMeAllFilter={newFilter => {
            toggleSideNav();
            changeMeAllFilter(newFilter);
          }}
          meAllFilter={meAllFilter}
          logOut={() => logOut()}
          availableRoles={availableRoles}
        />
        <div className={classes.menu}>{menuItems}</div>
      </div>
    );
  }
}

export default injectStyles(styles)(SideMenu);
