// @flow
import React, { Component } from "react";
import Avatar from "material-ui/Avatar";
import Button from "material-ui/Button";
import Card, { CardActions, CardHeader } from "material-ui/Card";
import Collapse from "material-ui/transitions/Collapse";
import classnames from "classnames";
import DownIcon from "material-ui-icons/ExpandMore";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import { grey } from "material-ui/colors";
import IconButton from "material-ui/IconButton";
import LeftIcon from "material-ui-icons/ChevronLeft";
import RightIcon from "material-ui-icons/ChevronRight";
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
  gridItem: {
    width: "25%",
    padding: 24,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
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
    startTime: string,
    endTime: string
  },
  isMobile: boolean,
  ourTeamInfo: {
    abbreviation: string,
    name: string,
    institutionEmblemURL: string,
    goals: number
  },
  theirTeamInfo: {
    abbreviation: string,
    name: string,
    institutionEmblemURL: string,
    goals: number
  }
};

class SoccerScorer extends Component<Props> {
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
      eventInfo
    } = this.props;

    return (
      <div className={classes.wrapper}>
        <Card>
          <CardHeader
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
                className={classes.vsText}
              >
                {isMobile ? ourTeamInfo.abbreviation : ourTeamInfo.name}
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
                className={classes.vsText}
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
                className={classes.vsText}
              >
                {isMobile ? theirTeamInfo.abbreviation : theirTeamInfo.name}
              </Typography>
            </div>
          </div>
          <CardActions disableActionSpacing>
            <Button>Finalise scores</Button>
            <div className={classes.flexGrow} />
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
          </CardActions>
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
                  {ourTeamInfo.fouls}
                </Typography>
                <IconButton aria-label="Increment fouls">
                  <RightIcon />
                </IconButton>
              </div>
              <div className={classes.statName}>
                <Typography type="subheading" component="h4">
                  Fouls
                </Typography>
              </div>
              <div className={classes.gridItem}>
                <IconButton aria-label="Decrement fouls">
                  <LeftIcon />
                </IconButton>
                <Typography type="title" component="p">
                  {theirTeamInfo.fouls}
                </Typography>
                <IconButton aria-label="Increment fouls">
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
                <IconButton aria-label="Decrement offsides">
                  <LeftIcon />
                </IconButton>
                <Typography type="title" component="p">
                  {ourTeamInfo.offsides}
                </Typography>
                <IconButton aria-label="Increment offsides">
                  <RightIcon />
                </IconButton>
              </div>
              <div className={classes.statName}>
                <Typography type="subheading" component="h4">
                  Offsides
                </Typography>
              </div>
              <div className={classes.gridItem}>
                <IconButton aria-label="Decrement offsides">
                  <LeftIcon />
                </IconButton>
                <Typography type="title" component="p">
                  {theirTeamInfo.offsides}
                </Typography>
                <IconButton aria-label="Increment offsides">
                  <RightIcon />
                </IconButton>
              </div>
            </div>
            <div className={classes.statsWrapper}>
              <div className={classes.gridItem}>
                <IconButton aria-label="Decrement corners">
                  <LeftIcon />
                </IconButton>
                <Typography type="title" component="p">
                  {ourTeamInfo.corners}
                </Typography>
                <IconButton aria-label="Increment corners">
                  <RightIcon />
                </IconButton>
              </div>
              <div className={classes.statName}>
                <Typography type="subheading" component="h4">
                  Corners
                </Typography>
              </div>
              <div className={classes.gridItem}>
                <IconButton aria-label="Decrement corners">
                  <LeftIcon />
                </IconButton>
                <Typography type="title" component="p">
                  {theirTeamInfo.corners}
                </Typography>
                <IconButton aria-label="Increment corners">
                  <RightIcon />
                </IconButton>
              </div>
            </div>
          </Collapse>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(SoccerScorer);
