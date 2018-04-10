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
    width: 30,
    height: 30,
    top: 60,
    left: "calc(50% + 26px)",
    backgroundColor: lightBlue[500],
    borderRadius: "50%"
  },
  emblem: {
    borderRadius: "50%",
    width: 100,
    height: 100,
    padding: 8,
    backgroundColor: lightBlue[500]
  },
  wrapper: {
    position: "relative",
    backgroundColor: lightBlue[50],
    padding: "48px 24px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "@media (max-width: 600px)": {
      boxShadow: `0 0 20px ${grey[500]}`
    }
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
