import React, { Component } from "react";
import { grey, lightBlue } from "material-ui/colors";
import { withStyles } from "material-ui/styles";
import SportsToolbar from "./components/SportsToolbar";
import logo from "./images/logo.png";

const styles = theme => ({
  appBar: {
    backgroundColor: "white"
  },
  appBarContent: {
    height: 80,
    display: "flex",
    alignItems: "center"
  },
  logo: {
    display: "block",
    backgroundImage: `url(${logo})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: 160,
    height: 30,
    margin: "0 50px",
    "@media (max-width: 600px)": {
      display: "none"
    }
  },
  menuIconClosed: {
    fontSize: 24,
    transition: "0.5s",
    color: grey[900]
  },
  menuIconOpen: {
    fontSize: 28,
    transition: "0.5s",
    color: lightBlue[500]
  },
  mobileMenuButton: {
    boxShadow: `0 0 20px ${grey[500]}`,
    zIndex: 10,
    width: 80,
    height: "100%",
    borderLeft: `1px solid ${grey[300]}`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "@media (min-width: 600px)": {
      display: "none"
    }
  },
  sportsToolbarWrapper: {
    flexGrow: 2,
    height: "100%",
    "@media (max-width: 600px)": {
      width: "calc(100% - 78px)"
    }
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
    const { classes, selected, sports, isMobile, isSideMenuOpen } = this.props;
    const { changeSportSelected, toggleSideNav } = this.props.actions;

    let menuIconStyle = classes.menuIconClosed;
    if (isSideMenuOpen) {
      menuIconStyle = classes.menuIconOpen;
    }

    console.log(menuIconStyle);

    return (
      <div className={classes.appBar}>
        <div className={classes.appBarContent}>
          <div className={classes.logo} />
          <div className={classes.sportsToolbarWrapper}>
            <SportsToolbar
              isMobile={isMobile}
              isSideMenuOpen={isSideMenuOpen}
              sports={sports}
              selected={selected}
              actions={{
                changeSelected: key => changeSportSelected(key),
                toggleSideNav: () => toggleSideNav()
              }}
            />
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

export default withStyles(styles)(AppBar);
