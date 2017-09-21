// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
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

class WagesTable extends Component {
  renderTableBody() {
    const { isMobile, isTablet, wageInfo } = this.props;
    const dateOptions = {
      month: "short",
      day: "numeric",
      year: "numeric"
    };

    if (!wageInfo) {
      return (
        <Typography type="body2" component="p">
          No wage data
        </Typography>
      );
    }

    if (isMobile) {
      return (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell numeric>Wage (R)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {wageInfo.records.map(record => {
              return (
                <TableRow key={record.id}>
                  <TableCell>
                    {new Date(record.date).toLocaleDateString(
                      "en-US",
                      dateOptions
                    )}
                  </TableCell>
                  <TableCell numeric>{record.wage}</TableCell>
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
              <TableCell>Event</TableCell>
              <TableCell numeric>Wage (R)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {wageInfo.records.map(record => {
              return (
                <TableRow key={record.id}>
                  <TableCell>
                    {new Date(record.date).toLocaleDateString(
                      "en-US",
                      dateOptions
                    )}
                  </TableCell>
                  <TableCell>{record.event}</TableCell>
                  <TableCell numeric>{record.wage}</TableCell>
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
              <TableCell>Payment Type</TableCell>
              <TableCell numeric>Wage (R)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {wageInfo.records.map(record => {
              return (
                <TableRow key={record.id}>
                  <TableCell>
                    {new Date(record.date).toLocaleDateString(
                      "en-US",
                      dateOptions
                    )}
                  </TableCell>
                  <TableCell>{record.event}</TableCell>
                  <TableCell>{record.paymentType}</TableCell>
                  <TableCell numeric>{record.wage}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      );
    }
  }

  renderTableFooter() {
    const { classes, isMobile, wageInfo } = this.props;

    if (wageInfo) {
      if (!isMobile) {
        return (
          <div className={classes.footer}>
            <Typography
              component="h2"
              type="title"
              className={classes.headerTitle}
            >
              Total
            </Typography>
            <Typography
              component="h2"
              type="title"
              className={classes.headerTitle}
            >
              R{wageInfo.total.toLocaleString("en")}
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
              R{wageInfo.total.toLocaleString("en")}
            </Typography>
          </div>
        );
      }
    }
  }

  render() {
    const { classes, isMobile, year, month, wageInfo } = this.props;
    return (
      <div className={isMobile ? classes.mobileRoot : classes.root}>
        <Paper className={classes.tableWrapper}>
          <div className={classes.header}>
            <Route
              render={({ history }) => (
                <Button
                  className={
                    year !== new Date(Date.now()).getFullYear() ||
                    month !== new Date(Date.now()).getMonth() ? (
                      classes.headerButton
                    ) : (
                      ""
                    )
                  }
                  disabled={
                    year === new Date(Date.now()).getFullYear() &&
                    month === new Date(Date.now()).getMonth()
                  }
                  onClick={() => {
                    if (month < 11) {
                      history.push(`/coach/wages/${year}-${month + 1}`);
                    } else {
                      history.push(`/coach/wages/${year + 1}-0`);
                    }
                  }}
                >
                  Next
                </Button>
              )}
            />
            <Typography
              component="h2"
              type="title"
              className={classes.headerTitle}
            >
              {getMonthName(month)} {year}
            </Typography>
            <Route
              render={({ history }) => (
                <Button
                  className={classes.headerButton}
                  onClick={() => {
                    if (month > 0) {
                      history.push(`/coach/wages/${year}-${month - 1}`);
                    } else {
                      history.push(`/coach/wages/${year - 1}-11`);
                    }
                  }}
                >
                  Prev
                </Button>
              )}
            />
          </div>
          <div className={wageInfo ? classes.tableBody : classes.noData}>
            {this.renderTableBody()}
          </div>
          <div>{this.renderTableFooter()}</div>
        </Paper>
      </div>
    );
  }
}

WagesTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WagesTable);
