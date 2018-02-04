import React, { Component } from "react";
import Grid from "material-ui/Grid";
import { withStyles } from "material-ui/styles";
import InstitutionCard from "./components/InstitutionCard";

const styles = {
  cardsWrapper: {
    padding: 24,
    maxWidth: 1200,
    margin: "0 auto"
  }
};

class InstitutionsList extends Component {
  render() {
    const { classes, institutions } = this.props;

    return (
      <div className={classes.cardsWrapper}>
        <Grid container direction="row" spacing={40} align="stretch">
          {institutions.map(institutionInfo => (
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={4}
              xl={4}
              key={institutionInfo.id}
            >
              <InstitutionCard
                name={institutionInfo.name}
                emblemURL={institutionInfo.emblemURL}
                type={institutionInfo.type}
                id={institutionInfo.id}
                canEdit={institutionInfo.canEdit}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(InstitutionsList);
