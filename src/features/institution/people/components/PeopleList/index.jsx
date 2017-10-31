import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import PersonCard from "./components/PersonCard";
import _ from "lodash";

const styles = {
  cardsWrapper: {
    padding: 24
  },
  noCardsWrapper: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
};

class PeopleList extends Component {
  render() {
    const { classes, people } = this.props;
    const { openDeletePersonAlert } = this.props.actions;

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
                xl={3}
                key={personInfo.id}
              >
                <PersonCard
                  name={personInfo.name}
                  surname={personInfo.surname}
                  profilePictureURL={personInfo.profilePictureURL}
                  type={_.capitalize(personInfo.type)}
                  actions={{ openDeletePersonAlert }}
                  id={personInfo.id}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      );
    } else {
      return (
        <div className={classes.noCardsWrapper}>
          <Typography type="title" component="h3">
            No staff members
          </Typography>
        </div>
      );
    }
  }
}

export default withStyles(styles)(PeopleList);
