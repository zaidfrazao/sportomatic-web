import React, { Component } from "react";
import injectStyles from "react-jss";
import {
  common,
  green,
  grey,
  lightBlue,
  orange,
  red
} from "../../../../../../../../utils/colours";
import Custom from "./components/Custom";
import defaultEmblem from "./images/default-emblem.jpg";
import Hockey from "./components/Hockey";
import Netball from "./components/Netball";
import Rugby from "./components/Rugby";
import TextArea from "../../../../../../../../components/TextArea";

const styles = {
  awaitingButton: {
    padding: 24,
    color: grey[400],
    backgroundColor: grey[300],
    cursor: "not-allowed",
    textAlign: "center",
    fontWeight: "bold",
    borderRadius: 16
  },
  buttonsWrapper: {
    flexGrow: 1,
    padding: 24,
    display: "flex",
    flexDirection: "column"
  },
  commentaryConfirmed: {
    backgroundColor: common["white"],
    borderRadius: 16,
    border: `1px solid ${grey[300]}`,
    padding: 24,
    height: 120,
    overflow: "auto"
  },
  commentaryIcon: {
    marginRight: 12
  },
  commentaryHeading: {
    color: grey[800],
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 12
  },
  commentaryWrapper: {
    margin: 24
  },
  confirmButton: {
    transition: "0.25s",
    padding: 24,
    color: common["white"],
    backgroundColor: orange["A400"],
    cursor: "pointer",
    textAlign: "center",
    fontWeight: "bold",
    borderRadius: 16,
    "&:hover": {
      backgroundColor: orange["A200"]
    }
  },
  emblem: {
    borderRadius: "50%",
    backgroundColor: grey[300],
    width: 80,
    height: 80
  },
  homeAwayIndicator: {
    fontWeight: "bold",
    fontSize: 20,
    marginRight: 4
  },
  pointsColumn: {
    width: "40%",
    padding: 24,
    textAlign: "center"
  },
  pointsLabelColumn: {
    width: "20%",
    padding: "48px 24px",
    height: "100%",
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: grey[50],
    color: grey[800],
    borderLeft: `1px solid ${grey[300]}`,
    borderRight: `1px solid ${grey[300]}`
  },
  resultDraw: {
    borderRadius: 8,
    color: common["white"],
    backgroundColor: lightBlue[500],
    padding: "8px 12px"
  },
  resultLoss: {
    borderRadius: 8,
    color: common["white"],
    backgroundColor: red[500],
    padding: "8px 12px"
  },
  resultWin: {
    borderRadius: 8,
    color: common["white"],
    backgroundColor: green[500],
    padding: "8px 12px"
  },
  score: {
    fontSize: 32,
    fontWeight: "bold"
  },
  scoreMidSection: {
    padding: 24,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "20%"
  },
  scoreMidSubSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  scoreWrapper: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "center",
    margin: "24px 0"
  },
  statsRow: {
    display: "flex",
    alignItems: "center"
  },
  statsOptionalWrapper: {
    margin: 24,
    border: `1px solid ${grey[300]}`,
    backgroundColor: grey[100],
    borderRadius: 8
  },
  statsRequiredWrapper: {
    margin: "0 24px 24px 24px",
    border: `1px solid ${grey[300]}`,
    backgroundColor: grey[100],
    borderRadius: 8
  },
  switchWrapper: {
    margin: "0 24px",
    display: "flex",
    justifyContent: "center"
  },
  teamName: {
    fontSize: 18,
    marginTop: 12,
    textAlign: "center"
  },
  teamScoreInfo: {
    padding: 24,
    width: "40%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  vsText: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 24
  },
  wrapper: {}
};

class DesktopLogger extends Component {
  state = {
    homeAway: "home",
    commentary: ""
  };

  componentWillMount() {
    const { commentary } = this.props;

    this.setState({
      commentary
    });
  }

  componentWillReceiveProps(nextProps) {
    const { commentary } = nextProps;

    if (commentary !== this.props.commentary) {
      this.setState({
        commentary
      });
    }
  }

  updateCommentary(newValue) {
    this.setState({
      commentary: newValue
    });
  }

