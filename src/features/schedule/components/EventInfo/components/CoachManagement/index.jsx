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
    width: "calc(100% - 48px)",
    margin: 24
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
  wrapper: {
    display: "flex",
    flexWrap: "wrap"
  }
};

class CoachManagement extends Component {
  getCoaches() {
    const {
      classes,
      coaches,
      eventTimes,
      signIn,
      signOut,
      updateTimes,
      approveHours,
      updateAbsent
    } = this.props;

    return coaches.map(info => (
      <div key={info.id} className={classes.coachCardWrapper}>
        <CoachCard
          coachID={info.id}
          name={info.name}
          profilePicture={info.profilePicture}
          hours={info.hours}
          wageSettings={info.wageSettings}
          absenteeism={info.absenteeism}
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
              />CANCELLED
            </div>
            <EmptyState message="Not applicable to cancelled" />
          </div>
        ) : coachItems.length === 0 ? (
          <div className={classes.emptyStateWrapper}>
            <EmptyState message="No coaches at this event" />
          </div>
        ) : (
          coachItems
        )}
      </div>
    );
  }
}

export default injectSheet(styles)(CoachManagement);
