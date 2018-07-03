/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import injectSheet from "react-jss";
import moment from "moment";
import { common, grey, orange } from "../../../../../../utils/colours";

const mobileBreakpoint = 800;

const styles = {
  dismissButton: {
    width: "100%",
    padding: "14px 20px",
    cursor: "pointer",
    borderRadius: "0 0 16px 16px",
    transition: "0.25s",
    color: common["white"],
    textAlign: "center",
    backgroundColor: orange["A400"],
    border: `2px solid ${orange["A400"]}`,
    "&:hover": {
      border: `2px solid ${orange["A200"]}`,
      backgroundColor: orange["A200"]
    }
  },
  listItemSeparator: {
    height: 1,
    backgroundColor: grey[100],
    margin: "6px 24px"
  },
  listItemWrapper: {
    transition: "0.25s",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    borderRadius: 12,
    margin: 24,
    backgroundColor: grey[200],
    cursor: "pointer",
    "&:hover": {
      backgroundColor: grey[300]
    }
  },
  section: {
    border: `1px solid ${grey[300]}`,
    borderRadius: 16,
    marginBottom: 24,
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: common["white"]
  },
  sectionHeading: {
    borderBottom: `1px solid ${grey[300]}`,
    fontSize: 18,
    borderRadius: "16px 16px 0 0",
    padding: "18px 0",
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    color: grey[800],
    backgroundColor: grey[100]
  },
  textBody: {
    fontSize: 14,
    lineHeight: "20px",
    color: grey[700]
  },
  textTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: common["black"],
    marginBottom: 4
  },
  textReadWrapper: {
    transition: "0.25s",
    borderRadius: 12,
    padding: 24,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    "&:hover": {
      backgroundColor: grey[300]
    },
    [`@media (max-width: ${mobileBreakpoint}px)`]: {
      textAlign: "center"
    }
  },
  textUnreadWrapper: {
    transition: "0.25s",
    borderRadius: "12px 12px 0 0",
    backgroundColor: orange[50],
    border: `1px solid ${orange["A400"]}`,
    padding: 24,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    "&:hover": {
      backgroundColor: orange[100]
    },
    [`@media (max-width: ${mobileBreakpoint}px)`]: {
      textAlign: "center"
    }
  },
  wrapper: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start"
  }
};

class NotificationGroup extends Component {
  getNotificationItems() {
    const {
      classes,
      notificationGroup,
      navigateTo,
      markNotificationRead
    } = this.props;

    const notificationsArray = _.toPairs(
      notificationGroup
    ).map(([id, info]) => {
      return { id, ...info };
    });
    const lastIndex = notificationsArray.length - 1;

    return notificationsArray.map((info, index) => {
      const isRead = info.metadata.isRead;

      if (index !== lastIndex) {
        return (
          <div key={info.id}>
            <div className={classes.listItemWrapper}>
              <div
                onClick={() => {
                  markNotificationRead(info.id);
                  navigateTo(info.link);
                }}
                className={
                  isRead ? classes.textReadWrapper : classes.textUnreadWrapper
                }
              >
                <div className={classes.textTitle}>{info.message.title}</div>
                <div className={classes.textBody}>{info.message.body}</div>
              </div>
              {!isRead && (
                <div
                  className={classes.dismissButton}
                  onClick={() => markNotificationRead(info.id)}
                >
                  Dismiss
                </div>
              )}
            </div>
            <div className={classes.listItemSeparator} />
          </div>
        );
      } else {
        return (
          <div key={info.id} className={classes.listItemWrapper}>
            <div
              onClick={() => {
                markNotificationRead(info.id);
                navigateTo(info.link);
              }}
              className={
                isRead ? classes.textReadWrapper : classes.textUnreadWrapper
              }
            >
              <div className={classes.textTitle}>{info.message.title}</div>
              <div className={classes.textBody}>{info.message.body}</div>
            </div>
            {!isRead && (
              <div
                className={classes.dismissButton}
                onClick={() => markNotificationRead(info.id)}
              >
                Dismiss
              </div>
            )}
          </div>
        );
      }
    });
  }

  render() {
    const { classes, dateString } = this.props;

    const notificationItems = this.getNotificationItems();
    const currentDateString = moment().format("DD/MM/YYYY");
    let date = "Today";
    if (dateString !== currentDateString) {
      date = moment(dateString, "DD/MM/YYYY").format("dddd, D MMMM YYYY");
    }

    return (
      <div className={classes.wrapper}>
        <div className={classes.section}>
          <div className={classes.sectionHeading}>{date}</div>
          {notificationItems}
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(NotificationGroup);
