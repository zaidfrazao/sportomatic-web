/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import { withStyles } from "material-ui/styles";
import Generic from "./components/Generic";
import Soccer from "./components/Soccer";

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

    switch (sport) {
      case "Soccer / Football":
      case "Soccer":
      case "Football":
        let showCustomScorer = true;
        _.toPairs(opponents).map(([opponentID, opponentInfo]) => {
          if (opponentInfo.ourScore.finalScore === undefined)
            showCustomScorer = false;
        });

        if (showCustomScorer) {
          return (
            <Soccer
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
        } else {
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
