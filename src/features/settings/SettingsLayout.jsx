import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import Tabs, { Tab } from "material-ui/Tabs";
import { withStyles } from "material-ui/styles";
import PersonInfo from "./components/PersonInfo";

const styles = theme => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  tabs: {
    height: 72
  }
});

class SettingsLayout extends Component {
  componentWillUnmount() {
    const { resetState } = this.props.actions;
    resetState();
  }

  render() {
    const {
      classes,
      accountInfo,
      isAccountInfoLoading,
      isMobile,
      isTablet,
      userID
    } = this.props;
    const { currentTab } = this.props.uiConfig;
    const { isUpdateBasicInfoLoading } = this.props.loadingStatus;
    const { updateTab, updateBasicInfo } = this.props.actions;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={currentTab}
            onChange={(event, newTab) => updateTab(newTab)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Personal" value="PERSONAL" className={classes.tabs} />
            <Tab
              label="Institutions"
              value="INSTITUTIONS"
              className={classes.tabs}
            />
          </Tabs>
        </AppBar>
        {currentTab === "PERSONAL" && (
          <PersonInfo
            accountInfo={accountInfo}
            userID={userID}
            isAccountInfoLoading={isAccountInfoLoading}
            isUpdateBasicInfoLoading={isUpdateBasicInfoLoading}
            isMobile={isMobile}
            isTablet={isTablet}
            actions={{
              updateBasicInfo
            }}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(SettingsLayout);
