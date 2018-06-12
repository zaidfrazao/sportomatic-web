import React, { Component } from "react";
import injectStyles from "react-jss";
import EmptyState from "../../../../components/EmptyState";
import PersonCard from "./components/PersonCard";

const mobileBreakpoint = 800;
const tabletBreakpoint = 1080;

const styles = {
  cardsWrapper: {
    display: "flex",
    flexWrap: "wrap",
    margin: "0 auto"
  },
  cardWrapper: {
    width: "100%",
    padding: 24,
    [`@media (min-width: ${mobileBreakpoint}px)`]: {
      width: "calc(50% - 48px)"
    },
    [`@media (min-width: ${tabletBreakpoint}px)`]: {
      width: "calc(33% - 48px)"
    }
  },
  emptyState: {
    padding: 24
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
      navigateTo,
      seasons
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
                isSignedUp={personInfo.isSignedUp}
                seasons={seasons}
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
        <div className={classes.emptyState}>
          <EmptyState message="No people" />
        </div>
      );
    }
  }
}

export default injectStyles(styles)(PeopleList);