  updateCommentaryResult(newValue) {
    const { editResult, homeAway, homeTeam, awayTeam } = this.props;

    if (homeAway === "home") {
      editResult({
        commentary: newValue,
        ourScore: {
          requiredStats: homeTeam.requiredStats,
          optionalStats: homeTeam.optionalStats ? homeTeam.optionalStats : {}
        },
        theirScore: {
          requiredStats: awayTeam.requiredStats,
          optionalStats: awayTeam.optionalStats ? awayTeam.optionalStats : {}
        }
      });
    } else {
      editResult({
        commentary: newValue,
        ourScore: {
          requiredStats: awayTeam.requiredStats,
          optionalStats: awayTeam.optionalStats ? awayTeam.optionalStats : {}
        },
        theirScore: {
          requiredStats: homeTeam.requiredStats,
          optionalStats: homeTeam.optionalStats ? homeTeam.optionalStats : {}
        }
      });
    }
  }

  getResult() {
    const { classes, homeTeam } = this.props;

    const scores = this.getScores();

    let text = "Win";
    let style = classes.resultWin;

    if (homeTeam.isUsersTeam) {
      if (scores.homeTeam > scores.awayTeam) {
        text = "Win";
        style = classes.resultWin;
      } else if (scores.homeTeam < scores.awayTeam) {
        text = "Loss";
        style = classes.resultLoss;
      } else {
        text = "Draw";
        style = classes.resultDraw;
      }
    } else {
      if (scores.awayTeam > scores.homeTeam) {
        text = "Win";
        style = classes.resultWin;
      } else if (scores.awayTeam < scores.homeTeam) {
        text = "Loss";
        style = classes.resultLoss;
      } else {
        text = "Draw";
        style = classes.resultDraw;
      }
    }

    return {
      text,
      style
    };
  }

  getLogger() {
    const {
      sport,
      homeTeam,
      awayTeam,
      trackOptional,
      status,
      toggleOptionalStats,
      editResult,
      commentary,
      playingAtHome
    } = this.props;
    const { homeAway } = this.state;

    switch (sport) {
      case "Hockey":
        return (
          <Hockey
            status={status}
            homeAway={homeAway}
            homeTeam={homeTeam}
            awayTeam={awayTeam}
            trackOptional={trackOptional}
            commentary={commentary}
            playingAtHome={playingAtHome}
            toggleHomeAway={newSelection => this.toggleHomeAway(newSelection)}
            toggleOptionalStats={newState => toggleOptionalStats(newState)}
            editResult={newResult => editResult(newResult)}
          />
        );
      case "Netball":
        return (
          <Netball
            status={status}
            homeAway={homeAway}
            homeTeam={homeTeam}
            awayTeam={awayTeam}
            trackOptional={trackOptional}
            commentary={commentary}
            playingAtHome={playingAtHome}
            toggleHomeAway={newSelection => this.toggleHomeAway(newSelection)}
            toggleOptionalStats={newState => toggleOptionalStats(newState)}
            editResult={newResult => editResult(newResult)}
          />
        );
      case "Rugby":
        return (
          <Rugby
            status={status}
            homeAway={homeAway}
            homeTeam={homeTeam}
            awayTeam={awayTeam}
            trackOptional={trackOptional}
            commentary={commentary}
            playingAtHome={playingAtHome}
            toggleHomeAway={newSelection => this.toggleHomeAway(newSelection)}
            toggleOptionalStats={newState => toggleOptionalStats(newState)}
            editResult={newResult => editResult(newResult)}
          />
        );
      default:
        return (
          <Custom
            status={status}
            homeAway={homeAway}
            homeTeam={homeTeam}
            awayTeam={awayTeam}
            commentary={commentary}
            playingAtHome={playingAtHome}
            toggleHomeAway={newSelection => this.toggleHomeAway(newSelection)}
            editResult={newResult => editResult(newResult)}
          />
        );
    }
  }

  getStructure() {
    const { sport } = this.props;

    switch (sport) {
      case "Hockey":
        return {
          requiredStats: {
            goals: 0
          },
          optionalStats: {
            penaltyCorners: 0,
            penaltyStrokes: 0,
            pushIns: 0,
            freeHits: 0,
            greenCards: 0,
            yellowCards: 0,
            redCards: 0
          }
        };
      case "Netball":
        return {
          requiredStats: {
            goals: 0
          },
          optionalStats: {
            freePasses: 0,
            penaltyPasses: 0
          }
        };
      case "Rugby":
        return {
          requiredStats: {
            tries: 0,
            conversions: 0,
            penaltyKicks: 0,
            dropGoals: 0
          },
          optionalStats: {
            throwIns: 0,
            scrums: 0,
            yellowCards: 0,
            redCards: 0
          }
        };
      default:
        return {
          requiredStats: {
            score: 0
          }
        };
    }
  }

