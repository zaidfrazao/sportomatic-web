import React, { Component } from "react";
import injectStyles from "react-jss";
import moment from "moment";
import {
  common,
  green,
  grey,
  lightBlue,
  red
} from "../../../../../../utils/colours";
import defaultEmblem from "./images/default-emblem.jpg";

const styles = {
  dateWrapper: {
    margin: "24px 0 8px 0",
    padding: "0 12px",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center"
  },
  emblem: {
    margin: "0 12px",
    borderRadius: "50%",
    backgroundColor: grey[300],
    width: 32,
    height: 32
  },
  header: {
    borderBottom: `1px solid ${grey[300]}`,
    fontSize: 18,
    borderRadius: "16px 16px 0 0",
    padding: 24,
    textAlign: "center",
    fontWeight: "bold",
    color: common["white"],
    backgroundColor: lightBlue[800]
  },
  homeAwayIndicator: {
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 4
  },
  resultDraw: {
    textAlign: "center",
    color: common["white"],
    backgroundColor: lightBlue[500],
    padding: 12
  },
  resultLoss: {
    textAlign: "center",
    color: common["white"],
    backgroundColor: red[500],
    padding: 12
  },
  resultWin: {
    textAlign: "center",
    color: common["white"],
    backgroundColor: green[500],
    padding: 12
  },
  timeWrapper: {
    textAlign: "center",
    color: grey[700],
    flexGrow: 1,
    fontSize: 20
  },
  startEndWrapper: {
    width: "100%",
    maxWidth: 260,
    margin: "0 auto",
    marginBottom: 24,
    display: "flex",
    alignItems: "center"
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
  scoreBottomRightWrapper: {
    borderRadius: "0 0 16px 0",
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
  wrapper: {
    transition: "0.25s",
    cursor: "pointer",
    border: `1px solid ${grey[300]}`,
    borderRadius: 16,
    backgroundColor: common["white"],
    "&:hover": {
      boxShadow:
        "0 0px 0px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
    }
  }
};

class EventCard extends Component {
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
      title,
      date,
      times,
      viewEventInfo
    } = this.props;

    const result = this.getResult();
    const scores = this.getScores();
    const formattedTimes = {
      start: moment(times.start).format("hh:mm A"),
      end: moment(times.end).format("hh:mm A")
    };

    return (
      <div className={classes.wrapper} onClick={() => viewEventInfo()}>
        <div className={classes.header}>{title}</div>
        <div className={classes.dateWrapper}>{date}</div>
        <div className={classes.startEndWrapper}>
          <div className={classes.timeWrapper}>{formattedTimes.start}</div>
          <div className={classes.timesSeparator}>-</div>
          <div className={classes.timeWrapper}>{formattedTimes.end}</div>
        </div>
        <div className={classes.scoresWrapper}>
          <div className={result.style}>{result.text}</div>
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
              <div className={classes.score}>{scores.homeTeam}</div>
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
            <div className={classes.scoreBottomRightWrapper}>
              <div className={classes.score}>{scores.awayTeam}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default injectStyles(styles)(EventCard);
