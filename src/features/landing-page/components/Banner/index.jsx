import React, { Component } from "react";
import { grey, orange } from "material-ui/colors";
import { withStyles } from "material-ui/styles";
import Button from "../Button";
import bannerImage from "./images/banner-image.png";

const styles = theme => ({
  content: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "flex",
    padding: "60px 0",
    "@media (min-width: 1200px)": {
      padding: "120px 0",
      backgroundImage: `url(${bannerImage})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "100% 0",
      backgroundSize: "contain"
    }
  },
  formButtonMargin: {
    margin: "8px 0"
  },
  headlineLine1: {
    margin: 0
  },
  headlineLine2: {
    margin: "0 0 23px 0"
  },
  headlineDesktop: {
    display: "block",
    "@media (max-width: 480px)": {
      display: "none"
    }
  },
  headlineMobile: {
    display: "block",
    "@media (min-width: 480px)": {
      display: "none"
    }
  },
  headlineMobileText: {
    margin: "0 0 23px 0",
    fontSize: 32,
    lineHeight: "46px",
    textAlign: "center"
  },
  loginLink: {
    color: orange[900]
  },
  loginText: {
    color: grey[700]
  },
  loginTextWrapper: {
    margin: "8px 0",
    width: "100%",
    textAlign: "center",
    fontSize: 15
  },
  marketingSplurg: {
    margin: 48,
    "@media (min-width: 600px)": {
      margin: "24px auto",
      width: 480
    },
    "@media (min-width: 1200px)": {
      margin: 24,
      width: "40%"
    }
  },
  orLine: {
    height: 1,
    flex: 1,
    backgroundColor: grey[400]
  },
  orText: {
    color: grey[400],
    margin: "0 12px"
  },
  separator: {
    width: "100%",
    display: "flex",
    alignItems: "center"
  },
  socialSignUpForm: {
    paddingBottom: 12
  },
  wrapper: {
    backgroundColor: grey[100]
  }
});

type Props = {
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
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <div className={classes.marketingSplurg}>
            <div className={classes.headlineDesktop}>
              <h1 className={classes.headlineLine1}>
                Manage your
                <div className="fadeIn">
                  <span>school's</span>
                  <span>team's</span>
                  <span>own</span>
                  <span>kid's</span>
                  <span>club's</span>
                </div>
              </h1>
              <h1 className={classes.headlineLine2}>sports the easy way</h1>
            </div>
            <div className={classes.headlineMobile}>
              <h1 className={classes.headlineMobileText}>
                Manage your sports the easy way
              </h1>
            </div>
            <h3>
              Schedule events, log fixture results, track work hours and keep
              everyone on the same page at all times.
            </h3>
            <div className={classes.socialSignUpForm}>
              <Button type="google" fullWidth>
                Sign up free with Google
              </Button>
              <Button type="facebook" fullWidth>
                Sign up free with Facebook
              </Button>
            </div>
            <div className={classes.separator}>
              <div className={classes.orLine} />
              <div className={classes.orText}>Or</div>
              <div className={classes.orLine} />
            </div>
            <form className={classes.emailForm}>
              <input
                type="email"
                id="newemail"
                name="email"
                placeholder="Email"
              />
              <div className={classes.formButtonMargin}>
                <Button colour="primary" filled fullWidth>
                  Sign up for free
                </Button>
              </div>
            </form>
            <div className={classes.loginTextWrapper}>
              <span className={classes.loginText}>
                Already have an account?{" "}
                <a href="/home" className={classes.loginLink}>
                  Log in
                </a>
              </span>
            </div>
          </div>
          <div className={classes.bannerImage} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Banner);
