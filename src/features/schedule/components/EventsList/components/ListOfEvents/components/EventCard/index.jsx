import React, { Component } from "react";
import injectStyles from "react-jss";
import {
  common,
  grey,
  lightBlue,
  red,
  yellow
} from "../../../../../../../../utils/colours";

const styles = {
  cancelledRow: {
    fontSize: 11,
    color: red[700],
    backgroundColor: common["white"],
    padding: "12px 0",
    borderBottom: `1px solid ${grey[100]}`,
    textAlign: "center"
  },
  cancelledIcon: {
    marginRight: 8
  },
  cancelledText: {
    color: red[700]
  },
  desktopTitle: {
    fontSize: 12,
    padding: 12,
    textAlign: "center",
    color: common["white"],
    fontWeight: "bold"
  },
  header: {
    fontSize: 12,
    padding: 12,
    lineHeight: "16px",
    textAlign: "center",
    color: common["white"],
    fontWeight: "bold"
  },
  headerIcon: {
    marginRight: 8
  },
  missingInfoRow: {
    fontSize: 11,
    color: yellow[800],
    backgroundColor: common["white"],
    padding: "12px 0",
    borderBottom: `1px solid ${grey[100]}`,
    textAlign: "center"
  },
  missingInfoIcon: {
    marginRight: 8
  },
  missingInfoText: {
    color: yellow[800]
  },
  row: {
    fontSize: 14,
    backgroundColor: common["white"],
    borderBottom: `1px solid ${grey[100]}`
  },
  rowIcon: {
    textAlign: "center",
    color: common["black"],
    backgroundColor: grey[100],
    padding: "8px 0",
    width: 32,
    marginRight: 8
  },
  rowIconLast: {
    borderRadius: "0 0 0 8px",
    textAlign: "center",
    color: common["black"],
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
    border: `1px solid ${lightBlue[500]}`,
    backgroundColor: lightBlue[500],
    color: lightBlue[500],
    cursor: "pointer",
    "&:hover": {
      border: `1px solid ${lightBlue[400]}`,
      color: lightBlue[400],
      backgroundColor: lightBlue[400]
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
      title,
      isPastEvent,
      isMissingInfo,
      isActionsRequired
    } = this.props;

    const icon = this.getIcon();

    return (
      <div className={classes.wrapper} onClick={() => viewEventInfo()}>
        <div className={classes.header}>
          {icon}
          {title}
        </div>
        {isCancelled && (
          <div className={classes.cancelledRow}>
            <i className={`fas fa-ban ${classes.cancelledIcon}`} />
            <span className={classes.cancelledText}>Cancelled</span>
          </div>
        )}
        {!isCancelled &&
          !isPastEvent &&
          isMissingInfo && (
            <div className={classes.missingInfoRow}>
              <i className={`fas fa-question ${classes.missingInfoIcon}`} />
              <span className={classes.missingInfoText}>Missing info</span>
            </div>
          )}
        {!isCancelled &&
          isPastEvent &&
          isActionsRequired && (
            <div className={classes.cancelledRow}>
              <i className={`fas fa-exclamation ${classes.cancelledIcon}`} />
              <span className={classes.cancelledText}>Actions required</span>
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
