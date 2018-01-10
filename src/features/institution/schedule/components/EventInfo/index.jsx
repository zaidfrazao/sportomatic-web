import React, { Component } from "react";
import _ from "lodash";
import AppBar from "material-ui/AppBar";
import Avatar from "material-ui/Avatar";
import Button from "material-ui/Button";
import { grey } from "material-ui/colors";
import Grid from "material-ui/Grid";
import List, { ListItem, ListItemText } from "material-ui/List";
import Paper from "material-ui/Paper";
import { Route } from "react-router-dom";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import BannerAd from "../../../../../components/BannerAd";
import LargeMobileBannerAd from "../../../../../components/LargeMobileBannerAd";
import LeaderboardAd from "../../../../../components/LeaderboardAd";

const styles = {
  adWrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "24px 0"
  },
  button: {
    "@media (max-width: 960px)": {
      width: "100%"
    }
  },
  contentWrapper: {
    "@media (min-width: 1200px)": {
      width: 1200,
      margin: "0 auto"
    }
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
    margin: 24,
    width: "calc(100% - 48px)",
    textAlign: "center"
  },
  noItems: {
    textAlign: "center"
  },
  notes: {
    padding: 24
  },
  notesWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1
  },
  picture: {
    backgroundColor: grey[300],
    width: 300,
    height: "auto"
  },
  pictureWrapper: {
    width: "100%",
    height: "100%",
    backgroundColor: grey[50],
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  root: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column"
  },
  section: {
    backgroundColor: grey[50],
    border: `1px solid ${grey[200]}`,
    height: "100%",
    width: "100%"
  },
  wrapper: {
    flexGrow: 1,
    overflow: "auto",
    padding: 24
  }
};

class EventInfo extends Component {
  getListItems() {
    const {
      coaches,
      managers,
      teams,
      info,
      isInfoLoading,
      isTeamsLoading,
      isManagersLoading,
      isCoachesLoading
    } = this.props;

    console.log(this.props);

    let eventTeams = [];
    let eventCoaches = [];
    let eventManagers = [];

    !isTeamsLoading &&
      !isInfoLoading &&
      info &&
      _.toPairs(info.teams).map(([id, isTeam]) => {
        if (isTeam) {
          eventTeams.push(
            <Route
              key={id}
              render={({ history }) => {
                return (
                  <ListItem
                    button
                    onClick={() => history.push(`/admin/teams/${id}`)}
                  >
                    <ListItemText
                      primary={teams[id].info.name}
                      secondary={teams[id].info.sport}
                    />
                  </ListItem>
                );
              }}
            />
          );
        }
      });
    !isCoachesLoading &&
      !isInfoLoading &&
      info &&
      _.toPairs(info.coaches).map(([id, coachEventInfo]) => {
        const coachInfo = coaches[id].info;
        eventCoaches.push(
          <Route
            key={id}
            render={({ history }) => {
              return (
                <ListItem
                  button
                  onClick={() => history.push(`/admin/people/${id}`)}
                >
                  <Avatar src={coachInfo.profilePictureURL} />
                  <ListItemText
                    primary={`${coachInfo.name} ${coachInfo.surname}`}
                    secondary={coachInfo.phoneNumber}
                  />
                </ListItem>
              );
            }}
          />
        );
      });
    !isManagersLoading &&
      !isInfoLoading &&
      info &&
      _.toPairs(info.managers).map(([id, managerEventInfo]) => {
        const managerInfo = managers[id].info;
        eventManagers.push(
          <Route
            key={id}
            render={({ history }) => {
              return (
                <ListItem
                  button
                  onClick={() => history.push(`/admin/people/${id}`)}
                >
                  <Avatar src={managerInfo.profilePictureURL} />
                  <ListItemText
                    primary={`${managerInfo.name} ${managerInfo.surname}`}
                    secondary={managerInfo.phoneNumber}
                  />
                </ListItem>
              );
            }}
          />
        );
      });

    return {
      teams: eventTeams,
      coaches: eventCoaches,
      managers: eventManagers
    };
  }

