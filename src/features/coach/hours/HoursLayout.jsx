// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Tabs, { Tab } from "material-ui/Tabs";
import InProgressIcon from "material-ui-icons/Autorenew";
import AwaitingApprovalIcon from "material-ui-icons/MoreHoriz";
import HistoryIcon from "material-ui-icons/History";
import HoursHistory from "./components/HoursHistory";
import HoursCard from "./components/HoursCard";
import TimeLogger from "./components/TimeLogger";
import LeaderboardAd from "../../../components/LeaderboardAd";

const styles = theme => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  adWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    margin: "24px 0"
  },
  historyWrapper: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column"
  },
  inProgressWrapper: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column"
  },
  historyTableWrapper: {
    flexGrow: 1,
    display: "flex"
  },
  awaitingApprovalWrapper: {
    flexGrow: 1,
    overflow: "auto"
  }
});

class HoursLayout extends Component {
  renderInProgressTab() {
    const { classes, inProgress, isMobile } = this.props;

    return (
      <div className={classes.inProgressWrapper}>
        <div className={classes.adWrapper}>
          <LeaderboardAd />
        </div>
        <TimeLogger info={inProgress} isMobile={isMobile} />
      </div>
    );
  }

  renderAwaitingApprovalTab() {
    const { classes, awaitingApproval, isTablet } = this.props;

    return (
      <div className={classes.awaitingApprovalWrapper}>
        <div className={classes.adWrapper}>
          <LeaderboardAd />
        </div>
        {awaitingApproval.map(hoursInfo => (
          <HoursCard key={hoursInfo.id} info={hoursInfo} isTablet={isTablet} />
        ))}
      </div>
    );
  }

  renderHistoryTab() {
    const { classes, isMobile, isTablet, hoursHistory } = this.props;
    return (
      <div className={classes.historyWrapper}>
        <div className={classes.adWrapper}>
          <LeaderboardAd />
        </div>
        <div className={classes.historyTableWrapper}>
          <HoursHistory
            isMobile={isMobile}
            isTablet={isTablet}
            hoursData={hoursHistory}
          />
        </div>
      </div>
    );
  }

  render() {
    const { classes, isMobile } = this.props;
    const { currentTab } = this.props.uiConfig;
    const { updateTab } = this.props.actions;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          {isMobile ? (
            <Tabs
              value={currentTab}
              onChange={(event, newTab) => updateTab(newTab)}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab value="IN_PROGRESS" icon={<InProgressIcon />} />
              <Tab value="AWAITING_APPROVAL" icon={<AwaitingApprovalIcon />} />
              <Tab value="HISTORY" icon={<HistoryIcon />} />
            </Tabs>
          ) : (
            <Tabs
              value={currentTab}
              onChange={(event, newTab) => updateTab(newTab)}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab
                label="In Progress"
                value="IN_PROGRESS"
                icon={<InProgressIcon />}
              />
              <Tab
                label="Awaiting Approval"
                value="AWAITING_APPROVAL"
                icon={<AwaitingApprovalIcon />}
              />
              <Tab label="History" value="HISTORY" icon={<HistoryIcon />} />
            </Tabs>
          )}
        </AppBar>
        {currentTab === "IN_PROGRESS" && this.renderInProgressTab()}
        {currentTab === "AWAITING_APPROVAL" && this.renderAwaitingApprovalTab()}
        {currentTab === "HISTORY" && this.renderHistoryTab()}
      </div>
    );
  }
}

HoursLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HoursLayout);
