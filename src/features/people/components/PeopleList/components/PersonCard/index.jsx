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
    maxWidth: 345,
    margin: "0 auto"
  },
  media: {
    height: 200
  }
};

class PersonCard extends Component {
  render() {
    const {
      classes,
      name,
      surname,
      profilePictureURL,
      type,
      id,
      accountType
    } = this.props;
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
            <Typography component="p">{type}</Typography>
          </CardContent>
          <CardActions>
            <Route
              render={({ history }) => (
                <Button
                  dense
                  color="primary"
                  onClick={() => history.push(`/${accountType}/people/${id}`)}
                >
                  View
                </Button>
              )}
            />
            {accountType === "institution" && <Button dense>Remove</Button>}
          </CardActions>
        </Card>
      </div>
    );
  }
}

PersonCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PersonCard);
