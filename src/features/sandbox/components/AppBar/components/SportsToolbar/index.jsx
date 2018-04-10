import React, { Component } from "react";
import { grey } from "material-ui/colors";
import { withStyles } from "material-ui/styles";
import plusIcon from "./images/plus.png";

const styles = theme => ({
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
  all: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    backgroundColor: "white",
    padding: 14,
    textAlign: "center",
    fontWeight: "bold",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    "&:hover": {
      padding: 8,
      width: 40,
      height: 40,
      fontSize: 18
    }
  },
  allSelected: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    backgroundColor: "white",
    padding: 8,
    textAlign: "center",
    fontWeight: "bold",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    fontSize: 18
  },
  button: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50% 50% 0 0",
    cursor: "pointer",
    width: 90,
    "&:hover": {
      backgroundColor: grey[100]
    }
  },
  buttonSelected: {
    backgroundColor: grey[200],
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50% 50% 0 0",
    width: 90
  },
  icon: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    backgroundColor: "white",
    padding: 14,
    "&:hover": {
      padding: 8,
      width: 40,
      height: 40
    }
  },
  iconSelected: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    backgroundColor: "white",
    padding: 8
  },
  wrapper: {
    height: "100%",
    display: "flex"
  }
});

type Props = {
  classes: {
    wrapper: string
  }
};

class SportsToolbar extends Component<Props> {
  getSportButtons() {
    const { classes, sports, selected } = this.props;

    let sportButtons = [
      <div
        key="sports-toolbar-all"
        className={selected === "all" ? classes.buttonSelected : classes.button}
      >
        <span
          className={selected === "all" ? classes.allSelected : classes.all}
        >
          All
        </span>
      </div>,
      sports.map(item => (
        <div
          key={`sports-toolbar-${item.key}`}
          className={
            selected === item.key ? classes.buttonSelected : classes.button
          }
        >
          <img
            className={
              selected === item.key ? classes.iconSelected : classes.icon
            }
            alt={`${item.label} icon`}
            src={item.icon}
          />
        </div>
      )),
      <div key={`sports-toolbar-add`} className={classes.addButton}>
        <img className={classes.icon} alt="Add icon" src={plusIcon} />
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
