import React, { Component } from "react";
import _ from "lodash";
import Avatar from "material-ui/Avatar";
import Button from "material-ui/Button";
import { FormControlLabel } from "material-ui/Form";
import { grey, green, lightBlue, red } from "material-ui/colors";
import { Route } from "react-router";
import Switch from "material-ui/Switch";
import TextField from "material-ui/TextField";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import defaultEmblemURL from "../../../../images/default-emblem-url.png";

const styles = theme => ({
  additionalStatsHeading: {
    backgroundColor: grey[400],
    color: grey[800],
    width: "100%",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    padding: "16px 0"
  },
  additionalStatsToggle: {
    backgroundColor: "#fff",
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  centerSpace: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
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
  draw: {
    backgroundColor: lightBlue[500],
    color: grey[50],
    fontSize: 14,
    padding: "8px 0",
    textAlign: "center",
    "@media (max-width: 600px)": {
      width: "100%"
    }
  },
  emblems: {
    width: "80%",
    maxWidth: 100,
    margin: 10,
    height: "auto",
    "@media (max-width: 600px)": {
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
    width: "40%",
    padding: 24,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 600px)": {
      width: "auto",
      padding: 16,
      display: "block"
    }
  },
  innerResultWrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: "white"
  },
  loss: {
    backgroundColor: red[500],
    color: grey[50],
    fontSize: 14,
    padding: "8px 0",
    textAlign: "center",
    "@media (max-width: 600px)": {
      width: "100%"
    }
  },
  pointNameColumn: {
    flexGrow: 1,
    textAlign: "center",
    padding: 24,
    backgroundColor: grey[100],
    "@media (max-width: 600px)": {
      width: "50%"
    }
  },
  pointsWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    "@media (max-width: 600px)": {
      flexDirection: "column"
    }
  },
  resultWrapper: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column"
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
    width: "100%",
    textAlign: "center",
    color: grey[600],
    "@media (max-width: 600px)": {
      textAlign: "left",
      flexGrow: 1
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
    width: "25%",
    padding: 24,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: grey[100],
    "@media (max-width: 600px)": {
      width: "100%",
      padding: "8px 0",
      flexDirection: "row",
      justifyContent: "flex-start",
      backgroundColor: "white"
    }
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
  win: {
    backgroundColor: green[500],
    color: grey[50],
    fontSize: 14,
    padding: "8px 0",
    textAlign: "center",
    "@media (max-width: 600px)": {
      width: "100%"
    }
  },
  wrapper: {
    margin: "16px 0"
  }
});

class Rugby extends Component {
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

