// @flow
import React, { Component } from "react";
import type { Node } from "react";
import AppBar from "material-ui/AppBar";
import Avatar from "material-ui/Avatar";
import { blue, grey, green, red } from "material-ui/colors";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import LeftIcon from "material-ui-icons/ChevronLeft";
import Paper from "material-ui/Paper";
import RightIcon from "material-ui-icons/ChevronRight";
import { Route } from "react-router-dom";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  adWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  backButton: {
    margin: 24,
    width: "calc(100% - 48px)",
    "@media (min-width: 600px)": {
      width: 48
    }
  },
  centerSpace: {
    width: "10%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  contentWrapper: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "auto"
  },
  draw: {
    backgroundColor: blue[500],
    color: grey[50],
    width: "calc(100% - 48px)",
    padding: 24,
    textAlign: "center"
  },
  emblems: {
    width: "80%",
    maxWidth: 100,
    margin: 10,
    height: "auto"
  },
  eventName: {
    margin: 24,
    width: "calc(100% - 48px)",
    textAlign: "center"
  },
  flexGrow: {
    flex: "1 1 auto"
  },
  goalsWrapper: {
    width: "calc(15% - 48px)",
    padding: 24,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  gridItem: {
    width: "25%",
    padding: 24,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  infoWrapper: {
    flexGrow: 1,
    padding: "0 24px 24px 24px"
  },
  loss: {
    backgroundColor: red[500],
    color: grey[50],
    width: "calc(100% - 48px)",
    padding: 24,
    textAlign: "center"
  },
  mainStatsWrapper: {
    marginBottom: 24
  },
  statName: {
    flexGrow: 1,
    textAlign: "center"
  },
  statsToggle: {
    margin: "0 24px"
  },
  statsWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  subheadingWrapper: {
    backgroundColor: grey[50],
    width: "100%",
    textAlign: "center",
    padding: "24px 0"
  },
  teamName: {
    width: "100%",
    textAlign: "center"
  },
  teamNameWrapper: {
    width: "calc(30% - 48px)",
    padding: 24,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  teamsWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  win: {
    backgroundColor: green[500],
    color: grey[50],
    width: "calc(100% - 48px)",
    padding: 24,
    textAlign: "center"
  },
  wrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  }
});

type Props = {
  ad: Node,
  classes: {
    adWrapper: string,
    backButton: string,
    centerSpace: string,
    contentWrapper: string,
    draw: string,
    emblems: string,
    eventName: string,
    flexGrow: string,
    goalsWrapper: string,
    gridItem: string,
    infoWrapper: string,
    loss: string,
    mainStatsWrapper: string,
    statName: string,
    statsToggle: string,
    statsWrapper: string,
    subheadingWrapper: string,
    teamName: string,
    teamNameWrapper: string,
    teamsWrapper: string,
    win: string,
    wrapper: string
  },
  eventTitle: string,
  ourTeamInfo: {
    name: string,
    institutionEmblemURL: string,
    score: number,
    tries: number,
    conversions: number,
    penalties: number,
    dropKicks: number,
    redCards: number,
    yellowCards: number
  },
  resultStatus: "WIN" | "LOSS" | "DRAW",
  theirTeamInfo: {
    name: string,
    institutionEmblemURL: string,
    score: number,
    tries: number,
    conversions: number,
    penalties: number,
    dropKicks: number,
    redCards: number,
    yellowCards: number
  }
};

