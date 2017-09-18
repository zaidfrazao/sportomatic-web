// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { Route } from "react-router-dom";
import Card, { CardActions, CardContent, CardMedia } from "material-ui/Card";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import EditIcon from "material-ui-icons/Edit";
import DeleteIcon from "material-ui-icons/Delete";
import IconButton from "material-ui/IconButton";
import Tooltip from "material-ui/Tooltip";

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
          <CardActions className={classes.buttons}>
            <Route
              render={({ history }) => (
                <Button
                  dense
                  className={classes.viewButton}
                  onClick={() => history.push(`/${accountType}/people/${id}`)}
                >
                  View
                </Button>
              )}
            />
            {accountType === "institution" && (
              <div>
                <Tooltip label="Edit person's info" placement="bottom">
                  <IconButton aria-label="Edit team">
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip label="Remove person" placement="bottom">
                  <IconButton aria-label="Delete team">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </div>
            )}
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
