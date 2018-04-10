import React, { Component } from "react";
import { grey } from "material-ui/colors";
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
    margin: "0 40px",
    "@media (max-width: 600px)": {
      display: "none"
    }
  },
  menuIcon: {
    height: "100%",
    fontSize: 32
  },
  mobileMenuButton: {
    display: "block",
    padding: "0 24px",
    height: "100%",
    borderLeft: `1px solid ${grey[300]}`,
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
            <i className={`fas fa-bars ${classes.menuIcon}`} />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AppBar);
