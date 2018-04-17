import React, { Component } from "react";
import { green, grey, red, yellow } from "material-ui/colors";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  column: {
    float: "left"
  },
  dot: {
    margin: 2,
    height: 12,
    width: 12,
    backgroundColor: grey[700],
    borderRadius: "50%",
    display: "inline-block"
  },
  floatRight: {
    float: "right"
  },
  frameDark: {
    backgroundColor: grey[200],
    border: `6px solid ${grey[200]}`,
    borderRadius: "6px 6px 0 0",
    minWidth: 400
  },
  frameLight: {
    backgroundColor: "white",
    border: "6px solid white",
    borderRadius: "6px 6px 0 0",
    minWidth: 400
  },
  green: {
    backgroundColor: green[500]
  },
  headerDark: {
    padding: 10,
    backgroundColor: grey[200],
    height: 20
  },
  headerLight: {
    padding: 10,
    backgroundColor: "white",
    height: 20
  },
  inputBox: {
    width: "100%",
    borderRadius: 3,
    border: "none",
    backgroundColor: "white",
    marginTop: -8,
    height: 25,
    color: grey[600],
    padding: 5
  },
  left: {
    width: "15%"
  },
  middle: {
    width: "75%"
  },
  red: {
    backgroundColor: red[500]
  },
  right: {
    width: "10%"
  },
  yellow: {
    backgroundColor: yellow[500]
  }
});

type Props = {
  isLight: boolean
};

class BrowserWindow extends Component<Props> {
  static defaultProps = {
    isLight: false
  };

  render() {
    const { classes, children, isLight } = this.props;

    return (
      <div className={isLight ? classes.frameLight : classes.frameDark}>
        <div className={isLight ? classes.headerLight : classes.headerDark}>
          <div className={`${classes.column} ${classes.left}`}>
            <span className={`${classes.dot} ${classes.red}`} />
            <span className={`${classes.dot} ${classes.yellow}`} />
            <span className={`${classes.dot} ${classes.green}`} />
          </div>
          <div className={`${classes.column} ${classes.middle}`} />
          <div className={`${classes.column} ${classes.right}`} />
        </div>
        {children}
      </div>
    );
  }
}

export default withStyles(styles)(BrowserWindow);