  render() {
    const { classes, isMobile, isTablet, info } = this.props;
    const { updateView } = this.props.actions;
    const {
      isInfoLoading,
      isCoachesLoading,
      isManagersLoading,
      isTeamsLoading
    } = this.props;

    const dateOptions = {
      weekday: "long",
      month: "long",
      day: "numeric"
    };
    const timeOptions = { hour12: true, hour: "2-digit", minute: "2-digit" };

    let ad = <LeaderboardAd />;
    if (isMobile) {
      ad = <LargeMobileBannerAd />;
    } else if (isTablet) {
      ad = <BannerAd />;
    }

    const { coaches, managers, teams } = this.getListItems();

    return (
      <div className={classes.root}>
        {isInfoLoading || !info ? (
          <AppBar position="static" color="default">
            <Typography className={classes.name} type="title" component="h2">
              Loading...
            </Typography>
          </AppBar>
        ) : (
          <AppBar position="static" color="default">
            {info.status === "CANCELLED" ? (
              <Typography className={classes.name} type="title" component="h2">
                {info.requiredInfo.title} - [Cancelled]
              </Typography>
            ) : (
              <Typography className={classes.name} type="title" component="h2">
                {info.requiredInfo.title}
              </Typography>
            )}
          </AppBar>
        )}
        <div className={classes.wrapper}>
          <Route
            render={({ history }) => (
              <Button
                raised
                className={classes.button}
                onClick={() => {
                  history.goBack();
                  updateView("EVENTS_LIST");
                }}
              >
                Back
              </Button>
            )}
          />
          <div className={classes.adWrapper}>{ad}</div>
          <Grid
            container
            direction="row"
            align="stretch"
            className={classes.contentWrapper}
          >
            <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
              <Paper className={classes.section}>
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
                      secondary={
                        isInfoLoading || !info
                          ? "Loading..."
                          : info.requiredInfo.times.start.toLocaleDateString(
                              "en-US",
                              dateOptions
                            )
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Starts at"
                      secondary={
                        isInfoLoading || !info
                          ? "Loading..."
                          : info.requiredInfo.times.start.toLocaleTimeString(
                              "en-US",
                              timeOptions
                            )
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Ends at"
                      secondary={
                        isInfoLoading || !info
                          ? "Loading..."
                          : info.requiredInfo.times.end.toLocaleTimeString(
                              "en-US",
                              timeOptions
                            )
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Event type"
                      secondary={
                        isInfoLoading || !info
                          ? "Loading..."
                          : info.requiredInfo.type
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Venue"
                      secondary={
                        isInfoLoading || !info
                          ? "Loading..."
                          : info.optionalInfo.venue
                      }
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
            {!isInfoLoading &&
              info &&
              info.requiredInfo.isCompetitive && (
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                  <Paper className={classes.section}>
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
                          secondary={
                            info.optionalInfo.homeAway === "UNKNOWN"
                              ? "Not yet specified"
                              : _.capitalize(info.optionalInfo.homeAway)
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Opponents"
                          secondary={info.optionalInfo.opponents.institution}
                        />
                      </ListItem>
                    </List>
                  </Paper>
                </Grid>
              )}
            <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
              <Paper className={classes.section}>
                <Typography
                  className={classes.heading}
                  type="title"
                  component="h3"
                >
                  Teams
                </Typography>
                {isTeamsLoading || !info ? (
                  <List>
                    <ListItem className={classes.noItems}>
                      <ListItemText primary="Loading..." />
                    </ListItem>
                  </List>
                ) : (
                  <List>
                    {teams.length > 0 ? (
                      teams
                    ) : (
                      <ListItem className={classes.noItems}>
                        <ListItemText primary="No teams" />
                      </ListItem>
                    )}
                  </List>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
              <Paper className={classes.section}>
                <Typography
                  className={classes.heading}
                  type="title"
                  component="h3"
                >
                  Managers
                </Typography>
                {isManagersLoading || !info ? (
                  <List>
                    <ListItem className={classes.noItems}>
                      <ListItemText primary="Loading..." />
                    </ListItem>
                  </List>
                ) : (
                  <List>
                    {managers.length > 0 ? (
                      managers
                    ) : (
                      <ListItem className={classes.noItems}>
                        <ListItemText primary="No managers" />
                      </ListItem>
                    )}
                  </List>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
              <Paper className={classes.section}>
                <Typography
                  className={classes.heading}
                  type="title"
                  component="h3"
                >
                  Coaches
                </Typography>
                {isCoachesLoading || !info ? (
                  <List>
                    <ListItem className={classes.noItems}>
                      <ListItemText primary="Loading..." />
                    </ListItem>
                  </List>
                ) : (
                  <List>
                    {coaches.length > 0 ? (
                      coaches
                    ) : (
                      <ListItem className={classes.noItems}>
                        <ListItemText primary="No coaches" />
                      </ListItem>
                    )}
                  </List>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
              <Paper className={classes.section}>
                <Typography
                  className={classes.heading}
                  type="title"
                  component="h3"
                >
                  Notes
                </Typography>
                {isInfoLoading || !info ? (
                  <div className={classes.notesWrapper}>
                    <Typography
                      className={classes.notes}
                      type="body2"
                      component="p"
                    >
                      Loading...
                    </Typography>
                  </div>
                ) : (
                  <div className={classes.notesWrapper}>
                    {info.optionalInfo.notes === "" ? (
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
                        {info.optionalInfo.notes}
                      </Typography>
                    )}
                  </div>
                )}
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(EventInfo);
