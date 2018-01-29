/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import { withStyles } from "material-ui/styles";
import Generic from "./components/Generic";

const styles = {
  contentWrapper: {
    padding: 16
  },
  eventInfoButton: {
    marginTop: 16,
    width: "100%"
  },
  header: {
    backgroundColor: "white"
  }
};

class ResultInfo extends Component {
  renderCardContent() {
    const {
      teamID,
      teamInfo,
      teamEventInfo,
      isMobile,
      isTablet,
      eventID,
      institutionEmblemURL
    } = this.props;

    const { name, sport } = teamInfo.info;
    const { opponents, resultsStatus } = teamEventInfo;

    switch (_.upperCase(sport)) {
      default:
        return (
          <Generic
            teamID={teamID}
            eventID={eventID}
            resultsStatus={resultsStatus}
            ourTeam={{
              name,
              opponents,
              emblemURL: institutionEmblemURL
            }}
            isMobile={isMobile}
            isTablet={isTablet}
          />
        );
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.contentWrapper}>{this.renderCardContent()}</div>
    );
  }
}

export default withStyles(styles)(ResultInfo);
