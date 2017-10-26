// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { grey } from "material-ui/colors";
import largeAdImage from "./images/large-ad.jpg";
import mediumAdImage from "./images/medium-ad.jpg";
import smallAdImage from "./images/small-ad.gif";

const styles = {
  largeDisplay: {
    width: 728,
    height: 90,
    margin: 24,
    backgroundImage: `url(${largeAdImage})`,
    backgroundColor: grey[300]
  },
  mediumDisplay: {
    width: 468,
    height: 60,
    margin: 24,
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

class LeaderboardAd extends Component {
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
      return (
        <ins
          className="adsbygoogle"
          style={{
            display: "inline-block",
            width: 320,
            height: 100,
            margin: 10,
            backgroundColor: grey[300]
          }}
          data-ad-client="ca-pub-7670057362856972"
          data-ad-slot="8947288756"
        />
      );
    } else if (windowWidth < 960) {
      return (
        <ins
          className="adsbygoogle"
          style={{
            margin: 10,
            display: "inline-block",
            width: 468,
            height: 60,
            backgroundColor: grey[300]
          }}
          data-ad-client="ca-pub-7670057362856972"
          data-ad-slot="5860647331"
        />
      );
    } else {
      return (
        <ins
          className="adsbygoogle"
          style={{
            margin: 24,
            display: "inline-block",
            width: 728,
            height: 90,
            backgroundColor: grey[300]
          }}
          data-ad-client="ca-pub-7670057362856972"
          data-ad-slot="2049039611"
        />
      );
    }
  }
}

LeaderboardAd.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LeaderboardAd);
