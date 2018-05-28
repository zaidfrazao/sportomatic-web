import React, { Component } from "react";
import { grey, lightBlue } from "../../../../utils/colours";
import injectStyles from "react-jss";
import SportsToolbar from "./components/SportsToolbar";
import logo from "./images/logo.png";

const mobileBreakpoint = 800;

const styles = theme => ({
  content: {
    height: 64,
    display: "flex",
    alignItems: "center"
  },
  logo: {
    backgroundImage: `url(${logo})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: 160,
    height: 30,
    margin: "0 40px",
    [`@media (max-width: ${mobileBreakpoint}px)`]: {
      display: "none"
    }
  },
  logOutButton: {
    borderLeft: `2px solid ${grey[300]}`,
    width: 80,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    [`@media (max-width: ${mobileBreakpoint}px)`]: {
      display: "none"
    }
  },
  logOutIcon: {
    transition: "0.25s",
    fontSize: 22,
    color: grey[900],
    cursor: "pointer",
    "&:hover": {
      color: lightBlue[500]
    }
  },
  menuIconClosed: {
    fontSize: 22,
    transition: "0.25s",
    color: grey[900]
  },
  menuIconOpen: {
    fontSize: 26,
    transition: "0.25s",
    color: lightBlue[500]
  },
  mobileMenuButton: {
    borderLeft: `2px solid ${grey[300]}`,
    width: 80,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    [`@media (min-width: ${mobileBreakpoint}px)`]: {
      display: "none"
    }
  },
  sportsToolbarWrapper: {
    width: "calc(100% - 322px)",
    height: "100%",
    [`@media (max-width: ${mobileBreakpoint}px)`]: {
      width: "calc(100% - 84px)"
    }
  },
  wrapper: {
    backgroundColor: "white"
  }
});

type Props = {
  actions: {
    changeSelectedSport: (key: string) => {},
    toggleSideNav: () => {}
  },
  classes: {
    appBar: string,
    appBarContent: string,
    flex: string,
    logo: string,
    signUpButtonWrapper: string
  }
};

class AppBar extends Component<Props> {
  static defaultProps = {
    actions: {
      changeSportSelected: key => console.log(`Sport changed to ${key}`),
      toggleSideNav: () => console.log("Side nav toggled")
    }
  };

  render() {
    const { classes, selected, sports, isTablet, isSideMenuOpen } = this.props;
    const { changeSportSelected, toggleSideNav, logOut } = this.props.actions;

    let menuIconStyle = classes.menuIconClosed;
    if (isSideMenuOpen) {
      menuIconStyle = classes.menuIconOpen;
    }

    return (
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <div className={classes.logo} />
          <div className={classes.sportsToolbarWrapper}>
            <SportsToolbar
              isTablet={isTablet}
              isSideMenuOpen={isSideMenuOpen}
              sports={sports}
              selected={selected}
              actions={{
                changeSelected: key => changeSportSelected(key),
                toggleSideNav: () => toggleSideNav()
              }}
            />
          </div>
          <div className={classes.logOutButton} onClick={() => logOut()}>
            <span className={classes.logOutIcon}>
              <i className="fas fa-sign-out-alt" />
            </span>
          </div>
          <div
            className={classes.mobileMenuButton}
            onClick={() => toggleSideNav()}
          >
            <span className={menuIconStyle}>
              <i className="fas fa-bars" />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default injectStyles(styles)(AppBar);
