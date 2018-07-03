import React, { Component } from "react";
import injectStyles from "react-jss";
import { common, grey } from "../../../../../../../../../../utils/colours";
import Switch from "../Switch";
import TextField from "../../../../../../../../../../components/TextField";

const styles = {
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
  statsRow: {
    display: "flex",
    alignItems: "center"
  },
  statsOptionalWrapper: {
    margin: 24,
    border: `1px solid ${grey[300]}`,
    backgroundColor: common["white"],
    borderRadius: 8
  },
  statsRequiredWrapper: {
    margin: "0 24px 24px 24px",
    border: `1px solid ${grey[300]}`,
    backgroundColor: common["white"],
    borderRadius: 8
  },
  switchWrapper: {
    margin: "0 24px",
    display: "flex",
    justifyContent: "center"
  }
};

class Hockey extends Component {
  state = {
    homeTeam: {
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
    },
    awayTeam: {
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
    }
  };

  componentWillMount() {
    const { homeTeam, awayTeam } = this.props;

    this.setState({
      homeTeam,
      awayTeam
    });
  }

  componentWillReceiveProps(nextProps) {
    const { homeTeam, awayTeam } = nextProps;

    if (homeTeam !== this.props.homeTeam || awayTeam !== this.props.awayTeam) {
      this.setState({
        homeTeam,
        awayTeam
      });
    }
  }

  updateRequiredField(stat, newValue, homeAwayTeam) {
    const numberValue = parseInt(newValue, 10);

    this.setState({
      [homeAwayTeam]: {
        ...this.state[homeAwayTeam],
        requiredStats: {
          ...this.state[homeAwayTeam].requiredStats,
          [stat]: numberValue
        }
      }
    });
  }

  updateOptionalField(stat, newValue, homeAwayTeam) {
    const numberValue = parseInt(newValue, 10);

    this.setState({
      [homeAwayTeam]: {
        ...this.state[homeAwayTeam],
        optionalStats: {
          ...this.state[homeAwayTeam].optionalStats,
          [stat]: numberValue
        }
      }
    });
  }

  updateRequiredResults(stat, newValue, homeAway) {
    const {
      playingAtHome,
      editResult,
      commentary,
      homeTeam,
      awayTeam
    } = this.props;
    const numberValue = parseInt(newValue, 10);

    if (playingAtHome && homeAway === "home") {
      editResult({
        commentary,
        ourScore: {
          requiredStats: {
            ...homeTeam.requiredStats,
            [stat]: numberValue
          },
          optionalStats: homeTeam.optionalStats
        },
        theirScore: {
          requiredStats: awayTeam.requiredStats,
          optionalStats: awayTeam.optionalStats
        }
      });
    } else if (playingAtHome && homeAway === "away") {
      editResult({
        commentary,
        theirScore: {
          requiredStats: {
            ...awayTeam.requiredStats,
            [stat]: numberValue
          },
          optionalStats: awayTeam.requiredStats
        },
        ourScore: {
          requiredStats: homeTeam.requiredStats,
          optionalStats: homeTeam.optionalStats
        }
      });
    } else if (!playingAtHome && homeAway === "home") {
      editResult({
        commentary,
        theirScore: {
          requiredStats: {
            ...homeTeam.requiredStats,
            [stat]: numberValue
          },
          optionalStats: homeTeam.optionalStats
        },
        ourScore: {
          requiredStats: awayTeam.requiredStats,
          optionalStats: awayTeam.optionalStats
        }
      });
    } else {
      editResult({
        commentary,
        ourScore: {
          requiredStats: {
            ...awayTeam.requiredStats,
            [stat]: numberValue
          },
          optionalStats: awayTeam.optionalStats
        },
        theirScore: {
          requiredStats: homeTeam.requiredStats,
          optionalStats: homeTeam.optionalStats
        }
      });
    }
  }

