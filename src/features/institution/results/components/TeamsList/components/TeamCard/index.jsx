// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import { grey } from "material-ui/colors";
import Button from "material-ui/Button";
import Card, { CardActions, CardContent } from "material-ui/Card";
import Typography from "material-ui/Typography";

const styles = theme => ({
  actions: {
    display: "flex",
    justifyContent: "space-between"
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardContent: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column"
  },
  name: {
    textAlign: "center",
    backgroundColor: grey[100],
    padding: "24px 0",
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  sport: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary
  },
  subheading: {
    margin: 12,
    color: theme.palette.text.secondary
  },
  viewButton: {
    flexGrow: 1
  }
});

class TeamCard extends Component {
  render() {
    const { classes, sport, name, id } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography type="body1" className={classes.sport}>
            {sport}
          </Typography>
          <Typography type="headline" component="h2" className={classes.name}>
            {name}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions}>
          <Route
            render={({ history }) => (
              <Button
                dense
                className={classes.viewButton}
                onClick={() => history.push(`/institution/results/${id}`)}
              >
                View Results
              </Button>
            )}
          />
        </CardActions>
      </Card>
    );
  }
}

TeamCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TeamCard);
