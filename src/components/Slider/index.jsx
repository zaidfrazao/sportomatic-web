import React, { Component } from "react";
import injectSheet from "react-jss";
import { common, grey } from "../../utils/colours";

const styles = theme => ({
  slider: {
    borderRadius: 16,
    appearance: "none",
    width: "100%",
    height: 25,
    backgroundColor: grey[400],
    outline: "none",
    opacity: 0.7,
    transition: "opacity .2s",
    "&::-webkit-slider-thumb": {
      appearance: "none",
      width: 25,
      height: 25,
      borderRadius: 16,
      backgroundColor: common["black"],
      cursor: "pointer"
    },
    "&:hover": {
      opacity: 1
    }
  },
  sliderDisabled: {
    borderRadius: 16,
    appearance: "none",
    width: "100%",
    height: 25,
    backgroundColor: grey[300],
    outline: "none",
    opacity: 0.7,
    transition: "opacity .2s",
    "&::-webkit-slider-thumb": {
      appearance: "none",
      width: 25,
      height: 25,
      borderRadius: 16,
      backgroundColor: grey[400],
      cursor: "not-allowed"
    },
    "&:hover": {
      opacity: 1
    }
  },
  wrapper: {
    width: "100%"
  }
});

class Slider extends Component {
  static defaultProps = {
    disabled: false
  };

  render() {
    const { classes, min, max, value, disabled, handleChange } = this.props;

    return (
      <div className={classes.wrapper}>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={e => {
            !disabled && handleChange(e.target.value);
          }}
          className={disabled ? classes.sliderDisabled : classes.slider}
        />
      </div>
    );
  }
}

export default injectSheet(styles)(Slider);