/* eslint-disable array-callback-return */
import React, { Component } from "react";
import injectSheet from "react-jss";
import moment from "moment";
import { common, grey, lightBlue, red } from "../../../../../../utils/colours";
import defaultProfilePicture from "./images/default-profile-picture.png";
import EditDetailsDialog from "./components/EditDetailsDialog";
import EditOpponentDialog from "./components/EditOpponentDialog";
import YourHoursCard from "./components/YourHoursCard";

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
  cancelledWrapper: {
    width: "calc(100% - 48px)",
    margin: "0 24px"
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
  editButton: {
    transition: "0.25s",
    position: "absolute",
    right: 0,
    top: 0,
    padding: "18px 24px",
    color: common["black"],
    cursor: "pointer",
    fontSize: 20,
    "&:hover": {
      color: lightBlue[500]
    }
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
  listItemSeparator: {
    height: 1,
    backgroundColor: grey[100],
    margin: "6px 24px"
  },
  listItemTeamWrapper: {
    position: "relative",
    transition: "0.25s",
    display: "flex",
    flexDirection: "column",
    borderRadius: 12,
    padding: 24,
    backgroundColor: grey[200],
    cursor: "pointer",
    margin: 24,
    "&:hover": {
      backgroundColor: grey[300]
    }
  },
  listItemWrapper: {
    transition: "0.25s",
    display: "flex",
    alignItems: "center",
    borderRadius: 12,
    padding: 24,
    backgroundColor: grey[200],
    cursor: "pointer",
    margin: 24,
    "&:hover": {
      backgroundColor: grey[300]
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
  opponentsName: {
    color: grey[500],
    fontWeight: "bold",
    marginTop: 4,
    fontSize: 16
  },
  profilePicture: {
    borderRadius: "50%",
    backgroundColor: grey[300],
    width: 40,
    height: 40,
    marginRight: 24
  },
  section: {
    position: "relative",
    border: `1px solid ${grey[300]}`,
    borderRadius: 16,
    marginBottom: 24,
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: common["white"]
  },
  sectionHeading: {
    borderBottom: `1px solid ${grey[300]}`,
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
  state = {
    isEditDetailsDialogOpen: false,
    isEditOpponentDialogOpen: false
  };

  componentWillReceiveProps(nextProps) {
    const { isEditDetailsLoading, isEditOpponentLoading } = nextProps;

    if (
      !isEditDetailsLoading &&
      isEditDetailsLoading !== this.props.isEditDetailsLoading
    ) {
      this.toggleEditDetailsDialog();
    }

    if (
      !isEditOpponentLoading &&
      isEditOpponentLoading !== this.props.isEditOpponentLoading
    ) {
      this.toggleEditOpponentsDialog();
    }
  }

  toggleEditDetailsDialog() {
    this.setState({
      isEditDetailsDialogOpen: !this.state.isEditDetailsDialogOpen
    });
  }

  toggleEditOpponentsDialog() {
    this.setState({
      isEditOpponentDialogOpen: !this.state.isEditOpponentDialogOpen
    });
  }

  checkIfManager() {
    const { managers, userID } = this.props;
    let isManager = false;

    managers.map(info => {
      isManager = isManager || info.id === userID;
    });

    return isManager;
  }

  getTeamItems() {
    const {
      classes,
      teams,
      navigateTo,
      isCompetitive,
      isAdmin,
      isEditOpponentLoading,
      editOpponents
    } = this.props;
    const { isEditOpponentDialogOpen } = this.state;

    const lastIndex = teams.length - 1;
    const isManager = this.checkIfManager();

    return teams.map((info, index) => {
      if (index !== lastIndex) {
        return (
          <div>
            <EditOpponentDialog
              isOpen={isEditOpponentDialogOpen}
              opponentName={info.formattedOpponents}
              isLoading={isEditOpponentLoading}
              editOpponents={newName => editOpponents(info.id, "0", newName)}
              closeDialog={() => this.toggleEditOpponentsDialog()}
            />
            <div
              key={info.id}
              className={classes.listItemTeamWrapper}
              onClick={() => navigateTo(`/myaccount/teams/${info.id}`)}
            >
              <span>{info.name}</span>
              {isCompetitive && (
                <span className={classes.opponentsName}>
                  {`vs ${info.formattedOpponents}`}
                </span>
              )}
            </div>
            {isCompetitive &&
              (isAdmin || isManager) && (
                <div
                  className={classes.editButton}
                  onClick={() => this.toggleEditOpponentsDialog()}
                >
                  <i className="fas fa-edit" />
                </div>
              )}
            <div className={classes.listItemSeparator} />
          </div>
        );
      } else {
        return (
          <div>
            <EditOpponentDialog
              isOpen={isEditOpponentDialogOpen}
              opponentName={info.formattedOpponents}
              isLoading={isEditOpponentLoading}
              editOpponents={newName => editOpponents(info.id, "0", newName)}
              closeDialog={() => this.toggleEditOpponentsDialog()}
            />
            {isCompetitive &&
              (isAdmin || isManager) && (
                <div
                  className={classes.editButton}
                  onClick={() => this.toggleEditOpponentsDialog()}
                >
                  <i className="fas fa-edit" />
                </div>
              )}
            <div
              key={info.id}
              className={classes.listItemTeamWrapper}
              onClick={() => navigateTo(`/myaccount/teams/${info.id}`)}
            >
              <span>{info.name}</span>
              {isCompetitive && (
                <span className={classes.opponentsName}>
                  {`vs ${info.formattedOpponents}`}
                </span>
              )}
            </div>
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
          <div key={info.id}>
            <div
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

  getAthleteItems() {
    const { classes, athletes, navigateTo } = this.props;

    const lastIndex = athletes.length - 1;

    return athletes.map((info, index) => {
      if (index !== lastIndex) {
        return (
          <div key={info.id}>
            <div
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

  getCoachPayment(userID) {
    const { coaches } = this.props;

    let payment = {
      type: "N/A",
      rates: {
        standard: 0,
        overtime: 0,
        competitive: 0,
        nonCompetitive: 0,
        salary: 0
      }
    };
    coaches.map(coachInfo => {
      if (coachInfo.id === userID) payment = coachInfo.payment;
    });

    return payment;
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
      isCompetitive,
      homeAway,
      venue,
      notes,
      userID,
      signIn,
      signOut,
      isAdmin,
      editDetails,
      isEditDetailsLoading
    } = this.props;
    const { isEditDetailsDialogOpen } = this.state;

    const isManager = this.checkIfManager();
    const eventTypeIcon = this.getEventTypeIcon();
    const isCoaching = this.checkIfUserCoaching(userID);
    const hours = this.getCoachHours(userID);
    const absenteeism = this.getCoachAbsenteeism(userID);
    const payment = this.getCoachPayment(userID);
    const teamItems = this.getTeamItems();
    const coachItems = this.getCoachItems();
    const managerItems = this.getManagerItems();
    const athleteItems = this.getAthleteItems();
    const formattedTimes = {
      start: moment(times.start).format("hh:mm A"),
      end: moment(times.end).format("hh:mm A")
    };

    return (
      <div className={classes.wrapper}>
        <EditDetailsDialog
          isOpen={isEditDetailsDialogOpen}
          isCompetitive={isCompetitive}
          info={{
            homeAway,
            venue,
            notes,
            date: times.start,
            startsAt: times.start,
            endsAt: times.end
          }}
          isLoading={isEditDetailsLoading}
          editDetails={(times, homeAway, venue, notes) =>
            editDetails(times, homeAway, venue, notes)}
          closeDialog={() => this.toggleEditDetailsDialog()}
        />
        {isCancelled && (
          <div className={classes.cancelledWrapper}>
            <div className={classes.cancelledAlert}>
              <i
                className={`fas fa-exclamation ${classes.cancelledIcon}`}
              />This event has been cancelled.
            </div>
          </div>
        )}
        <div className={classes.column}>
          {isCoaching &&
            !isCancelled && (
              <div className={classes.yourHoursWrapper}>
                <YourHoursCard
                  isCompetitive={isCompetitive}
                  coachID={userID}
                  hours={hours}
                  absenteeism={absenteeism}
                  payment={payment}
                  eventTimes={times}
                  signIn={signIn}
                  signOut={signOut}
                />
              </div>
            )}
          <div className={classes.section}>
            {(isAdmin || isManager) && (
              <div
                className={classes.editButton}
                onClick={() => this.toggleEditDetailsDialog()}
              >
                <i className="fas fa-edit" />
              </div>
            )}
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
            {isCompetitive && (
              <div className={classes.venueWrapper}>
                <div className={classes.venueIconWrapper}>
                  <i
                    className={
                      homeAway === "HOME" ? "fas fa-home" : "fas fa-bus"
                    }
                  />
                </div>
                <span className={classes.venueText}>
                  {homeAway === "HOME" ? "Home" : "Away"}
                </span>
              </div>
            )}
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
          <div className={classes.section}>
            <div className={classes.sectionHeading}>Athletes</div>
            {athleteItems.length === 0 ? (
              <div className={classes.noItems}>No athletes at this event</div>
            ) : (
              athleteItems
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(Details);
