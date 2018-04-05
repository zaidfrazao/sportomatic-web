import React, { Component } from "react";
import { grey, orange } from "material-ui/colors";
import { withStyles } from "material-ui/styles";
import Button from "../Button";

const styles = theme => ({
  buttonWrapper: {
    padding: "28px 0",
    textAlign: "center"
  },
  content: {
    padding: "160px 0 180px 0",
    maxWidth: 800,
    margin: "0 auto"
  },
  feature: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: 24,
    width: 140
  },
  featuresWrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  headline: {
    color: "white",
    width: "100%",
    textAlign: "center"
  },
  icon: {
    color: "white",
    fontSize: 54,
    margin: 8
  },
  name: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Nunito, sans-serif"
  },
  splurg: {
    color: grey[100],
    maxWidth: 640,
    margin: "0 auto 28px auto"
  },
  wrapper: {
    padding: "0 54px",
    background: `linear-gradient(${orange["A200"]}, ${orange["A400"]})`,
    position: "relative"
  }
});

type Props = {
  actions: {
    goToSignUp: () => null
  },
  classes: {
    content: string,
    formButtonMargin: string,
    headlineDesktop: string,
    headlineLine1: string,
    headlineLine2: string,
    headlineMobile: string,
    headlineMobileText: string,
    loginLink: string,
    loginText: string,
    loginTextWrapper: string,
    marketingSplurg: string,
    orLine: string,
    orText: string,
    separator: string,
    socialSignUpForm: string,
    wrapper: string
  }
};

class Banner extends Component<Props> {
  static defaultProps = {
    actions: {
      goToSignUp: () => console.log("User clicked to sign up")
    }
  };

  render() {
    const { classes } = this.props;
    const { goToSignUp } = this.props.actions;

    return (
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <h1 className={classes.headline}>More Features Coming Soon</h1>
          <p className={classes.splurg}>
            We really want to turn Sportomatic into the complete sports
            management solution at all levels. We have a lot planned to help us
            get there. Of course, we'll be getting feedback from you to decide
            what's most important.
          </p>
          <div className={classes.featuresWrapper}>
            <div className={classes.feature}>
              <i className={`fas fa-comments ${classes.icon}`} />
              <span className={classes.name}>Team Chat</span>
            </div>
            <div className={classes.feature}>
              <i className={`fas fa-bullhorn ${classes.icon}`} />
              <span className={classes.name}>Announcements</span>
            </div>
            <div className={classes.feature}>
              <i className={`fas fa-chart-line ${classes.icon}`} />
              <span className={classes.name}>Performance Tracking</span>
            </div>
            <div className={classes.feature}>
              <i className={`fas fa-star ${classes.icon}`} />
              <span className={classes.name}>Player Awards</span>
            </div>
            <div className={classes.feature}>
              <i className={`fas fa-bus ${classes.icon}`} />
              <span className={classes.name}>Transport Booking</span>
            </div>
            <div className={classes.feature}>
              <i className={`fas fa-trophy ${classes.icon}`} />
              <span className={classes.name}>Tournament System</span>
            </div>
            <div className={classes.feature}>
              <i className={`fas fa-user-plus ${classes.icon}`} />
              <span className={classes.name}>Coach Hiring Network</span>
            </div>
            <div className={classes.feature}>
              <i className={`fas fa-search ${classes.icon}`} />
              <span className={classes.name}>Athlete Scouting</span>
            </div>
          </div>
          <div className={classes.buttonWrapper}>
            <Button colour="primary" filled onClick={() => goToSignUp()}>
              Sign up for free
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Banner);
