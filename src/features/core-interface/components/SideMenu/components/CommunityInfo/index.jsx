import React, { Component } from "react";
import { common, lightBlue } from "../../../../../../utils/colours";
import injectStyles from "react-jss";

const mobileBreakpoint = 800;

const styles = {
  buttonsWrapper: {
    display: "flex",
    marginBottom: 12
  },
  communityName: {
    color: common["white"],
    fontSize: 16,
    lineHeight: "20px",
    margin: 4,
    [`@media (max-width: ${mobileBreakpoint}px)`]: {
      fontSize: 20,
      lineHeight: "28px"
    }
  },
  emblem: {
    borderRadius: "50%",
    padding: 4,
    margin: 4,
    width: 50,
    ehgiht: 50,
    backgroundColor: common["white"],
    "@media (max-width: 600px)": {
      margin: 14
    }
  },
  nameEmblemWrapper: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  switchButtonWrapper: {
    flexGrow: 1,
    marginRight: 8
  },
  wrapper: {
    backgroundColor: lightBlue[500],
    padding: 28,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
};

type Props = {
  classes: {
    wrapper: string
  }
};

class CommunityInfo extends Component<Props> {
  render() {
    const { classes, emblem, name } = this.props;

    return (
      <div className={classes.wrapper}>
        <div className={classes.nameEmblemWrapper}>
          <img
            src={emblem}
            width="50"
            height="50"
            alt={`${name} emblem`}
            className={classes.emblem}
          />
          <h2 className={classes.communityName}>{name}</h2>
        </div>
      </div>
    );
  }
}

export default injectStyles(styles)(CommunityInfo);
