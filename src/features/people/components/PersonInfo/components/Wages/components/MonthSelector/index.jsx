import React, { Component } from "react";
import Calendar from "react-calendar";
import Dialog, { DialogContent } from "material-ui/Dialog";
import injectSheet from "react-jss";
import Button from "../../../../../../../../components/Button";

const styles = {
  calendarWrapper: {
    margin: 12,
    width: 260
  },
  headingMain: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 24,
    lineHeight: "32px"
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
};

class MonthSelector extends Component {
  render() {
    const {
      classes,
      isOpen,
      isMobile,
      dateSelected,
      minDate,
      maxDate,
      closeDialog,
      updateDateSelected
    } = this.props;

    return (
      <Dialog open={isOpen} fullScreen={isMobile}>
        <DialogContent className={classes.wrapper}>
          <div className={classes.headingMain}>Select year & month</div>
          <div>
            <Calendar
              className={classes.calendarWrapper}
              view="decade"
              tileClassName={classes.calendarItemSelected}
              showNavigation={false}
              maxDetail="year"
              value={dateSelected}
              minDate={minDate}
              maxDate={maxDate}
              onChange={newDate => updateDateSelected(newDate)}
            />
          </div>
          <div className={classes.actionButtonsWrapper}>
            <Button
              colour="primary"
              slim
              fullWidth
              handleClick={() => closeDialog()}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}

export default injectSheet(styles)(MonthSelector);
