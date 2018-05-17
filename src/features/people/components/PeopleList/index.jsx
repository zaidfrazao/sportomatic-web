import React, { Component } from "react";
import { grey } from "../../../../utils/colours";
import injectStyles from "react-jss";
import PersonCard from "./components/PersonCard";

const mobileBreakpoint = 800;
const tabletBreakpoint = 1080;

const styles = {
  cardsWrapper: {
    display: "flex",
    flexWrap: "wrap",
    padding: 24,
    margin: "0 auto"
  },
  cardWrapper: {
    padding: 24,
    width: "calc(100% - 48px)",
    [`@media (min-width: ${mobileBreakpoint}px)`]: {
      width: "calc(50% - 48px)"
    },
    [`@media (min-width: ${tabletBreakpoint}px)`]: {
      width: "calc(33% - 48px)"
    }
  },
  noCardsText: {
    color: grey[500],
    padding: 40,
    borderRadius: 16,
    border: `3px solid ${grey[300]}`
  },
  noCardsWrapper: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "24px auto"
  }
};

class PeopleList extends Component {
  render() {
    const {
      classes,
      people,
      resendInvite,
      isLoading,
      resendID,
      isUserAdmin,
      teams,
      navigateTo
    } = this.props;

    if (people.length > 0) {
      return (
        <div className={classes.cardsWrapper}>
          {people.map(personInfo => (
            <div className={classes.cardWrapper} key={personInfo.id}>
              <PersonCard
                isUserAdmin={isUserAdmin}
                isAdmin={personInfo.isAdmin}
                name={personInfo.name}
                surname={personInfo.surname}
                profilePictureURL={personInfo.profilePictureURL}
                id={personInfo.id}
                status={personInfo.status}
                teams={teams}
                navigateTo={navigateTo}
                isLoading={isLoading && resendID === personInfo.id}
                resendInvite={() =>
                  resendInvite(
                    personInfo.name,
                    personInfo.id,
                    personInfo.email
                  )}
              />
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className={classes.noCardsWrapper}>
          <div className={classes.noCardsText}>No person found</div>
        </div>
      );
    }
  }
}

export default injectStyles(styles)(PeopleList);
