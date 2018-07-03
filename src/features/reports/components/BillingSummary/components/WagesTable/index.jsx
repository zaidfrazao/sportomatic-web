/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import accounting from "accounting";
import injectStyles from "react-jss";
import moment from "moment";
import { common, grey } from "../../../../../../utils/colours";

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

class BillingSummaryTable extends Component {
  sortByCoaches() {
    const { wages, dateSelected, users } = this.props;

    let coaches = {};

    wages
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
        if (coaches[info.coachID]) {
          coaches[info.coachID].total = coaches[info.coachID].total + info.wage;
        } else {
          coaches[info.coachID] = {
            firstName: users[info.coachID].info.name,
            lastName: users[info.coachID].info.surname,
            total: info.wage
          };
        }
      });

    return _.toPairs(coaches)
      .sort(([coachIDA, infoA], [coachIDB, infoB]) => {
        if (infoA.lastName > infoB.lastName) {
          return +1;
        } else if (infoA.lastName < infoB.lastName) {
          return -1;
        } else if (infoA.firstName > infoB.firstName) {
          return +1;
        } else if (infoA.firstName < infoB.firstName) {
          return -1;
        } else {
          return 0;
        }
      })
      .map(([coachID, info]) => {
        return info;
      });
  }

  getData() {
    const { classes, isMobile } = this.props;

    let total = 0;
    const coaches = this.sortByCoaches();

    const rows = coaches.map(info => {
      const firstName = info.firstName;
      const lastName = info.lastName;
      const wage = info.total;

      total = total + wage;

      return (
        <tr key={info.id} className={classes.tableRow}>
          {isMobile ? (
            <td className={classes.tableItem}>{`${lastName}, ${firstName}`}</td>
          ) : (
            <td className={classes.tableItem}>{lastName}</td>
          )}
          {!isMobile && <td className={classes.tableItem}>{firstName}</td>}
          <td className={classes.tableItem}>
            {accounting.formatMoney(wage, "R")}
          </td>
        </tr>
      );
    });

    return { rows, total };
  }

  render() {
    const { classes, isMobile } = this.props;

    const { rows, total } = this.getData();

    return (
      <div className={classes.wrapper}>
        <table className={classes.tableWrapper}>
          <tbody>
            <tr className={classes.tableHeader}>
              {isMobile ? (
                <th className={classes.tableHeaderItem}>Name</th>
              ) : (
                <th className={classes.tableHeaderItem}>Last Name</th>
              )}
              {!isMobile && (
                <th className={classes.tableHeaderItem}>First Name</th>
              )}
              <th className={classes.tableHeaderItemRight}>Amount</th>
            </tr>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={isMobile ? 2 : 3} className={classes.emptyState}>
                  No wages this month
                </td>
              </tr>
            ) : (
              rows
            )}
            <tr className={classes.tableFooter}>
              <td
                className={classes.tableFooterItemLeft}
                colSpan={isMobile ? 1 : 2}
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

export default injectStyles(styles)(BillingSummaryTable);
