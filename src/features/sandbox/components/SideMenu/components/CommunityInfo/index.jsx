import React, { Component } from "react";
import { grey, lightBlue } from "material-ui/colors";
import { withStyles } from "material-ui/styles";
import Button from "../../../Button";

const styles = theme => ({
  buttonIcon: {
    marginRight: 8
  },
  buttonWrapper: {
    width: "100%",
    margin: "4px 0"
  },
  communityName: {
    color: grey[800],
    fontSize: 20,
    lineHeight: "28px",
    textAlign: "center",
    margin: 8
  },
  dot: {
    position: "absolute",
    width: 16,
    height: 16,
    top: "calc(50% - 22px)",
    left: 50,
    backgroundColor: lightBlue[500],
    borderRadius: "50%"
  },
  emblem: {
    borderRadius: "50%",
    width: 48,
    height: 48,
    padding: 4,
    margin: 8,
    backgroundColor: lightBlue[500]
  },
  nameEmblemWrapper: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "12px 0"
  },
  wrapper: {
    backgroundColor: lightBlue[50],
    padding: 28,
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
        <div className={classes.nameEmblemWrapper}>
          <span className={classes.dot} />
          <img src={emblem} alt={`${name} emblem`} className={classes.emblem} />
          <h2 className={classes.communityName}>{name}</h2>
        </div>
        <div className={classes.buttonWrapper}>
          <Button colour="primary" filled slim fullWidth>
            <i className={`fas fa-exchange-alt ${classes.buttonIcon}`} /> Switch
            community
          </Button>
        </div>
        <div className={classes.buttonWrapper}>
          <Button colour="primary" filled slim fullWidth>
            <i className={`fas fa-edit ${classes.buttonIcon}`} /> Manage
            communities
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(CommunityInfo);
