import React from "react";
import { withStyles } from "material-ui/styles";
import { grey50, grey300, grey800, orangeA400 } from "material-ui/colors";
import Slider from "react-slick";
import BackIcon from "material-ui-icons/ArrowBack";
import ForwardIcon from "material-ui-icons/ArrowForward";
import backgroundImage from "./images/background-image.jpeg";
import Button from "material-ui/Button";
import Paper from "material-ui/Paper";

const BannerCarousel = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    nextArrow: <ForwardIcon color={grey800} />,
    prevArrow: <BackIcon color={grey800} />
  };
  return (
    <Paper style={styles.welcomeWrapper}>
      <Slider {...settings}>
        <div style={styles.slide}>
          <img
            alt="OfferZen ad"
            src="https://tpc.googlesyndication.com/simgad/5448103196704322774"
          />
        </div>
        <div style={(styles.slide, styles.slide2)}>
          <div style={styles.slide1Content}>
            <h2 style={styles.updatesTitle}>
              {"Welcome to Sportomatic Beta 0.1"}
            </h2>
            <Button raised>Learn more</Button>
          </div>
        </div>
      </Slider>
    </Paper>
  );
};

const styles = {
  heading: {
    color: grey800,
    marginBottom: "20px",
    textAlign: "center"
  },
  welcomeWrapper: {
    width: "970px",
    margin: "40px auto",
    backgroundColor: grey300
  },
  email: {
    color: orangeA400,
    fontWeight: "bold"
  },
  slide: {
    height: "250px"
  },
  updatesTitle: {
    color: grey50
  },
  slide2: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "250px",
    width: "100%",
    textAlign: "center",
    backgroundSize: "970px 250px",
    backgroundImage: `url(${backgroundImage})`
  }
};

export default withStyles(styles)(BannerCarousel);
