import React, { Component } from "react";
import { grey } from "material-ui/colors";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import injectStyles from "react-jss";
import PersonCard from "./components/PersonCard";

const styles = {
  cardsWrapper: {
    padding: 24,
    margin: "0 auto"
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
          <Grid container direction="row" spacing={40} align="stretch">
            {people.map(personInfo => (
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={4}
                xl={4}
                key={personInfo.id}
              >
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
              </Grid>
            ))}
          </Grid>
        </div>
      );
    } else {
      return (
        <div className={classes.noCardsWrapper}>
          <Typography
            type="title"
            component="h3"
            className={classes.noCardsText}
          >
            No person found
          </Typography>
        </div>
      );
    }
  }
}

export default injectStyles(styles)(PeopleList);
