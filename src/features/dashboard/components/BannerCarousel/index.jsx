import React, { Component } from "react";
import Avatar from "material-ui/Avatar";
import BackIcon from "material-ui-icons/ArrowBack";
import BugIcon from "material-ui-icons/BugReport";
import Button from "material-ui/Button";
import ForwardIcon from "material-ui-icons/ArrowForward";
import { grey } from "material-ui/colors";
import MinorChangesIcon from "material-ui-icons/Build";
import NewFeatureIcon from "material-ui-icons/NewReleases";
import Paper from "material-ui/Paper";
import Slider from "react-slick";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import backgroundImage from "./images/background-image.jpeg";
import updatesImage from "./images/updates.jpeg";

const styles = {
  bannerWrapper: {
    width: 970,
    margin: "40px auto",
    backgroundColor: grey[300],
    "@media (max-width: 1200px)": {
      width: 500
    },
    "@media (max-width: 600px)": {
      width: 300
    }
  },
  button: {
    margin: 8
  },
  buttonsWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch"
  },
  icon: {
    width: 48,
    height: 48,
    margin: 8,
    color: grey[50],
    backgroundColor: grey[900]
  },
  iconText: {},
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
    backgroundColor: grey[700],
    backgroundImage: `url(${backgroundImage})`
  },
  slide2: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 250,
    textAlign: "center",
    backgroundColor: grey[50],
    backgroundSize: "970px 250px",
    backgroundImage: `url(${updatesImage})`
  },
  updateBox: {
    width: 160,
    height: 80,
    padding: 8,
    margin: "0 16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  updateBoxesWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    overflow: "x-axis",
    alignItems: "baseline",
    justifyContent: "center",
    margin: 8
  },
  updatesTitle: {
    color: grey[900],
    margin: 12
  },
  welcomeTitle: {
    color: grey[50],
    margin: 12
  }
};

class BannerCarousel extends Component {
  render() {
    const { classes, isMobile } = this.props;
    const { openUpdatesDialog } = this.props.actions;

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
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
              <h2 className={classes.welcomeTitle}>
                {"Welcome to Sportomatic"}
              </h2>
              <div className={classes.buttonsWrapper}>
                <Button
                  raised
                  color="accent"
                  className={classes.button}
                  onClick={() =>
                    window.open(
                      "http://site.sportomaticapp.com/wp-content/uploads/2018/02/Sportomatic-Season-Setup-Guide-3.docx",
                      "_blank"
                    )}
                >
                  Download Season Setup Guide
                </Button>
                <Button
                  raised
                  color="accent"
                  className={classes.button}
                  onClick={() =>
                    window.open(
                      "http://site.sportomaticapp.com/wp-content/uploads/2018/02/Sportomatic-Userguide.docx",
                      "_blank"
                    )}
                >
                  Download User Guide
                </Button>
              </div>
            </div>
          </div>
          <div className={classes.slide}>
            <div className={classes.slide2}>
              <h2 className={classes.updatesTitle}>{"Version 0.9.22"}</h2>
              {!isMobile && (
                <div className={classes.updateBoxesWrapper}>
                  {false && (
                    <div className={classes.updateBox}>
                      <Avatar className={classes.icon}>
                        <NewFeatureIcon />
                      </Avatar>
                      <Typography
                        className={classes.iconText}
                        type="title"
                        component="h3"
                      >
                        Improved Event Scheduling
                      </Typography>
                    </div>
                  )}
                  {true && (
                    <div className={classes.updateBox}>
                      <Avatar className={classes.icon}>
                        <BugIcon />
                      </Avatar>
                      <Typography
                        className={classes.iconText}
                        type="title"
                        component="h3"
                      >
                        Bug Fixes
                      </Typography>
                    </div>
                  )}
                  {true && (
                    <div className={classes.updateBox}>
                      <Avatar className={classes.icon}>
                        <MinorChangesIcon />
                      </Avatar>
                      <Typography
                        className={classes.iconText}
                        type="title"
                        component="h3"
                      >
                        Minor Changes
                      </Typography>
                    </div>
                  )}
                </div>
              )}
              <div className={classes.buttonsWrapper}>
                <Button
                  raised
                  color="accent"
                  className={classes.button}
                  onClick={() => openUpdatesDialog()}
                >
                  View all updates
                </Button>
              </div>
            </div>
          </div>
        </Slider>
      </Paper>
    );
  }
}

export default withStyles(styles)(BannerCarousel);
