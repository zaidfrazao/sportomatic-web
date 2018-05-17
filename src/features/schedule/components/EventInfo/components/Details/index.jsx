import React, { Component } from "react";
import injectSheet from "react-jss";
import moment from "moment";
import YourHoursCard from "./components/YourHoursCard";
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
    padding: "24px 0",
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
  listItemSeparator: {
    height: 1,
    backgroundColor: grey[100],
    margin: "6px 24px"
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
  },
  yourHoursWrapper: {
    marginBottom: 24,
    width: "100%"
  }
};

class Details extends Component {
  getTeamItems() {
    const { classes, teams, navigateTo } = this.props;

    const lastIndex = teams.length - 1;

    return teams.map((info, index) => {
      if (index !== lastIndex) {
        return (
          <div>
            <div
              key={info.id}
              className={classes.listItemWrapper}
              onClick={() => navigateTo(`/myaccount/teams/${info.id}`)}
            >
              {info.name}
            </div>
            <div className={classes.listItemSeparator} />
          </div>
        );
      } else {
        return (
          <div
            key={info.id}
            className={classes.listItemWrapper}
            onClick={() => navigateTo(`/myaccount/teams/${info.id}`)}
          >
            {info.name}
          </div>
        );
      }
    });
  }

  getCoachItems() {
    const { classes, coaches, navigateTo } = this.props;

    const lastIndex = coaches.length - 1;

    return coaches.map((info, index) => {
      if (index !== lastIndex) {
        return (
          <div>
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
            <div className={classes.listItemSeparator} />
          </div>
        );
      } else {
        return (
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
        );
      }
    });
  }

  getManagerItems() {
    const { classes, managers, navigateTo } = this.props;

    const lastIndex = managers.length - 1;

    return managers.map((info, index) => {
      if (index !== lastIndex) {
        return (
          <div>
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
            <div className={classes.listItemSeparator} />
          </div>
        );
      } else {
        return (
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
        );
      }
    });
  }

  checkIfUserCoaching(userID) {
    const { coaches } = this.props;

    let isCoaching = false;
    coaches.map(coachInfo => {
      if (coachInfo.id === userID) isCoaching = true;
    });

    return isCoaching;
  }

  getCoachHours(userID) {
    const { coaches } = this.props;

    let hours = {
      status: "AWAITING_SIGN_IN",
      times: {
        signIn: new Date(Date.now()),
        signOut: new Date(Date.now())
      }
    };
    coaches.map(coachInfo => {
      if (coachInfo.id === userID) hours = coachInfo.hours;
    });

    return hours;
  }

  getCoachAbsenteeism(userID) {
    const { coaches } = this.props;

    let absenteeism = {
      isAbsent: false,
      rating: ""
    };
    coaches.map(coachInfo => {
      if (coachInfo.id === userID) absenteeism = coachInfo.absenteeism;
    });

    return absenteeism;
  }

  getEventTypeIcon() {
    const { isCompetitive } = this.props;

    if (isCompetitive) return "fas fa-trophy";
    return "fas fa-dumbbell";
  }

  render() {
    const {
      classes,
      eventType,
      times,
      date,
      isCancelled,
      venue,
      notes,
      userID,
      signIn,
      signOut
    } = this.props;

    const eventTypeIcon = this.getEventTypeIcon();
    const isCoaching = this.checkIfUserCoaching(userID);
    const hours = this.getCoachHours(userID);
    const absenteeism = this.getCoachAbsenteeism(userID);
    const teamItems = this.getTeamItems();
    const coachItems = this.getCoachItems();
    const managerItems = this.getManagerItems();
    const formattedTimes = {
      start: moment(times.start).format("hh:mm A"),
      end: moment(times.end).format("hh:mm A")
    };

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
          {isCoaching &&
            !isCancelled && (
              <div className={classes.yourHoursWrapper}>
                <YourHoursCard
                  coachID={userID}
                  hours={hours}
                  absenteeism={absenteeism}
                  eventTimes={times}
                  signIn={signIn}
                  signOut={signOut}
                />
              </div>
            )}
          <div className={classes.section}>
            <div className={classes.dateWrapper}>{date}</div>
            <div className={classes.startEndWrapper}>
              <div className={classes.timeWrapper}>{formattedTimes.start}</div>
              <div className={classes.timesSeparator}>-</div>
              <div className={classes.timeWrapper}>{formattedTimes.end}</div>
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
