import React, { Component } from "react";
import { grey, lightBlue, orange } from "material-ui/colors";
import { withStyles } from "material-ui/styles";
import Button from "./components/Button";
import AppBarButton from "./components/AppBarButton";
import FacebookButton from "./components/FacebookButton";
import FormInputButton from "./components/FormInputButton";
import GoogleButton from "./components/GoogleButton";
import adminAvatar from "./images/admin-avatar.jpg";
import athleteAvatar from "./images/athlete-avatar.jpg";
import bannerImage from "./images/banner-image.png";
import coachAvatar from "./images/coach-avatar.jpg";
import logo from "./images/logo.png";
import managerAvatar from "./images/manager-avatar.jpg";
import parentAvatar from "./images/parent-avatar.jpg";
import supporterAvatar from "./images/supporter-avatar.jpg";

const styles = theme => ({
  appbar: {
    padding: "0 32px",
    backgroundColor: grey[50]
  },
  appbarContent: {
    padding: "12px 0",
    display: "flex",
    alignItems: "center"
  },
  avatar: {
    borderRadius: "50%",
    backgroundColor: "white",
    border: "4px solid white",
    marginBottom: 12
  },
  avatarTitle: {
    fontWeight: "bold",
    fontSize: 28,
    textAlign: "center",
    padding: 8
  },
  avatarWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    top: "75%",
    width: 600,
    left: "calc(50% - 300px)",
    "@media (max-width: 700px)": {
      top: "80%",
      width: 400,
      left: "calc(50% - 200px)"
    },
    "@media (max-width: 450px)": {
      top: "85%",
      width: 300,
      left: "calc(50% - 150px)"
    }
  },
  banner: {
    backgroundColor: grey[100]
  },
  bannerContent: {
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
  bannerText: {
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
  copyrightText: {
    flexGrow: 1,
    fontSize: 16,
    margin: "12px 0",
    color: grey[500],
    "@media (max-width: 800px)": {
      width: "100%",
      textAlign: "center"
    }
  },
  emailForm: {
    paddingTop: 12
  },
  featureButtonWrapper: {
    "@media (max-width: 800px)": {
      width: "100%",
      textAlign: "center"
    }
  },
  featureDark: {
    padding: "120px 0",
    backgroundColor: grey[100]
  },
  featureLight: {
    padding: "120px 0",
    backgroundColor: "white"
  },
  featureImage: {
    width: "calc(100% - 48px)",
    maxWidth: 520,
    height: "auto",
    margin: 48,
    "@media (max-width: 800px)": {
      width: "100%"
    }
  },
  featureImageWrapperLight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "50%",
    order: 1,
    "@media (max-width: 580px)": {
      display: "none"
    },
    "@media (max-width: 800px)": {
      width: "100%"
    }
  },
  featureImageWrapperDark: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "50%",
    order: 3,
    "@media (max-width: 580px)": {
      display: "none"
    },
    "@media (max-width: 800px)": {
      order: 1,
      width: "100%"
    }
  },
  featureText: {
    fontWeight: "normal",
    color: grey[900]
  },
  featureTextWrapper: {
    flex: 1,
    margin: "0 54px",
    order: 2
  },
  featureWrapper: {
    maxWidth: 1080,
    margin: "0 auto",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center"
  },
  flex: {
    flex: 1
  },
  footer: {
    padding: "0 32px",
    backgroundColor: grey[50]
  },
  footerContent: {
    padding: "24px 0",
    maxWidth: 1080,
    margin: "0 auto",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center"
  },
  headline: {
    margin: 0,
    "@media (max-width: 480px)": {
      fontSize: 32,
      lineHeight: "46px"
    }
  },
  headline2: {
    margin: "0 0 23px 0",
    "@media (max-width: 480px)": {
      margin: 0,
      fontSize: 32,
      lineHeight: "46px"
    }
  },
  headline3: {
    margin: "0 0 23px 0",
    "@media (max-width: 480px)": {
      fontSize: 32,
      lineHeight: "46px"
    }
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
  legalStuffLink: {
    width: 120,
    color: lightBlue[500],
    textDecoration: "none",
    fontWeight: "bold",
    margin: "12px 0",
    "&:hover": {
      color: lightBlue[700],
      cursor: "pointer"
    }
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
    textAlign: "center"
  },
  logoWrapper: {
    backgroundImage: `url(${logo})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: 160,
    height: 30
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
  peopleContent: {
    padding: "160px 0 180px 0",
    maxWidth: 800,
    margin: "0 auto"
  },
  peopleHeadline: {
    color: "white",
    width: "100%",
    textAlign: "center"
  },
  peopleSplurg: {
    color: grey[100],
    maxWidth: 640,
    margin: "0 auto 28px auto"
  },
  peopleWrapper: {
    padding: "0 54px",
    background: `linear-gradient(${lightBlue[200]}, ${lightBlue[500]})`,
    position: "relative"
  },
  privacyPolicyLink: {
    width: 120,
    color: lightBlue[500],
    textDecoration: "none",
    fontWeight: "bold",
    margin: "12px 0",
    "&:hover": {
      color: lightBlue[700],
      cursor: "pointer"
    }
  },
  roleBuffer: {
    height: 160,
    backgroundColor: "white"
  },
  roleSwitchButton: {
    fontWeight: "bold",
    fontSize: 28,
    padding: "8px 14px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: grey[200]
    }
  },
  roleSwitchWrapper: {
    display: "flex",
    alignItems: "center"
  },
  separator: {
    width: "100%",
    display: "flex",
    alignItems: "center"
  },
  signUpButton: {
    display: "inline-block",
    "@media (max-width: 600px)": {
      display: "none"
    }
  },
  socialSignUpForm: {
    paddingBottom: 12
  }
});

class SignInLayout extends Component {
  state = {
    roleSelected: 0
  };

  handleNextRole() {
    let nextRole = this.state.roleSelected + 1;

    if (nextRole > 5) {
      nextRole = 0;
    }

    this.setState({
      roleSelected: nextRole
    });
  }

  handlePrevRole() {
    let prevRole = this.state.roleSelected - 1;

    if (prevRole < 0) {
      prevRole = 5;
    }

    this.setState({
      roleSelected: prevRole
    });
  }

  render() {
    const { classes } = this.props;

    let avatarImage = adminAvatar;
    let roleName = "Sports Director";

    switch (this.state.roleSelected) {
      case 0:
        avatarImage = adminAvatar;
        roleName = "Sports Director";
        break;
      case 1:
        avatarImage = managerAvatar;
        roleName = "Team Manager";
        break;
      case 2:
        avatarImage = coachAvatar;
        roleName = "Coach";
        break;
      case 3:
        avatarImage = athleteAvatar;
        roleName = "Athlete";
        break;
      case 4:
        avatarImage = parentAvatar;
        roleName = "Parent";
        break;
      case 5:
        avatarImage = supporterAvatar;
        roleName = "Supporter";
        break;
      default:
        avatarImage = adminAvatar;
        roleName = "Sports Director";
        break;
    }

    return (
      <div className={classes.wrapper}>
        <div className={classes.appbar}>
          <div className={classes.appbarContent}>
            <div className={classes.logoWrapper} />
            <div className={classes.flex} />
            <div className={classes.appbarButtonsWrapper}>
              <AppBarButton type="login" />
              <div className={classes.signUpButton}>
                <AppBarButton type="signup" />
              </div>
            </div>
          </div>
        </div>
        <div className={classes.banner}>
          <div className={classes.bannerContent}>
            <div className={classes.bannerText}>
              <div className={classes.headlineDesktop}>
                <h1 className={classes.headline}>
                  Manage your
                  <div className="fadeIn">
                    <span>school's</span>
                    <span>team's</span>
                    <span>own</span>
                    <span>kid's</span>
                    <span>club's</span>
                  </div>
                </h1>
                <h1 className={classes.headline2}>sports the easy way</h1>
              </div>
              <div className={classes.headlineMobile}>
                <h1 className={classes.headline}>Manage your </h1>
                <h1 className={classes.headline2}>
                  <div className="fadeIn">
                    <span>school's</span>
                    <span>team's</span>
                    <span>own</span>
                    <span>kid's</span>
                    <span>club's</span>
                  </div>
                  sports
                </h1>
                <h1 className={classes.headline3}>the easy way</h1>
              </div>
              <h3>
                Schedule events, log fixture results, track work hours and keep
                everyone on the same page at all times.
              </h3>
              <div className={classes.socialSignUpForm}>
                <GoogleButton />
                <FacebookButton />
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
                <FormInputButton text="Sign up for free" />
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
        <div className={classes.peopleWrapper}>
          <div className={classes.peopleContent}>
            <h1 className={classes.peopleHeadline}>
              Connect Your Sports Community
            </h1>
            <p className={classes.peopleSplurg}>
              Sportomatic is a system built to allow everyone involved in sports
              within a community to interact in sensible ways. Sports directors,
              team managers, coaches, athletes, parents and supporters each get
              functionality to suite their needs.
            </p>
            <div className={classes.avatarWrapper}>
              <img
                className={classes.avatar}
                src={avatarImage}
                width={240}
                height={240}
                alt={roleName}
              />
              <div className={classes.roleSwitchWrapper}>
                <span
                  className={classes.roleSwitchButton}
                  onClick={() => this.handlePrevRole()}
                >
                  <i className="fas fa-angle-left" />
                </span>
                <span className={classes.avatarTitle}>{roleName}</span>
                <span
                  className={classes.roleSwitchButton}
                  onClick={() => this.handleNextRole()}
                >
                  <i className="fas fa-angle-right" />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.roleBuffer} />
        <div className={classes.featureLight}>
          <div className={classes.featureWrapper}>
            <div className={classes.featureTextWrapper}>
              <h2>Lorem ipsum dolor sit amet</h2>
              <p className={classes.featureText}>
                Vestibulum non tempor dui. Nullam lobortis, odio at commodo
                convallis, magna erat mattis lorem, et commodo enim risus id
                erat. Nam pharetra justo dictum accumsan posuere. Vestibulum et
                tristique ligula. Aenean sit amet erat sagittis, tincidunt
                sapien non, laoreet purus. Donec dapibus id ex ac rhoncus.
              </p>
              <div className={classes.featureButtonWrapper}>
                <Button color="secondary">Sign up for free</Button>
              </div>
            </div>
            <div className={classes.featureImageWrapperLight}>
              <img
                src="http://via.placeholder.com/520x360"
                alt="Placeholder"
                className={classes.featureImage}
              />
            </div>
          </div>
        </div>
        <div className={classes.featureDark}>
          <div className={classes.featureWrapper}>
            <div className={classes.featureImageWrapperDark}>
              <img
                src="http://via.placeholder.com/520x360"
                alt="Placeholder"
                className={classes.featureImage}
              />
            </div>
            <div className={classes.featureTextWrapper}>
              <h2>Lorem ipsum dolor sit amet</h2>
              <p className={classes.featureText}>
                Vestibulum non tempor dui. Nullam lobortis, odio at commodo
                convallis, magna erat mattis lorem, et commodo enim risus id
                erat. Nam pharetra justo dictum accumsan posuere. Vestibulum et
                tristique ligula.
              </p>
              <div className={classes.featureButtonWrapper}>
                <Button color="secondary">Sign up for free</Button>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.featureLight}>
          <div className={classes.featureWrapper}>
            <div className={classes.featureTextWrapper}>
              <h2>Lorem ipsum dolor sit amet</h2>
              <p className={classes.featureText}>
                Vestibulum non tempor dui. Nullam lobortis, odio at commodo
                convallis, magna erat mattis lorem, et commodo enim risus id
                erat. Nam pharetra justo dictum accumsan posuere. Vestibulum et
                tristique ligula. Aenean sit amet erat sagittis, tincidunt
                sapien non, laoreet purus. Donec dapibus id ex ac rhoncus.
              </p>
              <div className={classes.featureButtonWrapper}>
                <Button color="secondary">Sign up for free</Button>
              </div>
            </div>
            <div className={classes.featureImageWrapperLight}>
              <img
                src="http://via.placeholder.com/520x360"
                alt="Placeholder"
                className={classes.featureImage}
              />
            </div>
          </div>
        </div>
        <div className={classes.featureDark}>
          <div className={classes.featureWrapper}>
            <div className={classes.featureImageWrapperDark}>
              <img
                src="http://via.placeholder.com/520x360"
                alt="Placeholder"
                className={classes.featureImage}
              />
            </div>
            <div className={classes.featureTextWrapper}>
              <h2>Lorem ipsum dolor sit amet</h2>
              <p className={classes.featureText}>
                Vestibulum non tempor dui. Nullam lobortis, odio at commodo
                convallis, magna erat mattis lorem, et commodo enim risus id
                erat. Nam pharetra justo dictum accumsan posuere. Vestibulum et
                tristique ligula. Aenean sit amet erat sagittis, tincidunt
                sapien non, laoreet purus. Donec dapibus id ex ac rhoncus.
              </p>
              <div className={classes.featureButtonWrapper}>
                <Button color="secondary">Sign up for free</Button>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.footer}>
          <div className={classes.footerContent}>
            <span className={classes.copyrightText}>
              Copyright © 2018 Sportomatic Pty Ltd
            </span>
            <a className={classes.legalStuffLink} href="/terms">
              Legal Stuff
            </a>
            <a className={classes.privacyPolicyLink} href="/privacy-policy">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SignInLayout);
