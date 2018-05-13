import React, { Component } from "react";
import injectSheet from "react-jss";
import {
  common,
  grey,
  lightBlue,
  orange,
  red
} from "../../../../../../utils/colours";
import defaultProfilePicture from "./images/default-profile-picture.png";

const tabletBreakpoint = 1080;

const styles = {
  cancelledAlert: {
    fontSize: 18,
    borderRadius: 16,
    padding: "18px 0",
    marginBottom: 24,
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    color: common["white"],
    backgroundColor: red[500]
  },
  cancelledIcon: {
    marginRight: 8
  },
  column: {
    width: "100%",
    [`@media (min-width: ${tabletBreakpoint}px)`]: {
      padding: "0 24px",
      width: "calc(50% - 48px)"
    }
  },
  dateWrapper: {
    margin: "24px 0 8px 0",
    padding: "0 12px",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center"
  },
  eventCompetitive: {
    borderRadius: "16px 16px 0 0",
    backgroundColor: orange["A400"],
    color: common["white"],
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    padding: 12
  },
  eventNonCompetitive: {
    borderRadius: "16px 16px 0 0",
    backgroundColor: lightBlue["A400"],
    color: common["white"],
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    padding: 12
  },
  eventTypeIconWrapper: {
    textAlign: "center",
    backgroundColor: grey[100],
    width: 60,
    padding: "24px 0"
  },
  eventTypeText: {
    flex: 1,
    paddingLeft: 12,
    color: grey[700]
  },
  eventTypeWrapper: {
    borderTop: `1px solid ${grey[100]}`,
    display: "flex",
    alignItems: "center"
  },
  heading: {
    fontSize: 18,
    borderRadius: 16,
    padding: "18px 0",
    marginBottom: 24,
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    color: common["white"],
    backgroundColor: grey[400]
  },
  listItemWrapper: {
    display: "flex",
    alignItems: "center",
    borderRadius: 12,
    padding: 24,
    backgroundColor: grey[100],
    cursor: "pointer",
    margin: 24,
    "&:hover": {
      backgroundColor: grey[200]
    }
  },
  noItems: {
    backgroundColor: grey[100],
    color: grey[500],
    borderRadius: 12,
    padding: 24,
    margin: 24,
    textAlign: "center"
  },
  noteIconWrapper: {
    borderRadius: "0 0 0 16px",
    textAlign: "center",
    backgroundColor: grey[100],
    width: 60,
    padding: "24px 0"
  },
  noteText: {
    flex: 1,
    paddingLeft: 12,
    color: grey[700]
  },
  noteWrapper: {
    borderTop: `1px solid ${grey[100]}`,
    display: "flex",
    alignItems: "center"
  },
  profilePicture: {
    borderRadius: "50%",
    backgroundColor: grey[300],
    width: 40,
    height: 40,
    marginRight: 24
  },
  section: {
    borderRadius: 16,
    marginBottom: 24,
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: common["white"]
  },
  sectionHeading: {
    fontSize: 18,
    borderRadius: "16px 16px 0 0",
    padding: "18px 0",
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    color: grey[800],
    backgroundColor: grey[100]
  },
  timesSeparator: {
    color: grey[500],
    fontSize: 18
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
  venueIconWrapper: {
    textAlign: "center",
    backgroundColor: grey[100],
    width: 60,
    padding: "24px 0"
  },
  venueText: {
    flex: 1,
    paddingLeft: 12,
    color: grey[700]
  },
  venueWrapper: {
    borderTop: `1px solid ${grey[100]}`,
    display: "flex",
    alignItems: "center"
  },
  wrapper: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    padding: 24
  }
};

class Details extends Component {
  getTeamItems() {
    const { classes, teams, navigateTo } = this.props;

    return teams.map(info => (
      <div
        key={info.id}
        className={classes.listItemWrapper}
        onClick={() => navigateTo(`/myaccount/teams/${info.id}`)}
      >
        {info.name}
      </div>
    ));
  }

  getCoachItems() {
    const { classes, coaches, navigateTo } = this.props;

    return coaches.map(info => (
      <div
        key={info.id}
        className={classes.listItemWrapper}
        onClick={() => navigateTo(`/myaccount/people/${info.id}`)}
      >
        <img
          alt={info.name}
          className={classes.profilePicture}
          src={
            info.profilePicture === ""
              ? defaultProfilePicture
              : info.profilePicture
          }
        />
        {info.name}
      </div>
    ));
  }

  getManagerItems() {
    const { classes, managers, navigateTo } = this.props;

    return managers.map(info => (
      <div
        key={info.id}
        className={classes.listItemWrapper}
        onClick={() => navigateTo(`/myaccount/people/${info.id}`)}
      >
        <img
          alt={info.name}
          className={classes.profilePicture}
          src={
            info.profilePicture === ""
              ? defaultProfilePicture
              : info.profilePicture
          }
        />
        {info.name}
      </div>
    ));
  }

  render() {
    const {
      classes,
      eventType,
      startTime,
      endTime,
      date,
      isCancelled,
      isCompetitive,
      venue,
      notes
    } = this.props;

    let eventTypeIcon = "fas fa-dumbbell";
    if (isCompetitive) {
      eventTypeIcon = "fas fa-trophy";
    }
    const teamItems = this.getTeamItems();
    const coachItems = this.getCoachItems();
    const managerItems = this.getManagerItems();

    return (
      <div className={classes.wrapper}>
        {isCancelled && (
          <div className={classes.cancelledAlert}>
            <i
              className={`fas fa-exclamation ${classes.cancelledIcon}`}
            />CANCELLED
          </div>
        )}
        <div className={classes.column}>
          <div className={classes.section}>
            <div className={classes.dateWrapper}>{date}</div>
            <div className={classes.startEndWrapper}>
              <div className={classes.timeWrapper}>{startTime}</div>
              <div className={classes.timesSeparator}>-</div>
              <div className={classes.timeWrapper}>{endTime}</div>
            </div>
            <div className={classes.eventTypeWrapper}>
              <div className={classes.eventTypeIconWrapper}>
                <i className={eventTypeIcon} />
              </div>
              <span className={classes.eventTypeText}>{eventType}</span>
            </div>
            <div className={classes.venueWrapper}>
              <div className={classes.venueIconWrapper}>
                <i className="fas fa-map-marker" />
              </div>
              <span className={classes.venueText}>
                {venue === "" ? "No venue given" : venue}
              </span>
            </div>
            <div className={classes.noteWrapper}>
              <div className={classes.noteIconWrapper}>
                <i className="fas fa-comment-alt" />
              </div>
              <span className={classes.noteText}>
                {notes === "" ? "No additional notes given" : notes}
              </span>
            </div>
          </div>
        </div>
        <div className={classes.column}>
          <div className={classes.section}>
            <div className={classes.sectionHeading}>Teams</div>
            {teamItems.length === 0 ? (
              <div className={classes.noItems}>No teams at this event</div>
            ) : (
              teamItems
            )}
          </div>
          <div className={classes.section}>
            <div className={classes.sectionHeading}>Coaches</div>
            {coachItems.length === 0 ? (
              <div className={classes.noItems}>No coaches at this event</div>
            ) : (
              coachItems
            )}
          </div>
          <div className={classes.section}>
            <div className={classes.sectionHeading}>Managers</div>
            {managerItems.length === 0 ? (
              <div className={classes.noItems}>No managers at this event</div>
            ) : (
              managerItems
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(Details);
