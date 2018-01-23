import React, { Component } from "react";
import _ from "lodash";
import Avatar from "material-ui/Avatar";
import { grey, green, lightBlue, red } from "material-ui/colors";
import Button from "material-ui/Button";
import { Route } from "react-router";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import defaultEmblemURL from "../../../../images/default-emblem-url.png";

const styles = theme => ({
  centerSpace: {
    width: "10%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  draw: {
    backgroundColor: lightBlue[500],
    color: grey[50],
    width: "100%",
    padding: 24,
    textAlign: "center"
  },
  emblems: {
    width: "80%",
    maxWidth: 100,
    margin: 10,
    height: "auto"
  },
  goalsWrapper: {
    width: "15%",
    padding: 24,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  loss: {
    backgroundColor: red[500],
    color: grey[50],
    width: "100%",
    padding: 24,
    textAlign: "center"
  },
  pointsWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-around"
  },
  startButton: {
    backgroundColor: green[500],
    color: grey[50],
    width: "100%",
    height: 80,
    "&:hover": {
      backgroundColor: green[300]
    }
  },
  teamName: {
    width: "100%",
    textAlign: "center"
  },
  teamNameWrapper: {
    width: "25%",
    padding: 24,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  teamsWrapper: {
    width: "calc(100% - 1px)",
    display: "flex",
    flexDirection: "column",
    backgroundColor: grey[50],
    border: `1px solid ${grey[300]}`
  },
  unknownResult: {
    backgroundColor: grey[900],
    color: grey[50],
    width: "100%",
    padding: 24,
    textAlign: "center"
  },
  viewStatsButton: {
    backgroundColor: grey[200],
    color: grey[900],
    width: "100%",
    "&:hover": {
      backgroundColor: grey[100]
    }
  },
  win: {
    backgroundColor: green[500],
    color: grey[50],
    width: "100%",
    padding: 24,
    textAlign: "center"
  },
  wrapper: {
    width: "100%",
    margin: "16px 0 "
  }
});

class Generic extends Component {
  renderMobile() {
    return <div />;
  }

  renderDesktop() {
    const { classes, teamID, eventID, resultsStatus } = this.props;
    const { name, emblemURL, opponents } = this.props.ourTeam;

    return (
      <div key={`result-${teamID}`} className={classes.wrapper}>
        {_.toPairs(opponents).map(([opponentID, opponentInfo]) => {
          const { ourScore, theirScore } = this.props;
          let statusStyle = classes.unknownResult;
          let resultText = "NO RESULTS LOGGED";
          if (resultsStatus !== "AWAITING_START") {
            if (ourScore.total > theirScore.total) {
              statusStyle = classes.win;
              resultText = "WIN";
            } else if (ourScore.total < theirScore.total) {
              statusStyle = classes.loss;
              resultText = "LOSS";
            } else {
              statusStyle = classes.draw;
              resultText = "DRAW";
            }
          }
          return (
            <div
              key={`result-${teamID}${opponentID}`}
              className={classes.teamsWrapper}
            >
              <div className={statusStyle}>{resultText}</div>
              <div className={classes.pointsWrapper}>
                <div className={classes.teamNameWrapper}>
                  <Avatar
                    src={emblemURL === "" ? defaultEmblemURL : emblemURL}
                    className={classes.emblems}
                  />
                  <Typography
                    type="title"
                    component="p"
                    className={classes.teamName}
                  >
                    {name}
                  </Typography>
                </div>
                {resultsStatus === "AWAITING_START" && (
                  <div className={classes.goalsWrapper}>
                    <Typography type="display2" component="p">
                      {resultsStatus === "AWAITING_START" ? 0 : ourScore.total}
                    </Typography>
                  </div>
                )}
                <div className={classes.centerSpace}>
                  <Typography
                    type="display1"
                    component="p"
                    className={classes.teamName}
                  >
                    vs
                  </Typography>
                </div>
                {resultsStatus === "AWAITING_START" && (
                  <div className={classes.goalsWrapper}>
                    <Typography type="display2" component="p">
                      {resultsStatus === "AWAITING_START"
                        ? 0
                        : theirScore.total}
                    </Typography>
                  </div>
                )}
                <div className={classes.teamNameWrapper}>
                  <Avatar src={defaultEmblemURL} className={classes.emblems} />
                  <Typography
                    type="title"
                    component="p"
                    className={classes.teamName}
                  >
                    {opponentInfo.name === "" ? "Unknown" : opponentInfo.name}
                  </Typography>
                </div>
              </div>
            </div>
          );
        })}
        <Button raised className={classes.startButton}>
          log results
        </Button>
        <Route
          render={({ history }) => (
            <Button
              raised
              dense
              color="contrast"
              className={classes.viewStatsButton}
              onClick={() =>
                history.push(`/admin/results/${teamID}/${eventID}`)}
            >
              View stats
            </Button>
          )}
        />
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
