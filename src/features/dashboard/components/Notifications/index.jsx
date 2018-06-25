/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import injectSheet from "react-jss";
import moment from "moment";
import EmptyState from "../../../../components/EmptyState";
import NotificationGroup from "./components/NotificationGroup";
import { grey, yellow } from "../../../../utils/colours";

const styles = {
  actionsBar: {
    margin: "24px 24px 0 24px",
    backgroundColor: grey[200],
    display: "flex",
    justifyContent: "center"
  },
  cardsWrapper: {
    display: "flex",
    flexWrap: "wrap",
    margin: "0 auto"
  },
  cardWrapper: {
    width: "100%",
    padding: 24
  },
  emptyState: {
    padding: 24
  },
  flexGrow: {
    flexGrow: 1
  },
  iconAdjacentText: {
    marginRight: 8
  },
  questionMarkIcon: {
    marginRight: 12,
    fontSize: 20,
    color: yellow[700]
  },
  wrapper: {
    width: "100%"
  }
};

class Notifications extends Component {
  formatNotifications() {
    const { notifications } = this.props;

    let notificationGroups = {};

    _.toPairs(notifications).map(([notificationID, notificationInfo]) => {
      const dateString = moment(notificationInfo.metadata.creationDate).format(
        "DD/MM/YYYY"
      );

      if (notificationGroups[dateString]) {
        notificationGroups[dateString][notificationID] = notificationInfo;
      } else {
        notificationGroups[dateString] = {
          [notificationID]: notificationInfo
        };
      }
    });

    return notificationGroups;
  }

  getNotificationGroups() {
    const { classes, navigateTo, isMobile, markNotificationRead } = this.props;

    const notificationGroups = this.formatNotifications();

    return _.toPairs(
      notificationGroups
    ).map(([dateString, notificationGroup]) => {
      return (
        <div
          className={classes.cardWrapper}
          key={`notification-group-${dateString}`}
        >
          <NotificationGroup
            isMobile={isMobile}
            dateString={dateString}
            notificationGroup={notificationGroup}
            navigateTo={navigateTo}
            markNotificationRead={markNotificationRead}
          />
        </div>
      );
    });
  }

  render() {
    const { classes } = this.props;

    const notificationGroups = this.getNotificationGroups();

    return (
      <div className={classes.wrapper}>
        {notificationGroups.length === 0 ? (
          <div className={classes.emptyState}>
            <EmptyState>
              <i className={`${classes.questionMarkIcon} fas fa-question`} />You
              have no notifications.
            </EmptyState>
          </div>
        ) : (
          <div className={classes.cardsWrapper}>{notificationGroups}</div>
        )}
      </div>
    );
  }
}

export default injectSheet(styles)(Notifications);
