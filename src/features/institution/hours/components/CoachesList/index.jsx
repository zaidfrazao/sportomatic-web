import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import CoachCard from "./components/CoachCard";

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

class CoachesList extends Component {
  render() {
    const { classes, coaches } = this.props;

    if (coaches.length > 0) {
      return (
        <div className={classes.cardsWrapper}>
          <Grid container direction="row" spacing={40} align="stretch">
            {coaches.map(coachInfo => (
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={4}
                xl={3}
                key={coachInfo.id}
              >
                <CoachCard
                  name={coachInfo.name}
                  surname={coachInfo.surname}
                  profilePictureURL={coachInfo.profilePictureURL}
                  id={coachInfo.id}
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

export default withStyles(styles)(CoachesList);
