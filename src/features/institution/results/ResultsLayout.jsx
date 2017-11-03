// @flow
import React, { Component } from "react";
import { Route } from "react-router-dom";
import _ from "lodash";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Button from "material-ui/Button";
import { CircularProgress } from "material-ui/Progress";
import Tabs, { Tab } from "material-ui/Tabs";
import Typography from "material-ui/Typography";
import {
  ActionAlias,
  ErrorAlias,
  EventAlias,
  HistoryAlias,
  LocationAlias,
  MatchAlias,
  TeamAlias
} from "../../../models/aliases";
import BannerAd from "../../../components/BannerAd";
import LargeMobileBannerAd from "../../../components/LargeMobileBannerAd";
import LeaderboardAd from "../../../components/LeaderboardAd";
import MobileSoccerPendingCard from "./components/MobileSoccerPendingCard";
import MobileSoccerResultsCard from "./components/MobileSoccerResultsCard";
import MobileSoccerScorer from "./components/MobileSoccerScorer";
import SoccerPendingCard from "./components/SoccerPendingCard";
import SoccerResultsCard from "./components/SoccerResultsCard";
import SoccerScorer from "./components/SoccerScorer";
import TeamsList from "./components/TeamsList";

import canada from "./images/canada.png";
import mexico from "./images/mexico.png";

