// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { grey } from "material-ui/colors";
import Card, { CardActions, CardContent } from "material-ui/Card";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import EditIcon from "material-ui-icons/Edit";
import DeleteIcon from "material-ui-icons/Delete";
import IconButton from "material-ui/IconButton";
import Tooltip from "material-ui/Tooltip";

const styles = theme => ({
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
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
  }
});

class TeamCard extends Component {
  render() {
    const { classes, sport, name, accountType } = this.props;

    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography type="body1" className={classes.title}>
              {sport}
            </Typography>
            <Typography type="headline" component="h2">
              {name}
            </Typography>
          </CardContent>
          <CardActions className={classes.buttons}>
            <Button dense color="primary">
              View
            </Button>
            {accountType === "institution" && (
              <div>
                <Tooltip label="Edit team" position="bottom">
                  <IconButton aria-label="Edit team">
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip label="Delete team" position="bottom">
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

TeamCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TeamCard);
