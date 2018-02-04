import React, { Component } from "react";
import Button from "material-ui/Button";
import Card, { CardActions, CardContent, CardMedia } from "material-ui/Card";
import { Route } from "react-router-dom";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import defaultEmblem from "../../../../image/default-emblem.jpg";

const styles = {
  buttons: {
    display: "flex",
    justifyContent: "space-between"
  },
  card: {
    maxWidth: 400,
    margin: "0 auto"
  },
  media: {
    height: 300
  },
  viewButton: {
    flexGrow: 1
  }
};

class InstitutionCard extends Component {
  render() {
    const { classes, name, emblemURL, type, id, canEdit } = this.props;

    return (
      <div>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={emblemURL === "" ? defaultEmblem : emblemURL}
            title={name}
          />
          <CardContent>
            <Typography type="headline" component="h2">
              {name}
            </Typography>
            <Typography component="p">{type}</Typography>
          </CardContent>
          <CardActions className={classes.buttons}>
            {canEdit ? (
              <Route
                render={({ history }) => (
                  <Button
                    dense
                    className={classes.viewButton}
                    onClick={() => history.push(`/myaccount/settings/${id}`)}
                  >
                    Edit
                  </Button>
                )}
              />
            ) : (
              <Route
                render={({ history }) => (
                  <Button dense disabled className={classes.viewButton}>
                    Only admins can edit
                  </Button>
                )}
              />
            )}
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(InstitutionCard);
