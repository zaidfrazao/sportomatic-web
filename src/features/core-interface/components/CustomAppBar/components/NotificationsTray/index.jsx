// @flow
import React, { Component } from "react";
import Avatar from "material-ui/Avatar";
import BackIcon from "material-ui-icons/ArrowBack";
import Badge from "material-ui/Badge";
import { CircularProgress } from "material-ui/Progress";
import FolderIcon from "material-ui-icons/Folder";
import { grey, lightBlue, orange } from "material-ui/colors";
import HoursIcon from "material-ui-icons/Alarm";
import IconButton from "material-ui/IconButton";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import moment from "moment";
import NotificationsClosedIcon from "material-ui-icons/Notifications";
import NotificationsOpenIcon from "material-ui-icons/NotificationsActive";
import PeopleIcon from "material-ui-icons/Person";
import Popover from "material-ui/Popover";
import ResultsIcon from "material-ui-icons/PlusOne";
import { Route } from "react-router";
import ScheduleIcon from "material-ui-icons/Event";
import TeamsIcon from "material-ui-icons/People";
import Tooltip from "material-ui/Tooltip";
import Typography from "material-ui/Typography";
import WagesIcon from "material-ui-icons/AttachMoney";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  backIcon: {
    color: grey[50],
    marginRight: theme.spacing.unit * 2
  },
  badge: {
    margin: `0 ${theme.spacing.unit * 2}px`
  },
  contentWrapper: {
    width: 400
  },
  heading: {
    backgroundColor: lightBlue[900],
    color: grey[50],
    padding: theme.spacing.unit * 2
  },
  list: {
    flex: 1,
    overflow: "auto",
    "@media (min-width: 600px)": {
      maxHeight: 400,
      minWidth: 280,
      maxWidth: 400
    }
  },
  loaderWrapper: {
    width: "100%",
    height: 48,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  mobileHeading: {
    backgroundColor: lightBlue[900],
    color: grey[50],
    padding: theme.spacing.unit * 2,
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  mobileWrapper: {
    zIndex: 10,
    height: "100%",
    width: "100%",
    position: "fixed",
    backgroundColor: grey[50],
    display: "flex",
    flexDirection: "column",
    left: 0,
    top: 0
  },
  unreadIcon: {
    backgroundColor: orange[500],
    color: grey[50]
  }
});

type Props = {
  classes: {
    badge: string,
    list: string
  },
  notifications: Array<{
    body: string,
    feature: "SCHEDULE" | "HOURS" | "RESULTS" | "WAGES" | "PEOPLE" | "TEAMS",
    isRead: boolean,
    title: string
  }>
};

type State = {
  anchorEl: HTMLElement | null,
  isOpen: boolean
};

class NotificationsTray extends Component<Props, State> {
  state = {
    anchorEl: null,
    isOpen: false
  };

  handleMenuToggle(anchorEl) {
    const { isOpen } = this.state;
    const { unreadNotifications } = this.props;
    const { markNotificationsRead } = this.props.actions;

    if (isOpen && unreadNotifications.length > 0) {
      markNotificationsRead(unreadNotifications);
    }

    this.setState({
      anchorEl: anchorEl,
      isOpen: !isOpen
    });
  }

