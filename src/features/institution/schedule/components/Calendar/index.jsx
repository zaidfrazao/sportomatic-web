import React, { Component } from "react";
import _ from "lodash";
import { Calendar as ReactCalendar } from "react-calendar";
import classNames from "classnames";
import EventIcon from "material-ui-icons/FiberManualRecord";
import { grey, lightBlue, orange } from "material-ui/colors";
import IconButton from "material-ui/IconButton";
import NextIcon from "material-ui-icons/ArrowForward";
import Next2Icon from "material-ui-icons/LastPage";
import Paper from "material-ui/Paper";
import PreviousIcon from "material-ui-icons/ArrowBack";
import Previous2Icon from "material-ui-icons/FirstPage";
import { Route } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import EventsList from "../EventsList";

const styles = theme => ({
  competitiveEvent: {
    width: 12,
    height: 12,
    color: orange[500]
  },
  nonCompetitiveEvent: {
    width: 12,
    height: 12,
    color: lightBlue[500]
  },
  figure: {
    height: "100%",
    width: "100%"
  },
  weekendTile: {
    color: `${grey[500]} !important`
  },
  normalTile: {
    height: 64,
    width: 64,
    fontSize: 18,
    color: grey[800],
    "&:hover": {
      backgroundColor: `${grey[200]} !important`,
      color: `${grey[900]} !important`,
      borderRadius: 32
    }
  },
  eventTile: {
    height: 64,
    width: 64,
    fontSize: 20,
    color: grey[900],
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: `${grey[200]} !important`,
      color: `${grey[900]} !important`,
      borderRadius: 32
    }
  },
  todayTile: {
    height: 64,
    width: 64,
    fontSize: 18,
    color: grey[900],
    backgroundColor: grey[200],
    borderRadius: 32,
    "&:hover": {
      backgroundColor: `${grey[200]} !important`,
      color: `${grey[900]} !important`,
      borderRadius: 32
    }
  },
  selectedTile: {
    height: 64,
    width: 64,
    fontSize: 22,
    backgroundColor: lightBlue[900],
    color: `${grey[50]} !important`,
    fontWeight: "bold",
    borderRadius: 32,
    "&:hover": {
      backgroundColor: `${lightBlue[900]} !important`,
      color: `${grey[50]} !important`,
      borderRadius: 32
    }
  },
  calendar: {
    width: "100%",
    height: "calc(100% - 48px)",
    overflow: "auto"
  },
  root: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    "@media (min-width: 960px)": {
      margin: 48,
      width: "calc(100% - 96px)"
    }
  },
  contentWrapper: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row"
  },
  header: {
    padding: "20px 0",
    width: "100%",
    backgroundColor: lightBlue[700],
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  selectedYear: {
    fontSize: 14,
    color: grey[100],
    "@media (min-width: 600px)": {
      fontSize: 18
    }
  },
  selectedDate: {
    fontSize: 24,
    color: grey[50],
    "@media (min-width: 600px)": {
      fontSize: 32
    }
  },
  desktopCalendar: {
    width: "60%"
  },
  desktopEventsList: {
    width: "40%",
    display: "flex",
    flexDirection: "column"
  },
  headerContent: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  arrow: {
    color: grey[50],
    width: 32,
    height: 32
  },
  arrowWrapper: {
    margin: "0 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  bumper: {
    height: 48,
    width: "100%",
    backgroundColor: lightBlue[900]
  },
  disabledButton: {
    color: lightBlue[900]
  },
  eventsListWrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  }
});

class Calendar extends Component {
  getDaySuffix(day) {
    if (day === 1 || day === 21 || day === 31) return "st";
    if (day === 2 || day === 22) return "nd";
    if (day === 3 || day === 23) return "rd";
    return "th";
  }

  compareDates(dateA, dateB) {
    if (dateA.getFullYear() < dateB.getFullYear()) return -1;
    if (dateA.getFullYear() > dateB.getFullYear()) return +1;
    if (dateA.getMonth() < dateB.getMonth()) return -1;
    if (dateA.getMonth() > dateB.getMonth()) return +1;
    if (dateA.getDate() < dateB.getDate()) return -1;
    if (dateA.getDate() > dateB.getDate()) return +1;
    return 0;
  }

