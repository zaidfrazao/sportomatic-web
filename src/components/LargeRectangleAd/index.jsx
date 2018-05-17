import React, { Component } from "react";
import { grey } from "../../utils/colours";

class LargeRectangleAd extends Component {
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
      <div
        style={{
          width: 336,
          height: 280,
          backgroundColor: grey[300]
        }}
      >
        <ins
          style={{
            display: "inline-block",
            width: 336,
            height: 280
          }}
          className="adsbygoogle"
          data-ad-client="ca-pub-7670057362856972"
          data-ad-slot="8615900662"
        />
      </div>
    );
  }
}

export default LargeRectangleAd;
