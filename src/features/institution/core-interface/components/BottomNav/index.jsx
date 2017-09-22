// @flow
import React from "react";
import { withStyles } from "material-ui/styles";
import { Route } from "react-router-dom";
import BottomNavigation, {
  BottomNavigationButton
} from "material-ui/BottomNavigation";
import DashboardIcon from "material-ui-icons/Dashboard";
import ScheduleIcon from "material-ui-icons/Event";
import HoursIcon from "material-ui-icons/Alarm";

const styles = {
  root: {
    width: "100%",
    margin: "0"
  }
};

class BottomNav extends React.Component {
  render() {
    const { classes, value } = this.props;

    return (
      <Route
        render={({ history }) => (
          <BottomNavigation
            value={value}
            onChange={(event, value) => {
              switch (value) {
                case "dashboard":
                  history.push(`/coach/dashboard`);
                  break;
                case "schedule":
                  history.push(`/coach/schedule`);
                  break;
                case "hours":
                  history.push(`/coach/hours`);
                  break;
                default:
                  break;
              }
            }}
            className={classes.root}
          >
            <BottomNavigationButton
              value="dashboard"
              icon={<DashboardIcon />}
            />
            <BottomNavigationButton value="schedule" icon={<ScheduleIcon />} />
            <BottomNavigationButton value="hours" icon={<HoursIcon />} />
          </BottomNavigation>
        )}
      />
    );
  }
}

export default withStyles(styles)(BottomNav);
