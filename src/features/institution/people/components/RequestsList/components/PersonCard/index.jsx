import React, { Component } from "react";
import Card, { CardActions, CardContent, CardMedia } from "material-ui/Card";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";

const styles = {
  button: {
    flexGrow: 1
  },
  card: {
    maxWidth: 400,
    margin: "0 auto"
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between"
  },
  media: {
    height: 300
  }
};

class PersonCard extends Component {
  render() {
    const { classes, name, surname, profilePictureURL, type } = this.props;

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
          <CardActions className={classes.buttons}>
            <Button dense color="primary" className={classes.button}>
              Accept
            </Button>
            <Button dense className={classes.button}>
              Reject
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(PersonCard);
