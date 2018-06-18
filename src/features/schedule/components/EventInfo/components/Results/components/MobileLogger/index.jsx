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
  commentaryConfirmed: {
    backgroundColor: grey[100],
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
    borderRadius: "0 0 16px 16px",
    "&:hover": {
      backgroundColor: orange["A200"]
    }
  },
  emblem: {
    margin: "0 12px",
    borderRadius: "50%",
    backgroundColor: grey[300],
    width: 32,
    height: 32
  },
  homeAwayIndicator: {
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 4
  },
  resultDraw: {
    textAlign: "center",
    borderRadius: "16px 16px 0 0",
    color: common["white"],
    backgroundColor: lightBlue[500],
    padding: 12
  },
  resultLoss: {
    textAlign: "center",
    borderRadius: "16px 16px 0 0",
    color: common["white"],
    backgroundColor: red[500],
    padding: 12
  },
  resultWin: {
    textAlign: "center",
    borderRadius: "16px 16px 0 0",
    color: common["white"],
    backgroundColor: green[500],
    padding: 12
  },
  score: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold"
  },
  scoreWrapper: {
    padding: "24px 0",
    height: "100%",
    backgroundColor: grey[100],
    width: 120,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  scoresWrapper: {
    display: "flex",
    flexDirection: "column"
  },
  teamName: {
    flex: 1,
    fontSize: 14,
    lineHeight: "20px",
    marginRight: 12
  },
  teamScoreInfo: {
    display: "flex",
    alignItems: "center",
    borderTop: `1px solid ${grey[300]}`
  },
  waitingBanner: {
    textAlign: "center",
    borderRadius: "16px 16px 0 0",
    color: common["white"],
    backgroundColor: grey[900],
    padding: 12
  },
  wrapper: {
    backgroundColor: common["white"],
    borderRadius: 16,
    border: `1px solid ${grey[300]}`
  }
};

class MobileLogger extends Component {
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

  toggleHomeAway(newSelection) {
    this.setState({
      homeAway: newSelection
    });
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
      finaliseResults
    } = this.props;
    const { commentary } = this.state;

    const allowEditing = status !== "FINALISED";
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
        <div className={classes.scoresWrapper}>
          {status === "FINALISED" ? (
            <div className={result.style}>{result.text}</div>
          ) : (
            <div className={classes.waitingBanner}>Not yet finalised</div>
          )}
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
            <div className={classes.scoreWrapper}>
              <div className={classes.score}>
                {status === "AWAITING_START" ? 0 : scores.homeTeam}
              </div>
            </div>
          </div>
          <div className={classes.teamScoreInfo}>
            <img
              src={awayTeam.emblem === "" ? defaultEmblem : awayTeam.emblem}
              alt="Away team emblem"
              className={classes.emblem}
            />
            <span className={classes.teamName}>
              {awayTeam.isUsersTeam && (
                <span className={classes.homeAwayIndicator}>(A)</span>
              )}
              {awayTeam.name}
            </span>
            <div className={classes.scoreWrapper}>
              <div className={classes.score}>
                {status === "AWAITING_START" ? 0 : scores.awayTeam}
              </div>
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
            {status !== "FINALISED" && (
              <div
                className={classes.confirmButton}
                onClick={() => finaliseResults()}
              >
                Confirm Results
              </div>
            )}
          </div>
        ) : (
          <div
            className={classes.confirmButton}
            onClick={() => startLogging(this.getStructure())}
          >
            Start Logging
          </div>
        )}
      </div>
    );
  }
}

export default injectStyles(styles)(MobileLogger);
