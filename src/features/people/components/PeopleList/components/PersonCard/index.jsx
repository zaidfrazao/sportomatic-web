import React, { Component } from "react";
import Button from "material-ui/Button";
import Card, { CardActions, CardContent, CardMedia } from "material-ui/Card";
import { Route } from "react-router-dom";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import defaultProfilePicture from "../../../../image/default-profile-picture.png";

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

class PersonCard extends Component {
  render() {
    const { classes, name, surname, profilePictureURL, type, id } = this.props;

    return (
      <div>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={
              profilePictureURL === ""
                ? defaultProfilePicture
                : profilePictureURL
            }
            title={name}
          />
          <CardContent>
            <Typography type="headline" component="h2">
              {`${name} ${surname}`}
            </Typography>
            <Typography component="p">{type}</Typography>
          </CardContent>
          <CardActions className={classes.buttons}>
            <Route
              render={({ history }) => (
                <Button
                  dense
                  className={classes.viewButton}
                  onClick={() => history.push(`/myaccount/people/${id}`)}
                >
                  View
                </Button>
              )}
            />
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(PersonCard);
