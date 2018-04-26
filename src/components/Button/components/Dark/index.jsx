import React, { Component } from "react";
import _ from "lodash";
import injectSheet from "react-jss";
import { common, lightBlue, orange } from "../../../../utils/colours";

const styles = theme => ({
  fullWidth: {
    width: "100%"
  },
  normal: {
    padding: "14px 20px",
    borderRadius: 4,
    cursor: "pointer"
  },
  primaryFilled: {
    color: common["white"],
    backgroundColor: lightBlue[900],
    border: `2px solid ${lightBlue[900]}`,
    "&:hover": {
      border: `2px solid ${lightBlue[800]}`,
      backgroundColor: lightBlue[800]
    }
  },
  primaryOutlined: {
    color: lightBlue[900],
    backgroundColor: "rgba(0, 0, 0, 0)",
    border: `2px solid ${lightBlue[900]}`,
    "&:hover": {
      backgroundColor: lightBlue[50]
    }
  },
  secondaryFilled: {
    color: common["white"],
    backgroundColor: orange["A700"],
    border: `2px solid ${orange["A700"]}`,
    "&:hover": {
      border: `2px solid ${orange["A400"]}`,
      backgroundColor: orange["A400"]
    }
  },
  secondaryOutlined: {
    color: orange["A700"],
    backgroundColor: "rgba(0, 0, 0, 0)",
    border: `2px solid ${orange["A700"]}`,
    "&:hover": {
      backgroundColor: orange[50]
    }
  },
  slim: {
    padding: "8px 14px",
    borderRadius: 4,
    cursor: "pointer"
  },
  spinner: {
    marginRight: 8
  }
});

type Props = {
  actions: {
    handleClick: () => null
  },
  loading: boolean,
  colour: string,
  filled: boolean,
  fullWidth: boolean,
  slim: boolean
};

class Dark extends Component<Props> {
  static defaultProps = {
    actions: {
      handleClick: () => console.log("A button was clicked")
    },
    loading: false,
    colour: "primary",
    filled: false,
    fullWidth: false,
    slim: false
  };

  handleSubmit(e) {
    const { handleClick } = this.props.actions;
    e.preventDefault();
    handleClick();
  }

  getStyles() {
    const { classes, filled, colour, slim, fullWidth } = this.props;

    let styles = [];
    slim ? styles.push(classes.slim) : styles.push(classes.normal);
    colour === "primary" && filled && styles.push(classes.primaryFilled);
    colour === "primary" && !filled && styles.push(classes.primaryOutlined);
    colour === "secondary" && filled && styles.push(classes.secondaryFilled);
    colour === "secondary" && !filled && styles.push(classes.secondaryOutlined);
    fullWidth && styles.push(classes.fullWidth);

    return _.join(styles, " ");
  }

  getText() {
    const { classes, children, loading } = this.props;

    if (loading) {
      return (
        <span>
          <i
            className={`fas fa-circle-notch fa-spin ${classes.spinner}`}
          />Loading
        </span>
      );
    } else {
      return children;
    }
  }

  render() {
    const { loading } = this.props;
    const buttonStyles = this.getStyles();
    const buttonText = this.getText();

    return (
      <button
        onClick={e => this.handleSubmit(e)}
        disabled={loading}
        className={buttonStyles}
      >
        {buttonText}
      </button>
    );
  }
}

export default injectSheet(styles)(Dark);
