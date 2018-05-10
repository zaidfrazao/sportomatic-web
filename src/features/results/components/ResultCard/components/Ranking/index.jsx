/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import Avatar from "material-ui/Avatar";
import Button from "material-ui/Button";
import { amber, brown, grey, green, lightBlue } from "material-ui/colors";
import { Route } from "react-router";
import TextField from "material-ui/TextField";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import defaultEmblemURL from "../../../../images/default-emblem-url.png";

const mobileBreakpoint = 800;

const styles = theme => ({
  commentaryInnerWrapper: {
    flexGrow: 1,
    padding: 24
  },
  commentaryTextField: {
    width: "100%"
  },
  commentaryWrapper: {
    border: `1px solid ${grey[300]}`,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white"
  },
  emblems: {
    width: "80%",
    maxWidth: 80,
    margin: 10,
    height: "auto",
    [`@media (max-width: ${mobileBreakpoint}px)`]: {
      width: 40,
      margin: 10,
      height: "auto"
    }
  },
  finaliseButton: {
    backgroundColor: green[500],
    color: grey[50],
    width: "100%",
    height: 80,
    "&:hover": {
      backgroundColor: green[300]
    }
  },
  goalsWrapper: {
    width: "25%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: grey[100],
    [`@media (max-width: ${mobileBreakpoint}px)`]: {
      padding: 16,
      width: "auto",
      display: "block"
    }
  },
  placedFirst: {
    backgroundColor: amber[500],
    color: grey[50],
    fontSize: 14,
    padding: "8px 0",
    textAlign: "center",
    width: "100%"
  },
  placedSecond: {
    backgroundColor: grey[400],
    color: grey[50],
    fontSize: 14,
    padding: "8px 0",
    textAlign: "center",
    width: "100%"
  },
  placedThird: {
    backgroundColor: brown[400],
    color: grey[50],
    fontSize: 14,
    padding: "8px 0",
    textAlign: "center",
    width: "100%"
  },
  placedOther: {
    backgroundColor: grey[700],
    color: grey[50],
    fontSize: 14,
    padding: "8px 0",
    textAlign: "center",
    width: "100%"
  },
  pointNameColumn: {
    flexGrow: 1,
    textAlign: "center",
    padding: 24,
    backgroundColor: grey[100],
    [`@media (max-width: ${mobileBreakpoint}px)`]: {
      width: "75%"
    }
  },
  pointsWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white"
  },
  subPointColumn: {
    width: "25%",
    padding: 24,
    textAlign: "center",
    backgroundColor: grey[200]
  },
  subPointWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row"
  },
  startButton: {
    backgroundColor: lightBlue[500],
    color: grey[50],
    width: "100%",
    height: 80,
    "&:hover": {
      backgroundColor: lightBlue[300]
    }
  },
  teamName: {
    flexGrow: 1,
    textAlign: "left",
    color: grey[600],
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    [`@media (min-width: ${mobileBreakpoint}px)`]: {
      fontSize: 20,
      paddingLeft: 8
    }
  },
  teamNameHeader: {
    textAlign: "center",
    color: grey[600],
    backgroundColor: grey[50],
    border: `1px solid ${grey[300]}`,
    padding: 16
  },
  teamNameWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "flex-start",
    backgroundColor: "white"
  },
  teamsWrapper: {
    width: "calc(100% - 1px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: grey[200],
    border: `1px solid ${grey[300]}`
  },
  viewStatsButton: {
    backgroundColor: grey[200],
    color: grey[900],
    width: "100%",
    "&:hover": {
      backgroundColor: grey[100]
    }
  },
  wrapper: {
    margin: "16px 0",
    border: `1px solid ${grey[300]}`
  }
});

class Ranking extends Component {
  state = {
    opponents: {},
    errors: {
      ourScore: {
        hasError: false,
        message: ""
      },
      theirScore: {
        hasError: false,
        message: ""
      }
    }
  };

  componentWillMount() {
    const { opponents } = this.props.ourTeam;

    this.setState({
      opponents
    });
  }

  componentWillReceiveProps(nextProps) {
    const { opponents } = nextProps.ourTeam;

    if (opponents !== this.props.ourTeam.opponents) {
      this.setState({
        opponents
      });
    }
  }

  updateResult(opponentID, newResult) {
    const { opponents } = this.state;

    this.setState({
      opponents: {
        ...opponents,
        [opponentID]: newResult
      }
    });
  }

  updateError(field, hasError, message) {
    const { errors } = this.state;

    this.setState({
      errors: {
        ...errors,
        [field]: {
          hasError,
          message
        }
      }
    });
  }

