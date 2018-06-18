import React, { Component } from "react";
import injectStyles from "react-jss";
import { grey } from "../../utils/colours";

const mobileBreakpoint = 800;

const styles = theme => ({
  loader: {
    color: grey[300],
    fontSize: 22,
    lineHeight: "32px",
    fontWeight: "bold",
    animation: "dots 1.5s steps(5, end) infinite",
    [`@media (min-width: ${mobileBreakpoint}px)`]: {
      fontSize: 28,
      lineHeight: "40px"
    }
  },
  wrapper: {
    color: grey[300],
    fontSize: 22,
    lineHeight: "32px",
    fontWeight: "bold",
    textAlign: "center",
    [`@media (min-width: ${mobileBreakpoint}px)`]: {
      fontSize: 28,
      lineHeight: "40px"
    }
  }
});

class Loader extends Component {
  state = {
    catchphrase: "Scoring hattricks"
  };

  componentWillMount() {
    const phrases = [
      "Scoring a hattrick",
      "Scoring 3-pointers",
      "Celebrating a touchdown",
      "Working biceps",
      "Doing double backflips",
      "Hitting 6's",
      "Serving aces",
      "Planning a shortie",
      "Taking a free kick",
      "Skipping leg day",
      "Appreciating the gains",
      "Planning formation"
    ];

    const index = Math.floor(Math.random() * phrases.length);

    this.setState({
      catchphrase: phrases[index]
    });
  }

  render() {
    const { classes } = this.props;
    const { catchphrase } = this.state;

    return (
      <p className={classes.wrapper}>
        {catchphrase}
        <span className={classes.loader}>{" ."}</span>
      </p>
    );
  }
}

export default injectStyles(styles)(Loader);
