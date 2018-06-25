import React, { Component } from "react";
import injectStyles from "react-jss";
import { common, grey } from "../../../../../../../../../../utils/colours";
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
  statsRequiredWrapper: {
    margin: "0 24px 24px 24px",
    border: `1px solid ${grey[300]}`,
    backgroundColor: common["white"],
    borderRadius: 8
  },
  wrapper: {}
};

class Custom extends Component {
  state = {
    homeTeam: {
      requiredStats: {
        score: 0
      }
    },
    awayTeam: {
      requiredStats: {
        score: 0
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
          }
        },
        theirScore: {
          requiredStats: awayTeam.requiredStats
        }
      });
    } else if (playingAtHome && homeAway === "away") {
      editResult({
        commentary,
        theirScore: {
          requiredStats: {
            ...awayTeam.requiredStats,
            [stat]: numberValue
          }
        },
        ourScore: {
          requiredStats: homeTeam.requiredStats
        }
      });
    } else if (!playingAtHome && homeAway === "home") {
      editResult({
        commentary,
        theirScore: {
          requiredStats: {
            ...homeTeam.requiredStats,
            [stat]: numberValue
          }
        },
        ourScore: {
          requiredStats: awayTeam.requiredStats
        }
      });
    } else {
      editResult({
        commentary,
        ourScore: {
          requiredStats: {
            ...awayTeam.requiredStats,
            [stat]: numberValue
          }
        },
        theirScore: {
          requiredStats: homeTeam.requiredStats
        }
      });
    }
  }

  render() {
    const { classes, status } = this.props;
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
                  value={homeTeam.requiredStats.score}
                  handleChange={newValue =>
                    this.updateRequiredField("score", newValue, "homeTeam")}
                  handleBlur={newValue =>
                    this.updateRequiredResults("score", newValue, "home")}
                />
              ) : (
                homeTeam.requiredStats.score
              )}
            </div>
            <div className={classes.pointsLabelColumn}>Score</div>
            <div className={classes.pointsColumn}>
              {allowEditing ? (
                <TextField
                  type="number"
                  placeholder=""
                  value={awayTeam.requiredStats.score}
                  handleChange={newValue =>
                    this.updateRequiredField("score", newValue, "awayTeam")}
                  handleBlur={newValue =>
                    this.updateRequiredResults("score", newValue, "away")}
                />
              ) : (
                awayTeam.requiredStats.score
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default injectStyles(styles)(Custom);