  createListItems() {
    const {
      classes,
      unreadNotifications,
      readNotifications,
      isLoading
    } = this.props;
    const notifications = [...unreadNotifications, ...readNotifications];

    if (isLoading) {
      return (
        <div className={classes.loaderWrapper}>
          <CircularProgress />
        </div>
      );
    } else if (notifications.length === 0) {
      return (
        <ListItem>
          <ListItemText primary="No notifications" />
        </ListItem>
      );
    } else {
      return notifications.map((notification, index) => {
        const date = notification.metadata.creationDate;
        const currentDate = moment().format("YYYY-MM-DD");

        switch (notification.feature) {
          case "SCHEDULE":
            return (
              <Route
                key={notification.id}
                render={({ history }) => (
                  <ListItem
                    button
                    onClick={() => {
                      this.handleMenuToggle(null);
                      history.push(
                        `/admin/schedule/${currentDate}/${notification.objectID}`
                      );
                    }}
                  >
                    <Avatar
                      className={
                        notification.metadata.isRead ? "" : classes.unreadIcon
                      }
                    >
                      <ScheduleIcon />
                    </Avatar>
                    <ListItemText
                      primary={notification.message.body}
                      secondary={moment(date).fromNow()}
                    />
                  </ListItem>
                )}
              />
            );
          case "HOURS":
            return (
              <Route
                key={notification.id}
                render={({ history }) => (
                  <ListItem
                    button
                    onClick={() => {
                      this.handleMenuToggle(null);
                      history.push(`/admin/hours/${notification.objectID}`);
                    }}
                  >
                    <Avatar
                      className={
                        notification.metadata.isRead ? "" : classes.unreadIcon
                      }
                    >
                      <HoursIcon />
                    </Avatar>
                    <ListItemText
                      primary={notification.message.body}
                      secondary={moment(date).fromNow()}
                    />
                  </ListItem>
                )}
              />
            );
          case "RESULTS":
            return (
              <Route
                key={notification.id}
                render={({ history }) => (
                  <ListItem
                    button
                    onClick={() => {
                      this.handleMenuToggle(null);
                      history.push(`/admin/results/${notification.objectID}`);
                    }}
                  >
                    <Avatar
                      className={
                        notification.metadata.isRead ? "" : classes.unreadIcon
                      }
                    >
                      <ResultsIcon />
                    </Avatar>
                    <ListItemText
                      primary={notification.message.body}
                      secondary={moment(date).fromNow()}
                    />
                  </ListItem>
                )}
              />
            );
          case "WAGES":
            return (
              <Route
                key={notification.id}
                render={({ history }) => (
                  <ListItem
                    button
                    onClick={() => {
                      this.handleMenuToggle(null);
                      history.push(`/admin/wages/${notification.objectID}`);
                    }}
                  >
                    <Avatar
                      className={
                        notification.metadata.isRead ? "" : classes.unreadIcon
                      }
                    >
                      <WagesIcon />
                    </Avatar>
                    <ListItemText
                      primary={notification.message.body}
                      secondary={moment(date).fromNow()}
                    />
                  </ListItem>
                )}
              />
            );
          case "PEOPLE":
            return (
              <Route
                key={notification.id}
                render={({ history }) => (
                  <ListItem
                    button
                    onClick={() => {
                      this.handleMenuToggle(null);
                      history.push(`/admin/people/${notification.objectID}`);
                    }}
                  >
                    <Avatar
                      className={
                        notification.metadata.isRead ? "" : classes.unreadIcon
                      }
                    >
                      <PeopleIcon />
                    </Avatar>
                    <ListItemText
                      primary={notification.message.body}
                      secondary={moment(date).fromNow()}
                    />
                  </ListItem>
                )}
              />
            );
          case "TEAMS":
            return (
              <Route
                key={notification.id}
                render={({ history }) => (
                  <ListItem
                    button
                    onClick={() => {
                      this.handleMenuToggle(null);
                      history.push(`/admin/teams/${notification.objectID}`);
                    }}
                  >
                    <Avatar
                      className={
                        notification.metadata.isRead ? "" : classes.unreadIcon
                      }
                    >
                      <TeamsIcon />
                    </Avatar>
                    <ListItemText
                      primary={notification.message.body}
                      secondary={moment(date).fromNow()}
                    />
                  </ListItem>
                )}
              />
            );
          default:
            return (
              <ListItem key={notification.id} button>
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText primary="Unknown notification type" />
              </ListItem>
            );
        }
      });
    }
  }

  render() {
    const { classes, unreadNotifications, isMobile } = this.props;
    const { isOpen, anchorEl } = this.state;

    const numberOfNotifications = unreadNotifications.reduce(
      (acc, notification) => {
        if (notification.isRead) {
          return acc;
        } else {
          return acc + 1;
        }
      },
      0
    );

    return (
      <div>
        <Tooltip title="Notifications" placement="bottom">
          <IconButton
            color="contrast"
            aria-label="show notifications"
            onClick={event => this.handleMenuToggle(event.currentTarget)}
          >
            {numberOfNotifications > 0 ? (
              <Badge
                className={classes.badge}
                badgeContent={numberOfNotifications}
                color="accent"
              >
                {isOpen ? (
                  <NotificationsOpenIcon />
                ) : (
                  <NotificationsClosedIcon />
                )}
              </Badge>
            ) : isOpen ? (
              <NotificationsOpenIcon />
            ) : (
              <NotificationsClosedIcon />
            )}
          </IconButton>
        </Tooltip>
        {isMobile ? (
          isOpen && (
            <div className={classes.mobileWrapper}>
              <div className={classes.mobileHeading}>
                <Tooltip title="Close notifications" placement="bottom">
                  <IconButton
                    color="contrast"
                    aria-label="close notifications"
                    onClick={event =>
                      this.handleMenuToggle(event.currentTarget)}
                  >
                    <BackIcon className={classes.backIcon} />
                  </IconButton>
                </Tooltip>
                <Typography type="title" color="inherit" noWrap>
                  Notifications
                </Typography>
              </div>
              <List className={classes.list}>{this.createListItems()}</List>
            </div>
          )
        ) : (
          <Popover
            open={isOpen}
            anchorEl={anchorEl}
            onRequestClose={() => this.handleMenuToggle(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
          >
            <div className={classes.contentWrapper}>
              <Typography
                type="title"
                color="inherit"
                noWrap
                className={classes.heading}
              >
                Notifications
              </Typography>
              <List className={classes.list}>{this.createListItems()}</List>
            </div>
          </Popover>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(NotificationsTray);
