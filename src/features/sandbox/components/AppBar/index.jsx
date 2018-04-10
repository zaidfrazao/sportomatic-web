import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import SportsToolbar from "./components/SportsToolbar";
import logo from "./images/logo.png";
import rugbyIcon from "./images/rugby.png";
import soccerIcon from "./images/soccer.png";
import tennisIcon from "./images/tennis-ball.png";

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
    backgroundImage: `url(${logo})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: 160,
    height: 30,
    margin: "0 40px"
  }
});

type Props = {
  classes: {
    appBar: string,
    appBarContent: string,
    flex: string,
    logo: string,
    signUpButtonWrapper: string
  }
};

class AppBar extends Component<Props> {
  render() {
    const { classes } = this.props;

    const sportsList = [
      {
        key: "rugby",
        label: "Rugby",
        icon: rugbyIcon
      },
      {
        key: "soccer",
        label: "Soccer",
        icon: soccerIcon
      },
      {
        key: "tennis",
        label: "Tennis",
        icon: tennisIcon
      }
    ];

    return (
      <div className={classes.appBar}>
        <div className={classes.appBarContent}>
          <div className={classes.logo} />
          <SportsToolbar sports={sportsList} selected="tennis" />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AppBar);
