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
import ResultsIcon from "material-ui-icons/PlusOne";

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
                    history.push(`/admin/dashboard`);
                    break;
                  case "schedule":
                    history.push(`/admin/schedule`);
                    break;
                  case "hours":
                    history.push(`/admin/hours`);
                    break;
                  case "results":
                    history.push(`/admin/results`);
                    break;
                  default:
                    break;
                }
              }}
            >
              <BottomNavigationButton
                label="Dashboard"
                value="dashboard"
                icon={<DashboardIcon />}
              />
              <BottomNavigationButton
                label="Schedule"
                value="schedule"
                icon={<ScheduleIcon />}
              />
              <BottomNavigationButton
                label="Hours"
                value="hours"
                icon={<HoursIcon />}
              />
              <BottomNavigationButton
                label="Results"
                value="results"
                icon={<ResultsIcon />}
              />
            </BottomNavigation>
          </Paper>
        )}
      />
    );
  }
}

export default withStyles(styles)(BottomNav);
