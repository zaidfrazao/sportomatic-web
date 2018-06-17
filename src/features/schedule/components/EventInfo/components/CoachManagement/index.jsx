import React, { Component } from "react";
import injectSheet from "react-jss";
import CoachCard from "./components/CoachCard";
import { common, red } from "../../../../../../utils/colours";
import EmptyState from "../../../../../../components/EmptyState";

const mobileBreakpoint = 800;
const tabletBreakpoint = 1080;

const styles = {
  cancelledAlert: {
    fontSize: 18,
    borderRadius: 16,
    padding: "24px 0",
    width: "100%",
    marginBottom: 24,
    textAlign: "center",
    fontWeight: "bold",
    color: common["white"],
    backgroundColor: red[500]
  },
  cancelledIcon: {
    marginRight: 8
  },
  cancelledWrapper: {
    width: "calc(100% - 96px)",
    margin: "24px 48px"
  },
  coachCardWrapper: {
    margin: 24,
    width: "calc(100% - 48px)",
    [`@media (min-width: ${mobileBreakpoint}px)`]: {
      width: "calc(50% - 48px)"
    },
    [`@media (min-width: ${tabletBreakpoint}px)`]: {
      width: "calc(33% - 48px)"
    }
  },
  emptyStateWrapper: {
    flexGrow: 1,
    margin: 24
  },
  notAllowedIcon: {
    marginRight: 12,
    fontSize: 20,
    color: red[500]
  },
  wrapper: {
    display: "flex",
    flexWrap: "wrap"
  }
};

class CoachManagement extends Component {
  getCoaches() {
    const {
      classes,
      isAdmin,
      coaches,
      eventTimes,
      signIn,
      signOut,
      updateTimes,
      approveHours,
      updateAbsent,
      isCompetitive
    } = this.props;

    return coaches.map(info => (
      <div key={info.id} className={classes.coachCardWrapper}>
        <CoachCard
          isCompetitive={isCompetitive}
          isAdmin={isAdmin}
          coachID={info.id}
          name={info.name}
          profilePicture={info.profilePicture}
          hours={info.hours}
          absenteeism={info.absenteeism}
          payment={info.payment}
          eventTimes={eventTimes}
          signIn={signIn}
          signOut={signOut}
          updateTimes={updateTimes}
          approveHours={approveHours}
          updateAbsent={updateAbsent}
        />
      </div>
    ));
  }

  render() {
    const { classes, isCancelled } = this.props;

    const coachItems = this.getCoaches();

    return (
      <div className={classes.wrapper}>
        {isCancelled ? (
          <div className={classes.cancelledWrapper}>
            <div className={classes.cancelledAlert}>
              <i
                className={`fas fa-exclamation ${classes.cancelledIcon}`}
              />This event has been cancelled.
            </div>
            <EmptyState>
              <i className={`fas fa-times ${classes.notAllowedIcon}`} />You
              can't log hours at cancelled events.
            </EmptyState>
          </div>
        ) : coachItems.length === 0 ? (
          <div className={classes.emptyStateWrapper}>
            <EmptyState>
              <i
                className={`fas fa-user-times ${classes.notAllowedIcon}`}
              />There are no coaches at this event.
            </EmptyState>
          </div>
        ) : (
          coachItems
        )}
      </div>
    );
  }
}

export default injectSheet(styles)(CoachManagement);
