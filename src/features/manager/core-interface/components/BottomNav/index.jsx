// @flow
import React from "react";
import { withStyles } from "material-ui/styles";
import { Route } from "react-router-dom";
import BottomNavigation, {
  BottomNavigationButton
} from "material-ui/BottomNavigation";
import Paper from "material-ui/Paper";
import DashboardIcon from "material-ui-icons/Dashboard";
import ScheduleIcon from "material-ui-icons/Event";
import HoursIcon from "material-ui-icons/Alarm";

const styles = {
  root: {
    width: "100%",
    margin: "0",
    zIndex: 1000
  }
};

class BottomNav extends React.Component {
  render() {
    const { classes, value } = this.props;

    return (
      <Route
        render={({ history }) => (
          <Paper className={classes.root}>
            <BottomNavigation
              value={value}
              onChange={(event, value) => {
                switch (value) {
                  case "dashboard":
                    history.push(`/manager/dashboard`);
                    break;
                  case "schedule":
                    history.push(`/manager/schedule`);
                    break;
                  case "hours":
                    history.push(`/manager/hours`);
                    break;
                  default:
                    break;
                }
              }}
            >
              <BottomNavigationButton
                value="dashboard"
                icon={<DashboardIcon />}
              />
              <BottomNavigationButton
                value="schedule"
                icon={<ScheduleIcon />}
              />
              <BottomNavigationButton value="hours" icon={<HoursIcon />} />
            </BottomNavigation>
          </Paper>
        )}
      />
    );
  }
}

export default withStyles(styles)(BottomNav);
