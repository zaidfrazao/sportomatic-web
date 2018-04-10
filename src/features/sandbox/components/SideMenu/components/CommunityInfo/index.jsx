import React, { Component } from "react";
import { grey, lightBlue } from "material-ui/colors";
import { withStyles } from "material-ui/styles";
import Button from "../../../Button";

const styles = theme => ({
  buttonIcon: {
    marginRight: 8
  },
  communityName: {
    color: grey[800],
    fontSize: 22,
    lineHeight: "28px",
    textAlign: "center",
    margin: "18px 0"
  },
  dot: {
    position: "absolute",
    width: 32,
    height: 32,
    top: 60,
    left: "calc(50% + 40px)",
    backgroundColor: lightBlue[500],
    borderRadius: "50%"
  },
  emblem: {
    borderRadius: "50%",
    width: 140,
    height: 140,
    padding: 8,
    backgroundColor: lightBlue[500]
  },
  numberOfMembers: {
    color: grey[100],
    fontSize: 16,
    textAlign: "center"
  },
  wrapper: {
    position: "relative",
    backgroundColor: lightBlue[50],
    padding: "48px 24px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});

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
        <span className={classes.dot} />
        <img src={emblem} alt={`${name} emblem`} className={classes.emblem} />
        <h2 className={classes.communityName}>{name}</h2>
        <Button colour="primary" filled slim>
          <i className={`fas fa-edit ${classes.buttonIcon}`} /> Edit communities
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(CommunityInfo);