  getScores() {
    const { sport, homeTeam, awayTeam } = this.props;

    switch (sport) {
      case "Hockey":
        return {
          homeTeam: homeTeam.requiredStats && homeTeam.requiredStats.goals,
          awayTeam: awayTeam.requiredStats && awayTeam.requiredStats.goals
        };
      case "Netball":
        return {
          homeTeam: homeTeam.requiredStats && homeTeam.requiredStats.goals,
          awayTeam: awayTeam.requiredStats && awayTeam.requiredStats.goals
        };
      case "Rugby":
        let homeScore = 0;
        let awayScore = 0;

        if (homeTeam.requiredStats) {
          homeScore =
            homeTeam.requiredStats.tries * 5 +
            homeTeam.requiredStats.conversions * 2 +
            homeTeam.requiredStats.penaltyKicks * 3 +
            homeTeam.requiredStats.dropGoals * 3;
          awayScore =
            awayTeam.requiredStats.tries * 5 +
            awayTeam.requiredStats.conversions * 2 +
            awayTeam.requiredStats.penaltyKicks * 3 +
            awayTeam.requiredStats.dropGoals * 3;
        }

        return {
          homeTeam: homeScore,
          awayTeam: awayScore
        };
      default:
        return {
          homeTeam: homeTeam.requiredStats && homeTeam.requiredStats.score,
          awayTeam: awayTeam.requiredStats && awayTeam.requiredStats.score
        };
    }
  }

  render() {
    const {
      classes,
      homeTeam,
      awayTeam,
      status,
      startLogging,
      finaliseResults,
      allowLogging,
      allowApproval
    } = this.props;
    const { commentary } = this.state;

    let allowEditing = status !== "FINALISED";
    if (!allowLogging) {
      allowEditing = false;
    }
    const result = this.getResult();
    const logger = this.getLogger();
    let scores = {
      homeTeam: 0,
      awayTeam: 0
    };
    if (status !== "AWAITING_START") {
      scores = this.getScores();
    }

    return (
      <div className={classes.wrapper}>
        <div className={classes.scoreWrapper}>
          <div className={classes.teamScoreInfo}>
            <img
              src={homeTeam.emblem === "" ? defaultEmblem : homeTeam.emblem}
              alt="Home team emblem"
              className={classes.emblem}
            />
            <div className={classes.teamName}>
              {homeTeam.isUsersTeam && (
                <span className={classes.homeAwayIndicator}>(H)</span>
              )}
              {homeTeam.name}
            </div>
          </div>
          <div className={classes.scoreMidSection}>
            {status === "FINALISED" && (
              <div className={result.style}>{result.text}</div>
            )}
            <div className={classes.scoreMidSubSection}>
              <div className={classes.score}>
                {status === "AWAITING_START" ? 0 : scores.homeTeam}
              </div>
              <div className={classes.vsText}>vs</div>
              <div className={classes.score}>
                {status === "AWAITING_START" ? 0 : scores.awayTeam}
              </div>
            </div>
          </div>
          <div className={classes.teamScoreInfo}>
            <img
              src={awayTeam.emblem === "" ? defaultEmblem : awayTeam.emblem}
              alt="Away team emblem"
              className={classes.emblem}
            />
            <div className={classes.teamName}>
              {awayTeam.isUsersTeam && (
                <span className={classes.homeAwayIndicator}>(A)</span>
              )}
              {awayTeam.name}
            </div>
          </div>
        </div>
        {status !== "AWAITING_START" ? (
          <div>
            {logger}
            <div className={classes.commentaryWrapper}>
              <div className={classes.commentaryHeading}>
                <i
                  className={`fas fa-bullhorn ${classes.commentaryIcon}`}
                />Commentary
              </div>
              {allowEditing ? (
                <TextArea
                  placeholder="Optional..."
                  rows={4}
                  value={commentary}
                  handleChange={newValue => this.updateCommentary(newValue)}
                  handleBlur={newValue => this.updateCommentaryResult(newValue)}
                />
              ) : (
                <div className={classes.commentaryConfirmed}>
                  {commentary === "" ? "No commentary given." : commentary}
                </div>
              )}
            </div>
            {status !== "FINALISED" &&
              (allowApproval ? (
                <div
                  className={classes.confirmButton}
                  onClick={() => finaliseResults()}
                >
                  Confirm Results
                </div>
              ) : (
                <div className={classes.awaitingButton}>
                  Awaiting final results
                </div>
              ))}
          </div>
        ) : allowLogging ? (
          <div
            className={classes.confirmButton}
            onClick={() => startLogging(this.getStructure())}
          >
            Start Logging
          </div>
        ) : (
          <div className={classes.awaitingButton}>Awaiting final results</div>
        )}
      </div>
    );
  }
}

export default injectStyles(styles)(DesktopLogger);