  renderDesktop() {
    const {
      classes,
      dateSelected,
      isTablet,
      events,
      institutionID,
      isLoading
    } = this.props;
    const {
      updateView,
      openCancelEventAlert,
      openUncancelEventAlert,
      cancelEvent
    } = this.props.actions;

    const yearSelected = dateSelected.slice(0, 4);
    const monthSelected = dateSelected.slice(5, 7);

    let dates = {};
    events[yearSelected] &&
      events[yearSelected][monthSelected] &&
      _.values(events[yearSelected][monthSelected]).map(eventInfo => {
        const isCompetitive = eventInfo.metadata.isCompetitive;
        const eventDate = new Date(eventInfo.metadata.date);

        if (dates[eventDate]) {
          if (isCompetitive) {
            dates[eventDate].hasCompetitive = true;
          } else {
            dates[eventDate].hasNonCompetitive = true;
          }
        } else {
          dates[eventDate] = {
            hasCompetitive: isCompetitive,
            hasNonCompetitive: !isCompetitive
          };
        }
      });

    const currentTime = new Date(Date.now());
    const currentDate = new Date(
      currentTime.getFullYear(),
      currentTime.getMonth(),
      currentTime.getDate()
    ).toString();
    const tempDate = new Date(dateSelected);
    const formattedDateSelected = new Date(
      tempDate.getFullYear(),
      tempDate.getMonth(),
      tempDate.getDate()
    ).toString();

    const headingDateOptions = {
      month: "long"
    };

    const minDate = new Date("2017-08-30");
    const dateSelectedObject = new Date(dateSelected);
    const prevDate = new Date(
      dateSelectedObject.getFullYear(),
      dateSelectedObject.getMonth() - 1,
      dateSelectedObject.getDate(),
      dateSelectedObject.getHours() + 2
    );
    let prevDisabled = false;
    if (this.compareDates(minDate, prevDate) === +1) {
      prevDisabled = true;
    }

    return (
      <Paper className={classes.root}>
        <div className={classes.header}>
          <div className={classes.arrowWrapper}>
            <Route
              render={({ history }) => (
                <IconButton
                  disabled={prevDisabled}
                  onClick={() => {
                    const date = new Date(dateSelected);
                    const ISOdate = new Date(
                      date.getFullYear(),
                      date.getMonth() - 1,
                      date.getDate(),
                      date.getHours() + 2
                    )
                      .toISOString()
                      .slice(0, 10);
                    history.push(`/admin/schedule/${ISOdate}`);
                  }}
                >
                  <PreviousIcon
                    className={
                      prevDisabled ? classes.disabledButton : classes.arrow
                    }
                  />
                </IconButton>
              )}
            />
          </div>
          <div className={classes.headerContent}>
            <div className={classes.selectedYear}>
              {dateSelected.slice(0, 4)}
            </div>
            <div className={classes.selectedDate}>
              {new Date(dateSelected).toLocaleDateString(
                "en-US",
                headingDateOptions
              )}
            </div>
          </div>
          <div className={classes.arrowWrapper}>
            <Route
              render={({ history }) => (
                <IconButton
                  onClick={() => {
                    const date = new Date(dateSelected);
                    const ISOdate = new Date(
                      date.getFullYear(),
                      date.getMonth() + 1,
                      date.getDate(),
                      date.getHours() + 2
                    )
                      .toISOString()
                      .slice(0, 10);
                    history.push(`/admin/schedule/${ISOdate}`);
                  }}
                >
                  <NextIcon className={classes.arrow} />
                </IconButton>
              )}
            />
          </div>
        </div>
        <div className={classes.contentWrapper}>
          <div className={classes.desktopCalendar}>
            <div className={classes.bumper} />
            <Route
              render={({ history }) => (
                <ReactCalendar
                  tileContent={({ date, view }) => {
                    date.setHours(2);
                    const eventDate = dates[date.toString()];
                    if (eventDate) {
                      if (
                        eventDate.hasCompetitive &&
                        eventDate.hasNonCompetitive
                      ) {
                        return (
                          <div>
                            <EventIcon className={classes.competitiveEvent} />
                            <EventIcon
                              className={classes.nonCompetitiveEvent}
                            />
                          </div>
                        );
                      } else if (eventDate.hasCompetitive) {
                        return (
                          <div>
                            <EventIcon className={classes.competitiveEvent} />
                          </div>
                        );
                      } else if (eventDate.hasNonCompetitive) {
                        return (
                          <div>
                            <EventIcon
                              className={classes.nonCompetitiveEvent}
                            />
                          </div>
                        );
                      }
                    }
                  }}
                  tileClassName={({ date, view }) => {
                    let tileClasses = [];

                    if (date > minDate) {
                      if (date.toString() === formattedDateSelected) {
                        tileClasses.push(classes.selectedTile);
                      } else if (date.toString() === currentDate) {
                        tileClasses.push(classes.todayTile);
                      } else if (dates[date.toString()]) {
                        tileClasses.push(classes.eventTile);
                      } else {
                        tileClasses.push(classes.normalTile);
                      }
                    }

                    if (date.getDay() === 6 || date.getDay() === 0) {
                      tileClasses.push(classes.weekendTile);
                    }

                    return classNames(...tileClasses);
                  }}
                  className={classes.calendar}
                  value={new Date(dateSelected)}
                  minDate={minDate}
                  showNavigation={false}
                  onChange={date => {
                    const ISOdate = new Date(
                      date.getFullYear(),
                      date.getMonth(),
                      date.getDate(),
                      date.getHours() + 2
                    )
                      .toISOString()
                      .slice(0, 10);
                    history.push(`/admin/schedule/${ISOdate}`);
                    updateView("EVENTS_LIST");
                  }}
                  nextLabel={<NextIcon />}
                  prevLabel={<PreviousIcon />}
                  next2Label={<Next2Icon />}
                  prev2Label={<Previous2Icon />}
                />
              )}
            />
          </div>
          <div className={classes.desktopEventsList}>
            <EventsList
              isTablet={isTablet}
              dateSelected={dateSelected}
              isLoading={isLoading}
              events={
                (events[yearSelected] && events[yearSelected][monthSelected]) ||
                {}
              }
              institutionID={institutionID}
              actions={{
                updateView,
                openCancelEventAlert,
                openUncancelEventAlert,
                cancelEvent
              }}
            />
          </div>
        </div>
      </Paper>
    );
  }

