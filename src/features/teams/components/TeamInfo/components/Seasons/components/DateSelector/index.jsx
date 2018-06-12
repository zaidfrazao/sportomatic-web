import React, { Component } from "react";
import injectStyles from "react-jss";
import Button from "../../../../../../../../components/Button";
import { common, grey } from "../../../../../../../../utils/colours";

const styles = {
  buttonDate: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    margin: "0 12px",
    flexGrow: 1,
    padding: "14px 20px",
    borderRadius: 16,
    color: grey[800],
    backgroundColor: common["white"],
    border: `1px solid ${grey[300]}`
  },
  wrapper: {
    display: "flex"
  }
};

class DateSelector extends Component {
  render() {
    const {
      classes,
      isPrevDisabled,
      isNextDisabled,
      handleNextSeason,
      handlePrevSeason,
      seasons,
      selectedIndex
    } = this.props;

    return (
      <div className={classes.wrapper}>
        <div className={classes.buttonNavigation}>
          <Button
            disabled={isPrevDisabled}
            type="dark"
            fullWidth
            filled
            handleClick={() => handlePrevSeason()}
          >
            <i className="fas fa-arrow-left" />
          </Button>
        </div>
        <div className={classes.buttonDate}>{`${seasons[selectedIndex].dates
          .start} - ${seasons[selectedIndex].dates.end}`}</div>
        <div className={classes.buttonNavigation}>
          <Button
            type="dark"
            disabled={isNextDisabled}
            fullWidth
            filled
            handleClick={() => handleNextSeason()}
          >
            <i className="fas fa-arrow-right" />
          </Button>
        </div>
      </div>
    );
  }
}

export default injectStyles(styles)(DateSelector);
