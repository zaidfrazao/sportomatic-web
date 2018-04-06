import React, { Component } from "react";
import { grey, lightBlue } from "material-ui/colors";
import { withStyles } from "material-ui/styles";
import Button from "../Button";

const styles = theme => ({
  buttonIcon: {
    marginLeft: 8
  },
  buttonWrapper: {
    margin: "24px 0"
  },
  content: {
    padding: "60px 0 60px 0",
    maxWidth: 800,
    margin: "0 auto"
  },
  form: {
    color: grey[100],
    width: 260,
    margin: "0 auto"
  },
  headline: {
    color: "white",
    textAlign: "center",
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

class EmailEntry extends Component<Props> {
  render() {
    const { classes } = this.props;
    const { handleNextClick } = this.props.actions;

    return (
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <h1 className={classes.headline}>Let's get started</h1>
          <div className={classes.form}>
            <input
              type="email"
              id="emailaddress"
              name="emailaddress"
              placeholder="Email"
            />
            <div className={classes.buttonWrapper}>
              <Button
                type="dark"
                fullWidth
                actions={{ handleClick: handleNextClick }}
              >
                Next{" "}
                <i className={`fas fa-arrow-right ${classes.buttonIcon}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(EmailEntry);
