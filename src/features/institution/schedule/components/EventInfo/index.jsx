import React, { Component } from "react";
import _ from "lodash";
import AppBar from "material-ui/AppBar";
import Avatar from "material-ui/Avatar";
import BackIcon from "material-ui-icons/ArrowBack";
import CancelIcon from "material-ui-icons/Cancel";
import EditIcon from "material-ui-icons/Edit";
import { grey, lightBlue, orange, red } from "material-ui/colors";
import Grid from "material-ui/Grid";
import IconButton from "material-ui/IconButton";
import List, { ListItem, ListItemText } from "material-ui/List";
import Paper from "material-ui/Paper";
import { Route } from "react-router-dom";
import Toolbar from "material-ui/Toolbar";
import Tooltip from "material-ui/Tooltip";
import Typography from "material-ui/Typography";
import UncancelIcon from "material-ui-icons/Undo";
import WarningIcon from "material-ui-icons/Warning";
import { withStyles } from "material-ui/styles";
import BannerAd from "../../../../../components/BannerAd";
import LargeMobileBannerAd from "../../../../../components/LargeMobileBannerAd";
import LeaderboardAd from "../../../../../components/LeaderboardAd";

const styles = {
  actionsBar: {
    backgroundColor: grey[200]
  },
  adWrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "24px 0"
  },
  appBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    "@media (max-width: 960px)": {
      width: "100%"
    }
  },
  cancelledText: {
    color: red[500],
    textAlign: "center"
  },
  cancelledEvent: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24
  },
  competitiveEvent: {
    backgroundColor: orange[500],
    marginLeft: 16
  },
  contentWrapper: {
    "@media (min-width: 1200px)": {
      width: 1200,
      margin: "0 auto"
    }
  },
  flexGrow: {
    flexGrow: 1
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
    margin: "24px 16px",
    textAlign: "left"
  },
  noItems: {
    textAlign: "center"
  },
  nonCompetitiveEvent: {
    backgroundColor: lightBlue[500],
    marginLeft: 16
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
  outerWrapper: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "auto"
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
  warningIcon: {
    color: red[500]
  },
  wrapper: {
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

  createAd() {
    const { isMobile, isTablet } = this.props;

    let ad = <LeaderboardAd />;
    if (isMobile) {
      ad = <LargeMobileBannerAd />;
    } else if (isTablet) {
      ad = <BannerAd />;
    }

    return ad;
  }

  render() {
    const { classes, info } = this.props;
    const {
      updateView,
      editEvent,
      cancelEvent,
      uncancelEvent
    } = this.props.actions;
    const {
      isInfoLoading,
      isCoachesLoading,
      isManagersLoading,
      isTeamsLoading
    } = this.props;

    const dateOptions = { weekday: "long", month: "long", day: "numeric" };
    const timeOptions = { hour12: true, hour: "2-digit", minute: "2-digit" };
    const ad = this.createAd();
    const { coaches, managers, teams } = this.getListItems();

    let showButtons = false;
    if (info) {
      const eventDate = new Date(info.requiredInfo.times.start);
      const currentDate = new Date(Date.now());
      showButtons = eventDate > currentDate;
    }

    let cancelButton = <div />;
    if (showButtons) {
      if (info.requiredInfo.status === "CANCELLED") {
        cancelButton = (
          <Tooltip title="Uncancel event" placement="bottom">
            <IconButton
              aria-label="uncancel event"
              onClick={() => uncancelEvent()}
            >
              <UncancelIcon />
            </IconButton>
          </Tooltip>
        );
      } else {
        cancelButton = (
          <Tooltip title="Cancel event" placement="bottom">
            <IconButton
              disabled={
                isInfoLoading ||
                isCoachesLoading ||
                isManagersLoading ||
                isTeamsLoading
              }
              aria-label="cancel event"
              onClick={() => cancelEvent()}
            >
              <CancelIcon />
            </IconButton>
          </Tooltip>
        );
      }
    }

    return (
      <div className={classes.root}>
        {isInfoLoading || !info ? (
          <AppBar position="static" color="default" className={classes.appBar}>
            <Typography className={classes.name} type="title" component="h2">
              Loading...
            </Typography>
          </AppBar>
        ) : (
          <AppBar position="static" color="default" className={classes.appBar}>
            <Avatar
              className={
                info.requiredInfo.isCompetitive
                  ? classes.competitiveEvent
                  : classes.nonCompetitiveEvent
              }
            />
            <Typography className={classes.name} type="title" component="h2">
              {info.requiredInfo.title}
            </Typography>
          </AppBar>
        )}
        <div className={classes.outerWrapper}>
          <Toolbar className={classes.actionsBar}>
            <Route
              render={({ history }) => (
                <Tooltip title="Back" placement="bottom">
                  <IconButton
                    aria-label="back"
                    onClick={() => {
                      history.goBack();
                      updateView("EVENTS_LIST");
                    }}
                  >
                    <BackIcon />
                  </IconButton>
                </Tooltip>
              )}
            />
            <div className={classes.flexGrow} />
            {showButtons && cancelButton}
            {showButtons && (
              <Tooltip title="Edit event" placement="bottom">
                <IconButton
                  disabled={
                    isInfoLoading ||
                    isCoachesLoading ||
                    isManagersLoading ||
                    isTeamsLoading
                  }
                  aria-label="edit event"
                  onClick={() => editEvent()}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            )}
          </Toolbar>
          <div className={classes.wrapper}>
            <div className={classes.adWrapper}>{ad}</div>
            {info &&
              info.requiredInfo.status === "CANCELLED" && (
                <div className={classes.cancelledEvent}>
                  <WarningIcon className={classes.warningIcon} />
                  <Typography
                    className={classes.cancelledText}
                    type="subtitle"
                    component="h3"
                  >
                    This event has been cancelled.
                  </Typography>
                </div>
              )}
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
                        Competitive Info
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
      </div>
    );
  }
}

export default withStyles(styles)(EventInfo);
