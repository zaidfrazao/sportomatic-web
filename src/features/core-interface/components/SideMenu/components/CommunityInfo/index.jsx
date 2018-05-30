import React, { Component } from "react";
import Button from "../../../../../../components/Button";
import { common, lightBlue } from "../../../../../../utils/colours";
import injectStyles from "react-jss";

const mobileBreakpoint = 800;

const styles = {
  buttonWrapper: {
    marginTop: 12
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
  switchIcon: {
    marginRight: 8
  },
  wrapper: {
    backgroundColor: lightBlue[500],
    padding: 28,
    display: "flex",
    flexDirection: "column",
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
    const { classes, emblem, name, switchCommunities } = this.props;

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
        <div className={classes.buttonWrapper}>
          <Button
            type="dark"
            filled
            slim
            handleClick={() => switchCommunities()}
          >
            <i className={`fas fa-exchange-alt ${classes.switchIcon}`} />Switch
          </Button>
        </div>
      </div>
    );
  }
}

export default injectStyles(styles)(CommunityInfo);
