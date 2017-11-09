// @flow
import React, { Component } from "react";
import Avatar from "material-ui/Avatar";
import Card, { CardActions, CardHeader } from "material-ui/Card";
import classnames from "classnames";
import Collapse from "material-ui/transitions/Collapse";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import { FormControlLabel, FormGroup } from "material-ui/Form";
import { grey } from "material-ui/colors";
import IconButton from "material-ui/IconButton";
import Switch from "material-ui/Switch";
import TextField from "material-ui/TextField";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  emblems: {
    width: 48,
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
    padding: 24
  }
});

type Props = {
  classes: {
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
    abbreviation: string,
    institutionEmblemURL: string,
    score: number,
    tries: number,
    conversions: number,
    penalties: number,
    dropKicks: number,
    redCards: number,
    yellowCards: number
  },
  theirTeamInfo: {
    abbreviation: string,
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

type State = {
  expanded: boolean,
  hasStats: boolean
};

class MobileScorer extends Component<Props, State> {
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
              <Typography type="title" component="p">
                {ourTeamInfo.abbreviation}
              </Typography>
            </div>
            <div className={classes.goalsWrapper}>
              <Typography type="headline" component="p">
                {ourTeamInfo.score}
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
                {theirTeamInfo.score}
              </Typography>
            </div>
          </div>
          <div className={classes.statsWrapper}>
            <div className={classes.gridItem}>
              <TextField
                value={ourTeamInfo.tries}
                type="number"
                margin="normal"
              />
            </div>
            <div className={classes.statName}>
              <Typography type="subheading" component="h4">
                Tries
              </Typography>
            </div>
            <div className={classes.gridItem}>
              <TextField
                value={theirTeamInfo.tries}
                type="number"
                margin="normal"
              />
            </div>
          </div>
          <div className={classes.statsWrapper}>
            <div className={classes.gridItem}>
              <TextField
                value={ourTeamInfo.conversions}
                type="number"
                margin="normal"
              />
            </div>
            <div className={classes.statName}>
              <Typography type="subheading" component="h4">
                Conversions
              </Typography>
            </div>
            <div className={classes.gridItem}>
              <TextField
                value={theirTeamInfo.conversions}
                type="number"
                margin="normal"
              />
            </div>
          </div>
          <div className={classes.statsWrapper}>
            <div className={classes.gridItem}>
              <TextField
                value={ourTeamInfo.penalties}
                type="number"
                margin="normal"
              />
            </div>
            <div className={classes.statName}>
              <Typography type="subheading" component="h4">
                Penalties
              </Typography>
            </div>
            <div className={classes.gridItem}>
              <TextField
                value={theirTeamInfo.penalties}
                type="number"
                margin="normal"
              />
            </div>
          </div>
          <div className={classes.statsWrapper}>
            <div className={classes.gridItem}>
              <TextField
                value={ourTeamInfo.dropKicks}
                type="number"
                margin="normal"
              />
            </div>
            <div className={classes.statName}>
              <Typography type="subheading" component="h4">
                Drop kicks
              </Typography>
            </div>
            <div className={classes.gridItem}>
              <TextField
                value={theirTeamInfo.dropKicks}
                type="number"
                margin="normal"
              />
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
            </Collapse>
          )}
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(MobileScorer);
