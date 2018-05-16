import React, { Component } from "react";
import Calendar from "react-calendar";
import Dialog, { DialogContent } from "material-ui/Dialog";
import injectSheet from "react-jss";
import Button from "../../../../../../components/Button";

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

class DateSelector extends Component {
  render() {
    const {
      classes,
      isOpen,
      isMobile,
      dateSelected,
      minDate,
      closeDialog,
      updateDateSelected
    } = this.props;

    return (
      <Dialog open={isOpen} fullScreen={isMobile}>
        <DialogContent className={classes.wrapper}>
          <div className={classes.headingMain}>Select date</div>
          <div>
            <Calendar
              className={classes.calendarWrapper}
              tileClassName={classes.calendarItemSelected}
              value={dateSelected}
              minDate={minDate}
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

export default injectSheet(styles)(DateSelector);