class Result extends Component<Props> {
  render() {
    const {
      classes,
      ourTeamInfo,
      theirTeamInfo,
      eventTitle,
      ad,
      resultStatus
    } = this.props;

    let statusStyle = classes.draw;
    if (resultStatus === "WIN") {
      statusStyle = classes.win;
    } else if (resultStatus === "LOSS") {
      statusStyle = classes.loss;
    }

    return (
      <div className={classes.wrapper}>
        <AppBar position="static" color="default">
          <Typography type="title" component="h2" className={classes.eventName}>
            {eventTitle} Results
          </Typography>
        </AppBar>
        <div className={classes.contentWrapper}>
          <Route
            render={({ history }) => (
              <Button
                raised
                className={classes.backButton}
                onClick={() => history.goBack()}
              >
                Back
              </Button>
            )}
          />
          <div className={classes.infoWrapper}>
            <Paper className={classes.teamsWrapper}>
              <div className={statusStyle}>{resultStatus}</div>
              <div className={classes.teamNameWrapper}>
                <Avatar
                  src={ourTeamInfo.institutionEmblemURL}
                  className={classes.emblems}
                />
                <Typography
                  type="headline"
                  component="p"
                  className={classes.teamName}
                >
                  {ourTeamInfo.name}
                </Typography>
              </div>
              <div className={classes.goalsWrapper}>
                <Typography type="display4" component="p">
                  {ourTeamInfo.score}
                </Typography>
              </div>
              <div className={classes.centerSpace}>
                <Typography
                  type="display4"
                  component="p"
                  className={classes.teamName}
                >
                  -
                </Typography>
              </div>
              <div className={classes.goalsWrapper}>
                <Typography type="display4" component="p">
                  {theirTeamInfo.score}
                </Typography>
              </div>
              <div className={classes.teamNameWrapper}>
                <Avatar
                  src={theirTeamInfo.institutionEmblemURL}
                  className={classes.emblems}
                />
                <Typography
                  type="headline"
                  component="p"
                  className={classes.teamName}
                >
                  {theirTeamInfo.name}
                </Typography>
              </div>
            </Paper>
            <div className={classes.adWrapper}>{ad}</div>
            <Paper className={classes.mainStatsWrapper}>
              <div className={classes.statsWrapper}>
                <div className={classes.gridItem}>
                  <IconButton aria-label="Decrement tries">
                    <LeftIcon />
                  </IconButton>
                  <Typography type="title" component="p">
                    {ourTeamInfo.tries}
                  </Typography>
                  <IconButton aria-label="Increment tries">
                    <RightIcon />
                  </IconButton>
                </div>
                <div className={classes.statName}>
                  <Typography type="subheading" component="h4">
                    Tries
                  </Typography>
                </div>
                <div className={classes.gridItem}>
                  <IconButton aria-label="Decrement tries">
                    <LeftIcon />
                  </IconButton>
                  <Typography type="title" component="p">
                    {theirTeamInfo.tries}
                  </Typography>
                  <IconButton aria-label="Increment tries">
                    <RightIcon />
                  </IconButton>
                </div>
              </div>
              <div className={classes.statsWrapper}>
                <div className={classes.gridItem}>
                  <IconButton aria-label="Decrement conversions">
                    <LeftIcon />
                  </IconButton>
                  <Typography type="title" component="p">
                    {ourTeamInfo.conversions}
                  </Typography>
                  <IconButton aria-label="Increment conversions">
                    <RightIcon />
                  </IconButton>
                </div>
                <div className={classes.statName}>
                  <Typography type="subheading" component="h4">
                    Conversions
                  </Typography>
                </div>
                <div className={classes.gridItem}>
                  <IconButton aria-label="Decrement conversions">
                    <LeftIcon />
                  </IconButton>
                  <Typography type="title" component="p">
                    {theirTeamInfo.conversions}
                  </Typography>
                  <IconButton aria-label="Increment conversions">
                    <RightIcon />
                  </IconButton>
                </div>
              </div>
              <div className={classes.statsWrapper}>
                <div className={classes.gridItem}>
                  <IconButton aria-label="Decrement penalties">
                    <LeftIcon />
                  </IconButton>
                  <Typography type="title" component="p">
                    {ourTeamInfo.penalties}
                  </Typography>
                  <IconButton aria-label="Increment penalties">
                    <RightIcon />
                  </IconButton>
                </div>
                <div className={classes.statName}>
                  <Typography type="subheading" component="h4">
                    Penalties
                  </Typography>
                </div>
                <div className={classes.gridItem}>
                  <IconButton aria-label="Decrement penalties">
                    <LeftIcon />
                  </IconButton>
                  <Typography type="title" component="p">
                    {theirTeamInfo.penalties}
                  </Typography>
                  <IconButton aria-label="Increment penalties">
                    <RightIcon />
                  </IconButton>
                </div>
              </div>
              <div className={classes.statsWrapper}>
                <div className={classes.gridItem}>
                  <IconButton aria-label="Decrement drop kicks">
                    <LeftIcon />
                  </IconButton>
                  <Typography type="title" component="p">
                    {ourTeamInfo.dropKicks}
                  </Typography>
                  <IconButton aria-label="Increment drop kicks">
                    <RightIcon />
                  </IconButton>
                </div>
                <div className={classes.statName}>
                  <Typography type="subheading" component="h4">
                    Drop kicks
                  </Typography>
                </div>
                <div className={classes.gridItem}>
                  <IconButton aria-label="Decrement drop kicks">
                    <LeftIcon />
                  </IconButton>
                  <Typography type="title" component="p">
                    {theirTeamInfo.dropKicks}
                  </Typography>
                  <IconButton aria-label="Increment drop kicks">
                    <RightIcon />
                  </IconButton>
                </div>
              </div>
            </Paper>
            <Paper>
              <div className={classes.subheadingWrapper}>
                <Typography type="title" component="h3">
                  Stats
                </Typography>
              </div>
              <div className={classes.statsWrapper}>
                <div className={classes.gridItem}>
                  <IconButton aria-label="Decrement red cards">
                    <LeftIcon />
                  </IconButton>
                  <Typography type="title" component="p">
                    {ourTeamInfo.redCards}
                  </Typography>
                  <IconButton aria-label="Increment red cards">
                    <RightIcon />
                  </IconButton>
                </div>
                <div className={classes.statName}>
                  <Typography type="subheading" component="h4">
                    Red cards
                  </Typography>
                </div>
                <div className={classes.gridItem}>
                  <IconButton aria-label="Decrement red cards">
                    <LeftIcon />
                  </IconButton>
                  <Typography type="title" component="p">
                    {theirTeamInfo.redCards}
                  </Typography>
                  <IconButton aria-label="Increment red cards">
                    <RightIcon />
                  </IconButton>
                </div>
              </div>
              <div className={classes.statsWrapper}>
                <div className={classes.gridItem}>
                  <IconButton aria-label="Decrement yellow cards">
                    <LeftIcon />
                  </IconButton>
                  <Typography type="title" component="p">
                    {ourTeamInfo.yellowCards}
                  </Typography>
                  <IconButton aria-label="Increment yellow cards">
                    <RightIcon />
                  </IconButton>
                </div>
                <div className={classes.statName}>
                  <Typography type="subheading" component="h4">
                    Yellow cards
                  </Typography>
                </div>
                <div className={classes.gridItem}>
                  <IconButton aria-label="Decrement yellow cards">
                    <LeftIcon />
                  </IconButton>
                  <Typography type="title" component="p">
                    {theirTeamInfo.yellowCards}
                  </Typography>
                  <IconButton aria-label="Increment yellow cards">
                    <RightIcon />
                  </IconButton>
                </div>
              </div>
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Result);
