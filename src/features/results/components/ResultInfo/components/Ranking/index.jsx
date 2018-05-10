/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import Avatar from "material-ui/Avatar";
import { amber, brown, grey } from "material-ui/colors";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import defaultEmblemURL from "../../../../images/default-emblem-url.png";

const mobileBreakpoint = 800;

const styles = theme => ({
  commentaryInnerWrapper: {
    flexGrow: 1,
    padding: 24
  },
  commentaryHeading: {
    width: "100%",
    textAlign: "center",
    marginBottom: 16
  },
  commentaryWrapper: {
    border: `1px solid ${grey[300]}`,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white"
  },
  emblems: {
    width: "80%",
    maxWidth: 100,
    margin: 10,
    height: "auto",
    [`@media (max-width: ${mobileBreakpoint}px)`]: {
      width: 40,
      margin: 10,
      height: "auto"
    }
  },
  goalsWrapper: {
    width: "25%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: grey[100],
    [`@media (max-width: 600px)`]: {
      padding: 16,
      width: "auto",
      display: "block"
    }
  },
  placedFirst: {
    backgroundColor: amber[500],
    color: grey[50],
    fontSize: 14,
    padding: "8px 0",
    textAlign: "center",
    width: "100%"
  },
  placedSecond: {
    backgroundColor: grey[400],
    color: grey[50],
    fontSize: 14,
    padding: "8px 0",
    textAlign: "center",
    width: "100%"
  },
  placedThird: {
    backgroundColor: brown[400],
    color: grey[50],
    fontSize: 14,
    padding: "8px 0",
    textAlign: "center",
    width: "100%"
  },
  placedOther: {
    backgroundColor: grey[700],
    color: grey[50],
    fontSize: 14,
    padding: "8px 0",
    textAlign: "center",
    width: "100%"
  },
  pointsWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white"
  },
  teamName: {
    flexGrow: 1,
    textAlign: "left",
    color: grey[600],
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    [`@media (min-width: 600px)`]: {
      fontSize: 20,
      paddingLeft: 8
    }
  },
  teamNameWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "flex-start",
    backgroundColor: "white"
  },
  teamsWrapper: {
    width: "calc(100% - 1px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: `1px solid ${grey[300]}`,
    margin: "24px 0"
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
    const { classes, teamID } = this.props;
    const { name, emblemURL } = this.props.ourTeam;
    const { opponents } = this.state;

    let commentary = "";
    let ourTotalPoints = 0;
    _.toPairs(opponents).map(([opponentID, opponentInfo]) => {
      ourTotalPoints =
        opponentInfo.ourScore && opponentInfo.ourScore.totalPoints;
      commentary = opponentInfo.commentary || "";
    });

    let scores = [{ id: teamID, score: ourTotalPoints }];

    _.toPairs(opponents).map(([opponentID, opponentInfo]) => {
      scores.push({
        id: opponentID,
        score: opponentInfo.theirScore.totalPoints
      });
    });

    scores.sort((scoreA, scoreB) => {
      if (scoreA.score > scoreB.score) {
        return -1;
      } else if (scoreA.score < scoreB.score) {
        return +1;
      } else {
        return 0;
      }
    });

    let placement = 1;
    let prevScore = scores[0].score;
    const placements = _.fromPairs(
      scores.map((score, index) => {
        if (index === 0) {
          prevScore = score.score;
          return [score.id, placement];
        } else {
          if (score.score === prevScore) {
            prevScore = score.score;
            return [score.id, placement];
          } else {
            placement = index + 1;
            prevScore = score.score;
            return [score.id, placement];
          }
        }
      })
    );

    const teamsList = scores.map(score => {
      let statusStyle = "";
      let resultText = "";
      switch (placements[score.id]) {
        case 1:
          statusStyle = classes.placedFirst;
          resultText = "1st";
          break;
        case 2:
          statusStyle = classes.placedSecond;
          resultText = "2nd";
          break;
        case 3:
          statusStyle = classes.placedThird;
          resultText = "3rd";
          break;
        default:
          let suffix = "th";
          if (placements[score.id] > 20) {
            if (placements[score.id] % 10 === 1) {
              suffix = "st";
            } else if (placements[score.id] % 10 === 2) {
              suffix = "nd";
            } else if (placements[score.id] % 10 === 3) {
              suffix = "rd";
            }
          }
          statusStyle = classes.placedOther;
          resultText = `${placements[score.id]}${suffix}`;
          break;
      }

      if (score.id === teamID) {
        return (
          <div key={`resultInfo-${teamID}-${score.id}`}>
            <div className={statusStyle}>{resultText}</div>
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
              <div className={classes.goalsWrapper}>
                <Typography type="title" component="p">
                  {isNaN(ourTotalPoints) ? "?" : ourTotalPoints}
                </Typography>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div key={`resultInfo-${teamID}-${score.id}`}>
            <div className={statusStyle}>{resultText}</div>
            <div className={classes.teamNameWrapper}>
              <Avatar src={defaultEmblemURL} className={classes.emblems} />
              <Typography
                type="subheading"
                component="p"
                className={classes.teamName}
              >
                {opponents[score.id].name === ""
                  ? "Unknown"
                  : opponents[score.id].name}
              </Typography>
              <div className={classes.goalsWrapper}>
                <Typography type="title" component="p">
                  {isNaN(score.score) ? "?" : score.score}
                </Typography>
              </div>
            </div>
          </div>
        );
      }
    });

    return (
      <div key={`result-${teamID}`} className={classes.wrapper}>
        <Paper className={classes.teamsWrapper}>
          <div className={classes.pointsWrapper}>{teamsList}</div>
          {commentary !== "" && (
            <div className={classes.commentaryWrapper}>
              <div className={classes.commentaryInnerWrapper}>
                <Typography
                  type="subheading"
                  component="p"
                  className={classes.commentaryHeading}
                >
                  {"Additional Commentary"}
                </Typography>
                <Typography type="body1" component="p">
                  {commentary}
                </Typography>
              </div>
            </div>
          )}
        </Paper>
      </div>
    );
  }

  renderDesktop() {
    const { classes, teamID } = this.props;
    const { name, emblemURL } = this.props.ourTeam;
    const { opponents } = this.state;

    let commentary = "";
    let ourTotalPoints = 0;
    _.toPairs(opponents).map(([opponentID, opponentInfo]) => {
      ourTotalPoints =
        opponentInfo.ourScore && opponentInfo.ourScore.totalPoints;
      commentary = opponentInfo.commentary || "";
    });

    let scores = [{ id: teamID, score: ourTotalPoints }];

    _.toPairs(opponents).map(([opponentID, opponentInfo]) => {
      scores.push({
        id: opponentID,
        score: opponentInfo.theirScore.totalPoints
      });
    });

    scores.sort((scoreA, scoreB) => {
      if (scoreA.score > scoreB.score) {
        return -1;
      } else if (scoreA.score < scoreB.score) {
        return +1;
      } else {
        return 0;
      }
    });

    let placement = 1;
    let prevScore = scores[0].score;
    const placements = _.fromPairs(
      scores.map((score, index) => {
        if (index === 0) {
          prevScore = score.score;
          return [score.id, placement];
        } else {
          if (score.score === prevScore) {
            prevScore = score.score;
            return [score.id, placement];
          } else {
            placement = index + 1;
            prevScore = score.score;
            return [score.id, placement];
          }
        }
      })
    );

    const teamsList = scores.map(score => {
      let statusStyle = "";
      let resultText = "";
      switch (placements[score.id]) {
        case 1:
          statusStyle = classes.placedFirst;
          resultText = "1st";
          break;
        case 2:
          statusStyle = classes.placedSecond;
          resultText = "2nd";
          break;
        case 3:
          statusStyle = classes.placedThird;
          resultText = "3rd";
          break;
        default:
          let suffix = "th";
          if (placements[score.id] > 20) {
            if (placements[score.id] % 10 === 1) {
              suffix = "st";
            } else if (placements[score.id] % 10 === 2) {
              suffix = "nd";
            } else if (placements[score.id] % 10 === 3) {
              suffix = "rd";
            }
          }
          statusStyle = classes.placedOther;
          resultText = `${placements[score.id]}${suffix}`;
          break;
      }

      if (score.id === teamID) {
        return (
          <div key={`resultsInfo-${teamID}-${score.id}`}>
            <div className={statusStyle}>{resultText}</div>
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
              <div className={classes.goalsWrapper}>
                <Typography type="title" component="p">
                  {isNaN(ourTotalPoints) ? "?" : ourTotalPoints}
                </Typography>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div key={`resultsInfo-${teamID}-${score.id}`}>
            <div className={statusStyle}>{resultText}</div>
            <div className={classes.teamNameWrapper}>
              <Avatar src={defaultEmblemURL} className={classes.emblems} />
              <Typography
                type="subheading"
                component="p"
                className={classes.teamName}
              >
                {opponents[score.id].name === ""
                  ? "Unknown"
                  : opponents[score.id].name}
              </Typography>
              <div className={classes.goalsWrapper}>
                <Typography type="title" component="p">
                  {isNaN(score.score) ? "?" : score.score}
                </Typography>
              </div>
            </div>
          </div>
        );
      }
    });

    return (
      <div key={`result-${teamID}`} className={classes.wrapper}>
        <Paper className={classes.teamsWrapper}>
          <div className={classes.pointsWrapper}>{teamsList}</div>
          {commentary !== "" && (
            <div className={classes.commentaryWrapper}>
              <div className={classes.commentaryInnerWrapper}>
                <Typography
                  type="subheading"
                  component="p"
                  className={classes.commentaryHeading}
                >
                  {"Additional Commentary"}
                </Typography>
                <Typography type="body1" component="p">
                  {commentary}
                </Typography>
              </div>
            </div>
          )}
        </Paper>
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
