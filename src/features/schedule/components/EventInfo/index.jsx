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
import AppBar from "material-ui/AppBar";
import Avatar from "material-ui/Avatar";
import AwaitingApprovalIcon from "material-ui-icons/AssignmentReturn";
import AwaitingSignInIcon from "material-ui-icons/AssignmentLate";
import AwaitingSignOutIcon from "material-ui-icons/AssignmentReturned";
import BackIcon from "material-ui-icons/ArrowBack";
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
import Toolbar from "material-ui/Toolbar";
import Tooltip from "material-ui/Tooltip";
import Typography from "material-ui/Typography";
import UncancelIcon from "material-ui-icons/Undo";
import WarningIcon from "material-ui-icons/Warning";
import { withStyles } from "material-ui/styles";
import BannerAd from "../../../../components/BannerAd";
import LargeMobileBannerAd from "../../../../components/LargeMobileBannerAd";
import LeaderboardAd from "../../../../components/LeaderboardAd";
import defaultProfilePicture from "../../image/default-profile-picture.png";

const styles = theme => ({
  actionsBar: {
    backgroundColor: grey[200]
  },
  adWrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
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
  drawAvatar: {
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
  inset: {
    paddingLeft: theme.spacing.unit * 4
  },
  lossAvatar: {
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
  placedFirstAvatar: {
    backgroundColor: amber[500]
  },
  placedSecondAvatar: {
    backgroundColor: grey[400]
  },
  placedThirdAvatar: {
    backgroundColor: brown[400]
  },
  placedOtherAvatar: {
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
  winAvatar: {
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
        const hasMultipleOpponents = _.keys(teamInfo.opponents).length > 1;
        if (teamInfo) {
          let scores = [{ id, score: 0 }];
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

          if (showResults) {
            _.toPairs(teamInfo.opponents).map(([opponentID, opponentInfo]) => {
              scores[0].score = opponentInfo.ourScore.totalPoints;
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
          }

          eventTeams.push(
            <Route
              key={id}
              render={({ history }) => {
                const shouldRankTeams =
                  teams[id].info.sport === "Swimming" ||
                  teams[id].info.sport === "Athletics" ||
                  teams[id].info.sport === "Golf";
                let ourResultAvatar = (
                  <Avatar className={classes.unknownResultAvatar}>?</Avatar>
                );
                let ourResultText = "Results not yet logged";
                if (hasMultipleOpponents && shouldRankTeams) {
                  if (showResults) {
                    if (placements[id] === 1) {
                      ourResultAvatar = (
                        <Avatar className={classes.placedFirstAvatar}>
                          {"1"}
                        </Avatar>
                      );
                      ourResultText = `${teams[id].info.name} placed 1st`;
                    } else if (placements[id] === 2) {
                      ourResultAvatar = (
                        <Avatar className={classes.placedSecondAvatar}>
                          {"2"}
                        </Avatar>
                      );
                      ourResultText = `${teams[id].info.name} placed 2nd`;
                    } else if (placements[id] === 3) {
                      ourResultAvatar = (
                        <Avatar className={classes.placedThirdAvatar}>
                          {"3"}
                        </Avatar>
                      );
                      ourResultText = `${teams[id].info.name} placed 3rd`;
                    } else {
                      let suffix = "th";
                      if (placements[id] > 20) {
                        if (placements[id] % 10 === 1) {
                          suffix = "st";
                        } else if (placements[id] % 10 === 2) {
                          suffix = "nd";
                        } else if (placements[id] % 10 === 3) {
                          suffix = "rd";
                        }
                      }
                      ourResultAvatar = (
                        <Avatar className={classes.placedOtherAvatar}>
                          {placements[id]}
                        </Avatar>
                      );
                      ourResultText = `${teams[id].info
                        .name} placed ${placements[id]}${suffix}`;
                    }
                  }
                }
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
                        {info.requiredInfo.isCompetitive &&
                          info.requiredInfo.status === "ACTIVE" && (
                            <ListSubheader>Opponents & Results</ListSubheader>
                          )}
                        {hasMultipleOpponents &&
                          shouldRankTeams && (
                            <ListItem className={classes.inset}>
                              {ourResultAvatar}
                              <ListItemText
                                primary={teams[id].info.name}
                                secondary={ourResultText}
                              />
                            </ListItem>
                          )}
                        {info.requiredInfo.isCompetitive &&
                          info.requiredInfo.status === "ACTIVE" &&
                          _.toPairs(
                            teamInfo.opponents
                          ).map(([opponentID, opponentInfo]) => {
                            const { ourScore, theirScore } = opponentInfo;

                            let resultAvatar = (
                              <Avatar className={classes.unknownResultAvatar}>
                                ?
                              </Avatar>
                            );
                            let resultText = "Results not yet logged";

                            if (hasMultipleOpponents) {
                              if (shouldRankTeams) {
                                if (showResults) {
                                  if (placements[opponentID] === 1) {
                                    resultAvatar = (
                                      <Avatar
                                        className={classes.placedFirstAvatar}
                                      >
                                        {"1"}
                                      </Avatar>
                                    );
                                    resultText = `${opponentInfo.name} placed 1st`;
                                  } else if (placements[opponentID] === 2) {
                                    resultAvatar = (
                                      <Avatar
                                        className={classes.placedSecondAvatar}
                                      >
                                        {"2"}
                                      </Avatar>
                                    );
                                    resultText = `${opponentInfo.name} placed 2nd`;
                                  } else if (placements[opponentID] === 3) {
                                    resultAvatar = (
                                      <Avatar
                                        className={classes.placedThirdAvatar}
                                      >
                                        {"3"}
                                      </Avatar>
                                    );
                                    resultText = `${opponentInfo.name} placed 3rd`;
                                  } else {
                                    let suffix = "th";
                                    if (placements[opponentID] > 20) {
                                      if (placements[opponentID] % 10 === 1) {
                                        suffix = "st";
                                      } else if (
                                        placements[opponentID] % 10 ===
                                        2
                                      ) {
                                        suffix = "nd";
                                      } else if (
                                        placements[opponentID] % 10 ===
                                        3
                                      ) {
                                        suffix = "rd";
                                      }
                                    }
                                    resultAvatar = (
                                      <Avatar
                                        className={classes.placedOtherAvatar}
                                      >
                                        {placements[opponentID]}
                                      </Avatar>
                                    );
                                    resultText = `${opponentInfo.name} placed ${placements[
                                      opponentID
                                    ]}${suffix}`;
                                  }
                                }
                                return (
                                  <ListItem
                                    className={classes.inset}
                                    key={`${id}${opponentID}`}
                                  >
                                    {resultAvatar}
                                    <ListItemText
                                      primary={
                                        opponentInfo.name === ""
                                          ? "Unknown"
                                          : opponentInfo.name
                                      }
                                      secondary={resultText}
                                    />
                                  </ListItem>
                                );
                              } else {
                                if (showResults) {
                                  if (
                                    ourScore.totalPoints >
                                    theirScore.totalPoints
                                  ) {
                                    resultAvatar = (
                                      <Avatar className={classes.winAvatar}>
                                        W
                                      </Avatar>
                                    );
                                    resultText = `${teams[id].info
                                      .name} won ${ourScore.totalPoints} - ${theirScore.totalPoints}`;
                                  } else if (
                                    ourScore.totalPoints <
                                    theirScore.totalPoints
                                  ) {
                                    resultAvatar = (
                                      <Avatar className={classes.lossAvatar}>
                                        L
                                      </Avatar>
                                    );
                                    resultText = `${teams[id].info
                                      .name} lost ${ourScore.totalPoints} - ${theirScore.totalPoints}`;
                                  } else {
                                    resultAvatar = (
                                      <Avatar className={classes.drawAvatar}>
                                        D
                                      </Avatar>
                                    );
                                    resultText = `${teams[id].info
                                      .name} drew ${ourScore.totalPoints} - ${theirScore.totalPoints}`;
                                  }
                                }
                                return (
                                  <ListItem
                                    className={classes.inset}
                                    key={`${id}${opponentID}`}
                                  >
                                    {resultAvatar}
                                    <ListItemText
                                      primary={
                                        opponentInfo.name === ""
                                          ? "Unknown"
                                          : opponentInfo.name
                                      }
                                      secondary={resultText}
                                    />
                                  </ListItem>
                                );
                              }
                            } else {
                              if (showResults) {
                                if (
                                  ourScore.totalPoints > theirScore.totalPoints
                                ) {
                                  resultAvatar = (
                                    <Avatar className={classes.winAvatar}>
                                      W
                                    </Avatar>
                                  );
                                  resultText = `${teams[id].info
                                    .name} won ${ourScore.totalPoints} - ${theirScore.totalPoints}`;
                                } else if (
                                  ourScore.totalPoints < theirScore.totalPoints
                                ) {
                                  resultAvatar = (
                                    <Avatar className={classes.lossAvatar}>
                                      L
                                    </Avatar>
                                  );
                                  resultText = `${teams[id].info
                                    .name} lost ${ourScore.totalPoints} - ${theirScore.totalPoints}`;
                                } else {
                                  resultAvatar = (
                                    <Avatar className={classes.drawAvatar}>
                                      D
                                    </Avatar>
                                  );
                                  resultText = `${teams[id].info
                                    .name} drew ${ourScore.totalPoints} - ${theirScore.totalPoints}`;
                                }
                              }

                              return (
                                <ListItem
                                  className={classes.inset}
                                  key={`${id}${opponentID}`}
                                >
                                  {resultAvatar}
                                  <ListItemText
                                    primary={
                                      opponentInfo.name === ""
                                        ? "Unknown"
                                        : opponentInfo.name
                                    }
                                    secondary={resultText}
                                  />
                                </ListItem>
                              );
                            }
                          })}
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
          (coachEventInfo.attendance.didAttend ||
            coachEventInfo.attendance.hasSubstitute) &&
          (coachEventInfo.attendance.willAttend ||
            coachEventInfo.attendance.hasSubstitute);
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
                      {(showHoursStatus || showAbsenteeismStatus) && (
                        <ListSubheader>Status</ListSubheader>
                      )}
                      {showHoursStatus && (
                        <ListItem className={classes.inset}>
                          {hourLoggingStatusAvatar}
                          <ListItemText
                            primary={
                              coachEventInfo.attendance.hasSubstitute
                                ? "Replacement Coach Hours"
                                : "Hours"
                            }
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
                                  ].info.surname} | ${coaches[
                                    coachEventInfo.attendance.substitute
                                  ].info.phoneNumber}`
                                : "No replacement coach assigned"
                            }
                          />
                          {coachEventInfo.hours.status === "AWAITING_SIGN_IN" &&
                            coachEventInfo.attendance.hasSubstitute &&
                            (role === "admin" || role === "manager") && (
                              <ListItemSecondaryAction>
                                <IconButton
                                  aria-label="remove replacement coach"
                                  onClick={() => removeReplacementCoach(id)}
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
                          onClick={() => updateReplacementCoach(id)}
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
    const { classes, info, isPastEvent, role } = this.props;
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
    const showButtons =
      !isPastEvent && info && (role === "admin" || role === "manager");

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
