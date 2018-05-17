import React, { Component } from "react";
import Calendar from "react-calendar";
import injectSheet from "react-jss";
import Button from "../../../../../../components/Button";
import Dialog from "../../../../../../components/Dialog";

const styles = {
  calendarWrapper: {
    width: "100%"
  }
};

class DateSelector extends Component {
  render() {
    const {
      classes,
      isOpen,
      dateSelected,
      minDate,
      closeDialog,
      updateDateSelected
    } = this.props;

    const actions = [
      <Button colour="primary" slim handleClick={() => closeDialog()}>
        Cancel
      </Button>
    ];

    return (
      <Dialog isOpen={isOpen} actions={actions} heading="Select Date">
        <Calendar
          className={classes.calendarWrapper}
          tileClassName={classes.calendarItemSelected}
          value={dateSelected}
          minDate={minDate}
          onChange={newDate => updateDateSelected(newDate)}
        />
      </Dialog>
    );
  }
}

export default injectSheet(styles)(DateSelector);
