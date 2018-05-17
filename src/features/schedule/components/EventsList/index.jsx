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
    dateSelectedMoment: moment(new Date(Date.now())),
    isDateSelectorOpen: false
  };

  toggleDateSelector() {
    const { isDateSelectorOpen } = this.state;

    this.setState({
      isDateSelectorOpen: !isDateSelectorOpen
    });
  }

  updateDateSelected(newDate) {
    this.setState({
      dateSelectedMoment: moment(newDate)
    });
  }

  prevWeek() {
    const { dateSelectedMoment } = this.state;

    const prevWeek = moment(dateSelectedMoment).subtract(1, "week");

    this.setState({
      dateSelectedMoment: prevWeek
    });
  }

  nextWeek() {
    const { dateSelectedMoment } = this.state;

    const nextWeek = moment(dateSelectedMoment).add(1, "week");

    this.setState({
      dateSelectedMoment: nextWeek
    });
  }

  prevDay() {
    const { dateSelectedMoment } = this.state;

    const prevDay = moment(dateSelectedMoment).subtract(1, "day");

    this.setState({
      dateSelectedMoment: prevDay
    });
  }

  nextDay() {
    const { dateSelectedMoment } = this.state;

    const nextDay = moment(dateSelectedMoment).add(1, "day");

    this.setState({
      dateSelectedMoment: nextDay
    });
  }

  getDateDisplay() {
    const { isTablet } = this.props;
    const { dateSelectedMoment } = this.state;

    if (isTablet) return dateSelectedMoment.format("D MMM YY");

    const startOfWeek = moment(dateSelectedMoment)
      .startOf("week")
      .format("D MMM YYYY");
    const endOfWeek = moment(dateSelectedMoment)
      .endOf("week")
      .format("D MMM YYYY");
    return `${startOfWeek} - ${endOfWeek}`;
  }

  checkIfPrevDisabled() {
    const { institutionCreationDate, isTablet } = this.props;
    const { dateSelectedMoment } = this.state;

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
    const { dateSelectedMoment } = this.state;
    const { isTablet } = this.props;

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
      navigateTo
    } = this.props;
    const { dateSelectedMoment, isDateSelectorOpen } = this.state;

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
          events={events}
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
