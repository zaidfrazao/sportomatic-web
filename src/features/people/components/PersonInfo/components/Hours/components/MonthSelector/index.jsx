import React, { Component } from "react";
import Calendar from "react-calendar";
import injectSheet from "react-jss";
import Button from "../../../../../../../../components/Button";
import Dialog from "../../../../../../../../components/Dialog";

const styles = {
  calendarWrapper: {
    width: "100%"
  }
};

class MonthSelector extends Component {
  render() {
    const {
      classes,
      isOpen,
      dateSelected,
      minDate,
      maxDate,
      closeDialog,
      updateDateSelected
    } = this.props;

    const actions = [
      <Button colour="primary" slim handleClick={() => closeDialog()}>
        Cancel
      </Button>
    ];

    return (
      <Dialog isOpen={isOpen} heading="Select Year & Month" actions={actions}>
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
      </Dialog>
    );
  }
}

export default injectSheet(styles)(MonthSelector);
