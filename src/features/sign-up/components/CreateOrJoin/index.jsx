import React, { Component } from "react";
import injectSheet from "react-jss";
import { common, grey, lightBlue } from "../../../../utils/colours";
import Button from "../../../../components/Button";

const styles = theme => ({
  buttonIcon: {
    marginRight: 12
  },
  buttonGroupWrapper: {
    margin: "24px 0"
  },
  buttonWrapper: {
    margin: "14px 0"
  },
  content: {
    padding: "60px 0 60px 0",
    maxWidth: 800,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  dotHighlighted: {
    width: 16,
    height: 16,
    borderRadius: "50%",
    margin: 4,
    backgroundColor: common["white"]
  },
  dotNotHighlighted: {
    width: 16,
    height: 16,
    borderRadius: "50%",
    margin: 4,
    backgroundColor: grey[300]
  },
  dotsWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    margin: "16px 0"
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
    color: common["white"],
    textAlign: "center",
    margin: "0 24px"
  },
  icon: {
    color: common["white"],
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

type Props = {};

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
            <div className={classes.buttonGroupWrapper}>
              <div className={classes.buttonWrapper}>
                <Button
                  type="dark"
                  colour="primary"
                  filled
                  fullWidth
                  actions={{ handleClick: handleCreateClick }}
                >
                  <i
                    className={`fas fa-plus-square ${classes.buttonIcon}`}
                  />{" "}
                  Create a community
                </Button>
              </div>
              <div className={classes.buttonWrapper}>
                <Button
                  type="dark"
                  colour="primary"
                  filled
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
          <div className={classes.dotsWrapper}>
            <span className={classes.dotHighlighted} />
            <span className={classes.dotNotHighlighted} />
            <span className={classes.dotNotHighlighted} />
          </div>
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(CreateOrJoin);
