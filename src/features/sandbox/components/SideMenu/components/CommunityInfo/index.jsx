import React, { Component } from "react";
import { common, lightBlue } from "material-ui/colors";
import { withStyles } from "material-ui/styles";
import PersonalAllSwitch from "./components/PersonalAllSwitch";

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
    color: common["white"],
    fontSize: 16,
    lineHeight: "20px",
    margin: 4,
    "@media (max-width: 600px)": {
      fontSize: 20,
      lineHeight: "28px"
    }
  },
  emblem: {
    borderRadius: "50%",
    width: 50,
    height: 50,
    padding: 4,
    margin: 4,
    backgroundColor: common["white"],
    "@media (max-width: 600px)": {
      margin: 14
    }
  },
  nameEmblemWrapper: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12
  },
  wrapper: {
    backgroundColor: lightBlue[500],
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
          <img src={emblem} alt={`${name} emblem`} className={classes.emblem} />
          <h2 className={classes.communityName}>{name}</h2>
        </div>
        <div className={classes.buttonWrapper}>
          <PersonalAllSwitch />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(CommunityInfo);
