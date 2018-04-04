import React, { Component } from "react";
import { grey } from "material-ui/colors";
import { withStyles } from "material-ui/styles";
import Button from "../Button";
import features from "./features.json";

const styles = theme => ({
  bodyText: {
    fontWeight: "normal",
    color: grey[900]
  },
  buttonWrapper: {
    "@media (max-width: 800px)": {
      width: "100%",
      textAlign: "center"
    }
  },
  darkSection: {
    padding: "120px 0",
    backgroundColor: grey[100]
  },
  featureWrapper: {
    maxWidth: 1080,
    margin: "0 auto",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center"
  },
  image: {
    width: "calc(100% - 48px)",
    maxWidth: 520,
    height: "auto",
    margin: 48,
    "@media (max-width: 800px)": {
      width: "100%"
    }
  },
  imageWrapperDark: {
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
  imageWrapperLight: {
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
  lightSection: {
    padding: "120px 0",
    backgroundColor: "white"
  },
  textWrapper: {
    flex: 1,
    margin: "0 54px",
    order: 2
  }
});

type Props = {
  actions: {
    goToSignUp: () => null
  },
  classes: {
    bodyText: string,
    buttonWrapper: string,
    darkSection: string,
    featureWrapper: string,
    image: string,
    imageWrapperDark: string,
    imageWrapperLight: string,
    lightSection: string,
    textWrapper: string
  },
  index: number
};

class Features extends Component<Props> {
  static defaultProps = {
    actions: {
      goToSignUp: () => console.log("User clicked to sign up")
    },
    index: 0
  };

  getRoleCode(index) {
    const codes = [
      "sports-director",
      "team-manager",
      "coach",
      "athlete",
      "parent",
      "supporter"
    ];

    return codes[index];
  }

  getFeatureExplanations(roleSelected) {
    return features[roleSelected];
  }

  render() {
    const { classes, roleIndex } = this.props;
    const { goToSignUp } = this.props.actions;

    const roleCode = this.getRoleCode(roleIndex);
    const features = this.getFeatureExplanations(roleCode);

    return features.map((copy, index) => {
      if (index % 2 === 0) {
        return (
          <div
            key={`feature-${roleCode}-${index}`}
            className={classes.lightSection}
          >
            <div className={classes.featureWrapper}>
              <div className={classes.textWrapper}>
                <h2>{copy.headline}</h2>
                <p className={classes.bodyText}>{copy.body}</p>
                <div className={classes.buttonWrapper}>
                  <Button
                    colour="primary"
                    filled
                    actions={{
                      handleClick: () => goToSignUp()
                    }}
                  >
                    Sign up for free
                  </Button>
                </div>
              </div>
              <div className={classes.imageWrapperLight}>
                <img
                  src={copy.imageURL}
                  alt={copy.imageAlt}
                  className={classes.image}
                />
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div
            key={`feature-${roleCode}-${index}`}
            className={classes.darkSection}
          >
            <div className={classes.featureWrapper}>
              <div className={classes.imageWrapperDark}>
                <img
                  src={copy.imageURL}
                  alt={copy.imageAlt}
                  className={classes.image}
                />
              </div>
              <div className={classes.textWrapper}>
                <h2>{copy.headline}</h2>
                <p className={classes.bodyText}>{copy.body}</p>
                <div className={classes.buttonWrapper}>
                  <Button
                    colour="primary"
                    filled
                    actions={{
                      handleClick: () => goToSignUp()
                    }}
                  >
                    Sign up for free
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      }
    });
  }
}

export default withStyles(styles)(Features);
