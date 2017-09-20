// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import BannerCarousel from "./components/BannerCarousel";

const styles = theme => ({
  root: {
    width: "100%"
  }
});

class DashboardLayout extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <BannerCarousel />
      </div>
    );
  }
}

DashboardLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DashboardLayout);
