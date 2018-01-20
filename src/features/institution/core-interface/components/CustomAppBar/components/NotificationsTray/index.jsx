// @flow
import React, { Component } from "react";
import _ from "lodash";
import Badge from "material-ui/Badge";
import { CircularProgress } from "material-ui/Progress";
import FolderIcon from "material-ui-icons/Folder";
import { grey, lightBlue } from "material-ui/colors";
import HoursIcon from "material-ui-icons/Alarm";
import IconButton from "material-ui/IconButton";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import NotificationsClosedIcon from "material-ui-icons/Notifications";
import NotificationsOpenIcon from "material-ui-icons/NotificationsActive";
import PeopleIcon from "material-ui-icons/Person";
import Popover from "material-ui/Popover";
import ResultsIcon from "material-ui-icons/PlusOne";
import ScheduleIcon from "material-ui-icons/Event";
import TeamsIcon from "material-ui-icons/People";
import Tooltip from "material-ui/Tooltip";
import Typography from "material-ui/Typography";
import WagesIcon from "material-ui-icons/AttachMoney";
import { withStyles } from "material-ui/styles";
import moment from "moment";

const styles = theme => ({
  badge: {
    margin: `0 ${theme.spacing.unit * 2}px`
  },
  contentWrapper: {
    minWidth: 280,
    maxWidth: 400
  },
  heading: {
    backgroundColor: lightBlue[900],
    color: grey[50],
    padding: theme.spacing.unit * 2
  },
  list: {
    maxHeight: 400,
    overflow: "auto"
  },
  loaderWrapper: {
    width: "100%",
    height: 48,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
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
    this.setState({
      anchorEl: anchorEl,
      isOpen: !this.state.isOpen
    });
  }

  createListItems() {
    const { classes, notifications, isLoading } = this.props;

    if (isLoading) {
      return (
        <div className={classes.loaderWrapper}>
          <CircularProgress />
        </div>
      );
    } else if (notifications.length === 0) {
      return (
        <ListItem>
          <ListItemText primary="No unread notifications" />
        </ListItem>
      );
    } else {
      return notifications.map((notification, index) => {
        const date = notification.metadata.creationDate;

        switch (notification.feature) {
          case "SCHEDULE":
            return (
              <ListItem key={index} button>
                <ListItemIcon>
                  <ScheduleIcon />
                </ListItemIcon>
                <ListItemText
                  primary={notification.message.body}
                  secondary={moment(date).fromNow()}
                />
              </ListItem>
            );
          case "HOURS":
            return (
              <ListItem key={index} button>
                <ListItemIcon>
                  <HoursIcon />
                </ListItemIcon>
                <ListItemText
                  primary={notification.message.body}
                  secondary={moment(date).fromNow()}
                />
              </ListItem>
            );
          case "RESULTS":
            return (
              <ListItem key={index} button>
                <ListItemIcon>
                  <ResultsIcon />
                </ListItemIcon>
                <ListItemText
                  primary={notification.message.body}
                  secondary={moment(date).fromNow()}
                />
              </ListItem>
            );
          case "WAGES":
            return (
              <ListItem key={index} button>
                <ListItemIcon>
                  <WagesIcon />
                </ListItemIcon>
                <ListItemText
                  primary={notification.message.body}
                  secondary={moment(date).fromNow()}
                />
              </ListItem>
            );
          case "PEOPLE":
            return (
              <ListItem key={index} button>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText
                  primary={notification.message.body}
                  secondary={moment(date).fromNow()}
                />
              </ListItem>
            );
          case "TEAMS":
            return (
              <ListItem key={index} button>
                <ListItemIcon>
                  <TeamsIcon />
                </ListItemIcon>
                <ListItemText
                  primary={notification.message.body}
                  secondary={moment(date).fromNow()}
                />
              </ListItem>
            );
          default:
            return (
              <ListItem key={index} button>
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
    const { classes, notifications } = this.props;
    const { isOpen, anchorEl } = this.state;

    const numberOfNotifications = notifications.reduce((acc, notification) => {
      if (notification.isRead) {
        return acc;
      } else {
        return acc + 1;
      }
    }, 0);

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
            ) : (
              <div>
                {isOpen ? (
                  <NotificationsOpenIcon />
                ) : (
                  <NotificationsClosedIcon />
                )}
              </div>
            )}
          </IconButton>
        </Tooltip>
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
      </div>
    );
  }
}

export default withStyles(styles)(NotificationsTray);
