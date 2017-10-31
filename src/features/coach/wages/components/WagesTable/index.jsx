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
  TableFooter,
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

class WagesTable extends Component {
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
    const { isMobile, isTablet, wages } = this.props;
    const { year, month } = this.state;
    const dateOptions = {
      month: "short",
      day: "numeric",
      year: "numeric"
    };

    if (!wages[year] || !wages[year][month]) {
      return (
        <Typography type="body2" component="p">
          No wages recorded
        </Typography>
      );
    } else {
      let totalStandardHours = 0;
      let totalOvertimeHours = 0;
      let totalWages = 0;

      _.toPairs(wages[year][month]).map(([id, info]) => {
        totalStandardHours += info.hours.standard;
        totalOvertimeHours += info.hours.overtime;
        totalWages += info.wage;
      });

      if (isMobile) {
        return (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell numeric>Wage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_.toPairs(wages[year][month]).map(([id, info]) => {
                return (
                  <TableRow key={id}>
                    <TableCell>
                      {new Date(info.date).toLocaleDateString(
                        "en-US",
                        dateOptions
                      )}
                    </TableCell>
                    <TableCell numeric>R {info.wage}.00</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>TOTAL</TableCell>
                <TableCell numeric>R {totalWages}.00</TableCell>
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
                <TableCell numeric>Standard Hours</TableCell>
                <TableCell numeric>Overtime Hours</TableCell>
                <TableCell numeric>Wages</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_.toPairs(wages[year][month]).map(([id, info]) => {
                return (
                  <TableRow key={id}>
                    <TableCell>
                      {new Date(info.date).toLocaleDateString(
                        "en-US",
                        dateOptions
                      )}
                    </TableCell>
                    <TableCell numeric>{info.hours.standard}</TableCell>
                    <TableCell numeric>{info.hours.overtime}</TableCell>
                    <TableCell numeric>R {info.wage}.00</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>TOTAL</TableCell>
                <TableCell numeric>{totalStandardHours}</TableCell>
                <TableCell numeric>{totalOvertimeHours}</TableCell>
                <TableCell numeric>R {totalWages}.00</TableCell>
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
                <TableCell>Title</TableCell>
                <TableCell numeric>Standard Hours</TableCell>
                <TableCell numeric>Overtime Hours</TableCell>
                <TableCell numeric>Wages</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_.toPairs(wages[year][month]).map(([id, info]) => {
                return (
                  <TableRow key={id}>
                    <TableCell>
                      {new Date(info.date).toLocaleDateString(
                        "en-US",
                        dateOptions
                      )}
                    </TableCell>
                    <TableCell>{info.title}</TableCell>
                    <TableCell numeric>{info.hours.standard}</TableCell>
                    <TableCell numeric>{info.hours.overtime}</TableCell>
                    <TableCell numeric>R {info.wage}.00</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>TOTAL</TableCell>
                <TableCell />
                <TableCell numeric>{totalStandardHours}</TableCell>
                <TableCell numeric>{totalOvertimeHours}</TableCell>
                <TableCell numeric>R {totalWages}.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        );
      }
    }
  }

  render() {
    const { classes, isMobile, wages } = this.props;
    const { year, month } = this.state;

    let disablePrev = false;
    if (month > 1) {
      if (!wages[year] || !wages[year][month - 1]) {
        disablePrev = true;
      } else {
        disablePrev = false;
      }
    } else {
      if (!wages[year - 1] || !wages[year - 1][1]) {
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
              wages[year] && wages[year][month]
                ? classes.tableBody
                : classes.noData
            }
          >
            {this.renderTableBody()}
          </div>
        </Paper>
      </div>
    );
  }
}

WagesTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WagesTable);
