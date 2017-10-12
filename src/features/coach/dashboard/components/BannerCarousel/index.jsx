import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import { grey } from "material-ui/colors";
import Slider from "react-slick";
import BackIcon from "material-ui-icons/ArrowBack";
import ForwardIcon from "material-ui-icons/ArrowForward";
import Button from "material-ui/Button";
import Paper from "material-ui/Paper";
import backgroundImage from "./images/background-image.jpeg";
import largeAd from "./images/large-ad.png";
import smallAd from "./images/small-ad.png";

const styles = {
  bannerWrapper: {
    width: 970,
    margin: "40px auto",
    backgroundColor: grey[300],
    "@media (max-width: 600px)": {
      width: 300
    },
    "@media (max-width: 1200px)": {
      width: 300
    }
  },
  updatesTitle: {
    color: grey[50],
    margin: 12
  },
  slide: {
    height: 250
  },
  slide1: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 250,
    textAlign: "center",
    backgroundSize: "970px 250px",
    backgroundImage: `url(${backgroundImage})`
  },
  slide2: {
    height: "100%",
    width: "100%",
    backgroundImage: `url(${largeAd})`,
    "@media (max-width: 1200px)": {
      backgroundImage: `url(${smallAd})`
    }
  }
};

class BannerCarousel extends Component {
  render() {
    const { classes } = this.props;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      arrows: false,
      nextArrow: <ForwardIcon color={grey[800]} />,
      prevArrow: <BackIcon color={grey[800]} />
    };
    return (
      <Paper className={classes.bannerWrapper}>
        <Slider {...settings}>
          <div className={classes.slide}>
            <div className={classes.slide1}>
              <h2 className={classes.updatesTitle}>
                Welcome to Sportomatic Beta 0.1
              </h2>
              {/*<Button raised color="accent">
                Learn more
              </Button>*/}
            </div>
          </div>
          <div className={classes.slide}>
            <div className={classes.slide2} />
          </div>
        </Slider>
      </Paper>
    );
  }
}

export default withStyles(styles)(BannerCarousel);