  updateOptionalResults(stat, newValue, homeAway) {
    const {
      playingAtHome,
      editResult,
      commentary,
      homeTeam,
      awayTeam
    } = this.props;
    const numberValue = parseInt(newValue, 10);

    if (playingAtHome && homeAway === "home") {
      editResult({
        commentary,
        ourScore: {
          optionalStats: {
            ...homeTeam.optionalStats,
            [stat]: numberValue
          },
          requiredStats: homeTeam.requiredStats
        },
        theirScore: {
          requiredStats: awayTeam.requiredStats,
          optionalStats: awayTeam.optionalStats
        }
      });
    } else if (playingAtHome && homeAway === "away") {
      editResult({
        commentary,
        theirScore: {
          optionalStats: {
            ...awayTeam.optionalStats,
            [stat]: numberValue
          },
          requiredStats: awayTeam.requiredStats
        },
        ourScore: {
          requiredStats: homeTeam.requiredStats,
          optionalStats: homeTeam.optionalStats
        }
      });
    } else if (!playingAtHome && homeAway === "home") {
      editResult({
        commentary,
        theirScore: {
          optionalStats: {
            ...homeTeam.optionalStats,
            [stat]: numberValue
          },
          requiredStats: homeTeam.requiredStats
        },
        ourScore: {
          requiredStats: awayTeam.requiredStats,
          optionalStats: awayTeam.optionalStats
        }
      });
    } else {
      editResult({
        commentary,
        ourScore: {
          optionalStats: {
            ...awayTeam.optionalStats,
            [stat]: numberValue
          },
          requiredStats: awayTeam.requiredStats
        },
        theirScore: {
          requiredStats: homeTeam.requiredStats,
          optionalStats: homeTeam.optionalStats
        }
      });
    }
  }