const styles = theme => ({
  adWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
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
  backButton: {
    margin: 24,
    "@media (max-width: 600px)": {
      width: "calc(100% - 48px)"
    }
  },
  contentWrapper: {
    width: "100%",
    height: "100%"
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
  loaderWrapper: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  tabsWrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  teamName: {
    margin: 24,
    width: "calc(100% - 48px)",
    textAlign: "center"
  }
});

type Props = {
  actions: {
    errorLoadingEvents: (error: ErrorAlias) => ActionAlias,
    errorLoadingEvents: (error: ErrorAlias) => ActionAlias,
    loadEvents: (institutionID: string) => void,
    loadTeams: (institutionID: string) => void,
    receiveEvents: (events: {
      [year: number]: { [month: number]: { [eventID: string]: EventAlias } }
    }) => ActionAlias,
    receiveTeams: (teams: { [teamID: string]: TeamAlias }) => ActionAlias,
    requestEvents: () => ActionAlias,
    requestTeams: () => ActionAlias,
    resultsReducer: (state: {}, action: ActionAlias) => {},
    selector: (state: {}) => {},
    updateTab: (newTab: string) => ActionAlias
  },
  classes: {
    adWrapper: string,
    awaitingApprovalWrapper: string,
    backButton: string,
    contentWrapper: string,
    historyWrapper: string,
    inProgressWrapper: string,
    loaderWrapper: string,
    root: string,
    tabsWrapper: string,
    teamName: string
  },
  events: {
    [year: number]: { [month: number]: { [eventID: string]: EventAlias } }
  },
  history: HistoryAlias,
  isMobile: boolean,
  isTablet: boolean,
  loadingStatus: {
    isEventsLoading: boolean,
    isTeamsLoading: boolean
  },
  location: LocationAlias,
  match: MatchAlias,
  staticContext: typeof undefined, // needs more research
  teams: { [teamID: string]: TeamAlias },
  uiConfig: {
    currentTab: "IN_PROGRESS" | "AWAITING_APPROVAL" | "HISTORY"
  },
  userID: string
};

class ResultsLayout extends Component<Props> {
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
    const { classes, isMobile } = this.props;

    const ad = this.createAd();

    return (
      <div className={classes.inProgressWrapper}>
        <div>
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
        </div>
        {!isMobile && <div className={classes.adWrapper}>{ad}</div>}
        {isMobile ? (
          <MobileSoccerScorer
            eventInfo={{
              title: "FIFA World Cup Qualifiers 2018",
              startTime: "2:00pm",
              endTime: "5:00pm"
            }}
            ourTeamInfo={{
              abbreviation: "CAN",
              institutionEmblemURL: canada,
              goals: 2,
              shots: 12,
              fouls: 5,
              yellowCards: 2,
              redCards: 0,
              shotsOnTarget: 4,
              offsides: 0,
              corners: 7
            }}
            theirTeamInfo={{
              abbreviation: "MEX",
              institutionEmblemURL: mexico,
              goals: 3,
              shots: 7,
              shotsOnTarget: 5,
              fouls: 5,
              yellowCards: 0,
              redCards: 0,
              offsides: 5,
              corners: 4
            }}
          />
        ) : (
          <SoccerScorer
            eventInfo={{
              title: "FIFA World Cup Qualifiers 2018",
              startTime: "2:00pm",
              endTime: "5:00pm"
            }}
            ourTeamInfo={{
              name: "Canada",
              institutionEmblemURL: canada,
              goals: 2,
              shots: 12,
              fouls: 5,
              yellowCards: 2,
              redCards: 0,
              shotsOnTarget: 4,
              offsides: 0,
              corners: 7
            }}
            theirTeamInfo={{
              name: "Mexico",
              institutionEmblemURL: mexico,
              goals: 3,
              shots: 7,
              shotsOnTarget: 5,
              fouls: 5,
              yellowCards: 0,
              redCards: 0,
              offsides: 5,
              corners: 4
            }}
          />
        )}
      </div>
    );
  }

  renderAwaitingApprovalTab() {
    const { classes, isMobile } = this.props;

    let ad = this.createAd();

    return (
      <div className={classes.awaitingApprovalWrapper}>
        <div>
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
        </div>
        {!isMobile && <div className={classes.adWrapper}>{ad}</div>}
        {isMobile ? (
          <MobileSoccerPendingCard
            eventInfo={{
              title: "FIFA World Cup Qualifiers 2018",
              date: "3 November 2017"
            }}
            ourTeamInfo={{
              abbreviation: "CAN",
              institutionEmblemURL: canada,
              goals: 2
            }}
            resultStatus="LOSS"
            theirTeamInfo={{
              abbreviation: "MEX",
              institutionEmblemURL: mexico,
              goals: 3
            }}
          />
        ) : (
          <SoccerPendingCard
            eventInfo={{
              title: "FIFA World Cup Qualifiers 2018",
              date: "3 November 2017"
            }}
            ourTeamInfo={{
              name: "Canada",
              institutionEmblemURL: canada,
              goals: 2
            }}
            resultStatus="LOSS"
            theirTeamInfo={{
              name: "Mexico",
              institutionEmblemURL: mexico,
              goals: 3
            }}
          />
        )}
      </div>
    );
  }

  renderHistoryTab() {
    const { classes, isMobile } = this.props;

    const ad = this.createAd();

    return (
      <div className={classes.historyWrapper}>
        <div>
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
        </div>
        {!isMobile && <div className={classes.adWrapper}>{ad}</div>}
        {isMobile ? (
          <MobileSoccerResultsCard
            eventInfo={{
              title: "FIFA World Cup Qualifiers 2018",
              date: "3 November 2017"
            }}
            ourTeamInfo={{
              abbreviation: "CAN",
              institutionEmblemURL: canada,
              goals: 2
            }}
            resultStatus="LOSS"
            theirTeamInfo={{
              abbreviation: "MEX",
              institutionEmblemURL: mexico,
              goals: 3
            }}
          />
        ) : (
          <SoccerResultsCard
            eventInfo={{
              title: "FIFA World Cup Qualifiers 2018",
              date: "3 November 2017"
            }}
            ourTeamInfo={{
              name: "Canada",
              institutionEmblemURL: canada,
              goals: 2
            }}
            resultStatus="LOSS"
            theirTeamInfo={{
              name: "Mexico",
              institutionEmblemURL: mexico,
              goals: 3
            }}
          />
        )}
      </div>
    );
  }

  createAd() {
    const { isMobile, isTablet } = this.props;

    let ad = <LeaderboardAd />;
    if (isMobile) {
      ad = <LargeMobileBannerAd />;
    } else if (isTablet) {
      ad = <BannerAd />;
    }

    return ad;
  }

  createTeamsList() {
    const { teams } = this.props;

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

    return teamsList;
  }

  render() {
    const { classes, teams } = this.props;
    const { isTeamsLoading, isEventsLoading } = this.props.loadingStatus;
    const { currentTab } = this.props.uiConfig;
    const { updateTab } = this.props.actions;
    const { teamID } = this.props.match.params;

    const teamsList = this.createTeamsList();
    const ad = this.createAd();

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
                    className={classes.teamName}
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
                    <Tab label="Results" value="HISTORY" />
                  </Tabs>
                </AppBar>
                {currentTab === "IN_PROGRESS" && this.renderInProgressTab()}
                {currentTab === "AWAITING_APPROVAL" &&
                  this.renderAwaitingApprovalTab()}
                {currentTab === "HISTORY" && this.renderHistoryTab()}
              </div>
            ) : (
              <div>
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

export default withStyles(styles)(ResultsLayout);
