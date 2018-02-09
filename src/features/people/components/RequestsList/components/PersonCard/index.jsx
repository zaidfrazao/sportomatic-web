import React, { Component } from "react";
import Button from "material-ui/Button";
import Card, { CardActions, CardContent, CardMedia } from "material-ui/Card";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";

const styles = {
  button: {
    flexGrow: 1
  },
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
  }
};

class PersonCard extends Component {
  render() {
    const { classes, name, surname, profilePictureURL, type, id } = this.props;
    const {
      openRejectPersonModal,
      openApprovePersonModal
    } = this.props.actions;

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
            <Typography component="p">Applying to be a {type}</Typography>
          </CardContent>
          <CardActions className={classes.buttons}>
            <Button
              dense
              color="primary"
              className={classes.button}
              onClick={() => openApprovePersonModal(id, type.includes("Coach"))}
            >
              Accept
            </Button>
            <Button
              dense
              className={classes.button}
              onClick={() => openRejectPersonModal(id)}
            >
              Reject
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(PersonCard);
