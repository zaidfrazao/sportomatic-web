import React, { Component } from "react";
import injectSheet from "react-jss";
import moment from "moment";
import DateSelector from "./components/DateSelector";
import DaysSelector from "./components/DaysSelector";
import ListOfEvents from "./components/ListOfEvents";

const styles = {
  separator: {
    height: 12
  },
  wrapper: {
    padding: 24
  }
};

class EventsList extends Component {
  state = {
    isDateSelectorOpen: false
  };

  toggleDateSelector() {
    const { isDateSelectorOpen } = this.state;

    this.setState({
      isDateSelectorOpen: !isDateSelectorOpen
    });
  }

  updateDateSelected(newDate) {
    const { navigateTo } = this.props;

    const dateSelectedString = moment(newDate).format("YYYY-MM-DD");

    navigateTo(`/myaccount/schedule/${dateSelectedString}`);
  }

  prevWeek() {
    const { dateSelectedString, navigateTo } = this.props;

    const prevWeekString = moment(dateSelectedString, "YYYY-MM-DD")
      .subtract(1, "week")
      .startOf("week")
      .format("YYYY-MM-DD");

    navigateTo(`/myaccount/schedule/${prevWeekString}`);
  }

  nextWeek() {
    const { dateSelectedString, navigateTo } = this.props;

    const nextWeekString = moment(dateSelectedString, "YYYY-MM-DD")
      .add(1, "week")
      .endOf("week")
      .format("YYYY-MM-DD");

    navigateTo(`/myaccount/schedule/${nextWeekString}`);
  }

  prevDay() {
    const { dateSelectedString, navigateTo } = this.props;

    const prevDayString = moment(dateSelectedString, "YYYY-MM-DD")
      .subtract(1, "day")
      .format("YYYY-MM-DD");

    navigateTo(`/myaccount/schedule/${prevDayString}`);
  }

  nextDay() {
    const { dateSelectedString, navigateTo } = this.props;

    const nextDayString = moment(dateSelectedString, "YYYY-MM-DD")
      .add(1, "day")
      .format("YYYY-MM-DD");

    navigateTo(`/myaccount/schedule/${nextDayString}`);
  }

  getDateDisplay() {
    const { isTablet, dateSelectedString } = this.props;

    const dateSelectedMoment = moment(dateSelectedString, "YYYY-MM-DD");

    if (isTablet) return dateSelectedMoment.format("D MMM YY");

    const monthYearString = moment(dateSelectedMoment).format("MMMM YYYY");
    const startDateNumber = moment(dateSelectedMoment)
      .startOf("week")
      .format("D");
    const endDateNumber = moment(dateSelectedMoment)
      .endOf("week")
      .format("D");
    return `${startDateNumber} - ${endDateNumber} ${monthYearString}`;
  }

  checkIfPrevDisabled() {
    const {
      institutionCreationDate,
      isTablet,
      dateSelectedString
    } = this.props;

    const dateSelectedMoment = moment(dateSelectedString, "YYYY-MM-DD");
    const institutionCreationMoment = moment(institutionCreationDate);

    if (isTablet) {
      if (
        institutionCreationMoment.date() === dateSelectedMoment.date() &&
        institutionCreationMoment.month() === dateSelectedMoment.month() &&
        institutionCreationMoment.year() === dateSelectedMoment.year()
      ) {
        return true;
      }
      return false;
    } else {
      if (
        institutionCreationMoment.week() === dateSelectedMoment.week() &&
        institutionCreationMoment.year() === dateSelectedMoment.year()
      ) {
        return true;
      }
      return false;
    }
  }

  getDateToDisplay() {
    const { isTablet, dateSelectedString } = this.props;

    const dateSelectedMoment = moment(dateSelectedString, "YYYY-MM-DD");

    if (isTablet) {
      return [dateSelectedMoment.toDate()];
    } else {
      let dates = [];
      let startOfWeek = moment(dateSelectedMoment).startOf("week");
      const endOfWeek = moment(dateSelectedMoment).endOf("week");

      while (
        startOfWeek.format("DD-MM-YYYY") !== endOfWeek.format("DD-MM-YYYY")
      ) {
        dates.push(startOfWeek.toDate());
        startOfWeek.add(1, "day");
      }
      dates.push(startOfWeek.toDate());

      return dates;
    }
  }

  render() {
    const {
      classes,
      institutionCreationDate,
      isTablet,
      isMobile,
      events,
      navigateTo,
      canCreate,
      dateSelectedString
    } = this.props;
    const { isDateSelectorOpen } = this.state;

    const dateSelectedMoment = moment(dateSelectedString, "YYYY-MM-DD");
    const dateDisplay = this.getDateDisplay();
    const isPrevDisabled = this.checkIfPrevDisabled();
    const datesToDisplay = this.getDateToDisplay();

    return (
      <div className={classes.wrapper}>
        <DaysSelector
          dateDisplay={dateDisplay}
          isPrevDisabled={isPrevDisabled}
          toggleDateSelector={() => this.toggleDateSelector()}
          handlePrev={() => {
            if (isTablet) {
              this.prevDay();
            } else {
              this.prevWeek();
            }
          }}
          handleNext={() => {
            if (isTablet) {
              this.nextDay();
            } else {
              this.nextWeek();
            }
          }}
        />
        <div className={classes.separator} />
        <ListOfEvents
          canCreate={canCreate}
          events={events}
          isMobile={isMobile}
          isTablet={isTablet}
          datesToDisplay={datesToDisplay}
          dateSelected={dateSelectedMoment.toDate()}
          navigateTo={navigateTo}
        />
        <DateSelector
          isMobile={isMobile}
          isOpen={isDateSelectorOpen}
          minDate={institutionCreationDate}
          dateSelected={dateSelectedMoment.toDate()}
          updateDateSelected={newDate => {
            this.updateDateSelected(newDate);
            this.toggleDateSelector();
          }}
          closeDialog={() => this.toggleDateSelector()}
        />
      </div>
    );
  }
}

export default injectSheet(styles)(EventsList);
