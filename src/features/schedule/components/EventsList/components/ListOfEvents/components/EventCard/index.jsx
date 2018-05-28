import React, { Component } from "react";
import injectStyles from "react-jss";
import {
  common,
  grey,
  red,
  yellow
} from "../../../../../../../../utils/colours";

const styles = {
  cancelledRow: {
    fontSize: props => (props.isTablet ? 16 : 14),
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
  header: {
    borderBottom: `1px solid ${grey[300]}`,
    fontSize: props => (props.isTablet ? 16 : 14),
    padding: "24px 12px",
    lineHeight: props => (props.isTablet ? "22px" : "18px"),
    textAlign: "center",
    fontWeight: "bold",
    color: grey[800]
  },
  headerIcon: {
    marginRight: 8
  },
  headerIconCompetitive: {
    marginRight: 8,
    color: yellow[800]
  },
  missingInfoRow: {
    fontSize: props => (props.isTablet ? 16 : 14),
    color: red[700],
    backgroundColor: common["white"],
    padding: "12px 0",
    borderBottom: `1px solid ${grey[100]}`,
    textAlign: "center"
  },
  missingInfoIcon: {
    marginRight: 8
  },
  missingInfoText: {
    color: red[700]
  },
  row: {
    display: "flex",
    alignItems: "center",
    backgroundColor: common["white"],
    borderBottom: `1px solid ${grey[100]}`
  },
  rowIcon: {
    textAlign: "center",
    color: common["black"],
    backgroundColor: grey[100],
    padding: "8px 0",
    fontWeight: "bold",
    fontSize: 14,
    width: props => (props.isTablet ? 80 : 32),
    marginRight: 8
  },
  rowIconLast: {
    borderRadius: "0 0 0 8px",
    textAlign: "center",
    color: common["black"],
    backgroundColor: grey[100],
    padding: "8px 0",
    fontWeight: "bold",
    fontSize: props => 14,
    width: props => (props.isTablet ? 80 : 32),
    marginRight: 8
  },
  rowLast: {
    display: "flex",
    alignItems: "center",
    borderRadius: "0 0 8px 8px",
    fontSize: 14,
    backgroundColor: common["white"]
  },
  rowTabletText: {
    marginLeft: 8
  },
  rowText: {
    color: common["black"],
    fontSize: props => (props.isTablet ? 16 : 14)
  },
  wrapper: {
    transition: "0.25s",
    margin: 12,
    borderRadius: 8,
    border: `1px solid ${grey[300]}`,
    backgroundColor: grey[100],
    color: grey[100],
    cursor: "pointer",
    "&:hover": {
      boxShadow:
        "0 0px 0px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
    }
  }
};

class EventCard extends Component {
  getIcon() {
    const { classes, isCompetitive } = this.props;

    if (isCompetitive)
      return <i className={`fas fa-trophy ${classes.headerIconCompetitive}`} />;
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
      isActionsRequired,
      isTablet
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
          <div className={classes.rowIcon}>
            <i className={`fas fa-hourglass-start`} />
            {isTablet && <span className={classes.rowTabletText}>Starts</span>}
          </div>
          <span className={classes.rowText}>{startTime}</span>
        </div>
        <div className={classes.rowLast}>
          <div className={classes.rowIconLast}>
            <i className={`fas fa-hourglass-start`} />
            {isTablet && <span className={classes.rowTabletText}>Ends</span>}
          </div>
          <span className={classes.rowText}>{endTime}</span>
        </div>
      </div>
    );
  }
}

export default injectStyles(styles)(EventCard);
