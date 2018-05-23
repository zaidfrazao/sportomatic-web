import React, { Component } from "react";
import injectStyles from "react-jss";
import moment from "moment";
import {
  common,
  green,
  grey,
  lightBlue,
  red
} from "../../../../../../utils/colours";

const styles = {
  dateWrapper: {
    margin: "24px 0 8px 0",
    padding: "0 12px",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center"
  },
  header: {
    fontSize: 18,
    borderRadius: "16px 16px 0 0",
    padding: 24,
    textAlign: "center",
    fontWeight: "bold",
    color: grey[800],
    backgroundColor: grey[100]
  },
  iconComplete: {
    textAlign: "center",
    color: green[500],
    width: 60,
    padding: "24px 0"
  },
  iconIncomplete: {
    textAlign: "center",
    color: red[500],
    width: 60,
    padding: "24px 0"
  },
  infoWrapper: {
    display: "flex",
    flexWrap: "wrap"
  },
  infoSectionWrapper: {
    width: props => (props.isMobile ? "100%" : "50%")
  },
  listIconWrapper: {
    textAlign: "center",
    backgroundColor: grey[100],
    width: 60,
    padding: "24px 0"
  },
  listText: {
    flex: 1,
    padding: "0 12px",
    color: grey[700]
  },
  listWrapper: {
    borderTop: `1px solid ${grey[100]}`,
    display: "flex",
    alignItems: "center"
  },
  timeWrapper: {
    textAlign: "center",
    color: grey[700],
    flexGrow: 1,
    fontSize: 20
  },
  startEndWrapper: {
    width: "100%",
    maxWidth: 260,
    margin: "0 auto",
    marginBottom: 24,
    display: "flex",
    alignItems: "center"
  },
  viewButton: {
    borderRadius: "0 0 16px 16px",
    textAlign: "center",
    color: common["white"],
    backgroundColor: lightBlue[500],
    padding: "24px 0",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: lightBlue[400]
    }
  },
  wrapper: {
    margin: 24,
    borderRadius: 16,
    backgroundColor: common["white"]
  }
};

class EventCard extends Component {
  getEventTypeIcon() {
    const { isCompetitive } = this.props;

    if (isCompetitive) return "fas fa-trophy";
    return "fas fa-dumbbell";
  }

  getHoursInfo() {
    const { classes, isHoursLogged, hasHoursLogging } = this.props;

    let text = "";
    let icon = <div />;

    if (hasHoursLogging) {
      if (isHoursLogged) {
        text = "Hours logged";
        icon = (
          <div className={classes.iconComplete}>
            <i className="fas fa-check" />
          </div>
        );
      } else {
        text = "Hours not logged";
        icon = (
          <div className={classes.iconIncomplete}>
            <i className="fas fa-times" />
          </div>
        );
      }
    } else {
      text = "No hours to log";
    }

    return {
      text,
      icon
    };
  }

  getResultsInfo() {
    // const { classes, isResultsLogged, isCompetitive } = this.props;

    let text = "Results feature coming soon";
    let icon = <div />;

    // if (isCompetitive) {
    //   if (isResultsLogged) {
    //     text = "Results logged";
    //     icon = (
    //       <div className={classes.iconComplete}>
    //         <i className="fas fa-check" />
    //       </div>
    //     );
    //   } else {
    //     text = "Results not logged";
    //     icon = (
    //       <div className={classes.iconIncomplete}>
    //         <i className="fas fa-times" />
    //       </div>
    //     );
    //   }
    // } else {
    //   text = "Results not relevant";
    // }

    return {
      text,
      icon
    };
  }

  render() {
    const {
      classes,
      relativeTime,
      times,
      viewEventInfo,
      title,
      eventType,
      venue,
      notes
    } = this.props;

    const eventTypeIcon = this.getEventTypeIcon();
    const hoursInfo = this.getHoursInfo();
    const resultsInfo = this.getResultsInfo();
    const formattedTimes = {
      start: moment(times.start).format("hh:mm A"),
      end: moment(times.end).format("hh:mm A")
    };

    return (
      <div className={classes.wrapper}>
        <div className={classes.header}>{title}</div>
        <div className={classes.dateWrapper}>{relativeTime}</div>
        <div className={classes.startEndWrapper}>
          <div className={classes.timeWrapper}>{formattedTimes.start}</div>
          <div className={classes.timesSeparator}>-</div>
          <div className={classes.timeWrapper}>{formattedTimes.end}</div>
        </div>
        <div className={classes.infoWrapper}>
          <div className={classes.infoSectionWrapper}>
            <div className={classes.listWrapper}>
              <div className={classes.listIconWrapper}>
                <i className={eventTypeIcon} />
              </div>
              <span className={classes.listText}>{eventType}</span>
            </div>
            <div className={classes.listWrapper}>
              <div className={classes.listIconWrapper}>
                <i className="fas fa-map-marker" />
              </div>
              <span className={classes.listText}>
                {venue === "" ? "No venue given" : venue}
              </span>
            </div>
            <div className={classes.listWrapper}>
              <div className={classes.listIconWrapper}>
                <i className="fas fa-comment-alt" />
              </div>
              <span className={classes.listText}>
                {notes === "" ? "No additional notes given" : notes}
              </span>
            </div>
          </div>
          <div className={classes.infoSectionWrapper}>
            <div className={classes.listWrapper}>
              <div className={classes.listIconWrapper}>
                <i className="fas fa-clock" />
              </div>
              <span className={classes.listText}>{hoursInfo.text}</span>
              {hoursInfo.icon}
            </div>
            <div className={classes.listWrapper}>
              <div className={classes.listIconWrapper}>
                <i className="fas fa-list-ol" />
              </div>
              <span className={classes.listText}>{resultsInfo.text}</span>
              {resultsInfo.icon}
            </div>
            <div className={classes.listWrapper}>
              <div className={classes.listIconWrapper}>
                <i className="fas fa-clipboard" />
              </div>
              <span className={classes.listText}>
                Attendance feature coming soon
              </span>
            </div>
          </div>
        </div>
        <div className={classes.viewButton} onClick={() => viewEventInfo()}>
          View
        </div>
      </div>
    );
  }
}

export default injectStyles(styles)(EventCard);