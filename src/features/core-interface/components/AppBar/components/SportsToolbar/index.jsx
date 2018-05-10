import React, { Component } from "react";
import _ from "lodash";
import { common, grey, lightBlue } from "material-ui/colors";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  button: {
    transition: "0.25s",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    padding: "0 12px",
    margin: 8,
    fontWeight: "bold",
    borderRadius: 14,
    fontSize: 18,
    backgroundColor: grey[100],
    "&:hover": {
      backgroundColor: grey[200]
    }
  },
  buttonSelected: {
    transition: "0.25s",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 18px",
    margin: 8,
    fontWeight: "bold",
    borderRadius: 14,
    fontSize: 18,
    color: common["white"],
    backgroundColor: lightBlue[800],
    "&:hover": {
      backgroundColor: lightBlue[700]
    }
  },
  icon: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    fontSize: 32
  },
  iconSelected: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    fontSize: 32
  },
  wrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    overflowX: "auto"
  }
});

type Props = {
  actions: {
    changeSelected: (key: string) => {}
  },
  classes: {
    wrapper: string
  }
};

class SportsToolbar extends Component<Props> {
  static defaultProps = {
    changeSelected: key => console.log(`Sport changed to ${key}`)
  };

  getSportButtons() {
    const { classes, sports, selected, isTablet, isSideMenuOpen } = this.props;
    const { changeSelected, toggleSideNav } = this.props.actions;

    let sportButtons = [
      _.toPairs(sports).map(([key, item]) => {
        if (key === "all") {
          return (
            <div
              key="sports-toolbar-all"
              className={
                selected === "all" ? classes.buttonSelected : classes.button
              }
              onClick={() => {
                changeSelected("all");
                isTablet && isSideMenuOpen && toggleSideNav();
              }}
            >
              <span>All</span>
            </div>
          );
        } else {
          return (
            <div
              key={`sports-toolbar-${key}`}
              className={
                selected === key ? classes.buttonSelected : classes.button
              }
              onClick={() => {
                changeSelected(key);
                isTablet && isSideMenuOpen && toggleSideNav();
              }}
            >
              <img
                className={
                  selected === key ? classes.iconSelected : classes.icon
                }
                alt={`${item.label} icon`}
                src={item.icon}
              />
            </div>
          );
        }
      }),
      <div key={`sports-toolbar-add`} className={classes.button}>
        <i className={`fas fa-plus-circle ${classes.icon}`} />
      </div>
    ];

    return sportButtons;
  }

  render() {
    const { classes } = this.props;
    const sportButtons = this.getSportButtons();

    return <div className={classes.wrapper}>{sportButtons}</div>;
  }
}

export default withStyles(styles)(SportsToolbar);
