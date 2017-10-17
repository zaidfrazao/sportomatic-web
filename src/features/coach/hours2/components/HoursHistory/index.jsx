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
      month: new Date(Date.now()).getMonth()
    };
  }

  goToPrevMonth() {
    if (this.state.month > 0) {
      this.setState({ month: this.state.month - 1 });
    } else {
      this.setState({ year: this.state.year - 1 });
      this.setState({ month: 11 });
    }
  }

  goToNextMonth() {
    if (this.state.month < 11) {
      this.setState({ month: this.state.month + 1 });
    } else {
      this.setState({ year: this.state.year + 1 });
      this.setState({ month: 0 });
    }
  }

  renderTableBody() {
    const { isMobile, isTablet, hoursData } = this.props;
    const { year, month } = this.state;
    const dateOptions = {
      month: "short",
      day: "numeric",
      year: "numeric"
    };

    if (!hoursData[year] || !hoursData[year][month]) {
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
            {hoursData[year][month].records.map(record => {
              return (
                <TableRow key={record.id}>
                  <TableCell>
                    {new Date(record.date).toLocaleDateString(
                      "en-US",
                      dateOptions
                    )}
                  </TableCell>
                  <TableCell numeric>{record.hours}</TableCell>
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
            {hoursData[year][month].records.map(record => {
              return (
                <TableRow key={record.id}>
                  <TableCell>
                    {new Date(record.date).toLocaleDateString(
                      "en-US",
                      dateOptions
                    )}
                  </TableCell>
                  <TableCell>{record.signInTime}</TableCell>
                  <TableCell>{record.signOutTime}</TableCell>
                  <TableCell numeric>{record.hours}</TableCell>
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
            {hoursData[year][month].records.map(record => {
              return (
                <TableRow key={record.id}>
                  <TableCell>
                    {new Date(record.date).toLocaleDateString(
                      "en-US",
                      dateOptions
                    )}
                  </TableCell>
                  <TableCell>{record.event}</TableCell>
                  <TableCell>{record.signInTime}</TableCell>
                  <TableCell>{record.signOutTime}</TableCell>
                  <TableCell numeric>{record.hours}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      );
    }
  }

  renderTableFooter() {
    const { classes, isMobile, hoursData } = this.props;
    const { year, month } = this.state;

    if (hoursData[year] && hoursData[year][month]) {
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
              {hoursData[year][month].total.toLocaleString("en")}
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
              {hoursData[year][month].total.toLocaleString("en")} Hours
            </Typography>
          </div>
        );
      }
    }
  }

  render() {
    const { classes, isMobile, hoursData } = this.props;
    const { year, month } = this.state;
    return (
      <div className={isMobile ? classes.mobileRoot : classes.root}>
        <Paper className={classes.tableWrapper}>
          <div className={classes.header}>
            <Button
              className={
                year !== new Date(Date.now()).getFullYear() ||
                month !== new Date(Date.now()).getMonth()
                  ? classes.headerButton
                  : ""
              }
              disabled={
                year === new Date(Date.now()).getFullYear() &&
                month === new Date(Date.now()).getMonth()
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
              {getMonthName(month)} {year}
            </Typography>
            <Button
              className={classes.headerButton}
              onClick={() => this.goToPrevMonth()}
            >
              Prev
            </Button>
          </div>
          <div
            className={
              hoursData[year] && hoursData[year][month]
                ? classes.tableBody
                : classes.noData
            }
          >
            {this.renderTableBody()}
          </div>
          <div>{this.renderTableFooter()}</div>
        </Paper>
      </div>
    );
  }
}

HoursHistory.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HoursHistory);
