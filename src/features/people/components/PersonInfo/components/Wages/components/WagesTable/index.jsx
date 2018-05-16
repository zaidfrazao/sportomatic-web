import React, { Component } from "react";
import accounting from "accounting";
import injectStyles from "react-jss";
import moment from "moment";
import {
  common,
  green,
  grey,
  red
} from "../../../../../../../../utils/colours";

const styles = {
  deltaNegative: {
    fontWeight: "bold",
    padding: 8,
    borderRadius: 8,
    fontSize: 12,
    margin: "0 12px",
    backgroundColor: red[500],
    color: common["white"]
  },
  deltaPositive: {
    fontWeight: "bold",
    padding: 8,
    borderRadius: 8,
    fontSize: 12,
    margin: "0 12px",
    backgroundColor: green[500],
    color: common["white"]
  },
  icon: {
    marginRight: 12
  },
  messageAwaitingApproval: {
    textAlign: "center",
    color: red[900]
  },
  messageCancelled: {
    textAlign: "center",
    color: grey[600]
  },
  messageAbsentBad: {
    textAlign: "center",
    color: red[900]
  },
  messageAbsentGood: {
    textAlign: "center",
    color: grey[600]
  },
  tableItem: {
    padding: 24,
    border: `2px solid ${grey[100]}`,
    margin: 0
  },
  tableItemNegative: {
    color: red[500],
    padding: 24,
    border: `2px solid ${grey[100]}`,
    margin: 0
  },
  tableItemPositive: {
    color: green[500],
    padding: 24,
    border: `2px solid ${grey[100]}`,
    margin: 0
  },
  tableFooter: {
    borderRadius: "0 0 16px 16px",
    width: "100%",
    backgroundColor: grey[100],
    color: grey[800],
    padding: "24px 0",
    fontSize: 18,
    fontWeight: "bold"
  },
  tableHeader: {
    borderRadius: "16px 16px 0 0",
    width: "100%",
    backgroundColor: grey[100],
    color: grey[800],
    padding: "24px 0",
    fontSize: 18,
    fontWeight: "bold"
  },
  tableRow: {
    width: "100%"
  },
  tableWrapper: {
    width: 1152,
    border: `2px solid ${grey[100]}`,
    borderSpacing: 2,
    borderCollapse: "collapse"
  },
  wrapper: {
    borderRadius: 16,
    backgroundColor: common["white"],
    overflow: "auto"
  }
};

class WagesTable extends Component {
  getData() {
    const { classes, wages, dateSelected } = this.props;

    let total = 0;

    const rows = wages
      .filter(info => {
        const dateSelectedMoment = moment(dateSelected);
        const hourDateMoment = moment(info.date);

        if (
          hourDateMoment.month() === dateSelectedMoment.month() &&
          hourDateMoment.year() === dateSelectedMoment.year()
        ) {
          return true;
        }
        return false;
      })
      .map(info => {
        const date = moment(info.date).format("D MMMM YYYY");
        const title = info.title;
        const wage = info.wage;
        const type = info.type;

        total = total + wage;

        let formattedType = "Hourly rate";
        if (type === "FIXED") {
          formattedType = "Fixed rate per session";
        } else if (type === "SALARY") {
          formattedType = "Monthly salary";
        } else if (type === "DEDUCTION") {
          formattedType = "Deduction";
        } else if (type === "ADDITION") {
          formattedType = "Custom addition";
        }

        return (
          <tr key={info.id} className={classes.tableRow}>
            <td className={classes.tableItem}>{date}</td>
            <td className={classes.tableItem}>{title}</td>
            <td className={classes.tableItem}>{formattedType}</td>
            <td className={classes.tableItem}>
              {accounting.formatMoney(wage, "R")}
            </td>
          </tr>
        );
      });

    return { rows, total };
  }

  render() {
    const { classes } = this.props;

    const { rows, total } = this.getData();

    return (
      <div className={classes.wrapper}>
        <table className={classes.tableWrapper}>
          <tbody>
            <tr className={classes.tableHeader}>
              <th className={classes.tableItem}>Date</th>
              <th className={classes.tableItem}>Reason</th>
              <th className={classes.tableItem}>Type</th>
              <th className={classes.tableItem}>Amount</th>
            </tr>
            {rows}
            <tr className={classes.tableFooter}>
              <td className={classes.tableItem} colSpan={3}>
                TOTAL
              </td>
              <td className={classes.tableItem}>
                {accounting.formatMoney(total, "R")}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default injectStyles(styles)(WagesTable);
