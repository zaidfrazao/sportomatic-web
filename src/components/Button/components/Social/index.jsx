import React, { Component } from "react";
import _ from "lodash";
import injectSheet from "react-jss";
import { common, blue, orange } from "../../../../utils/colours";

const styles = theme => ({
  facebookFilled: {
    color: common["white"],
    backgroundColor: blue[900],
    border: `2px solid ${blue[900]}`,
    "&:hover": {
      border: `2px solid ${blue[800]}`,
      backgroundColor: blue[800]
    }
  },
  facebookOutlined: {
    color: blue[900],
    backgroundColor: "rgba(0, 0, 0, 0)",
    border: `2px solid ${blue[900]}`,
    "&:hover": {
      backgroundColor: blue[50]
    }
  },
  fullWidth: {
    width: "100%"
  },
  googleFilled: {
    color: common["white"],
    backgroundColor: orange[900],
    border: `2px solid ${orange[900]}`,
    "&:hover": {
      border: `2px solid ${orange[800]}`,
      backgroundColor: orange[800]
    }
  },
  googleOutlined: {
    color: orange[900],
    backgroundColor: "rgba(0, 0, 0, 0)",
    border: `2px solid ${orange[900]}`,
    "&:hover": {
      backgroundColor: orange[50]
    }
  },
  icon: {
    fontSize: 18,
    marginRight: 8
  },
  normal: {
    padding: "14px 20px",
    borderRadius: 4,
    cursor: "pointer"
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
  type: string,
  filled: boolean,
  fullWidth: boolean,
  slim: boolean
};

class Social extends Component<Props> {
  static defaultProps = {
    actions: {
      handleClick: () => console.log("A button was clicked")
    },
    loading: false,
    type: "facebook",
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
    const { classes, filled, type, slim, fullWidth } = this.props;

    let styles = [];
    slim ? styles.push(classes.slim) : styles.push(classes.normal);
    type === "facebook" && filled && styles.push(classes.facebookFilled);
    type === "facebook" && !filled && styles.push(classes.facebookOutlined);
    type === "google" && filled && styles.push(classes.googleFilled);
    type === "google" && !filled && styles.push(classes.googleOutlined);
    fullWidth && styles.push(classes.fullWidth);

    return _.join(styles, " ");
  }

  getText() {
    const { classes, children, loading, type } = this.props;

    if (loading) {
      return (
        <span>
          <i
            className={`fas fa-circle-notch fa-spin ${classes.spinner}`}
          />Loading
        </span>
      );
    } else {
      return (
        <span>
          <i className={`fab fa-${type} ${classes.icon}`} /> {children}
        </span>
      );
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

export default injectSheet(styles)(Social);
