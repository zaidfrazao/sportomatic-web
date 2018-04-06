import React, { Component } from "react";
import { grey, lightBlue } from "material-ui/colors";
import { withStyles } from "material-ui/styles";
import Button from "../Button";

const styles = theme => ({
  buttonIcon: {
    marginRight: 12
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
    width: 280,
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

class CreateOrJoin extends Component<Props> {
  render() {
    const { classes } = this.props;
    const { handleCreateClick, handleJoinClick } = this.props.actions;

    return (
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <i className={`fas fa-users ${classes.icon}`} />
          <h1 className={classes.headline}>Connect with your community</h1>
          <p className={classes.explanation}>
            A community represents all people involved in sports within a
            certain area or organisation. Some examples would be schools, clubs,
            academies, or even just your work soccer league.
          </p>
          <div className={classes.form}>
            <div className={classes.buttonWrapper}>
              <Button
                type="dark"
                chunky
                fullWidth
                actions={{ handleClick: handleCreateClick }}
              >
                <i
                  className={`fas fa-plus-square ${classes.buttonIcon}`}
                />{" "}
                Create a community
              </Button>
              <Button
                type="dark"
                chunky
                fullWidth
                actions={{ handleClick: handleJoinClick }}
              >
                <i
                  className={`fas fa-sign-in-alt ${classes.buttonIcon}`}
                />{" "}
                Join a community
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(CreateOrJoin);
