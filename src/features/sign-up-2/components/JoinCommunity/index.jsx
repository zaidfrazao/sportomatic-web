import React, { Component } from "react";
import { grey, lightBlue } from "material-ui/colors";
import { withStyles } from "material-ui/styles";
import Button from "../Button";

const styles = theme => ({
  buttonIcon: {
    marginRight: 8
  },
  buttonWrapper: {
    margin: "24px 0"
  },
  content: {
    padding: "60px 0 60px 0",
    maxWidth: 800,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  explanation: {
    color: grey[100],
    textAlign: "center",
    margin: 24
  },
  form: {
    color: grey[100],
    width: 260,
    margin: "0 auto"
  },
  headline: {
    color: "white",
    textAlign: "center",
    margin: "0 24px"
  },
  icon: {
    color: "white",
    fontSize: 120,
    margin: 24
  },
  wrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    background: `linear-gradient(${lightBlue[300]}, ${lightBlue[500]})`
  }
});

type Props = {
  classes: {}
};

class JoinCommunity extends Component<Props> {
  render() {
    const { classes } = this.props;
    const { handleBackClick } = this.props.actions;

    return (
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <i className={`fas fa-comment-dots ${classes.icon}`} />
          <h1 className={classes.headline}>Request an Invite</h1>
          <p className={classes.explanation}>
            In order to ensure that communities only contain trusted members,
            you are only able to join via an invite. Please speak to a sports
            director or manager within the community you would like to join and
            ask them to send you an invite.
          </p>
          <div className={classes.form}>
            <div className={classes.buttonWrapper}>
              <Button
                type="dark"
                chunky
                fullWidth
                actions={{ handleClick: handleBackClick }}
              >
                <i className={`fas fa-arrow-left ${classes.buttonIcon}`} /> Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(JoinCommunity);
