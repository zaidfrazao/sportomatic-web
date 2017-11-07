// @flow
import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import Avatar from "material-ui/Avatar";
import Button from "material-ui/Button";
import { grey } from "material-ui/colors";
import IconButton from "material-ui/IconButton";
import LeftIcon from "material-ui-icons/ChevronLeft";
import RightIcon from "material-ui-icons/ChevronRight";
import Paper from "material-ui/Paper";
import { Route } from "react-router-dom";
import TextField from "material-ui/TextField";
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
  contentWrapper: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "auto"
  },
  emblems: {
    width: 48,
    margin: 10,
    height: "auto"
  },
  eventName: {
    margin: 24,
    width: "calc(100% - 48px)",
    textAlign: "center"
  },
  goalsWrapper: {
    width: "40%",
    display: "flex",
    flexDirection: "row",
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
  scoreWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column"
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
  teamName: {
    width: "100%",
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
  wrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  }
});

type Props = {
  ad: React.Node,
  classes: {
    adWrapper: string,
    backButton: string,
    contentWrapper: string,
    emblems: string,
    eventName: string,
    goalsWrapper: string,
    gridItem: string,
    infoWrapper: string,
    scoreWrapper: string,
    statName: string,
    statsWrapper: string,
    subheadingWrapper: string,
    teamName: string,
    teamNameWrapper: string,
    teamsWrapper: string,
    wrapper: string
  },
  eventInfo: {
    title: string,
    startTime: string,
    endTime: string
  },
  ourTeamInfo: {
    name: string,
    institutionEmblemURL: string,
    goals: number,
    shots: number,
    fouls: number,
    yellowCards: number,
    redCards: number,
    shotsOnTarget: number,
    offsides: number,
    corners: number
  },
  theirTeamInfo: {
    name: string,
    institutionEmblemURL: string,
    goals: number,
    shots: number,
    fouls: number,
    yellowCards: number,
    redCards: number,
    shotsOnTarget: number,
    offsides: number,
    corners: number
  }
};

type State = {
  hasStats: boolean
};

class MobileSoccerResult extends Component<Props, State> {
  render() {
    const { classes, ourTeamInfo, theirTeamInfo, eventTitle, ad } = this.props;

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
            <Paper className={classes.scoreWrapper}>
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
                  <IconButton aria-label="Increment goals">
                    <LeftIcon />
                  </IconButton>
                  <Typography type="headline" component="p">
                    {ourTeamInfo.goals}
                  </Typography>
                  <IconButton aria-label="Decrement goals">
                    <RightIcon />
                  </IconButton>
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
                  <IconButton aria-label="Increment goals">
                    <LeftIcon />
                  </IconButton>
                  <Typography type="headline" component="p">
                    {theirTeamInfo.goals}
                  </Typography>
                  <IconButton aria-label="Decrement goals">
                    <RightIcon />
                  </IconButton>
                </div>
              </div>
            </Paper>
            <div className={classes.adWrapper}>{ad}</div>
            <Paper>
              <div className={classes.subheadingWrapper}>
                <Typography type="title" component="h3">
                  Stats
                </Typography>
              </div>
              <div className={classes.statsWrapper}>
                <div className={classes.gridItem}>
                  <TextField
                    value={ourTeamInfo.shots}
                    type="number"
                    margin="normal"
                  />
                </div>
                <div className={classes.statName}>
                  <Typography type="subheading" component="h4">
                    Shots
                  </Typography>
                </div>
                <div className={classes.gridItem}>
                  <TextField
                    value={theirTeamInfo.shots}
                    type="number"
                    margin="normal"
                  />
                </div>
              </div>
              <div className={classes.statsWrapper}>
                <div className={classes.gridItem}>
                  <TextField
                    value={ourTeamInfo.shotsOnTarget}
                    type="number"
                    margin="normal"
                  />
                </div>
                <div className={classes.statName}>
                  <Typography type="subheading" component="h4">
                    Shots on target
                  </Typography>
                </div>
                <div className={classes.gridItem}>
                  <TextField
                    value={theirTeamInfo.shotsOnTarget}
                    type="number"
                    margin="normal"
                  />
                </div>
              </div>
              <div className={classes.statsWrapper}>
                <div className={classes.gridItem}>
                  <TextField
                    value={ourTeamInfo.fouls}
                    type="number"
                    margin="normal"
                  />
                </div>
                <div className={classes.statName}>
                  <Typography type="subheading" component="h4">
                    Fouls
                  </Typography>
                </div>
                <div className={classes.gridItem}>
                  <TextField
                    value={theirTeamInfo.fouls}
                    type="number"
                    margin="normal"
                  />
                </div>
              </div>
              <div className={classes.statsWrapper}>
                <div className={classes.gridItem}>
                  <TextField
                    value={ourTeamInfo.yellowCards}
                    type="number"
                    margin="normal"
                  />
                </div>
                <div className={classes.statName}>
                  <Typography type="subheading" component="h4">
                    Yellow cards
                  </Typography>
                </div>
                <div className={classes.gridItem}>
                  <TextField
                    value={theirTeamInfo.yellowCards}
                    type="number"
                    margin="normal"
                  />
                </div>
              </div>
              <div className={classes.statsWrapper}>
                <div className={classes.gridItem}>
                  <TextField
                    value={ourTeamInfo.redCards}
                    type="number"
                    margin="normal"
                  />
                </div>
                <div className={classes.statName}>
                  <Typography type="subheading" component="h4">
                    Red cards
                  </Typography>
                </div>
                <div className={classes.gridItem}>
                  <TextField
                    value={theirTeamInfo.redCards}
                    type="number"
                    margin="normal"
                  />
                </div>
              </div>
              <div className={classes.statsWrapper}>
                <div className={classes.gridItem}>
                  <TextField
                    value={ourTeamInfo.offsides}
                    type="number"
                    margin="normal"
                  />
                </div>
                <div className={classes.statName}>
                  <Typography type="subheading" component="h4">
                    Offsides
                  </Typography>
                </div>
                <div className={classes.gridItem}>
                  <TextField
                    value={theirTeamInfo.offsides}
                    type="number"
                    margin="normal"
                  />
                </div>
              </div>
              <div className={classes.statsWrapper}>
                <div className={classes.gridItem}>
                  <TextField
                    value={ourTeamInfo.corners}
                    type="number"
                    margin="normal"
                  />
                </div>
                <div className={classes.statName}>
                  <Typography type="subheading" component="h4">
                    Corners
                  </Typography>
                </div>
                <div className={classes.gridItem}>
                  <TextField
                    value={theirTeamInfo.corners}
                    type="number"
                    margin="normal"
                  />
                </div>
              </div>
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(MobileSoccerResult);
