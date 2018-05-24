import React, { Component } from "react";
import accounting from "accounting";
import injectStyles from "react-jss";
import moment from "moment";
import { common, grey } from "../../../../../../../../utils/colours";

const styles = {
  emptyState: {
    padding: "48px 24px",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: grey[400]
  },
  tableItem: {
    padding: 24,
    border: `2px solid ${grey[200]}`,
    margin: 0
  },
  tableFooter: {
    borderTop: `1px solid ${grey[300]}`,
    borderRadius: "0 0 16px 16px",
    width: "100%",
    backgroundColor: grey[100],
    color: grey[800],
    padding: "24px 0",
    fontSize: 18,
    fontWeight: "bold"
  },
  tableHeader: {
    borderBottom: `1px solid ${grey[300]}`,
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
    width: 1150,
    borderCollapse: "collapse"
  },
  wrapper: {
    border: `1px solid ${grey[300]}`,
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
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} className={classes.emptyState}>
                  No wages this month
                </td>
              </tr>
            ) : (
              rows
            )}
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
