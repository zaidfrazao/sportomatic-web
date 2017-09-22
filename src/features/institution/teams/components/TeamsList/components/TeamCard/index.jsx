// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { Route } from "react-router-dom";
import { grey } from "material-ui/colors";
import Card, { CardActions, CardContent } from "material-ui/Card";
import Button from "material-ui/Button";
import EditIcon from "material-ui-icons/Edit";
import IconButton from "material-ui/IconButton";
import Tooltip from "material-ui/Tooltip";
import Typography from "material-ui/Typography";

const styles = theme => ({
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary
  },
  subheading: {
    margin: 12,
    color: theme.palette.text.secondary
  },
  avatar: {
    backgroundColor: grey[500],
    width: 72,
    height: 72
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between"
  },
  viewButton: {
    flexGrow: 1
  },
  name: {
    textAlign: "center",
    backgroundColor: grey[100],
    padding: "24px 0"
  }
});

class TeamCard extends Component {
  render() {
    const { classes, sport, name, id } = this.props;
    return (
      <div>
        <Card>
          <CardContent>
            <Typography type="body1" className={classes.title}>
              {sport}
            </Typography>
            <Typography type="headline" component="h2" className={classes.name}>
              {name}
            </Typography>
          </CardContent>
          <CardActions className={classes.buttons}>
            <Route
              render={({ history }) => (
                <Button
                  dense
                  className={classes.viewButton}
                  onClick={() => history.push(`/institution/teams/${id}`)}
                >
                  View
                </Button>
              )}
            />
            <Tooltip label="Edit team" placement="bottom">
              <IconButton aria-label="Edit team">
                <EditIcon />
              </IconButton>
            </Tooltip>
          </CardActions>
        </Card>
      </div>
    );
  }
}

TeamCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TeamCard);
