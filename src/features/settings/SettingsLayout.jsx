// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import AccountInfo from "./components/AccountInfo";
import { getAccountInfo } from "./js/accountInfo.js";

const styles = theme => ({
  root: {
    width: "100%"
  }
});

class SettingsLayout extends Component {
  render() {
    const { classes, accountType } = this.props;
    return (
      <div className={classes.root}>
        <AccountInfo
          info={getAccountInfo(accountType)}
          accountType={accountType}
        />
      </div>
    );
  }
}

SettingsLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SettingsLayout);
