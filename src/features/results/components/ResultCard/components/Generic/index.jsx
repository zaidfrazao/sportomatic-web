import React, { Component } from "react";
import _ from "lodash";
import Avatar from "material-ui/Avatar";
import Button from "material-ui/Button";
import { grey, green, lightBlue, red } from "material-ui/colors";
import { Route } from "react-router";
import TextField from "material-ui/TextField";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import defaultEmblemURL from "../../../../images/default-emblem-url.png";

const styles = theme => ({
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
    backgroundColor: grey[100]
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

class Generic extends Component {
  state = {
    opponents: {}
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

  renderMobile() {
    const { classes, teamID, eventID, resultsStatus } = this.props;
    const { name, emblemURL } = this.props.ourTeam;
    const { startLogging, finaliseResults, editResult } = this.props.actions;
    const { opponents } = this.state;

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
          const { ourScore, theirScore } = opponentInfo;

          let statusStyle = "";
          let resultText = "";
          if (resultsStatus === "FINALISED") {
            if (ourScore.totalPoints > theirScore.totalPoints) {
              statusStyle = classes.win;
              resultText = "WIN";
            } else if (ourScore.totalPoints < theirScore.totalPoints) {
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
                        {ourScore.totalPoints}
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
                        {theirScore.totalPoints}
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
                      value={ourScore.requiredPoints.points}
                      inputProps={{
                        min: 0
                      }}
                      onChange={e => {
                        const newValue =
                          e.target.value === ""
                            ? 0
                            : parseInt(e.target.value, 10);
                        this.updateResult(opponentID, {
                          commentary,
                          ourScore: {
                            totalPoints: newValue,
                            requiredPoints: {
                              points: newValue
                            }
                          },
                          theirScore,
                          name: opponentInfo.name,
                          isSignedUp: opponentInfo.isSignedUp
                        });
                      }}
                      onBlur={() =>
                        editResult(eventID, teamID, opponentID, {
                          commentary,
                          ourScore,
                          theirScore
                        })}
                    />
                  </div>
                  <div className={classes.pointNameColumn}>
                    <Typography type="subheading" component="p">
                      Score
                    </Typography>
                  </div>
                  <div className={classes.subPointColumn}>
                    <TextField
                      type="number"
                      value={theirScore.requiredPoints.points}
                      inputProps={{
                        min: 0
                      }}
                      onChange={e => {
                        const newValue =
                          e.target.value === ""
                            ? 0
                            : parseInt(e.target.value, 10);
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
                      onBlur={() =>
                        editResult(eventID, teamID, opponentID, {
                          commentary,
                          ourScore,
                          theirScore
                        })}
                    />
                  </div>
                </div>
              )}
              {resultsStatus === "AWAITING_FINALISE" && (
                <div className={classes.commentaryWrapper}>
                  <div className={classes.commentaryInnerWrapper}>
                    <TextField
                      className={classes.commentaryTextField}
                      onChange={e =>
                        this.updateResult(opponentID, {
                          commentary: e.target.value,
                          ourScore,
                          theirScore,
                          name: opponentInfo.name,
                          isSignedUp: opponentInfo.isSignedUp
                        })}
                      onBlur={() =>
                        editResult(eventID, teamID, opponentID, {
                          commentary,
                          ourScore,
                          theirScore
                        })}
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
            Log results
          </Button>
        )}
        {resultsStatus === "AWAITING_FINALISE" && (
          <Button
            raised
            className={classes.finaliseButton}
            onClick={() => finaliseResults(eventID, teamID)}
          >
            Finalise results
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
                  history.push(`/admin/results/${teamID}/${eventID}`)}
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
    const { classes, teamID, eventID, resultsStatus } = this.props;
    const { name, emblemURL } = this.props.ourTeam;
    const { startLogging, finaliseResults, editResult } = this.props.actions;
    const { opponents } = this.state;

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
          const { ourScore, theirScore } = opponentInfo;

          let statusStyle = "";
          let resultText = "";
          if (resultsStatus === "FINALISED") {
            if (ourScore.totalPoints > theirScore.totalPoints) {
              statusStyle = classes.win;
              resultText = "WIN";
            } else if (ourScore.totalPoints < theirScore.totalPoints) {
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
                          {ourScore.totalPoints}
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
                          {theirScore.totalPoints}
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
                      value={ourScore.requiredPoints.points}
                      inputProps={{
                        min: 0
                      }}
                      onChange={e => {
                        const newValue =
                          e.target.value === ""
                            ? 0
                            : parseInt(e.target.value, 10);
                        this.updateResult(opponentID, {
                          commentary,
                          ourScore: {
                            totalPoints: newValue,
                            requiredPoints: {
                              points: newValue
                            }
                          },
                          theirScore,
                          name: opponentInfo.name,
                          isSignedUp: opponentInfo.isSignedUp
                        });
                      }}
                      onBlur={() =>
                        editResult(eventID, teamID, opponentID, {
                          commentary,
                          ourScore,
                          theirScore
                        })}
                    />
                  </div>
                  <div className={classes.pointNameColumn}>
                    <Typography type="subheading" component="p">
                      Score
                    </Typography>
                  </div>
                  <div className={classes.subPointColumn}>
                    <TextField
                      type="number"
                      value={theirScore.requiredPoints.points}
                      inputProps={{
                        min: 0
                      }}
                      onChange={e => {
                        const newValue =
                          e.target.value === ""
                            ? 0
                            : parseInt(e.target.value, 10);
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
                      onBlur={() =>
                        editResult(eventID, teamID, opponentID, {
                          commentary,
                          ourScore,
                          theirScore
                        })}
                    />
                  </div>
                </div>
              )}
              {resultsStatus === "AWAITING_FINALISE" && (
                <div className={classes.commentaryWrapper}>
                  <div className={classes.commentaryInnerWrapper}>
                    <TextField
                      className={classes.commentaryTextField}
                      onChange={e =>
                        this.updateResult(opponentID, {
                          commentary: e.target.value,
                          ourScore,
                          theirScore,
                          name: opponentInfo.name,
                          isSignedUp: opponentInfo.isSignedUp
                        })}
                      onBlur={() =>
                        editResult(eventID, teamID, opponentID, {
                          commentary,
                          ourScore,
                          theirScore
                        })}
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
            Log results
          </Button>
        )}
        {resultsStatus === "AWAITING_FINALISE" && (
          <Button
            raised
            className={classes.finaliseButton}
            onClick={() => finaliseResults(eventID, teamID)}
          >
            Finalise results
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
                  history.push(`/admin/results/${teamID}/${eventID}`)}
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

export default withStyles(styles)(Generic);
