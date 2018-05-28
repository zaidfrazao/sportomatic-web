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
    fontSize: 14,
    padding: "18px 24px",
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
  tableFooterItem: {
    padding: 24,
    margin: 0
  },
  tableFooterItemLeft: {
    borderRadius: "0 0 0 16px",
    padding: 24,
    margin: 0
  },
  tableFooterItemRight: {
    borderRadius: "0 0 16px 0",
    padding: 24,
    margin: 0
  },
  tableHeader: {
    borderRadius: "16px 16px 0 0",
    width: "100%",
    color: grey[800],
    backgroundColor: grey[100],
    padding: "24px 0",
    fontSize: 18,
    fontWeight: "bold"
  },
  tableHeaderItem: {
    padding: 24,
    margin: 0
  },
  tableHeaderItemLeft: {
    borderRadius: "16px 0 0 0",
    padding: 24,
    margin: 0
  },
  tableHeaderItemRight: {
    borderRadius: "0 16px 0 0",
    padding: 24,
    margin: 0
  },
  tableRow: {
    width: "100%"
  },
  tableWrapper: {
    width: "100%",
    borderCollapse: "collapse"
  },
  wrapper: {
    border: `1px solid ${grey[300]}`,
    borderRadius: 16,
    backgroundColor: common["white"]
  }
};

class WagesTable extends Component {
  getData() {
    const { classes, wages, dateSelected, isMobile, isTablet } = this.props;

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
            {!isMobile && <td className={classes.tableItem}>{title}</td>}
            {!isTablet && (
              <td className={classes.tableItem}>{formattedType}</td>
            )}
            <td className={classes.tableItem}>
              {accounting.formatMoney(wage, "R")}
            </td>
          </tr>
        );
      });

    return { rows, total };
  }

  render() {
    const { classes, isMobile, isTablet } = this.props;

    const { rows, total } = this.getData();

    return (
      <div className={classes.wrapper}>
        <table className={classes.tableWrapper}>
          <tbody>
            <tr className={classes.tableHeader}>
              <th className={classes.tableHeaderItemLeft}>Date</th>
              {!isMobile && <th className={classes.tableHeaderItem}>Reason</th>}
              {!isTablet && <th className={classes.tableHeaderItem}>Type</th>}
              <th className={classes.tableHeaderItemRight}>Amount</th>
            </tr>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={isMobile ? 2 : isTablet ? 3 : 4}
                  className={classes.emptyState}
                >
                  No wages this month
                </td>
              </tr>
            ) : (
              rows
            )}
            <tr className={classes.tableFooter}>
              <td
                className={classes.tableFooterItemLeft}
                colSpan={isMobile ? 1 : isTablet ? 2 : 3}
              >
                TOTAL
              </td>
              <td className={classes.tableFooterItemRight}>
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
