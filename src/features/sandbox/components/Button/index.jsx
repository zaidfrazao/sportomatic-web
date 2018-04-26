import React, { Component } from "react";
import _ from "lodash";
import { blue, grey, lightBlue, orange } from "material-ui/colors";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  buttonNormal: {
    padding: "14px 20px",
    borderRadius: 4,
    cursor: "pointer"
  },
  buttonSlim: {
    padding: "8px 14px",
    borderRadius: 4,
    cursor: "pointer"
  },
  darkButton: {
    backgroundColor: grey[900],
    color: "white",
    padding: "14px 20px",
    margin: "8px 0",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: grey[800]
    }
  },
  facebookButton: {
    backgroundColor: blue[900],
    color: "white",
    padding: "14px 20px",
    margin: "8px 0",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: blue[800]
    }
  },
  fullWidth: {
    width: "100%"
  },
  googleButton: {
    backgroundColor: orange[900],
    color: "white",
    padding: "14px 20px",
    margin: "8px 0",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: orange[800]
    }
  },
  lightButton: {
    backgroundColor: orange[900],
    color: "white",
    padding: "14px 20px",
    margin: "8px 0",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: grey[800]
    }
  },
  primaryFilled: {
    color: "white",
    backgroundColor: lightBlue[500],
    border: `2px solid ${lightBlue[500]}`,
    "&:hover": {
      border: `2px solid ${lightBlue[400]}`,
      backgroundColor: lightBlue[400]
    }
  },
  primaryOutlined: {
    color: lightBlue[500],
    backgroundColor: "rgba(0, 0, 0, 0)",
    border: `2px solid ${lightBlue[500]}`,
    "&:hover": {
      backgroundColor: lightBlue[50]
    }
  },
  secondaryFilled: {
    color: "white",
    backgroundColor: orange["A400"],
    border: `2px solid ${orange["A400"]}`,
    "&:hover": {
      border: `2px solid ${orange["A200"]}`,
      backgroundColor: orange["A200"]
    }
  },
  secondaryOutlined: {
    color: orange["A400"],
    backgroundColor: "rgba(0, 0, 0, 0)",
    border: `2px solid ${orange["A400"]}`,
    "&:hover": {
      backgroundColor: orange[50]
    }
  }
});

type Props = {
  actions: {
    handleClick: () => null
  },
  classes: {
    buttonNormal: string,
    buttonSlim: string,
    facebookButton: string,
    fullWidth: string,
    googleButton: string,
    primaryFilled: string,
    primaryOutlined: string,
    secondaryFilled: string,
    secondaryOutlined: string
  },
  colour: string,
  filled: boolean,
  fullWidth: boolean,
  slim: boolean,
  type: string
};

class Button extends Component<Props> {
  static defaultProps = {
    actions: {
      handleClick: () => console.log("A button was clicked")
    },
    filled: false,
    fullWidth: false,
    slim: false,
    type: "default"
  };

  getDefaultButton(colour, isFilled, isFullWidth, isSlim) {
    const { classes, children } = this.props;
    const { handleClick } = this.props.actions;

    let styles = [];
    isSlim
      ? styles.push(classes.buttonSlim)
      : styles.push(classes.buttonNormal);
    colour === "primary" && isFilled && styles.push(classes.primaryFilled);
    colour === "primary" && !isFilled && styles.push(classes.primaryOutlined);
    colour === "secondary" && isFilled && styles.push(classes.secondaryFilled);
    colour === "secondary" &&
      !isFilled &&
      styles.push(classes.secondaryOutlined);
    isFullWidth && styles.push(classes.fullWidth);

    return (
      <button onClick={() => handleClick()} className={_.join(styles, " ")}>
        {children}
      </button>
    );
  }

  getFacebookButton(isFullWidth) {
    const { classes, children } = this.props;
    const { handleClick } = this.props.actions;

    let styles = [classes.facebookButton];
    isFullWidth && styles.push(classes.fullWidth);

    return (
      <button onClick={() => handleClick()} className={_.join(styles, " ")}>
        <i className="fab fa-facebook" /> {children}
      </button>
    );
  }

  getGoogleButton(isFullWidth) {
    const { classes, children } = this.props;
    const { handleClick } = this.props.actions;

    let styles = [classes.googleButton];
    isFullWidth && styles.push(classes.fullWidth);

    return (
      <button onClick={() => handleClick()} className={_.join(styles, " ")}>
        <i className="fab fa-google" /> {children}
      </button>
    );
  }

  getLightButton(isFullWidth) {
    const { classes, children } = this.props;
    const { handleClick } = this.props.actions;

    let styles = [classes.lightButton];
    isFullWidth && styles.push(classes.fullWidth);

    return (
      <button onClick={() => handleClick()} className={_.join(styles, " ")}>
        {children}
      </button>
    );
  }

  getDarkButton(isFullWidth) {
    const { classes, children } = this.props;
    const { handleClick } = this.props.actions;

    let styles = [classes.darkButton];
    isFullWidth && styles.push(classes.fullWidth);

    return (
      <button onClick={() => handleClick()} className={_.join(styles, " ")}>
        {children}
      </button>
    );
  }

  render() {
    const { colour, filled, fullWidth, slim, type } = this.props;

    switch (type) {
      case "facebook":
        return this.getFacebookButton(fullWidth);
      case "google":
        return this.getGoogleButton(fullWidth);
      case "light":
        return this.getLightButton(fullWidth);
      case "dark":
        return this.getDarkButton(fullWidth);
      default:
        return this.getDefaultButton(colour, filled, fullWidth, slim);
    }
  }
}

export default withStyles(styles)(Button);