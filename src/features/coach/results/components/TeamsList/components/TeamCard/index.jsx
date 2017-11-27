// @flow
import React, { Component } from "react";
import { grey } from "material-ui/colors";
import Button from "material-ui/Button";
import Card, { CardActions, CardContent } from "material-ui/Card";
import { Route } from "react-router-dom";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";

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

type Props = {
  classes: {
    actions: string,
    card: string,
    cardContent: string,
    name: string,
    sport: string,
    subheading: string,
    viewButton: string
  },
  id: string,
  name: string,
  sport: string
};

class TeamCard extends Component<Props> {
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
                onClick={() => history.push(`/coach/results/${id}`)}
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

export default withStyles(styles)(TeamCard);
