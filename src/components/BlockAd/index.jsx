// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { grey } from "material-ui/colors";
import largeAdImage from "./images/large-ad.gif";
import mediumAdImage from "./images/medium-ad.jpg";
import smallAdImage from "./images/small-ad.gif";

const styles = {
  largeDisplay: {
    width: 300,
    height: 250,
    backgroundImage: `url(${largeAdImage})`,
    backgroundColor: grey[300]
  },
  mediumDisplay: {
    width: 468,
    height: 60,
    backgroundImage: `url(${mediumAdImage})`,
    backgroundColor: grey[300]
  },
  smallDisplay: {
    width: 320,
    height: 50,
    backgroundImage: `url(${smallAdImage})`,
    backgroundColor: grey[300]
  }
};

class BlockAd extends Component {
  constructor(props) {
    super(props);
    this.state = { windowWidth: "0" };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ windowWidth: window.innerWidth });
  }

  render() {
    const { classes } = this.props;
    const { windowWidth } = this.state;

    if (windowWidth < 600) {
      return <div className={classes.smallDisplay} />;
    } else if (windowWidth < 960) {
      return <div className={classes.mediumDisplay} />;
    } else {
      return <div className={classes.largeDisplay} />;
    }
  }
}

BlockAd.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BlockAd);
