// @flow
import React, { Component } from "react";
import Avatar from "material-ui/Avatar";
import Button from "material-ui/Button";
import Card, { CardActions, CardHeader } from "material-ui/Card";
import { blue, grey, green, red } from "material-ui/colors";
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
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  flexGrow: {
    flex: "1 1 auto"
  },
  gridItem: {
    width: "25%",
    padding: 24,
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
    width: "25%",
    padding: 24,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  goalsWrapper: {
    width: "15%",
    padding: 24,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  statName: {
    flexGrow: 1,
    textAlign: "center"
  },
  statsWrapper: {
    backgroundColor: grey[50],
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  subheadingWrapper: {
    backgroundColor: grey[100],
    width: "100%",
    textAlign: "center",
    padding: "24px 0"
  },
  teamsWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row"
  },
  vsText: {
    width: "100%",
    textAlign: "center"
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
    teamsGridItem: string,
    teamsWrapper: string,
    vsText: string,
    wrapper: string
  },
  eventInfo: {
    title: string,
    date: string
  },
  isMobile: boolean,
  ourTeamInfo: {
    name: string,
    institutionEmblemURL: string,
    goals: number
  },
  theirTeamInfo: {
    name: string,
    institutionEmblemURL: string,
    goals: number
  }
};

class SoccerResultsCard extends Component<Props> {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const {
      classes,
      ourTeamInfo,
      theirTeamInfo,
      isMobile,
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
                className={classes.vsText}
              >
                {isMobile ? ourTeamInfo.abbreviation : ourTeamInfo.name}
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
                className={classes.vsText}
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
                className={classes.vsText}
              >
                {isMobile ? theirTeamInfo.abbreviation : theirTeamInfo.name}
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

export default withStyles(styles)(SoccerResultsCard);
