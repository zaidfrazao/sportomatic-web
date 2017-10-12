// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { grey, lightBlue } from "material-ui/colors";
import Button from "material-ui/Button";
import Paper from "material-ui/Paper";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";
import Typography from "material-ui/Typography";
import { getMonthName } from "../../../../../utils/dates";
import _ from "lodash";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: "0 40px 40px 40px"
  },
  mobileRoot: {
    flexGrow: 1
  },
  tableWrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  header: {
    backgroundColor: lightBlue[700],
    width: "100%",
    minHeight: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  footer: {
    backgroundColor: lightBlue[700],
    width: "100%",
    minHeight: 80,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-around"
  },
  headerTitle: {
    color: grey[50],
    textAlign: "center"
  },
  headerButton: {
    color: grey[300],
    "&:hover": {
      color: grey[200]
    }
  },
  tableBody: {
    flexGrow: 1,
    overflow: "auto"
  },
  noData: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

class HoursHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: new Date(Date.now()).getFullYear(),
      month: new Date(Date.now()).getMonth() + 1
    };
  }

  goToPrevMonth() {
    if (this.state.month > 1) {
      this.setState({ month: this.state.month - 1 });
    } else {
      this.setState({ year: this.state.year - 1 });
      this.setState({ month: 12 });
    }
  }

  goToNextMonth() {
    if (this.state.month < 12) {
      this.setState({ month: this.state.month + 1 });
    } else {
      this.setState({ year: this.state.year + 1 });
      this.setState({ month: 1 });
    }
  }

  renderTableBody() {
    const { isMobile, isTablet, events, coachID } = this.props;
    const { year, month } = this.state;
    const dateOptions = {
      month: "short",
      day: "numeric",
      year: "numeric"
    };

    if (!events[year] || !events[year][month]) {
      return (
        <Typography type="body2" component="p">
          No hours logged
        </Typography>
      );
    }

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
            {_.toPairs(events[year][month]).map(([id, info]) => {
              const hoursLogged = Math.round(
                (new Date(
                  2017,
                  1,
                  1,
                  info.coaches[coachID].hours.signOutTime.slice(0, 2),
                  info.coaches[coachID].hours.signOutTime.slice(3, 5)
                ).getTime() -
                  new Date(
                    2017,
                    1,
                    1,
                    info.coaches[coachID].hours.signInTime.slice(0, 2),
                    info.coaches[coachID].hours.signInTime.slice(3, 5)
                  ).getTime()) /
                  1000 /
                  60 /
                  60
              );

              return (
                <TableRow key={id}>
                  <TableCell>
                    {new Date(info.metadata.date).toLocaleDateString(
                      "en-US",
                      dateOptions
                    )}
                  </TableCell>
                  <TableCell numeric>{hoursLogged}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
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
            {_.toPairs(events[year][month]).map(([id, info]) => {
              const hoursLogged = Math.round(
                (new Date(
                  2017,
                  1,
                  1,
                  info.coaches[coachID].hours.signOutTime.slice(0, 2),
                  info.coaches[coachID].hours.signOutTime.slice(3, 5)
                ).getTime() -
                  new Date(
                    2017,
                    1,
                    1,
                    info.coaches[coachID].hours.signInTime.slice(0, 2),
                    info.coaches[coachID].hours.signInTime.slice(3, 5)
                  ).getTime()) /
                  1000 /
                  60 /
                  60
              );

              return (
                <TableRow key={id}>
                  <TableCell>
                    {new Date(info.metadata.date).toLocaleDateString(
                      "en-US",
                      dateOptions
                    )}
                  </TableCell>
                  <TableCell>
                    {info.coaches[coachID].hours.signInTime}
                  </TableCell>
                  <TableCell>
                    {info.coaches[coachID].hours.signOutTime}
                  </TableCell>
                  <TableCell numeric>{hoursLogged}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
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
            {_.toPairs(events[year][month]).map(([id, info]) => {
              const hoursLogged = Math.round(
                (new Date(
                  2017,
                  1,
                  1,
                  info.coaches[coachID].hours.signOutTime.slice(0, 2),
                  info.coaches[coachID].hours.signOutTime.slice(3, 5)
                ).getTime() -
                  new Date(
                    2017,
                    1,
                    1,
                    info.coaches[coachID].hours.signInTime.slice(0, 2),
                    info.coaches[coachID].hours.signInTime.slice(3, 5)
                  ).getTime()) /
                  1000 /
                  60 /
                  60
              );

              return (
                <TableRow key={id}>
                  <TableCell>
                    {new Date(info.metadata.date).toLocaleDateString(
                      "en-US",
                      dateOptions
                    )}
                  </TableCell>
                  <TableCell>{info.metadata.title}</TableCell>
                  <TableCell>
                    {info.coaches[coachID].hours.signInTime}
                  </TableCell>
                  <TableCell>
                    {info.coaches[coachID].hours.signOutTime}
                  </TableCell>
                  <TableCell numeric>{hoursLogged}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      );
    }
  }

  renderTableFooter() {
    const { classes, isMobile, events, coachID } = this.props;
    const { year, month } = this.state;

    let totalHoursLogged = 0;
    _.toPairs(events[year][month]).map(([id, info]) => {
      const hoursLogged = Math.round(
        (new Date(
          2017,
          1,
          1,
          info.coaches[coachID].hours.signOutTime.slice(0, 2),
          info.coaches[coachID].hours.signOutTime.slice(3, 5)
        ).getTime() -
          new Date(
            2017,
            1,
            1,
            info.coaches[coachID].hours.signInTime.slice(0, 2),
            info.coaches[coachID].hours.signInTime.slice(3, 5)
          ).getTime()) /
          1000 /
          60 /
          60
      );
      totalHoursLogged += hoursLogged;
    });

    if (events[year] && events[year][month]) {
      if (!isMobile) {
        return (
          <div className={classes.footer}>
            <Typography
              component="h2"
              type="title"
              className={classes.headerTitle}
            >
              Total Hours
            </Typography>
            <Typography
              component="h2"
              type="title"
              className={classes.headerTitle}
            >
              {totalHoursLogged.toLocaleString("en")}
            </Typography>
          </div>
        );
      } else {
        return (
          <div className={classes.footer}>
            <Typography
              component="h2"
              type="title"
              className={classes.headerTitle}
            >
              {totalHoursLogged.toLocaleString("en")} Hours
            </Typography>
          </div>
        );
      }
    }
  }

  render() {
    const { classes, isMobile, events } = this.props;
    const { year, month } = this.state;

    let disablePrev = false;
    if (month > 1) {
      if (!events[year] || !events[year][month - 1]) {
        disablePrev = true;
      } else {
        disablePrev = false;
      }
    } else {
      if (!events[year - 1] || !events[year - 1][1]) {
        disablePrev = true;
      } else {
        disablePrev = false;
      }
    }

    return (
      <div className={isMobile ? classes.mobileRoot : classes.root}>
        <Paper className={classes.tableWrapper}>
          <div className={classes.header}>
            <Button
              className={
                year !== new Date(Date.now()).getFullYear() ||
                month !== new Date(Date.now()).getMonth() + 1
                  ? classes.headerButton
                  : ""
              }
              disabled={
                year === new Date(Date.now()).getFullYear() &&
                month === new Date(Date.now()).getMonth() + 1
              }
              onClick={() => this.goToNextMonth()}
            >
              Next
            </Button>
            <Typography
              component="h2"
              type="title"
              className={classes.headerTitle}
            >
              {getMonthName(month - 1)} {year}
            </Typography>
            <Button
              className={disablePrev ? "" : classes.headerButton}
              disabled={disablePrev}
              onClick={() => this.goToPrevMonth()}
            >
              Prev
            </Button>
          </div>
          <div
            className={
              events[year] && events[year][month]
                ? classes.tableBody
                : classes.noData
            }
          >
            {this.renderTableBody()}
          </div>
          {events[year] &&
            events[year][month] && <div>{this.renderTableFooter()}</div>}
        </Paper>
      </div>
    );
  }
}

HoursHistory.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HoursHistory);
