import React, { Component } from "react";
import injectStyles from "react-jss";
import { common, grey } from "../../../../../../../../../../utils/colours";
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

class Custom extends Component {
  state = {
    requiredStats: {
      score: 0
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
    const { classes, homeAway, toggleHomeAway, status } = this.props;
    const { requiredStats } = this.state;

    const allowEditing = status !== "FINALISED";

    return (
      <div className={classes.wrapper}>
        <Tabs
          selected={homeAway}
          toggleHomeAway={newSelection => toggleHomeAway(newSelection)}
        />
        <div className={classes.statsRequiredWrapper}>
          <div className={classes.statsRow}>
            <div className={classes.pointsLabelColumn}>Score</div>
            <div className={classes.pointsColumn}>
              {allowEditing ? (
                <TextField
                  type="number"
                  placeholder=""
                  value={requiredStats.score}
                  handleChange={newValue =>
                    this.updateRequiredField("score", newValue)}
                  handleBlur={newValue =>
                    this.updateRequiredResults("score", newValue)}
                />
              ) : (
                requiredStats.score
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default injectStyles(styles)(Custom);
