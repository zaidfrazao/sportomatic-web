/* eslint-disable array-callback-return */
import React, { Component } from "react";
import injectStyles from "react-jss";
import {
  common,
  grey,
  lightBlue,
  orange
} from "../../../../../../utils/colours";
import defaultEmblem from "../../../../images/default-emblem.jpg";

const styles = {
  activeRibbon: {
    fontSize: 14,
    padding: "12px 0",
    textAlign: "center",
    fontWeight: "bold",
    color: common["white"],
    backgroundColor: orange[500]
  },
  card: {
    transition: "0.25s",
    backgroundColor: common["white"],
    borderRadius: 16,
    cursor: "pointer",
    border: `1px solid ${grey[300]}`,
    "&:hover": {
      boxShadow:
        "0 0px 0px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
    }
  },
  header: {
    fontSize: 18,
    borderRadius: "16px 16px 0 0",
    padding: 24,
    textAlign: "center",
    fontWeight: "bold",
    color: common["white"],
    backgroundColor: lightBlue[800]
  },
  picture: {
    width: "100%",
    backgroundColor: grey[300],
    borderRadius: 16
  },
  pictureWrapper: {
    padding: 24
  }
};

class CommunityCard extends Component {
  render() {
    const {
      classes,
      isActive,
      name,
      emblemURL,
      id,
      switchCommunity
    } = this.props;

    return (
      <div className={classes.card} onClick={() => switchCommunity(id)}>
        <div className={classes.header}>{name}</div>
        {isActive && (
          <div className={classes.activeRibbon}>Currently selected</div>
        )}
        <div className={classes.pictureWrapper}>
          <img
            className={classes.picture}
            src={emblemURL === "" ? defaultEmblem : emblemURL}
            alt={name}
          />
        </div>
      </div>
    );
  }
}

export default injectStyles(styles)(CommunityCard);
