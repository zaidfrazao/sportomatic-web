/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import { amber, brown, green, grey, lightBlue, red } from "material-ui/colors";
import Avatar from "material-ui/Avatar";
import BackIcon from "material-ui-icons/ArrowBack";
import Button from "material-ui/Button";
import Collapse from "material-ui/transitions/Collapse";
import EditIcon from "material-ui-icons/Edit";
import EventIcon from "material-ui-icons/Event";
import ExpandLess from "material-ui-icons/ExpandLess";
import ExpandMore from "material-ui-icons/ExpandMore";
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
import PersonIcon from "material-ui-icons/Person";
import ResultsIcon from "material-ui-icons/PlusOne";
import { Route } from "react-router-dom";
import Tooltip from "material-ui/Tooltip";
import Typography from "material-ui/Typography";
import WarningIcon from "material-ui-icons/Warning";
import { withStyles } from "material-ui/styles";
import BannerAd from "../../../../components/BannerAd";
import defaultProfilePicture from "../../image/default-profile-picture.png";
import LargeMobileBannerAd from "../../../../components/LargeMobileBannerAd";
import LeaderboardAd from "../../../../components/LeaderboardAd";

const styles = theme => ({
  actionsBar: {
    display: "flex",
    justifyContent: "space-between"
  },
  adWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24
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
  deletedTeam: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24
  },
  deletedText: {
    color: red[500],
    textAlign: "center"
  },
  draw: {
    backgroundColor: lightBlue[500]
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
  iconAdjacentText: {
    marginRight: 8
  },
  inset: {
    paddingLeft: theme.spacing.unit * 4
  },
  loss: {
    backgroundColor: red[500]
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
  outerWrapper: {
    flexGrow: 1,
    overflow: "auto"
  },
  placedFirst: {
    backgroundColor: amber[500]
  },
  placedSecond: {
    backgroundColor: grey[400]
  },
  placedThird: {
    backgroundColor: brown[400]
  },
  placedOther: {
    backgroundColor: grey[700]
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
  unknownResultAvatar: {
    backgroundColor: grey[800]
  },
  warningIcon: {
    color: red[500]
  },
  win: {
    backgroundColor: green[500]
  },
  wrapper: {
    padding: 24
  }
});

class TeamInfo extends Component {
  state = {
    isCoachOpen: {},
    isManagerOpen: {},
    isEventOpen: {},
    upcomingEvents: {},
    pastEvents: {}
  };

  componentWillMount() {
    const { info, eventsByTeam } = this.props;

    let isCoachOpen = {};
    let isManagerOpen = {};
    let isEventOpen = {};
    let upcomingEvents = {};
    let pastEvents = {};

    if (info) {
      _.keys(info.coaches).map(coachID => {
        isCoachOpen[coachID] = false;
      });
      _.keys(info.managers).map(managerID => {
        isManagerOpen[managerID] = false;
      });
    }

    if (eventsByTeam) {
      _.toPairs(eventsByTeam)
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
          const currentTime = moment();
          if (startTime.isAfter(currentTime)) {
            upcomingEvents[id] = info;
          } else {
            pastEvents[id] = info;
          }
        });

      _.keys(eventsByTeam).map(eventID => {
        isEventOpen[eventID] = false;
      });
    }

    this.setState({
      isCoachOpen,
      isManagerOpen,
      isEventOpen,
      upcomingEvents,
      pastEvents
    });
  }

  componentWillReceiveProps(nextProps) {
    const { info, eventsByTeam, teamID } = nextProps;

    let isCoachOpen = this.state.isCoachOpen;
    let isManagerOpen = this.state.isManagerOpen;
    let isEventOpen = this.state.isEventOpen;
    let upcomingEvents = this.state.upcomingEvents;
    let pastEvents = this.state.pastEvents;

    if (teamID !== this.props.teamID) {
      isCoachOpen = {};
      isManagerOpen = {};
      isEventOpen = {};
      upcomingEvents = {};
      pastEvents = {};
    }

    if (info && info !== this.props.info) {
      isCoachOpen = {};
      isManagerOpen = {};
      _.keys(info.coaches).map(coachID => {
        isCoachOpen[coachID] = false;
      });
      _.keys(info.managers).map(managerID => {
        isManagerOpen[managerID] = false;
      });
    }

    if (eventsByTeam !== {} && eventsByTeam !== this.props.eventsByTeam) {
      upcomingEvents = {};
      pastEvents = {};
      isEventOpen = {};

      _.toPairs(eventsByTeam)
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
          const currentTime = moment();
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

      _.keys(eventsByTeam).map(eventID => {
        isEventOpen[eventID] = false;
      });
    }

    this.setState({
      isCoachOpen,
      isManagerOpen,
      isEventOpen,
      upcomingEvents,
      pastEvents
    });
  }

  toggleCoachInfo = coachID => {
    const { isCoachOpen } = this.state;

    this.setState({
      isCoachOpen: {
        ...isCoachOpen,
        [coachID]: !isCoachOpen[coachID]
      }
    });
  };

  toggleManagerInfo = managerID => {
    const { isManagerOpen } = this.state;

    this.setState({
      isManagerOpen: {
        ...isManagerOpen,
        [managerID]: !isManagerOpen[managerID]
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

  formatGender(gender, ageGroup) {
    let formattedGender = "Mixed";
    if (ageGroup < 18) {
      if (ageGroup !== "Open" && gender === "MALE") {
        formattedGender = "Boys";
      } else if (gender === "FEMALE") {
        formattedGender = "Girls";
      }
    } else {
      if (gender === "FEMALE") {
        formattedGender = "Men";
      } else if (gender === "FEMALE") {
        formattedGender = "Women";
      }
    }
    return formattedGender;
  }

  formatAgeGroup(ageGroup) {
    return ageGroup !== "Open" ? `U/${ageGroup}` : ageGroup;
  }

  getResultsForEvent(teamID, teamInfo, eventInfo) {
    const { classes } = this.props;

    let resultsForEventList = [];
    const teamResultInfo = eventInfo.teams[teamID];
    if (teamResultInfo.resultsStatus === "FINALISED") {
      const sport = teamInfo ? teamInfo.info.sport : "";
      let ourTotalPoints = 0;

      if (sport === "Athletics" || sport === "Swimming") {
        _.toPairs(
          teamResultInfo.opponents
        ).map(([opponentID, opponentInfo]) => {
          ourTotalPoints =
            opponentInfo.ourScore && opponentInfo.ourScore.totalPoints;
        });

        let scores = [{ id: teamID, score: ourTotalPoints }];

        _.toPairs(
          teamResultInfo.opponents
        ).map(([opponentID, opponentInfo]) => {
          scores.push({
            id: opponentID,
            score: opponentInfo.theirScore.totalPoints
          });
        });

        scores.sort((scoreA, scoreB) => {
          if (scoreA.score > scoreB.score) {
            return -1;
          } else if (scoreA.score < scoreB.score) {
            return +1;
          } else {
            return 0;
          }
        });

        let placement = 1;
        let prevScore = scores[0].score;
        const placements = _.fromPairs(
          scores.map((score, index) => {
            if (index === 0) {
              prevScore = score.score;
              return [score.id, placement];
            } else {
              if (score.score === prevScore) {
                prevScore = score.score;
                return [score.id, placement];
              } else {
                placement = index + 1;
                prevScore = score.score;
                return [score.id, placement];
              }
            }
          })
        );

        let statusStyle = "";
        let resultText = "";
        let primaryText = "Loading...";
        let secondaryText = "";
        scores.map(score => {
          switch (placements[score.id]) {
            case 1:
              statusStyle = classes.placedFirst;
              resultText = "1";
              primaryText =
                score.id === teamID
                  ? teamInfo.info.name
                  : teamResultInfo.opponents[score.id].name === ""
                    ? "Unknown"
                    : teamResultInfo.opponents[score.id].name;
              secondaryText = `Placed 1st`;
              resultsForEventList.push(
                <ListItem key={`teamInfoResult-${teamID}-${score.id}`}>
                  <Avatar className={statusStyle}>{resultText}</Avatar>
                  <ListItemText
                    primary={primaryText}
                    secondary={secondaryText}
                  />
                </ListItem>
              );
              break;
            case 2:
              statusStyle = classes.placedSecond;
              resultText = "2";
              primaryText =
                score.id === teamID
                  ? teamInfo.info.name
                  : teamResultInfo.opponents[score.id].name === ""
                    ? "Unknown"
                    : teamResultInfo.opponents[score.id].name;
              secondaryText = `Placed 2st`;
              resultsForEventList.push(
                <ListItem key={`teamInfoResult-${teamID}-${score.id}`}>
                  <Avatar className={statusStyle}>{resultText}</Avatar>
                  <ListItemText
                    primary={primaryText}
                    secondary={secondaryText}
                  />
                </ListItem>
              );
              break;
            case 3:
              statusStyle = classes.placedThird;
              resultText = "3";
              primaryText =
                score.id === teamID
                  ? teamInfo.info.name
                  : teamResultInfo.opponents[score.id].name === ""
                    ? "Unknown"
                    : teamResultInfo.opponents[score.id].name;
              secondaryText = `Placed 3rd`;
              resultsForEventList.push(
                <ListItem key={`teamInfoResult-${teamID}-${score.id}`}>
                  <Avatar className={statusStyle}>{resultText}</Avatar>
                  <ListItemText
                    primary={primaryText}
                    secondary={secondaryText}
                  />
                </ListItem>
              );
              break;
            default:
              let suffix = "th";
              if (placements[score.id] > 20) {
                if (placements[score.id] % 10 === 1) {
                  suffix = "st";
                } else if (placements[score.id] % 10 === 2) {
                  suffix = "nd";
                } else if (placements[score.id] % 10 === 3) {
                  suffix = "rd";
                }
              }
              statusStyle = classes.placedOther;
              resultText = `${placements[score.id]}`;
              primaryText =
                score.id === teamID
                  ? teamInfo.info.name
                  : teamResultInfo.opponents[score.id].name === ""
                    ? "Unknown"
                    : teamResultInfo.opponents[score.id].name;
              secondaryText = `Placed ${placements[score.id]}${suffix}`;
              resultsForEventList.push(
                <ListItem key={`teamInfoResult-${teamID}-${score.id}`}>
                  <Avatar className={statusStyle}>{resultText}</Avatar>
                  <ListItemText
                    primary={primaryText}
                    secondary={secondaryText}
                  />
                </ListItem>
              );
              break;
          }
        });
      } else {
        let statusStyle = "";
        let resultText = "";
        let primaryText = "Loading...";
        let secondaryText = "";

        _.toPairs(
          teamResultInfo.opponents
        ).map(([opponentID, opponentInfo]) => {
          if (opponentInfo.ourScore.totalPoints) {
            if (
              opponentInfo.ourScore.totalPoints >
              opponentInfo.theirScore.totalPoints
            ) {
              statusStyle = classes.win;
              resultText = "W";
              primaryText = `vs ${opponentInfo.name === ""
                ? "Unknown"
                : opponentInfo.name}`;
              secondaryText = `Won ${opponentInfo.ourScore
                .totalPoints} - ${opponentInfo.theirScore.totalPoints}`;
            } else if (
              opponentInfo.ourScore.totalPoints <
              opponentInfo.theirScore.totalPoints
            ) {
              statusStyle = classes.loss;
              resultText = "L";
              primaryText = `vs ${opponentInfo.name === ""
                ? "Unknown"
                : opponentInfo.name}`;
              secondaryText = `Lost ${opponentInfo.ourScore
                .totalPoints} - ${opponentInfo.theirScore.totalPoints}`;
            } else {
              statusStyle = classes.draw;
              resultText = "D";
              primaryText = `vs ${opponentInfo.name === ""
                ? "Unknown"
                : opponentInfo.name}`;
              secondaryText = `Drew ${opponentInfo.ourScore
                .totalPoints} - ${opponentInfo.theirScore.totalPoints}`;
            }
            resultsForEventList.push(
              <ListItem key={`teamInfoResult-${teamID}-${opponentID}`}>
                <Avatar className={statusStyle}>{resultText}</Avatar>
                <ListItemText primary={primaryText} secondary={secondaryText} />
              </ListItem>
            );
          } else {
            if (
              opponentInfo.ourScore.finalScore >
              opponentInfo.theirScore.finalScore
            ) {
              statusStyle = classes.win;
              resultText = "W";
              primaryText = `vs ${opponentInfo.name === ""
                ? "Unknown"
                : opponentInfo.name}`;
              secondaryText = `Won ${opponentInfo.ourScore
                .finalScore} - ${opponentInfo.theirScore.finalScore}`;
            } else if (
              opponentInfo.ourScore.finalScore <
              opponentInfo.theirScore.finalScore
            ) {
              statusStyle = classes.loss;
              resultText = "L";
              primaryText = `vs ${opponentInfo.name === ""
                ? "Unknown"
                : opponentInfo.name}`;
              secondaryText = `Lost ${opponentInfo.ourScore
                .finalScore} - ${opponentInfo.theirScore.finalScore}`;
            } else {
              statusStyle = classes.draw;
              resultText = "D";
              primaryText = `vs ${opponentInfo.name === ""
                ? "Unknown"
                : opponentInfo.name}`;
              secondaryText = `Drew ${opponentInfo.ourScore
                .finalScore} - ${opponentInfo.theirScore.finalScore}`;
            }
            resultsForEventList.push(
              <ListItem key={`teamInfoResult-${teamID}-${opponentID}`}>
                <Avatar className={statusStyle}>{resultText}</Avatar>
                <ListItemText primary={primaryText} secondary={secondaryText} />
              </ListItem>
            );
          }
        });
      }
    }

    return resultsForEventList;
  }

  getListItems() {
    const {
      classes,
      coaches,
      managers,
      info,
      isCoachesLoading,
      isManagersLoading,
      isEventsByTeamLoading,
      isTeamsLoading,
      teamID
    } = this.props;
    const {
      isCoachOpen,
      isManagerOpen,
      isEventOpen,
      upcomingEvents,
      pastEvents
    } = this.state;

    let eventCoaches = [];
    let eventManagers = [];
    let upcomingEventsList = [];
    let recentResultsList = [];

    !isCoachesLoading &&
      info &&
      _.toPairs(info.coaches).map(([id, coachEventInfo]) => {
        const coachInfo = coaches[id].info;
        eventCoaches.push(
          <Route
            key={id}
            render={({ history }) => {
              return (
                <div>
                  <ListItem button onClick={() => this.toggleCoachInfo(id)}>
                    <Avatar
                      src={
                        coachInfo.profilePictureURL === ""
                          ? defaultProfilePicture
                          : coachInfo.profilePictureURL
                      }
                    />
                    <ListItemText
                      primary={`${coachInfo.name} ${coachInfo.surname}`}
                      secondary={coachInfo.phoneNumber}
                    />
                    {isCoachOpen[id] ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse
                    component="li"
                    in={isCoachOpen[id]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List className={classes.nested} disablePadding>
                      <ListSubheader>Options</ListSubheader>
                      <ListItem
                        className={classes.inset}
                        button
                        onClick={() => history.push(`/myaccount/people/${id}`)}
                      >
                        <ListItemIcon>
                          <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary="View coach info" />
                      </ListItem>
                    </List>
                  </Collapse>
                </div>
              );
            }}
          />
        );
      });

    !isManagersLoading &&
      info &&
      _.toPairs(info.managers).map(([id, managerEventInfo]) => {
        const managerInfo = managers[id].info;
        eventManagers.push(
          <Route
            key={id}
            render={({ history }) => {
              return (
                <div>
                  <ListItem button onClick={() => this.toggleManagerInfo(id)}>
                    <Avatar
                      src={
                        managerInfo.profilePictureURL === ""
                          ? defaultProfilePicture
                          : managerInfo.profilePictureURL
                      }
                    />
                    <ListItemText
                      primary={`${managerInfo.name} ${managerInfo.surname}`}
                      secondary={managerInfo.phoneNumber}
                    />
                    {isManagerOpen[id] ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse
                    component="li"
                    in={isManagerOpen[id]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List className={classes.nested} disablePadding>
                      <ListSubheader>Options</ListSubheader>
                      <ListItem
                        className={classes.inset}
                        button
                        onClick={() => history.push(`/myaccount/people/${id}`)}
                      >
                        <ListItemIcon>
                          <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary="View manager info" />
                      </ListItem>
                    </List>
                  </Collapse>
                </div>
              );
            }}
          />
        );
      });

    !isEventsByTeamLoading &&
      !isTeamsLoading &&
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
                              `/myaccount/schedule/${startTime.format(
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

    !isEventsByTeamLoading &&
      !isTeamsLoading &&
      _.toPairs(pastEvents).map(([id, eventInfo]) => {
        const startTime = moment(eventInfo.requiredInfo.times.start);
        const teamInfo = eventInfo.teams[teamID];

        if (teamInfo) {
          const showResults = teamInfo.resultsStatus === "FINALISED";

          showResults &&
            recentResultsList.push(
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
                          {showResults && (
                            <ListSubheader>Opponents & Results</ListSubheader>
                          )}
                          {showResults &&
                            this.getResultsForEvent(teamID, info, eventInfo)}
                          <ListSubheader>Options</ListSubheader>
                          <ListItem
                            className={classes.inset}
                            button
                            onClick={() =>
                              history.push(
                                `/myaccount/schedule/${startTime.format(
                                  "YYYY-MM-DD"
                                )}/${id}`
                              )}
                          >
                            <ListItemIcon>
                              <EventIcon />
                            </ListItemIcon>
                            <ListItemText primary="View event info" />
                          </ListItem>
                          {eventInfo.requiredInfo.isCompetitive &&
                            eventInfo.requiredInfo.status === "ACTIVE" && (
                              <ListItem
                                className={classes.inset}
                                button
                                onClick={() =>
                                  history.push(
                                    `/myaccount/results/${teamID}/${id}`
                                  )}
                              >
                                <ListItemIcon>
                                  <ResultsIcon />
                                </ListItemIcon>
                                <ListItemText primary="View results" />
                              </ListItem>
                            )}
                        </List>
                      </Collapse>
                    </div>
                  );
                }}
              />
            );
        }
      });

    return {
      coaches: eventCoaches,
      managers: eventManagers,
      upcomingEvents: upcomingEventsList,
      recentResults: recentResultsList
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
    const { classes, info, canEdit, isMobile } = this.props;
    const {
      isTeamsLoading,
      isCoachesLoading,
      isManagersLoading,
      isEventsByTeamLoading
    } = this.props;
    const { editTeam } = this.props.actions;

    let name = "";
    let sport = "";
    let division = "";
    let ageGroup = "";
    let gender = "";

    if (info) {
      name = info.info.name;
      sport = info.info.sport;
      division = info.info.division;
      ageGroup = info.info.ageGroup;
      gender = info.info.gender;
    }

    let formattedGender = "Loading...";
    let formattedAgeGroup = "Loading...";
    if (!isTeamsLoading) {
      formattedGender = this.formatGender(gender, ageGroup);
      formattedAgeGroup = this.formatAgeGroup(ageGroup);
    }

    const ad = this.createAd();
    const {
      coaches,
      managers,
      upcomingEvents,
      recentResults
    } = this.getListItems();

    return (
      <div className={classes.root}>
        {isTeamsLoading ? (
          <Typography className={classes.name} type="title" component="h2">
            Loading...
          </Typography>
        ) : (
          <Typography className={classes.name} type="title" component="h2">
            {name}
          </Typography>
        )}
        <div className={classes.outerWrapper}>
          <div className={classes.actionsBar}>
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
            {canEdit &&
              !isMobile && (
                <Button
                  disabled={
                    isCoachesLoading || isManagersLoading || isTeamsLoading
                  }
                  aria-label="edit team"
                  onClick={() => editTeam()}
                >
                  <EditIcon className={classes.iconAdjacentText} /> Edit team
                </Button>
              )}
          </div>
          <div className={classes.adWrapper}>{ad}</div>
          <div className={classes.wrapper}>
            {info &&
              info.status === "DELETED" && (
                <div className={classes.deletedTeam}>
                  <WarningIcon className={classes.warningIcon} />
                  <Typography
                    className={classes.deletedText}
                    type="subtitle"
                    component="h3"
                  >
                    This team has been deleted.
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
                        primary="Sport"
                        secondary={isTeamsLoading ? "Loading..." : sport}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Division"
                        secondary={isTeamsLoading ? "Loading..." : division}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Age Group"
                        secondary={
                          isTeamsLoading ? "Loading..." : formattedAgeGroup
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Gender"
                        secondary={
                          isTeamsLoading ? "Loading..." : formattedGender
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
                    Managers
                  </Typography>
                  {isManagersLoading || isTeamsLoading ? (
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
                          <ListItemText primary="None" />
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
                  {isCoachesLoading || isTeamsLoading ? (
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
                          <ListItemText primary="None" />
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
                    Upcoming Events
                  </Typography>
                  {isEventsByTeamLoading || isTeamsLoading ? (
                    <List>
                      <ListItem className={classes.noItems}>
                        <ListItemText primary="Loading..." />
                      </ListItem>
                    </List>
                  ) : (
                    <List>
                      {upcomingEvents.length > 0 ? (
                        upcomingEvents
                      ) : (
                        <ListItem className={classes.noItems}>
                          <ListItemText primary="None" />
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
                    Recent Results
                  </Typography>
                  {isEventsByTeamLoading || isTeamsLoading ? (
                    <List>
                      <ListItem className={classes.noItems}>
                        <ListItemText primary="Loading..." />
                      </ListItem>
                    </List>
                  ) : (
                    <List>
                      {recentResults.length > 0 ? (
                        recentResults
                      ) : (
                        <ListItem className={classes.noItems}>
                          <ListItemText primary="None" />
                        </ListItem>
                      )}
                    </List>
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

export default withStyles(styles)(TeamInfo);
