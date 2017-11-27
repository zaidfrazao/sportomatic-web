// @flow
import React, { Component } from "react";
import Avatar from "material-ui/Avatar";
import Badge from "material-ui/Badge";
import FolderIcon from "material-ui-icons/Folder";
import HoursIcon from "material-ui-icons/Alarm";
import IconButton from "material-ui/IconButton";
import List, { ListItem, ListItemText } from "material-ui/List";
import NoNotificationsIcon from "material-ui-icons/NotificationsOff";
import NotificationsClosedIcon from "material-ui-icons/Notifications";
import NotificationsOpenIcon from "material-ui-icons/NotificationsActive";
import PeopleIcon from "material-ui-icons/Person";
import Popover from "material-ui/Popover";
import ResultsIcon from "material-ui-icons/PlusOne";
import ScheduleIcon from "material-ui-icons/Event";
import TeamsIcon from "material-ui-icons/People";
import Tooltip from "material-ui/Tooltip";
import WagesIcon from "material-ui-icons/AttachMoney";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  badge: {
    margin: `0 ${theme.spacing.unit * 2}px`
  },
  list: {
    maxHeight: 400,
    overflow: "auto"
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
    const { notifications } = this.props;

    if (notifications.length === 0) {
      return (
        <ListItem button>
          <Avatar>
            <NoNotificationsIcon />
          </Avatar>
          <ListItemText primary="No unread notifications" />
        </ListItem>
      );
    } else {
      return notifications.map((notification, index) => {
        switch (notification.feature) {
          case "SCHEDULE":
            return (
              <ListItem key={index} button>
                <Avatar>
                  <ScheduleIcon />
                </Avatar>
                <ListItemText
                  primary={notification.title}
                  secondary={notification.body}
                />
              </ListItem>
            );
          case "HOURS":
            return (
              <ListItem key={index} button>
                <Avatar>
                  <HoursIcon />
                </Avatar>
                <ListItemText
                  primary={notification.title}
                  secondary={notification.body}
                />
              </ListItem>
            );
          case "RESULTS":
            return (
              <ListItem key={index} button>
                <Avatar>
                  <ResultsIcon />
                </Avatar>
                <ListItemText
                  primary={notification.title}
                  secondary={notification.body}
                />
              </ListItem>
            );
          case "WAGES":
            return (
              <ListItem key={index} button>
                <Avatar>
                  <WagesIcon />
                </Avatar>
                <ListItemText
                  primary={notification.title}
                  secondary={notification.body}
                />
              </ListItem>
            );
          case "PEOPLE":
            return (
              <ListItem key={index} button>
                <Avatar>
                  <PeopleIcon />
                </Avatar>
                <ListItemText
                  primary={notification.title}
                  secondary={notification.body}
                />
              </ListItem>
            );
          case "TEAMS":
            return (
              <ListItem key={index} button>
                <Avatar>
                  <TeamsIcon />
                </Avatar>
                <ListItemText
                  primary={notification.title}
                  secondary={notification.body}
                />
              </ListItem>
            );
          default:
            return (
              <ListItem key={index} button>
                <Avatar>
                  <FolderIcon />
                </Avatar>
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
            <Badge
              className={classes.badge}
              badgeContent={numberOfNotifications}
              color="accent"
            >
              {isOpen ? <NotificationsOpenIcon /> : <NotificationsClosedIcon />}
            </Badge>
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
          <List className={classes.list}>{this.createListItems()}</List>
        </Popover>
      </div>
    );
  }
}

export default withStyles(styles)(NotificationsTray);
