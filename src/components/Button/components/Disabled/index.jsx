import React, { Component } from "react";
import _ from "lodash";
import injectSheet from "react-jss";
import { grey } from "../../../../utils/colours";

const styles = theme => ({
  filled: {
    color: grey[200],
    backgroundColor: grey[400],
    border: `2px solid ${grey[400]}`
  },
  fullWidth: {
    width: "100%"
  },
  normal: {
    padding: "14px 20px",
    borderRadius: 4,
    cursor: "not-allowed"
  },
  outlined: {
    color: grey[400],
    backgroundColor: "rgba(0, 0, 0, 0)",
    border: `2px solid ${grey[400]}`
  },
  slim: {
    padding: "8px 14px",
    borderRadius: 4,
    cursor: "not-allowed"
  }
});

type Props = {
  filled: boolean,
  fullWidth: boolean,
  slim: boolean
};

class Disabled extends Component<Props> {
  static defaultProps = {
    colour: "primary",
    filled: false,
    fullWidth: false,
    slim: false
  };

  getStyles() {
    const { classes, filled, slim, fullWidth } = this.props;

    let styles = [];
    slim ? styles.push(classes.slim) : styles.push(classes.normal);
    filled && styles.push(classes.filled);
    !filled && styles.push(classes.outlined);
    fullWidth && styles.push(classes.fullWidth);

    return _.join(styles, " ");
  }

  render() {
    const { children } = this.props;
    const buttonStyles = this.getStyles();

    return (
      <button disabled className={buttonStyles}>
        {children}
      </button>
    );
  }
}

export default injectSheet(styles)(Disabled);
