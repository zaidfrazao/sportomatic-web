import React, { Component } from "react";
import injectStyles from "react-jss";
import { common, grey } from "../../utils/colours";

import americanFootballPlayer from "./images/american-football-player.png";
import basketballPlayer from "./images/basketball-player.png";
import cricketPlayer from "./images/cricket-player.png";
import cyclist from "./images/cyclist.png";
import fencer from "./images/fencer.png";
import footballPlayer from "./images/football-player.png";
import gymnast from "./images/gymnast.png";
import kickboxer from "./images/kickboxer.png";
import swimmer from "./images/swimmer.png";
import tennisPlayer from "./images/tennis-player.png";

const styles = {
  arrow: {
    position: "absolute",
    content: "",
    top: "100%",
    left: "50%",
    width: 0,
    height: 0,
    border: "24px solid transparent",
    borderColor: `${common["white"]} transparent transparent transparent`
  },
  message: {
    position: "relative",
    flexGrow: 1,
    borderRadius: 16,
    backgroundColor: common["white"],
    color: grey[400],
    fontSize: 24,
    lineHeight: "34px",
    fontWeight: "bold",
    textAlign: "center",
    padding: "48px 24px",
    marginBottom: 24,
    minWidth: 240
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
};

class EmptyState extends Component {
  state = {
    avatar: americanFootballPlayer
  };

  componentWillMount() {
    const avatars = [
      americanFootballPlayer,
      basketballPlayer,
      cricketPlayer,
      cyclist,
      fencer,
      footballPlayer,
      gymnast,
      kickboxer,
      swimmer,
      tennisPlayer
    ];

    const index = Math.floor(Math.random() * avatars.length);

    this.setState({
      avatar: avatars[index]
    });
  }

  render() {
    const { classes, children } = this.props;
    const { avatar } = this.state;

    return (
      <div className={classes.wrapper}>
        <div className={classes.message}>
          {children}
          <div className={classes.arrow} />
        </div>
        <img src={avatar} alt="Message speaker" />
      </div>
    );
  }
}

export default injectStyles(styles)(EmptyState);
