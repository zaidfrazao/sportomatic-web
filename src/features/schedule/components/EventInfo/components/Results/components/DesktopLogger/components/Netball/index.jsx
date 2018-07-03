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

class Netball extends Component {
  state = {
    homeTeam: {
      requiredStats: {
        goals: 0
      },
      optionalStats: {
        freePasses: 0,
        penaltyPasses: 0
      }
    },
    awayTeam: {
      requiredStats: {
        goals: 0
      },
      optionalStats: {
        freePasses: 0,
        penaltyPasses: 0
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
                    value={homeTeam.optionalStats.freePasses}
                    handleChange={newValue =>
                      this.updateOptionalField(
                        "freePasses",
                        newValue,
                        "homeTeam"
                      )}
                    handleBlur={newValue =>
                      this.updateOptionalResults(
                        "freePasses",
                        newValue,
                        "home"
                      )}
                  />
                ) : (
                  homeTeam.optionalStats.freePasses
                )}
              </div>
              <div className={classes.pointsLabelColumn}>Free Passes</div>
              <div className={classes.pointsColumn}>
                {allowEditing ? (
                  <TextField
                    type="number"
                    placeholder=""
                    value={awayTeam.optionalStats.freePasses}
                    handleChange={newValue =>
                      this.updateOptionalField(
                        "freePasses",
                        newValue,
                        "awayTeam"
                      )}
                    handleBlur={newValue =>
                      this.updateOptionalResults(
                        "freePasses",
                        newValue,
                        "away"
                      )}
                  />
                ) : (
                  awayTeam.optionalStats.freePasses
                )}
              </div>
            </div>
            <div className={classes.statsRow}>
              <div className={classes.pointsColumn}>
                {allowEditing ? (
                  <TextField
                    type="number"
                    placeholder=""
                    value={homeTeam.optionalStats.penaltyPasses}
                    handleChange={newValue =>
                      this.updateOptionalField(
                        "penaltyPasses",
                        newValue,
                        "homeTeam"
                      )}
                    handleBlur={newValue =>
                      this.updateOptionalResults(
                        "penaltyPasses",
                        newValue,
                        "home"
                      )}
                  />
                ) : (
                  homeTeam.optionalStats.penaltyPasses
                )}
              </div>
              <div className={classes.pointsLabelColumn}>Penalty Passes</div>
              <div className={classes.pointsColumn}>
                {allowEditing ? (
                  <TextField
                    type="number"
                    placeholder=""
                    value={awayTeam.optionalStats.penaltyPasses}
                    handleChange={newValue =>
                      this.updateOptionalField(
                        "penaltyPasses",
                        newValue,
                        "awayTeam"
                      )}
                    handleBlur={newValue =>
                      this.updateOptionalResults(
                        "penaltyPasses",
                        newValue,
                        "away"
                      )}
                  />
                ) : (
                  awayTeam.optionalStats.penaltyPasses
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default injectStyles(styles)(Netball);
