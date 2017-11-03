// @flow
import React, { Component } from "react";
import Avatar from "material-ui/Avatar";
import { blue, grey, green, red } from "material-ui/colors";
import Button from "material-ui/Button";
import Card, { CardActions, CardHeader } from "material-ui/Card";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  draw: {
    backgroundColor: blue[500],
    color: grey[50],
    width: "calc(100% - 48px)",
    padding: 24,
    textAlign: "center"
  },
  emblems: {
    width: 48,
    margin: 10,
    height: "auto"
  },
  goalsWrapper: {
    width: "40%",
    display: "flex",
    flexDirection: "row",
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
  teamNameWrapper: {
    width: "60%",
    display: "flex",
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  teamsWrapper: {
    margin: "10px 0",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
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
    draw: string,
    emblems: string,
    goalsWrapper: string,
    loss: string,
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
    abbreviation: string,
    institutionEmblemURL: string,
    goals: number
  },
  resultStatus: "WIN" | "LOSS" | "DRAW",
  theirTeamInfo: {
    abbreviation: string,
    institutionEmblemURL: string,
    goals: number
  }
};

class MobileSoccerPendingCard extends Component<Props> {
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
              <Typography type="title" component="p">
                {ourTeamInfo.abbreviation}
              </Typography>
            </div>
            <div className={classes.goalsWrapper}>
              <Typography type="headline" component="p">
                {ourTeamInfo.goals}
              </Typography>
            </div>
          </div>
          <div className={classes.teamsWrapper}>
            <div className={classes.teamNameWrapper}>
              <Avatar
                src={theirTeamInfo.institutionEmblemURL}
                className={classes.emblems}
              />
              <Typography type="title" component="p">
                {theirTeamInfo.abbreviation}
              </Typography>
            </div>
            <div className={classes.goalsWrapper}>
              <Typography type="headline" component="p">
                {theirTeamInfo.goals}
              </Typography>
            </div>
          </div>
          <CardActions>
            <Button>View stats</Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(MobileSoccerPendingCard);
