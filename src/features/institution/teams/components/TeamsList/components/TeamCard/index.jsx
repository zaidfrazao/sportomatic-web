import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { Route } from "react-router-dom";
import { grey, red } from "material-ui/colors";
import Card, { CardActions, CardContent } from "material-ui/Card";
import Button from "material-ui/Button";
import DeleteIcon from "material-ui-icons/Delete";
import IconButton from "material-ui/IconButton";
import Tooltip from "material-ui/Tooltip";
import Typography from "material-ui/Typography";
import WarningIcon from "material-ui-icons/Warning";

const styles = theme => ({
  avatar: {
    backgroundColor: grey[500],
    width: 72,
    height: 72
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between"
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardContent: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column"
  },
  deletedTeam: {
    marginBottom: 16,
    fontSize: 14,
    color: red[500],
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  flexGrow: {
    flexGrow: 1
  },
  name: {
    textAlign: "center",
    backgroundColor: grey[100],
    padding: "24px 0",
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  subheading: {
    margin: 12,
    color: theme.palette.text.secondary
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary
  },
  titleWrapper: {
    display: "flex",
    flexDirection: "row"
  },
  viewButton: {
    flexGrow: 1
  },
  warningIcon: {
    width: 14,
    height: 14,
    color: red[500]
  }
});

class TeamCard extends Component {
  render() {
    const { classes, sport, name, id, status } = this.props;
    const { deleteTeam } = this.props.actions;

    return (
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <div className={classes.titleWrapper}>
            <Typography type="body1" className={classes.title}>
              {sport}
            </Typography>
            <div className={classes.flexGrow} />
            {status === "DELETED" && (
              <Typography type="body1" className={classes.deletedTeam}>
                Deleted <WarningIcon />
              </Typography>
            )}
          </div>
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
                onClick={() => history.push(`/admin/teams/${id}`)}
              >
                View
              </Button>
            )}
          />
          <Tooltip title="Delete team" placement="bottom">
            <IconButton aria-label="Delete team" onClick={() => deleteTeam()}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    );
  }
}

TeamCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TeamCard);
