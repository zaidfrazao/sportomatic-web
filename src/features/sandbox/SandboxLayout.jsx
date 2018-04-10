import React, { Component } from "react";
import { grey } from "material-ui/colors";
import { withStyles } from "material-ui/styles";
import AppBar from "./components/AppBar";
import SideMenu from "./components/SideMenu";

const styles = theme => ({
  wrapper: {
    backgroundColor: grey[200]
  }
});

type Props = {
  classes: {
    wrapper: string
  }
};

class SandboxLayout extends Component<Props> {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.wrapper}>
        <AppBar />
        <SideMenu />
      </div>
    );
  }
}

export default withStyles(styles)(SandboxLayout);
