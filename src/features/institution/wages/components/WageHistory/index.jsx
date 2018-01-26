/* eslint-disable array-callback-return */
import _ from "lodash";
import React, { Component } from "react";
import accounting from "accounting";
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
import { getMonthName } from "../../../../../utils/dates";

const styles = theme => ({
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
    flexGrow: 1
  },
  noHoursText: {
    textAlign: "center"
  },
  root: {
    flexGrow: 1,
    padding: "24px 40px 40px 40px",
    maxWidth: 970,
    margin: "0 auto"
  },
  tableWrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  }
});

class WageHistory extends Component {
  state = {
    year: new Date(Date.now()).getFullYear(),
    month: new Date(Date.now()).getMonth() + 1,
    isLoading: false
  };

  componentWillMount() {
    const { coachID, institutionID } = this.props;
    const { loadWages } = this.props.actions;

    if (coachID && institutionID) {
      loadWages(institutionID, coachID);
      this.setState({
        isLoading: true
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { coachID, institutionID, isLoading } = nextProps;
    const { loadWages } = nextProps.actions;

    if (
      coachID !== this.props.coachID ||
      institutionID !== this.props.institutionID
    ) {
      loadWages(institutionID, coachID);
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

  getWagesThisMonth() {
    const { month, year } = this.state;
    const { wages } = this.props;

    return _.fromPairs(
      _.toPairs(wages).filter(([wageID, wageInfo]) => {
        const startTime = moment(wageInfo.date);
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
    const { classes, isMobile, isTablet } = this.props;

    const wagesThisMonth = this.getWagesThisMonth();

    let totalWages = 0;
    let totalStandardHours = 0;
    let totalOvertimeHours = 0;
    _.toPairs(wagesThisMonth).map(([wageID, wageInfo]) => {
      totalWages += wageInfo.wage;
      totalStandardHours += wageInfo.hours.standard;
      totalOvertimeHours += wageInfo.hours.overtime;
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
            {_.keys(wagesThisMonth).length === 0 ? (
              <TableRow>
                <TableCell colSpan={2} className={classes.noHoursText}>
                  No wages logged
                </TableCell>
              </TableRow>
            ) : (
              _.toPairs(wagesThisMonth).map(([wageID, wageInfo]) => {
                const { wage, date } = wageInfo;

                return (
                  <TableRow key={wageID}>
                    <TableCell>{moment(date).format("YYYY/MM/DD")}</TableCell>
                    <TableCell numeric>
                      {accounting.formatMoney(wage, "R")}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>TOTAL</TableCell>
              <TableCell numeric>
                {accounting.formatMoney(totalWages, "R")}
              </TableCell>
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
              <TableCell numeric>Wage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_.keys(wagesThisMonth).length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className={classes.noHoursText}>
                  No wages logged
                </TableCell>
              </TableRow>
            ) : (
              _.toPairs(wagesThisMonth).map(([wageID, wageInfo]) => {
                const { wage, date, hours } = wageInfo;

                return (
                  <TableRow key={wageID}>
                    <TableCell>{moment(date).format("YYYY/MM/DD")}</TableCell>
                    <TableCell numeric>{hours.standard}</TableCell>
                    <TableCell numeric>{hours.overtime}</TableCell>
                    <TableCell numeric>
                      {accounting.formatMoney(wage, "R")}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>TOTAL</TableCell>
              <TableCell numeric>{totalStandardHours}</TableCell>
              <TableCell numeric>{totalOvertimeHours}</TableCell>
              <TableCell numeric>
                {accounting.formatMoney(totalWages, "R")}
              </TableCell>
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
              <TableCell>Details</TableCell>
              <TableCell numeric>Standard Hours</TableCell>
              <TableCell numeric>Overtime Hours</TableCell>
              <TableCell numeric>Wage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_.keys(wagesThisMonth).length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className={classes.noHoursText}>
                  No wages logged
                </TableCell>
              </TableRow>
            ) : (
              _.toPairs(wagesThisMonth).map(([wageID, wageInfo]) => {
                const { wage, date, hours, title } = wageInfo;

                return (
                  <TableRow key={wageID}>
                    <TableCell>{moment(date).format("YYYY/MM/DD")}</TableCell>
                    <TableCell>{title}</TableCell>
                    <TableCell numeric>{hours.standard}</TableCell>
                    <TableCell numeric>{hours.overtime}</TableCell>
                    <TableCell numeric>
                      {accounting.formatMoney(wage, "R")}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>TOTAL</TableCell>
              <TableCell />
              <TableCell numeric>{totalStandardHours}</TableCell>
              <TableCell numeric>{totalOvertimeHours}</TableCell>
              <TableCell numeric>
                {accounting.formatMoney(totalWages, "R")}
              </TableCell>
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

export default withStyles(styles)(WageHistory);
