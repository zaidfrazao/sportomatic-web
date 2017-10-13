// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { Route } from "react-router-dom";
import Card, { CardActions, CardContent, CardMedia } from "material-ui/Card";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";

const styles = {
  card: {
    maxWidth: 400,
    margin: "0 auto"
  },
  media: {
    height: 300
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between"
  },
  viewButton: {
    flexGrow: 1
  }
};

class CoachCard extends Component {
  render() {
    const { classes, name, surname, profilePictureURL, id } = this.props;

    return (
      <div>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={profilePictureURL}
            title={name}
          />
          <CardContent>
            <Typography type="headline" component="h2">
              {`${name} ${surname}`}
            </Typography>
            <Typography component="p">Coach</Typography>
          </CardContent>
          <CardActions className={classes.buttons}>
            <Route
              render={({ history }) => (
                <Button
                  dense
                  className={classes.viewButton}
                  onClick={() => history.push(`/institution/hours/${id}`)}
                >
                  View hours
                </Button>
              )}
            />
          </CardActions>
        </Card>
      </div>
    );
  }
}

CoachCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CoachCard);