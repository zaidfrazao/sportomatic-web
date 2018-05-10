/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import AbsentIcon from "material-ui-icons/Clear";
import AddSubIcon from "material-ui-icons/PersonAdd";
import {
  amber,
  brown,
  green,
  grey,
  lightBlue,
  orange,
  red
} from "material-ui/colors";
import Avatar from "material-ui/Avatar";
import AwaitingApprovalIcon from "material-ui-icons/AssignmentReturn";
import AwaitingSignInIcon from "material-ui-icons/AssignmentLate";
import AwaitingSignOutIcon from "material-ui-icons/AssignmentReturned";
import BackIcon from "material-ui-icons/ArrowBack";
import Button from "material-ui/Button";
import CancelIcon from "material-ui-icons/Cancel";
import Collapse from "material-ui/transitions/Collapse";
import EditIcon from "material-ui-icons/Edit";
import ExpandLess from "material-ui-icons/ExpandLess";
import ExpandMore from "material-ui-icons/ExpandMore";
import Grid from "material-ui/Grid";
import HoursApprovedIcon from "material-ui-icons/AssignmentTurnedIn";
import HoursIcon from "material-ui-icons/Alarm";
import IconButton from "material-ui/IconButton";
import List, {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader
} from "material-ui/List";
import LocationIcon from "material-ui-icons/LocationOn";
import moment from "moment";
import Paper from "material-ui/Paper";
import PersonIcon from "material-ui-icons/Person";
import ResultsIcon from "material-ui-icons/PlusOne";
import { Route } from "react-router-dom";
import TeamIcon from "material-ui-icons/Group";
import Typography from "material-ui/Typography";
import UncancelIcon from "material-ui-icons/Undo";
import WarningIcon from "material-ui-icons/Warning";
import { withStyles } from "material-ui/styles";
import BannerAd from "../../../../components/BannerAd";
import LargeMobileBannerAd from "../../../../components/LargeMobileBannerAd";
import LeaderboardAd from "../../../../components/LeaderboardAd";
import defaultEmblem from "../../image/default-emblem.jpg";
import defaultProfilePicture from "../../image/default-profile-picture.png";

const mobileBreakpoint = 800;
const tabletBreakpoint = 1080;

