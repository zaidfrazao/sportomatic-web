import React, { Component } from "react";
import injectSheet from "react-jss";
import moment from "moment";
import DateSelector from "./components/DateSelector";
import MonthSelector from "./components/MonthSelector";
import HoursTable from "./components/HoursTable";
const styles = {
  separator: {
    height: 12
  },
  wrapper: {
    padding: 24
  }
};

class Hours extends Component {
  state = {
    dateSelectedMoment: moment(new Date(Date.now())),
    isMonthSelectorOpen: false
  };

  toggleMonthSelector() {
    const { isMonthSelectorOpen } = this.state;

    this.setState({
      isMonthSelectorOpen: !isMonthSelectorOpen
    });
  }

  updateDateSelected(newDate) {
    this.setState({
      dateSelectedMoment: moment(newDate)
    });
  }

  prevMonth() {
    const { dateSelectedMoment } = this.state;

    const prevMonth = moment(dateSelectedMoment).subtract(1, "month");

    this.setState({
      dateSelectedMoment: prevMonth
    });
  }

  nextMonth() {
    const { dateSelectedMoment } = this.state;

    const nextMonth = moment(dateSelectedMoment).add(1, "month");

    this.setState({
      dateSelectedMoment: nextMonth
    });
  }

  getDateDisplay() {
    const { isMobile } = this.props;
    const { dateSelectedMoment } = this.state;

    if (isMobile) return dateSelectedMoment.format("MMM YYYY");
    return dateSelectedMoment.format("MMMM YYYY");
  }

  checkIfPrevDisabled() {
    const { institutionCreationDate } = this.props;
    const { dateSelectedMoment } = this.state;

    const institutionCreationMoment = moment(institutionCreationDate);

    if (
      institutionCreationMoment.month() === dateSelectedMoment.month() &&
      institutionCreationMoment.year() === dateSelectedMoment.year()
    ) {
      return true;
    }
    return false;
  }

  checkIfNextDisabled() {
    const { dateSelectedMoment } = this.state;

    const currentMoment = moment(new Date(Date.now()));

    if (
      currentMoment.month() === dateSelectedMoment.month() &&
      currentMoment.year() === dateSelectedMoment.year()
    ) {
      return true;
    }
    return false;
  }

  render() {
    const { classes, institutionCreationDate, isMobile, hours } = this.props;
    const { dateSelectedMoment, isMonthSelectorOpen } = this.state;

    const dateDisplay = this.getDateDisplay();
    const isPrevDisabled = this.checkIfPrevDisabled();
    const isNextDisabled = this.checkIfNextDisabled();

    return (
      <div className={classes.wrapper}>
        <DateSelector
          dateDisplay={dateDisplay}
          isPrevDisabled={isPrevDisabled}
          isNextDisabled={isNextDisabled}
          toggleMonthSelector={() => this.toggleMonthSelector()}
          handlePrevMonth={() => this.prevMonth()}
          handleNextMonth={() => this.nextMonth()}
        />
        <div className={classes.separator} />
        <HoursTable hours={hours} dateSelected={dateSelectedMoment.toDate()} />
        <MonthSelector
          isMobile={isMobile}
          isOpen={isMonthSelectorOpen}
          minDate={institutionCreationDate}
          maxDate={new Date(Date.now())}
          dateSelected={dateSelectedMoment.toDate()}
          updateDateSelected={newDate => {
            this.updateDateSelected(newDate);
            this.toggleMonthSelector();
          }}
          closeDialog={() => this.toggleMonthSelector()}
        />
      </div>
    );
  }
}

export default injectSheet(styles)(Hours);
