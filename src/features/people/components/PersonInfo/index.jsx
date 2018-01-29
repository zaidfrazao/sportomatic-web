/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import AppBar from "material-ui/AppBar";
import Avatar from "material-ui/Avatar";
import BackIcon from "material-ui-icons/ArrowBack";
import { CircularProgress } from "material-ui/Progress";
import Collapse from "material-ui/transitions/Collapse";
import EditIcon from "material-ui-icons/Edit";
import EventIcon from "material-ui-icons/Event";
import ExpandLess from "material-ui-icons/ExpandLess";
import ExpandMore from "material-ui-icons/ExpandMore";
import { grey, red } from "material-ui/colors";
import Grid from "material-ui/Grid";
import IconButton from "material-ui/IconButton";
import List, {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from "material-ui/List";
import moment from "moment";
import Paper from "material-ui/Paper";
import { Route } from "react-router-dom";
import TeamIcon from "material-ui-icons/Group";
import Toolbar from "material-ui/Toolbar";
import Tooltip from "material-ui/Tooltip";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import BannerAd from "../../../../components/BannerAd";
import LargeMobileBannerAd from "../../../../components/LargeMobileBannerAd";
import LargeRectangleAd from "../../../../components/LargeRectangleAd";
import defaultProfilePicture from "../../image/default-profile-picture.png";

const styles = theme => ({
  actionsBar: {
    backgroundColor: grey[200]
  },
  adWrapper: {
    width: "100%",
    height: "100%",
    backgroundColor: grey[50],
    border: `1px solid ${grey[200]}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
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
  inset: {
    paddingLeft: theme.spacing.unit * 4
  },
  loaderWrapper: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: grey[50],
    border: `1px solid ${grey[200]}`
  },
  name: {
    margin: 24,
    width: "calc(100% - 48px)",
    textAlign: "center"
  },
  nested: {
    backgroundColor: grey[100]
  },
  noItems: {
    textAlign: "center"
  },
  picture: {
    backgroundColor: grey[300],
    width: 240,
    height: "auto",
    margin: 24
  },
  pictureWrapper: {
    width: "100%",
    height: "100%",
    backgroundColor: grey[50],
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `1px solid ${grey[200]}`
  },
  outerWrapper: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "auto"
  },
  removedPerson: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24
  },
  removedText: {
    color: red[500],
    textAlign: "center"
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
  type: {
    fontWeight: "normal",
    fontSize: "1rem",
    padding: "20px 0",
    margin: 0,
    width: "100%",
    textAlign: "center",
    backgroundColor: grey[300],
    color: grey[700]
  },
  warningIcon: {
    color: red[500]
  },
  wrapper: {
    padding: 24
  }
});

class PersonInfo extends Component {
  state = {
    isTeamOpen: {},
    isEventOpen: {},
    upcomingEvents: {},
    pastEvents: {}
  };

  componentWillMount() {
    const { info, eventsByPerson } = this.props;

    let isTeamOpen = {};
    let isEventOpen = {};
    let upcomingEvents = {};
    let pastEvents = {};

    if (info) {
      _.keys(this.createTeamsList()).map(teamID => {
        isTeamOpen[teamID] = false;
      });
    }

    if (eventsByPerson) {
      _.toPairs(eventsByPerson)
        .sort(([id1, info1], [id2, info2]) => {
          const time1 = info1.requiredInfo.times.start;
          const time2 = info2.requiredInfo.times.start;
          if (time1 < time2) {
            return -1;
          } else if (time1 > time2) {
            return +1;
          } else {
            return 0;
          }
        })
        .map(([id, info]) => {
          const startTime = moment(info.requiredInfo.times.start);
          const currentTime = moment(new Date(Date.now()));
          if (startTime.isAfter(currentTime)) {
            upcomingEvents[id] = info;
          } else {
            pastEvents[id] = info;
          }
        });

      _.keys(eventsByPerson).map(eventID => {
        isEventOpen[eventID] = false;
      });
    }

    this.setState({
      isTeamOpen,
      isEventOpen,
      upcomingEvents,
      pastEvents
    });
  }

  componentWillReceiveProps(nextProps) {
    const { info, eventsByPerson, personID } = nextProps;

    let isTeamOpen = this.state.isTeamOpen;
    let isEventOpen = this.state.isEventOpen;
    let upcomingEvents = this.state.upcomingEvents;
    let pastEvents = this.state.pastEvents;

    if (personID !== this.props.personID) {
      isTeamOpen = {};
      isEventOpen = {};
      upcomingEvents = {};
      pastEvents = {};
    }

    if (info && info !== this.props.info) {
      _.keys(this.createTeamsList()).map(teamID => {
        isTeamOpen[teamID] = false;
      });
    }

    if (eventsByPerson !== {} && eventsByPerson !== this.props.eventsByPerson) {
      upcomingEvents = {};
      pastEvents = {};
      isEventOpen = {};

      _.toPairs(eventsByPerson)
        .sort(([id1, info1], [id2, info2]) => {
          const time1 = info1.requiredInfo.times.start;
          const time2 = info2.requiredInfo.times.start;
          if (time1 < time2) {
            return -1;
          } else if (time1 > time2) {
            return +1;
          } else {
            return 0;
          }
        })
        .map(([id, info]) => {
          const startTime = moment(info.requiredInfo.times.start);
          const currentTime = moment(new Date(Date.now()));
          if (startTime.isAfter(currentTime)) {
            upcomingEvents[id] = info;
          } else {
            pastEvents[id] = info;
          }
        });

      pastEvents = _.fromPairs(
        _.toPairs(pastEvents).sort(([id1, info1], [id2, info2]) => {
          const time1 = info1.requiredInfo.times.start;
          const time2 = info2.requiredInfo.times.start;
          if (time1 < time2) {
            return +1;
          } else if (time1 > time2) {
            return -1;
          } else {
            return 0;
          }
        })
      );

      _.keys(eventsByPerson).map(eventID => {
        isEventOpen[eventID] = false;
      });
    }

    this.setState({
      isTeamOpen,
      isEventOpen,
      upcomingEvents,
      pastEvents
    });
  }

  createAd() {
    const { isMobile, isTablet } = this.props;

    let ad = <LargeRectangleAd />;
    if (isMobile) {
      ad = <LargeMobileBannerAd />;
    } else if (isTablet) {
      ad = <BannerAd />;
    }

    return ad;
  }

  createTeamsList() {
    const { teams, personID, isStaffLoading, isTeamsLoading } = this.props;

    let teamsList = [];
    if (!isStaffLoading && !isTeamsLoading) {
      _.toPairs(teams).map(([teamID, teamInfo]) => {
        if (teamInfo.coaches[personID] || teamInfo.managers[personID]) {
          return teamsList.push({ id: teamID, ...teamInfo });
        }
      });
    }

    return teamsList;
  }

  toggleTeamInfo = teamID => {
    const { isTeamOpen } = this.state;

    this.setState({
      isTeamOpen: {
        ...isTeamOpen,
        [teamID]: !isTeamOpen[teamID]
      }
    });
  };

  toggleEventInfo = eventID => {
    const { isEventOpen } = this.state;

    this.setState({
      isEventOpen: {
        ...isEventOpen,
        [eventID]: !isEventOpen[eventID]
      }
    });
  };

  createUpcomingEventsList() {
    const { classes, isStaffLoading, isEventsByPersonLoading } = this.props;
    const { isEventOpen, upcomingEvents } = this.state;

    let upcomingEventsList = [];

    !isEventsByPersonLoading &&
      !isStaffLoading &&
      _.toPairs(upcomingEvents).map(([id, eventInfo]) => {
        const startTime = moment(eventInfo.requiredInfo.times.start);
        upcomingEventsList.length < 5 &&
          upcomingEventsList.push(
            <Route
              key={id}
              render={({ history }) => {
                return (
                  <div>
                    <ListItem button onClick={() => this.toggleEventInfo(id)}>
                      <ListItemText
                        primary={eventInfo.requiredInfo.title}
                        secondary={startTime.format("D MMM YYYY")}
                      />
                      {isEventOpen[id] ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse
                      component="li"
                      in={isEventOpen[id]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List className={classes.nested} disablePadding>
                        <ListSubheader>Options</ListSubheader>
                        <ListItem
                          className={classes.inset}
                          button
                          onClick={() =>
                            history.push(
                              `/admin/schedule/${startTime.format(
                                "YYYY-MM-DD"
                              )}/${id}`
                            )}
                        >
                          <ListItemIcon>
                            <EventIcon />
                          </ListItemIcon>
                          <ListItemText primary="View event info" />
                        </ListItem>
                      </List>
                    </Collapse>
                  </div>
                );
              }}
            />
          );
      });

    return upcomingEventsList;
  }

  render() {
    const {
      classes,
      type,
      isStaffLoading,
      isTeamsLoading,
      isEventsByPersonLoading,
      info,
      institutionID
    } = this.props;
    const { isTeamOpen } = this.state;
    const { editPersonInfo } = this.props.actions;

    const teamsList = this.createTeamsList();
    const ad = this.createAd();
    const upcomingEventsList = this.createUpcomingEventsList();

    let name = "";
    let surname = "";
    let email = "";
    let profilePictureURL = "";
    let phoneNumber = "";
    let sports = {};
    let rates = {};
    let paymentType = "";
    let isCoach = false;
    let isManager = false;

    if (info) {
      name = info.info.name;
      surname = info.info.surname;
      email = info.info.email;
      profilePictureURL = info.info.profilePictureURL;
      phoneNumber = info.info.phoneNumber;
      sports = info.info.sports;
      rates = {
        standard: info.institutions[
          institutionID
        ].paymentDefaults.rates.standard.toLocaleString("en-GB", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }),
        overtime: info.institutions[
          institutionID
        ].paymentDefaults.rates.overtime.toLocaleString("en-GB", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }),
        salary: info.institutions[
          institutionID
        ].paymentDefaults.rates.salary.toLocaleString("en-GB", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })
      };
      isCoach = info.institutions[institutionID].roles.coach === "APPROVED";
      isManager = info.institutions[institutionID].roles.manager === "APPROVED";

      switch (info.institutions[institutionID].paymentDefaults.type) {
        case "N/A":
          paymentType = "Not applicable";
          break;
        case "HOURLY":
          paymentType = "Paid per hour";
          break;
        case "MONTHLY":
          paymentType = "Paid monthly salary";
          break;
        default:
          paymentType = "Not applicable";
          break;
      }
    }

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          {isStaffLoading ? (
            <Typography className={classes.name} type="title" component="h2">
              Loading...
            </Typography>
          ) : (
            <Typography className={classes.name} type="title" component="h2">
              {`${name} ${surname}`}
            </Typography>
          )}
        </AppBar>
        <div className={classes.outerWrapper}>
          <Toolbar className={classes.actionsBar}>
            <Route
              render={({ history }) => (
                <Tooltip title="Back" placement="bottom">
                  <IconButton
                    aria-label="back"
                    onClick={() => {
                      history.goBack();
                    }}
                  >
                    <BackIcon />
                  </IconButton>
                </Tooltip>
              )}
            />
            <div className={classes.flexGrow} />
            <Tooltip title="Edit person info" placement="bottom">
              <IconButton
                disabled={isStaffLoading || isTeamsLoading}
                aria-label="edit person info"
                onClick={() => editPersonInfo()}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
          <div className={classes.wrapper}>
            <Grid
              container
              direction="row"
              align="stretch"
              className={classes.contentWrapper}
            >
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                {isStaffLoading ? (
                  <div className={classes.loaderWrapper}>
                    <CircularProgress />
                  </div>
                ) : (
                  <div className={classes.pictureWrapper}>
                    <Avatar
                      src={
                        profilePictureURL === ""
                          ? defaultProfilePicture
                          : profilePictureURL
                      }
                      className={classes.picture}
                    />
                  </div>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <div className={classes.adWrapper}>{ad}</div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                {isStaffLoading ? (
                  <Typography
                    className={classes.type}
                    type="title"
                    component="h3"
                  >
                    Loading...
                  </Typography>
                ) : (
                  <Typography
                    className={classes.type}
                    type="title"
                    component="h3"
                  >
                    {type}
                  </Typography>
                )}
              </Grid>
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
                        primary="Email"
                        secondary={isStaffLoading ? "Loading..." : email}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Phone number"
                        secondary={
                          isStaffLoading
                            ? "Loading..."
                            : phoneNumber === "" ? "Unknown" : phoneNumber
                        }
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <Paper className={classes.section}>
                  <Typography
                    className={classes.heading}
                    type="title"
                    component="h3"
                  >
                    Preferred Sports
                  </Typography>
                  {isStaffLoading ? (
                    <ListItem className={classes.noItems}>
                      <ListItemText primary="Loading..." />
                    </ListItem>
                  ) : (
                    <List>
                      {sports && _.keys(sports).length > 0 ? (
                        _.toPairs(sports).map(([sport, exists]) => {
                          if (exists)
                            return (
                              <ListItem key={sport}>
                                <ListItemText primary={sport} />
                              </ListItem>
                            );
                        })
                      ) : (
                        <ListItem className={classes.noItems}>
                          <ListItemText primary="No preferred sports" />
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
                    Teams
                  </Typography>
                  {isStaffLoading || isTeamsLoading ? (
                    <List>
                      <ListItem className={classes.noItems}>
                        <ListItemText primary="Loading..." />
                      </ListItem>
                    </List>
                  ) : (
                    <List>
                      {teamsList && teamsList.length > 0 ? (
                        teamsList.map(teamInfo => (
                          <div key={teamInfo.id}>
                            <ListItem
                              button
                              onClick={() => this.toggleTeamInfo(teamInfo.id)}
                            >
                              <ListItemText
                                primary={teamInfo.info.name}
                                secondary={teamInfo.info.sport}
                              />
                              {isTeamOpen[teamInfo.id] ? (
                                <ExpandLess />
                              ) : (
                                <ExpandMore />
                              )}
                            </ListItem>
                            <Collapse
                              component="li"
                              in={isTeamOpen[teamInfo.id]}
                              timeout="auto"
                              unmountOnExit
                            >
                              <List className={classes.nested} disablePadding>
                                <ListSubheader>Options</ListSubheader>
                                <Route
                                  render={({ history }) => (
                                    <ListItem
                                      className={classes.inset}
                                      button
                                      onClick={() =>
                                        history.push(
                                          `/admin/teams/${teamInfo.id}`
                                        )}
                                    >
                                      <ListItemIcon>
                                        <TeamIcon />
                                      </ListItemIcon>
                                      <ListItemText primary="View team info" />
                                    </ListItem>
                                  )}
                                />{" "}
                              </List>
                            </Collapse>
                          </div>
                        ))
                      ) : (
                        <ListItem className={classes.noItems}>
                          <ListItemText primary="No teams" />
                        </ListItem>
                      )}
                    </List>
                  )}
                </Paper>
              </Grid>
              {isCoach && (
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                  <Paper className={classes.section}>
                    <Typography
                      className={classes.heading}
                      type="title"
                      component="h3"
                    >
                      Coach Payment Settings
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText
                          primary="Terms"
                          secondary={
                            isStaffLoading ? "Loading..." : paymentType
                          }
                        />
                      </ListItem>
                      {info.institutions[institutionID].paymentDefaults.type ===
                        "HOURLY" && (
                        <ListItem>
                          <ListItemText
                            primary="Standard hourly rate"
                            secondary={`R ${rates.standard}`}
                          />
                        </ListItem>
                      )}
                      {info.institutions[institutionID].paymentDefaults.type ===
                        "HOURLY" && (
                        <ListItem>
                          <ListItemText
                            primary="Overtime hourly rate"
                            secondary={`R ${rates.overtime}`}
                          />
                        </ListItem>
                      )}
                      {info.institutions[institutionID].paymentDefaults.type ===
                        "MONTHLY" && (
                        <ListItem>
                          <ListItemText
                            primary="Monthly salary"
                            secondary={`R ${rates.salary}`}
                          />
                        </ListItem>
                      )}
                    </List>
                  </Paper>
                </Grid>
              )}
              {(isCoach || isManager) && (
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                  <Paper className={classes.section}>
                    <Typography
                      className={classes.heading}
                      type="title"
                      component="h3"
                    >
                      Upcoming Events
                    </Typography>
                    {isEventsByPersonLoading || isStaffLoading ? (
                      <List>
                        <ListItem className={classes.noItems}>
                          <ListItemText primary="Loading..." />
                        </ListItem>
                      </List>
                    ) : (
                      <List>
                        {upcomingEventsList.length > 0 ? (
                          upcomingEventsList
                        ) : (
                          <ListItem className={classes.noItems}>
                            <ListItemText primary="None" />
                          </ListItem>
                        )}
                      </List>
                    )}
                  </Paper>
                </Grid>
              )}
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PersonInfo);
