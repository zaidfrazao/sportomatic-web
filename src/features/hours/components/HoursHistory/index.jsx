/* eslint-disable array-callback-return */
import _ from "lodash";
import React, { Component } from "react";
import { CircularProgress } from "material-ui/Progress";
import { grey, lightBlue } from "material-ui/colors";
import IconButton from "material-ui/IconButton";
import moment from "moment";
import NextIcon from "material-ui-icons/ArrowForward";
import Paper from "material-ui/Paper";
import PreviousIcon from "material-ui-icons/ArrowBack";
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow
} from "material-ui/Table";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import { getMonthName } from "../../../../utils/dates";

const styles = theme => ({
  footer: {
    backgroundColor: lightBlue[700],
    width: "100%",
    minHeight: 80,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-around"
  },
  header: {
    backgroundColor: lightBlue[700],
    width: "100%",
    minHeight: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  headerButton: {
    color: grey[300],
    "&:hover": {
      color: grey[200]
    }
  },
  headerTitle: {
    color: grey[50],
    textAlign: "center"
  },
  loaderWrapper: {
    flexGrow: 1,
    padding: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  mobileRoot: {
    flexGrow: 1,
    marginTop: 24
  },
  noHoursText: {
    textAlign: "center"
  },
  root: {
    flexGrow: 1,
    padding: "24px 40px 40px 40px",
    margin: "0 auto"
  },
  tableBody: {
    flexGrow: 1,
    overflow: "auto"
  },
  tableWrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  totals: {
    color: grey[800],
    fontWeight: "bold"
  }
});

class HoursHistory extends Component {
  state = {
    year: moment().year(),
    month: moment().month() + 1,
    isLoading: false
  };

  componentWillMount() {
    const { coachID, institutionID } = this.props;
    const { loadEvents } = this.props.actions;

    if (coachID && institutionID) {
      loadEvents(institutionID, coachID);
      this.setState({
        isLoading: true
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { coachID, institutionID, isLoading } = nextProps;
    const { loadEvents } = nextProps.actions;

    if (
      coachID !== this.props.coachID ||
      institutionID !== this.props.institutionID
    ) {
      loadEvents(institutionID, coachID);
      this.setState({
        isLoading: true
      });
    }

    if (isLoading !== this.props.isLoading) {
      this.setState({
        isLoading
      });
    }
  }

  goToPrevMonth() {
    const { year, month } = this.state;

    if (month > 1) {
      this.setState({ month: month - 1 });
    } else {
      this.setState({ year: year - 1 });
      this.setState({ month: 12 });
    }
  }

  goToNextMonth() {
    const { year, month } = this.state;

    if (month < 12) {
      this.setState({ month: month + 1 });
    } else {
      this.setState({ year: year + 1 });
      this.setState({ month: 1 });
    }
  }

  getEventsThisMonth() {
    const { month, year } = this.state;
    const { events } = this.props;

    return _.fromPairs(
      _.toPairs(events).filter(([eventID, eventInfo]) => {
        const startTime = moment(eventInfo.requiredInfo.times.start);
        if (
          startTime.get("month") === month - 1 &&
          startTime.get("year") === year
        ) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

  renderTableBody() {
    const { classes, isMobile, isTablet, coachID } = this.props;

    const eventsThisMonth = this.getEventsThisMonth();

    let totalHoursLogged = 0;
    _.toPairs(eventsThisMonth).map(([eventID, eventInfo]) => {
      const startTime = moment(eventInfo.requiredInfo.times.start);
      const signInTime = moment(eventInfo.coaches[coachID].hours.times.signIn);
      const signOutTime = moment(
        eventInfo.coaches[coachID].hours.times.signOut
      );
      if (startTime > signInTime) {
        const hoursLogged = Math.round(
          signOutTime.diff(startTime, "hours", true)
        );
        totalHoursLogged += hoursLogged;
      } else {
        const hoursLogged = Math.round(
          signOutTime.diff(signInTime, "hours", true)
        );
        totalHoursLogged += hoursLogged;
      }
    });

    if (isMobile) {
      return (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell numeric>Hours</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_.keys(eventsThisMonth).length === 0 ? (
              <TableRow>
                <TableCell colSpan={2} className={classes.noHoursText}>
                  No hours logged
                </TableCell>
              </TableRow>
            ) : (
              _.toPairs(eventsThisMonth)
                .sort(([eventIDA, eventInfoA], [eventIDB, eventInfoB]) => {
                  const startTimeA = moment(
                    eventInfoA.requiredInfo.times.start
                  );
                  const startTimeB = moment(
                    eventInfoB.requiredInfo.times.start
                  );

                  if (startTimeA.isAfter(startTimeB)) {
                    return +1;
                  } else {
                    return -1;
                  }
                })
                .map(([eventID, eventInfo]) => {
                  let hoursLogged = 0;
                  const startTime = moment(eventInfo.requiredInfo.times.start);
                  const signInTime = moment(
                    eventInfo.coaches[coachID].hours.times.signIn
                  );
                  const signOutTime = moment(
                    eventInfo.coaches[coachID].hours.times.signOut
                  );
                  if (startTime > signInTime) {
                    hoursLogged = Math.round(
                      signOutTime.diff(startTime, "hours", true)
                    );
                  } else {
                    hoursLogged = Math.round(
                      signOutTime.diff(signInTime, "hours", true)
                    );
                  }

                  return (
                    <TableRow key={eventID}>
                      <TableCell>
                        {moment(eventInfo.requiredInfo.times.start).format(
                          "YYYY/MM/DD"
                        )}
                      </TableCell>
                      <TableCell numeric>{hoursLogged}</TableCell>
                    </TableRow>
                  );
                })
            )}
          </TableBody>
          <TableFooter>
            <TableRow className={classes.totals}>
              <TableCell>TOTAL</TableCell>
              <TableCell numeric>{totalHoursLogged}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      );
    } else if (isTablet) {
      return (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Sign In Time</TableCell>
              <TableCell>Sign Out Time</TableCell>
              <TableCell numeric>Hours</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_.keys(eventsThisMonth).length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className={classes.noHoursText}>
                  No hours logged
                </TableCell>
              </TableRow>
            ) : (
              _.toPairs(eventsThisMonth)
                .sort(([eventIDA, eventInfoA], [eventIDB, eventInfoB]) => {
                  const startTimeA = moment(
                    eventInfoA.requiredInfo.times.start
                  );
                  const startTimeB = moment(
                    eventInfoB.requiredInfo.times.start
                  );

                  if (startTimeA.isAfter(startTimeB)) {
                    return +1;
                  } else {
                    return -1;
                  }
                })
                .map(([eventID, eventInfo]) => {
                  let hoursLogged = 0;
                  const startTime = moment(eventInfo.requiredInfo.times.start);
                  const signInTime = moment(
                    eventInfo.coaches[coachID].hours.times.signIn
                  );
                  const signOutTime = moment(
                    eventInfo.coaches[coachID].hours.times.signOut
                  );
                  if (startTime > signInTime) {
                    hoursLogged = Math.round(
                      signOutTime.diff(startTime, "hours", true)
                    );
                  } else {
                    hoursLogged = Math.round(
                      signOutTime.diff(signInTime, "hours", true)
                    );
                  }

                  return (
                    <TableRow key={eventID}>
                      <TableCell>
                        {moment(eventInfo.requiredInfo.times.start).format(
                          "YYYY/MM/DD"
                        )}
                      </TableCell>
                      <TableCell>
                        {moment(
                          eventInfo.coaches[coachID].hours.times.signIn
                        ).format("h:mm A")}
                      </TableCell>
                      <TableCell>
                        {moment(
                          eventInfo.coaches[coachID].hours.times.signOut
                        ).format("h:mm A")}
                      </TableCell>
                      <TableCell numeric>{hoursLogged}</TableCell>
                    </TableRow>
                  );
                })
            )}
          </TableBody>
          <TableFooter>
            <TableRow className={classes.totals}>
              <TableCell>TOTAL</TableCell>
              <TableCell />
              <TableCell />
              <TableCell numeric>{totalHoursLogged}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      );
    } else {
      return (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Event</TableCell>
              <TableCell>Sign In Time</TableCell>
              <TableCell>Sign Out Time</TableCell>
              <TableCell numeric>Hours</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_.keys(eventsThisMonth).length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className={classes.noHoursText}>
                  No hours logged
                </TableCell>
              </TableRow>
            ) : (
              _.toPairs(eventsThisMonth)
                .sort(([eventIDA, eventInfoA], [eventIDB, eventInfoB]) => {
                  const startTimeA = moment(
                    eventInfoA.requiredInfo.times.start
                  );
                  const startTimeB = moment(
                    eventInfoB.requiredInfo.times.start
                  );

                  if (startTimeA.isAfter(startTimeB)) {
                    return +1;
                  } else {
                    return -1;
                  }
                })
                .map(([eventID, eventInfo]) => {
                  let hoursLogged = 0;
                  const startTime = moment(eventInfo.requiredInfo.times.start);
                  const signInTime = moment(
                    eventInfo.coaches[coachID].hours.times.signIn
                  );
                  const signOutTime = moment(
                    eventInfo.coaches[coachID].hours.times.signOut
                  );
                  if (startTime > signInTime) {
                    hoursLogged = Math.round(
                      signOutTime.diff(startTime, "hours", true)
                    );
                  } else {
                    hoursLogged = Math.round(
                      signOutTime.diff(signInTime, "hours", true)
                    );
                  }

                  return (
                    <TableRow key={eventID}>
                      <TableCell>
                        {moment(eventInfo.requiredInfo.times.start).format(
                          "YYYY/MM/DD"
                        )}
                      </TableCell>
                      <TableCell>{eventInfo.requiredInfo.title}</TableCell>
                      <TableCell>
                        {moment(
                          eventInfo.coaches[coachID].hours.times.signIn
                        ).format("h:mm A")}
                      </TableCell>
                      <TableCell>
                        {moment(
                          eventInfo.coaches[coachID].hours.times.signOut
                        ).format("h:mm A")}
                      </TableCell>
                      <TableCell numeric>{hoursLogged}</TableCell>
                    </TableRow>
                  );
                })
            )}
          </TableBody>
          <TableFooter>
            <TableRow className={classes.totals}>
              <TableCell>TOTAL</TableCell>
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell numeric>{totalHoursLogged}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      );
    }
  }

  render() {
    const { classes, isMobile, minDate } = this.props;
    const { year, month, isLoading } = this.state;

    const minYear = moment(minDate).get("year");
    const minMonth = moment(minDate).get("month");
    const disablePrev = minYear === year && minMonth === month - 1;

    return (
      <div className={isMobile ? classes.mobileRoot : classes.root}>
        <Paper className={classes.tableWrapper}>
          <div className={classes.header}>
            <IconButton
              className={disablePrev ? "" : classes.headerButton}
              disabled={disablePrev}
              onClick={() => this.goToPrevMonth()}
            >
              <PreviousIcon />
            </IconButton>
            <Typography
              component="h2"
              type="title"
              className={classes.headerTitle}
            >
              {getMonthName(month - 1)} {year}
            </Typography>
            <IconButton
              className={
                year !== moment().year() || month !== moment().month() + 1
                  ? classes.headerButton
                  : ""
              }
              disabled={
                year === moment().year() && month === moment().month() + 1
              }
              onClick={() => this.goToNextMonth()}
            >
              <NextIcon />
            </IconButton>
          </div>
          <div>
            {isLoading ? (
              <div className={classes.loaderWrapper}>
                <CircularProgress />
              </div>
            ) : (
              this.renderTableBody()
            )}
          </div>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(HoursHistory);
