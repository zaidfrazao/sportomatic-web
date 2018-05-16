import React, { Component } from "react";
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

class HoursTable extends Component {
  getData() {
    const { classes, hours, dateSelected } = this.props;

    let totals = {
      signInDelta: 0,
      signOutDelta: 0,
      hours: 0
    };

    const rows = hours
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
        const hoursStatus = info.hours.status;
        const eventStatus = info.status;
        const date = moment(info.date).format("D MMMM YYYY");
        const title = info.title;
        const wasAbsent = info.absenteeism.wasAbsent;

        if (hoursStatus === "APPROVED") {
          const signInMoment = moment(info.hours.times.signIn);
          const signOutMoment = moment(info.hours.times.signOut);
          const signInTime = signInMoment.format("hh:mm A");
          const signOutTime = signOutMoment.format("hh:mm A");
          const hours = signOutMoment.diff(signInMoment, "hours");
          const startMoment = moment(info.times.start);
          const endMoment = moment(info.times.end);
          const signInDelta = signInMoment.diff(startMoment, "minutes");
          const signOutDelta = signOutMoment.diff(endMoment, "minutes");

          totals.signInDelta = totals.signInDelta + signInDelta;
          totals.signOutDelta = totals.signOutDelta + signOutDelta;
          totals.hours = totals.hours + hours;

          return (
            <tr key={info.id} className={classes.tableRow}>
              <td className={classes.tableItem}>{date}</td>
              <td className={classes.tableItem}>{title}</td>
              <td className={classes.tableItem}>
                {signInTime}
                <span
                  className={
                    signInDelta > 0
                      ? classes.deltaNegative
                      : classes.deltaPositive
                  }
                >
                  {signInDelta > 0 ? "+" : "-"}
                  {Math.abs(signInDelta)} min
                </span>
              </td>
              <td className={classes.tableItem}>
                {signOutTime}
                <span
                  className={
                    signOutDelta > 0
                      ? classes.deltaNegative
                      : classes.deltaPositive
                  }
                >
                  {signOutDelta > 0 ? "+" : "-"}
                  {Math.abs(signOutDelta)} min
                </span>
              </td>
              <td className={classes.tableItem}>{hours}</td>
            </tr>
          );
        } else if (eventStatus === "CANCELLED") {
          return (
            <tr key={info.id} className={classes.tableRow}>
              <td className={classes.tableItem}>{date}</td>
              <td className={classes.tableItem}>{title}</td>
              <td className={classes.tableItem} colSpan={3}>
                <div className={classes.messageCancelled}>
                  <i className={`fas fa-ban ${classes.icon}`} />Event was
                  cancelled
                </div>
              </td>
            </tr>
          );
        } else if (wasAbsent) {
          const absentRating = info.absenteeism.rating;

          return (
            <tr key={info.id} className={classes.tableRow}>
              <td className={classes.tableItem}>{date}</td>
              <td className={classes.tableItem}>{title}</td>
              <td className={classes.tableItem} colSpan={3}>
                <div
                  className={
                    absentRating === "GOOD"
                      ? classes.messageAbsentGood
                      : classes.messageAbsentBad
                  }
                >
                  {absentRating === "GOOD" ? (
                    <i className={`fas fa-thumbs-up ${classes.icon}`} />
                  ) : (
                    <i className={`fas fa-thumbs-down ${classes.icon}`} />
                  )}
                  {absentRating === "GOOD"
                    ? "Absent with excuse"
                    : "Absent without excuse"}
                </div>
              </td>
            </tr>
          );
        } else {
          return (
            <tr key={info.id} className={classes.tableRow}>
              <td className={classes.tableItem}>{date}</td>
              <td className={classes.tableItem}>{title}</td>
              <td className={classes.tableItem} colSpan={3}>
                <div className={classes.messageAwaitingApproval}>
                  <i className={`fas fa-exclamation ${classes.icon}`} />Hours
                  awaiting approval
                </div>
              </td>
            </tr>
          );
        }
      });

    return { rows, totals };
  }

  render() {
    const { classes } = this.props;

    const { rows, totals } = this.getData();

    return (
      <div className={classes.wrapper}>
        <table className={classes.tableWrapper}>
          <tbody>
            <tr className={classes.tableHeader}>
              <th className={classes.tableItem}>Date</th>
              <th className={classes.tableItem}>Event</th>
              <th className={classes.tableItem}>Sign in</th>
              <th className={classes.tableItem}>Sign out</th>
              <th className={classes.tableItem}>Hours</th>
            </tr>
            {rows}
            <tr className={classes.tableFooter}>
              <td className={classes.tableItem} colSpan={2}>
                TOTAL
              </td>
              <td
                className={
                  totals.signInDelta > 0
                    ? classes.tableItemNegative
                    : classes.tableItemPositive
                }
              >
                {totals.signInDelta > 0 ? "+" : "-"}
                {Math.abs(totals.signInDelta)} min
              </td>
              <td
                className={
                  totals.signOutDelta > 0
                    ? classes.tableItemNegative
                    : classes.tableItemPositive
                }
              >
                {totals.signOutDelta > 0 ? "+" : "-"}
                {Math.abs(totals.signOutDelta)} min
              </td>
              <td className={classes.tableItem}>{totals.hours}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default injectStyles(styles)(HoursTable);
