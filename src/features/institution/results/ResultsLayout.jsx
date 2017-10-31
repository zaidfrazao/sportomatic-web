// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Tabs, { Tab } from "material-ui/Tabs";
import { Route } from "react-router-dom";
import { CircularProgress } from "material-ui/Progress";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import LeaderboardAd from "../../../components/LeaderboardAd";
import BannerAd from "../../../components/BannerAd";
import LargeMobileBannerAd from "../../../components/LargeMobileBannerAd";
import TeamsList from "./components/TeamsList";

const styles = theme => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  contentWrapper: {
    width: "100%",
    height: "100%"
  },
  tabsWrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  adWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  historyWrapper: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "auto"
  },
  inProgressWrapper: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    "@media (max-width: 960px)": {
      display: "block",
      overflow: "auto"
    }
  },
  historyTableWrapper: {
    flexGrow: 1,
    display: "flex"
  },
  awaitingApprovalWrapper: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    "@media (max-width: 960px)": {
      display: "block"
    }
  },
  eventsAwaitingApprovalWrapper: {
    flexGrow: 1,
    overflow: "auto"
  },
  loaderWrapper: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    margin: 24,
    "@media (max-width: 600px)": {
      width: "calc(100% - 48px)"
    }
  },
  noEventsAwaitingApprovalWrapper: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  coachName: {
    margin: 24,
    width: "calc(100% - 48px)",
    textAlign: "center"
  }
});

class HoursLayout extends Component {
  componentWillMount() {
    const { userID } = this.props;
    const { loadTeams, loadEvents } = this.props.actions;

    loadEvents(userID);
    loadTeams(userID);
  }

  componentWillReceiveProps(nextProps) {
    const { userID } = this.props;
    const { loadTeams, loadEvents } = this.props.actions;

    if (userID !== nextProps.userID) {
      loadTeams(nextProps.userID);
      loadEvents(nextProps.userID);
    }
  }

  renderInProgressTab() {
    const { classes, isTablet, isMobile } = this.props;

    let ad = <LeaderboardAd />;
    if (isMobile) {
      ad = <LargeMobileBannerAd />;
    } else if (isTablet) {
      ad = <BannerAd />;
    }

    return (
      <div className={classes.inProgressWrapper}>
        <div>
          <Route
            render={({ history }) => (
              <Button
                raised
                className={classes.button}
                onClick={() => history.goBack()}
              >
                Back
              </Button>
            )}
          />
        </div>
        {!isMobile && <div className={classes.adWrapper}>{ad}</div>}
      </div>
    );
  }

  renderAwaitingApprovalTab() {
    const { classes, isTablet, isMobile } = this.props;

    let ad = <LeaderboardAd />;
    if (isMobile) {
      ad = <LargeMobileBannerAd />;
    } else if (isTablet) {
      ad = <BannerAd />;
    }

    return (
      <div className={classes.awaitingApprovalWrapper}>
        <div>
          <Route
            render={({ history }) => (
              <Button
                raised
                className={classes.button}
                onClick={() => history.goBack()}
              >
                Back
              </Button>
            )}
          />
        </div>
        {!isMobile && <div className={classes.adWrapper}>{ad}</div>}
      </div>
    );
  }

  renderHistoryTab() {
    const { classes, isMobile, isTablet } = this.props;

    let ad = <LeaderboardAd />;
    if (isMobile) {
      ad = <LargeMobileBannerAd />;
    } else if (isTablet) {
      ad = <BannerAd />;
    }

    return (
      <div className={classes.historyWrapper}>
        <div>
          <Route
            render={({ history }) => (
              <Button
                raised
                className={classes.button}
                onClick={() => history.goBack()}
              >
                Back
              </Button>
            )}
          />
        </div>
        {!isMobile && <div className={classes.adWrapper}>{ad}</div>}
      </div>
    );
  }

  render() {
    const { classes, isMobile, isTablet, teams } = this.props;
    const { isTeamsLoading, isEventsLoading } = this.props.loadingStatus;
    const { currentTab } = this.props.uiConfig;
    const { updateTab } = this.props.actions;
    const { teamID } = this.props.match.params;

    const teamsList = [];

    _.values(
      _.mapValues(teams, (value, key) => {
        teamsList.push({
          ...value,
          id: key,
          name: value.metadata.name,
          sport: value.metadata.sport
        });
      })
    ).sort((teamA, teamB) => {
      if (teamA.name > teamB.name) return +1;
      if (teamA.name < teamB.name) return -1;
      return 0;
    });

    let ad = <LeaderboardAd />;
    if (isMobile) {
      ad = <LargeMobileBannerAd />;
    } else if (isTablet) {
      ad = <BannerAd />;
    }

    return (
      <div className={classes.root}>
        {isTeamsLoading || isEventsLoading ? (
          <div className={classes.loaderWrapper}>
            <CircularProgress />
          </div>
        ) : (
          <div className={classes.contentWrapper}>
            {teams[teamID] ? (
              <div className={classes.tabsWrapper}>
                <AppBar position="static" color="default">
                  <Typography
                    type="title"
                    component="h2"
                    className={classes.coachName}
                  >
                    {teams[teamID].metadata.name}
                  </Typography>
                  <Tabs
                    value={currentTab}
                    onChange={(event, newTab) => updateTab(newTab)}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                  >
                    <Tab label="In Progress" value="IN_PROGRESS" />
                    <Tab label="Pending" value="AWAITING_APPROVAL" />
                    <Tab label="History" value="HISTORY" />
                  </Tabs>
                </AppBar>
                {currentTab === "IN_PROGRESS" && this.renderInProgressTab()}
                {currentTab === "AWAITING_APPROVAL" &&
                  this.renderAwaitingApprovalTab()}
                {currentTab === "HISTORY" && this.renderHistoryTab()}
              </div>
            ) : (
              <div
                className={
                  teamsList.length > 0
                    ? classes.coachesList
                    : classes.coachesListNoCards
                }
              >
                <div className={classes.adWrapper}>{ad}</div>
                <TeamsList teams={teamsList} />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

HoursLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HoursLayout);
