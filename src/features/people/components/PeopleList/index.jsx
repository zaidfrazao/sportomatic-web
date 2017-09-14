// @flow
import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import PersonCard from "./components/PersonCard";

const styles = {
  wrapper: {
    padding: 24
  }
};

class PeopleList extends Component {
  render() {
    const { classes, people, accountType } = this.props;
    return (
      <div className={classes.wrapper}>
        <Grid container direction="row" spacing={40} align="stretch">
          {people.map((personInfo, index) => (
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={index}>
              <PersonCard
                name={personInfo.name}
                surname={personInfo.surname}
                profilePictureURL={personInfo.profilePictureURL}
                type={personInfo.type}
                id={index}
                accountType={accountType}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(PeopleList);