  renderMobile() {
    const {
      classes,
      dateSelected,
      isTablet,
      events,
      institutionID,
      currentView,
      isLoading
    } = this.props;
    const {
      updateView,
      openCancelEventAlert,
      openUncancelEventAlert,
      cancelEvent
    } = this.props.actions;

    const yearSelected = dateSelected.slice(0, 4);
    const monthSelected = dateSelected.slice(5, 7);

    let dates = {};
    events[yearSelected] &&
      events[yearSelected][monthSelected] &&
      _.values(events[yearSelected][monthSelected]).map(eventInfo => {
        const isCompetitive = eventInfo.metadata.isCompetitive;
        const eventDate = new Date(eventInfo.metadata.date);

        if (dates[eventDate]) {
          if (isCompetitive) {
            dates[eventDate].hasCompetitive = true;
          } else {
            dates[eventDate].hasNonCompetitive = true;
          }
        } else {
          dates[eventDate] = {
            hasCompetitive: isCompetitive,
            hasNonCompetitive: !isCompetitive
          };
        }
      });

    const currentTime = new Date(Date.now());
    const currentDate = new Date(
      currentTime.getFullYear(),
      currentTime.getMonth(),
      currentTime.getDate()
    ).toString();
    const tempDate = new Date(dateSelected);
    const formattedDateSelected = new Date(
      tempDate.getFullYear(),
      tempDate.getMonth(),
      tempDate.getDate()
    ).toString();

    const scheduleHeadingDateOptions = {
      month: "long"
    };
    const listHeadingDateOptions = {
      day: "numeric",
      month: "short"
    };

    const minDate = new Date("2017-08-30");
    const dateSelectedObject = new Date(dateSelected);
    let prevDate = new Date();
    if (currentView === "SCHEDULE") {
      prevDate = new Date(
        dateSelectedObject.getFullYear(),
        dateSelectedObject.getMonth() - 1,
        dateSelectedObject.getDate(),
        dateSelectedObject.getHours() + 2
      );
    } else {
      prevDate = new Date(
        dateSelectedObject.getFullYear(),
        dateSelectedObject.getMonth(),
        dateSelectedObject.getDate() - 1,
        dateSelectedObject.getHours() + 2
      );
    }

    let prevDisabled = false;
    if (this.compareDates(minDate, prevDate) === +1) {
      prevDisabled = true;
    }

    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <div className={classes.arrowWrapper}>
            <Route
              render={({ history }) => (
                <IconButton
                  disabled={prevDisabled}
                  onClick={() => {
                    const date = new Date(dateSelected);
                    let ISOdate = new Date();
                    if (currentView === "SCHEDULE") {
                      ISOdate = new Date(
                        date.getFullYear(),
                        date.getMonth() - 1,
                        date.getDate(),
                        date.getHours() + 2
                      )
                        .toISOString()
                        .slice(0, 10);
                    } else {
                      ISOdate = new Date(
                        date.getFullYear(),
                        date.getMonth(),
                        date.getDate() - 1,
                        date.getHours() + 2
                      )
                        .toISOString()
                        .slice(0, 10);
                    }

                    history.push(`/admin/schedule/${ISOdate}`);
                  }}
                >
                  <PreviousIcon
                    className={
                      prevDisabled ? classes.disabledButton : classes.arrow
                    }
                  />
                </IconButton>
              )}
            />
          </div>
          <div className={classes.headerContent}>
            <div className={classes.selectedYear}>
              {dateSelected.slice(0, 4)}
            </div>
            <div className={classes.selectedDate}>
              {currentView === "SCHEDULE"
                ? new Date(dateSelected).toLocaleDateString(
                    "en-US",
                    scheduleHeadingDateOptions
                  )
                : new Date(dateSelected).toLocaleDateString(
                    "en-US",
                    listHeadingDateOptions
                  )}
            </div>
          </div>
          <div className={classes.arrowWrapper}>
            <Route
              render={({ history }) => (
                <IconButton
                  onClick={() => {
                    const date = new Date(dateSelected);
                    let ISOdate = new Date();
                    if (currentView === "SCHEDULE") {
                      ISOdate = new Date(
                        date.getFullYear(),
                        date.getMonth() + 1,
                        date.getDate(),
                        date.getHours() + 2
                      )
                        .toISOString()
                        .slice(0, 10);
                    } else {
                      ISOdate = new Date(
                        date.getFullYear(),
                        date.getMonth(),
                        date.getDate() + 1,
                        date.getHours() + 2
                      )
                        .toISOString()
                        .slice(0, 10);
                    }

                    history.push(`/admin/schedule/${ISOdate}`);
                  }}
                >
                  <NextIcon className={classes.arrow} />
                </IconButton>
              )}
            />
          </div>
        </div>
        <div className={classes.contentWrapper}>
          {currentView === "SCHEDULE" ? (
            <div>
              <div className={classes.bumper} />
              <Route
                render={({ history }) => (
                  <ReactCalendar
                    tileContent={({ date, view }) => {
                      date.setHours(2);
                      const eventDate = dates[date.toString()];
                      if (eventDate) {
                        if (
                          eventDate.hasCompetitive &&
                          eventDate.hasNonCompetitive
                        ) {
                          return (
                            <div>
                              <EventIcon className={classes.competitiveEvent} />
                              <EventIcon
                                className={classes.nonCompetitiveEvent}
                              />
                            </div>
                          );
                        } else if (eventDate.hasCompetitive) {
                          return (
                            <div>
                              <EventIcon className={classes.competitiveEvent} />
                            </div>
                          );
                        } else if (eventDate.hasNonCompetitive) {
                          return (
                            <div>
                              <EventIcon
                                className={classes.nonCompetitiveEvent}
                              />
                            </div>
                          );
                        }
                      }
                    }}
                    tileClassName={({ date, view }) => {
                      let tileClasses = [];

                      if (date > minDate) {
                        if (date.toString() === formattedDateSelected) {
                          tileClasses.push(classes.selectedTile);
                        } else if (date.toString() === currentDate) {
                          tileClasses.push(classes.todayTile);
                        } else if (dates[date.toString()]) {
                          tileClasses.push(classes.eventTile);
                        } else {
                          tileClasses.push(classes.normalTile);
                        }
                      }

                      if (date.getDay() === 6 || date.getDay() === 0) {
                        tileClasses.push(classes.weekendTile);
                      }

                      return classNames(...tileClasses);
                    }}
                    className={classes.calendar}
                    value={new Date(dateSelected)}
                    minDate={minDate}
                    showNavigation={false}
                    onChange={date => {
                      const ISOdate = new Date(
                        date.getFullYear(),
                        date.getMonth(),
                        date.getDate(),
                        date.getHours() + 2
                      )
                        .toISOString()
                        .slice(0, 10);
                      history.push(`/admin/schedule/${ISOdate}`);
                      updateView("EVENTS_LIST");
                    }}
                    nextLabel={<NextIcon />}
                    prevLabel={<PreviousIcon />}
                    next2Label={<Next2Icon />}
                    prev2Label={<Previous2Icon />}
                  />
                )}
              />
            </div>
          ) : (
            <div className={classes.eventsListWrapper}>
              <EventsList
                isTablet={isTablet}
                dateSelected={dateSelected}
                events={
                  (events[yearSelected] &&
                    events[yearSelected][monthSelected]) ||
                  {}
                }
                institutionID={institutionID}
                isLoading={isLoading}
                actions={{
                  updateView,
                  openCancelEventAlert,
                  openUncancelEventAlert,
                  cancelEvent
                }}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  render() {
    const { isTablet } = this.props;
    if (isTablet) {
      return this.renderMobile();
    } else {
      return this.renderDesktop();
    }
  }
}

export default withStyles(styles)(Calendar);
