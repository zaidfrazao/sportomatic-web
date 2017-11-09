// @flow
import React, { Component } from "react";
import Avatar from "material-ui/Avatar";
import Card, { CardActions, CardHeader } from "material-ui/Card";
import classnames from "classnames";
import Collapse from "material-ui/transitions/Collapse";
import DownIcon from "material-ui-icons/ExpandMore";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import { FormControlLabel, FormGroup } from "material-ui/Form";
import { grey } from "material-ui/colors";
import IconButton from "material-ui/IconButton";
import LeftIcon from "material-ui-icons/ChevronLeft";
import RightIcon from "material-ui-icons/ChevronRight";
import Switch from "material-ui/Switch";
import Typography from "material-ui/Typography";
import UpIcon from "material-ui-icons/ExpandLess";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  centerSpace: {
    width: "10%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
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
  footer: {
    backgroundColor: grey[100]
  },
  goalsWrapper: {
    width: "15%",
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
  header: {
    backgroundColor: grey[100]
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
  wrapper: {
    padding: 24
  }
});

type Props = {
  classes: {
    centerSpace: string,
    emblems: string,
    expand: string,
    expandOpen: string,
    flexGrow: string,
    footer: string,
    goalsWrapper: string,
    gridItem: string,
    header: string,
    statName: string,
    statsToggle: string,
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
    shotsOnTarget: number,
    freeHits: number,
    greenCards: number,
    yellowCards: number,
    redCards: number,
    longCorners: number,
    shortCorners: number
  },
  theirTeamInfo: {
    name: string,
    institutionEmblemURL: string,
    goals: number,
    shots: number,
    shotsOnTarget: number,
    freeHits: number,
    greenCards: number,
    yellowCards: number,
    redCards: number,
    longCorners: number,
    shortCorners: number
  }
};

type State = {
  expanded: boolean,
  hasStats: boolean
};

class Scorer extends Component<Props, State> {
  state = { expanded: false, hasStats: true };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { classes, ourTeamInfo, theirTeamInfo, eventInfo } = this.props;

    return (
      <div className={classes.wrapper}>
        <Card>
          <CardHeader
            className={classes.header}
            title={eventInfo.title}
            subheader={`${eventInfo.startTime} - ${eventInfo.endTime}`}
          />
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
              <IconButton aria-label="Increment goals">
                <UpIcon />
              </IconButton>
              <Typography type="display4" component="p">
                {ourTeamInfo.goals}
              </Typography>
              <IconButton aria-label="Decrement goals">
                <DownIcon />
              </IconButton>
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
              <IconButton aria-label="Increment goals">
                <UpIcon />
              </IconButton>
              <Typography type="display4" component="p">
                {theirTeamInfo.goals}
              </Typography>
              <IconButton aria-label="Decrement goals">
                <DownIcon />
              </IconButton>
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
          <CardActions disableActionSpacing className={classes.footer}>
            <FormGroup className={classes.statsToggle}>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.hasStats}
                    onChange={(event, checked) =>
                      this.setState({ hasStats: checked })}
                  />
                }
                label="Track stats"
              />
            </FormGroup>
            <div className={classes.flexGrow} />
            {this.state.hasStats && (
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.expanded
                })}
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            )}
          </CardActions>
          {this.state.hasStats && (
            <Collapse
              in={this.state.expanded}
              transitionDuration="auto"
              unmountOnExit
            >
              <div className={classes.subheadingWrapper}>
                <Typography type="title" component="h3">
                  Stats
                </Typography>
              </div>
              <div className={classes.statsWrapper}>
                <div className={classes.gridItem}>
                  <IconButton aria-label="Decrement shots">
                    <LeftIcon />
                  </IconButton>
                  <Typography type="title" component="p">
                    {ourTeamInfo.shots}
                  </Typography>
                  <IconButton aria-label="Increment shots">
                    <RightIcon />
                  </IconButton>
                </div>
                <div className={classes.statName}>
                  <Typography type="subheading" component="h4">
                    Shots
                  </Typography>
                </div>
                <div className={classes.gridItem}>
                  <IconButton aria-label="Decrement shots">
                    <LeftIcon />
                  </IconButton>
                  <Typography type="title" component="p">
                    {theirTeamInfo.shots}
                  </Typography>
                  <IconButton aria-label="Increment shots">
                    <RightIcon />
                  </IconButton>
                </div>
              </div>
              <div className={classes.statsWrapper}>
                <div className={classes.gridItem}>
                  <IconButton aria-label="Decrement shots on target">
                    <LeftIcon />
                  </IconButton>
                  <Typography type="title" component="p">
                    {ourTeamInfo.shotsOnTarget}
                  </Typography>
                  <IconButton aria-label="Increment shots on target">
                    <RightIcon />
                  </IconButton>
                </div>
                <div className={classes.statName}>
                  <Typography type="subheading" component="h4">
                    Shots on target
                  </Typography>
                </div>
                <div className={classes.gridItem}>
                  <IconButton aria-label="Decrement shots on target">
                    <LeftIcon />
                  </IconButton>
                  <Typography type="title" component="p">
                    {theirTeamInfo.shotsOnTarget}
                  </Typography>
                  <IconButton aria-label="Increment shots on target">
                    <RightIcon />
                  </IconButton>
                </div>
              </div>
              <div className={classes.statsWrapper}>
                <div className={classes.gridItem}>
                  <IconButton aria-label="Decrement fouls">
                    <LeftIcon />
                  </IconButton>
                  <Typography type="title" component="p">
                    {ourTeamInfo.freeHits}
                  </Typography>
                  <IconButton aria-label="Increment fouls">
                    <RightIcon />
                  </IconButton>
                </div>
                <div className={classes.statName}>
                  <Typography type="subheading" component="h4">
                    Free hits
                  </Typography>
                </div>
                <div className={classes.gridItem}>
                  <IconButton aria-label="Decrement fouls">
                    <LeftIcon />
                  </IconButton>
                  <Typography type="title" component="p">
                    {theirTeamInfo.freeHits}
                  </Typography>
                  <IconButton aria-label="Increment fouls">
                    <RightIcon />
                  </IconButton>
                </div>
              </div>
              <div className={classes.statsWrapper}>
                <div className={classes.gridItem}>
                  <IconButton aria-label="Decrement green cards">
                    <LeftIcon />
                  </IconButton>
                  <Typography type="title" component="p">
                    {ourTeamInfo.greenCards}
                  </Typography>
                  <IconButton aria-label="Increment green cards">
                    <RightIcon />
                  </IconButton>
                </div>
                <div className={classes.statName}>
                  <Typography type="subheading" component="h4">
                    Green cards
                  </Typography>
                </div>
                <div className={classes.gridItem}>
                  <IconButton aria-label="Decrement green cards">
                    <LeftIcon />
                  </IconButton>
                  <Typography type="title" component="p">
                    {theirTeamInfo.greenCards}
                  </Typography>
                  <IconButton aria-label="Increment green cards">
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
                  <IconButton aria-label="Decrement long corners">
                    <LeftIcon />
                  </IconButton>
                  <Typography type="title" component="p">
                    {ourTeamInfo.longCorners}
                  </Typography>
                  <IconButton aria-label="Increment long corners">
                    <RightIcon />
                  </IconButton>
                </div>
                <div className={classes.statName}>
                  <Typography type="subheading" component="h4">
                    Long corners
                  </Typography>
                </div>
                <div className={classes.gridItem}>
                  <IconButton aria-label="Decrement long corners">
                    <LeftIcon />
                  </IconButton>
                  <Typography type="title" component="p">
                    {theirTeamInfo.longCorners}
                  </Typography>
                  <IconButton aria-label="Increment long corners">
                    <RightIcon />
                  </IconButton>
                </div>
              </div>
              <div className={classes.statsWrapper}>
                <div className={classes.gridItem}>
                  <IconButton aria-label="Decrement short corners">
                    <LeftIcon />
                  </IconButton>
                  <Typography type="title" component="p">
                    {ourTeamInfo.shortCorners}
                  </Typography>
                  <IconButton aria-label="Increment short corners">
                    <RightIcon />
                  </IconButton>
                </div>
                <div className={classes.statName}>
                  <Typography type="subheading" component="h4">
                    Short corners
                  </Typography>
                </div>
                <div className={classes.gridItem}>
                  <IconButton aria-label="Decrement short corners">
                    <LeftIcon />
                  </IconButton>
                  <Typography type="title" component="p">
                    {theirTeamInfo.shortCorners}
                  </Typography>
                  <IconButton aria-label="Increment short corners">
                    <RightIcon />
                  </IconButton>
                </div>
              </div>
            </Collapse>
          )}
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(Scorer);
