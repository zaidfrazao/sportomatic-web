import React, { Component } from "react";
import injectSheet from "react-jss";
import CoachCard from "./components/CoachCard";
import { common, grey, red } from "../../../../../../utils/colours";

const mobileBreakpoint = 800;
const tabletBreakpoint = 1080;

const styles = {
  cancelledAlert: {
    fontSize: 18,
    borderRadius: 16,
    padding: "18px 0",
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
  noItems: {
    width: "calc(100% - 96px)",
    border: `3px solid ${grey[300]}`,
    color: grey[400],
    borderRadius: 12,
    padding: "40px 24px",
    margin: 24,
    fontSize: 20,
    lineHeight: "28px",
    fontWeight: "bold",
    textAlign: "center"
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
      approveHours
    } = this.props;

    return coaches.map(info => (
      <div key={info.id} className={classes.coachCardWrapper}>
        <CoachCard
          coachID={info.id}
          name={info.name}
          profilePicture={info.profilePicture}
          hours={info.hours}
          wageSettings={info.wageSettings}
          eventTimes={eventTimes}
          signIn={signIn}
          signOut={signOut}
          updateTimes={updateTimes}
          approveHours={approveHours}
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
            <div className={classes.noItems}>
              Not applicable to cancelled events
            </div>
          </div>
        ) : coachItems.length === 0 ? (
          <div className={classes.noItems}>No coaches at this event</div>
        ) : (
          coachItems
        )}
      </div>
    );
  }
}

export default injectSheet(styles)(CoachManagement);
