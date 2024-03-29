/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import { Calendar as ReactCalendar } from "react-calendar";
import { CircularProgress } from "material-ui/Progress";
import classNames from "classnames";
import EventIcon from "material-ui-icons/FiberManualRecord";
import { grey, lightBlue, orange, red } from "material-ui/colors";
import IconButton from "material-ui/IconButton";
import moment from "moment";
import NextIcon from "material-ui-icons/ArrowForward";
import Next2Icon from "material-ui-icons/LastPage";
import Paper from "material-ui/Paper";
import PreviousIcon from "material-ui-icons/ArrowBack";
import Previous2Icon from "material-ui-icons/FirstPage";
import { Route } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import EventsList from "../EventsList";

const styles = theme => ({
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
  calendarWithHeader: {
    width: "100%",
    height: "calc(100% - 48px)",
    overflow: "auto"
  },
  calendarWithoutHeader: {
    width: "100%",
    height: "100%",
    overflow: "auto"
  },
  cancelledEvent: {
    width: 12,
    height: 12,
    color: red[500]
  },
  competitiveEvent: {
    width: 12,
    height: 12,
    color: orange[500]
  },
  contentWrapper: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    backgroundColor: grey[50]
  },
  desktopCalendar: {
    width: "60%"
  },
  desktopEventsList: {
    width: "40%",
    display: "flex",
    flexDirection: "column"
  },
  disabledButton: {
    color: lightBlue[900]
  },
  disabledDate: {
    height: 64,
    width: 64,
    fontSize: 20
  },
  eventsListWrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
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
  figure: {
    height: "100%",
    width: "100%"
  },
  header: {
    padding: "20px 0",
    width: "100%",
    backgroundColor: lightBlue[700],
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  headerContent: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  loadingWrapper: {
    height: "calc(100% - 48px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  mobileCalendar: {
    width: "100%"
  },
  nonCompetitiveEvent: {
    width: 12,
    height: 12,
    color: lightBlue[500]
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
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    "@media (min-width: 1200px)": {
      width: 1200,
      margin: "24px auto"
    }
  },
  selectedDate: {
    fontSize: 24,
    color: grey[50],
    "@media (min-width: 600px)": {
      fontSize: 32
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
  selectedYear: {
    fontSize: 14,
    color: grey[100],
    "@media (min-width: 600px)": {
      fontSize: 18
    }
  },
  todayTile: {
    height: 64,
    width: 64,
    fontSize: 18,
    color: grey[900],
    backgroundColor: lightBlue[50],
    borderRadius: 32,
    "&:hover": {
      backgroundColor: `${grey[200]} !important`,
      color: `${grey[900]} !important`,
      borderRadius: 32
    }
  },
  weekendTile: {
    color: `${grey[500]} !important`
  }
});

class Calendar extends Component {
  compareDates(dateA, dateB) {
    if (moment(dateA).isBefore(dateB)) return -1;
    if (moment(dateA).isAfter(dateB)) return +1;
    return 0;
  }

  renderDesktop() {
    const {
      classes,
      dateSelected,
      isTablet,
      events,
      institutionID,
      isEventsLoading,
      isMinDateLoading,
      minDate
    } = this.props;
    const {
      updateView,
      openCancelEventAlert,
      openUncancelEventAlert,
      cancelEvent
    } = this.props.actions;

    let dates = {};
    _.values(events).map(eventInfo => {
      const isCompetitive = eventInfo.requiredInfo.isCompetitive;
      const isCancelled = eventInfo.requiredInfo.status === "CANCELLED";
      const eventDate = eventInfo.requiredInfo.times.start.toDateString();

      if (dates[eventDate]) {
        if (isCompetitive) {
          dates[eventDate].hasCompetitive = true;
        } else {
          dates[eventDate].hasNonCompetitive = true;
        }
        if (isCancelled) {
          dates[eventDate].hasCancelled = true;
        }
      } else {
        dates[eventDate] = {
          hasCompetitive: isCompetitive,
          hasNonCompetitive: !isCompetitive,
          hasCancelled: isCancelled
        };
      }
    });

    const currentDate = new Date(Date.now()).toDateString();
    const formattedDateSelected = new Date(dateSelected).toDateString();

    const headingDateOptions = {
      month: "long"
    };

    const dateSelectedObject = new Date(dateSelected);
    const prevDate = new Date(
      dateSelectedObject.getFullYear(),
      dateSelectedObject.getMonth(),
      1
    );

    let prevDisabled = isMinDateLoading;
    if (this.compareDates(minDate, prevDate) === +1) {
      prevDate.setDate(minDate.getDate());
      if (this.compareDates(minDate, prevDate) === +1) {
        prevDisabled = true;
      }
    }
    const nextDisabled = isMinDateLoading;

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
                    let newDate = new Date(
                      date.getFullYear(),
                      date.getMonth() - 1,
                      2
                    );
                    if (this.compareDates(minDate, newDate) === +1) {
                      newDate = new Date(
                        minDate.getFullYear(),
                        minDate.getMonth(),
                        minDate.getDate() + 1
                      );
                    }
                    history.push(
                      `/myaccount/schedule/${moment(newDate).format(
                        "YYYY-MM-DD"
                      )}`
                    );
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
                  disabled={nextDisabled}
                  onClick={() => {
                    const date = new Date(dateSelected);
                    const newDate = new Date(
                      date.getFullYear(),
                      date.getMonth() + 1,
                      2
                    );
                    history.push(
                      `/myaccount/schedule/${moment(newDate).format(
                        "YYYY-MM-DD"
                      )}`
                    );
                  }}
                >
                  <NextIcon
                    className={
                      nextDisabled ? classes.disabledButton : classes.arrow
                    }
                  />
                </IconButton>
              )}
            />
          </div>
        </div>
        <div className={classes.contentWrapper}>
          <div className={classes.desktopCalendar}>
            <div className={classes.bumper} />
            <Route
              render={({ history }) => {
                if (isEventsLoading || isMinDateLoading) {
                  return (
                    <div className={classes.loadingWrapper}>
                      <CircularProgress />
                    </div>
                  );
                } else {
                  return (
                    <ReactCalendar
                      showNeighboringMonth={false}
                      tileContent={({ date, view }) => {
                        date.setHours(2);
                        const eventDate = dates[date.toDateString()];
                        if (eventDate) {
                          if (
                            eventDate.hasCompetitive &&
                            eventDate.hasNonCompetitive &&
                            eventDate.hasCancelled
                          ) {
                            return (
                              <div>
                                <EventIcon
                                  className={classes.competitiveEvent}
                                />
                                <EventIcon
                                  className={classes.nonCompetitiveEvent}
                                />
                                <EventIcon className={classes.cancelledEvent} />
                              </div>
                            );
                          } else if (
                            eventDate.hasCompetitive &&
                            eventDate.hasNonCompetitive
                          ) {
                            return (
                              <div>
                                <EventIcon
                                  className={classes.competitiveEvent}
                                />
                                <EventIcon
                                  className={classes.nonCompetitiveEvent}
                                />
                              </div>
                            );
                          } else if (
                            eventDate.hasCompetitive &&
                            eventDate.hasCancelled
                          ) {
                            return (
                              <div>
                                <EventIcon
                                  className={classes.competitiveEvent}
                                />
                                <EventIcon className={classes.cancelledEvent} />
                              </div>
                            );
                          } else if (
                            eventDate.hasNonCompetitive &&
                            eventDate.hasCancelled
                          ) {
                            return (
                              <div>
                                <EventIcon
                                  className={classes.nonCompetitiveEvent}
                                />
                                <EventIcon className={classes.cancelledEvent} />
                              </div>
                            );
                          } else if (eventDate.hasCompetitive) {
                            return (
                              <div>
                                <EventIcon
                                  className={classes.competitiveEvent}
                                />
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

                        if (date >= minDate) {
                          if (date.toDateString() === formattedDateSelected) {
                            tileClasses.push(classes.selectedTile);
                          } else if (date.toDateString() === currentDate) {
                            tileClasses.push(classes.todayTile);
                          } else if (dates[date.toDateString()]) {
                            tileClasses.push(classes.eventTile);
                          } else {
                            tileClasses.push(classes.normalTile);
                          }
                        } else {
                          tileClasses.push(classes.disabledDate);
                        }

                        if (date.getDay() === 6 || date.getDay() === 0) {
                          tileClasses.push(classes.weekendTile);
                        }

                        return classNames(...tileClasses);
                      }}
                      className={classes.calendarWithHeader}
                      value={new Date(dateSelected)}
                      minDate={minDate}
                      showNavigation={false}
                      onChange={date => {
                        const newDate = new Date(
                          date.getFullYear(),
                          date.getMonth(),
                          date.getDate()
                        );
                        history.push(
                          `/myaccount/schedule/${moment(newDate).format(
                            "YYYY-MM-DD"
                          )}`
                        );
                        updateView("EVENTS_LIST");
                      }}
                      nextLabel={<NextIcon />}
                      prevLabel={<PreviousIcon />}
                      next2Label={<Next2Icon />}
                      prev2Label={<Previous2Icon />}
                    />
                  );
                }
              }}
            />
          </div>
          <div className={classes.desktopEventsList}>
            <EventsList
              isTablet={isTablet}
              dateSelected={dateSelected}
              isLoading={isEventsLoading || isMinDateLoading}
              events={events}
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
      isEventsLoading,
      isMinDateLoading,
      minDate
    } = this.props;
    const { updateView, cancelEvent } = this.props.actions;

    let dates = {};
    _.values(events).map(eventInfo => {
      const isCompetitive = eventInfo.requiredInfo.isCompetitive;
      const eventDate = eventInfo.requiredInfo.times.start.toDateString();

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

    const currentDate = new Date(Date.now()).toDateString();
    const formattedDateSelected = new Date(dateSelected).toDateString();

    const scheduleHeadingDateOptions = {
      month: "long"
    };
    const listHeadingDateOptions = {
      day: "numeric",
      month: "short"
    };

    const dateSelectedObject = new Date(dateSelected);
    let prevDate = new Date();
    if (currentView === "SCHEDULE") {
      prevDate = new Date(
        dateSelectedObject.getFullYear(),
        dateSelectedObject.getMonth() - 1,
        dateSelectedObject.getDate()
      );
    } else {
      prevDate = new Date(
        dateSelectedObject.getFullYear(),
        dateSelectedObject.getMonth(),
        dateSelectedObject.getDate() - 1
      );
    }

    let prevDisabled = isMinDateLoading;
    if (this.compareDates(minDate, prevDate) === +1) {
      prevDisabled = true;
    }
    const nextDisabled = isMinDateLoading;

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
                    let newDate = new Date();
                    if (currentView === "SCHEDULE") {
                      newDate = new Date(
                        date.getFullYear(),
                        date.getMonth() - 1,
                        date.getDate()
                      );
                    } else {
                      newDate = new Date(
                        date.getFullYear(),
                        date.getMonth(),
                        date.getDate() - 1
                      );
                    }

                    history.push(
                      `/myaccount/schedule/${moment(newDate).format(
                        "YYYY-MM-DD"
                      )}`
                    );
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
                  disabled={nextDisabled}
                  onClick={() => {
                    const date = new Date(dateSelected);
                    let newDate = new Date();
                    if (currentView === "SCHEDULE") {
                      newDate = new Date(
                        date.getFullYear(),
                        date.getMonth() + 1,
                        date.getDate()
                      );
                    } else {
                      newDate = new Date(
                        date.getFullYear(),
                        date.getMonth(),
                        date.getDate() + 1
                      );
                    }

                    history.push(
                      `/myaccount/schedule/${moment(newDate).format(
                        "YYYY-MM-DD"
                      )}`
                    );
                  }}
                >
                  <NextIcon
                    className={
                      nextDisabled ? classes.disabledButton : classes.arrow
                    }
                  />
                </IconButton>
              )}
            />
          </div>
        </div>
        <div className={classes.contentWrapper}>
          {currentView === "SCHEDULE" ? (
            <div className={classes.mobileCalendar}>
              <Route
                render={({ history }) => {
                  if (isEventsLoading || isMinDateLoading) {
                    return (
                      <div className={classes.loadingWrapper}>
                        <CircularProgress />
                      </div>
                    );
                  } else {
                    return (
                      <ReactCalendar
                        showNeighboringMonth={false}
                        tileContent={({ date, view }) => {
                          date.setHours(2);
                          const eventDate = dates[date.toDateString()];
                          if (eventDate) {
                            if (
                              eventDate.hasCompetitive &&
                              eventDate.hasNonCompetitive
                            ) {
                              return (
                                <div>
                                  <EventIcon
                                    className={classes.competitiveEvent}
                                  />
                                  <EventIcon
                                    className={classes.nonCompetitiveEvent}
                                  />
                                </div>
                              );
                            } else if (eventDate.hasCompetitive) {
                              return (
                                <div>
                                  <EventIcon
                                    className={classes.competitiveEvent}
                                  />
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
                            if (date.toDateString() === formattedDateSelected) {
                              tileClasses.push(classes.selectedTile);
                            } else if (date.toDateString() === currentDate) {
                              tileClasses.push(classes.todayTile);
                            } else if (dates[date.toDateString()]) {
                              tileClasses.push(classes.eventTile);
                            } else {
                              tileClasses.push(classes.normalTile);
                            }
                          } else {
                            tileClasses.push(classes.disabledDate);
                          }

                          if (date.getDay() === 6 || date.getDay() === 0) {
                            tileClasses.push(classes.weekendTile);
                          }

                          return classNames(...tileClasses);
                        }}
                        className={classes.calendarWithoutHeader}
                        value={new Date(dateSelected)}
                        minDate={minDate}
                        showNavigation={false}
                        onChange={date => {
                          const newDate = new Date(
                            date.getFullYear(),
                            date.getMonth(),
                            date.getDate()
                          );
                          history.push(
                            `/myaccount/schedule/${moment(newDate).format(
                              "YYYY-MM-DD"
                            )}`
                          );
                          updateView("EVENTS_LIST");
                        }}
                        nextLabel={<NextIcon />}
                        prevLabel={<PreviousIcon />}
                        next2Label={<Next2Icon />}
                        prev2Label={<Previous2Icon />}
                      />
                    );
                  }
                }}
              />
            </div>
          ) : (
            <div className={classes.eventsListWrapper}>
              <EventsList
                isTablet={isTablet}
                dateSelected={dateSelected}
                events={events}
                institutionID={institutionID}
                isLoading={isEventsLoading || isMinDateLoading}
                actions={{
                  updateView,
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
