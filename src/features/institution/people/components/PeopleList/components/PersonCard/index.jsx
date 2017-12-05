import React, { Component } from "react";
import Card, { CardActions, CardContent, CardMedia } from "material-ui/Card";
import Button from "material-ui/Button";
import DeleteIcon from "material-ui-icons/Delete";
import IconButton from "material-ui/IconButton";
import { Route } from "react-router-dom";
import Tooltip from "material-ui/Tooltip";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";

const styles = {
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
  },
  viewButton: {
    flexGrow: 1
  }
};

class PersonCard extends Component {
  render() {
    const { classes, name, surname, profilePictureURL, type, id } = this.props;
    const { openDeletePersonAlert } = this.props.actions;

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
            <Route
              render={({ history }) => (
                <Button
                  dense
                  className={classes.viewButton}
                  onClick={() => history.push(`/admin/people/${id}`)}
                >
                  View
                </Button>
              )}
            />
            <div>
              <Tooltip title="Remove person" placement="bottom">
                <IconButton
                  aria-label="Remove person"
                  onClick={() => openDeletePersonAlert()}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </div>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(PersonCard);
