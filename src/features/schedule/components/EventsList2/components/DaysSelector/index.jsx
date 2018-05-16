import React, { Component } from "react";
import injectStyles from "react-jss";
import Button from "../../../../../../components/Button";

const styles = {
  buttonDate: {
    flexGrow: 1,
    padding: "0 12px"
  },
  wrapper: {
    display: "flex"
  }
};

class DaysSelector extends Component {
  render() {
    const {
      classes,
      isPrevDisabled,
      dateDisplay,
      toggleDateSelector,
      handleNext,
      handlePrev
    } = this.props;

    return (
      <div className={classes.wrapper}>
        <div className={classes.buttonNavigation}>
          <Button
            disabled={isPrevDisabled}
            fullWidth
            filled
            handleClick={() => handlePrev()}
          >
            <i className="fas fa-arrow-left" />
          </Button>
        </div>
        <div className={classes.buttonDate}>
          <Button fullWidth filled handleClick={() => toggleDateSelector()}>
            {dateDisplay}
          </Button>
        </div>
        <div className={classes.buttonNavigation}>
          <Button fullWidth filled handleClick={() => handleNext()}>
            <i className="fas fa-arrow-right" />
          </Button>
        </div>
      </div>
    );
  }
}

export default injectStyles(styles)(DaysSelector);
