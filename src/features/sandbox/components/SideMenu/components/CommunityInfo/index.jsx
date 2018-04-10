import React, { Component } from "react";
import { grey } from "material-ui/colors";
import { withStyles } from "material-ui/styles";
import Button from "../../../Button";

const styles = theme => ({
  buttonIcon: {
    marginRight: 8
  },
  communityName: {
    color: grey[800],
    fontSize: 22,
    textAlign: "center",
    margin: "12px 0"
  },
  emblem: {
    borderRadius: "50%",
    width: 140,
    height: 140,
    backgroundColor: "white"
  },
  numberOfMembers: {
    color: grey[100],
    fontSize: 16,
    textAlign: "center"
  },
  wrapper: {
    backgroundColor: grey[300],
    padding: 24,
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
