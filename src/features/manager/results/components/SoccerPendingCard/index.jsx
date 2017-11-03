// @flow
import React, { Component } from "react";
import Avatar from "material-ui/Avatar";
import { blue, grey, green, red } from "material-ui/colors";
import Button from "material-ui/Button";
import Card, { CardActions, CardHeader } from "material-ui/Card";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  centerSpace: {
    width: "10%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
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
    width: "calc(100% - 48px)",
    padding: 24,
    textAlign: "center"
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
    width: "100%",
    display: "flex",
    flexDirection: "row"
  },
  win: {
    backgroundColor: green[500],
    color: grey[50],
    width: "calc(100% - 48px)",
    padding: 24,
    textAlign: "center"
  },
  wrapper: {
    padding: 24
  }
});

type Props = {
  classes: {
    centerSpace: string,
    draw: string,
    emblems: string,
    goalsWrapper: string,
    loss: string,
    teamName: string,
    teamNameWrapper: string,
    teamsWrapper: string,
    win: string,
    wrapper: string
  },
  eventInfo: {
    title: string,
    date: string
  },
  ourTeamInfo: {
    name: string,
    institutionEmblemURL: string,
    goals: number
  },
  resultStatus: "WIN" | "LOSS" | "DRAW",
  theirTeamInfo: {
    name: string,
    institutionEmblemURL: string,
    goals: number
  }
};

class SoccerPendingCard extends Component<Props> {
  render() {
    const {
      classes,
      ourTeamInfo,
      theirTeamInfo,
      eventInfo,
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
        <Card>
          <CardHeader title={eventInfo.title} subheader={eventInfo.date} />
          <div className={statusStyle}>{resultStatus}</div>
          <div className={classes.teamsWrapper}>
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
                {ourTeamInfo.goals}
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
                {theirTeamInfo.goals}
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
          </div>
          <CardActions>
            <Button color="primary">Approve</Button>
            <Button>View stats</Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(SoccerPendingCard);
