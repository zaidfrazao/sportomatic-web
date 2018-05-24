import React, { Component } from "react";
import injectStyles from "react-jss";
import Button from "../../../../../../../../components/Button";

const styles = {
  buttonDate: {
    flexGrow: 1,
    padding: "0 12px"
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
      dateDisplay,
      toggleMonthSelector,
      handleNextMonth,
      handlePrevMonth
    } = this.props;

    return (
      <div className={classes.wrapper}>
        <div className={classes.buttonNavigation}>
          <Button
            type="dark"
            disabled={isPrevDisabled}
            fullWidth
            filled
            handleClick={() => handlePrevMonth()}
          >
            <i className="fas fa-arrow-left" />
          </Button>
        </div>
        <div className={classes.buttonDate}>
          <Button
            type="dark"
            fullWidth
            filled
            handleClick={() => toggleMonthSelector()}
          >
            {dateDisplay}
          </Button>
        </div>
        <div className={classes.buttonNavigation}>
          <Button
            type="dark"
            disabled={isNextDisabled}
            fullWidth
            filled
            handleClick={() => handleNextMonth()}
          >
            <i className="fas fa-arrow-right" />
          </Button>
        </div>
      </div>
    );
  }
}

export default injectStyles(styles)(DateSelector);