  renderMobile() {
    const {
      classes,
      teamID,
      eventID,
      resultsStatus,
      canEdit,
      canApprove
    } = this.props;
    const { name, emblemURL } = this.props.ourTeam;
    const { startLogging, finaliseResults, editResult } = this.props.actions;
    const { opponents, errors } = this.state;

    let commentary = "";
    let ourTotalPoints = 0;
    _.toPairs(opponents).map(([opponentID, opponentInfo]) => {
      ourTotalPoints =
        opponentInfo.ourScore && opponentInfo.ourScore.totalPoints;
      commentary = opponentInfo.commentary || "";
    });

    let scores = [{ id: teamID, score: ourTotalPoints }];

    _.toPairs(opponents).map(([opponentID, opponentInfo]) => {
      if (resultsStatus === "AWAITING_START") {
        scores.push({
          id: opponentID,
          score: 0
        });
      } else {
        scores.push({
          id: opponentID,
          score: opponentInfo.theirScore.totalPoints
        });
      }
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

    const teamsList = scores.map(score => {
      let statusStyle = "";
      let resultText = "";
      if (resultsStatus === "FINALISED") {
        switch (placements[score.id]) {
          case 1:
            statusStyle = classes.placedFirst;
            resultText = "1st";
            break;
          case 2:
            statusStyle = classes.placedSecond;
            resultText = "2nd";
            break;
          case 3:
            statusStyle = classes.placedThird;
            resultText = "3rd";
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
            resultText = `${placements[score.id]}${suffix}`;
            break;
        }
      }

      if (score.id === teamID) {
        return (
          <div key={`resultList-${eventID}-${teamID}-${score.id}`}>
            <div className={statusStyle}>{resultText}</div>
            <div className={classes.teamNameWrapper}>
              <Avatar
                src={emblemURL === "" ? defaultEmblemURL : emblemURL}
                className={classes.emblems}
              />
              <Typography
                type="subheading"
                component="p"
                className={classes.teamName}
              >
                {name}
              </Typography>
              {resultsStatus !== "AWAITING_START" && (
                <div className={classes.goalsWrapper}>
                  <Typography type="title" component="p">
                    {isNaN(ourTotalPoints) ? "?" : ourTotalPoints}
                  </Typography>
                </div>
              )}
            </div>
          </div>
        );
      } else {
        return (
          <div key={`resultList-${eventID}-${teamID}-${score.id}`}>
            <div className={statusStyle}>{resultText}</div>
            <div className={classes.teamNameWrapper}>
              <Avatar src={defaultEmblemURL} className={classes.emblems} />
              <Typography
                type="subheading"
                component="p"
                className={classes.teamName}
              >
                {opponents[score.id].name === ""
                  ? "Unknown"
                  : opponents[score.id].name}
              </Typography>
              {resultsStatus !== "AWAITING_START" && (
                <div className={classes.goalsWrapper}>
                  <Typography type="title" component="p">
                    {isNaN(score.score) ? "?" : score.score}
                  </Typography>
                </div>
              )}
            </div>
          </div>
        );
      }
    });

    let teamLoggingList = [
      <div className={classes.subPointWrapper}>
        <div className={classes.pointNameColumn}>
          <Typography type="subheading" component="p">
            {name}
          </Typography>
        </div>
        <div className={classes.subPointColumn}>
          <TextField
            type="number"
            value={ourTotalPoints}
            inputProps={{
              min: 0
            }}
            error={errors.ourScore.hasError}
            helperText={errors.ourScore.message}
            onChange={e => {
              const newValue = parseInt(e.target.value, 10);

              if (isNaN(newValue) || newValue < 0) {
                this.updateError("ourScore", true, "Invalid");
              } else {
                this.updateError("ourScore", false, "");
              }

              _.toPairs(opponents).map(([opponentID, opponentInfo]) => {
                this.updateResult(opponentID, {
                  commentary,
                  ourScore: {
                    totalPoints: newValue,
                    requiredPoints: {
                      points: newValue
                    }
                  },
                  theirScore: opponentInfo.theirScore,
                  name: opponentInfo.name,
                  isSignedUp: opponentInfo.isSignedUp
                });
              });
            }}
            onBlur={() => {
              if (!errors.theirScore.hasError) {
                _.toPairs(opponents).map(([opponentID, opponentInfo]) => {
                  editResult(eventID, teamID, opponentID, {
                    commentary,
                    ourScore: opponentInfo.ourScore,
                    theirScore: opponentInfo.theirScore
                  });
                });
              }
            }}
            disabled={!canEdit}
          />
        </div>
      </div>
    ];

    _.toPairs(opponents).map(([opponentID, opponentInfo]) => {
      const { ourScore, theirScore, name } = opponentInfo;

      if (resultsStatus === "AWAITING_FINALISE") {
        teamLoggingList.push(
          <div
            key={`teamLogging-${eventID}-${teamID}-${opponentID}`}
            className={classes.subPointWrapper}
          >
            <div className={classes.pointNameColumn}>
              <Typography type="subheading" component="p">
                {name === "" ? "Unknown" : name}
              </Typography>
            </div>
            <div className={classes.subPointColumn}>
              <TextField
                type="number"
                value={theirScore.totalPoints}
                inputProps={{
                  min: 0
                }}
                error={errors.theirScore.hasError}
                helperText={errors.theirScore.message}
                onChange={e => {
                  const newValue = parseInt(e.target.value, 10);

                  if (isNaN(newValue) || newValue < 0) {
                    this.updateError("theirScore", true, "Invalid");
                  } else {
                    this.updateError("theirScore", false, "");
                  }

                  this.updateResult(opponentID, {
                    commentary,
                    ourScore,
                    theirScore: {
                      totalPoints: newValue,
                      requiredPoints: {
                        points: newValue
                      }
                    },
                    name: opponentInfo.name,
                    isSignedUp: opponentInfo.isSignedUp
                  });
                }}
                onBlur={() => {
                  if (!errors.theirScore.hasError) {
                    editResult(eventID, teamID, opponentID, {
                      commentary,
                      ourScore,
                      theirScore
                    });
                  }
                }}
                disabled={!canEdit}
              />
            </div>
          </div>
        );
      }
    });

    return (
      <div key={`result-${teamID}`} className={classes.wrapper}>
        <Typography
          type="title"
          component="p"
          className={classes.teamNameHeader}
        >
          {name}
        </Typography>
        <div className={classes.teamsWrapper}>
          <div className={classes.pointsWrapper}>{teamsList}</div>
          {resultsStatus === "AWAITING_FINALISE" && teamLoggingList}
          {resultsStatus === "AWAITING_FINALISE" && (
            <div className={classes.commentaryWrapper}>
              <div className={classes.commentaryInnerWrapper}>
                <TextField
                  className={classes.commentaryTextField}
                  disabled={!canEdit}
                  onChange={e => {
                    _.toPairs(opponents).map(([opponentID, opponentInfo]) => {
                      const newValue = e.target.value;

                      this.updateResult(opponentID, {
                        commentary: newValue,
                        ourScore: opponentInfo.ourScore,
                        theirScore: opponentInfo.theirScore,
                        name: opponentInfo.name,
                        isSignedUp: opponentInfo.isSignedUp
                      });
                    });
                  }}
                  onBlur={() => {
                    if (
                      !errors.ourScore.hasError &&
                      !errors.theirScore.hasError
                    ) {
                      _.toPairs(opponents).map(([opponentID, opponentInfo]) => {
                        editResult(eventID, teamID, opponentID, {
                          commentary,
                          ourScore: opponentInfo.ourScore,
                          theirScore: opponentInfo.theirScore
                        });
                      });
                    }
                  }}
                  label="Additional commentary"
                  value={commentary}
                  multiline
                  rows={3}
                  placeholder="Optional"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </div>
            </div>
          )}
        </div>
        {resultsStatus === "AWAITING_START" && (
          <Button
            raised
            disabled={!canEdit}
            className={classes.startButton}
            onClick={() =>
              startLogging(
                eventID,
                teamID,
                {
                  totalPoints: 0,
                  requiredPoints: {
                    points: 0
                  }
                },
                _.keys(opponents)
              )}
          >
            {canEdit ? "Log results" : "Awaiting results"}
          </Button>
        )}
        {resultsStatus === "AWAITING_FINALISE" && (
          <Button
            raised
            disabled={
              !canApprove ||
              errors.ourScore.hasError ||
              errors.theirScore.hasError
            }
            className={classes.finaliseButton}
            onClick={() => finaliseResults(eventID, teamID)}
          >
            {canApprove ? "Finalise results" : "To be finalised"}
          </Button>
        )}
        {resultsStatus === "FINALISED" && (
          <Route
            render={({ history }) => (
              <Button
                raised
                dense
                color="contrast"
                className={classes.viewStatsButton}
                onClick={() =>
                  history.push(`/myaccount/results/${teamID}/${eventID}`)}
              >
                View stats & commentary
              </Button>
            )}
          />
        )}
      </div>
    );
  }

  renderDesktop() {
    const {
      classes,
      teamID,
      eventID,
      resultsStatus,
      canEdit,
      canApprove
    } = this.props;
    const { name, emblemURL } = this.props.ourTeam;
    const { startLogging, finaliseResults, editResult } = this.props.actions;
    const { opponents, errors } = this.state;

    let commentary = "";
    let ourTotalPoints = 0;
    _.toPairs(opponents).map(([opponentID, opponentInfo]) => {
      ourTotalPoints =
        opponentInfo.ourScore && opponentInfo.ourScore.totalPoints;
      commentary = opponentInfo.commentary || "";
    });

    let scores = [{ id: teamID, score: ourTotalPoints }];

    _.toPairs(opponents).map(([opponentID, opponentInfo]) => {
      if (resultsStatus === "AWAITING_START") {
        scores.push({
          id: opponentID,
          score: 0
        });
      } else {
        scores.push({
          id: opponentID,
          score: opponentInfo.theirScore.totalPoints
        });
      }
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

    const teamsList = scores.map(score => {
      let statusStyle = "";
      let resultText = "";
      if (resultsStatus === "FINALISED") {
        switch (placements[score.id]) {
          case 1:
            statusStyle = classes.placedFirst;
            resultText = "1st";
            break;
          case 2:
            statusStyle = classes.placedSecond;
            resultText = "2nd";
            break;
          case 3:
            statusStyle = classes.placedThird;
            resultText = "3rd";
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
            resultText = `${placements[score.id]}${suffix}`;
            break;
        }
      }

      if (score.id === teamID) {
        return (
          <div key={`resultList-${eventID}-${teamID}-${score.id}`}>
            <div className={statusStyle}>{resultText}</div>
            <div className={classes.teamNameWrapper}>
              <Avatar
                src={emblemURL === "" ? defaultEmblemURL : emblemURL}
                className={classes.emblems}
              />
              <Typography
                type="subheading"
                component="p"
                className={classes.teamName}
              >
                {name}
              </Typography>
              {resultsStatus !== "AWAITING_START" && (
                <div className={classes.goalsWrapper}>
                  <Typography type="title" component="p">
                    {isNaN(ourTotalPoints) ? "?" : ourTotalPoints}
                  </Typography>
                </div>
              )}
            </div>
          </div>
        );
      } else {
        return (
          <div key={`resultList-${eventID}-${teamID}-${score.id}`}>
            <div className={statusStyle}>{resultText}</div>
            <div className={classes.teamNameWrapper}>
              <Avatar src={defaultEmblemURL} className={classes.emblems} />
              <Typography
                type="subheading"
                component="p"
                className={classes.teamName}
              >
                {opponents[score.id].name === ""
                  ? "Unknown"
                  : opponents[score.id].name}
              </Typography>
              {resultsStatus !== "AWAITING_START" && (
                <div className={classes.goalsWrapper}>
                  <Typography type="title" component="p">
                    {isNaN(score.score) ? "?" : score.score}
                  </Typography>
                </div>
              )}
            </div>
          </div>
        );
      }
    });

    let teamLoggingList = [
      <div className={classes.subPointWrapper}>
        <div className={classes.pointNameColumn}>
          <Typography type="subheading" component="p">
            {name}
          </Typography>
        </div>
        <div className={classes.subPointColumn}>
          <TextField
            type="number"
            value={ourTotalPoints}
            inputProps={{
              min: 0
            }}
            error={errors.ourScore.hasError}
            helperText={errors.ourScore.message}
            onChange={e => {
              const newValue = parseInt(e.target.value, 10);

              if (isNaN(newValue) || newValue < 0) {
                this.updateError("ourScore", true, "Invalid");
              } else {
                this.updateError("ourScore", false, "");
              }

              _.toPairs(opponents).map(([opponentID, opponentInfo]) => {
                this.updateResult(opponentID, {
                  commentary,
                  ourScore: {
                    totalPoints: newValue,
                    requiredPoints: {
                      points: newValue
                    }
                  },
                  theirScore: opponentInfo.theirScore,
                  name: opponentInfo.name,
                  isSignedUp: opponentInfo.isSignedUp
                });
              });
            }}
            onBlur={() => {
              if (!errors.theirScore.hasError) {
                _.toPairs(opponents).map(([opponentID, opponentInfo]) => {
                  editResult(eventID, teamID, opponentID, {
                    commentary,
                    ourScore: opponentInfo.ourScore,
                    theirScore: opponentInfo.theirScore
                  });
                });
              }
            }}
            disabled={!canEdit}
          />
        </div>
      </div>
    ];

    _.toPairs(opponents).map(([opponentID, opponentInfo]) => {
      const { ourScore, theirScore, name } = opponentInfo;

      if (resultsStatus === "AWAITING_FINALISE") {
        teamLoggingList.push(
          <div
            key={`resultLogging-${eventID}-${teamID}-${opponentID}`}
            className={classes.subPointWrapper}
          >
            <div className={classes.pointNameColumn}>
              <Typography type="subheading" component="p">
                {name === "" ? "Unknown" : name}
              </Typography>
            </div>
            <div className={classes.subPointColumn}>
              <TextField
                type="number"
                value={theirScore.totalPoints}
                inputProps={{
                  min: 0
                }}
                error={errors.theirScore.hasError}
                helperText={errors.theirScore.message}
                onChange={e => {
                  const newValue = parseInt(e.target.value, 10);

                  if (isNaN(newValue) || newValue < 0) {
                    this.updateError("theirScore", true, "Invalid");
                  } else {
                    this.updateError("theirScore", false, "");
                  }

                  this.updateResult(opponentID, {
                    commentary,
                    ourScore,
                    theirScore: {
                      totalPoints: newValue,
                      requiredPoints: {
                        points: newValue
                      }
                    },
                    name: opponentInfo.name,
                    isSignedUp: opponentInfo.isSignedUp
                  });
                }}
                onBlur={() => {
                  if (!errors.theirScore.hasError) {
                    editResult(eventID, teamID, opponentID, {
                      commentary,
                      ourScore,
                      theirScore
                    });
                  }
                }}
                disabled={!canEdit}
              />
            </div>
          </div>
        );
      }
    });

    return (
      <div key={`result-${teamID}`} className={classes.wrapper}>
        <Typography
          type="title"
          component="p"
          className={classes.teamNameHeader}
        >
          {name}
        </Typography>
        <div className={classes.pointsWrapper}>{teamsList}</div>
        {resultsStatus === "AWAITING_FINALISE" && teamLoggingList}
        {resultsStatus === "AWAITING_FINALISE" && (
          <div className={classes.commentaryWrapper}>
            <div className={classes.commentaryInnerWrapper}>
              <TextField
                className={classes.commentaryTextField}
                disabled={!canEdit}
                onChange={e => {
                  _.toPairs(opponents).map(([opponentID, opponentInfo]) => {
                    const newValue = e.target.value;

                    this.updateResult(opponentID, {
                      commentary: newValue,
                      ourScore: opponentInfo.ourScore,
                      theirScore: opponentInfo.theirScore,
                      name: opponentInfo.name,
                      isSignedUp: opponentInfo.isSignedUp
                    });
                  });
                }}
                onBlur={() => {
                  if (
                    !errors.ourScore.hasError &&
                    !errors.theirScore.hasError
                  ) {
                    _.toPairs(opponents).map(([opponentID, opponentInfo]) => {
                      editResult(eventID, teamID, opponentID, {
                        commentary,
                        ourScore: opponentInfo.ourScore,
                        theirScore: opponentInfo.theirScore
                      });
                    });
                  }
                }}
                label="Additional commentary"
                value={commentary}
                multiline
                rows={3}
                placeholder="Optional"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </div>
          </div>
        )}
        {resultsStatus === "AWAITING_START" && (
          <Button
            raised
            disabled={!canEdit}
            className={classes.startButton}
            onClick={() =>
              startLogging(
                eventID,
                teamID,
                {
                  totalPoints: 0,
                  requiredPoints: {
                    points: 0
                  }
                },
                _.keys(opponents)
              )}
          >
            {canEdit ? "Log results" : "Awaiting results"}
          </Button>
        )}
        {resultsStatus === "AWAITING_FINALISE" && (
          <Button
            raised
            disabled={
              !canApprove ||
              errors.ourScore.hasError ||
              errors.theirScore.hasError
            }
            className={classes.finaliseButton}
            onClick={() => finaliseResults(eventID, teamID)}
          >
            {canApprove ? "Finalise results" : "To be finalised"}
          </Button>
        )}
        {resultsStatus === "FINALISED" && (
          <Route
            render={({ history }) => (
              <Button
                raised
                dense
                color="contrast"
                className={classes.viewStatsButton}
                onClick={() =>
                  history.push(`/myaccount/results/${teamID}/${eventID}`)}
              >
                View stats & commentary
              </Button>
            )}
          />
        )}
      </div>
    );
  }

  render() {
    const { isMobile } = this.props;

    if (isMobile) {
      return this.renderMobile();
    } else {
      return this.renderDesktop();
    }
  }
}

export default withStyles(styles)(Ranking);
