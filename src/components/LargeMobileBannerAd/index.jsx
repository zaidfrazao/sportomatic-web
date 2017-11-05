import React, { Component } from "react";
import { grey } from "material-ui/colors";

class LargeMobileBannerAd extends Component {
  constructor(props) {
    super(props);
    this.state = { windowWidth: "0" };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ windowWidth: window.innerWidth });
  }

  render() {
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
  }
}

export default LargeMobileBannerAd;
