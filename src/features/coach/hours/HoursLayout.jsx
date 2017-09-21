// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Tabs, { Tab } from "material-ui/Tabs";
import InProgressIcon from "material-ui-icons/Autorenew";
import AwaitingApprovalIcon from "material-ui-icons/MoreHoriz";
import HistoryIcon from "material-ui-icons/History";

const styles = theme => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  }
});

class HoursLayout extends Component {
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
      </div>
    );
  }
}

HoursLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HoursLayout);
