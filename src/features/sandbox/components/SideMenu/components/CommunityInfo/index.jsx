import React, { Component } from "react";
import { grey, lightBlue } from "material-ui/colors";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  buttonIcon: {
    marginRight: 8
  },
  buttonWrapper: {
    width: "100%",
    textAlign: "center",
    margin: "4px 0"
  },
  communityName: {
    color: grey[800],
    fontSize: 15,
    lineHeight: "20px",
    textAlign: "center",
    margin: 4
  },
  dot: {
    position: "absolute",
    width: 12,
    height: 12,
    top: "calc(50% - 16px)",
    left: 36,
    backgroundColor: lightBlue[500],
    borderRadius: "50%"
  },
  emblem: {
    borderRadius: "50%",
    width: 32,
    height: 32,
    padding: 4,
    margin: 8,
    backgroundColor: lightBlue[500]
  },
  nameEmblemWrapper: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12
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
        <div className={classes.buttonWrapper} />
      </div>
    );
  }
}

export default withStyles(styles)(CommunityInfo);
