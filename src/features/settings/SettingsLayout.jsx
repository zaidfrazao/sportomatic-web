import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import AccountInfo from "./components/AccountInfo";

const styles = theme => ({
  root: {
    width: "100%"
  }
});

class SettingsLayout extends Component {
  render() {
    const { classes, accountInfo } = this.props;
    return (
      <div className={classes.root}>
        <AccountInfo info={accountInfo} />
      </div>
    );
  }
}

SettingsLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SettingsLayout);
