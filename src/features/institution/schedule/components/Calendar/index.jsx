// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import { grey } from "material-ui/colors";
import InfiniteCalendar from "react-infinite-calendar";
import "react-infinite-calendar/styles.css";

const styles = theme => ({
  root: {
    backgroundColor: grey[300]
  }
});

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = { windowHeight: "0" };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentWillMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ windowHeight: window.innerHeight });
  }

  render() {
    const { classes, dateSelected, isMobile, isTablet } = this.props;
    const { updateView } = this.props.actions;
    const { windowHeight } = this.state;
    let calendarHeight = isTablet ? windowHeight - 300 : windowHeight - 405;
    if (isMobile) {
      calendarHeight = windowHeight - 380;
    }
    return (
      <div className={classes.root}>
        <Route
          render={({ history }) => (
            <InfiniteCalendar
              locale={{
                weekStartsOn: 1
              }}
              selected={dateSelected}
              width="100%"
              height={calendarHeight}
              minDate={new Date("2017-09-30")}
              theme={{
                selectionColor: "#2196F3",
                textColor: {
                  default: "#333",
                  active: "#FFF"
                },
                weekdayColor: "#0277BD",
                headerColor: "rgb(2, 136, 209)",
                floatingNav: {
                  background: "#2196F3",
                  color: "#FFF",
                  chevron: "#FFF"
                }
              }}
              onSelect={date => {
                const ISOdate = new Date(
                  date.getFullYear(),
                  date.getMonth(),
                  date.getDate(),
                  date.getHours() + 2
                )
                  .toISOString()
                  .slice(0, 10);
                history.push(`/institution/schedule/${ISOdate}`);
                updateView("EVENTS_LIST");
              }}
            />
          )}
        />
      </div>
    );
  }
}

Calendar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Calendar);
