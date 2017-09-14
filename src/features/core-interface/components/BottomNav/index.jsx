/* eslint-disable flowtype/require-valid-file-annotation */

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
    const { classes, value, accountType } = this.props;
    const { updateAppBarTitle, updateBottomNavValue } = this.props.actions;

    return (
      <Route
        render={({ history }) => (
          <BottomNavigation
            value={value}
            onChange={(event, value) => {
              switch (value) {
                case "dashboard":
                  updateAppBarTitle("Dashboard");
                  updateBottomNavValue("dashboard");
                  history.push(`/${accountType}/dashboard`);
                  break;
                case "schedule":
                  updateAppBarTitle("Schedule");
                  updateBottomNavValue("schedule");
                  history.push(`/${accountType}/schedule`);
                  break;
                case "hours":
                  updateAppBarTitle("Hours");
                  updateBottomNavValue("hours");
                  history.push(`/${accountType}/hours`);
                  break;
                default:
                  updateAppBarTitle("Dashboard");
                  updateBottomNavValue("dashboard");
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
