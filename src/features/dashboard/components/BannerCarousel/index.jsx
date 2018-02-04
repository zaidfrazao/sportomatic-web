import React, { Component } from "react";
import BackIcon from "material-ui-icons/ArrowBack";
import Button from "material-ui/Button";
import ForwardIcon from "material-ui-icons/ArrowForward";
import { grey } from "material-ui/colors";
import Paper from "material-ui/Paper";
import Slider from "react-slick";
import { withStyles } from "material-ui/styles";
import backgroundImage from "./images/background-image.jpeg";

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
  updatesTitle: {
    color: grey[50],
    margin: 12
  }
};

class BannerCarousel extends Component {
  render() {
    const { classes } = this.props;
    const { openUpdatesDialog } = this.props.actions;

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 10000,
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
                {"Welcome to Sportomatic"}
              </h2>
              <Button raised color="accent" onClick={() => openUpdatesDialog()}>
                View updates
              </Button>
            </div>
          </div>
          {/*<div className={classes.slide}>
            {isTablet ? <DashboardMobileAd /> : <DashboardDesktopAd />}
          </div>*/}
        </Slider>
      </Paper>
    );
  }
}

export default withStyles(styles)(BannerCarousel);
