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
    border: `3px solid ${grey[300]}`,
    color: grey[400],
    borderRadius: 12,
    padding: "40px 24px",
    margin: "24px 0",
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
    const { classes, coaches } = this.props;

    return coaches.map(info => (
      <div key={info.id} className={classes.coachCardWrapper}>
        <CoachCard
          id={info.id}
          name={info.name}
          profilePicture={info.profilePicture}
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
          <div>
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
