import React, { Component } from "react";
import injectStyles from "react-jss";
import { common, grey } from "../../../../../../../../../../utils/colours";
import Switch from "../Switch";
import Tabs from "../Tabs";
import TextField from "../../../../../../../../../../components/TextField";

const styles = {
  pointsColumn: {
    padding: "24px 0",
    height: "100%",
    backgroundColor: grey[100],
    width: 120,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  pointsLabelColumn: {
    flex: 1,
    padding: 24,
    height: "100%",
    fontWeight: "bold",
    color: grey[800]
  },
  statsRow: {
    display: "flex",
    alignItems: "center"
  },
  statsOptionalWrapper: {
    borderTop: `1px solid ${grey[300]}`,
    borderBottom: `1px solid ${grey[300]}`,
    backgroundColor: common["white"]
  },
  statsRequiredWrapper: {
    borderBottom: `1px solid ${grey[300]}`,
    backgroundColor: common["white"]
  },
  switchWrapper: {
    margin: "0 24px",
    display: "flex",
    justifyContent: "center"
  },
  wrapper: {
    backgroundColor: common["white"],
    border: `1px solid ${grey[300]}`
  }
};

class Netball extends Component {
  state = {
    requiredStats: {
      goals: 0
    },
    optionalStats: {
      freePasses: 0,
      penaltyPasses: 0
    }
  };

  componentWillMount() {
    const { homeTeam, awayTeam, homeAway } = this.props;

    let teamInfo = homeTeam;
    if (homeAway === "away") {
      teamInfo = awayTeam;
    }

    this.setState({
      requiredStats: teamInfo.requiredStats,
      optionalStats: teamInfo.optionalStats
    });
  }

  componentWillReceiveProps(nextProps) {
    const { homeTeam, awayTeam, homeAway } = nextProps;

    if (
      homeTeam !== this.props.homeTeam ||
      awayTeam !== this.props.awayTeam ||
      homeAway !== this.props.homeAway
    ) {
      let teamInfo = homeTeam;
      if (homeAway === "away") {
        teamInfo = awayTeam;
      }

      this.setState({
        requiredStats: teamInfo.requiredStats,
        optionalStats: teamInfo.optionalStats
      });
    }
  }

  updateRequiredField(stat, newValue) {
    const { requiredStats } = this.state;
    const numberValue = parseInt(newValue, 10);

    this.setState({
      requiredStats: {
        ...requiredStats,
        [stat]: numberValue
      }
    });
  }

  updateOptionalField(stat, newValue) {
    const { optionalStats } = this.state;
    const numberValue = parseInt(newValue, 10);

    this.setState({
      optionalStats: {
        ...optionalStats,
        [stat]: numberValue
      }
    });
  }

  updateRequiredResults(stat, newValue) {
    const {
      playingAtHome,
      editResult,
      commentary,
      homeAway,
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

  updateOptionalResults(stat, newValue) {
    const {
      playingAtHome,
      editResult,
      commentary,
      homeAway,
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
    const {
      classes,
      trackOptional,
      homeAway,
      toggleHomeAway,
      status,
      toggleOptionalStats
    } = this.props;
    const { requiredStats, optionalStats } = this.state;

    const allowEditing = status !== "FINALISED";

    return (
      <div className={classes.wrapper}>
        <Tabs
          selected={homeAway}
          toggleHomeAway={newSelection => toggleHomeAway(newSelection)}
        />
        <div className={classes.statsRequiredWrapper}>
          <div className={classes.statsRow}>
            <div className={classes.pointsLabelColumn}>Goals</div>
            <div className={classes.pointsColumn}>
              {allowEditing ? (
                <TextField
                  type="number"
                  placeholder=""
                  value={requiredStats.goals}
                  handleChange={newValue =>
                    this.updateRequiredField("goals", newValue)}
                  handleBlur={newValue =>
                    this.updateRequiredResults("goals", newValue)}
                />
              ) : (
                requiredStats.goals
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
              <div className={classes.pointsLabelColumn}>Free Passes</div>
              <div className={classes.pointsColumn}>
                {allowEditing ? (
                  <TextField
                    type="number"
                    placeholder=""
                    value={optionalStats.freePasses}
                    handleChange={newValue =>
                      this.updateOptionalField("freePasses", newValue)}
                    handleBlur={newValue =>
                      this.updateOptionalResults("freePasses", newValue)}
                  />
                ) : (
                  optionalStats.freePasses
                )}
              </div>
            </div>
            <div className={classes.statsRow}>
              <div className={classes.pointsLabelColumn}>Penalty Passes</div>
              <div className={classes.pointsColumn}>
                {allowEditing ? (
                  <TextField
                    type="number"
                    placeholder=""
                    value={optionalStats.penaltyPasses}
                    handleChange={newValue =>
                      this.updateOptionalField("penaltyPasses", newValue)}
                    handleBlur={newValue =>
                      this.updateOptionalResults("penaltyPasses", newValue)}
                  />
                ) : (
                  optionalStats.penaltyPasses
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
