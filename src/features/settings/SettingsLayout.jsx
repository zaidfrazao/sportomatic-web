import React, { Component } from "react";
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

export default withStyles(styles)(SettingsLayout);