  render() {
    const { classes, trackOptional, status, toggleOptionalStats } = this.props;
    const { homeTeam, awayTeam } = this.state;

    const allowEditing = status !== "FINALISED";

    return (
      <div>
        <div className={classes.statsRequiredWrapper}>
          <div className={classes.statsRow}>
            <div className={classes.pointsColumn}>
              {allowEditing ? (
                <TextField
                  type="number"
                  placeholder=""
                  value={homeTeam.requiredStats.goals}
                  handleChange={newValue =>
                    this.updateRequiredField("goals", newValue, "homeTeam")}
                  handleBlur={newValue =>
                    this.updateRequiredResults("goals", newValue, "home")}
                />
              ) : (
                homeTeam.requiredStats.goals
              )}
            </div>
            <div className={classes.pointsLabelColumn}>Goals</div>
            <div className={classes.pointsColumn}>
              {allowEditing ? (
                <TextField
                  type="number"
                  placeholder=""
                  value={awayTeam.requiredStats.goals}
                  handleChange={newValue =>
                    this.updateRequiredField("goals", newValue, "awayTeam")}
                  handleBlur={newValue =>
                    this.updateRequiredResults("goals", newValue, "away")}
                />
              ) : (
                awayTeam.requiredStats.goals
              )}
            </div>
          </div>
        </div>
        {status !== "FINALISED" && (
          <div className={classes.switchWrapper}>
            <Switch
              selected={trackOptional ? "yes" : "no"}
              toggleSelected={newState =>
                toggleOptionalStats(newState === "yes")}
            />
          </div>
        )}
        {trackOptional && (
          <div className={classes.statsOptionalWrapper}>
            <div className={classes.statsRow}>
              <div className={classes.pointsColumn}>
                {allowEditing ? (
                  <TextField
                    type="number"
                    placeholder=""
                    value={homeTeam.optionalStats.penaltyCorners}
                    handleChange={newValue =>
                      this.updateOptionalField(
                        "penaltyCorners",
                        newValue,
                        "homeTeam"
                      )}
                    handleBlur={newValue =>
                      this.updateOptionalResults(
                        "penaltyCorners",
                        newValue,
                        "home"
                      )}
                  />
                ) : (
                  homeTeam.optionalStats.penaltyCorners
                )}
              </div>
              <div className={classes.pointsLabelColumn}>Penalty Corners</div>
              <div className={classes.pointsColumn}>
                {allowEditing ? (
                  <TextField
                    type="number"
                    placeholder=""
                    value={awayTeam.optionalStats.penaltyCorners}
                    handleChange={newValue =>
                      this.updateOptionalField(
                        "penaltyCorners",
                        newValue,
                        "awayTeam"
                      )}
                    handleBlur={newValue =>
                      this.updateOptionalResults(
                        "penaltyCorners",
                        newValue,
                        "away"
                      )}
                  />
                ) : (
                  awayTeam.optionalStats.penaltyCorners
                )}
              </div>
            </div>
            <div className={classes.statsRow}>
              <div className={classes.pointsColumn}>
                {allowEditing ? (
                  <TextField
                    type="number"
                    placeholder=""
                    value={homeTeam.optionalStats.penaltyStrokes}
                    handleChange={newValue =>
                      this.updateOptionalField(
                        "penaltyStrokes",
                        newValue,
                        "homeTeam"
                      )}
                    handleBlur={newValue =>
                      this.updateOptionalResults(
                        "penaltyStrokes",
                        newValue,
                        "home"
                      )}
                  />
                ) : (
                  homeTeam.optionalStats.penaltyStrokes
                )}
              </div>
              <div className={classes.pointsLabelColumn}>Penalty Strokes</div>
              <div className={classes.pointsColumn}>
                {allowEditing ? (
                  <TextField
                    type="number"
                    placeholder=""
                    value={awayTeam.optionalStats.penaltyStrokes}
                    handleChange={newValue =>
                      this.updateOptionalField(
                        "penaltyStrokes",
                        newValue,
                        "awayTeam"
                      )}
                    handleBlur={newValue =>
                      this.updateOptionalResults(
                        "penaltyStrokes",
                        newValue,
                        "away"
                      )}
                  />
                ) : (
                  awayTeam.optionalStats.penaltyStrokes
                )}
              </div>
            </div>
            <div className={classes.statsRow}>
              <div className={classes.pointsColumn}>
                {allowEditing ? (
                  <TextField
                    type="number"
                    placeholder=""
                    value={homeTeam.optionalStats.pushIns}
                    handleChange={newValue =>
                      this.updateOptionalField("pushIns", newValue, "homeTeam")}
                    handleBlur={newValue =>
                      this.updateOptionalResults("pushIns", newValue, "home")}
                  />
                ) : (
                  homeTeam.optionalStats.pushIns
                )}
              </div>
              <div className={classes.pointsLabelColumn}>Push-ins</div>
              <div className={classes.pointsColumn}>
                {allowEditing ? (
                  <TextField
                    type="number"
                    placeholder=""
                    value={awayTeam.optionalStats.pushIns}
                    handleChange={newValue =>
                      this.updateOptionalField("pushIns", newValue, "awayTeam")}
                    handleBlur={newValue =>
                      this.updateOptionalResults("pushIns", newValue, "away")}
                  />
                ) : (
                  awayTeam.optionalStats.pushIns
                )}
              </div>
            </div>
            <div className={classes.statsRow}>
              <div className={classes.pointsColumn}>
                {allowEditing ? (
                  <TextField
                    type="number"
                    placeholder=""
                    value={homeTeam.optionalStats.freeHits}
                    handleChange={newValue =>
                      this.updateOptionalField(
                        "freeHits",
                        newValue,
                        "homeTeam"
                      )}
                    handleBlur={newValue =>
                      this.updateOptionalResults("freeHits", newValue, "home")}
                  />
                ) : (
                  homeTeam.optionalStats.freeHits
                )}
              </div>
              <div className={classes.pointsLabelColumn}>Free Hits</div>
              <div className={classes.pointsColumn}>
                {allowEditing ? (
                  <TextField
                    type="number"
                    placeholder=""
                    value={awayTeam.optionalStats.freeHits}
                    handleChange={newValue =>
                      this.updateOptionalField(
                        "freeHits",
                        newValue,
                        "awayTeam"
                      )}
                    handleBlur={newValue =>
                      this.updateOptionalResults("freeHits", newValue, "away")}
                  />
                ) : (
                  awayTeam.optionalStats.freeHits
                )}
              </div>
            </div>
            <div className={classes.statsRow}>
              <div className={classes.pointsColumn}>
                {allowEditing ? (
                  <TextField
                    type="number"
                    placeholder=""
                    value={homeTeam.optionalStats.greenCards}
                    handleChange={newValue =>
                      this.updateOptionalField(
                        "greenCards",
                        newValue,
                        "homeTeam"
                      )}
                    handleBlur={newValue =>
                      this.updateOptionalResults(
                        "greenCards",
                        newValue,
                        "home"
                      )}
                  />
                ) : (
                  homeTeam.optionalStats.greenCards
                )}
              </div>
              <div className={classes.pointsLabelColumn}>Green Cards</div>
              <div className={classes.pointsColumn}>
                {allowEditing ? (
                  <TextField
                    type="number"
                    placeholder=""
                    value={awayTeam.optionalStats.greenCards}
                    handleChange={newValue =>
                      this.updateOptionalField(
                        "greenCards",
                        newValue,
                        "awayTeam"
                      )}
                    handleBlur={newValue =>
                      this.updateOptionalResults(
                        "greenCards",
                        newValue,
                        "away"
                      )}
                  />
                ) : (
                  awayTeam.optionalStats.greenCards
                )}
              </div>
            </div>
            <div className={classes.statsRow}>
              <div className={classes.pointsColumn}>
                {allowEditing ? (
                  <TextField
                    type="number"
                    placeholder=""
                    value={homeTeam.optionalStats.yellowCards}
                    handleChange={newValue =>
                      this.updateOptionalField(
                        "yellowCards",
                        newValue,
                        "homeTeam"
                      )}
                    handleBlur={newValue =>
                      this.updateOptionalResults(
                        "yellowCards",
                        newValue,
                        "home"
                      )}
                  />
                ) : (
                  homeTeam.optionalStats.yellowCards
                )}
              </div>
              <div className={classes.pointsLabelColumn}>Yellow Cards</div>
              <div className={classes.pointsColumn}>
                {allowEditing ? (
                  <TextField
                    type="number"
                    placeholder=""
                    value={awayTeam.optionalStats.yellowCards}
                    handleChange={newValue =>
                      this.updateOptionalField(
                        "yellowCards",
                        newValue,
                        "awayTeam"
                      )}
                    handleBlur={newValue =>
                      this.updateOptionalResults(
                        "yellowCards",
                        newValue,
                        "away"
                      )}
                  />
                ) : (
                  awayTeam.optionalStats.yellowCards
                )}
              </div>
            </div>
            <div className={classes.statsRow}>
              <div className={classes.pointsColumn}>
                {allowEditing ? (
                  <TextField
                    type="number"
                    placeholder=""
                    value={homeTeam.optionalStats.redCards}
                    handleChange={newValue =>
                      this.updateOptionalField(
                        "redCards",
                        newValue,
                        "homeTeam"
                      )}
                    handleBlur={newValue =>
                      this.updateOptionalResults("redCards", newValue, "home")}
                  />
                ) : (
                  homeTeam.optionalStats.redCards
                )}
              </div>
              <div className={classes.pointsLabelColumn}>Red Cards</div>
              <div className={classes.pointsColumn}>
                {allowEditing ? (
                  <TextField
                    type="number"
                    placeholder=""
                    value={awayTeam.optionalStats.redCards}
                    handleChange={newValue =>
                      this.updateOptionalField(
                        "redCards",
                        newValue,
                        "awayTeam"
                      )}
                    handleBlur={newValue =>
                      this.updateOptionalResults("redCards", newValue, "away")}
                  />
                ) : (
                  awayTeam.optionalStats.redCards
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default injectStyles(styles)(Hockey);
