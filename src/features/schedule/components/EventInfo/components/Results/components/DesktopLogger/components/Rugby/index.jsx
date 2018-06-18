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
  wrapper: {
    backgroundColor: common["white"]
  }
};

class Rugby extends Component {
  state = {
    homeTeam: {
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
    },
    awayTeam: {
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
      <div className={classes.wrapper}>
        <div className={classes.statsRequiredWrapper}>
          <div className={classes.statsRow}>
            <div className={classes.pointsColumn}>
              {allowEditing ? (
                <TextField
                  type="number"
                  placeholder=""
                  value={homeTeam.requiredStats.tries}
                  handleChange={newValue =>
                    this.updateRequiredField("tries", newValue, "homeTeam")}
                  handleBlur={newValue =>
                    this.updateRequiredResults("tries", newValue, "home")}
                />
              ) : (
                homeTeam.requiredStats.tries
              )}
            </div>
            <div className={classes.pointsLabelColumn}>Tries</div>
            <div className={classes.pointsColumn}>
              {allowEditing ? (
                <TextField
                  type="number"
                  placeholder=""
                  value={awayTeam.requiredStats.tries}
                  handleChange={newValue =>
                    this.updateRequiredField("tries", newValue, "awayTeam")}
                  handleBlur={newValue =>
                    this.updateRequiredResults("tries", newValue, "away")}
                />
              ) : (
                awayTeam.requiredStats.tries
              )}
            </div>
          </div>
          <div className={classes.statsRow}>
            <div className={classes.pointsColumn}>
              {allowEditing ? (
                <TextField
                  type="number"
                  placeholder=""
                  value={homeTeam.requiredStats.conversions}
                  handleChange={newValue =>
                    this.updateRequiredField(
                      "conversions",
                      newValue,
                      "homeTeam"
                    )}
                  handleBlur={newValue =>
                    this.updateRequiredResults("conversions", newValue, "home")}
                />
              ) : (
                homeTeam.requiredStats.conversions
              )}
            </div>
            <div className={classes.pointsLabelColumn}>Conversions</div>
            <div className={classes.pointsColumn}>
              {allowEditing ? (
                <TextField
                  type="number"
                  placeholder=""
                  value={awayTeam.requiredStats.conversions}
                  handleChange={newValue =>
                    this.updateRequiredField(
                      "conversions",
                      newValue,
                      "awayTeam"
                    )}
                  handleBlur={newValue =>
                    this.updateRequiredResults("conversions", newValue, "away")}
                />
              ) : (
                awayTeam.requiredStats.conversions
              )}
            </div>
          </div>
          <div className={classes.statsRow}>
            <div className={classes.pointsColumn}>
              {allowEditing ? (
                <TextField
                  type="number"
                  placeholder=""
                  value={homeTeam.requiredStats.penaltyKicks}
                  handleChange={newValue =>
                    this.updateRequiredField(
                      "penaltyKicks",
                      newValue,
                      "homeTeam"
                    )}
                  handleBlur={newValue =>
                    this.updateRequiredResults(
                      "penaltyKicks",
                      newValue,
                      "home"
                    )}
                />
              ) : (
                homeTeam.requiredStats.penaltyKicks
              )}
            </div>
            <div className={classes.pointsLabelColumn}>Penalty Kicks</div>
            <div className={classes.pointsColumn}>
              {allowEditing ? (
                <TextField
                  type="number"
                  placeholder=""
                  value={awayTeam.requiredStats.penaltyKicks}
                  handleChange={newValue =>
                    this.updateRequiredField(
                      "penaltyKicks",
                      newValue,
                      "awayTeam"
                    )}
                  handleBlur={newValue =>
                    this.updateRequiredResults(
                      "penaltyKicks",
                      newValue,
                      "away"
                    )}
                />
              ) : (
                awayTeam.requiredStats.penaltyKicks
              )}
            </div>
          </div>
          <div className={classes.statsRow}>
            <div className={classes.pointsColumn}>
              {allowEditing ? (
                <TextField
                  type="number"
                  placeholder=""
                  value={homeTeam.requiredStats.dropGoals}
                  handleChange={newValue =>
                    this.updateRequiredField("dropGoals", newValue, "homeTeam")}
                  handleBlur={newValue =>
                    this.updateRequiredResults("dropGoals", newValue, "home")}
                />
              ) : (
                homeTeam.requiredStats.dropGoals
              )}
            </div>
            <div className={classes.pointsLabelColumn}>Drop Goals</div>
            <div className={classes.pointsColumn}>
              {allowEditing ? (
                <TextField
                  type="number"
                  placeholder=""
                  value={awayTeam.requiredStats.dropGoals}
                  handleChange={newValue =>
                    this.updateRequiredField("dropGoals", newValue, "awayTeam")}
                  handleBlur={newValue =>
                    this.updateRequiredResults("dropGoals", newValue, "away")}
                />
              ) : (
                awayTeam.requiredStats.dropGoals
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
                    value={homeTeam.optionalStats.throwIns}
                    handleChange={newValue =>
                      this.updateOptionalField(
                        "throwIns",
                        newValue,
                        "homeTeam"
                      )}
                    handleBlur={newValue =>
                      this.updateOptionalResults("throwIns", newValue, "home")}
                  />
                ) : (
                  homeTeam.optionalStats.throwIns
                )}
              </div>
              <div className={classes.pointsLabelColumn}>Throw-Ins</div>
              <div className={classes.pointsColumn}>
                {allowEditing ? (
                  <TextField
                    type="number"
                    placeholder=""
                    value={awayTeam.optionalStats.throwIns}
                    handleChange={newValue =>
                      this.updateOptionalField(
                        "throwIns",
                        newValue,
                        "awayTeam"
                      )}
                    handleBlur={newValue =>
                      this.updateOptionalResults("throwIns", newValue, "away")}
                  />
                ) : (
                  awayTeam.optionalStats.throwIns
                )}
              </div>
            </div>
            <div className={classes.statsRow}>
              <div className={classes.pointsColumn}>
                {allowEditing ? (
                  <TextField
                    type="number"
                    placeholder=""
                    value={homeTeam.optionalStats.scrums}
                    handleChange={newValue =>
                      this.updateOptionalField("scrums", newValue, "homeTeam")}
                    handleBlur={newValue =>
                      this.updateOptionalResults("scrums", newValue, "home")}
                  />
                ) : (
                  homeTeam.optionalStats.scrums
                )}
              </div>
              <div className={classes.pointsLabelColumn}>Scrums</div>
              <div className={classes.pointsColumn}>
                {allowEditing ? (
                  <TextField
                    type="number"
                    placeholder=""
                    value={awayTeam.optionalStats.scrums}
                    handleChange={newValue =>
                      this.updateOptionalField("scrums", newValue, "awayTeam")}
                    handleBlur={newValue =>
                      this.updateOptionalResults("scrums", newValue, "away")}
                  />
                ) : (
                  awayTeam.optionalStats.scrums
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

export default injectStyles(styles)(Rugby);