const styles = theme => ({
  actionsBar: {
    backgroundColor: grey[200],
    display: "flex",
    justifyContent: "center"
  },
  adWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24
  },
  appBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  awaitingApprovalAvatar: {
    backgroundColor: lightBlue[500]
  },
  awaitingSignInAvatar: {
    backgroundColor: red[500]
  },
  awaitingSignOutAvatar: {
    backgroundColor: orange[500]
  },
  badAbsentAvatar: {
    backgroundColor: red[500]
  },
  button: {
    [`@media (max-width: ${tabletBreakpoint}px)`]: {
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
  draw: {
    backgroundColor: lightBlue[500]
  },
  flexGrow: {
    flexGrow: 1
  },
  goodAbsentAvatar: {
    backgroundColor: green[500]
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
  hoursApprovedAvatar: {
    backgroundColor: green[500]
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
    margin: "24px 16px",
    textAlign: "left"
  },
  nested: {
    backgroundColor: grey[100]
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
  thumbsDownIcon: {
    color: red[500]
  },
  thumbsUpIcon: {
    color: green[500]
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

class EventInfo extends Component {
  state = {
    isTeamOpen: {},
    isCoachOpen: {},
    isManagerOpen: {}
  };

  componentWillMount() {
    const { info } = this.props;

    if (info) {
      let isTeamOpen = {};
      let isCoachOpen = {};
      let isManagerOpen = {};

      _.keys(info.teams).map(teamID => {
        isTeamOpen[teamID] = false;
      });

      _.keys(info.coaches).map(coachID => {
        isCoachOpen[coachID] = false;
      });

      _.keys(info.managers).map(managerID => {
        isManagerOpen[managerID] = false;
      });

      this.setState({
        isTeamOpen,
        isCoachOpen,
        isManagerOpen
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { info } = nextProps;

    if (info && info !== this.props.info) {
      let isTeamOpen = {};
      let isCoachOpen = {};
      let isManagerOpen = {};

      _.keys(info.teams).map(teamID => {
        isTeamOpen[teamID] = false;
      });

      _.keys(info.coaches).map(coachID => {
        isCoachOpen[coachID] = false;
      });

      _.keys(info.managers).map(managerID => {
        isManagerOpen[managerID] = false;
      });

      this.setState({
        isTeamOpen,
        isCoachOpen,
        isManagerOpen
      });
    }
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
      teams,
      info,
      isInfoLoading,
      isTeamsLoading,
      isManagersLoading,
      isCoachesLoading,
      isPastEvent,
      eventID,
      role,
      userID
    } = this.props;
    const {
      markAbsent,
      unmarkAbsent,
      editAbsentRating,
      updateReplacementCoach,
      removeReplacementCoach
    } = this.props.actions;
    const { isTeamOpen, isCoachOpen, isManagerOpen } = this.state;

    let eventTeams = [];
    let eventCoaches = [];
    let eventManagers = [];

    !isTeamsLoading &&
      !isInfoLoading &&
      info &&
      _.toPairs(info.teams).map(([id, teamInfo]) => {
        const showResults = teamInfo.resultsStatus === "FINALISED";
        const isCompetitive = info.requiredInfo.isCompetitive;

        if (teamInfo && teams[id]) {
          eventTeams.push(
            <Route
              key={id}
              render={({ history }) => {
                return (
                  <div>
                    <ListItem button onClick={() => this.toggleTeamInfo(id)}>
                      <ListItemText
                        primary={teams[id].info.name}
                        secondary={teams[id].info.sport}
                      />
                      {isTeamOpen[id] ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse
                      component="li"
                      in={isTeamOpen[id]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List className={classes.nested} disablePadding>
                        {showResults && (
                          <ListSubheader>Opponents & Results</ListSubheader>
                        )}
                        {showResults &&
                          this.getResultsForEvent(id, teams[id], info)}
                        {!showResults &&
                          isCompetitive && (
                            <ListSubheader>Opponents</ListSubheader>
                          )}
                        {!showResults &&
                          isCompetitive && (
                            <List>
                              {_.toPairs(
                                teamInfo.opponents
                              ).map(([opponentID, opponentInfo]) => {
                                return (
                                  <ListItem
                                    key={`eventOpponent-${eventID}-${id}-${opponentID}`}
                                  >
                                    <Avatar src={defaultEmblem} />
                                    <ListItemText
                                      primary={
                                        opponentInfo.name === ""
                                          ? "Unknown"
                                          : opponentInfo.name
                                      }
                                    />
                                  </ListItem>
                                );
                              })}
                            </List>
                          )}
                        <ListSubheader>Options</ListSubheader>
                        <ListItem
                          className={classes.inset}
                          button
                          onClick={() => history.push(`/myaccount/teams/${id}`)}
                        >
                          <ListItemIcon>
                            <TeamIcon />
                          </ListItemIcon>
                          <ListItemText primary="View team info" />
                        </ListItem>
                        {info.requiredInfo.isCompetitive &&
                          info.requiredInfo.status === "ACTIVE" && (
                            <ListItem
                              className={classes.inset}
                              button
                              onClick={() =>
                                history.push(
                                  `/myaccount/results/${id}/${eventID}`
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
    !isCoachesLoading &&
      !isInfoLoading &&
      info &&
      _.toPairs(info.coaches).map(([id, coachEventInfo]) => {
        const coachInfo = coaches[id].info;
        const isAbsent =
          !coachEventInfo.attendance.didAttend ||
          !coachEventInfo.attendance.willAttend;
        const substitute = coachEventInfo.attendance.substitute;
        const isSubstitute = coachEventInfo.attendance.isSubstitute;
        const showMarkAbsent =
          info.requiredInfo.status === "ACTIVE" &&
          (role === "admin" || role === "manager") &&
          ((isPastEvent && coachEventInfo.attendance.didAttend) ||
            (!isPastEvent && coachEventInfo.attendance.willAttend)) &&
          coachEventInfo.hours.status === "AWAITING_SIGN_IN";
        const showUnmarkAbsent =
          info.requiredInfo.status === "ACTIVE" &&
          (role === "admin" || role === "manager") &&
          ((isPastEvent && !coachEventInfo.attendance.didAttend) ||
            (!isPastEvent && !coachEventInfo.attendance.willAttend));
        const showFindReplacementCoach =
          info.requiredInfo.status === "ACTIVE" &&
          !isPastEvent &&
          showUnmarkAbsent &&
          coachEventInfo.hours.status === "AWAITING_SIGN_IN";
        const showHoursStatus =
          (role === "admin" || role === "manager" || id === userID) &&
          info.requiredInfo.status === "ACTIVE" &&
          coachEventInfo.attendance.didAttend &&
          coachEventInfo.attendance.willAttend;
        const showAbsenteeismStatus =
          info.requiredInfo.status === "ACTIVE" &&
          (!coachEventInfo.attendance.didAttend ||
            !coachEventInfo.attendance.willAttend);

        let hourLoggingStatusAvatar = (
          <Avatar className={classes.awaitingSignInAvatar}>
            <AwaitingSignInIcon />
          </Avatar>
        );
        let hourLoggingStatusText = "Not yet signed in";
        if (coachEventInfo.hours.status === "AWAITING_SIGN_OUT") {
          hourLoggingStatusAvatar = (
            <Avatar className={classes.awaitingSignOutAvatar}>
              <AwaitingSignOutIcon />
            </Avatar>
          );
          hourLoggingStatusText = "Signed in";
        } else if (coachEventInfo.hours.status === "AWAITING_APPROVAL") {
          hourLoggingStatusAvatar = (
            <Avatar className={classes.awaitingApprovalAvatar}>
              <AwaitingApprovalIcon />
            </Avatar>
          );
          hourLoggingStatusText = `Signed out & awaiting approval`;
        } else if (coachEventInfo.hours.status === "APPROVED") {
          hourLoggingStatusAvatar = (
            <Avatar className={classes.hoursApprovedAvatar}>
              <HoursApprovedIcon />
            </Avatar>
          );
          hourLoggingStatusText = `Hours logged and approved`;
        }

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
                      secondary={
                        isAbsent
                          ? substitute === ""
                            ? "Absent without replacement coach"
                            : "Absent with replacement coach"
                          : isSubstitute
                            ? `Replacement for ${coaches[
                                coachEventInfo.attendance.subbingFor
                              ].info.name} ${coaches[
                                coachEventInfo.attendance.subbingFor
                              ].info.surname}`
                            : ""
                      }
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
                      {(showHoursStatus || showAbsenteeismStatus) && (
                        <ListSubheader>Status</ListSubheader>
                      )}
                      {showHoursStatus && (
                        <ListItem className={classes.inset}>
                          {hourLoggingStatusAvatar}
                          <ListItemText
                            primary="Hours"
                            secondary={hourLoggingStatusText}
                          />
                        </ListItem>
                      )}
                      {showAbsenteeismStatus && (
                        <ListItem className={classes.inset}>
                          <Avatar
                            className={
                              coachEventInfo.absenteeism.rating === "GOOD"
                                ? classes.goodAbsentAvatar
                                : classes.badAbsentAvatar
                            }
                          >
                            <AbsentIcon />
                          </Avatar>
                          <ListItemText
                            primary={
                              isPastEvent ? "Did Not Attend" : "Not Attending"
                            }
                            secondary={
                              coachEventInfo.absenteeism.reason === ""
                                ? "No reason given"
                                : `Reason: "${coachEventInfo.absenteeism
                                    .reason}"`
                            }
                          />
                          <ListItemSecondaryAction>
                            <IconButton
                              aria-label="edit attendance rating"
                              onClick={() => editAbsentRating(id)}
                            >
                              <EditIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      )}
                      {showAbsenteeismStatus && (
                        <ListItem className={classes.inset}>
                          {coachEventInfo.attendance.hasSubstitute ? (
                            <Avatar
                              src={
                                coaches[coachEventInfo.attendance.substitute]
                                  .info.profilePictureURL === ""
                                  ? defaultProfilePicture
                                  : coaches[
                                      coachEventInfo.attendance.substitute
                                    ].info.profilePictureURL
                              }
                            />
                          ) : (
                            <Avatar>
                              <PersonIcon />
                            </Avatar>
                          )}
                          <ListItemText
                            primary="Replacement"
                            secondary={
                              coachEventInfo.attendance.hasSubstitute
                                ? `${coaches[
                                    coachEventInfo.attendance.substitute
                                  ].info.name} ${coaches[
                                    coachEventInfo.attendance.substitute
                                  ].info.surname}`
                                : "No replacement coach assigned"
                            }
                          />
                          {coachEventInfo.hours.status === "AWAITING_SIGN_IN" &&
                            coachEventInfo.attendance.hasSubstitute &&
                            (role === "admin" || role === "manager") && (
                              <ListItemSecondaryAction>
                                <IconButton
                                  aria-label="remove replacement coach"
                                  onClick={() =>
                                    removeReplacementCoach(
                                      id,
                                      coachEventInfo.attendance.substitute
                                    )}
                                >
                                  <CancelIcon />
                                </IconButton>
                              </ListItemSecondaryAction>
                            )}
                        </ListItem>
                      )}
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
                      {showMarkAbsent && (
                        <ListItem
                          className={classes.inset}
                          button
                          onClick={() => markAbsent(id)}
                        >
                          <ListItemIcon>
                            <AbsentIcon />
                          </ListItemIcon>
                          <ListItemText primary="Mark as absent" />
                        </ListItem>
                      )}
                      {showUnmarkAbsent && (
                        <ListItem
                          className={classes.inset}
                          button
                          onClick={() => unmarkAbsent(id)}
                        >
                          <ListItemIcon>
                            <UncancelIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              isPastEvent
                                ? "Mark as attended"
                                : "Mark as attending"
                            }
                          />
                        </ListItem>
                      )}
                      {showFindReplacementCoach && (
                        <ListItem
                          className={classes.inset}
                          button
                          onClick={() =>
                            updateReplacementCoach(
                              id,
                              coachEventInfo.attendance.substitute
                            )}
                        >
                          <ListItemIcon>
                            <AddSubIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              coachEventInfo.attendance.hasSubstitute
                                ? "Change replacement coach"
                                : "Find replacement coach"
                            }
                          />
                        </ListItem>
                      )}
                      {showHoursStatus && (
                        <ListItem
                          className={classes.inset}
                          button
                          onClick={() => history.push("/myaccount/hours")}
                        >
                          <ListItemIcon>
                            <HoursIcon />
                          </ListItemIcon>
                          <ListItemText primary="View hours" />
                        </ListItem>
                      )}
                    </List>
                  </Collapse>
                </div>
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
    const {
      classes,
      info,
      isPastEvent,
      canCancel,
      canEdit,
      isMobile
    } = this.props;
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

    const ad = this.createAd();
    const { coaches, managers, teams } = this.getListItems();
    const showButtons = !isPastEvent && info;

    let cancelButton = <div />;
    if (showButtons) {
      if (info.requiredInfo.status === "CANCELLED") {
        cancelButton = (
          <Button
            disabled={
              isInfoLoading ||
              isCoachesLoading ||
              isManagersLoading ||
              isTeamsLoading
            }
            aria-label="uncancel event"
            onClick={() => uncancelEvent()}
          >
            <UncancelIcon className={classes.iconAdjacentText} /> Uncancel event
          </Button>
        );
      } else {
        cancelButton = (
          <Button
            disabled={
              isInfoLoading ||
              isCoachesLoading ||
              isManagersLoading ||
              isTeamsLoading
            }
            aria-label="cancel event"
            onClick={() => cancelEvent()}
          >
            <CancelIcon className={classes.iconAdjacentText} /> Cancel event
          </Button>
        );
      }
    }

    return (
      <div className={classes.root}>
        {isInfoLoading || !info ? (
          <div className={classes.appBar}>
            <Typography className={classes.name} type="title" component="h2">
              Loading...
            </Typography>
          </div>
        ) : (
          <div className={classes.appBar}>
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
          </div>
        )}
        <div className={classes.outerWrapper}>
          <div className={classes.actionsBar}>
            <Route
              render={({ history }) => (
                <Button
                  aria-label="back"
                  onClick={() => {
                    history.goBack();
                    updateView("EVENTS_LIST");
                  }}
                >
                  <BackIcon className={classes.iconAdjacentText} /> Back
                </Button>
              )}
            />
            {showButtons && canCancel && cancelButton}
            {showButtons &&
              canEdit &&
              !isMobile && (
                <Button aria-label="edit event" onClick={() => editEvent()}>
                  <EditIcon className={classes.iconAdjacentText} /> Edit event
                </Button>
              )}
          </div>
          <div className={classes.adWrapper}>{ad}</div>
          <div className={classes.wrapper}>
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
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
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
                            : moment(info.requiredInfo.times.start).format(
                                "DD MMMM YYYY"
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
                            : moment(info.requiredInfo.times.start).format(
                                "h:mm A"
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
                            : moment(info.requiredInfo.times.end).format(
                                "h:mm A"
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
                            : info.optionalInfo.venue === ""
                              ? "Unknown"
                              : info.optionalInfo.venue
                        }
                      />
                      {info &&
                        info.optionalInfo.venue !== "" && (
                          <ListItemSecondaryAction>
                            <IconButton
                              aria-label="view in maps"
                              onClick={() => {
                                window.open(
                                  `https://www.google.com/maps/place/${_.replace(
                                    info.optionalInfo.venue,
                                    " ",
                                    "+"
                                  )}`
                                );
                              }}
                            >
                              <LocationIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        )}
                    </ListItem>
                    {!isInfoLoading &&
                      info &&
                      info.requiredInfo.isCompetitive && (
                        <ListItem>
                          <ListItemText
                            primary="Home / Away"
                            secondary={
                              info.optionalInfo.homeAway === "UNKNOWN"
                                ? "Currently unknown"
                                : _.capitalize(info.optionalInfo.homeAway)
                            }
                          />
                        </ListItem>
                      )}
                    <ListItem>
                      <ListItemText
                        primary="Notes"
                        secondary={
                          isInfoLoading || !info
                            ? "Loading..."
                            : info.optionalInfo.notes === ""
                              ? "N/A"
                              : info.optionalInfo.notes
                        }
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
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
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
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
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
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
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(EventInfo);
