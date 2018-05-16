import React, { Component } from "react";
import injectStyles from "react-jss";
import {
  common,
  grey,
  lightBlue,
  red
} from "../../../../../../../../utils/colours";

const styles = {
  cancelledRow: {
    fontSize: 14,
    color: red[500],
    backgroundColor: common["white"],
    padding: "12px 0",
    borderBottom: `1px solid ${grey[100]}`,
    textAlign: "center"
  },
  cancelledIcon: {
    marginRight: 8
  },
  cancelledText: {
    color: red[500]
  },
  header: {
    padding: 12,
    textAlign: "center",
    color: common["white"],
    fontWeight: "bold"
  },
  headerIcon: {
    margin: "0 12px"
  },
  row: {
    fontSize: 14,
    backgroundColor: common["white"],
    borderBottom: `1px solid ${grey[100]}`
  },
  rowIcon: {
    textAlign: "center",
    backgroundColor: grey[100],
    padding: "8px 0",
    width: 32,
    marginRight: 8
  },
  rowIconLast: {
    borderRadius: "0 0 0 8px",
    textAlign: "center",
    backgroundColor: grey[100],
    padding: "8px 0",
    width: 32,
    marginRight: 8
  },
  rowLast: {
    borderRadius: "0 0 8px 8px",
    fontSize: 14,
    backgroundColor: common["white"]
  },
  rowText: {
    color: common["black"],
    fontSize: 11
  },
  wrapper: {
    transition: "0.25s",
    margin: 12,
    borderRadius: 8,
    border: `1px solid ${lightBlue[800]}`,
    backgroundColor: lightBlue[800],
    color: lightBlue[800],
    cursor: "pointer",
    "&:hover": {
      border: `1px solid ${lightBlue[700]}`,
      color: lightBlue[700],
      backgroundColor: lightBlue[700]
    }
  }
};

class EventCard extends Component {
  getIcon() {
    const { classes, isCompetitive } = this.props;

    if (isCompetitive)
      return <i className={`fas fa-trophy ${classes.headerIcon}`} />;
    return <i className={`fas fa-dumbbell ${classes.headerIcon}`} />;
  }

  render() {
    const {
      classes,
      startTime,
      endTime,
      viewEventInfo,
      isCancelled,
      isTablet,
      title
    } = this.props;

    const icon = this.getIcon();

    return (
      <div className={classes.wrapper} onClick={() => viewEventInfo()}>
        <div className={classes.header}>
          {icon}
          {isTablet ? title : ""}
        </div>
        {isCancelled && (
          <div className={classes.cancelledRow}>
            <i className={`fas fa-ban ${classes.cancelledIcon}`} />
            <span className={classes.cancelledText}>Cancelled</span>
          </div>
        )}
        <div className={classes.row}>
          <i className={`fas fa-hourglass-start ${classes.rowIcon}`} />
          <span className={classes.rowText}>{startTime}</span>
        </div>
        <div className={classes.rowLast}>
          <i className={`fas fa-hourglass-end ${classes.rowIconLast}`} />
          <span className={classes.rowText}>{endTime}</span>
        </div>
      </div>
    );
  }
}

export default injectStyles(styles)(EventCard);
