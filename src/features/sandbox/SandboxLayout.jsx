import React, { Component } from "react";
import { grey } from "material-ui/colors";
import { withStyles } from "material-ui/styles";
import AppBar from "./components/AppBar";
import SideMenu from "./components/SideMenu";
import rugbyIcon from "./images/rugby.png";
import soccerIcon from "./images/soccer.png";
import tennisIcon from "./images/tennis-ball.png";

const styles = theme => ({
  breadcrumbText: {
    fontSize: 24,
    backgroundColor: "white",
    borderRadius: 12,
    margin: 0,
    padding: "4px 18px",
    textAlign: "center"
  },
  content: {
    backgroundColor: grey[200],
    zIndex: 20,
    padding: 24,
    flex: 1
  },
  coreWrapper: {
    display: "flex",
    minHeight: "calc(100vh - 64px)"
  },
  sectionIcon: {
    marginRight: 8
  },
  wrapper: {
    backgroundColor: grey[200]
  }
});

type Props = {
  classes: {
    wrapper: string
  }
};

type State = {
  windowWidth: number
};

class SandboxLayout extends Component<Props, State> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      windowWidth: 0
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ windowWidth: window.innerWidth });
  }

  getSideMenuItems() {
    return {
      overview: {
        label: "Overview",
        icon: "fas fa-newspaper"
      },
      schedule: {
        label: "Events",
        icon: "fas fa-calendar"
      },
      people: {
        label: "People",
        icon: "fas fa-user"
      },
      teams: {
        label: "Teams",
        icon: "fas fa-users"
      },
      reports: {
        label: "Reports",
        icon: "fas fa-clipboard"
      },
      settings: {
        label: "Settings",
        icon: "fas fa-cog"
      }
    };
  }

  getSportsItems() {
    return {
      all: {
        label: "All",
        icon: "N/A"
      },
      rugby: {
        label: "Rugby",
        icon: rugbyIcon
      },
      soccer: {
        label: "Soccer",
        icon: soccerIcon
      },
      tennis: {
        label: "Tennis",
        icon: tennisIcon
      }
    };
  }

  render() {
    const { classes } = this.props;
    const {
      sideMenuItemSelected,
      sportSelected,
      isSideMenuOpen
    } = this.props.uiConfig;
    const { updateSideMenu, updateSport, toggleSideNav } = this.props.actions;
    const { windowWidth } = this.state;
    const sideMenuItems = this.getSideMenuItems();
    const sportsItems = this.getSportsItems();

    // const isMobile = windowWidth <= 600;
    const isTablet = windowWidth <= 768;

    return (
      <div className={classes.wrapper}>
        <AppBar
          selected={sportSelected}
          sports={sportsItems}
          isTablet={isTablet}
          isSideMenuOpen={isSideMenuOpen}
          actions={{
            changeSportSelected: key => updateSport(key),
            toggleSideNav: () => toggleSideNav()
          }}
        />
        <div className={classes.coreWrapper}>
          <SideMenu
            selected={sideMenuItemSelected}
            items={sideMenuItems}
            isTablet={isTablet}
            isSideMenuOpen={isSideMenuOpen}
            actions={{
              changeSelected: key => updateSideMenu(key),
              toggleSideNav: () => toggleSideNav()
            }}
          />
          <div className={classes.content}>
            {sportSelected === "all" ? (
              <h1 className={classes.breadcrumbText}>
                <i
                  className={`${sideMenuItems[sideMenuItemSelected]
                    .icon} ${classes.sectionIcon}`}
                />{" "}
                {sideMenuItems[sideMenuItemSelected].label}
              </h1>
            ) : (
              <h1 className={classes.breadcrumbText}>
                <i
                  className={`${sideMenuItems[sideMenuItemSelected]
                    .icon} ${classes.sectionIcon}`}
                />{" "}
                {`${sportsItems[sportSelected].label} ${sideMenuItems[
                  sideMenuItemSelected
                ].label}`}
              </h1>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SandboxLayout);