  toggleAdditionalStats(opponentID) {
    const { opponents } = this.state;

    this.setState({
      opponents: {
        ...opponents,
        [opponentID]: {
          ...opponents[opponentID],
          trackOptionalStats: !opponents[opponentID].trackOptionalStats
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
    const {
      startLogging,
      finaliseResults,
      editResult,
      toggleOptionalStats
    } = this.props.actions;
    const { opponents, errors } = this.state;

    return (
      <div key={`result-${teamID}`} className={classes.wrapper}>
        <Typography
          type="title"
          component="p"
          className={classes.teamNameHeader}
        >
          {name}
        </Typography>
        {_.toPairs(opponents).map(([opponentID, opponentInfo]) => {
          const { ourScore, theirScore, trackOptionalStats } = opponentInfo;

          let statusStyle = "";
          let resultText = "";
          if (resultsStatus === "FINALISED") {
            if (ourScore.finalScore > theirScore.finalScore) {
              statusStyle = classes.win;
              resultText = "WIN";
            } else if (ourScore.finalScore < theirScore.finalScore) {
              statusStyle = classes.loss;
              resultText = "LOSS";
            } else {
              statusStyle = classes.draw;
              resultText = "DRAW";
            }
          }

          const commentary = opponentInfo.commentary
            ? opponentInfo.commentary
            : "";

          return (
            <div
              key={`result-${teamID}${opponentID}`}
              className={classes.teamsWrapper}
            >
              <div className={statusStyle}>{resultText}</div>
              <div className={classes.pointsWrapper}>
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
                        {isNaN(ourScore.finalScore) ? "?" : ourScore.finalScore}
                      </Typography>
                    </div>
                  )}
                </div>
                <div className={classes.teamNameWrapper}>
                  <Avatar src={defaultEmblemURL} className={classes.emblems} />
                  <Typography
                    type="subheading"
                    component="p"
                    className={classes.teamName}
                  >
                    {opponentInfo.name === "" ? "Unknown" : opponentInfo.name}
                  </Typography>
                  {resultsStatus !== "AWAITING_START" && (
                    <div className={classes.goalsWrapper}>
                      <Typography type="title" component="p">
                        {isNaN(theirScore.finalScore)
                          ? "?"
                          : theirScore.finalScore}
                      </Typography>
                    </div>
                  )}
                </div>
              </div>
              {resultsStatus === "AWAITING_FINALISE" && (
                <div className={classes.subPointWrapper}>
                  <div className={classes.subPointColumn}>
                    <TextField
                      type="number"
                      value={ourScore.requiredStats.tries}
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

                        this.updateResult(opponentID, {
                          commentary,
                          ourScore: {
                            finalScore:
                              newValue * 5 +
                              ourScore.requiredStats.conversions * 2 +
                              ourScore.requiredStats.penaltyKicks * 3 +
                              ourScore.requiredStats.dropGoals * 3,
                            requiredStats: {
                              ...ourScore.requiredStats,
                              tries: newValue
                            },
                            optionalStats: ourScore.optionalStats
                          },
                          theirScore,
                          trackOptionalStats,
                          name: opponentInfo.name,
                          isSignedUp: opponentInfo.isSignedUp
                        });
                      }}
                      onBlur={() => {
                        if (!errors.ourScore.hasError) {
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
                  <div className={classes.pointNameColumn}>
                    <Typography type="subheading" component="p">
                      Tries
                    </Typography>
                  </div>
                  <div className={classes.subPointColumn}>
                    <TextField
                      type="number"
                      value={theirScore.requiredStats.tries}
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
                            finalScore:
                              newValue * 5 +
                              theirScore.requiredStats.conversions * 2 +
                              theirScore.requiredStats.penaltyKicks * 3 +
                              theirScore.requiredStats.dropGoals * 3,
                            requiredStats: {
                              ...theirScore.requiredStats,
                              tries: newValue
                            },
                            optionalStats: theirScore.optionalStats
                          },
                          trackOptionalStats,
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
              )}
              {resultsStatus === "AWAITING_FINALISE" && (
                <div className={classes.subPointWrapper}>
                  <div className={classes.subPointColumn}>
                    <TextField
                      type="number"
                      value={ourScore.requiredStats.conversions}
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

                        this.updateResult(opponentID, {
                          commentary,
                          ourScore: {
                            finalScore:
                              ourScore.requiredStats.tries * 5 +
                              newValue * 2 +
                              ourScore.requiredStats.penaltyKicks * 3 +
                              ourScore.requiredStats.dropGoals * 3,
                            requiredStats: {
                              ...ourScore.requiredStats,
                              conversions: newValue
                            },
                            optionalStats: ourScore.optionalStats
                          },
                          theirScore,
                          trackOptionalStats,
                          name: opponentInfo.name,
                          isSignedUp: opponentInfo.isSignedUp
                        });
                      }}
                      onBlur={() => {
                        if (!errors.ourScore.hasError) {
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
                  <div className={classes.pointNameColumn}>
                    <Typography type="subheading" component="p">
                      Conversions
                    </Typography>
                  </div>
                  <div className={classes.subPointColumn}>
                    <TextField
                      type="number"
                      value={theirScore.requiredStats.conversions}
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
                            finalScore:
                              theirScore.requiredStats.tries * 5 +
                              newValue * 2 +
                              theirScore.requiredStats.penaltyKicks * 3 +
                              theirScore.requiredStats.dropGoals * 3,
                            requiredStats: {
                              ...theirScore.requiredStats,
                              conversions: newValue
                            },
                            optionalStats: theirScore.optionalStats
                          },
                          trackOptionalStats,
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
              )}
              {resultsStatus === "AWAITING_FINALISE" && (
                <div className={classes.subPointWrapper}>
                  <div className={classes.subPointColumn}>
                    <TextField
                      type="number"
                      value={ourScore.requiredStats.penaltyKicks}
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

                        this.updateResult(opponentID, {
                          commentary,
                          ourScore: {
                            finalScore:
                              ourScore.requiredStats.tries * 5 +
                              ourScore.requiredStats.conversions * 2 +
                              newValue * 3 +
                              ourScore.requiredStats.dropGoals * 3,
                            requiredStats: {
                              ...ourScore.requiredStats,
                              penaltyKicks: newValue
                            },
                            optionalStats: ourScore.optionalStats
                          },
                          theirScore,
                          trackOptionalStats,
                          name: opponentInfo.name,
                          isSignedUp: opponentInfo.isSignedUp
                        });
                      }}
                      onBlur={() => {
                        if (!errors.ourScore.hasError) {
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
                  <div className={classes.pointNameColumn}>
                    <Typography type="subheading" component="p">
                      Penalty kicks
                    </Typography>
                  </div>
                  <div className={classes.subPointColumn}>
                    <TextField
                      type="number"
                      value={theirScore.requiredStats.penaltyKicks}
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
                            finalScore:
                              theirScore.requiredStats.tries * 5 +
                              theirScore.requiredStats.conversions * 2 +
                              newValue * 3 +
                              theirScore.requiredStats.dropGoals * 3,
                            requiredStats: {
                              ...theirScore.requiredStats,
                              penaltyKicks: newValue
                            },
                            optionalStats: theirScore.optionalStats
                          },
                          trackOptionalStats,
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
              )}
              {resultsStatus === "AWAITING_FINALISE" && (
                <div className={classes.subPointWrapper}>
                  <div className={classes.subPointColumn}>
                    <TextField
                      type="number"
                      value={ourScore.requiredStats.dropGoals}
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

                        this.updateResult(opponentID, {
                          commentary,
                          ourScore: {
                            finalScore:
                              ourScore.requiredStats.tries * 5 +
                              ourScore.requiredStats.conversions * 2 +
                              ourScore.requiredStats.penaltyKicks * 3 +
                              newValue * 3,
                            requiredStats: {
                              ...ourScore.requiredStats,
                              dropGoals: newValue
                            },
                            optionalStats: ourScore.optionalStats
                          },
                          theirScore,
                          trackOptionalStats,
                          name: opponentInfo.name,
                          isSignedUp: opponentInfo.isSignedUp
                        });
                      }}
                      onBlur={() => {
                        if (!errors.ourScore.hasError) {
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
                  <div className={classes.pointNameColumn}>
                    <Typography type="subheading" component="p">
                      Drop goals
                    </Typography>
                  </div>
                  <div className={classes.subPointColumn}>
                    <TextField
                      type="number"
                      value={theirScore.requiredStats.dropGoals}
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
                            finalScore:
                              theirScore.requiredStats.tries * 5 +
                              theirScore.requiredStats.conversions * 2 +
                              theirScore.requiredStats.penaltyKicks * 3 +
                              newValue * 3,
                            requiredStats: {
                              ...theirScore.requiredStats,
                              dropGoals: newValue
                            },
                            optionalStats: theirScore.optionalStats
                          },
                          trackOptionalStats,
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
              )}
              {resultsStatus === "AWAITING_FINALISE" && (
                <div className={classes.additionalStatsToggle}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={trackOptionalStats}
                        onChange={e => {
                          toggleOptionalStats(
                            eventID,
                            teamID,
                            opponentID,
                            !trackOptionalStats
                          );
                          this.toggleAdditionalStats(opponentID);
                        }}
                        value="checkedOptionalStats"
                      />
                    }
                    label="Track optional stats"
                  />
                </div>
              )}
              {resultsStatus === "AWAITING_FINALISE" &&
                trackOptionalStats && (
                  <Typography
                    type="title"
                    component="h3"
                    className={classes.additionalStatsHeading}
                  >
                    Optional Stats
                  </Typography>
                )}
              {resultsStatus === "AWAITING_FINALISE" &&
                trackOptionalStats && (
                  <div className={classes.subPointWrapper}>
                    <div className={classes.subPointColumn}>
                      <TextField
                        type="number"
                        value={ourScore.optionalStats.yellowCards}
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

                          this.updateResult(opponentID, {
                            commentary,
                            ourScore: {
                              ...ourScore,
                              optionalStats: {
                                ...ourScore.optionalStats,
                                yellowCards: newValue
                              }
                            },
                            theirScore,
                            trackOptionalStats,
                            name: opponentInfo.name,
                            isSignedUp: opponentInfo.isSignedUp
                          });
                        }}
                        onBlur={() => {
                          if (!errors.ourScore.hasError) {
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
                    <div className={classes.pointNameColumn}>
                      <Typography type="subheading" component="p">
                        Yellow cards
                      </Typography>
                    </div>
                    <div className={classes.subPointColumn}>
                      <TextField
                        type="number"
                        value={theirScore.optionalStats.yellowCards}
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
                              ...theirScore,
                              optionalStats: {
                                ...theirScore.optionalStats,
                                yellowCards: newValue
                              }
                            },
                            trackOptionalStats,
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
                )}
              {resultsStatus === "AWAITING_FINALISE" &&
                trackOptionalStats && (
                  <div className={classes.subPointWrapper}>
                    <div className={classes.subPointColumn}>
                      <TextField
                        type="number"
                        value={ourScore.optionalStats.redCards}
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

                          this.updateResult(opponentID, {
                            commentary,
                            ourScore: {
                              ...ourScore,
                              optionalStats: {
                                ...ourScore.optionalStats,
                                redCards: newValue
                              }
                            },
                            theirScore,
                            trackOptionalStats,
                            name: opponentInfo.name,
                            isSignedUp: opponentInfo.isSignedUp
                          });
                        }}
                        onBlur={() => {
                          if (!errors.ourScore.hasError) {
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
                    <div className={classes.pointNameColumn}>
                      <Typography type="subheading" component="p">
                        Red cards
                      </Typography>
                    </div>
                    <div className={classes.subPointColumn}>
                      <TextField
                        type="number"
                        value={theirScore.optionalStats.redCards}
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
                              ...theirScore,
                              optionalStats: {
                                ...theirScore.optionalStats,
                                redCards: newValue
                              }
                            },
                            trackOptionalStats,
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
                )}
              {resultsStatus === "AWAITING_FINALISE" &&
                trackOptionalStats && (
                  <div className={classes.subPointWrapper}>
                    <div className={classes.subPointColumn}>
                      <TextField
                        type="number"
                        value={ourScore.optionalStats.throwIns}
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

                          this.updateResult(opponentID, {
                            commentary,
                            ourScore: {
                              ...ourScore,
                              optionalStats: {
                                ...ourScore.optionalStats,
                                throwIns: newValue
                              }
                            },
                            theirScore,
                            trackOptionalStats,
                            name: opponentInfo.name,
                            isSignedUp: opponentInfo.isSignedUp
                          });
                        }}
                        onBlur={() => {
                          if (!errors.ourScore.hasError) {
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
                    <div className={classes.pointNameColumn}>
                      <Typography type="subheading" component="p">
                        Throw-ins
                      </Typography>
                    </div>
                    <div className={classes.subPointColumn}>
                      <TextField
                        type="number"
                        value={theirScore.optionalStats.throwIns}
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
                              ...theirScore,
                              optionalStats: {
                                ...theirScore.optionalStats,
                                throwIns: newValue
                              }
                            },
                            trackOptionalStats,
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
                )}
              {resultsStatus === "AWAITING_FINALISE" &&
                trackOptionalStats && (
                  <div className={classes.subPointWrapper}>
                    <div className={classes.subPointColumn}>
                      <TextField
                        type="number"
                        value={ourScore.optionalStats.scrums}
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

                          this.updateResult(opponentID, {
                            commentary,
                            ourScore: {
                              ...ourScore,
                              optionalStats: {
                                ...ourScore.optionalStats,
                                scrums: newValue
                              }
                            },
                            theirScore,
                            trackOptionalStats,
                            name: opponentInfo.name,
                            isSignedUp: opponentInfo.isSignedUp
                          });
                        }}
                        onBlur={() => {
                          if (!errors.ourScore.hasError) {
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
                    <div className={classes.pointNameColumn}>
                      <Typography type="subheading" component="p">
                        Scrums
                      </Typography>
                    </div>
                    <div className={classes.subPointColumn}>
                      <TextField
                        type="number"
                        value={theirScore.optionalStats.scrums}
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
                              ...theirScore,
                              optionalStats: {
                                ...theirScore.optionalStats,
                                scrums: newValue
                              }
                            },
                            trackOptionalStats,
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
                )}
              {resultsStatus === "AWAITING_FINALISE" && (
                <div className={classes.commentaryWrapper}>
                  <div className={classes.commentaryInnerWrapper}>
                    <TextField
                      className={classes.commentaryTextField}
                      disabled={!canEdit}
                      onChange={e =>
                        this.updateResult(opponentID, {
                          commentary: e.target.value,
                          ourScore,
                          theirScore,
                          trackOptionalStats,
                          name: opponentInfo.name,
                          isSignedUp: opponentInfo.isSignedUp
                        })}
                      onBlur={() => {
                        if (
                          !errors.ourScore.hasError &&
                          !errors.theirScore.hasError
                        ) {
                          editResult(eventID, teamID, opponentID, {
                            commentary,
                            ourScore,
                            theirScore
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
          );
        })}
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
                  finalScore: 0,
                  requiredStats: {
                    tries: 0,
                    conversions: 0,
                    penaltyKicks: 0,
                    dropGoals: 0
                  },
                  optionalStats: {
                    redCards: 0,
                    yellowCards: 0,
                    throwIns: 0,
                    scrums: 0
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
    const {
      startLogging,
      finaliseResults,
      editResult,
      toggleOptionalStats
    } = this.props.actions;
    const { opponents, errors } = this.state;

    return (
      <div key={`result-${teamID}`} className={classes.wrapper}>
        <Typography
          type="title"
          component="p"
          className={classes.teamNameHeader}
        >
          {name}
        </Typography>
        {_.toPairs(opponents).map(([opponentID, opponentInfo]) => {
          const { ourScore, theirScore, trackOptionalStats } = opponentInfo;

          let statusStyle = "";
          let resultText = "";
          if (resultsStatus === "FINALISED") {
            if (ourScore.finalScore > theirScore.finalScore) {
              statusStyle = classes.win;
              resultText = "WIN";
            } else if (ourScore.finalScore < theirScore.finalScore) {
              statusStyle = classes.loss;
              resultText = "LOSS";
            } else {
              statusStyle = classes.draw;
              resultText = "DRAW";
            }
          }

          const commentary = opponentInfo.commentary
            ? opponentInfo.commentary
            : "";

          return (
            <div
              key={`result-${teamID}${opponentID}`}
              className={classes.teamsWrapper}
            >
              <div className={classes.pointsWrapper}>
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
                </div>
                <div className={classes.resultWrapper}>
                  <div className={statusStyle}>{resultText}</div>
                  <div className={classes.innerResultWrapper}>
                    {resultsStatus !== "AWAITING_START" && (
                      <div className={classes.goalsWrapper}>
                        <Typography type="display2" component="p">
                          {isNaN(ourScore.finalScore)
                            ? "?"
                            : ourScore.finalScore}
                        </Typography>
                      </div>
                    )}
                    <div className={classes.centerSpace}>
                      <Typography
                        type="display1"
                        component="p"
                        className={classes.teamName}
                      >
                        {resultsStatus === "AWAITING_START" ? "vs" : "-"}
                      </Typography>
                    </div>
                    {resultsStatus !== "AWAITING_START" && (
                      <div className={classes.goalsWrapper}>
                        <Typography type="display2" component="p">
                          {isNaN(theirScore.finalScore)
                            ? "?"
                            : theirScore.finalScore}
                        </Typography>
                      </div>
                    )}
                  </div>
                </div>
                <div className={classes.teamNameWrapper}>
                  <Avatar src={defaultEmblemURL} className={classes.emblems} />
                  <Typography
                    type="subheading"
                    component="p"
                    className={classes.teamName}
                  >
                    {opponentInfo.name === "" ? "Unknown" : opponentInfo.name}
                  </Typography>
                </div>
              </div>
              {resultsStatus === "AWAITING_FINALISE" && (
                <div className={classes.subPointWrapper}>
                  <div className={classes.subPointColumn}>
                    <TextField
                      type="number"
                      value={ourScore.requiredStats.tries}
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

                        this.updateResult(opponentID, {
                          commentary,
                          ourScore: {
                            finalScore:
                              newValue * 5 +
                              ourScore.requiredStats.conversions * 2 +
                              ourScore.requiredStats.penaltyKicks * 3 +
                              ourScore.requiredStats.dropGoals * 3,
                            requiredStats: {
                              ...ourScore.requiredStats,
                              tries: newValue
                            },
                            optionalStats: ourScore.optionalStats
                          },
                          theirScore,
                          trackOptionalStats,
                          name: opponentInfo.name,
                          isSignedUp: opponentInfo.isSignedUp
                        });
                      }}
                      onBlur={() => {
                        if (!errors.ourScore.hasError) {
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
                  <div className={classes.pointNameColumn}>
                    <Typography type="subheading" component="p">
                      Tries
                    </Typography>
                  </div>
                  <div className={classes.subPointColumn}>
                    <TextField
                      type="number"
                      value={theirScore.requiredStats.tries}
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
                            finalScore:
                              newValue * 5 +
                              theirScore.requiredStats.conversions * 2 +
                              theirScore.requiredStats.penaltyKicks * 3 +
                              theirScore.requiredStats.dropGoals * 3,
                            requiredStats: {
                              ...theirScore.requiredStats,
                              tries: newValue
                            },
                            optionalStats: theirScore.optionalStats
                          },
                          trackOptionalStats,
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
              )}
              {resultsStatus === "AWAITING_FINALISE" && (
                <div className={classes.subPointWrapper}>
                  <div className={classes.subPointColumn}>
                    <TextField
                      type="number"
                      value={ourScore.requiredStats.conversions}
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

                        this.updateResult(opponentID, {
                          commentary,
                          ourScore: {
                            finalScore:
                              ourScore.requiredStats.tries * 5 +
                              newValue * 2 +
                              ourScore.requiredStats.penaltyKicks * 3 +
                              ourScore.requiredStats.dropGoals * 3,
                            requiredStats: {
                              ...ourScore.requiredStats,
                              conversions: newValue
                            },
                            optionalStats: ourScore.optionalStats
                          },
                          theirScore,
                          trackOptionalStats,
                          name: opponentInfo.name,
                          isSignedUp: opponentInfo.isSignedUp
                        });
                      }}
                      onBlur={() => {
                        if (!errors.ourScore.hasError) {
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
                  <div className={classes.pointNameColumn}>
                    <Typography type="subheading" component="p">
                      Conversions
                    </Typography>
                  </div>
                  <div className={classes.subPointColumn}>
                    <TextField
                      type="number"
                      value={theirScore.requiredStats.conversions}
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
                            finalScore:
                              theirScore.requiredStats.tries * 5 +
                              newValue * 2 +
                              theirScore.requiredStats.penaltyKicks * 3 +
                              theirScore.requiredStats.dropGoals * 3,
                            requiredStats: {
                              ...theirScore.requiredStats,
                              conversions: newValue
                            },
                            optionalStats: theirScore.optionalStats
                          },
                          trackOptionalStats,
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
              )}
              {resultsStatus === "AWAITING_FINALISE" && (
                <div className={classes.subPointWrapper}>
                  <div className={classes.subPointColumn}>
                    <TextField
                      type="number"
                      value={ourScore.requiredStats.penaltyKicks}
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

                        this.updateResult(opponentID, {
                          commentary,
                          ourScore: {
                            finalScore:
                              ourScore.requiredStats.tries * 5 +
                              ourScore.requiredStats.conversions * 2 +
                              newValue * 3 +
                              ourScore.requiredStats.dropGoals * 3,
                            requiredStats: {
                              ...ourScore.requiredStats,
                              penaltyKicks: newValue
                            },
                            optionalStats: ourScore.optionalStats
                          },
                          theirScore,
                          trackOptionalStats,
                          name: opponentInfo.name,
                          isSignedUp: opponentInfo.isSignedUp
                        });
                      }}
                      onBlur={() => {
                        if (!errors.ourScore.hasError) {
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
                  <div className={classes.pointNameColumn}>
                    <Typography type="subheading" component="p">
                      Penalty kicks
                    </Typography>
                  </div>
                  <div className={classes.subPointColumn}>
                    <TextField
                      type="number"
                      value={theirScore.requiredStats.penaltyKicks}
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
                            finalScore:
                              theirScore.requiredStats.tries * 5 +
                              theirScore.requiredStats.conversions * 2 +
                              newValue * 3 +
                              theirScore.requiredStats.dropGoals * 3,
                            requiredStats: {
                              ...theirScore.requiredStats,
                              penaltyKicks: newValue
                            },
                            optionalStats: theirScore.optionalStats
                          },
                          trackOptionalStats,
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
              )}
              {resultsStatus === "AWAITING_FINALISE" && (
                <div className={classes.subPointWrapper}>
                  <div className={classes.subPointColumn}>
                    <TextField
                      type="number"
                      value={ourScore.requiredStats.dropGoals}
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

                        this.updateResult(opponentID, {
                          commentary,
                          ourScore: {
                            finalScore:
                              ourScore.requiredStats.tries * 5 +
                              ourScore.requiredStats.conversions * 2 +
                              ourScore.requiredStats.penaltyKicks * 3 +
                              newValue * 3,
                            requiredStats: {
                              ...ourScore.requiredStats,
                              dropGoals: newValue
                            },
                            optionalStats: ourScore.optionalStats
                          },
                          theirScore,
                          trackOptionalStats,
                          name: opponentInfo.name,
                          isSignedUp: opponentInfo.isSignedUp
                        });
                      }}
                      onBlur={() => {
                        if (!errors.ourScore.hasError) {
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
                  <div className={classes.pointNameColumn}>
                    <Typography type="subheading" component="p">
                      Drop goals
                    </Typography>
                  </div>
                  <div className={classes.subPointColumn}>
                    <TextField
                      type="number"
                      value={theirScore.requiredStats.dropGoals}
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
                            finalScore:
                              theirScore.requiredStats.tries * 5 +
                              theirScore.requiredStats.conversions * 2 +
                              theirScore.requiredStats.penaltyKicks * 3 +
                              newValue * 3,
                            requiredStats: {
                              ...theirScore.requiredStats,
                              dropGoals: newValue
                            },
                            optionalStats: theirScore.optionalStats
                          },
                          trackOptionalStats,
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
              )}
              {resultsStatus === "AWAITING_FINALISE" && (
                <div className={classes.additionalStatsToggle}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={trackOptionalStats}
                        onChange={e => {
                          toggleOptionalStats(
                            eventID,
                            teamID,
                            opponentID,
                            !trackOptionalStats
                          );
                          this.toggleAdditionalStats(opponentID);
                        }}
                        value="checkedOptionalStats"
                      />
                    }
                    label="Track optional stats"
                  />
                </div>
              )}
              {resultsStatus === "AWAITING_FINALISE" &&
                trackOptionalStats && (
                  <Typography
                    type="title"
                    component="h3"
                    className={classes.additionalStatsHeading}
                  >
                    Optional Stats
                  </Typography>
                )}
              {resultsStatus === "AWAITING_FINALISE" &&
                trackOptionalStats && (
                  <div className={classes.subPointWrapper}>
                    <div className={classes.subPointColumn}>
                      <TextField
                        disabled={!canEdit}
                        type="number"
                        value={ourScore.optionalStats.yellowCards}
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

                          this.updateResult(opponentID, {
                            commentary,
                            ourScore: {
                              ...ourScore,
                              optionalStats: {
                                ...ourScore.optionalStats,
                                yellowCards: newValue
                              }
                            },
                            theirScore,
                            trackOptionalStats,
                            name: opponentInfo.name,
                            isSignedUp: opponentInfo.isSignedUp
                          });
                        }}
                        onBlur={() => {
                          if (!errors.ourScore.hasError) {
                            editResult(eventID, teamID, opponentID, {
                              commentary,
                              ourScore,
                              theirScore
                            });
                          }
                        }}
                      />
                    </div>
                    <div className={classes.pointNameColumn}>
                      <Typography type="subheading" component="p">
                        Yellow cards
                      </Typography>
                    </div>
                    <div className={classes.subPointColumn}>
                      <TextField
                        disabled={!canEdit}
                        type="number"
                        value={theirScore.optionalStats.yellowCards}
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
                              ...theirScore,
                              optionalStats: {
                                ...theirScore.optionalStats,
                                yellowCards: newValue
                              }
                            },
                            trackOptionalStats,
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
                      />
                    </div>
                  </div>
                )}
              {resultsStatus === "AWAITING_FINALISE" &&
                trackOptionalStats && (
                  <div className={classes.subPointWrapper}>
                    <div className={classes.subPointColumn}>
                      <TextField
                        disabled={!canEdit}
                        type="number"
                        value={ourScore.optionalStats.redCards}
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

                          this.updateResult(opponentID, {
                            commentary,
                            ourScore: {
                              ...ourScore,
                              optionalStats: {
                                ...ourScore.optionalStats,
                                redCards: newValue
                              }
                            },
                            theirScore,
                            trackOptionalStats,
                            name: opponentInfo.name,
                            isSignedUp: opponentInfo.isSignedUp
                          });
                        }}
                        onBlur={() => {
                          if (!errors.ourScore.hasError) {
                            editResult(eventID, teamID, opponentID, {
                              commentary,
                              ourScore,
                              theirScore
                            });
                          }
                        }}
                      />
                    </div>
                    <div className={classes.pointNameColumn}>
                      <Typography type="subheading" component="p">
                        Red cards
                      </Typography>
                    </div>
                    <div className={classes.subPointColumn}>
                      <TextField
                        disabled={!canEdit}
                        type="number"
                        value={theirScore.optionalStats.redCards}
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
                              ...theirScore,
                              optionalStats: {
                                ...theirScore.optionalStats,
                                redCards: newValue
                              }
                            },
                            trackOptionalStats,
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
                      />
                    </div>
                  </div>
                )}
              {resultsStatus === "AWAITING_FINALISE" &&
                trackOptionalStats && (
                  <div className={classes.subPointWrapper}>
                    <div className={classes.subPointColumn}>
                      <TextField
                        disabled={!canEdit}
                        type="number"
                        value={ourScore.optionalStats.throwIns}
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

                          this.updateResult(opponentID, {
                            commentary,
                            ourScore: {
                              ...ourScore,
                              optionalStats: {
                                ...ourScore.optionalStats,
                                throwIns: newValue
                              }
                            },
                            theirScore,
                            trackOptionalStats,
                            name: opponentInfo.name,
                            isSignedUp: opponentInfo.isSignedUp
                          });
                        }}
                        onBlur={() => {
                          if (!errors.ourScore.hasError) {
                            editResult(eventID, teamID, opponentID, {
                              commentary,
                              ourScore,
                              theirScore
                            });
                          }
                        }}
                      />
                    </div>
                    <div className={classes.pointNameColumn}>
                      <Typography type="subheading" component="p">
                        Throw-ins
                      </Typography>
                    </div>
                    <div className={classes.subPointColumn}>
                      <TextField
                        disabled={!canEdit}
                        type="number"
                        value={theirScore.optionalStats.throwIns}
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
                              ...theirScore,
                              optionalStats: {
                                ...theirScore.optionalStats,
                                throwIns: newValue
                              }
                            },
                            trackOptionalStats,
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
                      />
                    </div>
                  </div>
                )}
              {resultsStatus === "AWAITING_FINALISE" &&
                trackOptionalStats && (
                  <div className={classes.subPointWrapper}>
                    <div className={classes.subPointColumn}>
                      <TextField
                        disabled={!canEdit}
                        type="number"
                        value={ourScore.optionalStats.scrums}
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

                          this.updateResult(opponentID, {
                            commentary,
                            ourScore: {
                              ...ourScore,
                              optionalStats: {
                                ...ourScore.optionalStats,
                                scrums: newValue
                              }
                            },
                            theirScore,
                            trackOptionalStats,
                            name: opponentInfo.name,
                            isSignedUp: opponentInfo.isSignedUp
                          });
                        }}
                        onBlur={() => {
                          if (!errors.ourScore.hasError) {
                            editResult(eventID, teamID, opponentID, {
                              commentary,
                              ourScore,
                              theirScore
                            });
                          }
                        }}
                      />
                    </div>
                    <div className={classes.pointNameColumn}>
                      <Typography type="subheading" component="p">
                        Scrums
                      </Typography>
                    </div>
                    <div className={classes.subPointColumn}>
                      <TextField
                        disabled={!canEdit}
                        type="number"
                        value={theirScore.optionalStats.scrums}
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
                              ...theirScore,
                              optionalStats: {
                                ...theirScore.optionalStats,
                                scrums: newValue
                              }
                            },
                            trackOptionalStats,
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
                      />
                    </div>
                  </div>
                )}
              {resultsStatus === "AWAITING_FINALISE" && (
                <div className={classes.commentaryWrapper}>
                  <div className={classes.commentaryInnerWrapper}>
                    <TextField
                      disabled={!canEdit}
                      className={classes.commentaryTextField}
                      onChange={e =>
                        this.updateResult(opponentID, {
                          commentary: e.target.value,
                          ourScore,
                          theirScore,
                          trackOptionalStats,
                          name: opponentInfo.name,
                          isSignedUp: opponentInfo.isSignedUp
                        })}
                      onBlur={() => {
                        if (
                          !errors.ourScore.hasError &&
                          !errors.theirScore.hasError
                        ) {
                          editResult(eventID, teamID, opponentID, {
                            commentary,
                            ourScore,
                            theirScore
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
          );
        })}
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
                  finalScore: 0,
                  requiredStats: {
                    tries: 0,
                    conversions: 0,
                    penaltyKicks: 0,
                    dropGoals: 0
                  },
                  optionalStats: {
                    redCards: 0,
                    yellowCards: 0,
                    throwIns: 0,
                    scrums: 0
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

export default withStyles(styles)(Rugby);
