/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import Button from "material-ui/Button";
import Collapse from "material-ui/transitions/Collapse";
import ExpandLess from "material-ui-icons/ExpandLess";
import ExpandMore from "material-ui-icons/ExpandMore";
import { grey } from "material-ui/colors";
import { ListItem, ListItemText } from "material-ui/List";
import moment from "moment";
import { Route } from "react-router";
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
  },
  rootWrapper: {
    backgroundColor: grey[100]
  }
};

class ResultCard extends Component {
  state = {
    isOpen: false
  };

  componentWillMount() {
    const { eventInfo } = this.props;

    let isOpen = false;
    _.toPairs(eventInfo.teams).map(([teamID, teamInfo]) => {
      if (teamInfo.resultsStatus !== "FINALISED") {
        isOpen = true;
      }
    });
    this.setState({
      isOpen
    });
  }

  renderCardContent() {
    const {
      eventInfo,
      teams,
      isMobile,
      isTablet,
      eventID,
      institutionEmblemURL
    } = this.props;
    const { startLogging, finaliseResults, editResult } = this.props.actions;

    return _.toPairs(eventInfo.teams).map(([teamID, teamInfo]) => {
      const { name, sport } = teams[teamID].info;
      const { opponents, resultsStatus } = teamInfo;

      switch (_.upperCase(sport)) {
        default:
          return (
            <Generic
              key={`result-${teamID}`}
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
              actions={{
                startLogging,
                finaliseResults,
                editResult
              }}
            />
          );
      }
    });
  }

  toggleOpen() {
    const { isOpen } = this.state;

    this.setState({
      isOpen: !isOpen
    });
  }

  render() {
    const { classes, eventInfo, eventID } = this.props;
    const { isOpen } = this.state;

    const eventDate = moment(eventInfo.requiredInfo.times.start).format(
      "YYYY-MM-DD"
    );
    const startTime = moment(eventInfo.requiredInfo.times.start).format(
      "h:mm A"
    );
    const endTime = moment(eventInfo.requiredInfo.times.end).format("h:mm A");

    return (
      <div className={classes.rootWrapper}>
        <ListItem
          button
          className={classes.header}
          onClick={() => this.toggleOpen()}
        >
          <ListItemText
            primary={eventInfo.requiredInfo.title}
            secondary={`${startTime} - ${endTime}`}
          />
          {isOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse component="div" in={isOpen} timeout="auto" unmountOnExit>
          <Route
            render={({ history }) => (
              <Button
                className={classes.eventInfoButton}
                onClick={() =>
                  history.push(`/myaccount/schedule/${eventDate}/${eventID}`)}
              >
                View event info
              </Button>
            )}
          />
          <div className={classes.contentWrapper}>
            {this.renderCardContent()}
          </div>
        </Collapse>
      </div>
    );
  }
}

export default withStyles(styles)(ResultCard);
