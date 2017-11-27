// @flow
import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import Button from "material-ui/Button";
import { Route } from "react-router-dom";
import Tabs, { Tab } from "material-ui/Tabs";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import { ActionAlias, TeamAlias } from "../../../../../models/aliases";
import BannerAd from "../../../../../components/BannerAd";
import LargeMobileBannerAd from "../../../../../components/LargeMobileBannerAd";
import LeaderboardAd from "../../../../../components/LeaderboardAd";
import MobilePendingCard from "./components/MobilePendingCard";
import MobileResult from "./components/MobileResult";
import MobileResultCard from "./components/MobileResultCard";
import MobileScorer from "./components/MobileScorer";
import PendingCard from "./components/PendingCard";
import Result from "./components/Result";
import ResultCard from "./components/ResultCard";
import Scorer from "./components/Scorer";

import canada from "./images/canada.png";
import mexico from "./images/mexico.png";

const styles = theme => ({
  adWrapper: {
    textAlign: "center"
  },
  awaitingApprovalWrapper: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "auto"
  },
  backButton: {
    margin: 24,
    "@media (max-width: 600px)": {
      width: "calc(100% - 48px)"
    }
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
    overflow: "auto"
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
    updateTab: (newTab: string) => ActionAlias
  },
  classes: {
    adWrapper: string,
    awaitingApprovalWrapper: string,
    backButton: string,
    historyWrapper: string,
    inProgressWrapper: string,
    tabsWrapper: string,
    teamName: string
  },
  currentTab: "IN_PROGRESS" | "AWAITING_APPROVAL" | "HISTORY",
  eventID: string,
  isMobile: boolean,
  isTablet: boolean,
  teamID: string,
  teams: { [teamID: string]: TeamAlias }
};

class HockeyResults extends Component<Props> {
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
          <MobileScorer
            eventInfo={{
              title: "Hockey World Cup Qualifiers 2018",
              startTime: "2:00pm",
              endTime: "5:00pm"
            }}
            ourTeamInfo={{
              abbreviation: "CAN",
              institutionEmblemURL: canada,
              goals: 2,
              shots: 12,
              shotsOnTarget: 4,
              freeHits: 5,
              greenCards: 0,
              yellowCards: 2,
              redCards: 0,
              longCorners: 0,
              shortCorners: 7
            }}
            theirTeamInfo={{
              abbreviation: "MEX",
              institutionEmblemURL: mexico,
              goals: 2,
              shots: 12,
              shotsOnTarget: 4,
              freeHits: 5,
              greenCards: 0,
              yellowCards: 2,
              redCards: 0,
              longCorners: 0,
              shortCorners: 7
            }}
          />
        ) : (
          <Scorer
            eventInfo={{
              title: "Hockey World Cup Qualifiers 2018",
              startTime: "2:00pm",
              endTime: "5:00pm"
            }}
            ourTeamInfo={{
              name: "Canada",
              institutionEmblemURL: canada,
              goals: 2,
              shots: 12,
              shotsOnTarget: 4,
              freeHits: 5,
              greenCards: 0,
              yellowCards: 2,
              redCards: 0,
              longCorners: 0,
              shortCorners: 7
            }}
            theirTeamInfo={{
              name: "Mexico",
              institutionEmblemURL: mexico,
              goals: 3,
              shots: 7,
              shotsOnTarget: 5,
              freeHits: 5,
              greenCards: 0,
              yellowCards: 0,
              redCards: 0,
              longCorners: 5,
              shortCorners: 4
            }}
          />
        )}
      </div>
    );
  }

  renderAwaitingApprovalTab() {
    const { classes, isMobile, teamID, eventID } = this.props;

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
          <MobilePendingCard
            eventInfo={{
              title: "Hockey World Cup Qualifiers 2018",
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
            teamID={teamID}
            eventID={eventID}
          />
        ) : (
          <PendingCard
            eventInfo={{
              title: "Hockey World Cup Qualifiers 2018",
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
            teamID={teamID}
            eventID={eventID}
          />
        )}
      </div>
    );
  }

  renderHistoryTab() {
    const { classes, isMobile, teamID, eventID } = this.props;

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
          <MobileResultCard
            eventInfo={{
              title: "Hockey World Cup Qualifiers 2018",
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
            teamID={teamID}
            eventID={eventID}
          />
        ) : (
          <ResultCard
            eventInfo={{
              title: "Hockey World Cup Qualifiers 2018",
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
            teamID={teamID}
            eventID={eventID}
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

  render() {
    const {
      classes,
      teams,
      isMobile,
      currentTab,
      teamID,
      eventID
    } = this.props;
    const { updateTab } = this.props.actions;

    let view = <div />;
    if (eventID) {
      if (isMobile) {
        view = (
          <MobileResult
            ourTeamInfo={{
              abbreviation: "CAN",
              institutionEmblemURL: canada,
              goals: 2,
              shots: 12,
              shotsOnTarget: 4,
              freeHits: 5,
              greenCards: 0,
              yellowCards: 2,
              redCards: 0,
              longCorners: 0,
              shortCorners: 7
            }}
            theirTeamInfo={{
              abbreviation: "MEX",
              institutionEmblemURL: mexico,
              goals: 2,
              shots: 12,
              shotsOnTarget: 4,
              freeHits: 5,
              greenCards: 0,
              yellowCards: 2,
              redCards: 0,
              longCorners: 0,
              shortCorners: 7
            }}
            eventTitle="Hockey World Cup Qualifiers 2018"
            ad={this.createAd()}
            resultStatus="WIN"
          />
        );
      } else {
        view = (
          <Result
            ourTeamInfo={{
              name: "Canada",
              institutionEmblemURL: canada,
              goals: 2,
              shots: 12,
              shotsOnTarget: 4,
              freeHits: 5,
              greenCards: 0,
              yellowCards: 2,
              redCards: 0,
              longCorners: 0,
              shortCorners: 7
            }}
            theirTeamInfo={{
              name: "Mexico",
              institutionEmblemURL: mexico,
              goals: 2,
              shots: 12,
              shotsOnTarget: 4,
              freeHits: 5,
              greenCards: 0,
              yellowCards: 2,
              redCards: 0,
              longCorners: 0,
              shortCorners: 7
            }}
            eventTitle="Hockey World Cup Qualifiers 2018"
            ad={this.createAd()}
            resultStatus="DRAW"
          />
        );
      }
    } else if (teams[teamID]) {
      view = (
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
      );
    }
    return view;
  }
}

export default withStyles(styles)(HockeyResults);
