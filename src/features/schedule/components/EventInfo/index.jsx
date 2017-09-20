// @flow
import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import { grey } from "material-ui/colors";
import { Route } from "react-router-dom";
import Avatar from "material-ui/Avatar";
import Button from "material-ui/Button";
import Grid from "material-ui/Grid";
import List, { ListItem, ListItemText } from "material-ui/List";
import Typography from "material-ui/Typography";
import LeaderboardAd from "../../../../components/LeaderboardAd";

const styles = {
  wrapper: {
    padding: 24
  },
  adWrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "24px 0"
  },
  section: {
    backgroundColor: grey[50],
    border: `1px solid ${grey[200]}`,
    height: "100%",
    width: "100%"
  },
  heading: {
    fontWeight: "normal",
    fontSize: "1.2rem",
    padding: "20px 0",
    margin: 0,
    width: "100%",
    textAlign: "center",
    backgroundColor: grey[700],
    color: grey[50],
    borderBottom: `1px solid ${grey[200]}`
  },
  name: {
    width: "100%",
    textAlign: "center",
    margin: "40px 0"
  },
  pictureWrapper: {
    width: "100%",
    height: "100%",
    backgroundColor: grey[50],
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  picture: {
    backgroundColor: grey[300],
    width: 300,
    height: "auto"
  },
  button: {
    "@media (max-width: 960px)": {
      width: "100%"
    }
  },
  noItems: {
    textAlign: "center"
  },
  notesWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1
  },
  notes: {
    padding: 24
  }
};

class EventInfo extends Component {
  render() {
    const { classes } = this.props;
    const {
      title,
      eventTypeName,
      eventType,
      startTime,
      endTime,
      venue,
      notes,
      teams,
      coaches,
      managers,
      matchInfo
    } = this.props.info;
    const timeOptions = { hour: "2-digit", minute: "2-digit" };
    const dateOptions = {
      weekday: "long",
      month: "long",
      day: "numeric"
    };
    return (
      <div className={classes.wrapper}>
        <Route
          render={({ history }) => (
            <Button
              raised
              className={classes.button}
              onClick={() => history.goBack()}
            >
              Back
            </Button>
          )}
        />
        <Typography className={classes.name} type="display2" component="h2">
          {title}
        </Typography>
        <div className={classes.adWrapper}>
          <LeaderboardAd />
        </div>
        <Grid container direction="row" align="stretch">
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <div className={classes.section}>
              <Typography
                className={classes.heading}
                type="title"
                component="h3"
              >
                Details
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Date"
                    secondary={new Date(startTime).toLocaleDateString(
                      "en-US",
                      dateOptions
                    )}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Starts at"
                    secondary={new Date(startTime).toLocaleTimeString(
                      "en-US",
                      timeOptions
                    )}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Ends as"
                    secondary={new Date(endTime).toLocaleTimeString(
                      "en-US",
                      timeOptions
                    )}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Event type"
                    secondary={eventTypeName}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Venue" secondary={venue} />
                </ListItem>
              </List>
            </div>
          </Grid>
          {eventType === "COMPETITIVE" && (
            <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
              <div className={classes.section}>
                <Typography
                  className={classes.heading}
                  type="title"
                  component="h3"
                >
                  Match Info
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Home / Away"
                      secondary={matchInfo.homeAway}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Opponents"
                      secondary={matchInfo.opponents}
                    />
                  </ListItem>
                </List>
              </div>
            </Grid>
          )}
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <div className={classes.section}>
              <Typography
                className={classes.heading}
                type="title"
                component="h3"
              >
                Teams
              </Typography>
              <List>
                {teams.length > 0 ? (
                  teams.map(teamInfo => (
                    <ListItem key={teamInfo.id} button>
                      <ListItemText
                        primary={teamInfo.name}
                        secondary={teamInfo.sport}
                      />
                    </ListItem>
                  ))
                ) : (
                  <ListItem className={classes.noItems}>
                    <ListItemText primary="No teams" />
                  </ListItem>
                )}
              </List>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <div className={classes.section}>
              <Typography
                className={classes.heading}
                type="title"
                component="h3"
              >
                Managers
              </Typography>
              <List>
                {managers.length > 0 ? (
                  managers.map(managerInfo => (
                    <ListItem key={managerInfo.name} button>
                      <Avatar src={managerInfo.profilePictureURL} />
                      <ListItemText
                        primary={`${managerInfo.name} ${managerInfo.surname}`}
                        secondary={managerInfo.phoneNumber}
                      />
                    </ListItem>
                  ))
                ) : (
                  <ListItem className={classes.noItems}>
                    <ListItemText primary="No managers" />
                  </ListItem>
                )}
              </List>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <div className={classes.section}>
              <Typography
                className={classes.heading}
                type="title"
                component="h3"
              >
                Coaches
              </Typography>
              <List>
                {coaches.length > 0 ? (
                  coaches.map(coachInfo => (
                    <ListItem key={coachInfo.name} button>
                      <Avatar src={coachInfo.profilePictureURL} />
                      <ListItemText
                        primary={`${coachInfo.name} ${coachInfo.surname}`}
                        secondary={coachInfo.phoneNumber}
                      />
                    </ListItem>
                  ))
                ) : (
                  <ListItem className={classes.noItems}>
                    <ListItemText primary="No coaches" />
                  </ListItem>
                )}
              </List>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <div className={classes.section}>
              <Typography
                className={classes.heading}
                type="title"
                component="h3"
              >
                Notes
              </Typography>
              <div className={classes.notesWrapper}>
                {notes === "" ? (
                  <Typography
                    className={classes.notes}
                    type="body2"
                    component="p"
                  >
                    No notes
                  </Typography>
                ) : (
                  <Typography
                    className={classes.notes}
                    type="body2"
                    component="p"
                  >
                    {notes}
                  </Typography>
                )}
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(EventInfo);
