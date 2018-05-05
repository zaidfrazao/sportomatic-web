import React, { Component } from "react";
import _ from "lodash";
import { grey, lightBlue } from "material-ui/colors";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  arrowBlue: {
    position: "absolute",
    transition: "0.5s",
    content: "",
    top: "calc(100% - 28px)",
    left: "calc(50% - 14px)",
    width: 0,
    height: 0,
    border: "14px solid transparent",
    borderColor: `transparent transparent ${lightBlue[50]} transparent`
  },
  arrowGrey: {
    position: "absolute",
    transition: "0.5s",
    content: "",
    top: "calc(100% - 28px)",
    left: "calc(50% - 14px)",
    width: 0,
    height: 0,
    border: "14px solid transparent",
    borderColor: `transparent transparent ${grey[200]} transparent`
  },
  addButton: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50% 50% 0 0",
    cursor: "pointer",
    width: 90
  },
  button: {
    backgroundColor: "white",
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
    transition: "0.125s",
    "&:hover": {
      backgroundColor: grey[200]
    }
  },
  buttonSelected: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 24px",
    fontWeight: "bold",
    fontSize: 18
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

    let arrowStyle = classes.arrowGrey;
    isTablet && isSideMenuOpen && (arrowStyle = classes.arrowBlue);

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
              {selected === "all" && <span className={arrowStyle} />}
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
              {selected === key && <span className={arrowStyle} />}
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
